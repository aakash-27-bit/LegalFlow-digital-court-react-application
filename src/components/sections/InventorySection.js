import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import inventoryImg from '../../assets/smart-speaker-being-used-indoors.jpg';

const InventorySection = () => {
  return (
    <section className="inventory-section" style={{ background: 'transparent', padding: '32px 0' }}>
      <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
        {/* Text Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.38)',
            borderRadius: '32px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            backdropFilter: 'blur(8px)',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: '#222',
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
              textAlign: 'left',
            }}
          >
            Simplify Workload with Us!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#FFB940',
              mb: 2,
              fontFamily: 'Playfair Display, serif',
              display: 'block',
              fontStyle: 'italic',
              letterSpacing: '-0.3px',
              textAlign: 'left',
            }}
          >
            Effortlessly manage parking spaces, reservations, and payments all in one platform.
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5} marginBottom={5}>
            <div className="bright-pointer"><span className="bullet">•</span>Real-time space availability and automated entry/exit logs.</div>
            <div className="bright-pointer"><span className="bullet">•</span>Seamless online booking and payment integration. Secure access control and user management.
            </div>
            <div className="bright-pointer"><span className="bullet">•</span>Comprehensive reports and analytics for better decision-making</div>
          </Box>
          <Link to="/contact-us">
            <Button
              variant="contained"
              sx={{
                background: '#FFB940',
                color: '#fff',
                fontWeight: 700,
                borderRadius: '10px',
                px: 5,
                py: 2,
                boxShadow: '0 4px 16px rgba(255,185,64,0.12)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontFamily: 'Roboto, sans-serif',
                letterSpacing: '-0.2px',
                '&:hover': { background: '#FFA500' },
              }}
            >
              Try Now
            </Button>
          </Link>
        </Box>
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src={inventoryImg}
            alt="Inventory Management"
            sx={{
              width: 520,
              maxWidth: '100%',
              borderRadius: '24px',
              background: '#fff',
              objectFit: 'cover',
              boxSizing: 'border-box',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            }}
          />
        </Box>
      </Container>
    </section>
  );
};

export default InventorySection;
