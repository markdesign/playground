// 1. Generic challenge. re create forEach, Filter and map using reduce and generics
// for each
function myForEach<T>(items: T[], forEachFunc: (v: T) => void): void {
  items.reduce((a, v) => {
    forEachFunc(v);
    return undefined;
  }, undefined);
}
myForEach([1, 2, 3], v => console.log(v)); //?

// filter
function myFilter<T>(items: T[], filterfunc: (v: T) => boolean): T[] {
  return items.reduce((a, v) => (filterfunc(v) ? [...a, v] : a), [] as T[]);
}
myFilter([1, 2, 3], v => v > 1);//?

// reduce
function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
  return items.reduce((a, v) => [...a, mapFunc(v)], [] as K[]);
}
myMap([1, 2, 3], v => v * 2);//?
