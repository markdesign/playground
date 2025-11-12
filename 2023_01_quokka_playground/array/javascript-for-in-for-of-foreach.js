


// https://www.30secondsofcode.org/articles/s/javascript-for-in-for-of-foreach

// TL:DR;

// for..in
// iterates over all enumerable property keys of an object

// for..of (new in ES6)
// iterates over the values of an iterable object. Examples of iterable objects are arrays, strings, and NodeLists.




const myArray = ["a", "b", "c"];
const myObject = { a: 1, b: 2, c: 3 };






// Finally, forEach() is a method of the Array prototype, which allows you to iterate over the elements of an array.
// While forEach() only iterates over arrays, it can access both the value and the index of each element while iterating.

myArray.forEach(val => {
  console.log(val); // array values
});

myArray.forEach((val, index) => {
  console.log(index); // array indexes
});







// for...in is used to iterate over all enumerable properties of an object, including inherited enumerable properties.
// This iteration statement can be used with arrays strings or plain objects, but not with Map or Set objects.

for (let prop in myArray) {
  console.log(prop); // array indexes
}

for (let prop in "str") {
  console.log(prop); // string indexes:
}

for (let prop in myObject) {
  console.log(prop); // object property names
}







// for...of is used to iterate over iterable objects, iterating over their values instead of their properties.
// This iteration statement can be used with arrays, strings, Map or Set objects, but not with plain objects.

for (let val of myArray) {
  console.log(val); // array values
}

for (let val of "str") {
  console.log(val); // string characters
}

for (let val of new Set(["a", "b", "a", "d"])) {
  console.log(val); // set values
}

for (let val of myObject) {
  console.log(val); // error. not iterable
}



