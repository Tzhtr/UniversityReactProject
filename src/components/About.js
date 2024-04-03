/**
 * Class representing the About component.
 * Fetches data from an API endpoint and renders information about the iSchool at RIT.
 */
import React from "react";
import axios from "axios";
import loading from './gears.gif';
import './About.css';
import AboutModal from './AboutModal';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        /**
         * State of the component.
         * @property {Object} about - Object containing information about the iSchool.
         * @property {boolean} loaded - Indicates whether the data has been loaded from the API.
         */
        this.state = {
            about: {},
            loaded: false
        };
    }

    componentDidMount() {
        // Fetch data from the API endpoint when component mounts.
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about')
            .then((response) => {
                // Update state with fetched data.
                this.setState({ about: response.data, loaded: true });
            });
    }

    render() {
        const { about, loaded } = this.state;

        let content;
        // Display loading spinner if data is not loaded yet.
        if (!loaded) {
            content = <div><img src={loading} alt="loading" /></div>;

        } else {
            // Render fetched data once loaded.
            content = (
                <div>
                    <h3>{about.title}</h3>
                    <p>{about.description}</p>
                    <AboutModal quote={about.quote} quoteAuthor={about.quoteAuthor} />
                </div>
            )
        }

        return (
            <div className="about">
                <h1>iSchool @ RIT</h1>
                {/* Render content */}
                {content}
            </div>
        );
    }

}
