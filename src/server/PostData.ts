

export interface PostDataMap {
    [id:number]:PostData;
}

export class PostData {
    constructor(public id:number, public x:number, public y:number, public text:string) {
    }
}