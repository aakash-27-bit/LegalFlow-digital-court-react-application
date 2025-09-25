import React, { useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import { Container, Grid, Typography, Box } from "@mui/material";
import image_carDB from "../../assets/revamp/image_cardb.jpg";
import parkingApp from "../../assets/revamp/app_bsd_parking.jpg";
import vendingMachineParking from "../../assets/revamp/vending-machine-parking.jpg";
import "../Home.styles.css";
import "./JourneySection.styles.css";
// Card data for easy switching
const cards = [
  {
    key: "catalog",
    title: "Advanced Product Features:",
    description:
      (<div className="journey-steps">
        <div>
          <span className="journey-step-desc">Dynamic Pricing: <span className="journey-step-highlight"> Use yield management to adjust prices based on demand periods.</span></span>
        </div>
        <div>
          <span className="journey-step-desc">User Account Management:  <span className="journey-step-highlight"> Offer account registration, vehicle management, booking history, and notifications for users.</span></span>
        </div>
      </div>),
    img: image_carDB,
    alt: "Legal System",
    highlight: true,
  },
  {
    key: "shipping",
    title: "Centralized Slot Mapping and Smart Allocation:",
    description: (
      <div className="journey-steps">
        <div>
          <span className="journey-step-label">Step 1:</span> <span className="journey-step-desc">Real-Time Parking Space Monitoring: <span className="journey-step-highlight">   Display live updates of available parking spaces and lot status to users and administrators</span></span>
        </div>
        <div>
          <span className="journey-step-label">Step 2:</span> <span className="journey-step-desc">Multiple Payment Options:  <span className="journey-step-highlight"> Integrate various payment methods (credit/debit cards, digital wallets, QR scan-and-pay) for convenient and secure transactions.</span></span>
        </div>
        <div>
          <span className="journey-step-label">Step 3:</span> <span className="journey-step-desc">Reporting and Analytics: <span className="journey-step-highlight">Securely attach briefs, judgments, and legal notices.</span></span>
        </div>
      </div>
    ),
    img: parkingApp,
    alt: "System Management",
    highlight: true,
  },
  {
    key: "processing",
    title: "Quick 3-Step Application Features:",
    description: (
      <div className="journey-steps">
        <div>
          <span className="journey-step-label">Step 1:</span> <span className="journey-step-desc">Real-Time Parking Space Monitoring: <span className="journey-step-highlight">   Display live updates of available parking spaces and lot status to users and administrators</span></span>
        </div>
        <div>
          <span className="journey-step-label">Step 2:</span> <span className="journey-step-desc">Multiple Payment Options:  <span className="journey-step-highlight"> Integrate various payment methods (credit/debit cards, digital wallets, QR scan-and-pay) for convenient and secure transactions.</span></span>
        </div>
        <div>
          <span className="journey-step-label">Step 3:</span> <span className="journey-step-desc">Reporting and Analytics: <span className="journey-step-highlight">Securely attach briefs, judgments, and legal notices.</span></span>
        </div>
      </div>
    ),
    img: vendingMachineParking,
    alt: "Legal Process",
    highlight: true,
  },
];

const JourneySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down

  // Animation springs for image and card, triggered by activeIndex and direction
  const imageSpring = useSpring({
    opacity: 1,
    transform: `scale(1) translateY(0px)`,
    filter: 'blur(0)',
    from: {
      opacity: 0,
      transform: `scale(0.96) translateY(${direction === 1 ? 60 : -60}px)`,
      filter: 'blur(8px)'
    },
    config: { tension: 300, friction: 18 },
    reset: true,
  });

  const cardSpring = useSpring({
    opacity: 1,
    transform: `scale(1) translateY(0px)`,
    from: {
      opacity: 0,
      transform: `scale(0.98) translateY(${direction === 1 ? 40 : -40}px)`
    },
    config: { tension: 300, friction: 18 },
    reset: true,
  });

  // Mouse wheel handler for smooth card switching, require larger scroll delta
  const SCROLL_THRESHOLD = 60; // pixels
  let scrollAccumulator = 0;
  const handleWheel = (e) => {
    scrollAccumulator += e.deltaY;
    if (scrollAccumulator > SCROLL_THRESHOLD) {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % cards.length);
      scrollAccumulator = 0;
    } else if (scrollAccumulator < -SCROLL_THRESHOLD) {
      setDirection(-1);
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      scrollAccumulator = 0;
    }
  };

  return (
    <section className="journey-section" onWheel={handleWheel} tabIndex={0} style={{ outline: 'none' }}>
      <Container className="m-0 p-0 word-spacing-[5px]">
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 300,
            mb: 8,
            color: "#222",
            fontFamily: "Playfair Display, serif",
            letterSpacing: "-0.5px",
            lineHeight: 1.05,
            wordSpacing: "0.4px",
          }}
        >
          How HighWheels provides{" "}
          <Box
            component="span"
            sx={{ color: "white", fontWeight: 800, fontStyle: "italic" }}
          >
            parking solutions for businesses of all sizes.
          </Box>
        </Typography>
        <Grid
          className="flex flex-row justify-between items-center gap-24 p-0 m-0"
        >
          {/* Smaller Image */}
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
                overflow: "hidden",
              }}
            >
              <animated.img
                key={activeIndex}
                src={cards[activeIndex].img}
                alt={cards[activeIndex].alt}
                borderRadius={12}
                style={{
                  ...imageSpring,
                  width: "100%",
                  minWidth: "580px",
                  maxHeight: "520px",
                  maxWidth: "680px",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 20,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                }}
              />
            </Box>
          </Grid>

          {/* Cards taking more space */}
          <Grid item className="max-w-3/5" md={8}>
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              sx={{
                justifyContent: "center",
              }}
            >
              <animated.div
                key={cards[activeIndex].key}
                className={`feature-card active highlight`}
                style={cardSpring}
                onClick={() => setActiveIndex(activeIndex)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.2,
                    color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    fontSize: "1.35rem",
                    fontFamily: "Playfair Display, serif",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {cards[activeIndex].title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#f8f8f8',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    textShadow: '0 1px 6px rgba(0,0,0,0.18)',
                  }}
                  className="journey-step-desc"
                >
                  {cards[activeIndex].description}
                </Typography>
              </animated.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default JourneySection;
