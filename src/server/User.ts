import * as WebSocket from 'ws';


export class User {
    constructor(public name:string, public conn:WebSocket) {
    }
}