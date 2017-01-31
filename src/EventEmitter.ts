export interface EventCallback
{
    (data:any):void;
}

export class EventEmitter {

    private subscribers:any = {};

    constructor() {
    }

    public addEventListener(eventName:string, callback:EventCallback):void {
        
        let list = this.subscribers[eventName];
        if (list == undefined) {
            list = [];
            this.subscribers[eventName] = list;
        }
        
        list.push(callback);
    }

    public emit(eventName:string, data:any):void {

        let list = this.subscribers[eventName];
        if (list != undefined) {
            for (let callback of list) {
                callback.call(this, data);
            }
        }
    }
}