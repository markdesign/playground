/* eslint-disable no-unused-vars */
import React from "react";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";

function App() {
  return (
    <div className="App">
      {/* Example of basic data */}
      {/* <Example1 /> */}

      {/* Example of object or array, useing second param in memo */}
      {/* <Example2 /> */}

      {/* Example of object, useing useMemo */}
      <Example3 />

      {/* Example of function, using useCallBack */}
      {/* <Example4 /> */}
    </div>
  );
}

export default App;
