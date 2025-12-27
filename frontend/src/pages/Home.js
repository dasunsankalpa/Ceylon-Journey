import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import {
  Hotel as HotelIcon,
  Explore as ExploreIcon,
  ConfirmationNumber as TicketIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';

const Home = () => {
  const { t } = useTranslation();

  const heroImageUrl = `${process.env.PUBLIC_URL}/images/hero.png`;
  const rightImageUrl = `${process.env.PUBLIC_URL}/images/right.png`;

  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: t('destinations'),
      description: 'Explore beautiful beaches, mountains, and cultural sites',
      link: '/destinations'
    },
    {
      icon: <HotelIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: t('hotels'),
      description: 'Book comfortable accommodations across Sri Lanka',
      link: '/hotels'
    },
    {
      icon: <TicketIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: t('tickets'),
      description: 'Get tickets to national parks and attractions',
      link: '/tickets'
    },
    {
      icon: <CarIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: t('transport'),
      description: 'Book rides and transportation easily',
      link: '/transport'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          py: 16,
          pt: { xs: 10, sm: 12, md: 14 },
          position: 'relative',
          minHeight: { xs: '500px', sm: '600px', md: '700px' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: '#DFEDEA'
        }}
      >
        {/* Left side image */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '35%',
            height: '100%',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%), url('${heroImageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: { xs: 'none', md: 'block' }
          }}
        />

        {/* Right side image */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '65%',
            height: '100%',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.1) 100%), url('${rightImageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: { xs: 'none', md: 'block' }
          }}
        />

        {/* Mobile/Tablet background */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%), url('${heroImageUrl}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            display: { xs: 'block', md: 'none' }
          }}
        />

        {/* Content on top */}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              color: '#1a1a1a',
              textShadow: 'none',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              mb: 2
            }}
          >
            🇱🇰 {t('welcome')}
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              color: '#2d2d2d',
              textShadow: 'none',
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.5rem' }
            }}
          >
            The Pearl of the Indian Ocean Awaits You
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4,
              color: '#333333',
              textShadow: 'none',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Discover pristine beaches, ancient temples, lush tea plantations, and incredible wildlife. 
            From Sigiriya Rock to Galle Fort, from Yala National Park to Ella's rolling hills — 
            your ultimate Sri Lankan adventure starts here.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main',
                fontWeight: 'bold',
                px: 4,
                '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)' },
                transition: 'all 0.3s ease'
              }}
              component={Link}
              to="/destinations"
            >
              {t('explore')} Destinations
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                color: 'white',
                borderColor: 'white',
                fontWeight: 'bold',
                px: 4,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-2px)' },
                transition: 'all 0.3s ease'
              }}
              component={Link}
              to="/hotels"
            >
              Book a Hotel
            </Button>
          </Box>

          {/* Quick Stats */}
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                  65K+
                </Typography>
                <Typography variant="body2" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                  km² of Paradise
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                  365
                </Typography>
                <Typography variant="body2" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                  Days of Sunshine
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                  50+
                </Typography>
                <Typography variant="body2" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                  Attractions
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                  1000+
                </Typography>
                <Typography variant="body2" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                  Hotels & Resorts
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          What We Offer
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" component={Link} to={feature.link}>
                    {t('explore')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Destinations Preview */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Popular Destinations
          </Typography>
          <Grid container spacing={4}>
            {['Sigiriya', 'Galle Fort', 'Ella', 'Yala National Park'].map((dest, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia
                    component="div"
                    sx={{ height: 200, bgcolor: 'grey.300' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{dest}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Discover the beauty
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to="/destinations">
                      {t('view_details')}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
