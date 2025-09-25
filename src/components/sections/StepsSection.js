import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

import step1Img from "../../assets/front/images/features/Insync-amico.png";
import step2Img from "../../assets/front/images/features/startShipping.png";
import step3Img from "../../assets/front/images/features/Computerlogin-amico.png";

const steps = [
  {
    img: step1Img,
    title: "STEP 01",
    desc: "Find Available spots, Raise Tickets & Book instantly",
  },
  {
    img: step2Img,
    title: "STEP 02",
    desc: "Cashless payments & automated entry/exit",
  },
  {
    img: step3Img,
    title: "STEP 03",
    desc: "Manage Parking, passes and Wallets on the go",
  },
];

const StepsSection = () => {
  return (
    <section
      className="steps-section"
      style={{ padding: "32px 0" }}
    >
      <Container sx={{ maxWidth: "90% !important", width: "90% !important" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 300,
            mb: 6,
            color: "#222",
            fontFamily: "serif",
            lineHeight: 1.3,
          }}
        >
          Simplify your{" "}
          <Box
            component="span"
            sx={{ color: "#f8b217", fontWeight: 700, fontStyle: "italic" }}
          >
            Parking Troubles
          </Box>{" "}
          in just{" "}
          <Box component="span" sx={{ fontWeight: 600 }}>
            3 steps
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                background: "transparent",
                borderRadius: "20px",
                textAlign: "center",
                p: 2,
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 1 300px",
                maxWidth: "350px",
                minWidth: "280px",
              }}
            >
              <Box
                component="img"
                src={step.img}
                alt={step.title}
                sx={{
                  width: 180,
                  height: 200,
                  mb: 2,
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#222",
                  mb: 1,
                  mt: 2,
                  borderBottom: "2px solid #F9A000",
                  fontFamily: "serif",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                sx={{
                  color: "#666",
                  fontFamily: "serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                }}
              >
                {step.desc}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            sx={{
              background: "#f8b217",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              px: 4,
              py: 1.5,
              boxShadow: "none",
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { background: "#FFA500" },
            }}
            onClick={() => (window.location.href = "/contact-us")}
          >
            Try Now
          </Button>
        </Box>
      </Container>
    </section>
  );
};

export default StepsSection;
