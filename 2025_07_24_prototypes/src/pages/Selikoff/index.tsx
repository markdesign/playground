// https://www.youtube.com/watch?v=kPbRDn5Fg0Y


import { Routes, Route, Link } from "react-router";

import Example1 from "./Example1";
import Example2 from "./Example2";

export default function Selikoff() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="p-8">
                        <Link to="/" className="mb-4 block text-purple-600 hover:underline">
                            ← Back to Home
                        </Link>
                        <h1 className="mb-4 text-2xl font-bold">Sam selikoff</h1>
                        <div className="flex flex-col">
                            <Link to="/Selikoff/Example1">Example1</Link>
                        </div>
                        <div className="flex flex-col">
                            <Link to="/Selikoff/Example2">Example2</Link>
                        </div>
                    </div>
                }
            />
            <Route path="/Example1" element={<Example1 />} />
            <Route path="/Example2" element={<Example2 />} />
        </Routes>
    );
}
