import { useState, memo, useMemo } from "react";
import "./App.css";

/*
 react memo does shallow comparison of props.
 so if you pass in a complex object, it will re-render.
*/

function Swatch({ params }) {
  console.log(`Swatch  rendered ${params.colors}`);
  return <div style={{ margin: 2, width: 75, height: 75, backgroundColor: params.colors }}></div>;
}

const MemoedSwatch = memo(Swatch);

function Example3() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [colors, setColors] = useState("red");

  // useMemo is a hook that returns a memoized value.
  // only changes if colors changes.
  const params = useMemo(() => ({ colors }), [colors]);

  return (
    <div className="App">
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-render app</button>
      </div>
      <div>
        <button onClick={() => setColors(colors === "red" ? "blue" : "red")}>Change color</button>
      </div>
      <div>
        <MemoedSwatch params={params} />
      </div>
    </div>
  );
}

export default Example3;

/*
// Bad EXAMPLE 1
// Bad case of useMemo
const value = useMemo(
  () => number1 + number2, 
  [number1, number2]
)

// Good case, value is only primitive value
const value = number1 + number2;


// Bad  EXAMPLE 2
// Bad case of useMemo
const value = useMemo( () => 
  `${first} ${last}`,
  [first, last]
);
// Good
const value = `${first} ${last}`;


// Good EXAMPLE 1
// Good case of useMemo. numbers could be HUGE. we don't know
const value = useMemo(
  () => numbers.reduce((a, v) => a + v, 0),
  [numbers]
);

// Good EXAMPLE 2
// Good case of useMemo. numbers could be HUGE. we don't know
const multipliedValues = useMemo(
  () => numbers.map(n => n * 100),
  [numbers]
)

// Good EXAMPLE 3
// Good case of useMemo. becasue we are creating object
const person = useMemo(
  () => ({
    first, last, full: `${first} ${last}`
  }),
  [first, last]
)

*/
