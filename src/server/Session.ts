import { PostData, PostDataMap } from './PostData';
import { User } from './User';


export interface SessionMap
{
    [id:number]:Session;
}

export class Session
{
    private connectedUsers:User[] = [];
    private postMap:PostDataMap = {};

    constructor(public boardId:number) {
    }

    public join(user:User):void {
        
        this.connectedUsers.push(user);

        user.conn.on('close', () => this.onClose(user));
        user.conn.on('message', data => this.onMessage(user, data));

        console.log(
            user.name, 'has joined board', this.boardId, 
            'with', this.connectedUsers.length - 1, 'other users.');
    }

    private distribute(sender:User, command:any):void {
        
        let commandData = JSON.stringify(command);

        for (let user of this.connectedUsers) {
            if (user == sender)
                continue;
                
            user.conn.send(commandData);
        }
    }

    private onClose(user:User):void {

        let idx = this.connectedUsers.indexOf(user);
        if (idx >= 0) {
            this.connectedUsers.splice(idx, 1);
        }

        console.log(user.name, 'has left board', this.boardId);
    }

    private onMessage(sender:User, data:string):void {
        
        let command = JSON.parse(data);
        command.sender = sender.name;
        console.log(command.type, 'message from', command.sender);
        //console.log(command);

        switch (command.type) {
            case 'chat':
                this.onChat(sender, command);
                break;
            case 'create':
                this.onCreate(sender, command);
                break;
            case 'update':
                this.onUpdate(sender, command);
                break;
            case 'delete':
                this.onDelete(sender, command);
                break;
            default:
                console.error('Unknown command type:', command.type);
                break;
        }
    }

    private onChat(sender:User, command:any):void {

        this.distribute(sender, command);
    }

    private onCreate(sender:User, command:any):void {
        // id: <number>
        // x: <number>
        // y: <number>
        // text: <string>

        let post = new PostData(command.id, command.x, command.y, command.text);
        this.postMap[post.id] = post;

        this.distribute(sender, command);
    }

    private onUpdate(sender:User, command:any):void {
        // id: <number>
        // x?: <number>
        // y?: <number>
        // text?: <string>

        let post = this.postMap[command.id];

        if (command.x !== undefined) {
            post.x = command.x;
        }
        if (command.y !== undefined) {
            post.y = command.y;
        }
        if (command.text !== undefined) {
            post.text = command.text;
        }

        this.distribute(sender, command);
    }

    private onDelete(sender:User, command:any):void {
        // id: <number>
        // x?: <number>
        // y?: <number>
        // text?: <string>

        delete this.postMap[command.id];
        this.distribute(sender, command);
    }
}