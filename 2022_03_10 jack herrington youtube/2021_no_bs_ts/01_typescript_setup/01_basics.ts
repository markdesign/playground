/*
hit Cmd+K,  Cmd+I to get tips on TS syntax
*/

// String example
let userName: string = "jack";
let hasLoggedIn: boolean = true;

userName += " bauer";
console.log(`[basics.ts] userName : `, userName);

// Number example
let myNumber: number = 10;
let myRegex: RegExp = /foo/;

// Array example
const names: string[] = userName.split(" ");

// Generic array type
const myValues: Array<number> = [1, 2, 3];

// Object type
const myPerson: {
  first: string;
  last: string;
} = {
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

// Object as maps
const ids: Record<number, string> = {
  10: "a",
  20: "b",
};
ids[30] = "c";

// Conditionals
if (ids[30] === "D") {
  
}

// For loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach(v => console.log(v));

