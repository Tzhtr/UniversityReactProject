/**
 * Class representing a modal component for displaying a quote and its author.
 * Uses Material-UI components for styling.
 */
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import './About.css';

export default class AboutModal extends React.Component {
    constructor(props) {
        super(props);

        /**
         * State of the component.
         * @property {boolean} open - Indicates whether the modal is open.
         */
        this.state = {
            open: false
        };
    }

    /**
     * Closes the modal.
     */
    handleClose = () => {
        this.setState({ open: false });
    }

    /**
     * Opens the modal.
     */
    handleOpen = () => {
        this.setState({ open: true });
    }

    render() {
        const { quote, quoteAuthor } = this.props;
        const { open } = this.state;

        return (
            <div className='quotebutton'>
                {/* Button to open the modal */}
                <Button variant='outlined' onClick={this.handleOpen}>Quote</Button>
                {/* Modal component */}
                <Modal
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {/* Modal content */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'rgba(255, 255, 255, 0.9)', 
                        p: 4,
                        border: '2px solid #000',
                        borderRadius: 8, 
                        boxShadow: 24, 
                        textAlign: 'center' 
                    }}>
                        {/* Title */}
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            QUOTE
                        </Typography>
                        {/* Quote text */}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {quote}
                        </Typography>
                        {/* Quote author */}
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            -- {quoteAuthor}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        );
    }
}
