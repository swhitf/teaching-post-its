import { EventEmitter } from './EventEmitter';
import { PostIt } from './Model';


export class PostItVisual extends EventEmitter {

    public root:HTMLDivElement;
    private editor:HTMLTextAreaElement;

    constructor(public post:PostIt) {
        super();

        let root = document.createElement('div');
        root.className = 'post-it';
        root.style.position = 'absolute';
        root.style.left = (post.x - 100) + 'px';
        root.style.top = (post.y - 100) + 'px';
        root.addEventListener('mousedown', e => this.onDragStart(e));
        root.addEventListener('dblclick', e => this.onEditStart(e));

        let editor = this.editor = document.createElement('textarea');
        editor.style.display = 'none';
        root.appendChild(editor);

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

        post.addEventListener('updated', () => {
            span.innerText = post.text;
        });
        post.addEventListener('moved', () => {
            root.style.left = (post.x - 100) + 'px';
            root.style.top = (post.y - 100) + 'px';
        });
    }
    
    public destroy():void {
        this.root.parentElement.removeChild(this.root);
    }

    private onDragStart(e:MouseEvent):void {

        //On mouse down, we need to record the current mouse position as our reference then
        //attach two listeners to window mousemove and window mouseup to handle the drag.
        let px = e.clientX;
        let py = e.clientY;
        
        let onMove = (me:MouseEvent) => {

            //Subtract the old position from the new position to figure out how far we moved
            let mx = me.clientX - px;
            let my = me.clientY - py;

            if (mx != 0 || my != 0) {
                //We've moved, so update the post
                this.post.moveBy(mx, my);
            }

            //Then record the new position as the current position for he next updated
            px = me.clientX;
            py = me.clientY;
        };

        let onUp = (me:MouseEvent) => {

            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }
    
    private onEditStart(e:MouseEvent):void {
        e.preventDefault();
        e.stopPropagation();

        this.editor.style.display = 'block';
        this.editor.focus();
        this.editor.select();

        let onApply = (me:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            
            this.post.update(this.editor.value);
            this.editor.style.display = 'none';
            window.removeEventListener('mousedown', onApply);
        };

        window.addEventListener('mousedown', onApply);
    }
}