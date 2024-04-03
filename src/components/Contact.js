/**
 * Class representing the Contact component displaying contact information.
 */
import React from "react";
import "./Contact.css";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);

        /**
         * State of the component.
         * @property {Object} contactInfo - Object containing contact information.
         * @property {boolean} loaded - Indicates whether the contact information has been loaded.
         */
        this.state = {
            contactInfo: {},
            loaded: false
        };
    }

    componentDidMount() {
        // Simulate fetching contact info with a delay
        const fakeContactInfo = {
            title: "Contact Us",
            location: "123 Main Street, City, Country",
            email: "contact@example.com",
            phone: "+1234567890"
        };

        // Simulate a delay for loading
        setTimeout(() => {
            this.setState({
                contactInfo: fakeContactInfo,
                loaded: true
            });
        }, 1000);
    }

    render() {
        const { contactInfo, loaded } = this.state;
        let content;

        if (!loaded) {
            // Display loading message if contact info is not loaded yet
            content = <div className="loading">Loading...</div>;
        } else {
            // Render contact information once loaded
            content = (
                <div className="footer-content">
                    <h2 className="title">{contactInfo.title}</h2>
                    <p className="location">Location: {contactInfo.location}</p>
                    <p className="email">Email: {contactInfo.email}</p>
                    <p className="phone">Phone: {contactInfo.phone}</p>
                </div>
            );
        }

        return (
            <footer className="footer">
                {content}
            </footer>
        );
    }
}
