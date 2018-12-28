import ReactView from "../shared";

import {retrieveMotionFromAPI} from "../../../src/motions/actions/motions";


export class MotionView extends ReactView {
    getInitialStoreContent(req, callback) {
        super.getInitialStoreContent(req, (err, baseConfig) => {
            retrieveMotionFromAPI(req.params.id).then(
                data => callback(null, Object.assign({}, baseConfig, {'motion': data})),
                error => callback(err, baseConfig)
            )
        });
    }
}
