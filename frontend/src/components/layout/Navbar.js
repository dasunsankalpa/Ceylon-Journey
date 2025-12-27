import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Language as LanguageIcon
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [langAnchor, setLangAnchor] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleLangMenu = (event) => {
    setLangAnchor(event.currentTarget);
  };

  const handleLangClose = () => {
    setLangAnchor(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleLangClose();
  };

  return (
    <AppBar 
      position="fixed"
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        zIndex: 1100
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            🇱🇰 Sri Lanka Tourism
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" component={Link} to="/destinations">
              {t('destinations')}
            </Button>
            <Button color="inherit" component={Link} to="/hotels">
              {t('hotels')}
            </Button>
            <Button color="inherit" component={Link} to="/tickets">
              {t('tickets')}
            </Button>
            <Button color="inherit" component={Link} to="/transport">
              {t('transport')}
            </Button>
            
            {user && (
              <Button color="inherit" component={Link} to="/bookings">
                {t('bookings')}
              </Button>
            )}
          </Box>

          <IconButton color="inherit" onClick={handleLangMenu}>
            <LanguageIcon />
          </IconButton>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={handleLangClose}
          >
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('si')}>සිංහල</MenuItem>
            <MenuItem onClick={() => changeLanguage('ta')}>தமிழ்</MenuItem>
          </Menu>

          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  Profile
                </MenuItem>
                {user.role === 'admin' && (
                  <MenuItem onClick={() => { navigate('/admin'); handleClose(); }}>
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                {t('login')}
              </Button>
              <Button color="inherit" component={Link} to="/register">
                {t('register')}
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
