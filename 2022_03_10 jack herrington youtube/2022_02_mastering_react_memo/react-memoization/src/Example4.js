import { useState, memo, useMemo, useCallback } from "react";
import "./App.css";

/*
  usecallback fixes same with wuth object or array.
  useCallback returns the exact same function
*/

function Swatch({ params, onClick }) {
  console.log(`Swatch  rendered ${params.colors}`);
  return <div onClick={onClick} style={{ margin: 2, width: 75, height: 75, backgroundColor: params.colors }}></div>;
}

const MemoedSwatch = memo(Swatch);

function Example3() {
  const [appRenderIndex, setAppRenderIndex] = useState(0);
  const [colors, setColors] = useState("red");

  const params = useMemo(() => ({ colors }), [colors]);

  const onClick = useCallback(() => {}, []);

  return (
    <div className="App">
      <div>
        <button onClick={() => setAppRenderIndex(appRenderIndex + 1)}>Re-render app</button>
      </div>
      <div>
        <button onClick={() => setColors(colors === "red" ? "blue" : "red")}>Change color</button>
      </div>
      <div>
        <MemoedSwatch params={params} onClick={onClick} />
      </div>
    </div>
  );
}

export default Example3;
