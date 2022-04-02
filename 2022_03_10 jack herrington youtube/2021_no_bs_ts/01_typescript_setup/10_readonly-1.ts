/*
Read Only utility and Immutable arrays
https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype

*/

// Example 1
interface Cat {
  name: string;
  breed: string;
}
// long example
// const ReadOnlyCat = ReadOnly<Cat>;

function makeCat(name: string, breed: string): Readonly<Cat> {
  return {
    name,
    breed,
  };
}
const usul = makeCat("Usul", "Tabby");
// how to make this impossible. immutable.
// usul.name = "Piter";

// Example 2
// Using Truple
function makeCoordinate(x: number, y: number, z: number): readonly [number, number, number] {
  return [x, y, z];
}
const c1 = makeCoordinate(10, 20, 30);
c1[0] = 50; // this will not work`

// Example 3
// make const really immutable.
// use "as const"
const reallyConst = [1, 2, 3] as const;
reallyConst[0] = 50; // will not work



