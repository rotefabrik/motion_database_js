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

const stats = require('../../../dist/react-loadable.json');


export default class ReactView {
    component = undefined;

    buildGet() {
        return (req, res, next) => {
            const initialStoreContent = this.getInitialStoreContent();

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
        }
    }

    getInitialStoreContent() {
        return {
            config: config.get(),
            filters: {
                convention: {
                    'I/2019': true,
                    'II/2018': false,
                    'I/2018': false,
                    'IV/2017': false,
                    'II/2017': false,
                    'I/2017': false,
                    'III/2016': false,
                    'I/2016': false,
                    'II/2015': false,
                    'I/2015': false,
                    'II/2014': false,
                    'I/2014': false,
                    'I/2013': false
                },
                section: {
                    'Arbeit / Wirtschaft': false,
                    'Bauen / Wohnen / Stadtentwicklung': false,
                    'Bildung': false,
                    'Mobilität': false,
                    'Inneres / Recht': false,
                    'Gesundheit': false,
                    'Flüchtlings- / Asylpolitik': false,
                    'Organisationspolitik': false,
                    'Soziales': false,
                    'Gleichstellung': false,
                    'Initiativanträge': false,
                    'Europa': false,
                    'Organisation': false,
                    'Finanzen': false,
                    'Wahlen': false,
                    'Statuten- und Richtlinienänderungen': false,
                    'Familie / Kinder / Jugend': false,
                    'Inneres': false,
                    'Umwelt / Energie': false,
                    'Internationales': false,
                    'Kultur': false,
                    'Digital / Medien / Datenschutz': false,
                    'Inneres/Verwaltung': false,
                },
                submitters: {
                    'Jusos LDK': false,
                    'KDV Friedrichshain-Kreuzberg': false,
                    'KDV Mitte': false,
                    'KDV Spandau': false,
                    'KDV Lichtenberg': false,
                    'KDV Charlottenburg-Wilmersdorf': false,
                    'KDV Neukölln': false,
                    'KDV Steglitz-Zehlendorf': false,
                    'KDV Marzahn-Hellersdorf': false,
                    'KDV Pankow': false,
                    'KDV Tempelhof-Schöneberg': false,
                    'KDV Reinickendorf': false,
                    'KDV Treptow-Köpenick': false
                },
                status: {
                    'accepted': false,
                    'rejected': false,
                    'not_voted': false,
                    'dismissed': false,
                    'referred': false
                }
            }
        };
    }

    createStore(initialStoreData) {
        return createStore(reducers, initialStoreData, applyMiddleware(thunk));
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
                    <App />
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
