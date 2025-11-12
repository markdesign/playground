import { Routes, Route, Link } from "react-router";

import Example1 from "./Example1";

export default function CSSLayout() {
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
                            <Link to="/CSSLayout/Example1">Example1: side bar</Link>
                        </div>
                    </div>
                }
            />
            <Route path="/Example1" element={<Example1 />} />
        </Routes>
    );
}
