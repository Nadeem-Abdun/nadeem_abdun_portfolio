import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutFormFailure,
  logoutFormSuccess,
  resetLogoutForm,
  submitLogoutForm,
} from '../redux/users/usersSlice';
import AppLogo from '../assets/images/App_Logo.png';
import { GetUserLogout } from '../services/ServiceControllers';
import AlertSlider from './AlertSlider';
import { useBreakpoints } from '../utils/Breakpoints';
import avatarInitialsGenerator from '../utils/AvatarInitialsGenerator';
import {
  clearUserSession,
  getUserSession,
  verifyUserSession,
} from '../utils/SessionManager';

const pages = [
  'Portfolio',
  'Admin Panel',
  'Signup',
  'Login',
  'Profile',
  'Home',
];
const settings = ['Profile', 'Login', 'Logout'];

const TopNavBar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isSm, isXs } = useBreakpoints();
  const isLoggedIn = verifyUserSession();
  const sessionUser = getUserSession();
  const sessionUserName = sessionUser && sessionUser.username;

  // Redux State Management
  const { username } = useSelector((state: RootState) => state.user);
  const { serverHealthy } = useSelector((state: RootState) => state.health);

  const avatarDisplayName = username || sessionUserName || '';

  // Local State Management
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pageTitle, setPageTitle] = useState('');

  // Api Calls
  const userLogoutApiCall = async () => {
    try {
      const response = await GetUserLogout();
      if (response.success === true) {
        handleAlertSliderOpen('success', response.message);
      } else {
        handleAlertSliderOpen('error', response.message);
      }
      return response;
    } catch (error) {
      console.error('Unexpected error: ' + error);
      handleAlertSliderOpen('error', 'Unexpected error encountered');
    }
  };

  // Mobile View Nav Menu Fuctions
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // User Avatar Menu Functions
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserMenuClick = (menuName: string) => {
    if (menuName === 'Profile') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/profile');
        handleCloseUserMenu();
      }
    }
    if (menuName === 'Logout') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        handleLogOutDialogOpen();
        handleCloseUserMenu();
      }
    }
    if (menuName === 'Login') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/login');
        handleCloseUserMenu();
      }
    }
  };

  // User Logout Functions
  const [logOutDialogOpen, setLogOutDialogOpen] = useState(false);
  const handleLogOutDialogOpen = () => {
    setLogOutDialogOpen(true);
    setAnchorElUser(null);
  };
  const handleLogOutDialogClose = () => {
    setLogOutDialogOpen(false);
  };
  const handleLogOutSubmit = async () => {
    dispatch(submitLogoutForm());
    const response = await userLogoutApiCall();
    if (response && response.success) {
      clearUserSession();
      handleLogOutDialogClose();
      dispatch(logoutFormSuccess());
      dispatch(resetLogoutForm());
      history('/admin/login');
    } else {
      dispatch(logoutFormFailure());
    }
  };

  // Alert Slider Functions
  const [alertSliderOpen, setAlertSliderOpen] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertSliderOpen = (type: string, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertSliderOpen(true);
  };
  const handleAlertSliderClose = () => {
    setAlertSliderOpen(false);
  };

  // Page Navigations Functions
  const handlePageNavigations = (page: string) => {
    if (page === 'Portfolio') {
      history('/');
      handleCloseNavMenu();
    }
    if (page === 'Admin Panel') {
      history('/admin');
      handleCloseNavMenu();
    }
    if (page === 'Signup') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/signup');
        handleCloseNavMenu();
      }
    }
    if (page === 'Login') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/login');
        handleCloseNavMenu();
      }
    }
    if (page === 'Profile') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/profile');
        handleCloseNavMenu();
      }
    }
    if (page === 'Home') {
      if (!serverHealthy) {
        handleAlertSliderOpen(
          'error',
          'Service unavailable. Please try again later.'
        );
        return;
      } else {
        history('/admin/home');
        handleCloseNavMenu();
      }
    }
  };
  const handlePageTitleUpdate = () => {
    if (location.pathname === '/') {
      setPageTitle('Portfolio Page');
    }
    if (location.pathname === '/admin') {
      setPageTitle('Admin-Panel');
    }
    if (location.pathname === '/admin/signup') {
      setPageTitle('Admin-Signup');
    }
    if (location.pathname === '/admin/login') {
      setPageTitle('Admin-Login');
    }
    if (location.pathname === '/admin/profile') {
      setPageTitle('Admin-Profile');
    }
    if (location.pathname === '/admin/home') {
      setPageTitle('Admin-Home');
    }
  };

  useEffect(() => {
    handlePageTitleUpdate();
  }, [location]);
  return (
    <>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile And Tab View Nav Menu */}
            {(isXs || isSm) && (
              <Grid
                container
                size={{ xs: 12 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid>
                  {/* Page Logo And Title */}
                  <img
                    alt="page_logo"
                    src={AppLogo}
                    style={{ marginRight: '1rem' }}
                    onClick={handleOpenNavMenu}
                  />
                  {/* Page Navigations Menu */}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages
                      .filter(page => {
                        if (isLoggedIn) {
                          return (
                            page === 'Portfolio' ||
                            page === 'Profile' ||
                            page === 'Home'
                          );
                        } else {
                          return (
                            page === 'Portfolio' ||
                            page === 'Admin Panel' ||
                            page === 'Signup' ||
                            page === 'Login'
                          );
                        }
                      })
                      .map(page => (
                        <MenuItem
                          key={page}
                          onClick={() => handlePageNavigations(page)}
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </Grid>
                <Grid>
                  {/* Avatar Section */}
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={avatarDisplayName}
                      {...(avatarDisplayName
                        ? avatarInitialsGenerator(avatarDisplayName)
                        : {})}
                    />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings
                      .filter(option => {
                        if (isLoggedIn) {
                          return option === 'Profile' || option === 'Logout';
                        } else {
                          return option === 'Login';
                        }
                      })
                      .map(option => (
                        <MenuItem
                          key={option}
                          onClick={() => handleUserMenuClick(option)}
                        >
                          <Typography>{option}</Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </Grid>
              </Grid>
            )}
            {/* Desktop View Nav Menu */}
            {!(isXs || isSm) && (
              <>
                {/* Page Logo And Title */}
                <img
                  alt="page_logo"
                  src={AppLogo}
                  style={{ marginRight: '1rem' }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {pageTitle}
                </Typography>
                {/* Page Navigations Menu */}
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  {pages
                    .filter(page => {
                      if (isLoggedIn) {
                        return (
                          page === 'Portfolio' ||
                          page === 'Profile' ||
                          page === 'Home'
                        );
                      } else {
                        return (
                          page === 'Portfolio' ||
                          page === 'Admin Panel' ||
                          page === 'Signup' ||
                          page === 'Login'
                        );
                      }
                    })
                    .map(page => (
                      <Button
                        key={page}
                        onClick={() => handlePageNavigations(page)}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page}
                      </Button>
                    ))}
                </Box>
                {/* Avatar Section */}
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={avatarDisplayName}
                      {...(avatarDisplayName
                        ? avatarInitialsGenerator(avatarDisplayName)
                        : {})}
                    />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings
                      .filter(option => {
                        if (isLoggedIn) {
                          return option === 'Profile' || option === 'Logout';
                        } else {
                          return option === 'Login';
                        }
                      })
                      .map(option => (
                        <MenuItem
                          key={option}
                          onClick={() => handleUserMenuClick(option)}
                        >
                          <Typography>{option}</Typography>
                        </MenuItem>
                      ))}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={logOutDialogOpen}
        onClose={() => handleLogOutDialogClose()}
        fullScreen={isXs}
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={500} fontFamily="inter">
            Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" fontWeight={500} fontFamily="inter">
            Are you sure want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            size={{ xs: 12 }}
            justifyContent="flex-end"
            alignItems="center"
            columnGap={1}
          >
            <Grid>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleLogOutDialogClose()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleLogOutSubmit()}
              >
                LogOut
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      <AlertSlider
        alertSliderOpen={alertSliderOpen}
        alertType={alertType}
        alertMessage={alertMessage}
        handleAlertSliderClose={handleAlertSliderClose}
      />
    </>
  );
};

export default TopNavBar;
