import React from 'react';
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./Pagination.scss');
}


export default class Pagination extends React.Component {

    goToPreviousPage() {
        this.props.onPageChange(this.props.page - 1);
    }

    goToNextPage() {
        this.props.onPageChange(this.props.page + 1);
    }

    render() {
        const totalPages = this.calculateTotalPages();
        if (!totalPages || totalPages === 1) {
            return null;
        }

        const buttonPrev = this.buildButtonPrev(totalPages);
        const counter = this.buildCounter(totalPages);
        const buttonNext = this.buildButtonNext(totalPages);
        return (
            <div className="md-pagination">
                {buttonPrev}
                {counter}
                {buttonNext}
            </div>
        );
    }

    calculateTotalPages() {
        //console.log(this.props.total, this.props.pageItems);
        if (!this.props.total || !this.props.pageItems) {
            return 0;
        }
        if (this.props.total <= this.props.pageItems) {
            return 1;
        }
        return Math.ceil(this.props.total / this.props.pageItems);
    }

    buildButtonPrev(totalPages) {
        if (this.props.page < 2) {
            return null;
        }
        return (
            <span
                className="button previous"
                onClick={this.goToPreviousPage.bind(this)}>
                <a>
                    {"<< " + i18next.t('previous_page')}
                </a>
            </span>
        );
    }

    buildButtonNext(totalPages) {
        if (this.props.page >= totalPages) {
            return null;
        }
        return (
            <span
                className="button next"
                onClick={this.goToNextPage.bind(this)}>
                <a>
                    {i18next.t('next_page') + " >>"}
                </a>
            </span>
        );
    }

    buildCounter(totalPages) {
        return (
            <div className="counter">
                <span>{this.props.page}</span>
                <span>/</span>
                <span>{totalPages}</span>
            </div>
        );
    }
}
