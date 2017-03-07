import { EventEmitter } from './EventEmitter';
import { Board, PostIt, Quadrant } from './Model';

export class PostItVisual extends EventEmitter {

    public root:HTMLDivElement;
    private deleteBtn:HTMLButtonElement;
    private span:HTMLSpanElement;
    private inputField:HTMLTextAreaElement;
    private type:string;

    private startX:number;
    private startY:number;
    private posX:number
    private posY:number
    private offsetX:number;
    private offsetY: number;

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
        this.inputField = inputField;
        inputField.className = 'input-field';
        inputField.addEventListener('click', (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
        });

        root.addEventListener('mousedown', (e:MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.onMouseDown(e.clientX, e.clientY);
            let onMouseMove = (e:MouseEvent) => {
                e.preventDefault();
                e.stopPropagation
                this.posX= e.clientX+ this.offsetX - this.startX;
                this.posY= e.clientY+ this.offsetY - this.startY;
                this.root.style.transform = 'rotate(0deg)';
                this.post.moveTo(this.posX, this.posY);
                this.emit('mouse moving PostIt', this.post);
            }
            root.addEventListener('mousemove', onMouseMove);
            let mouseUp = (e:MouseEvent)=> {
                e.preventDefault();
                e.stopPropagation;
                root.removeEventListener('mousemove', onMouseMove);
                this.onMouseUp(e.clientX, e.clientY);
                this.emit('dropped', e);
                root.removeEventListener('mouseup',mouseUp);
            }
            root.addEventListener('mouseup', mouseUp)
        });

  

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

        post.addEventListener('moved', () => {
            this.root.style.left = (this.post.x - 100) + 'px';
            this.root.style.top = (this.post.y - 100) + 'px';
        });

    }

    public destroy():void {
        this.root.parentElement.removeChild(this.root);
    }

    public save():string {
        var updText:string = this.inputField.value;
        this.root.style.transform = 'rotate(4deg)';
        this.root.style.webkitTransform = 'rotate(4deg)';
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
        root.style.transform = 'rotate(0deg)';
        root.style.webkitTransform = 'rotate(0deg)';
        inputField.innerText = post.text;
        span.innerHTML = '';
        root.appendChild(inputField);
        inputField = inputField;
        inputField.focus();
        this.emit('edited', post);
    }

    private onMouseDown(startX:number, startY:number):void {
        this.startX = startX;
        this.startY = startY;
        this.offsetX = this.post.x;
        this.offsetY = this.post.y;
        this.emit('drag started', this.post);
    }

 

    private onMouseUp(mouseX:number, mouseY:number):void {
        this.root.style.transform = 'rotate(4deg)';
    }
    public updateColour() {
        let type = this.post.getType();
        console.log(type);
        this.root.className = 'post-it';
        this.root.classList.add('selected');
        this.root.classList.add(type);
        this.type = type;
        this.emit('visual changed color', {})
    }

}
export class BoardVisual extends EventEmitter {
    public root:HTMLElement;
    constructor(board:Board) {
        super();
        let root = document.createElement('div');
        root.className = 'board';
        this.root = root;
    }
}

export class QuadrantVisual extends BoardVisual {
    public root:HTMLDivElement;
    constructor (public quad:Quadrant, public board:Board) {
        super(board);
        let root = document.createElement('div');
        root.id = quad.type
        root.innerText = quad.type;
        root.className = 'quad';
        this.root = root;
    }

}