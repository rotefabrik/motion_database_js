import { applyMiddleware, createStore } from "redux";
import { reducers } from "../../../src/shared/stores/store";
import thunk from "redux-thunk";
import ReactDOMServer from "react-dom/server";
import Loadable from "react-loadable";
import * as React from "react";
import { getBundles } from "react-loadable/lib/webpack";
import { each, map } from "lodash";
import App from "../../../src/shared/App";
import { StaticRouter } from 'react-router';
import config from 'react-global-configuration';
import {createLogger} from "redux-logger";

const logger = createLogger();

const stats = require('../../../dist/react-loadable.json');


export default class ReactView {
    component = undefined;

    buildGet() {
        return (req, res, next) => {
            this.getInitialStoreContent(req, (err, initialStoreContent) => {
                if (err) {
                    console.error(err);
                }

                this.setupStoreContent(req, initialStoreContent, (err, storeContent) => {
                    if (err) {
                        console.error(err);
                        res.status(500);
                        res.render('errors/server_error', { error: err });
                        return;
                    }

                    const store = this.createStore(storeContent);

                    const Component = this.getComponent();
                    const props = this.getProps(storeContent);

                    this.buildRenderInfo(req, store, storeContent, Component, props, (err, renderInfo) => {
                        const preloadInfo = this.buildPreLoadInfo(renderInfo.modules);
                        this.render(res, renderInfo.html, store, preloadInfo);
                    });
                });
            });
        }
    }

    getInitialStoreContent(req, callback) {
        return callback(null, {
            config: config.get(),
        });
    }

    createStore(initialStoreData) {
        return createStore(reducers, initialStoreData, applyMiddleware(thunk, logger));
    }

    getTemplate() {
        return 'base';
    }

    getName() {
        return 'home';
    }

    setupStoreContent(req, initialStoreContent, callback) {
        return callback(null, initialStoreContent);
    }

    buildRenderInfo(req, store, storeContent, Component, props, callback) {
        let modules = [];

        const context = {};

        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
                <StaticRouter location={req.url} context={context}>
                    <App store={store} />
                </StaticRouter>
            </Loadable.Capture>
        );

        return callback(null, {
            html: html,
            modules: modules
        });
    }

    buildPreLoadInfo(modules) {
        const bundles = getBundles(stats, modules);
        return {
            styles: this.styles || map(bundles.filter(bundle => bundle.file.endsWith('.css')), (item) => item.file),
            scripts: this.scripts || map(bundles.filter(bundle => bundle.file.endsWith('.js')), (item) => item.file)
        }
    }

    getComponent() {
        return this.component;
    }

    getProps(initialStoreContent) {
        return {};
    }

    getTitle() {
        return 'Antragsdatenbank: Startseite';
    }

    generateSeed() {
        return new Date().getTime();
    }

    buildScriptLinks(scripts, seed) {
        let scriptLinks = [];
        each(scripts, (script) => {
            scriptLinks.push('<script src="/static/' + script + '?cache_breaker=' + seed + '"></script>');
        });
        return scriptLinks.join('\n');
    }

    buildStyleLinks(styles, seed) {
        let styleLinks = [];
        each(styles, (style) => {
            styleLinks.push('<link rel="stylesheet" href="/static/' + style + '?cache_breaker=' + seed + '">');
        });
        return styleLinks.join('\n');
    }

    render(res, html, store, preloadInfo) {
        const template = this.getTemplate();
        const name = this.getName();
        const title = this.getTitle();
        const seed = this.generateSeed();

        res.render(template, {
            name: name,
            body: html,
            loadedScripts: this.buildScriptLinks(preloadInfo.scripts, seed),
            loadedStyles: this.buildStyleLinks(preloadInfo.styles, seed),
            title: title,
            seed: seed,
            store: JSON.stringify(store.getState())
        });
    }

}
