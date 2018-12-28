import React from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import SearchBar from "../../../../home/components/homepage/SearchBar";
import MotionFilterForm from "../../../../home/components/homepage/MotionFilterForm";
import MotionsList from "../../../../motions/components/MotionsList";
import Pagination from "../../controls/Pagination";

if (process.env.BROWSER) {
    require('./Footer.scss');
}



export default class Footer extends React.Component {
    render() {
        return (
            <div className="md-page-footer">
                <Grid fluid={true}>
                    <Row>
                        <Col xs={12} md={1} lg={1} />
                        <Col xs={12} md={10} lg={6}>
                            <div className="md-page-footer-content">
                                <a href="mailto:fkauder@gmail.com">Friedrich Kauder</a> / 2018
                            </div>
                        </Col>
                        <Col xs={12} md={1} lg={5} />
                    </Row>
                </Grid>
            </div>
        );
    }
}