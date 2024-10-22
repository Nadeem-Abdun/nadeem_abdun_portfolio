import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Switch } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add, DeleteForeverOutlined } from "@mui/icons-material";
import { Resume, ResumeState, deleteResumeFormFailure, deleteResumeFormSuccess, getAllResumesFormFailure, getAllResumesFormSuccess, resetDeleteResumeForm, resetGetAllResumesForm, resetUpdateResumeForm, resetUploadResumeForm, submitDeleteResumeForm, submitGetAllResumesForm, submitUpdateResumeForm, submitUploadResumeForm, updateResumeFormFailure, updateResumeFormSuccess, uploadResumeFormFailure, uploadResumeFormSuccess } from "../../redux/resume/resumeSlice";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";
import FileUploader from "../FileUploader";
import { DeleteResumeData, GetAllResumesData, PatchUpdateResumeStatus, PostUploadResume } from "../../services/ServiceControllers";
import { useDispatch } from "react-redux";

interface Props extends ResumeState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const ResumeCard: React.FC<Props> = (props) => {
    const { profile, resumes, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State
    const [selectedResume, setSelectedResume] = useState<Resume>({
        _id: "",
        resumeURL: "",
        resumeStatus: "InActive",
    });
    const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
    const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");

    // Api Calls
    const getAllResumesDataApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetAllResumesData(profileId);
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
    const postUploadResumeApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const formData = new FormData();
            if (selectedResumeFile) formData.append("resume", selectedResumeFile);
            if (selectedResume.resumeStatus) formData.append("resumeStatus", selectedResume.resumeStatus);
            const response = await PostUploadResume(formData, profileId);
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
    const patchUpdateResumeStatusApiCall = async () => {
        try {
            const resumeId = selectedResume._id || "";
            const formData = {
                resumeStatus: selectedResume.resumeStatus,
            };
            const response = await PatchUpdateResumeStatus(formData, resumeId);
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
    const deleteResumeDataApiCall = async () => {
        try {
            const resumeId = selectedResume._id || "";
            const response = await DeleteResumeData(resumeId);
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

    // Dialog Functions
    const handleResumeDialogOpen = (type: string, item?: Resume) => {
        setResumeDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedResume(item);
        }
    };
    const handleResumeDialogClose = () => {
        setResumeDialogOpen(false);
        setSelectedResume({
            _id: "",
            resumeURL: "",
            resumeStatus: "",
        });
    };

    // OnChange Functions
    const handleResumeStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedResume({ ...selectedResume, resumeStatus: "Active" });
        } else {
            setSelectedResume({ ...selectedResume, resumeStatus: "InActive" });
        }
    };

    // Event Handling Functions
    const handleFileSelect = (file: File) => {
        setSelectedResume({ ...selectedResume, resumeURL: URL.createObjectURL(file) });
        setSelectedResumeFile(file);
        console.log(file, "abc")
    };

    // Submit Functions
    const handleGetAllResumesDataSubmit = async () => {
        dispatch(submitGetAllResumesForm());
        const response = await getAllResumesDataApiCall();
        if (response.success === true) {
            const resumeData = response?.data;
            dispatch(getAllResumesFormSuccess(resumeData));
            dispatch(resetGetAllResumesForm());
        } else {
            dispatch(getAllResumesFormFailure());
        }
    };
    const handlePostUploadResumeSubmit = async () => {
        dispatch(submitUploadResumeForm());
        const response = await postUploadResumeApiCall();
        if (response.success === true) {
            const resumeData = response?.data;
            dispatch(uploadResumeFormSuccess(resumeData));
            dispatch(resetUploadResumeForm());
        } else {
            dispatch(uploadResumeFormFailure());
        }
    };
    const handlePutUpdateResumeSubmit = async () => {
        dispatch(submitUpdateResumeForm());
        const response = await patchUpdateResumeStatusApiCall();
        if (response.success === true) {
            const resumeData = response?.data;
            dispatch(updateResumeFormSuccess(resumeData));
            dispatch(resetUpdateResumeForm());
        } else {
            dispatch(updateResumeFormFailure());
        }
    };
    const handleDeleteResumeDataSubmit = async () => {
        dispatch(submitDeleteResumeForm());
        const response = await deleteResumeDataApiCall();
        if (response.success === true) {
            const resumeData = response?.data;
            dispatch(deleteResumeFormSuccess(resumeData));
            dispatch(resetDeleteResumeForm());
        } else {
            dispatch(deleteResumeFormFailure());
        }
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetAllResumesDataSubmit();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Resume</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    {resumes && resumes.map((item, index) => {
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
                                onClick={() => handleResumeDialogOpen("edit", item)}
                            >
                                <Grid container item xs={12} justifyContent="space-between" alignItems="flex-start">
                                    <Grid container item xs={10} direction="column">
                                        <Grid item>
                                            <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Resume Id:-</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item._id, 25)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleResumeDialogOpen("delete", item) }}>
                                            <DeleteForeverOutlined className="text-cyan-400 hover:text-cyan-200" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <iframe
                                        src={item.resumeURL}
                                        frameBorder="0"
                                        scrolling="auto"
                                        height="250px"
                                        width="100%"
                                    />
                                    <img
                                        src={item.resumeURL}
                                    />
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Resume Status:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{item.resumeStatus}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                {resumes?.length === 0 &&
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily="inter" className="text-center">There are no resume to display.</Typography>
                    </Grid>
                }
                <Grid item>
                    <IconButton sx={{ "&:hover": { backgroundColor: "#0F172A", } }} onClick={() => handleResumeDialogOpen("add")}>
                        <Add className="text-cyan-300" />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog open={resumeDialogOpen} onClose={() => handleResumeDialogClose()} fullWidth disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">
                        {(dialogType === "add") ? "Add" : (dialogType === "edit") ? "Edit" : "Delete"} Resume
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2} className="mt-2">
                        {(dialogType === "add") || (dialogType === "edit") ?
                            <>
                                <Grid item>
                                    <FileUploader
                                        onFileSelect={handleFileSelect}
                                        existingFileUrl={selectedResume.resumeURL}
                                    />
                                </Grid>
                                <Grid container item justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant="body1" fontWeight={500} fontFamily="inter">Resume Status - {selectedResume.resumeStatus}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Switch onChange={(e) => handleResumeStatusChange(e)} checked={selectedResume.resumeStatus === "Active"} />
                                    </Grid>
                                </Grid>
                            </>
                            :
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} fontFamily="inter">Are you sure you want to delete this "{selectedResume?._id}" resume?</Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color={(dialogType === "add") || (dialogType === "edit") ? "error" : "success"} onClick={() => handleResumeDialogClose()}>Close</Button>
                        </Grid>
                        {(dialogType === "add") &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePostUploadResumeSubmit()}>Add Resume</Button>
                            </Grid>
                        }
                        {(dialogType === "edit") &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePutUpdateResumeSubmit()}>Update Resume</Button>
                            </Grid>
                        }
                        {(dialogType === "delete") &&
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleDeleteResumeDataSubmit()}>Delete Resume</Button>
                            </Grid>
                        }
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ResumeCard
