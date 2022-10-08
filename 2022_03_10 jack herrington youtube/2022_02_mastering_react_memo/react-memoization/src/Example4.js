import { useState, useMemo, useCallback } from "react";
import MemoedSwatch from "./Swatch4";
import "./App.css";

/*
  usecallback fixes same with wuth object or array.
  useCallback returns the exact same function
*/

function Example4() {
    const [appRenderIndex, setAppRenderIndex] = useState(0);
    const [colors, setColors] = useState("red");

    const params = useMemo(() => ({ colors }), [colors]);

    const onClick = useCallback(() => {
        console.log("Here");
    }, []);

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

export default Example4;
