import React from 'react';

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
                                placeholder="Suchbegriff hier hinein!!!" />
                        </td>
                        <td className="md-search-bar-control">
                            <button>Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
