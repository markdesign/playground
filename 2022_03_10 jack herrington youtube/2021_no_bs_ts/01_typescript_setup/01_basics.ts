/*
hit Cmd+K,  Cmd+I to get tips on TS syntax
*/

// 1. String example
let userName: string = "jack";
let hasLoggedIn: boolean = true;

// hasLoggedIn += " Batman"; // this throws TS error

userName += " bauer";
console.log(`[basics.ts] userName : `, userName);

// 2. Number example
let myNumber: number = 10;
let myRegex: RegExp = /foo/;

// 3. Array example
const names: string[] = userName.split(" ");

// 4. Generic array type
const myValues: Array<number> = [1, 2, 3];

// 5. Object type
const myPerson: { first: string; last: string } = {
    first: "Jack",
    last: "Bauer",
};

// Change above to Interface

interface Person {
    first: string;
    last: string;
}

const myPerson2: Person = {
    first: "Jack",
    last: "Bauer",
};

// 6. Object as maps
const ids1 = {
  10: 'a',
  20: 'b',
}
// ids1[30] = 'c';  // This will Throw TS error. no type set for 30

// 6.b Record - a utility type <keytype, valuetype> 
// https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
const ids2: Record<number, string> = { 10: "a", 20: "b" };
ids2[30] = "c";

// 7. Conditionals
if (ids2[30] === "D") {

}

// if (ids2[30] === 20) {
//  // TS error, id2 takes string only
// }

// 8. For loop
// i is inferred as number (tip: let typescript inferr as much as possible)
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// v is inferred as number
[1, 2, 3].forEach(v => console.log(v));

// out is inferred as array of number
const out = [4, 5, 6].map(v => v * 10);
