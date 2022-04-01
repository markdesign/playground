// Example 1
function addNumbers(a: number, b: number): number {
  return a + b;
}
// old way. not recommended
// module.exports = addNumbers;

// new way
export default addNumbers;
console.log(addNumbers(1, 2));

export const addStrings = (str1: string, str2: string = ""): string => {
  return `${str1} ${str2}`;
};
console.log(addStrings("Hello", "World"));
console.log(addStrings("Hello"));

// Example 2
// example using union types to allow for both numbers and strings (use | )
export const format = (title: string, params: string | number): string => {
  return `${title}: ${params}`;
};

// void
export const printFormat = (title: string, params: string | number): void => {
  console.log(format(title, params));
};

// promise
// note: if error, update tsconfig.json "target": "esnext"
export const fetchData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
};

// rest parameters
function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(" ")}`;
}

// Typescripe is only at Compile time, NOT at runtime
// Solution: add optional chaining and The null-coalescing operator
export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? "first"} ${user?.last ?? "last"}`;
}

