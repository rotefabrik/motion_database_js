"use strict";

import path from 'path';
import express from 'express';
import Loadable from 'react-loadable';
import mustacheExpress from 'mustache-express';
import dotenv from 'dotenv';

const envConfig = dotenv.config().parsed;

const server = express();

server.engine('mustache', mustacheExpress());
server.set('view engine', 'mustache');
server.set('views', __dirname + '/templates');

server.use('/static', express.static(path.resolve(__dirname, '..', 'dist')));

import buildRoutes from './routes';
buildRoutes(server, envConfig);

Loadable.preloadAll().then(() => {
    server.listen(8080);
}).catch(err => {
    console.log(err);
});