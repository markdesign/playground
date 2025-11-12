import { Routes, Route, Link, useLocation } from "react-router";

// Import all the examples
import Example2 from "./Example2";
import Example3 from "./Example3";
import Example4 from "./Example4";
import Example5 from "./Example5";
import Example6 from "./Example6";

export default function MuratKemalDar() {
    const location = useLocation();
    const isRoot = location.pathname === "/muratkemaldar";

    if (isRoot) {
        return (
            <div className="p-8">
                <Link to="/" className="mb-4 block text-purple-600 hover:underline">
                    ← Back to Home
                </Link>
                <h1 className="mb-4 text-2xl font-bold">Murat Kemal Dar</h1>
                <div className="flex flex-col">
                    <Link to="/muratkemaldar/Example2">Example2</Link>
                    <Link to="/muratkemaldar/Example3">Example3</Link>
                    <Link to="/muratkemaldar/Example4">Example4</Link>
                    <Link to="/muratkemaldar/Example5">Example5 (Tool Tip)</Link>
                    <Link to="/muratkemaldar/Example6">Example6 (Responsive)</Link>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/Example2" element={<Example2 />} />
            <Route path="/Example3" element={<Example3 />} />
            <Route path="/Example4" element={<Example4 />} />
            <Route path="/Example5" element={<Example5 />} />
            <Route path="/Example6" element={<Example6 />} />
        </Routes>
    );
}
