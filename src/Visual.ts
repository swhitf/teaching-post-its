import { EventEmitter } from './EventEmitter';
import { PostIt } from './Model';


export class PostItVisual extends EventEmitter {

    public root:HTMLDivElement;
    private deleteBtn:HTMLButtonElement;
    private span:HTMLSpanElement;

    constructor(public post:PostIt) {
        super();

        let root = document.createElement('div');
        root.className = 'post-it';
        root.style.position = 'absolute';
        root.style.left = (post.x - 100) + 'px';
        root.style.top = (post.y - 100) + 'px';
        root.addEventListener('dblclick', e => {
            e.preventDefault();
            e.stopPropagation();
        });

        let span = document.createElement('span');
        span.innerText = post.text;
        root.appendChild(span);
        
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerText = 'X';
        deleteBtn.addEventListener('click', (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.emit('delete', this.post);
        });
        root.appendChild(deleteBtn);

        this.root = root;

        post.addEventListener('updated', () => span.innerText = post.text);
    }
    
    public destroy():void {
        this.root.parentElement.removeChild(this.root);
    }
}