// Learn and Understand D3.js for Data Visualization
// https://marcelclasses.udemy.com/course/learn-d3js-for-data-visualization

import { Routes, Route, Link, useLocation } from "react-router";

// Import all the examples
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";
import Hierarchy from "./Hierarchy";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";

export default function LearnAndUnderstand() {
    const location = useLocation();
    const isRoot = location.pathname === "/learnAndUnderstand";

    if (isRoot) {
        return (
            <div className="p-8">
                <Link to="/" className="mb-4 block text-blue-600 hover:underline">
                    ← Back to Home
                </Link>
                <h1 className="mb-4 text-2xl font-bold">Learn and Understand</h1>
                <div className="flex flex-col">
                    <Link to="/learnAndUnderstand/example1">Example 1</Link>
                    <Link to="/learnAndUnderstand/example2">Example 2</Link>
                    <Link to="/learnAndUnderstand/example3">Example 3</Link>
                    <Link to="/learnAndUnderstand/example4">Example 4</Link>
                    <Link to="/learnAndUnderstand/hierarchy">Hierarchy</Link>
                    <Link to="/learnAndUnderstand/section2">Section 2</Link>
                    <Link to="/learnAndUnderstand/section3">Section 3</Link>
                    <Link to="/learnAndUnderstand/section4">Section 4</Link>
                    <Link to="/learnAndUnderstand/section5">Section 5</Link>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/example1" element={<Example1 />} />
            <Route path="/example2" element={<Example2 />} />
            <Route path="/example3" element={<Example3 />} />
            <Route path="/example4" element={<Example4 />} />
            <Route path="/hierarchy" element={<Hierarchy />} />
            <Route path="/section2" element={<Section2 />} />
            <Route path="/section3" element={<Section3 />} />
            <Route path="/section4" element={<Section4 />} />
            <Route path="/section5" element={<Section5 />} />
        </Routes>
    );
}
