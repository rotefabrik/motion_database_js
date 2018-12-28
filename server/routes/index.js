import { each } from 'lodash';
import config from 'react-global-configuration';

import {HomeView} from "./home";
import {MotionView} from "./motion";


const ROUTES = {
    '/': {view: HomeView},
    '/antrag/:id': {view: MotionView}
};


export default (server, envConfig) => {
    config.set(envConfig);

    each(ROUTES, (options, route) => {
        server.get(route, new options.view(envConfig).buildGet())
    });
};
