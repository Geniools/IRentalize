import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Import the components
import HomePage from "./HomePage";

export default function App() {
    return (
        <>
            <HomePage/>
        </>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);