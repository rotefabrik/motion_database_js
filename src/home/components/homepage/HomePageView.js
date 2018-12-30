import _, {each, isEmpty} from 'lodash';

import React from 'react';
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import classNames from 'classnames';

import {changeFilterValue, resetFilters} from "../../actions/filters";
import {searchMotions} from "../../../motions/actions/motions";

import {Page} from "../../../shared/components/layout/page/Page";
import SearchBar from "./SearchBar";
import MotionsList from "../../../motions/components/MotionsList";
import Pagination from "../../../shared/components/controls/Pagination";
import MotionFilterForm from "./MotionFilterForm";
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./HomePageView.scss');
}

const DEFAULT_START_PAGE = 1;
const DEFAULT_PAGE_ITEMS = 20;


class FilterList extends React.Component {
    render() {
        const activeFilters = this.buildActiveFilters();
        if (!activeFilters) {
            return null;
        }
        return (
            <div className="md-filter-list">
                <h2>Ergebnisse werden gefiltert nach:</h2>
                <ul className="md-filter-list-content">
                    {activeFilters}
                </ul>
            </div>
        );
    }

    buildActiveFilters() {
        if (isEmpty(this.props.filters)) {
            return []
        }

        const activeFilters = [];
        each(this.props.filters, (filters, sectionName) => {
            if (sectionName !== 'body') {
                each(filters, (value, key) => {
                    if (value === true) {
                        let activeFilter = (
                            <li className="md-filter-item active">
                                <strong>{i18next.t(sectionName)}: </strong>
                                <span>{i18next.t(key)}</span>
                            </li>
                        );
                        activeFilters.push(activeFilter);
                    }
                });
            }
        });
        return activeFilters;
    }
}


class FilterResultToggle extends React.Component {
    render() {
        const filters = this.buildLabel('filters');
        const results = this.buildLabel('results');
        return (
            <div className="md-filter-result-toggle">
                {filters}
                <span className="md-divider">/</span>
                {results}
            </div>
        );
    }

    buildLabel(label) {
        const isActive =  this.props.currentValue === label;
        const labelKlassOptions = {'md-label': true};
        labelKlassOptions[label] = true;
        labelKlassOptions['active'] = isActive;

        const Klass = isActive ? 'span' : 'a';
        const labelKlasses = classNames(labelKlassOptions);

        return (
            <Klass className={labelKlasses}
                  onClick={() => {this.props.onClick(label)}}>
                {i18next.t('homepage-toggle-' + label)}
            </Klass>
        );
    }
}


class HomePageView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: DEFAULT_START_PAGE,
            pageItems: DEFAULT_PAGE_ITEMS,
            view: 'results'
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

    changeMobileView(newView) {
        this.setState({view: newView});
    }

    render() {
        const motionFilterForm = this.getMotionFilterForm();
        const resultsList = this.getResultsList();

        const mobileMainContent = this.state.view === 'results' ? resultsList : motionFilterForm;

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
                        <Col mdHidden={true} lgHidden={true} xs={12}>
                            <FilterList filters={this.props.filters} />
                        </Col>
                    </Row>

                    <Row>
                        <Col mdHidden={true} lgHidden={true} xs={12}>
                            <FilterResultToggle
                                currentValue={this.state.view}
                                onClick={this.changeMobileView.bind(this)} />
                        </Col>
                    </Row>

                    <Row>
                         <Col mdHidden={true} lgHidden={true} xs={12}>
                            {mobileMainContent}
                         </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={12} md={1} lg={1} />
                        <Col xsHidden={true} smHidden={true} md={2} lg={2}>
                            {motionFilterForm}
                        </Col>
                        <Col xsHidden={true} smHidden={true} md={6} lg={4}>
                            {resultsList}
                        </Col>
                        <Col xs={12} md={1} lg={5} mdHidden={true} lgHidden={true} />
                    </Row>

                </Grid>
            </Page>
        );
    }

    getMotionFilterForm() {
        return (
            <MotionFilterForm
                filters={this.props.filters}
                onFilterChange={this.props.changeFilterValue} />
        );
    }

    getResultsList() {
        return (
            <React.Fragment>
                <MotionsList motions={this.props.motions} />
                <Pagination
                    page={this.state.page}
                    pageItems={this.state.pageItems}
                    total={this.props.motions ? this.props.motions.total : 0}
                    onPageChange={this.onPageChange.bind(this)}/>
            </React.Fragment>
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
