import { Container, Typography, Button, Box, Link } from '@mui/material';
import realTimeImg from '../../assets/secure.jpg';

const UpdatesSection = () => {
  return (
    <section className="updates-section" style={{ background: 'transparent', padding: '56px 0' }}>
      <Container maxWidth="xl" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
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
            src={realTimeImg}
            alt="Real Time Updates"
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
        {/* Text Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '32px',
            background: 'rgba(255,255,255,0.6)',
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
            Secure, Compliant, and Scalable
          </Typography>
          <Typography
            variant="h4"
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
            Streamline parking operations for both public and private lots.
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5} marginBottom={5}>
            <div className="bright-pointer"><span className="bullet">•</span>End-to-end data encryption</div>
            <div className="bright-pointer"><span className="bullet">•</span>Role-based access control</div>
            <div className="bright-pointer"><span className="bullet">•</span>Designed for high-volume courts and legal institutions</div>
          </Box>
          <Link href="/auth" underline="none">
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
      </Container>
    </section>
  );
};

export default UpdatesSection;
