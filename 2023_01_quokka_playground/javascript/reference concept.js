// Compare by value
true === true; //?
false === true; //?
10 === 10; //?
12 === 10; //?
"jane" === "jane"; //?
const personName = "jane"; //?
personName === "jane"; //?

// Compare by reference
({ a: 1 } === { a: 1 }); //?
const obj = { a: 1 }; //?
obj === obj; //?
obj === { a: 1 }; //?
[] === []; //?
[1, 2, 3] === [1, 2, 3]; //?

// example of how it works in react
const depCompare = (oldDeps, newDeps) => {
  if (oldDeps.length === newDeps.length) {
    return oldDeps.every((dep, i) => {
      const result = dep === newDeps[i]; //?
      return result;
    });
  }
};
depCompare([1], [1]); //?
depCompare([1, 2, 3], [1, 2, 3]); //?
depCompare([obj], [obj]); //?
depCompare([obj], [{a: 1}]); //?
