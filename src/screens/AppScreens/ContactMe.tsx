import React, { useState } from "react";
import { Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import SendSuccessfullyLogo from "../../assets/images/SendSuccessfully.png";
import "../../styles/screenStyles.css";

const ContactMe = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const [contactDetails, setContactDetails] = useState({
        name: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        success: false,
        loading: false,
    });

    const handleFormStatus = async () => {
        await setFormStatus({ ...formStatus, loading: true, success: false, });
        setTimeout(() => {
            setFormStatus({ ...formStatus, loading: false, success: true, });
        }, 2500);
    }

    const handleTextFeildsChange = (name: string, value: string) => {
        setContactDetails({
            ...contactDetails,
            [name]: value
        });
    };

    const handleContactFormSubmit = async () => {
        const formData = await new FormData();
        await formData.append('name', contactDetails.name);
        await formData.append('email', contactDetails.email);
        await formData.append('contactNumber', contactDetails.contactNumber);
        await formData.append('message', contactDetails.message);
        await handleFormStatus();
    };

    const [formGridSize, setFormGridSize] = useState({
        name: 9,
        email: 12,
        contactNumber: 7,
        message: 10,
    });

    const handleGridOnFocus = (element: string, value: number) => {
        setFormGridSize(prevState => ({
            ...prevState,
            [element]: value,
        }));
    };

    const handleGridOnBlur = (element: string, value: number) => {
        setFormGridSize(prevState => ({
            ...prevState,
            [element]: value,
        }));
    };

    return (
        <div id='section-contact-me' className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? 'my-3' : 'my-10'}`}>
            <Grid container xs={12} justifyContent='flex-start' alignItems='center' rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily='inter'>Contact Me</Typography>
                </Grid>
                <Grid container item xs={12} className={`card ${(isXs) ? 'px-2' : 'px-4'} ${(isXs) ? 'py-2' : 'py-4'}`} justifyContent='flex-start' alignItems='center'>
                    {!formStatus.success && !formStatus.loading &&
                        <Grid container item xs={12} rowSpacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={400} fontFamily='inter'>How about having a quick conversation? Please fill out the form below, and I'll reach out to you shortly.</Typography>
                            </Grid>
                            <Grid item xs={formGridSize.name}>
                                <TextField
                                    id="name-field"
                                    label="Name"
                                    variant="filled"
                                    type="text"
                                    fullWidth
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('name', event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("name", 12)}
                                    onMouseOut={() => handleGridOnBlur("name", 9)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.email}>
                                <TextField
                                    id="email-field"
                                    label="Email"
                                    variant="filled"
                                    type="email"
                                    fullWidth
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('email', event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("email", 12)}
                                    onMouseOut={() => handleGridOnBlur("email", 12)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.contactNumber}>
                                <TextField
                                    id="contactNumber-field"
                                    label="Contact Number(Optional)"
                                    variant="filled"
                                    type="number"
                                    fullWidth
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('contactNumber', event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("contactNumber", 12)}
                                    onMouseOut={() => handleGridOnBlur("contactNumber", 7)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.message}>
                                <TextField
                                    id="message-field"
                                    label="Message"
                                    variant="filled"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ backgroundColor: '#D1D5DB', borderRadius: 3, }}
                                    onChange={(event) => handleTextFeildsChange('message', event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("message", 12)}
                                    onMouseOut={() => handleGridOnBlur("message", 10)}
                                />
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" size="large" onClick={() => handleContactFormSubmit()} fullWidth>Submit</Button>
                            </Grid>
                        </Grid>
                    }
                    {formStatus.loading &&
                        <Grid container item xs={12} rowSpacing={isXs ? 1 : 2}>
                            <Grid item xs={12}>
                                <div className={`${(isXl) ? 'mx-80' : (isLg || isMd) ? 'mx-40' : 'mx-20'} text-center mt-10`}>
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
                    {formStatus.success && !formStatus.loading &&
                        <Grid container item xs={12} rowSpacing={isXs ? 0 : 2}>
                            <Grid item xs={12}>
                                <img src={SendSuccessfullyLogo} className='h-80 mx-auto' alt='Form_Submitted' />
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant={isXs ? 'body1' : 'h6'} fontWeight={400} fontFamily='inter'>
                                    Thank you for reaching out! Your details have been received, and I'll get back to you soon to continue our conversation.
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div >
    )
}

export default ContactMe