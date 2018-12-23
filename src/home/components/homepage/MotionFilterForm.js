import React from 'react';
import {each} from "lodash";
import i18next from "i18next";


if (process.env.BROWSER) {
    require('./MotionFilterForm.scss');
}



export class CheckBoxitem extends React.Component {
    onChange(evt) {
        this.props.onFilterChange(this.props.label, this.props.name, evt.target.checked);
    }

    render () {
        return (
            <tr className="input-row">
                <th>{i18next.t(this.props.name)}</th>
                <td>
                    <input
                        type="checkbox"
                        name={this.props.label}
                        value={this.props.name}
                        defaultChecked={this.props.value}
                        onChange={this.onChange.bind(this)} />
                </td>
            </tr>
        );
    }
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
    render() {
        const items = this.buildItems();
        return (
            <React.Fragment>
                <SectionLabel label={this.props.label} />
                {items}
                <SectionDivider />
            </React.Fragment>
        );
    }

    buildItems() {
        if (!this.props.fields) {
            return null;
        }

        const items = [];

        each(this.props.fields, (value, key, index) => {
            items.push(
                <CheckBoxitem
                    key={index}
                    label={this.props.label}
                    name={key}
                    value={value}
                    onFilterChange={this.props.onFilterChange} />
            );
        });

        return items;
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
            sections.push(
                <MotionFilterFormSection
                    label={section}
                    fields={fieldOptions}
                    onFilterChange={this.props.onFilterChange} />
            );
        });

        return sections;
    }

}
