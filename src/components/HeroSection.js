import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      style={{
        margintop: "70px",
        padding: "20px 0",
        background: "transparent",
      }}
    >
      <Container maxWidth="lg" marginTop={24}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 300,
                  color: "white",
                  mb: 3,
                  fontSize: { xs: "1.5rem", md: "3.5rem" },
                  fontFamily: "serif",
                  lineHeight: 1.1,
                }}
              >
                Our{' '}
                <Box component="span" sx={{ fontStyle: "italic", fontWeight: 400 }}>
                  Parking Management System
                </Box>{' '}
                offers a productive implementation of the{' '}
                <Box component="span" sx={{ fontWeight: 600 }}>
                  parking resources.
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  color: "white",
                  mb: 4,
                  lineHeight: 1.6,
                  fontFamily: "serif",
                  fontStyle: "italic",
                }}
              >
                Transform your unused, unleased or otherwise unproductive parking spaces into extra income by filling them with tenants or public – who can find, book and pay through the app.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#f8b217",
                    color: "#fff",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#e09900",
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/contact-us"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#f8b217",
                    color: "#f8b217",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    backgroundColor: "white",
                    fontSize: "1.1rem",
                    "&:hover": {
                      borderColor: "#e09900",
                      color: "#e09900",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HeroSection;
