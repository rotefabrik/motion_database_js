import _ from 'lodash';

import React from 'react';
import {connect} from "react-redux";

import {Page} from "../../../shared/components/layout/page/Page";
import SearchBar from "./SearchBar";
import {Col, Grid, Row} from "react-bootstrap";
import {searchMotions} from "../../../motions/actions/motions";
import MotionsList from "../../../motions/components/MotionsList";


class HomePageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };

        this.onSearchChange = _.debounce((value) => {
            props.searchMotions({'body': value})
        }, 1000);
    }

    componentDidMount() {
        if (!this.state.initialized && _.isEmpty(this.props.motions)) {
            this.props.searchMotions({});
            this.setState({'initialized': true});
        }
    }

    render() {
        return (
            <Page>
                <Grid fluid={true}>
                    <Row>
                        <Col xs={12} md={1} lg={3} />
                        <Col xs={12} md={10} lg={6}>
                            <SearchBar onChange={this.onSearchChange.bind(this)}/>
                        </Col>
                        <Col xs={12} md={1} lg={3} />
                    </Row>
                    <Row>
                        <Col xs={12} md={1} lg={1} />
                        <Col xsHidden={true} md={2}>
                            <span>very well-formed!</span>
                        </Col>
                        <Col md={8}>
                            <MotionsList motions={this.props.motions} />
                        </Col>
                        <Col xs={12} md={1} lg={1} />
                    </Row>
                </Grid>
            </Page>
        );
    }
}


const mapStateToProps = (state, existingProps = {}) => {
    return Object.assign(existingProps, {
        motions: state.motions
    });
};


const mapDispatchToProps = (dispatch, existingProps = {}) => {
    return Object.assign(existingProps, {
        searchMotions: (query) => dispatch(searchMotions(query))
    });
};


HomePageView = connect(mapStateToProps, mapDispatchToProps)(HomePageView);
export default HomePageView;
