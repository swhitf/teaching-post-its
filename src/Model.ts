import { EventEmitter } from './EventEmitter';


export class Board extends EventEmitter {

    public items:PostIt[]=[];
    
    public add(post:PostIt):void {
        this.items.push(post);
        this.emit('added',post)
    }
    
    public remove(post:PostIt):void {
        let idx = this.items.indexOf(post);
        if (idx >= 0) {
            this.items.splice(idx, 1);
            this.emit('removed', post);
        }
    }

    constructor () {
        super();
    }
}

export class PostIt extends EventEmitter {
    private type:string;
    constructor (public x:number, public y:number, public text:string) {
        super();
    }

    public moveTo(x:number, y:number):void {
        this.x = x;
        this.y = y;
        this.emit('moved', {});
    }

    public update(text:string):void {
        this.text = text;
        this.emit('updated', this);
    }

    public setType(quad:Quadrant, type:string) {
       // quad.add(this); this gives me a runtime error that the compiler does not find. If Quadrant extends Board why is add not a valid function on quad?
        this.type = type;
        this.emit('post it changed type', {})
    }

    public getType():string {
        return this.type;
    }
}

export class Quadrant extends Board {
    constructor (public type:string) {
        super();
    }
}

