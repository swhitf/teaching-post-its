import { ClientSession } from './ClientSession';
import { PostItVisual } from './Visual';
import { EventEmitter, EventCallback } from './EventEmitter';
import { Board, PostIt } from './Model';

import * as shortid from 'shortid';


export class App {

    private board:Board = new Board();
    private visuals:PostItVisual[] = [];
    private session:ClientSession;

    constructor(private userName:string, private boardId:number) {
    }

    public run():void {
        let { board, visuals } = this;

        window.addEventListener('dblclick', e => this.onCreateAction(e.pageX, e.pageY));
        board.addEventListener('added', data => this.onBoardAdded(data));
        board.addEventListener('removed', data => this.onBoardRemoved(data));

        this.session = new ClientSession(this.userName, this.boardId, this.board);
    }

    private lookupVisual(post:PostIt):PostItVisual {
        let { board, visuals } = this;

        for (let i = 0; i < visuals.length; i++) {
            if (visuals[i].post == post) {
                return visuals[i];
            }
        }
        return null;
    }

    private onCreateAction(x:number, y:number):void {
        this.session.create(shortid.generate(), x, y, 'New Post!');
    }

    private onBoardAdded(data:PostIt):void {
        let { board, visuals, session } = this;
            
        let visual = new PostItVisual(data, session);
        visual.addEventListener('delete', (post:PostIt) => {
            board.remove(post);
        });
        visuals.push(visual);
        document.body.appendChild(visual.root);
    }

    private onBoardRemoved(data:PostIt):void {
        let { board, visuals } = this;
            
        let v = this.lookupVisual(data);
        if (v != null) {
            v.destroy();
            let idx = visuals.indexOf(v);
            visuals.splice(idx, 1);
        }
    }
}