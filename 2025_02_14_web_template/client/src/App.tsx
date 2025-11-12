import { BrowserRouter, Routes, Route } from 'react-router';
import { Base } from 'src/pages/Base';
import { Home } from 'src/pages/Home';
import { CSSGrid } from 'src/pages/CSSGrid';
import { Main } from 'src/pages/motion';
import { GoogleMaps } from 'src/pages/googleMaps/GoogleMaps';
import { GoogleTTS } from 'src/pages/googleTTS/GoogleTTS';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/base" element={<Base />} />
                <Route path="/CSSGrid" element={<CSSGrid />} />
                <Route path="/Motion" element={<Main />} />
                <Route path="/GoogleTTS" element={<GoogleTTS />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
