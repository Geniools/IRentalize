import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./services/store/store";

import Layout from "./hocs/Layout";

import {getApp} from "./utils/helpers/getApp";

const App = () => {
    const CurrentApp = getApp();

    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <CurrentApp/>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;