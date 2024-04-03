/**
 * Component for rendering a navigation bar.
 * @module Navbar
 * @component
 */
import React, { Component } from 'react';
import './Nav.css';
import logo from './ritlogo.png';
import TextRotator from './TextRotator';
/**
 * Represents the Navbar component.
 * @class
 * @extends Component
 */
export default class Navbar extends Component {
    /**
     * Creates an instance of Navbar.
     * @constructor
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        /**
         * State of the component.
         * @type {Object}
         * @property {boolean} isMenuOpen - Indicates whether the menu is open.
         */
        this.state = {
            isMenuOpen: false
        };
    }/**
     * Scrolls to a section with the provided ID.
     * @param {string} id - The ID of the section to scroll to.
     */

    scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
 /**
     * Toggles the menu state between open and closed.
     */
    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    };
/**
     * Renders the component.
     * @returns {JSX.Element} JSX representation of the component.
     */
    render() {
        const { isMenuOpen } = this.state;

        return (
            <div>
                {/* Navigation bar */}
                <nav className="navbar">
                    <div className="navbar-logo">
                        {/* Logo */}
                        <img src={logo} alt="Logo" />
                    </div>
                    {/* Hamburger menu icon for mobile */}
                    <div className="hamburger-menu" onClick={this.toggleMenu}>
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}></div>
                    </div>
                    {/* Navigation links */}
                    <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                        <li className="navbar-link">
                            <a href="#" onClick={() => this.scrollToSection("Home")}>Home</a>
                        </li>
                        <li className="navbar-link">
                            <a href="#About" onClick={() => this.scrollToSection("About")}>About</a>
                        </li>
                        <li className="navbar-link">
                            <a href="#Degrees" onClick={() => this.scrollToSection("Degrees")}>Degrees</a>
                        </li>
                        <li className="navbar-link">
                            <a href="#Employment" onClick={() => this.scrollToSection("Employment")}>Employment</a>
                        </li>
                        <li className="navbar-link">
                            <a href="#Faculty" onClick={() => this.scrollToSection("Faculty")}>Faculty</a>
                        </li>
                        <li className="navbar-link">
                            <a href="#Contact" onClick={() => this.scrollToSection("Contact")}>Contact</a>
                        </li>
                    </ul>
                </nav>
                <header className="header">
                    <video src="https://www.rit.edu/croatia/sites/rit.edu.croatia/files/videos/croatia-video.mp4" autoPlay loop muted />
                    <div className="header-content">
                        <h1>RIT</h1>
                        <TextRotator />
                    </div>
                </header>
            </div>
        );
    }
}
