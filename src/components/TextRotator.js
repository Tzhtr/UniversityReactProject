/**
 * Component for rotating text.
 * @module TextRotator
 * @component
 */

import React, { Component } from 'react';

/**
 * Represents the TextRotator component.
 * @class
 * @extends Component
 */
export default class TextRotator extends Component {
    /**
     * Creates an instance of TextRotator.
     * @constructor
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        /**
         * State of the component.
         * @type {Object}
         * @property {number} index - Index of the current paragraph.
         * @property {string[]} paragraphs - Array of paragraphs to rotate.
         */
        this.state = {
            index: 0,
            paragraphs: [
                "Rochester Institute of Technology",
                "Different from day One",
                "Top American Education"
            ]
        };
    }

    /**
     * Sets up interval to rotate text when component mounts.
     */
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(prevState => ({
                index: (prevState.index + 1) % this.state.paragraphs.length
            }));
        }, 3000); // Change every 3 seconds
    }

    /**
     * Clears interval when component unmounts to prevent memory leaks.
     */
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    /**
     * Renders the component.
     * @returns {JSX.Element} JSX representation of the component.
     */
    render() {
        const { index, paragraphs } = this.state;
        return (
            <p className="text-rotator">{paragraphs[index]}</p>
        );
    }
}
