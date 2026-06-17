import Person1,  { Person } from './Class-TS';

const person1 = new Person1('Alice', 30);
console.log(person1.name);

const person2 = new Person('Bob', 25);
person2.greet();

person2.name = 'Charlie';
console.log(Person.species)







