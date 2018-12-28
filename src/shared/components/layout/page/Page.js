import React from 'react';
import Disclaimer from "./Disclaimer";
import Footer from "./Footer";


export class Page extends React.Component {
    render() {
        return (
            <div className="motion-database-page">
                <Disclaimer />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
