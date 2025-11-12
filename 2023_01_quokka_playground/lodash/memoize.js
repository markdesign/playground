import { memoize } from "lodash";

//////////////////////////////////////////////////////
// classical Example of memoization
//////////////////////////////////////////////////////

// only gets called TWICE!!
// returns the cached version of red and blue
function swatch1(color) {
  console.log(`Swatch : ${color}`);
  return `Swatch: ${color}`;
}

const memoedSwatch = memoize(swatch1);

memoedSwatch("red"); //?
memoedSwatch("blue"); //?
memoedSwatch("red"); //?
memoedSwatch("blue"); //?

// call above many times as you want. only gets called twice

//////////////////////////////////////////////////////
// Example of how react does memoization
//////////////////////////////////////////////////////

// only gets called TWICE!!
// returns the cached version of red and blue
function swatch2(color) {
  console.log(`Swatch : ${color}`);
  return `Swatch: ${color}`;
}

const createSwatch = () => {
  const prev = {
    color: null,
    result: null,
  };

  return color => {
    if (color === prev.color) {
      return prev.result;
    }
    prev.color = color;
    prev.result = swatch2(color);
    return prev.result;
  };
};

const swatchA = createSwatch();
const swatchB = createSwatch();

swatchA("red"); //?
swatchA("blue"); //?

swatchB("red"); //?
swatchB("blue"); //?
