import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Import the components
import IndexPage from "./pages/IndexPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<IndexPage/>}/>
                <Route exact path="/about-us/" element={<AboutUsPage/>}/>
            </Routes>
        </Router>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);