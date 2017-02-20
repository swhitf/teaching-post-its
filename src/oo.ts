let n:number = 0;
let s:string = '';
let b:boolean = false;
let a:string[] = [];


class Person {
    public name:string;
    public age:number;
    public gender:string;

    constructor(name:string, age:number, gender:string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

}

class Animal {
    constructor (public type:string) {

    }
}
let people:Person[] = [new Person('Steve', 29,'M'), new Person('Maria', 33, 'F')];

let animals:Animal[] = [new Animal('kitten'), new Animal('lion')];


function savePeople(people:Person[]): void {
    let data:string[] = [];
    for (let p of people) {
        data.push(p.name + ', ' + p.age + ', ' + p.gender);
    }
    console.log(data.join('\n'));
}

function saveAnimals(animals: Animal[]): void {
    let data:string[] = [];
    for (let a of animals) {
        data.push(a.type);
    }
    console.log(data.join('\n'));
}

savePeople(people);
saveAnimals(animals);