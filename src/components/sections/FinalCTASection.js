import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const FinalCTASection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        textAlign: 'center',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Container>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 2,
            color: '#1E1E1E',
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
          }}
        >
          Ready to modernize your Parking?
          <Box
            component="span"
            sx={{ fontWeight: 700, color: '#F4B400', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}
          >
            {' '}Streamline, digitize, and accelerate justice delivery
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: '1.15rem',
            color: '#333333',
            mx: 'auto',
            px: 8,
            mb: 4,
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.2px',
          }}
        >
          Sign up to experience <b>seamless case registration</b>, <i>smart scheduling</i>, and <b>secure document management</b> for courts and legal professionals.
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/try-now"
          sx={{
            backgroundColor: '#F4B400',
            color: '#fff',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 700,
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.1rem',
            boxShadow: '0 4px 16px rgba(244,180,0,0.12)',
            '&:hover': {
              backgroundColor: '#e2a900',
            },
          }}
        >
          Try CaseFlow Now
        </Button>
      </Container>
    </Box>
  );
};

export default FinalCTASection;
