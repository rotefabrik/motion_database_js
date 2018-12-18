import {each} from 'lodash';
import config from 'react-global-configuration';

import { objectToQueryParams } from '../tools';

import request from 'request-promise';


export default class API {

    constructor() {
        console.log(config);
        this.apiEndpoint = config.get('API_ENDPOINT', '');
    }

    get(url, data={}, headers={}) {
        let queryString = objectToQueryParams(data);
        let urlParams = queryString ? '?' + queryString : '';
        const options = {
            uri: this.apiEndpoint + url + urlParams,
            method: 'GET',
            json: true
        };
        return this.request(options);
    }

    post(url, data={}, headers={}) {
        const options = {
            uri: this.apiEndpoint + url,
            method: 'POST',
            form: data,
            json: true
        };
        return this.request(options);
    }

    postMultipart(url, formData={}, headers={}) {
        let items = [];
        each(formData, (key, value) => {
            items.push(
                {
                    'Content-Disposition': 'form-data; name="filedata"; filename="' + key + '"',
                    body: value
                }
            );
        });
        const options = {
            uri: this.apiEndpoint + url,
            method: 'POST',
            headers: Object.assign(headers, {'Content-type': 'multipart/form-data'}),
            multipart: {
                chunked: false,
                data: items
            }
        };
        return this.request(options);
    }

    put(url, data={}, headers={}) {
        const options = {
            uri: this.apiEndpoint + url,
            method: 'PUT',
            body: data,
            json: true
        };
        return this.request(options);
    }

    request(options) {

        // ensure correct headers
        let mandatoryHeaders = {
            //'X-CSRFToken': typeof window !== 'undefined' ? window.CSRF_TOKEN: 'xxx'
        };

        if (!options.headers) {
            options.headers = {};
        }
        options.headers = Object.assign(options.headers, mandatoryHeaders);

        return request(options);
    }
}
