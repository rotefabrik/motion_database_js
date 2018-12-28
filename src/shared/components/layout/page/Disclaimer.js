import React from 'react';
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./Disclaimer.scss');
}


export default class Disclaimer extends React.Component {
    render() {
        return (
            <div className="md-page-disclaimer">
                {i18next.t("disclaimer-text")}
            </div>
        );
    }
}