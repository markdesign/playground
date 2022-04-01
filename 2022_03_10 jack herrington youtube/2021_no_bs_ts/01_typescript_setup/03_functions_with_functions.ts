// function as parameter
export function printToFile(text: string, callback: (foo: string) => void): void {
  console.log(text);
  callback("bar");
}

// example
export type MutationFunction = (v: number) => number;
export function arrayMutate(numbers: number[], mutate: MutationFunction): number[] {
  return numbers.map(mutate);
}
const myNewMutationFunction: MutationFunction = v => v * 2;
console.log(arrayMutate([1, 2, 3], v => v * 2));

// returns returning a function
export type AdderFunction = (v: number) => number;
export function createAdder(num: number): AdderFunction {
  return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne);
