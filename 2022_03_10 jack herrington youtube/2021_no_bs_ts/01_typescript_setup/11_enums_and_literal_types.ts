/*
Enums
https://www.typescriptlang.org/docs/handbook/enums.html
*/


// Example 1.
// Enums before.
// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

// Enums after. use "enum" keyword.
enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}
// use it as a key also
const englishLoadingStates = {
    [LoadingState.beforeLoad]: "Before Load",
};
const isLoading = (state: LoadingState) => state === LoadingState.loading;
console.log(isLoading(LoadingState.loading));

// Example 2.
// Literal types
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
// example here shows "numeric literal"
function rollDice(dice: 1 | 2 | 3): number {
    let pip = 0;
    for (let i = 0; i < dice; i++) {
        pip += Math.floor(Math.random() * 5) + 1;
    }
    return pip;
}
console.log(rollDice(3)); // only accepts 1, 2, or 3


// Example 3.
// String literals
// "addToCars" and "checkout" are string literals

function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;

function sendEvent(name: string, data: unknown): void {
    console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent("addToCart", { productId: 123123 });
sendEvent("checkout", { cartCount: 213094});
