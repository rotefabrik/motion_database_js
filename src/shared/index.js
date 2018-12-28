import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import config from 'react-global-configuration';

import Loadable from 'react-loadable';

import App from './App';

import { mainStore } from './stores/store';


window.main = () => {
    config.set(window.__STORE__.config);
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <BrowserRouter>
                <App store={mainStore} />
            </BrowserRouter>,
        document.getElementById('root'));
    });
};
