/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

/*
 * Imferencia de tipos
 */

// En la declaración de una variable con let asignando un valor primitivo
// TS infiere el tipo. Indicarlo provoca un error del Linter

let x = 22;

// @ts-expect-error El tipo 'string' no se puede asignar al tipo 'number
x = 'Pepe';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
let y: string = 'Pepe';

// Lo mismo sucede con valores referenciados (objetos)
// En este caso suele ser buena práctica indicar el tipo, para darle un nombre reusable, como luego veremos

const person = {
  name: 'Pepe',
  age: 22,
};

// El tipo así inferido no puede añadir propiedades desconocidas, ni cambiar el tipo de las existentes
// Si es posible mutar el objeto, cambiando el valor de sus propiedades válidas

// @ts-expect-error: El tipo 'boolean' no se puede asignar al tipo 'number'.
person.age = true;
// @ts-expect-error: La propiedad 'job' no existe en el tipo.
person.job = 'Developer';

// El objeto es mutable

person.age = 23;

/*
 * Tipos literales y constantes
 */

// La inferencia de tipo en las const es más restrictiva, infiere un tipo literal, que no puede ser cambiado ni mutado

const pi = 3.14;

const area = pi * 2 ** 2;

// El mismo resultado se consigue con la aserción de tipo as const, que se puede usar con let, para indicar que el valor no va a cambiar, aunque no sea una constante

let radius = 2 as const;

// Si se intenta cambiar el valor de la "constante" , o el tipo de su valor, se produce un error del Linter

// @ts-expect-error: El tipo '3.15' no se puede asignar al tipo '3.14'.
radius = 3;

// Si se aplica as const a un objeto, se infiere un tipo literal para cada propiedad, que no puede ser cambiado ni mutado

const person2 = {
  name: 'Pepe',
  age: 22,
} as const;

// @ts-expect-error: El tipo 'string' no se puede asignar al tipo '"Pepe"'.
person2.name = 'Juan';

/*
 * Tipo any
 */

// Tipo any explicito - mala práctica: no hay TS y cualquier valor es válido

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let bad: any = 22;

// bad.toLowerCase();

/*
 * Anotación de tipos
 */

// Las funciones no infieren el tipo de sus parámetros por lo que es necesario anotarlos, para que TS pueda comprobar su uso correcto
// El tipo de valor de retorno suele ser inferido a partir de las operaciones con los parámetros
// Sin embargo, suele considerarse buena práctica anotarlo explícitamente

const add = (a: number, b: number): number => a + b;

/*
 * Arrays
 */

// El tipo de los elementos del array se infiere a partir de los valores iniciales:
// no se puede cambiar ni mutar el tipo de los elementos, aunque sí añadir nuevos elementos del mismo tipo

const data: number[] = [1, 2, 3];

data.push(4);
// @ts-expect-error: El tipo 'string' no se puede asignar al tipo 'number'.
data.push('5');

// Sin embargo en un array inicialmente vacío se debe indicar con el tipo seguido de corchetes, o con la sintaxis genérica Array<tipo>

const names = [];

// En caso contrario, se infiere el tipo never, que no admite ningún valor, ni siquiera los de tipo any o unknown, por lo que no se pueden añadir elementos al array

/*
 * Tipo unknown
 */

// El tipo unknown es un super-tipo de todos los tipos, incluido any,
// Se le pueden asignar valores de cualquiera de los tipos, pero seguirá siendo de tipo unknown
// No se le pueden aplicar operaciones o invocar sus métodos,
// sin antes hacer 'conocido' el tipo con una aserción de tipo o una guarda de tipo

const value: unknown = 22;

// @ts-expect-error: "bad" es de tipo "unknown".
const r = value + 2;
// @ts-expect-error: "bad" es de tipo "unknown".
value.toString();

/*
 * Aserción o casting de tipos
 */

// El casting de tipos (o aserción de tipo) modifica el tipo en la operación que lo invoca,
// pero no cambia el tipo de la variable, que sigue el que tenía

// Puede usarse para  manipular un valor de tipo unknown, indicándole el tipo que se espera que tenga, para poder aplicar operaciones o invocar métodos válidos para ese tipo

const r2 = (value as number) + 2;

