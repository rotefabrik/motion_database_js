import _ from 'lodash';

import React from 'react';
import MotionItem from "./MotionItem";

if (process.env.BROWSER) {
    require('./MotionsList.scss');
}


export default class MotionsList extends React.Component {
    render() {
        const motions = this.buildMotions();
        return (
            <ul className="md-motions-list">
                {motions}
            </ul>
        );
    }

    buildMotions() {
        let motions = [];
        if (this.props.motions && this.props.motions.items) {
            _.each(this.props.motions.items, (item, index) => {
                let motion = (<MotionItem key={index} {...item} />);
                motions.push(motion);
            });
        }
        return motions;
    }
}
