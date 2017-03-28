import { Board, PostIt } from './Model';
import { EventEmitter } from './EventEmitter';


export class ClientSession extends EventEmitter {

    private socket:WebSocket;

    constructor(private userName:string, private boardId:number, private board:Board) {
        super();

        let url = `ws://localhost:3000?user=${userName}&board=${boardId}`;
        let socket = this.socket = new WebSocket(url);

        socket.onmessage = (e:MessageEvent) => this.onMessage(e.data);
    }

    public create(id:string, x:number, y:number, text:string):void {

        let command = {
            type: 'create', 
            id: id,
            x: x, 
            y: y, 
            text: text, 
        };

        this.onCreate(command);
        this.socket.send(JSON.stringify(command));
    }

    public update(id:string, x?:number, y?:number, text?:string):void {

        let command:any = {
            type: 'update', 
            id: id,
            x: x,
            y: y,
            text: text,
        };

        this.onUpdate(command);
        this.socket.send(JSON.stringify(command));
    }

    public delete(id:string):void {

        let command = {
            type: 'delete', 
            id: id,
        };

        this.onDelete(command);
        this.socket.send(JSON.stringify(command));
    }

    private onMessage(message:string):void {
        
        let command = JSON.parse(message);

        switch (command.type) {
            case 'chat':
                //this.onChat(sender, command);
                break;
            case 'create':
                this.onCreate(command);
                break;
            case 'update':
                this.onUpdate(command);
                break;
            case 'delete':
                this.onDelete(command);
                break;
            default:
                console.error('Unknown command type:', command.type);
                break;
        }
    }

    private onCreate(command:any):void {
        let { id, x, y, text } = command;

        let post = new PostIt(id, x, y, text);
        this.board.add(post);
    }

    private onUpdate(command:any):void {
        let { id, x, y, text } = command;

        let post = this.board.find(id);

        if (x !== undefined) {
            post.x = x;
        }

        if (y !== undefined) {
            post.y = y;
        }

        if (x !== undefined || y !== undefined) {
            post.emit('moved', {});
        }

        if (text !== undefined) {
            post.text = text;
            post.emit('upodated', {});
        }
    }

    private onDelete(command:any):void {
        let { id } = command;

        this.board.remove(this.board.find(id));
    }
}