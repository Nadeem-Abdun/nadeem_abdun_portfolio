import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, CircularProgress, Button } from '@mui/material';
import './ScreenStyles.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const history = useNavigate();

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: '',
    });

    const handleTextFeildsChange = (name: string, value: string) => {
        setLoginDetails({
            ...loginDetails,
            [name]: value
        });
    }

    const [formLoading, setFormLoading] = useState(false);

    const handleFormStatus = async () => {
        await setFormLoading(true);
        setTimeout(() => {
            setFormLoading(false);
        }, 2500);
        setTimeout(() => {
            history('/admin/home');
        }, 2500);
    }

    const handleLoginFormSubmit = async () => {
        const formData = await new FormData();
        await formData.append('username', loginDetails.username);
        await formData.append('password', loginDetails.password);
        await handleFormStatus();
    }

    useEffect(() => {
        document.title = "Admin - Login"
    }, []);

    return (
        <Grid container justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={4} wrap='nowrap'>
            <Grid item xs={12} className='text-center'>
                <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Admin Login</Typography>
            </Grid>
            <Grid container item xl={6} lg={6} md={8} sm={10} xs={10} justifyContent='center' alignItems='center' rowSpacing={2}>
                {!formLoading &&
                    <>
                        <Grid item xs={12}>
                            <TextField
                                id="username-field"
                                label="Email or Username"
                                variant="filled"
                                fullWidth
                                sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, }}
                                onChange={(event) => handleTextFeildsChange('username', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password-field"
                                label="Password"
                                variant="filled"
                                fullWidth
                                sx={{ backgroundColor: '#D1D5DB', borderRadius: 2, }}
                                onChange={(event) => handleTextFeildsChange('password', event.target.value)}
                            />
                        </Grid>
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
                            <Typography component='h2' variant={isXs ? 'body1' : 'h6'} fontWeight={400} fontFamily='inter'>
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