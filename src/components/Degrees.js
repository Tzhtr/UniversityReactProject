import React from "react";
import './Degrees.css';
import loading from './gears.gif';
import axios from "axios";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Class representing the Degrees component displaying available undergraduate and graduate degrees.
 */
export default class Degrees extends React.Component {
    constructor(props) {
        super(props);

        /**
         * State of the component.
         * @property {Array} undergraduateDegrees - Array of objects representing undergraduate degrees.
         * @property {Array} graduateDegrees - Array of objects representing graduate degrees.
         * @property {boolean} loaded - Indicates whether the degrees data has been loaded.
         */
        this.state = {
            undergraduateDegrees: [],
            graduateDegrees: [],
            loaded: false
        };
    }

    componentDidMount() {
        // Fetch degrees data from the API endpoint when component mounts
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees')
            .then((response) => {
                // Update state with fetched data
                this.setState({
                    undergraduateDegrees: response.data.undergraduate,
                    graduateDegrees: response.data.graduate,
                    loaded: true
                });
            })
            .catch(() => {
                console.log("something went wrong");
            });
    }

    render() {
        const { undergraduateDegrees, graduateDegrees, loaded } = this.state;
    
        if (!loaded) {
            return <div><img src={loading} alt="loading" /></div>;
        }
    
        return (
            <div className="about-degree">
                <h1>Available Degrees</h1>
                <div className="degrees-container">
                    <div className="degrees-section">
                        <h2>Undergraduate Degrees</h2>
                        {/* Render accordion for each undergraduate degree */}
                        {undergraduateDegrees.map((degree, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{degree.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="quote">
                                        <p>{degree.degreeName}</p>
                                        <p>{degree.description}</p>
                                        <p>{degree.concentrations.join(', ')}</p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                    <div className="degrees-section">
                        <h2>Graduate Degrees</h2>
                        {/* Render accordion for each graduate degree */}
                        {graduateDegrees.map((degree, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{degree.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="quote">
                                        <p>{degree.degreeName}</p>
                                        <p>{degree.description}</p>
                                        {degree.concentrations && (
                                            <p>{degree.concentrations.join(', ')}</p>
                                        )}
                                        {degree.availableCertificates && (
                                            <div>
                                                <p>Available Certificates:</p>
                                                <ul>
                                                    {/* Render available certificates */}
                                                    {degree.availableCertificates.map((certificate, idx) => (
                                                        <li key={idx}>{certificate}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}    