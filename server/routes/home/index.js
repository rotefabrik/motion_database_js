import ReactView from "../shared";
import {retrieveMotionsFromAPI} from "../../../src/motions/actions/motions";
import {DEFAULT_FILTERS} from "../../../src/home/components/homepage/filterConstants";


export class HomeView extends ReactView {
    getInitialStoreContent(req, callback) {
        super.getInitialStoreContent(req, (err, baseConfig) => {
            const configWithFilters = Object.assign({}, baseConfig, {filters: DEFAULT_FILTERS});
            retrieveMotionsFromAPI({}, 1, 25)
                .then(
                    data => callback(null, Object.assign({}, configWithFilters, {motions: data})),
                    err => callback(err, configWithFilters)
                )
        });
    }
}
