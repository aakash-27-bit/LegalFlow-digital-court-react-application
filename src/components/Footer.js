// filepath: /home/orange/Desktop/projects/shipmax-clone/src/components/Footer.jsx

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, Button } from '@mui/material';
import './footer.styles.css';


const Footer = () => {
    const handleScrollToTop = () => {
        const el = document.querySelector('.hero-section-wrapper');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    return (
        <Box className="footer">
            <Container className="footer-container">
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                        <Typography variant="h6" className="footer-title">LegalFlow</Typography>
                        <MuiLink href="#" className="footer-link">About App</MuiLink>
                        <MuiLink href="#" className="footer-link">Contact</MuiLink>
                        <MuiLink href="#" className="footer-link">FAQs</MuiLink>
                </Grid>
                <Grid item xs={12} md={4}>
                        <Typography variant="h6" className="footer-title">Address</Typography>
                        <Typography className="footer-address">
                            123 LegalFlow Lane, Suite 101<br />
                            Law City, Justice State, 123456<br />
                            support@legalflow.app
                    </Typography>
                </Grid>
                    <Grid item xs={12} md={4} className="footer-actions">
                        <Button
                            variant="contained"
                            className="footer-btn-top"
                            onClick={handleScrollToTop}
                        >
                            Back to Top
                        </Button>
                        <Button
                            variant="outlined"
                            className="footer-btn-contribute"
                            component="a"
                            href="https://github.com/Aakash-mishra2/reactjs-courtcase-management-web-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contribute
                        </Button>
                </Grid>
            </Grid>
                <Box className="footer-bottom">
                    <Typography className="footer-bottom-text">
                        © LegalFlow App. All rights reserved.
                </Typography>
                    <Box className="footer-bottom-links">
                        <MuiLink href="#" className="footer-bottom-link">Privacy Policy</MuiLink> |
                        <MuiLink href="#" className="footer-bottom-link">Terms of Service</MuiLink>
                </Box>
            </Box>
        </Container>
    </Box>
    )
};

export default Footer;
