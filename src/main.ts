import { PostItVisual } from './Visual';
import { Board , PostIt} from './Model';
import { EventEmitter, EventCallback } from './EventEmitter';


let board:Board =new Board();
let visuals:PostItVisual[] = [];


function lookupVisual(post:PostIt):PostItVisual {
        
    for (let i = 0; i < visuals.length; i++) {
        if (visuals[i].post == post) {
            visuals[i].destroy();
            visuals.splice(i,i);
            break;
        }
    }
    return null;
}

window.addEventListener('dblclick', (e:MouseEvent) => {
    let post = new PostIt(e.pageX, e.pageY, 'New Post!');
    board.add(post);
});
board.addEventListener('added', (data:PostIt) => {
    let visual = new PostItVisual(data);
    visual.addEventListener('delete', (data:PostIt):void => {
    board.remove(data);
    });
    visual.addEventListener('edited', (data:PostIt):void => {
        window.addEventListener('click', (e:MouseEvent)=>{
            e.preventDefault();
            e.stopPropagation();
            data.update(visual.save());
        });
    });
    visuals.push(visual);            
    document.body.appendChild(visual.root);
});

board.addEventListener('removed', (data:PostIt) => {
    
    for (let i = 0; i < visuals.length; i++) {
        if (visuals[i].post == data) {
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