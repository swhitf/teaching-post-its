import { BoardVisual, PostItVisual, QuadrantVisual } from './Visual';
import { Board , PostIt, Quadrant} from './Model';
import { EventEmitter, EventCallback } from './EventEmitter';
import { CSVWriter } from './CSVWriter';


//creating the data model for the board and quads
let board:Board =new Board();
let good:Quadrant = new Quadrant('good');
let bad: Quadrant = new Quadrant('bad');
let start: Quadrant = new Quadrant('start');
let stop: Quadrant = new Quadrant('stop');

//creating the visuals for the board and quads.
let boardVisual:BoardVisual = new BoardVisual(board);
let goodVisual:QuadrantVisual = new QuadrantVisual(good, board);
let startVisual:QuadrantVisual = new QuadrantVisual(start, board);
let badVisual:QuadrantVisual = new QuadrantVisual(bad, board);
let stopVisual:QuadrantVisual = new QuadrantVisual(stop, board);


let visuals:PostItVisual[] = [];
let selected:PostIt = null;

//add the elements to the document.
document.body.appendChild(boardVisual.root);
boardVisual.root.appendChild(goodVisual.root);
boardVisual.root.appendChild(startVisual.root);
boardVisual.root.appendChild(badVisual.root);
boardVisual.root.appendChild(stopVisual.root);

//grab the download button

var downloadBtn: HTMLElement = document.getElementById('downloadButton');

downloadBtn.addEventListener('click', (event:any)=>{
    event.preventDefault();
    event.stopPropagation();
    console.log('maria');
    let writer = new CSVWriter(',', '"', '\n');
    writer.objectArrayToCSV(board.items);
    writer.writeToFile();
    board.emit('post its downloaded');

});

function lookupVisual(post:PostIt):PostItVisual {
        
    for (let i = 0; i < visuals.length; i++) {
        if (visuals[i].post == post) {
            return visuals[i];
        }
    }
    return null;
}


function lookupQuad(post:PostIt) {
    if ((post.x < 900) && (post.y < 550)) {
        post.setType(good, 'good');
    }
    else if ((post.x<900) && ( post.y > 550)) {
        post.setType(bad, 'bad');
    }
    else if ((post.x>900) && (post.y<550)) {
        post.setType(start, 'start')
    }
    else {
        post.setType(stop, 'stop');
    }
}
//unsuccessfull attempt to stop zooming by listening to the mousewheel and key down events...
/*document.addEventListener('mousewheel', (event:MouseWheelEvent) => {
    if (event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
    }
});*/

window.addEventListener('dblclick', (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    let post = new PostIt(e.pageX, e.pageY, 'New Post!');
    lookupQuad(post);
    board.add(post);
});


board.addEventListener('added', (data:PostIt) => {
    let visual = new PostItVisual(data);
    
    visual.root.addEventListener('click', () => {
        if (selected) {
            lookupVisual(selected).setSelected(false);
        }
        selected = visual.post;
        if (selected) {
            lookupVisual(selected).setSelected(true);
        }
    });
    visual.addEventListener('delete', (data:PostIt):void => {
    board.remove(data);
    });
    visual.addEventListener('edited', (data:PostIt):void => {
        
        let onWindowClick = (e:MouseEvent)=>{
            e.preventDefault();
            e.stopPropagation();
            window.removeEventListener('click', onWindowClick);
            data.update(visual.save());
        };

        window.addEventListener('click', onWindowClick);
    });
    visual.addEventListener('dropped', (event:any) => {
        lookupQuad(visual.post);
        visual.updateColour();
    });
    visuals.push(visual);
    visual.updateColour();            
    document.body.appendChild(visual.root);
    if (selected) {
        lookupVisual(selected).setSelected(false);
    }
    selected = visual.post;
    if (selected) {
        lookupVisual(selected).setSelected(true);
    }

});

board.addEventListener('removed', (data:PostIt) => {
    for (let i = 0; i < visuals.length; i++) {
        if (visuals[i].post == data) {
            if (visuals[i].post == selected) {
                selected = null;
            }
            visuals[i].destroy();
            visuals.splice(i,i);
            break;
        }
    }

});


window['board'] = board;
window['PostIt'] = PostIt;

/*var editBtn: HTMLElement = document.getElementById('edit-btn');
var saveBtn: HTMLElement = document.getElementById('save-btn');
var msgInput: HTMLInputElement = document.getElementById('msg-input') as HTMLInputElement;
var p1 = document.getElementById('p1');

msgInput.style.visibility = 'hidden';
saveBtn.style.visibility = 'hidden';

editBtn.addEventListener('click', onEdit);
saveBtn.addEventListener('click', onSave);

function onEdit() {
    editBtn.style.visibility = 'hidden';
    saveBtn.style.visibility = 'visible';
    msgInput.style.visibility = 'visible';
    msgInput.value = '';
    msgInput.focus();
}

function onSave() {

    var newText = msgInput.value;
    if (newText) {
        p1.innerText = newText;
    }
    else {
        console.error('No text was entered...');
    }

    editBtn.style.visibility = 'visible';
    saveBtn.style.visibility = 'hidden';
    msgInput.style.visibility = 'hidden';
}*/