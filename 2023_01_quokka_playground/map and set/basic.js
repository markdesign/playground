// https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
// Map is like an object but with no duplicate keys.
// size
// set(key, value)
// delete(key)
// get(key)
// has(key)
// keys()
// values()
// entries()
// clear()
// forEach()

let myMap = new Map([{'a1': 'foo'}, 'Hello'], ['a2', 'World']);
myMap;




// Set is like an array but with no duplicate values.
// size
// add(value)
// delete(value)
// entries()
// values()
// has(value)
// clear()
// forEach()

let myArray = [1, 2, 3, 4, 5];
let mySet = new Set(myArray);

mySet.add('100');
mySet.add({a: 1, b: 2});
mySet.delete(2);
console.log(mySet.size);
mySet;

mySet.forEach((value) => {
  console.log(value);
})

mySet.clear();
mySet;


