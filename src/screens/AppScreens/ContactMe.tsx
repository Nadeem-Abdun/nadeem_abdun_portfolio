import React, { useState } from "react";
import { Grid, Typography, TextField, Button, CircularProgress, IconButton } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import SuccessLogo from "../../assets/images/Success.png";
import ErrorLogo from "../../assets/images/Error.png";
import { ReplayOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { submitCreateContactForm, createContactFormSuccess, createContactFormFailure, resetCreateContactForm } from "../../redux/contactMe/contactMeSlice";
import { PostCreateContactForm } from "../../services/ServiceControllers";
import AlertSlider from "../../components/AlertSlider";
import "../../styles/screenStyles.css";

const ContactMe = () => {
    const dispatch = useDispatch();
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    // Redux State Management
    const { contactMeForms, loading, success } = useSelector((state: RootState) => state.contactMe);

    // Local State Management
    const [contactMeRequest, setContactMeRequest] = useState({
        visitorName: "",
        visitorEmail: "",
        visitorPhone: "",
        visitorMessage: ""
    });

    // Api Calls
    const createContactFormApiCall = async () => {
        try {
            const formData = {
                visitorName: contactMeRequest.visitorName,
                visitorEmail: contactMeRequest.visitorEmail,
                visitorPhone: contactMeRequest.visitorPhone,
                visitorMessage: contactMeRequest.visitorMessage,
            }
            const response = await PostCreateContactForm(formData, '6692a6e7a7900e23064b7c75');
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

    // Create Contact Form Submit Functions
    const handleContactFormSubmit = async () => {
        dispatch(submitCreateContactForm());
        const response = await createContactFormApiCall();
        if (response.success) {
            const responseData = response.data;
            const contacMeObjectData = {
                _id: responseData._id,
                visitorName: responseData.visitorName,
                visitorEmail: responseData.visitorEmail,
                visitorPhone: responseData.visitorPhone,
                visitorMessage: responseData.visitorMessage,
                userReplyMessage: responseData.userReplyMessage,
            };
            dispatch(createContactFormSuccess(contacMeObjectData));
            setContactMeRequest({ visitorName: "", visitorEmail: "", visitorPhone: "", visitorMessage: "" });
        } else {
            dispatch(createContactFormFailure());
        }
    };
    const handleContactFormReset = () => {
        dispatch(resetCreateContactForm());
    };

    // Textfields Onchange Function
    const handleTextFeildsChange = (name: string, value: string) => {
        setContactMeRequest({
            ...contactMeRequest,
            [name]: value
        });
    };

    // TextFields Dynamic Width Changing Functions
    const [formGridSize, setFormGridSize] = useState({
        visitorName: 9,
        visitorEmail: 12,
        visitorPhone: 7,
        visitorMessage: 10,
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
    return (
        <div id="section-contact-me" className={`flex flex-col justify-center items-center ${(isXs || isSm || isMd) ? "my-3" : "my-10"}`}>
            <Grid container xs={12} justifyContent="flex-start" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500} fontFamily="inter">Contact Me</Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    className={`${(!isXs) && "card"} ${(!isXs) && "px-3"} ${(!isXs) && "py-3"}`}
                    style={{ minHeight: `${isXs ? '527px' : '505px'}` }}
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    {(loading === false) && (success === null) &&
                        <Grid container item xs={12} rowSpacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={400} fontFamily="inter">How about having a quick conversation? Please fill out the form below, and I'll reach out to you shortly.</Typography>
                            </Grid>
                            <Grid item xs={formGridSize.visitorName}>
                                <TextField
                                    id="name-field"
                                    label="Name"
                                    variant="filled"
                                    type="text"
                                    fullWidth
                                    sx={{ backgroundColor: "#D1D5DB", borderRadius: 3, }}
                                    value={contactMeRequest.visitorName}
                                    onChange={(event) => handleTextFeildsChange("visitorName", event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("visitorName", 12)}
                                    onMouseOut={() => handleGridOnBlur("visitorName", 9)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.visitorEmail}>
                                <TextField
                                    id="email-field"
                                    label="Email"
                                    variant="filled"
                                    type="email"
                                    fullWidth
                                    sx={{ backgroundColor: "#D1D5DB", borderRadius: 3, }}
                                    value={contactMeRequest.visitorEmail}
                                    onChange={(event) => handleTextFeildsChange("visitorEmail", event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("visitorEmail", 12)}
                                    onMouseOut={() => handleGridOnBlur("visitorEmail", 12)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.visitorPhone}>
                                <TextField
                                    id="contactNumber-field"
                                    label="Contact Number(Optional)"
                                    variant="filled"
                                    type="text"
                                    fullWidth
                                    sx={{ backgroundColor: "#D1D5DB", borderRadius: 3, }}
                                    value={contactMeRequest.visitorPhone}
                                    onChange={(event) => handleTextFeildsChange("visitorPhone", event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("visitorPhone", 12)}
                                    onMouseOut={() => handleGridOnBlur("visitorPhone", 7)}
                                />
                            </Grid>
                            <Grid item xs={formGridSize.visitorMessage}>
                                <TextField
                                    id="message-field"
                                    label="Message"
                                    variant="filled"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ backgroundColor: "#D1D5DB", borderRadius: 3, }}
                                    value={contactMeRequest.visitorMessage}
                                    onChange={(event) => handleTextFeildsChange("visitorMessage", event.target.value)}
                                    onMouseOver={() => handleGridOnFocus("visitorMessage", 12)}
                                    onMouseOut={() => handleGridOnBlur("visitorMessage", 10)}
                                />
                            </Grid>
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" size="large" onClick={() => handleContactFormSubmit()} fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    {(loading === true) && (success === null) &&
                        <Grid container item xs={12} rowSpacing={(isXl || isLg) ? 8 : 10}>
                            <Grid item xs={12}>
                                <div className={`${(isXl) ? "mx-80" : (isLg) ? "mx-40" : (isMd) ? "mx-30" : "mx-10"} text-center mt-10`}>
                                    <CircularProgress size={(isXl || isLg) ? 200 : 150} color="info" />
                                </div>
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily="inter">
                                    Your request is being processed, Please wait while we submit your information...
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    {(loading === false) && (success === true) &&
                        <Grid container item xs={12} rowSpacing={(isXl || isLg) ? 1 : 0}>
                            <Grid item xs={12}>
                                <img src={SuccessLogo} className="h-80 mx-auto" alt="Form_Submitted" />
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily="inter">
                                    Thank you for reaching out! Your request has been received, and we will get back to you soon to continue our conversation.
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    {(loading === false) && (success === false) &&
                        <Grid container item xs={12} justifyContent="center" alignItems="center" rowSpacing={(isXl || isLg) ? 1 : 0}>
                            <Grid item xs={12}>
                                <img src={ErrorLogo} className="h-80 mx-auto" alt="Form_Error" />
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Typography variant={isXs ? "body1" : "h6"} fontWeight={400} fontFamily="inter">
                                    Failed to submit your request. Please try again by clicking the button below.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => { handleContactFormReset() }} size="large">
                                    <ReplayOutlined className="text-cyan-400" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <AlertSlider
                alertSliderOpen={alertSliderOpen}
                alertType={alertType}
                alertMessage={alertMessage}
                handleAlertSliderClose={handleAlertSliderClose}
            />
        </div>
    )
}

export default ContactMe