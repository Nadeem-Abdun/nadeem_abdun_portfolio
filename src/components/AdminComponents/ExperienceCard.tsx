import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add, DeleteForeverOutlined } from "@mui/icons-material";
import { createExperienceFormFailure, createExperienceFormSuccess, deleteExperienceFormFailure, deleteExperienceFormSuccess, Experience, ExperienceState, getExperienceFormFailure, getExperienceFormSuccess, resetCreateExperienceForm, resetDeleteExperienceForm, resetGetExperienceForm, resetUpdateExperienceForm, submitCreateExperienceForm, submitDeleteExperienceForm, submitGetExperienceForm, submitUpdateExperienceForm, updateExperienceFormFailure, updateExperienceFormSuccess } from "../../redux/experience/experienceSlice";
import { formatToLocaleString, formatToStringYYYYMMDD } from "../../utils/DateFormatter";
import "../../styles/componentStyles.css";
import { DeleteExperienceData, GetExperienceAllData, PostCreateExperience, PutUpdateExperience } from "../../services/ServiceControllers";
import { useDispatch } from "react-redux";

interface Props extends ExperienceState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const ExperienceCard: React.FC<Props> = (props) => {
    const { profile, experiences, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State Management
    const [selectedExperience, setSelectedExperience] = useState<Experience>({
        _id: "",
        joiningDate: "",
        relievingDate: "",
        jobTitle: "",
        organizationName: "",
        responsibilities: [],
        skillsInvolved: [],
    });
    const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");

    // Api Calls
    const createExperienceApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const formData = {
                profileId: profileId,
                joiningDate: selectedExperience.joiningDate,
                relievingDate: selectedExperience.relievingDate,
                jobTitle: selectedExperience.jobTitle,
                organizationName: selectedExperience.organizationName,
                responsibilities: selectedExperience.responsibilities,
                skillsInvolved: selectedExperience.skillsInvolved,
            }
            const response = await PostCreateExperience(formData, profileId);
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
    const getAllExperiencesApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetExperienceAllData(profileId);
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
    const updateExperienceApiCall = async () => {
        try {
            const experienceId = selectedExperience._id || "";
            const formData = {
                joiningDate: selectedExperience.joiningDate,
                relievingDate: selectedExperience.relievingDate,
                jobTitle: selectedExperience.jobTitle,
                organizationName: selectedExperience.organizationName,
                responsibilities: selectedExperience.responsibilities,
                skillsInvolved: selectedExperience.skillsInvolved,
            }
            const response = await PutUpdateExperience(formData, experienceId);
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
    const deleteExperienceApiCall = async () => {
        try {
            const experienceId = selectedExperience._id || "";
            const response = await DeleteExperienceData(experienceId);
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

    // Experience Submit Functions
    const handlePostCreateExperience = async () => {
        dispatch(submitCreateExperienceForm());
        const response = await createExperienceApiCall();
        if (response.success) {
            const experienceData = response?.data;
            dispatch(createExperienceFormSuccess(experienceData));
            dispatch(resetCreateExperienceForm());
            handleExperienceDialogClose();
        } else {
            dispatch(createExperienceFormFailure());
        }
    };
    const handleGetAllExperiences = async () => {
        dispatch(submitGetExperienceForm());
        const response = await getAllExperiencesApiCall();
        if (response.success) {
            const experienceData = response?.data;
            dispatch(getExperienceFormSuccess(experienceData));
            dispatch(resetGetExperienceForm());
        } else {
            dispatch(getExperienceFormFailure());
        }
    };
    const handlePutUpdateExperience = async () => {
        dispatch(submitUpdateExperienceForm());
        const response = await updateExperienceApiCall();
        if (response.success) {
            const experienceData = response?.data;
            dispatch(updateExperienceFormSuccess(experienceData));
            dispatch(resetUpdateExperienceForm());
            handleExperienceDialogClose();
        } else {
            dispatch(updateExperienceFormFailure());
        }
    };
    const handleDeleteExperience = async () => {
        dispatch(submitDeleteExperienceForm());
        const response = await deleteExperienceApiCall();
        if (response.success) {
            const experienceData = response?.data;
            dispatch(deleteExperienceFormSuccess(experienceData));
            dispatch(resetDeleteExperienceForm());
            handleExperienceDialogClose();
        } else {
            dispatch(deleteExperienceFormFailure());
        }
    };

    // Dialog Functions
    const handleExperienceDialogOpen = (type: string, item?: Experience) => {
        setExperienceDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedExperience(item);
        }
    };
    const handleExperienceDialogClose = () => {
        setExperienceDialogOpen(false);
        setSelectedExperience({
            joiningDate: "",
            relievingDate: "",
            jobTitle: "",
            organizationName: "",
            responsibilities: [],
            skillsInvolved: [],
        })
    };

    // TextFields Functions
    const handleResponsibilitiesChange = (value: string) => {
        const responsibilities = value.split("\n").map(responsibility => responsibility);
        setSelectedExperience({ ...selectedExperience, responsibilities: responsibilities });
    };
    const handleSkillsChange = (value: string) => {
        const skills = value.split("\n").map(skill => skill);
        setSelectedExperience({ ...selectedExperience, skillsInvolved: skills });
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetAllExperiences();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Experience</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    {experiences && experiences.map((item, index) => {
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
                                onClick={() => handleExperienceDialogOpen("edit", item)}
                            >
                                <Grid container item xs={12} justifyContent="space-between" alignItems="flex-start">
                                    <Grid container item xs={10} direction="column">
                                        <Grid item>
                                            <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Job Title:-</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" fontWeight={400} fontFamily='inter'>{item.jobTitle}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleExperienceDialogOpen("delete", item) }}>
                                            <DeleteForeverOutlined className="text-cyan-400 hover:text-cyan-200" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Organization Name:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{item.organizationName}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Job Tenure:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>
                                            {`${formatToLocaleString(item.joiningDate)} - ${item.relievingDate ? formatToLocaleString(item.relievingDate) : "Present"}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                {experiences?.length === 0 &&
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily="inter" className="text-center">There are no experiences to display.</Typography>
                    </Grid>
                }
                <Grid item>
                    <IconButton sx={{ "&:hover": { backgroundColor: "#0F172A", } }} onClick={() => handleExperienceDialogOpen("add")}>
                        <Add className="text-cyan-300" />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog open={experienceDialogOpen} onClose={() => handleExperienceDialogClose()} fullWidth disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">
                        {(dialogType === "add") ? "Add Experience" : (dialogType === "edit") ? "Edit Experience" : "Delete Experience"}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="flex-start" alignItems="center" rowGap={2} className="mt-2">
                        {(dialogType === "add") || (dialogType === "edit") ?
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        id="experience_title_field"
                                        label="Job Title"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedExperience.jobTitle}
                                        onChange={(event) => setSelectedExperience({ ...selectedExperience, jobTitle: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="experience_organizationname_field"
                                        label="Organization Name"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedExperience.organizationName}
                                        onChange={(event) => setSelectedExperience({ ...selectedExperience, organizationName: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="experience_joiningdate_field"
                                        label="Joining Date"
                                        variant="filled"
                                        type="date"
                                        fullWidth
                                        value={formatToStringYYYYMMDD(selectedExperience.joiningDate)}
                                        onChange={(event) => setSelectedExperience({ ...selectedExperience, joiningDate: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {(selectedExperience.relievingDate) || (dialogType === "add") ?
                                        <TextField
                                            id="experience_relievingdate_field"
                                            label="Relieving Date"
                                            variant="filled"
                                            type="date"
                                            fullWidth
                                            value={formatToStringYYYYMMDD(selectedExperience.relievingDate)}
                                            onChange={(event) => setSelectedExperience({ ...selectedExperience, relievingDate: event.target.value })}
                                        />
                                        :
                                        <div className="text-center">
                                            <Typography variant="body1" fontWeight={400} fontFamily="inter">-- Till Date --</Typography>
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="experience_responsibilities_field"
                                        label="Responsibilities"
                                        placeholder="Enter responsibilities, one per line"
                                        variant="filled"
                                        type="text"
                                        multiline
                                        minRows={3}
                                        fullWidth
                                        value={selectedExperience?.responsibilities?.join("\n")}
                                        onChange={(event) => handleResponsibilitiesChange(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="experience_skills_field"
                                        label="Skills Involved"
                                        placeholder="Enter skills, one per line"
                                        variant="filled"
                                        type="text"
                                        multiline
                                        minRows={3}
                                        maxRows={10}
                                        fullWidth
                                        value={selectedExperience?.skillsInvolved?.join("\n")}
                                        onChange={(event) => handleSkillsChange(event.target.value)}
                                    />
                                </Grid>
                            </>
                            :
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} fontFamily="inter">Are you sure you want to delete this "{selectedExperience?.jobTitle}" experience?</Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color={(dialogType === "add") || (dialogType === "edit") ? "error" : "success"} onClick={() => handleExperienceDialogClose()}>Close</Button>
                        </Grid>
                        {dialogType === "add" &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePostCreateExperience()}>Add Experience</Button>
                            </Grid>
                        }
                        {dialogType === "edit" &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePutUpdateExperience()}>Update Experience</Button>
                            </Grid>
                        }
                        {dialogType === "delete" &&
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleDeleteExperience()}>Delete Experience</Button>
                            </Grid>
                        }
                    </Grid>
                </DialogActions>
            </Dialog >
        </div >
    )
}

export default ExperienceCard
