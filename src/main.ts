import { PostItVisual } from './Visual';
import { EventEmitter, EventCallback } from './EventEmitter';
import { Board, PostIt } from './Model';

let board:Board = new Board();
let visuals:PostItVisual[] = [];

function lookupVisual(post:PostIt):PostItVisual {
    for (let i = 0; i < visuals.length; i++) {
        if (visuals[i].post == post) {
            return visuals[i];
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
    visual.addEventListener('delete', (post:PostIt) => {
        board.remove(post);
    });
    visuals.push(visual);
    document.body.appendChild(visual.root);
});

board.addEventListener('removed', (data:PostIt) => {
    
    let v = lookupVisual(data);
    if (v != null) {
        v.destroy();
        let idx = visuals.indexOf(v);
        visuals.splice(idx, 1);
    }
});


window['board'] = board;
window['PostIt'] = PostIt;