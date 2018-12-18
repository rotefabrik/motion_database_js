import React from 'react';


export default class MotionItem extends React.Component {
    render() {
        return (
            <li className="md-motion-item">
                {this.props.title}
            </li>
        );
    }
}
