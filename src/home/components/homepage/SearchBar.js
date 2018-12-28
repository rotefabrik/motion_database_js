import React from 'react';
import {Col, Row} from "react-bootstrap";
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./SearchBar.scss');
}


export default class SearchBar extends React.Component {
    onChange(evt) {
        this.props.onChange(evt.target.value);
    }

    render() {
        return (
            <table className="md-search-bar">
                <tbody>
                    <tr>
                        <td className="md-search-bar-input">
                            <input
                                type="text"
                                name="search"
                                onChange={this.onChange.bind(this)}
                                placeholder={i18next.t('search-prompt')} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
