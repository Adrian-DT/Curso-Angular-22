
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
}

const person1 = new Person('Alice', 30);
person1.greet();

// ES6 (ES2015) Class Syntax

class PersonClass {

  static species = 'Homo sapiens';

  static #instance = 0;

  static countInstances() {
    return this.#instance;
  }

  #name;
  age;
  constructor(name, age) {
        this.#name = name;
        this.age = age;
        PersonClass.#instance++;
    }

    get name() {
        return this.#name;
    }


    set name(newName) {

      if (typeof newName !== 'string' || newName.trim() === '') {
        throw new Error('Name must be a non-empty string.');
      }
      this.#name = newName;
    }

    greet() {
        console.log(`Hello, my name is ${this.#name} and I am ${this.age} years old.`);
    }
}

const person2 = new PersonClass('Bob', 25);
person2.greet();

person2.name = 'Charlie';

PersonClass.species
