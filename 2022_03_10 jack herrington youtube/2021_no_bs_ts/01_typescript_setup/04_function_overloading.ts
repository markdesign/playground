interface Coordinate {
  x: number;
  y: number;
}

// string
function parseCoordinate(str: string): Coordinate;

// Coordinate
function parseCoordinate(obj: Coordinate): Coordinate;

// number
function parseCoordinate(x: number, y: number): Coordinate;

// overloading example - unknown type, ? is optional
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };
  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach(str => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10); // cast AS x or y
    });
  } else if (typeof arg1 === "object") { // IMPORTANT, typescripot is run time, so check Object, not Coordinate
    coord = {
      ...(arg1 as Coordinate), // doesn't know what arg1 is. so use AS keyword
    };
  } else {
    coord = {
      x: arg1 as number, // cast AS numbers
      y: arg2 as number, // cast AS number
    };
  }
  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 10, y: 20 }));
console.log(parseCoordinate("x:10,y:20"));
console.log(parseCoordinate("foo"));
