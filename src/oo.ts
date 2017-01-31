class Person implements Formattable {

    public name:string;
    public age:number;
    public gender:string;

    constructor(name:string, age:number, gender:string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public toDataArray():any[] {
        return [this.name, this.age, this.gender];
    }
}

class Animal implements Formattable {

    constructor(public type:string, public meanness:string) {
    }
    
    public toDataArray():any[] {
        return [this.type, this.meanness];
    }
}

let people = [
    new Person('Steve', 29, 'M'),
    new Person('Maria', 21, 'F')
];

let animals = [
    new Animal('Kitten', 'a bit'),
    new Animal('Lion', 'very'),
];

interface Formattable {

    /**
     * Returns a string array of all the properties on this object.
     */
    toDataArray():any[]
}

function save(formattables:Formattable[]):void {

    let data:string[] = [];
    for (let f of formattables) {
        data.push(f.toDataArray().join(','));
    }

    console.log(data.join('\n'));
}