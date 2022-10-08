import { useState, memo } from "react";
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

// One solution is to pass a second argument to memo.
// const MemoedSwatch = memo(Swatch, (prevProps, nextProps) => {
//   return prevProps.params.colors === nextProps.params.colors;
// });

function Example2() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [colors, setColors] = useState("red");

  return (
    <div className="App">
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-render app</button>
      </div>
      <div>
        <button onClick={() => setColors(colors === "red" ? "blue" : "red")}>Change color</button>
      </div>
      <div>
        <MemoedSwatch params={{ colors }} />
        {/* <MemoedSwatch params={{ colors: "blue" }} /> */}
      </div>
    </div>
  );
}

export default Example2;


/*
April 6, 2022 at 12:02:01 PM PDT
this is not really working. it still does not render
you don't really need second argument in memo.
*/