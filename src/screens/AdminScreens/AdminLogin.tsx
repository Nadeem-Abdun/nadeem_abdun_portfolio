import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, CircularProgress, Button, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { submitLoginForm, loginFormSuccess, loginFormFailure, resetLoginForm } from "../../redux/users/usersSlice";
import { PostUserLogin } from "../../services/ServiceControllers";
import AlertSlider from "../../components/AlertSlider";
import delay from "../../utils/Delay";
import "../../styles/screenStyles.css";

const AdminLogin = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const { _id, username, email, profile, loading, success } = useSelector((state: RootState) => state.user);

    // State Handling
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    // Api Calls
    const userLoginApiCall = async () => {
        try {
            const formData = {
                email: loginDetails.email,
                password: loginDetails.password
            }
            const response = await PostUserLogin(formData);
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

    // Textfield OnChange Handling
    const handleTextFeildsChange = (name: string, value: string) => {
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    };

    // Login Submit Functions
    const handleLoginFormSubmit = async () => {
        dispatch(submitLoginForm());
        const response = await userLoginApiCall();
        if (response.success) {
            const userData = response?.data;
            dispatch(loginFormSuccess(userData));
            await delay(3000);
            history('/admin/profile');
            dispatch(resetLoginForm());
        } else {
            dispatch(loginFormFailure());
        }
    };

    // Password Display/Hiding Functions 
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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

    useEffect(() => {
        document.title = "Admin - Login"
    }, []);
    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item>
                <Typography variant="h4" fontWeight={500} fontFamily='inter'>Admin Login</Typography>
            </Grid>
            <Grid container item xl={6} lg={6} md={8} sm={10} xs={10} justifyContent='center' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="email-field"
                        label="Email"
                        variant="filled"
                        type="email"
                        fullWidth
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, }}
                        onChange={(event) => handleTextFeildsChange('email', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="filled" fullWidth sx={{ backgroundColor: '#D1D5DB', borderRadius: 2 }}>
                        <InputLabel htmlFor="password-field">Password</InputLabel>
                        <FilledInput
                            id="password-field"
                            type={showPassword ? 'text' : 'password'}
                            sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, '& input': { borderRadius: 2 } }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(event) => handleTextFeildsChange('password', event.target.value)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => handleLoginFormSubmit()}
                        fullWidth
                        startIcon={loading && <CircularProgress size={24} style={{ color: '#fff' }} thickness={6} />}
                        disabled={success === true ? true : false}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Grid>
            </Grid>
            <AlertSlider
                alertSliderOpen={alertSliderOpen}
                alertType={alertType}
                alertMessage={alertMessage}
                handleAlertSliderClose={handleAlertSliderClose}
            />
        </Grid>
    )
}

export default AdminLogin