/*
 * Guardas de tipos
 */

// Realizan alguna comprobación sobre un valor que permite afinar su tipo a uno más concreto
// que será usado en las siguientes operaciones, sin necesidad de hacer un casting de tipo
// En este caso si que cambia el tipo de la variable, que se vuelve más concreto, aunque solo dentro del bloque de código de la guarda de tipo

// Una de las posibles guardas utilizadas es la comprobación del tipo con typeof, que permite afinar el tipo unknown a un tipo primitivo concreto

let r3: number | string;
if (typeof value === 'number') {
  r3 = value + 2;
} else if (typeof value === 'string') {
  r3 = value.toUpperCase();
} else {
  console.log('Valor de tipo desconocido');
}

/*
 * Tipos propios
 */

// Para definir tipos propios, se pueden usar tipos o interfaces, que son muy similares, aunque con algunas diferencias, como veremos más adelante

// En el primer caso se usa la palabra reservada type seguida del nombre del tipo
// asignándole un valor del que se infiere el tipo, e.g. un objeto con propiedades,

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type User = {
  readonly name: string;
  age: number;
  job?: string;
};

// En el tipo puede usarse
// - la palabra reservada readonly para indicar que una propiedad no puede ser modificada
// - el símbolo ? para indicar que una propiedad es opcional

const user1: User = {
  name: 'Alice',
  age: 30,
};

user1.age = 31;
// @ts-expect-error: La propiedad 'name' es de solo lectura.
user1.name = 'Bob';
// Es posible añadir una propiedad opcional
user1.job = 'Developer';

// El tipo nombrado puede usarse para anotar el tipo de un array

const users: User[] = [
  {
    name: 'Alice',
    age: 30,
  },
  {
    name: 'Bob',
    age: 25,
    job: 'Designer',
  },
];

/*
 * Tuplas
 */

// Al anotar arrays con tipos, podemos crear una variante denominada tupla:
// un array con un número fijo de elementos, cada uno de un tipo específico, indicado en el orden en que aparecen en la tupla

const point: [number, number] = [10, 20];
point[0] = 15;
// @ts-expect-error: El tipo 'string' no se puede asignar al tipo 'number'.
point[1] = '25';
// @ts-expect-error: El tipo '[number, number, number]' no se puede asignar al tipo '[number, number]'.
point[2] = 30;

// El problema de las tuplas es que, al existir solo en TS, no evitan la aplicación de métodos de array, que permiten añadir o quitar elementos

point.push(30);
point.pop();

/*
 * Interfaces
 */

// Las interfaces son similares a los tipos, pero con algunas diferencias, como veremos más adelante

// TS recomienda el uso de interface siempre que sea posible
// Lo mismo hacen las reglas de ESLint que utilizamos

// Podemos crear un interface idéntico que el tipo anteriormente definido
// Añadimos I como prefijo para que no coincida el nombre con el tipo
// No es una convención de TS ni especialmente recomendado

interface IUser {
  readonly name: string;
  age: number;
  job?: string;
}

// Igual que con el tipo, el interface puede usarse para anotar el tipo de un array

const users2: IUser[] = [];

/*
 * Interfaces v. tipos
 */

// Solo los tipos permiten asignar alias a tipos primitivos, literales, uniones o intersecciones, mientras que las interfaces solo pueden describir objetos con propiedades

type ID = number | string;
type Role = 'admin' | 'user' | 'guest';
type ExtrasRole = Role | 'editor';

// Solo los interfaces permiten la declaración de tipos abiertos,
// pudiendo ser extendidos, en una segunda declaración con el mismo nombre,

{
  const r2: Response = {
    status: 200,
    status2: 1237465,
  } as Response;

  interface Response {
    status2: number;
  }
}

// En todos los demás casos,
// - la unión y la intersección de tipos tiene sus equivalencias en la extensión de interfaces, aunque con una sintaxis diferente
// - tipos e interfaces pueden combinarse indistintamente
// - ambos pueden definir la implementación de una clase, aunque es más común el uso de interfaces para este propósito

// Ejemplo de extensión de interfaces

interface IAdmin extends IUser {
  role: Role;
}

// Ejemplo de intersección de tipos (& )

type Admin = IUser & {
  role: Role;
};
