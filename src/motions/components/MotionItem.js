import React from 'react';
import classNames from 'classnames';
import {each, isEmpty} from "lodash";
import { Link } from 'react-router-dom';
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

        const section = this.buildSection();

        const referred = this.buildReferred();

        const toggleText = i18next.t(this.state.open ? 'contract' : 'expand');

        const singleMotionLink = '/antrag/' + this.props.id;

        return (
            <li className="md-motion-item">
                <table>
                    <tbody>
                        <tr>
                            <td className={sidebarKlasses}/>

                            <td className="md-body">
                                <ul className="md-context">
                                    {convention}
                                    {section}
                                    {submitters}
                                </ul>

                                <h1 className="md-title">
                                    <Link to={singleMotionLink}>{this.props.title}</Link>
                                </h1>

                                {referred}

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
                let submitter = (<li key={index}
                                     className="md-submitter">{submitterInfo.name}</li>);
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
            <li key="convention" className="md-convention">{this.props.convention.label}</li>
        );
    }

    buildSection() {
        if (!this.props.section) {
            return null;
        }
        return (
            <li key="section" className="md-section">{this.props.section.name}</li>
        );
    }

    buildReferred() {
        if (isEmpty(this.props.referrals)) {
            return null;
        }
        const referrals = [];
        each(this.props.referrals, (item, index) => {
            referrals.push(
                <li key={index}
                    className="md-referral-item">
                    {item.name}
                </li>
            );
        });
        return (
            <table className="md-referrals">
                <tbody>
                    <tr>
                        <td className="md-referral-icon">⤷</td>
                        <td>
                            <ul className="md-referral-list">
                                {referrals}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
