import { Routes, Route, Link } from "react-router";
import "./App.css";

import LearnAndUnderstandHome from "./pages/learnAndUnderstand";
import MasteringHome from "./pages/MasteringDataVisualization";
import MuratHome from "./pages/muratkemaldar";
import Selikoff from "./pages/Selikoff";
import Playground from "./pages/Playground";
import CSSLayout from "./pages/csslayout";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="p-8">
                        <h1 className="mb-4 text-2xl font-bold">D3 Charts Demo</h1>
                        <div className="flex flex-col">
                            <Link to="/learnAndUnderstand">udemy: Learn and Understand</Link>
                            <Link to="/mastering-data-viz">
                                udemy: Mastering Data Visualization
                            </Link>
                            <Link to="/muratkemaldar">youtube: Murat Kemal Dar</Link>
                            <Link to="/Selikoff">youtube: Selikoff</Link>
                            <Link to="/Playground">Playground</Link>
                            <Link to="/CSSLayout">CSSLayout</Link>
                        </div>
                    </div>
                }
            />

            <Route path="/learnAndUnderstand/*" element={<LearnAndUnderstandHome />} />
            <Route path="/mastering-data-viz/*" element={<MasteringHome />} />
            <Route path="/muratkemaldar/*" element={<MuratHome />} />
            <Route path="/Selikoff/*" element={<Selikoff />} />
            <Route path="/Playground/*" element={<Playground />} />
            <Route path="/CSSLayout/*" element={<CSSLayout />} />
        </Routes>
    );
}

export default App;
