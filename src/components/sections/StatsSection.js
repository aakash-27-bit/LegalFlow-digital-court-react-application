import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';

const stats = [
  {
    value: '200000+',
    label: 'Vehicles Connected',
  },
  {
    value: '100,000+',
    label: 'Workspaces & parkings managed',
  },
  {
    value: '75%',
    label: 'Faster user engagement processed',
  },
];

const StatsSection = () => {
  return (
    <section
      className="stats-section"
      style={{ background: '#fffff', padding: '48px 0' }}
    >
      <Container sx={{ maxWidth: '90% !important', width: '90% !important' }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 300,
            mb: 2,
            color: '#222',
            fontFamily: 'serif',
            lineHeight: 1.3,
          }}
        >
          Delivering{' '}
          <Box component="span" sx={{ color: '#f8b217', fontWeight: 700, fontStyle: 'italic' }}>
            Parking Solutions
          </Box>
          {' '}across every{' '}
          <Box component="span" sx={{ fontWeight: 600 }}>
            workSpace.
          </Box>
        </Typography>
        <Typography
          align="center"
          sx={{
            color: '#444',
            fontFamily: 'serif',
            mb: 5,
            fontSize: '1.1rem',
            fontStyle: 'italic',
          }}
        >
          Empowering courts nationwide with digital transformation and streamlined legal processes
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {stats.map((stat, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#f8b217',
                    fontSize: '2rem',
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: '#222',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1rem',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default StatsSection;
