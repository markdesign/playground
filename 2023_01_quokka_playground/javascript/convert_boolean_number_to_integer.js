let IsLoggedIn = false;
let convertedBoolValue = IsLoggedIn ? 1 : 0;
console.log('convertedBoolValue:', convertedBoolValue)

let convertedBoolValue2 = Number(IsLoggedIn);
console.log('convertedBoolValue2:', convertedBoolValue2)

let convertedBoolValue3 = +IsLoggedIn;
console.log('convertedBoolValue3:', convertedBoolValue3)

// bitwise or https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_OR
// Sets each bit to 1 if one of two bits is 1
// 0 | 0 = 0
// 1 : 0 = 1
let convertedBoolValue4 = IsLoggedIn | 0;
console.log('convertedBoolValue4:', convertedBoolValue4)
