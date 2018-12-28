import {each, isEmpty} from "lodash";
import React from 'react';
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import classNames from 'classnames';

import {Page} from "../../../shared/components/layout/page/Page";
import {retrieveMotion} from "../../actions/motions";
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./MotionView.scss');
}


class MotionSection extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={12} md={1} lg={1} />
                <Col xs={12} md={1} lg={6}>
                    {this.props.children}
                </Col>
                <Col xs={12} md={1} lg={5} />
            </Row>
        );
    }
}


class MotionHeader extends React.Component {
    render() {
        return (
            <MotionSection>
                <div className="md-motion-header">
                    <Link to="/">{"<<"} Zurück zur Übersicht</Link>
                </div>
            </MotionSection>
        );
    }
}



class MotionTitle extends React.Component {
    render() {
        const {motion} = this.props;
        return (
            <MotionSection>
                <div className="md-motion-title">
                    <h1>{motion.title}</h1>
                </div>
            </MotionSection>
        );
    }
}


class MotionMeta extends React.Component {
    render() {
        const {motion} = this.props;
        const {convention, section, status} = motion;

        const conventionLabel = convention && convention.label ? convention.label : 'unbekannt';
        const sectionName = section && section.name ? section.name : 'unbekannt';

        const submitters = this.buildSubmitters();

        const statusKlass = this.buildStatusKlass(status);

        const referrals = this.buildReferrals();

        return (
            <MotionSection>
                <div className="md-motion-meta">
                    <table>
                        <tbody>
                            <tr>
                                <th>Parteitag</th>
                                <td>{conventionLabel}</td>
                            </tr>
                            <tr>
                                <th>Abschnitt</th>
                                <td>{sectionName}</td>
                            </tr>
                            <tr>
                                <th>Antragsteller*innen</th>
                                <td>{submitters}</td>
                            </tr>
                            <tr>
                                <th className={statusKlass}>Status</th>
                                <td>{i18next.t(status)}</td>
                            </tr>
                            {referrals}
                        </tbody>
                    </table>
                </div>
            </MotionSection>
        );
    }

    buildSubmitters() {
        if (!isEmpty(this.props.motion) && !isEmpty(this.props.motion.submitters)) {
            let submitterParts = [];
            each(this.props.motion.submitters, (item) => {
                submitterParts.push(item.name);
            });
            return submitterParts.join(', ');
        }
        return "keine bekannt";
    }

    buildStatusKlass(status) {
        const klassOptions = {'md-status': true};
        klassOptions[status] = true;
        return classNames(klassOptions);
    }

    buildReferrals() {
        if (!isEmpty(this.props.motion) && !isEmpty(this.props.motion.referrals)) {

            let referrals = null;

            if (this.props.motion.referrals.length > 1) {
                let referralItems = [];
                each(this.props.motion.referrals, (item) => {
                    referralItems.push(<li>{item.name}</li>);
                });
                referrals = (<ul>{referralItems}</ul>);
            } else {
                referrals = this.props.motion.referrals[0].name;
            }
            return (
                <tr>
                    <th>Überweisungen</th>
                    <td>
                        {referrals}
                    </td>
                </tr>
            );
        }
        return null;
    }
}


class MotionBody extends React.Component {
    render() {
        const {motion} = this.props;
        return (
            <MotionSection>
                <div dangerouslySetInnerHTML={{__html:motion.body}} />
            </MotionSection>
        );
    }
}


class MotionView extends React.Component {
    componentDidMount() {
        if (isEmpty(this.props.motion) || this.props.motion.id !== this.props.match.params.id) {
            this.props.retrieveMotion(this.props.match.params.id);
        }
    }

    render() {
        const {motion} = this.props;
        return (
            <Page>
                <Grid fluid={true}>
                    <MotionHeader />
                    <MotionTitle motion={motion} />
                    <MotionMeta motion={motion} />
                    <MotionBody motion={motion} />
                </Grid>
            </Page>
        );
    }
}


const mapStateToProps = (state, existingProps = {}) => {
    return Object.assign({}, existingProps, {
        motion: state.motion
    });
};


const mapDispatchToProps = (dispatch, existingProps = {}) => {
    return Object.assign({}, existingProps, {
        retrieveMotion: (id) => dispatch(retrieveMotion(id))
    });
};


MotionView = connect(mapStateToProps, mapDispatchToProps)(MotionView);
export default MotionView;
