import { useState, memo } from "react";
import "./App.css";

function Swatch({ color }) {
  console.log(`Swatch  rendered ${color}`);
  return <div style={{ margin: 2, width: 75, height: 75, backgroundColor: color }}></div>;
}

// This will always re-render only if color changes. without memo, it will always render
const MemoedSwatch = memo(Swatch);

function Example1() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [colors, setColors] = useState("red");

  // console.log(`App rendered ${appRenderIndex} times`);

  return (
    <div className="App">
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-render app</button>
      </div>
      <div>
        <button onClick={() => setColors(colors === "red" ? "blue" : "red")}>Change color</button>
      </div>
      <div>
        <MemoedSwatch color={'RED'} />
        <MemoedSwatch color={colors} />
        {/* <MemoedSwatch color={colors === "red" ? "blue" : "red"} /> */}
      </div>
    </div>
  );
}

export default Example1;

/*
Notes:

Not same as classical memoization like lodash memoize.
Lodash returns a cached version.
React re-renders if the value changes from previous render only.

*/
