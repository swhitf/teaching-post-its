import { EventEmitter } from './EventEmitter';
import { PostIt } from './Model';

export class PostItVisual extends EventEmitter {

    public root:HTMLDivElement;
    private deleteBtn:HTMLButtonElement;
    private span:HTMLSpanElement;
    private inputField:HTMLTextAreaElement;

    constructor(public post:PostIt) {
        super();

        let root = document.createElement('div');
        root.className = 'post-it';
        root.style.position = 'absolute';
        root.style.left = (post.x -100) + 'px';
        root.style.top = (post.y - 100) + 'px';
        
        let span = document.createElement('span');
        span.innerText = post.text;
        this.span = span;
        root.appendChild(span);

        let inputField = document.createElement('textarea');
        inputField.className = 'input-field';
        inputField.addEventListener('click', (e:MouseEvent) => {
            e.stopPropagation();
        });

        root.addEventListener('click', () => this.emit('click'));

        root.addEventListener('dblclick', (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.onEditBegin();
        });
        
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = 'X';
        deleteBtn.addEventListener('click',(e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.emit('delete', this.post);
        });
        root.appendChild(deleteBtn);

        this.root = root;

        post.addEventListener('updated', () => {
            span.innerText = post.text;
            this.root.removeChild(this.inputField);
        });

    }

    public destroy():void {
        this.root.parentElement.removeChild(this.root);
    }

    public save():string {
        var updText:string = this.inputField.value;
        return updText;
    }

    public setSelected(value:boolean) {
        if (value) {
            this.root.classList.add('selected');
        }
        else {
            this.root.classList.remove('selected');
        }
    }

    private onEditBegin():void {
        let { inputField, span, root, post } = this;

        inputField.innerText = post.text;
        span.innerHTML = '';
        root.appendChild(inputField);
        inputField = inputField;
        inputField.focus();
        this.emit('edited', post);
    }
}