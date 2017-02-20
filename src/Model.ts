import { EventEmitter } from './EventEmitter';



export class Board extends EventEmitter {

    public items:PostIt[]=[];
    
    public add(post:PostIt):void {
        this.items.push(post);
        this.emit('added',post)
        console.log('added');
    }
    
    public remove(post:PostIt):void {
        let idx = this.items.indexOf(post);
        if (idx >= 0) {
            this.items.splice(idx, 1);
            this.emit('removed', post);
        }
        console.log('removed');
    }
    constructor () {
        super();
    }
}
export class PostIt extends EventEmitter {
    constructor (public x:number, public y:number, public text:string) {
        super();
    }

    public moveTo(x:number, y:number):void {
        this.x = x;
        this.y =y;
        this.emit('moved', {});
    }

    public update(text:string):void {
        this.text = text;
        this.emit('updated', this);
        console.log('updated');
    }
}

