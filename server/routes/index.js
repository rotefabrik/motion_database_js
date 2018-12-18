import { each } from 'lodash';
import config from 'react-global-configuration';
import ReactView from "./shared";


const ROUTES = {
    '/': {view: ReactView}
};


export default (server, envConfig) => {
    config.set(envConfig);

    each(ROUTES, (options, route) => {
        server.get(route, new options.view(envConfig).buildGet())
    });
};
