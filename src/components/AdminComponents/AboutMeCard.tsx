import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { ProfileState } from "../../redux/profile/profileSlice";
import { submitGetProfileForm, getProfileSuccess, getProfileFailure, resetGetProfileForm } from "../../redux/profile/profileSlice";
import { useDispatch } from "react-redux";
import { PostCreateProfile, GetProfileData, PutUpdateProfile, DeleteProfileData } from "../../services/ServiceControllers";
import { useBreakpoints } from "../../utils/Breakpoints";
import ellipsisString from "../../utils/EllipsisString";
import FileUploader from "../FileUploader";
import "../../styles/componentStyles.css";

interface Props extends ProfileState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const AboutMeCard: React.FC<Props> = (props) => {
    const { profile, _id, fullName, professionalRoles, introducingLine, profilePicture, primaryDescription, secondaryDescription, githubUrl, linkedInUrl, discordUrl, twitterUrl, mailToId, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State Management
    const [selectedAboutMe, setSelectedAboutMe] = useState<ProfileState>({
        _id: "",
        fullName: "",
        professionalRoles: [],
        introducingLine: "",
        profilePicture: "",
        primaryDescription: "",
        secondaryDescription: "",
        githubUrl: "",
        linkedInUrl: "",
        discordUrl: "",
        twitterUrl: "",
        mailToId: "",
    });
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

    // API Calls
    const getProfileApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetProfileData(profileId);
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
    const addProfileApiCall = async () => {
        try {
            const formData = new FormData();
            if (selectedAboutMe.fullName) formData.append('fullName', selectedAboutMe.fullName);
            if (selectedAboutMe.professionalRoles && selectedAboutMe.professionalRoles.length > 0) formData.append('professionalRoles', JSON.stringify(selectedAboutMe.professionalRoles));
            if (selectedAboutMe.introducingLine) formData.append('introducingLine', selectedAboutMe.introducingLine);
            if (profilePictureFile) formData.append('profilePicture', profilePictureFile);
            if (selectedAboutMe.primaryDescription) formData.append('primaryDescription', selectedAboutMe.primaryDescription);
            if (selectedAboutMe.secondaryDescription) formData.append('secondaryDescription', selectedAboutMe.secondaryDescription);
            if (selectedAboutMe.githubUrl) formData.append('githubUrl', selectedAboutMe.githubUrl);
            if (selectedAboutMe.linkedInUrl) formData.append('linkedInUrl', selectedAboutMe.linkedInUrl);
            if (selectedAboutMe.discordUrl) formData.append('discordUrl', selectedAboutMe.discordUrl);
            if (selectedAboutMe.twitterUrl) formData.append('twitterUrl', selectedAboutMe.twitterUrl);
            if (selectedAboutMe.mailToId) formData.append('mailToId', selectedAboutMe.mailToId);
            const response = await PostCreateProfile(formData);
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
    const updateProfileApiCall = async () => {
        try {
            const formData = new FormData();
            if (selectedAboutMe.fullName) formData.append('fullName', selectedAboutMe.fullName);
            if (selectedAboutMe.professionalRoles && selectedAboutMe.professionalRoles.length > 0) formData.append('professionalRoles', JSON.stringify(selectedAboutMe.professionalRoles));
            if (selectedAboutMe.introducingLine) formData.append('introducingLine', selectedAboutMe.introducingLine);
            if (profilePictureFile) formData.append('profilePicture', profilePictureFile);
            if (selectedAboutMe.primaryDescription) formData.append('primaryDescription', selectedAboutMe.primaryDescription);
            if (selectedAboutMe.secondaryDescription) formData.append('secondaryDescription', selectedAboutMe.secondaryDescription);
            if (selectedAboutMe.githubUrl) formData.append('githubUrl', selectedAboutMe.githubUrl);
            if (selectedAboutMe.linkedInUrl) formData.append('linkedInUrl', selectedAboutMe.linkedInUrl);
            if (selectedAboutMe.discordUrl) formData.append('discordUrl', selectedAboutMe.discordUrl);
            if (selectedAboutMe.twitterUrl) formData.append('twitterUrl', selectedAboutMe.twitterUrl);
            if (selectedAboutMe.mailToId) formData.append('mailToId', selectedAboutMe.mailToId);
            const response = await PutUpdateProfile(formData, '1'); // Check params id
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
    const deleteProfileApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await DeleteProfileData(profileId);
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

    // Add Edit Profile Submit
    const handleGetProfileSubmit = async () => {
        dispatch(submitGetProfileForm());
        const response = await getProfileApiCall();
        if (response.success) {
            const userData = response?.data;
            dispatch(getProfileSuccess(userData));
            dispatch(resetGetProfileForm());
        } else {
            dispatch(getProfileFailure());
        }
    };
    const handleAddProfileSubmit = async () => {
        // dispatch(submitLoginForm());
        const response = await addProfileApiCall();
        if (response.success) {
            const userData = response?.data;
            // dispatch(loginFormSuccess(userData));
            // dispatch(resetLoginForm());
            handleAboutMeDialogClose();
        } else {
            // dispatch(loginFormFailure());
        }
    };
    const handleEditProfileSubmit = async () => {
        // dispatch(submitLoginForm());
        const response = await updateProfileApiCall();
        if (response.success) {
            const userData = response?.data;
            // dispatch(loginFormSuccess(userData));
            // dispatch(resetLoginForm());
            handleAboutMeDialogClose();
        } else {
            // dispatch(loginFormFailure());
        }
    };

    // Profile Picture File Upload
    const handleFileSelect = (file: File) => {
        setSelectedAboutMe({ ...selectedAboutMe, profilePicture: URL.createObjectURL(file) });
        setProfilePictureFile(file);
    };

    // Text Field OnChange Function
    const handleRolesOnChange = (value: string) => {
        const roles = value.split("\n").map(role => role);
        setSelectedAboutMe({ ...selectedAboutMe, professionalRoles: roles });
    };

    // Dialog Functions
    const [aboutMeDialog, setAboutMeDialog] = useState(false);
    const [aboutMeDialogType, setAboutMeDialogType] = useState('');
    const handleAboutMeDialogOpen = (type: string) => {
        if (type === "edit") {
            setSelectedAboutMe({
                _id: _id,
                fullName: fullName,
                professionalRoles: professionalRoles,
                introducingLine: introducingLine,
                profilePicture: profilePicture,
                primaryDescription: primaryDescription,
                secondaryDescription: secondaryDescription,
                githubUrl: githubUrl,
                linkedInUrl: linkedInUrl,
                discordUrl: discordUrl,
                twitterUrl: twitterUrl,
                mailToId: mailToId,
            });
        };
        setAboutMeDialog(true);
        setAboutMeDialogType(type);
    };
    const handleAboutMeDialogClose = () => {
        setAboutMeDialog(false);
        setSelectedAboutMe({
            _id: "",
            fullName: "",
            professionalRoles: [],
            introducingLine: "",
            profilePicture: "",
            primaryDescription: "",
            secondaryDescription: "",
            githubUrl: "",
            linkedInUrl: "",
            discordUrl: "",
            twitterUrl: "",
            mailToId: "",
        });
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetProfileSubmit();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? 'px-2' : 'px-4'} ${(isXs) ? 'py-2' : 'py-4'} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid container xs={12} justifyContent="space-between" alignItems="center" wrap="nowrap">
                    <Grid item xs={5}>
                        <Typography variant="h5" fontWeight={500} fontFamily='inter'>About Me</Typography>
                    </Grid>
                    <Grid container item xs={5} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        {profile?.length === 0 ?
                            <Grid item>
                                <IconButton onClick={() => handleAboutMeDialogOpen('add')}><Add className="text-cyan-400" /></IconButton>
                            </Grid>
                            :
                            <Grid item>
                                <IconButton onClick={() => handleAboutMeDialogOpen('edit')}><Edit className="text-cyan-400" /></IconButton>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    <img
                        src={profilePicture}
                        alt='Profile_Picture'
                        style={{
                            width: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                            height: isXs ? '35vw' : isSm ? '25vw' : '15vw',
                            borderRadius: '20%',
                        }}
                    />
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Profile Id:-</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            {_id}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Full Name:-</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            {fullName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Introducing Line:-</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            {ellipsisString(introducingLine, 150)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Professional Roles:-</Typography>
                    </Grid>
                    <Grid item>
                        {professionalRoles && professionalRoles.map((item, index) => {
                            return (
                                <li style={{ fontSize: "14px", fontFamily: "inter" }}>{item}</li>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Profile Description:-</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            {ellipsisString(primaryDescription, 150)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                            {ellipsisString(secondaryDescription, 150)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} flexDirection="column">
                    <Grid item>
                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Connecting Links:-</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(githubUrl, 40)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(linkedInUrl, 40)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(discordUrl, 40)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(twitterUrl, 40)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(mailToId, 40)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={aboutMeDialog} onClose={() => handleAboutMeDialogClose()} disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily='inter'>
                        {aboutMeDialogType === 'add' ? 'Add' : 'Update'} Profile Info
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2}>
                        <Grid item>
                            <FileUploader
                                onFileSelect={handleFileSelect}
                                existingFileUrl={selectedAboutMe.profilePicture}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_name_field"
                                label="Full Name"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.fullName}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, fullName: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_intro_field"
                                label="Introducing Line"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.introducingLine}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, introducingLine: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_roles_field"
                                label="Professional Roles"
                                placeholder="Enter roles, one per line"
                                variant="filled"
                                type="text"
                                multiline
                                maxRows={3}
                                fullWidth
                                value={selectedAboutMe.professionalRoles?.join("\n")}
                                onChange={(event) => handleRolesOnChange(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_primary_description_field"
                                label="Primary Description"
                                variant="filled"
                                type="text"
                                multiline
                                maxRows={4}
                                fullWidth
                                value={selectedAboutMe.primaryDescription}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, primaryDescription: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_secondary_description_field"
                                label="Secondary Description"
                                variant="filled"
                                type="text"
                                multiline
                                maxRows={4}
                                fullWidth
                                value={selectedAboutMe.secondaryDescription}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, secondaryDescription: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_github_url_field"
                                label="Github Profile URL"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.githubUrl}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, githubUrl: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_linkedIn_url_field"
                                label="LinkedIn Profile URL"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.linkedInUrl}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, linkedInUrl: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_discord_url_field"
                                label="Discord Profile URL"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.discordUrl}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, discordUrl: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_twitterX_url_field"
                                label="TwitterX Profile URL"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.twitterUrl}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, twitterUrl: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="aboutMe_mail_id_field"
                                label="Email Id"
                                variant="filled"
                                type="text"
                                fullWidth
                                value={selectedAboutMe.mailToId}
                                onChange={(event) => setSelectedAboutMe({ ...selectedAboutMe, mailToId: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={() => handleAboutMeDialogClose()}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            {aboutMeDialogType === 'add' ?
                                <Button variant="contained" color="success" onClick={() => handleAddProfileSubmit()}>Add</Button>
                                :
                                <Button variant="contained" color="success" onClick={() => handleEditProfileSubmit()}>Update</Button>
                            }
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AboutMeCard