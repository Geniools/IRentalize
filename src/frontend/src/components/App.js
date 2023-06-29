import React, {Component, StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

// Import the components
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <HomePage/>
            </>
        );
    }
}

const root = createRoot(document.getElementById('app'));
root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);
// const appDiv = document.getElementById("app");
// render(<App/>, appDiv);