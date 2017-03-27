import { EventEmitter } from './EventEmitter';

export class Board extends EventEmitter {

    public items:PostIt[] = []; 

    public add(post:PostIt):void {
        this.items.push(post);
        this.emit('added', post);
        console.log('Post added');
    }

    public remove(post:PostIt):void {
        let idx = this.items.indexOf(post);
        if (idx >= 0) {
            this.items.splice(idx, 1);
            this.emit('removed', post);
            console.log('Post removed');
        }
    }
}

export class PostIt extends EventEmitter {

    constructor(public x:number, public y:number, public text:string) {
        super();
    }

    public moveBy(x:number, y:number):void {
        this.moveTo(this.x + x, this.y + y);
    }

    public moveTo(x:number, y:number):void {
        this.x = x;
        this.y = y;
        this.emit('moved', {});
    }

    public update(text:string):void {
        this.text = text;
        this.emit('updated', {});
    }
}