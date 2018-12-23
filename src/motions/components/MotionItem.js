import React from 'react';
import classNames from 'classnames';
import {each} from "lodash";
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./MotionItem.scss');
}



export default class MotionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    toggle() {
        this.setState({open: !(this.state && this.state.open)});
    }

    render() {
        const sidebarKlasses = classNames(Object.assign({'md-sidebar': true}, {[this.props.status]: true}));

        const textBodyKlasses = classNames({'md-full-text': true, 'open': (this.state && this.state.open)});

        const submitters = this.buildSubmitters();

        const convention = this.buildConvention();

        const toggleText = i18next.t(this.state.open ? 'contract' : 'expand');

        return (
            <li className="md-motion-item">
                <table>
                    <tbody>
                        <tr>
                            <td className={sidebarKlasses}/>

                            <td className="md-body">
                                <ul className="md-context">
                                    {convention}
                                    {submitters}
                                </ul>

                                <h1 className="md-title">
                                    <a href="">{this.props.title}</a>
                                </h1>

                                <div className={textBodyKlasses}>
                                    <div dangerouslySetInnerHTML={{__html: this.props.body}} />
                                </div>

                            </td>

                            <td className="md-toggle" onClick={this.toggle.bind(this)}>
                                <a>
                                    ({toggleText})
                                </a>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </li>
        );
    }

    buildSubmitters() {
        const submitters = [];
        if (this.props.submitters) {
            each(this.props.submitters, (submitterInfo, index) => {
                let submitter = (<li className="md-submitter">{submitterInfo.name}</li>);
                submitters.push(submitter);
            });
        }
        return submitters;
    }

    buildConvention() {
        if (!this.props.convention) {
            return null;
        }
        return (
            <li className="md-convention">{this.props.convention.label}</li>
        );
    }
}
