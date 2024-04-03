/**
 * Component for displaying employment information.
 * @module Employment
 * @component
 */
import React from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "./Employment.css";
/**
 * Represents the Employment component.
 * @class
 * @extends React.Component
 */
export default class Employment extends React.Component {
    /**
     * Creates an instance of Employment.
     * @constructor
     * @param {Object} props - The properties passed to the component.
     */
    constructor(props) {
        super(props);
        /**
         * State of the component.
         * @type {Object}
         * @property {Object} introduction - Introduction data.
         * @property {Object} degreeStatistics - Degree statistics data.
         * @property {Object} employers - Employers data.
         * @property {Object} careers - Careers data.
         * @property {Object} coopTable - Coop table data.
         * @property {Object} employmentTable - Employment table data.
         * @property {number} currentPage - Current page number for coop table pagination.
         * @property {number} itemsPerPage - Number of items per page for coop table.
         * @property {number} currentPageEmployment - Current page number for employment table pagination.
         * @property {number} itemsPerPageEmployment - Number of items per page for employment table.
         * @property {boolean} loaded - Indicates whether data has been loaded from API.
         */
        this.state = {
            introduction: {},
            degreeStatistics: {},
            employers: {},
            careers: {},
            coopTable: {},
            employmentTable: {}, 
            currentPage: 0,
            itemsPerPage: 10,
            currentPageEmployment: 0, 
            itemsPerPageEmployment: 10, 
            loaded: false
        };
    }

    /**
     * Fetches employment data from API endpoint when component mounts.
     */
    componentDidMount() {
        // Fetch employment data from the API endpoint when component mounts
        axios.get('https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment')
            .then((response) => {
                // Update state with fetched data
                this.setState({
                    introduction: response.data.introduction,
                    degreeStatistics: response.data.degreeStatistics,
                    employers: response.data.employers,
                    careers: response.data.careers,
                    coopTable: response.data.coopTable,
                    employmentTable: response.data.employmentTable, 
                    loaded: true
                });
            })
            .catch(() => {
                console.log("Something went wrong");
            });
    }
    /**
     * Handles pagination click for coop table.
     * @param {Object} data - Page click event data.
     */
    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected
        });
    }
    /**
     * Handles pagination click for employment table.
     * @param {Object} data - Page click event data.
     */
    handleEmploymentPageClick = (data) => { // Added for employment table pagination
        this.setState({
            currentPageEmployment: data.selected
        });
    }

     /**
     * Renders the component.
     * @returns {JSX.Element} JSX representation of the component.
     */
    render() {
        const { introduction, degreeStatistics, employers, careers, coopTable, employmentTable, loaded, currentPage, itemsPerPage, currentPageEmployment, itemsPerPageEmployment } = this.state;
        let content;

        if (!loaded) {
            content = <div>Loading...</div>;
        } else {
            const indexOfLastItem = (currentPage + 1) * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentItems = coopTable.coopInformation.slice(indexOfFirstItem, indexOfLastItem);

            // Pagination for employment table
            const indexOfLastEmploymentItem = (currentPageEmployment + 1) * itemsPerPageEmployment;
            const indexOfFirstEmploymentItem = indexOfLastEmploymentItem - itemsPerPageEmployment;
            const currentEmploymentItems = employmentTable.professionalEmploymentInformation.slice(indexOfFirstEmploymentItem, indexOfLastEmploymentItem);

            content = (
                <div className="employment-info">
                    <div>
                        <h2>{introduction.title}</h2>
                        {introduction.content.map((item, index) => (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>{degreeStatistics.title}</h2>
                        <ul>
                            {degreeStatistics.statistics.map((statistic, index) => (
                                <li key={index}>{statistic.description}: {statistic.value}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="employecareers">
                        <div className="employer-list">
                            <h2>{employers.title}</h2>
                            <ul>
                                {employers.employerNames.map((employer, index) => (
                                    <li key={index}>{employer}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>{careers.title}</h2>
                            <ul>
                                {careers.careerNames.map((career, index) => (
                                    <li key={index}>{career}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="coop-table">
                        <h2>{coopTable.title}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Employer</th>
                                    <th>Degree</th>
                                    <th>City</th>
                                    <th>Term</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((coop, index) => (
                                    <tr key={index}>
                                        <td>{coop.employer}</td>
                                        <td>{coop.degree}</td>
                                        <td>{coop.city}</td>
                                        <td>{coop.term}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            pageCount={Math.ceil(coopTable.coopInformation.length / itemsPerPage)}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                    {/* New Employment table section */}
                    <div className="employment-table">
                        <h2>{employmentTable.title}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Employer</th>
                                    <th>Degree</th>
                                    <th>City</th>
                                    <th>Title</th>
                                    <th>Start Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentEmploymentItems.map((employment, index) => (
                                    <tr key={index}>
                                        <td>{employment.employer}</td>
                                        <td>{employment.degree}</td>
                                        <td>{employment.city}</td>
                                        <td>{employment.title}</td>
                                        <td>{employment.startDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            pageCount={Math.ceil(employmentTable.professionalEmploymentInformation.length / itemsPerPageEmployment)}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={2}
                            onPageChange={this.handleEmploymentPageClick}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="employment">
                <h1>Employment Information</h1>
                {content}
            </div>
        );
    }
}