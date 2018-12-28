import React from 'react';
import {each} from "lodash";
import i18next from "i18next";

if (process.env.BROWSER) {
    require('./MotionFilterForm.scss');
}


export class SectionLabel extends React.Component {
    render() {
        return (
            <tr>
                <td className="md-section-label"
                    colSpan="2">
                    {i18next.t(this.props.label)}
                </td>
            </tr>
        );
    }
}


export class SectionDivider extends React.Component {
    render() {
        return (
            <tr>
                <td className="md-section-divider"
                    colSpan="2" />
            </tr>
        );
    }
}


export class MotionFilterFormSection extends React.Component {

    onChange(evt) {
        this.props.onFilterChange(this.props.label, evt.target.value);
    }

    render() {
        const selector = this.buildSelector();
        return (
            <React.Fragment>
                <SectionLabel label={this.props.label} />
                {selector}
                <SectionDivider />
            </React.Fragment>
        );
    }

    buildSelector() {
        if (!this.props.fields) {
            return null;
        }

        const items = [
            <option>{i18next.t("select-option-any")}</option>
        ];

        each(this.props.fields, (value, key, index) => {
            items.push(
                <option
                    key={index}
                    value={key}
                    selected={value}>
                    {i18next.t(key)}
                </option>
            );
        });

        return (
            <select name={i18next.t(this.props.name)} onChange={this.onChange.bind(this)}>
                {items}
            </select>
        );
    }
}


export default class MotionFilterForm extends React.Component {

    render() {
        const sections = this.buildSections();
        return (
            <div className="md-motion-filter-form">
                <table className="section">
                    <tbody>
                        {sections}
                    </tbody>
                </table>
            </div>
        );
    }

    buildSections() {
        if (!this.props.filters) {
            return null;
        }

        const sections = [];

        each(this.props.filters, (fieldOptions, section) => {
            if (section !== 'body') {
                sections.push(
                    <MotionFilterFormSection
                        key={section}
                        label={section}
                        fields={fieldOptions}
                        onFilterChange={this.props.onFilterChange}/>
                );
            }
        });

        return sections;
    }

}
