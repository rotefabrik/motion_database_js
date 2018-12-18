import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { mainStore } from './stores/store';
import Routes from "./Routes";


export default class App extends React.Component {
    render() {
        return (
            <Provider store={mainStore}>
                <Routes />
            </Provider>
        );
    }
}
