import path from 'path';

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';


class LoadingComponent extends React.Component {
    render() {
        return (<span></span>)
    }
}


const HomeComponent =  Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '../home/components/homepage'),
    loading: LoadingComponent,
});


export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    component={() => <HomeComponent />} />
            </Switch>
        );
    }
}
