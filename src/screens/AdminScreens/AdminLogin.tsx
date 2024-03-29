import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, CircularProgress, Button, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { useNavigate } from "react-router-dom";
import "../../styles/screenStyles.css";

const AdminLogin = () => {

    const history = useNavigate();

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const handleTextFeildsChange = (name: string, value: string) => {
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    };

    const [formLoading, setFormLoading] = useState(false);

    const handleFormStatus = async () => {
        await setFormLoading(true);
        setTimeout(() => {
            setFormLoading(false);
        }, 2500);
        setTimeout(() => {
            history('/admin/home');
        }, 2500);
    };

    const handleLoginFormSubmit = async () => {
        const formData = await new FormData();
        await formData.append('username', loginDetails.username);
        await formData.append('password', loginDetails.password);
        await handleFormStatus();
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        document.title = "Admin - Login"
    }, []);

    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item xs={12} className='text-center'>
                <Typography variant="h4" fontWeight={500} fontFamily='inter'>Admin Login</Typography>
            </Grid>
            <Grid container item xl={6} lg={6} md={8} sm={10} xs={10} justifyContent='center' alignItems='center' rowSpacing={2}>
                {!formLoading &&
                    <>
                        <Grid item xs={12}>
                            <TextField
                                id="username-field"
                                label="Email or Username"
                                variant="filled"
                                type="email"
                                fullWidth
                                sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, }}
                                onChange={(event) => handleTextFeildsChange('username', event.target.value)}
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
                            >
                                Login
                            </Button>
                        </Grid>
                    </>
                }
                {formLoading &&
                    <Grid container xs={12} justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={2} wrap='nowrap'>
                        <Grid item xs={12}>
                            <div className='mt-10 text-center'>
                                <CircularProgress size={120} color='info' />
                            </div>
                        </Grid>
                        <Grid item xs={12} className="text-center">
                            <Typography variant={isXs ? 'body1' : 'h6'} fontWeight={400} fontFamily='inter'>
                                Please wait...
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default AdminLogin