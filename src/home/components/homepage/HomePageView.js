import _ from 'lodash';

import React from 'react';
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";

import {changeFilterValue, resetFilters} from "../../actions/filters";
import {searchMotions} from "../../../motions/actions/motions";

import {Page} from "../../../shared/components/layout/page/Page";
import SearchBar from "./SearchBar";
import MotionsList from "../../../motions/components/MotionsList";
import Pagination from "../../../shared/components/controls/Pagination";
import MotionFilterForm from "./MotionFilterForm";

const DEFAULT_START_PAGE = 1;
const DEFAULT_PAGE_ITEMS = 20;


class HomePageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: DEFAULT_START_PAGE,
            pageItems: DEFAULT_PAGE_ITEMS
        };

        const self = this;
        this.onSearchChange = _.debounce((value) => {
            self.setState({page: 1});
            this.props.changeFilterValue('body', value);
        }, 1000);

        if (_.isEmpty(props.filters)) {
            props.resetFilters();
        }
    }

    componentDidMount() {
        if (_.isEmpty(this.props.filters)) {
            this.props.resetFilters();
        }
        const query = this.buildQuery();
        this.props.searchMotions(query, this.state.page, this.state.pageItems);
    }

    componentDidUpdate(prevProps) {
        if (this.props.filters !== prevProps.filters) {
            const query = this.buildQuery();
            this.props.searchMotions(query, this.state.page, this.state.pageItems);
            this.setState({page: DEFAULT_START_PAGE});
        }
    }

    onPageChange(page) {
        if (page !== this.state.page) {
            this.setState({
                page: page
            });
            const query = this.buildQuery();
            this.props.searchMotions(query, page, this.state.pageItems);
        }
    }

    buildQuery() {
        const filterQuery = {};
        _.each(this.props.filters, (sectionOptions, sectionName) => {
            if (sectionName === 'body') {
                filterQuery[sectionName] = sectionOptions;
            } else {
                filterQuery[sectionName] = [];
                _.each(sectionOptions, (checked, optionName) => {
                    if (checked) {
                        filterQuery[sectionName].push(optionName);
                    }
                });
            }
        });
        return filterQuery;
    }

    render() {
        return (
            <Page>
                <Grid fluid={true}>

                    <Row>
                        <Col xs={12} md={1} lg={1} />
                        <Col xs={12} md={10} lg={6}>
                            <SearchBar onChange={this.onSearchChange.bind(this)} />
                        </Col>
                        <Col xs={12} md={1} lg={5} />
                    </Row>

                    <Row>
                        <Col xs={12} sm={12} md={1} lg={1} />
                        <Col xsHidden={true} smHidden={true} md={2} lg={2}>
                            <MotionFilterForm
                                filters={this.props.filters}
                                onFilterChange={this.props.changeFilterValue} />
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <MotionsList motions={this.props.motions} />
                            <Pagination
                                page={this.state.page}
                                pageItems={this.state.pageItems}
                                total={this.props.motions ? this.props.motions.total : 0}
                                onPageChange={this.onPageChange.bind(this)}/>
                        </Col>
                        <Col xs={12} md={1} lg={5} />
                    </Row>

                </Grid>
            </Page>
        );
    }
}


const mapStateToProps = (state, existingProps = {}) => {
    return Object.assign({}, existingProps, {
        motions: state.motions,
        filters: state.filters
    });
};


const mapDispatchToProps = (dispatch, existingProps = {}) => {
    return Object.assign({}, existingProps, {
        resetFilters: () => dispatch(resetFilters()),
        changeFilterValue: (section, name, value) => dispatch(changeFilterValue(section, name, value)),
        searchMotions: (query, page, pageItems) => dispatch(searchMotions(query, page, pageItems))
    });
};


HomePageView = connect(mapStateToProps, mapDispatchToProps)(HomePageView);
export default HomePageView;
