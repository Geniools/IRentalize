import React, {Component} from "react";

export default class Icon extends Component {
    src = "/static/assets/favicon.png";
    alt = "Icon";

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a className="icon" href="/">
                <img src={this.src} alt={this.alt}/>
            </a>
        );
    }
}
