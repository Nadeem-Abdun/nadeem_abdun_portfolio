import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { ContactMe, ContactMeState, deleteContactFormFailure, deleteContactFormSuccess, getContactFormFailure, getContactFormSuccess, replyContactFormFailure, replyContactFormSuccess, resetDeleteContactForm, resetGetContactForm, resetReplyContactForm, submitDeleteContactForm, submitGetContactForm, submitReplyContactForm } from "../../redux/contactMe/contactMeSlice";
import { DeleteContactForm, GetContactForm, PatchReplyContactForm } from "../../services/ServiceControllers";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";
import { useDispatch } from "react-redux";

interface Props extends ContactMeState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const ContactMeCard: React.FC<Props> = (props) => {
    const { profile, contactMeForms, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State Management
    const [selectedContactRequest, setSelectedContactRequest] = useState<ContactMe>({
        _id: "",
        visitorName: "",
        visitorEmail: "",
        visitorPhone: "",
        visitorMessage: "",
        userReplyMessage: "",
    });
    const [contactRequestDialog, setContactRequestDialog] = useState(false);
    const [dialogType, setDialogType] = useState("view");

    // Api Calls
    const getContactFormsApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetContactForm(profileId);
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
    const patchReplyContactApiCall = async () => {
        try {
            const formData = {
                userReplyMessage: selectedContactRequest.userReplyMessage,
            };
            const contactFormId = selectedContactRequest._id || "";
            const response = await PatchReplyContactForm(formData, contactFormId);
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
    const deleteContactFormApiCall = async () => {
        try {
            const contactFormId = selectedContactRequest._id || "";
            const response = await DeleteContactForm(contactFormId);
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

    // Contact Form Submit Functions
    const handleGetContactFormsSubmit = async () => {
        dispatch(submitGetContactForm());
        const response = await getContactFormsApiCall();
        if (response.success) {
            const contactFormsData = response?.data;
            dispatch(getContactFormSuccess(contactFormsData));
            dispatch(resetGetContactForm());
        } else {
            dispatch(getContactFormFailure());
        }
    };
    const handleReplyContactFormSubmit = async () => {
        dispatch(submitReplyContactForm());
        const response = await patchReplyContactApiCall();
        if (response.success) {
            const contactFormData = response?.data;
            dispatch(replyContactFormSuccess(contactFormData));
            dispatch(resetReplyContactForm());
            handleContactDialogClose();
        } else {
            dispatch(replyContactFormFailure());
        }
    };
    const handleDeleteContactFormSubmit = async () => {
        dispatch(submitDeleteContactForm());
        const response = await deleteContactFormApiCall();
        if (response.success) {
            const contactFormData = response?.data;
            dispatch(deleteContactFormSuccess(contactFormData));
            dispatch(resetDeleteContactForm());
            handleContactDialogClose();
        } else {
            dispatch(deleteContactFormFailure());
        }
    };

    // Dialog Functions
    const handleContactDialogOpen = (type: string, item?: ContactMe) => {
        setContactRequestDialog(true);
        setDialogType(type);
        if (item) {
            setSelectedContactRequest(item);
        }
    };
    const handleContactDialogClose = () => {
        setContactRequestDialog(false);
        setSelectedContactRequest({
            _id: "",
            visitorName: "",
            visitorEmail: "",
            visitorPhone: "",
            visitorMessage: "",
            userReplyMessage: "",
        })
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetContactFormsSubmit();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Contact Requests</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    {contactMeForms && contactMeForms.map((item, index) => {
                        return (
                            <Grid
                                key={index}
                                container
                                item
                                xs={12}
                                className="experience-card py-2 px-3 cursor-pointer"
                                justifyContent="flex-start"
                                alignItems="center"
                                rowGap={1}
                                onClick={() => handleContactDialogOpen("view", item)}
                            >
                                <Grid container item xs={12} justifyContent="space-between" alignItems="flex-start">
                                    <Grid container item xs={10} direction="column">
                                        <Grid item>
                                            <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Contact Id:-</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" fontWeight={400} fontFamily='inter'>{item._id}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleContactDialogOpen("delete", item) }}>
                                            <DeleteForeverOutlined className="text-cyan-400 hover:text-cyan-200" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Visitor Name:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.visitorName, 25)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Visitor Message:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.visitorMessage, 80)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Visitor Email:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.visitorEmail, 25)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Visitor Phone:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.visitorPhone, 25)}</Typography>
                                    </Grid>
                                </Grid>
                                {item.userReplyMessage &&
                                    <Grid container item xs={12} direction="column">
                                        <Grid item>
                                            <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>User Reply:-</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.userReplyMessage, 25)}</Typography>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        )
                    })}
                </Grid>
                {contactMeForms?.length === 0 &&
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily="inter" className="text-center">There are no requests to display.</Typography>
                    </Grid>
                }
            </Grid>
            <Dialog open={contactRequestDialog} onClose={() => handleContactDialogClose()} fullWidth disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">
                        {(dialogType === "view") ? "View" : "Delete"} Contact Request
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="flex-start" alignItems="center" rowGap={2}>
                        {(dialogType === "view") ?
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">Name:</Typography>
                                    <Typography variant="body2" fontWeight={400} fontFamily="inter">{selectedContactRequest?.visitorName}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">Message:</Typography>
                                    <Typography variant="body2" fontWeight={400} fontFamily="inter">{selectedContactRequest?.visitorMessage}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">Email:</Typography>
                                    <Typography variant="body2" fontWeight={400} fontFamily="inter">{selectedContactRequest?.visitorEmail}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">Phone:</Typography>
                                    <Typography variant="body2" fontWeight={400} fontFamily="inter">{selectedContactRequest?.visitorPhone}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">Reply to request:</Typography>
                                    <TextField
                                        id="contactme_request_reply_field"
                                        variant="standard"
                                        type="text"
                                        multiline
                                        fullWidth
                                        value={selectedContactRequest.userReplyMessage}
                                        onChange={(event) => setSelectedContactRequest({ ...selectedContactRequest, userReplyMessage: event.target.value })}
                                    />
                                </Grid>
                            </>
                            :
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} fontFamily="inter">Are you sure you want to delete "{selectedContactRequest?.visitorName}'s" contact request?</Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color={(dialogType === "view") ? "error" : "success"} onClick={() => handleContactDialogClose()}>Close</Button>
                        </Grid>
                        {(dialogType === "view") ?
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handleReplyContactFormSubmit()}>Send Reply</Button>
                            </Grid>
                            :
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleDeleteContactFormSubmit()}>Delete Request</Button>
                            </Grid>
                        }
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ContactMeCard