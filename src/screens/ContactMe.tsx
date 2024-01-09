import React, { useState } from 'react'
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const ContactMe = () => {

    const isXl = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLg = useMediaQuery({ query: '(min-width: 1280px) and (max-width: 1919px)' });
    const isMd = useMediaQuery({ query: '(min-width: 960px) and (max-width: 1279px)' });
    const isSm = useMediaQuery({ query: '(min-width: 600px) and (max-width: 959px)' });
    const isXs = useMediaQuery({ query: '(min-width: 320px) and (max-width: 599px)' });

    const [contactDetails, setContactDetails] = useState({
        name: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const handleTextFeildsChange = (name: string, value: string) => {
        setContactDetails({
            ...contactDetails,
            [name]: value
        });
    };

    const handleContactFormSubmit = () => {
        const formData = new FormData();
        formData.append('name', contactDetails.name);
        formData.append('email', contactDetails.email);
        formData.append('contactNumber', contactDetails.contactNumber);
        formData.append('message', contactDetails.message);
    };

    return (
        <div className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h4" fontWeight={500} fontFamily='inter'>Contact Me</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h2" variant="body1" fontWeight={400} fontFamily='inter'>"How about having a quick conversation? Please fill out the form below, and I'll reach out to you shortly."</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="name-field"
                        label="Name"
                        variant="filled"
                        fullWidth
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                        onChange={(event) => handleTextFeildsChange('name', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="email-field"
                        label="Email"
                        variant="filled"
                        fullWidth
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                        onChange={(event) => handleTextFeildsChange('email', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="contactNumber-field"
                        label="Contact Number(Optional)"
                        variant="filled"
                        fullWidth
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                        onChange={(event) => handleTextFeildsChange('contactNumber', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="message-field"
                        label="Message"
                        variant="filled"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                        onChange={(event) => handleTextFeildsChange('message', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" size="large" onClick={() => handleContactFormSubmit()} fullWidth>Submit</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ContactMe