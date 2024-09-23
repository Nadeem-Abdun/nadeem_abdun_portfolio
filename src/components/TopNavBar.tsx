import React, { useState, useEffect } from "react"
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Button, Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutFormFailure, logoutFormSuccess, resetLogoutForm, submitLogoutForm } from "../redux/users/usersSlice";
import AppLogo from "../assets/images/App_Logo.png";
import { GetUserLogout } from "../services/ServiceControllers";
import AlertSlider from "./AlertSlider";
import { useBreakpoints } from "../utils/Breakpoints";
import avatarInitialsGenerator from "../utils/AvatarInitialsGenerator";

const pages = ["Portfolio", "Entry Panel", "Signup", "Login", "Profile", "Home"];
const settings = ["Profile", "Logout"];

const TopNavBar = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

  // Redux State Management
  const { _id, username } = useSelector((state: RootState) => state.user);

  // Local State Management
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pageTitle, setPageTitle] = useState("");

  // Api Calls
  const userLogoutApiCall = async () => {
    try {
      const response = await GetUserLogout();
      if (response.success === true) {
        handleAlertSliderOpen("success", response.message);
      } else {
        handleAlertSliderOpen("error", response.message);
      }
      return response;
    } catch (error) {
      console.error("Unexpected error: " + error);
      handleAlertSliderOpen("error", "Unexpected error encountered");
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
    if (menuName === "Profile") {
      console.log("Profile")
    }
    if (menuName === "Logout") {
      handleLogOutDialogOpen();
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
    if (response.success) {
      setLogOutDialogOpen(false);
      dispatch(logoutFormSuccess());
      dispatch(resetLogoutForm());
    } else {
      dispatch(logoutFormFailure());
    }
  };

  // Alert Slider Functions
  const [alertSliderOpen, setAlertSliderOpen] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const handleAlertSliderOpen = (type: string, message: string) => {
    setAlertType(type)
    setAlertMessage(message)
    setAlertSliderOpen(true)
  };
  const handleAlertSliderClose = () => {
    setAlertSliderOpen(false)
  };

  const handlePageNavigations = (page: string) => {
    if (page === "Portfolio") {
      history("/");
    }
    if (page === "Entry Panel") {
      history("/admin");
    }
    if (page === "Signup") {
      history("/admin/signup");
    }
    if (page === "Login") {
      history("/admin/login");
    }
    if (page === "Profile") {
      history("/admin/profile");
    }
    if (page === "Home") {
      history("/admin/home");
    }
  };
  const handlePageTitleUpdate = () => {
    if (location.pathname === "/") {
      setPageTitle("Portfolio Page");
    }
    if (location.pathname === "/admin") {
      setPageTitle("Admin-Panel");
    }
    if (location.pathname === "/admin/signup") {
      setPageTitle("Admin-Signup");
    }
    if (location.pathname === "/admin/login") {
      setPageTitle("Admin-Login");
    }
    if (location.pathname === "/admin/profile") {
      setPageTitle("Admin-Profile");
    }
    if (location.pathname === "/admin/home") {
      setPageTitle("Admin-Home");
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
            {(isXs || isSm) &&
              <Grid container xs={12} justifyContent="space-between" alignItems="center">
                <Grid item>
                  {/* Page Logo And Title */}
                  <img alt="page_logo" src={AppLogo} style={{ marginRight: "1rem", }} onClick={handleOpenNavMenu} />
                  {/* Page Navigations Menu */}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={() => handlePageNavigations(page)} style={{ textDecoration: "none" }}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid item>
                  {/* Avatar Section */}
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {username === "" ?
                      <Avatar alt={username} />
                      :
                      <Avatar alt={username} {...avatarInitialsGenerator(username as string)} />
                    }
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((option) => (
                      <MenuItem key={option} onClick={() => handleUserMenuClick(option)}>
                        <Typography>{option}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            }
            {/* Desktop View Nav Menu */}
            {!(isXs || isSm) &&
              <>
                {/* Page Logo And Title */}
                <img alt="page_logo" src={AppLogo} style={{ marginRight: "1rem", }} />
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {pageTitle}
                </Typography>
                {/* Page Navigations Menu */}
                <Box sx={{ flexGrow: 1, display: "flex" }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageNavigations(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                {/* Avatar Section */}
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {username === "" ?
                      <Avatar alt={username} />
                      :
                      <Avatar alt={username} {...avatarInitialsGenerator(username as string)} />
                    }
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((option) => (
                      <MenuItem key={option} onClick={() => handleUserMenuClick(option)}>
                        <Typography>{option}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog open={logOutDialogOpen} onClose={() => handleLogOutDialogClose()} fullScreen={isXs} fullWidth disableEscapeKeyDown>
        <DialogTitle>
          <Typography variant="h6" fontWeight={500} fontFamily='inter'>Logout</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" fontWeight={500} fontFamily='inter'>Are you sure want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
            <Grid item>
              <Button variant="contained" color="success" onClick={() => handleLogOutDialogClose()}>Cancel</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={() => handleLogOutSubmit()}>LogOut</Button>
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
  )
}

export default TopNavBar