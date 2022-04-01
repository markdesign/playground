/*
use ? for optional parameters
use ! when you know better then typescript warning
*/

// optional parameters
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? ` ${extra}` : ""}`);
}

printIngredient("1C", "Flour");
printIngredient("1C", "Sugar", "something more");

// ? is optional
interface User {
  id: string;
  info?: {
    email?: string;
  };
}

// force type checking
function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!; // ! is important
  }
  return "";
}

// better solution using optional chaining
function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

// optional function parameters
function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.(); // callback is optional. only called if exists
}
