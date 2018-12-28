import React from 'react';
import { Provider } from 'react-redux';
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';

import Routes from "./Routes";


export default class App extends React.Component {
    render() {
        return (
            <I18nextProvider i18n={i18n}>
                <Provider store={this.props.store}>
                    <Routes />
                </Provider>
            </I18nextProvider>
        );
    }
}
