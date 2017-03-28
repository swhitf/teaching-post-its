import { EventEmitter } from './EventEmitter';

export class Board extends EventEmitter {

    private items:PostItMap = {}; 

    public add(post:PostIt):void {
        this.items[post.id] = post;
        this.emit('added', post);
        console.log('Post added');
    }

    public remove(post:PostIt):void {
        delete this.items[post.id];
        this.emit('removed', post);
        console.log('Post removed');
    }

    public find(id:string):PostIt {
        return this.items[id] || null;
    }
}

export interface PostItMap {
    [id:number]:PostIt;
}

export class PostIt extends EventEmitter {

    constructor(public id:string, public x:number, public y:number, public text:string) {
        super();
    }
}