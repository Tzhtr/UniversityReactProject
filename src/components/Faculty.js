/**
 * Class representing the Faculty component displaying information about faculty members.
 */
import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import './Faculty.css';
import loading from './gears.gif';
import axios from "axios";

export default class Faculty extends React.Component {
    constructor(props) {
        super(props);

        /**
         * State of the component.
         * @property {Array} faculty - Array of objects representing faculty members.
         * @property {boolean} loaded - Indicates whether the faculty data has been loaded.
         * @property {number} hoverIndex - Index of the faculty item being hovered.
         */
        this.state = {
            faculty: [],
            loaded: false,
            hoverIndex: null
        };
    }

    componentDidMount() {
        // Fetch faculty data from the API endpoint when component mounts
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/faculty')
            .then((response) => {
                // Update state with fetched data
                this.setState({
                    faculty: response.data.faculty,
                    loaded: true
                });
            })
            .catch(() => {
                console.log("something went wrong");
            });
    }

    /**
     * Handles hover event on faculty card.
     * @param {number} index - Index of the faculty item being hovered.
     */
    handleHover = (index) => {
        this.setState({ hoverIndex: index });
    };

    /**
     * Handles mouse leave event from faculty card.
     */
    handleHoverLeave = () => {
        this.setState({ hoverIndex: null });
    };

    render() {
        const { faculty, loaded, hoverIndex } = this.state;
        let content;

        if (!loaded) {
            // Display loading spinner if faculty data is not loaded yet
            content = <div className="facultyimg"><img src={loading} alt="loading" /></div>;
        } else {
            // Render faculty cards once data is loaded
            content = faculty.map((professor, index) => (
                <CardActionArea
                    key={index}
                    onMouseEnter={() => this.handleHover(index)}
                    onMouseLeave={this.handleHoverLeave}
                    className="faculty-item"
                >
                    <div className="card-container">
                        <CardMedia
                            component="img"
                            height="200"
                            image={professor.imagePath}
                            alt={professor.name}
                        />
                        {hoverIndex === index && (
                            <div className="overlay">
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {professor.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {professor.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {professor.interestArea}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Office: {professor.office}
                                    </Typography>
                                    {professor.website && <Typography variant="body2" color="text.secondary"><a href={professor.website}>Website</a></Typography>}
                                    <Typography variant="body2" color="text.secondary">
                                        Email: {professor.email}
                                    </Typography>
                                    {professor.phone && <Typography variant="body2" color="text.secondary">Phone: {professor.phone}</Typography>}
                                </CardContent>
                            </div>
                        )}
                    </div>
                </CardActionArea>
            ));
        }

        return (
            <div>
                <h1>Faculty</h1>
                <div className="faculty">
                    {content}
                </div>
            </div>
        );
    }
}
