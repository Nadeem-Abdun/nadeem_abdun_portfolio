import React, { useState } from 'react';
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
        await setTimeout(() => {
            setFormLoading(false);
        }, 2500);
        // await history('/admin/home');
    }

    const handleLoginFormSubmit = async () => {
        const formData = await new FormData();
        await formData.append('username', loginDetails.username);
        await formData.append('password', loginDetails.password);
        await handleFormStatus();
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={`${(isXs || isSm || isMd) ? 'mx-5 my-3' : 'mx-10 my-10'}`}>
                <Grid container xs={12} justifyContent='center' alignItems='center' rowSpacing={(isXl || isLg || isMd) ? 5 : 3}>
                    <Grid item xs={12} className='text-center'>
                        <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Admin Login</Typography>
                    </Grid>
                    {!formLoading &&
                        <Grid container item xs={12} justifyContent='center' alignItems='center' flexDirection='column' rowSpacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="username-field"
                                    label="Email or Username"
                                    variant="filled"
                                    fullWidth
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('username', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="password-field"
                                    label="Password"
                                    variant="filled"
                                    fullWidth
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('password', event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" size="large" onClick={() => handleLoginFormSubmit()} fullWidth>Submit</Button>
                            </Grid>
                        </Grid>
                    }
                    {formLoading &&
                        <Grid container item xs={12} rowSpacing={isXs ? 1 : 2}>
                            <Grid item xs={12}>
                                <div className={`${(isXl) ? 'mx-80' : (isLg || isMd) ? 'mx-40' : 'mx-20'} text-center mt-10`}>
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
            </div>
        </div>
    )
}

export default AdminLogin