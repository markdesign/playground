import { Routes, Route, Link } from "react-router";

import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";

export default function Playground() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="p-8">
                        <Link to="/" className="mb-4 block text-purple-600 hover:underline">
                            ← Back to Home
                        </Link>
                        <h1 className="mb-4 text-2xl font-bold">Playground</h1>
                        <div className="flex flex-col">
                            <Link to="/Playground/Example1">Example1: experiment viewbox</Link>
                            <Link to="/Playground/Example2">
                                Example2: Using d3js innside react app (pluralsight)
                            </Link>
                            <Link to="/Playground/Example3">
                                Example3: react graph gallery - arc diagram
                            </Link>
                            <Link to="/Playground/Example4">
                                Example4: react graph gallery - network chart
                            </Link>
                        </div>
                    </div>
                }
            />
            <Route path="/Example1" element={<Example1 />} />
            <Route path="/Example2" element={<Example2 />} />
            <Route path="/Example3" element={<Example3 />} />
            <Route path="/Example4" element={<Example4 />} />
        </Routes>
    );
}
