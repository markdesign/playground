// Mastering data visualization in D3.js
// https://marcelclasses.udemy.com/course/masteringd3js

import { Routes, Route, Link, useLocation } from "react-router";

// Import all the examples
import Example2 from "./Example2";
import Example7 from "./Example7";

export default function MasteringDataVisualization() {
    const location = useLocation();
    const isRoot = location.pathname === "/mastering-data-viz";

    if (isRoot) {
        return (
            <div className="p-8">
                <Link to="/" className="mb-4 block text-green-600 hover:underline">
                    ← Back to Home
                </Link>
                <h1 className="mb-4 text-2xl font-bold">Mastering Data Visualization</h1>
                <div className="space-y-2">
                    <Link
                        to="/mastering-data-viz/Example2"
                        className="block text-green-600 hover:underline"
                    >
                        Example2
                    </Link>
                    <Link
                        to="/mastering-data-viz/Example7"
                        className="block text-green-600 hover:underline"
                    >
                        Example7
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/Example2" element={<Example2 />} />
            <Route path="/Example7" element={<Example7 />} />
        </Routes>
    );
}
