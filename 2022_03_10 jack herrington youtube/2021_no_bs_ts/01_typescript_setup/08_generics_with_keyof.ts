// Example 1
function pluck<DataType, KeyType extends keyof DataType>(items: DataType[], key: KeyType): DataType[KeyType][] {
  return items.map(item => item[key]);
}
const dogs = [
  { name: "Mimi", age: 12 },
  { name: "LG", age: 13 },
];
console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

// Example 2
interface BaseEvent {
  time: number;
  user: string;
}
// use & to add new properties to an interface
interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}
function sendEvent<Name extends keyof EventMap>(name: Name, data: EventMap[Name]): Array<unknown> {
  console.log([name, data]);
  return [name, data];
}
sendEvent("addToCart", {
  productID: "foo",
  user: "baz",
  quantity: 1,
  time: 10,
}); //?
sendEvent("checkout", { time: 20, user: "bob" }); //?
