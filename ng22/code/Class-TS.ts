// ES6 (ES2015) Class Syntax

export interface PersonI {
  name: string;
  age: number;
  greet(): void;
}


export abstract class Animal {

  skip() { 
      console.log('The animal skips.');
  }

  abstract makeSound(): void;
}


export class Person extends Animal implements PersonI {

  static species = 'Homo sapiens';

  static #instance = 0;

  static countInstances() {
    return this.#instance;
  }

  #name: string;
  public age: number;
  constructor(name: string, age: number) {
        super();
        this.#name = name;
        this.age = age;
        Person.#instance++;
    }

    get name() {
        return this.#name;
    }


    set name(newName: string) {

      if (typeof newName !== 'string' || newName.trim() === '') {
        throw new Error('Name must be a non-empty string.');
      }
      this.#name = newName;
    }

    greet() {
        console.log(`Hello, my name is ${this.#name} and I am ${this.age} years old.`);
    }

    makeSound(): void {
        console.log('This is a generic animal sound.');
    }
}

export default Person;
