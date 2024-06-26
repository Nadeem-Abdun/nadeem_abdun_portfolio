import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, CircularProgress, Button, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { submitForm, submitFormSuccess, submitFormFailure, resetForm } from "../../redux/users/usersSlice"
import { PostUserSignUp } from "../../services/ServiceControllers";
import AlertSlider from "../../components/AlertSlider";
import delay from "../../utils/Delay";
import "../../styles/screenStyles.css";

const AdminSignup = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const { _id, username, email, profiles, loading, success } = useSelector((state: RootState) => state.user);

    // State Handling
    const [signupDetails, setSignupDetails] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    // Api Calls
    const userSignUpApiCall = async () => {
        try {
            const formData = {
                username: signupDetails.username,
                email: signupDetails.email,
                password: signupDetails.password
            }
            const response = await PostUserSignUp(formData);
            if (response.success === true) {
                handleAlertSliderOpen("success", response.message);
                return true;
            } else {
                handleAlertSliderOpen("error", response.message);
                return false;
            }
        } catch (error) {
            console.error("Unexpected error:" + error);
            handleAlertSliderOpen("error", "Unexpected error occurred");
        }
    };

    // Textfield OnChange Handling
    const handleTextFeildsChange = (name: string, value: string) => {
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    };

    // SignUp Submit Functions
    const handleSignUpFormSubmit = async () => {
        dispatch(submitForm());
        const response = await userSignUpApiCall();
        if (response) {
            dispatch(submitFormSuccess());
            await delay(3000);
            history('/admin/login');
            dispatch(resetForm());
        } else {
            dispatch(submitFormFailure());
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
        document.title = "Admin - Signup"
    }, []);

    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item xs={12} className='text-center'>
                <Typography variant="h4" fontWeight={500} fontFamily='inter'>Admin Signup</Typography>
            </Grid>
            <Grid container item xl={6} lg={6} md={8} sm={10} xs={10} justifyContent='center' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="username-field"
                        label="Username"
                        variant="filled"
                        type="text"
                        fullWidth
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, }}
                        onChange={(event) => handleTextFeildsChange('username', event.target.value)}
                    />
                </Grid>
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
                        onClick={() => handleSignUpFormSubmit()}
                        fullWidth
                        startIcon={loading && <CircularProgress size={24} style={{ color: '#fff' }} thickness={6} />}
                        disabled={success === true ? true : false}
                    >
                        {loading ? 'Signing up...' : 'Signup'}
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

export default AdminSignup