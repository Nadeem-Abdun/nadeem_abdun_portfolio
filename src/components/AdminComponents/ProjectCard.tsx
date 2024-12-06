import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add, DeleteForeverOutlined } from "@mui/icons-material";
import { Project, ProjectState, submitCreateProjectForm, createProjectFormSuccess, createProjectFormFailure, resetCreateProjectForm, submitGetProjectForm, getProjectFormSuccess, getProjectFormFailure, resetGetProjectForm, submitUpdateProjectForm, updateProjectFormSuccess, updateProjectFormFailure, resetUpdateProjectForm, submitDeleteProjectForm, deleteProjectFormSuccess, deleteProjectFormFailure, resetDeleteProjectForm } from "../../redux/project/projectSlice";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";
import FileUploader from "../FileUploader";
import { DeleteProjectData, GetAllProjectsData, PostCreateProject, PutUpdateProject } from "../../services/ServiceControllers";
import { useDispatch } from "react-redux";

interface Props extends ProjectState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const ProjectCard: React.FC<Props> = (props) => {
    const { profile, projects, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State Management
    const [selectedProject, setSelectedProject] = useState<Project>({
        _id: "",
        projectPicture: "",
        title: "",
        description: "",
        skillsInvolved: [],
        websiteUrl: "",
        repositoryUrl: "",
    });
    const [projectPictureFile, setProjectPictureFile] = useState<File | null>(null);
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");

    // API Calls
    const getAllProjectsApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetAllProjectsData(profileId);
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
    const postCreateProjectApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const formData = new FormData();
            if (projectPictureFile) formData.append("projectPicture", projectPictureFile);
            if (selectedProject.title) formData.append("title", selectedProject.title);
            if (selectedProject.description) formData.append("description", selectedProject.description);
            if (selectedProject.skillsInvolved) formData.append("skillsInvolved", JSON.stringify(selectedProject.skillsInvolved));
            if (selectedProject.websiteUrl) formData.append("websiteUrl", selectedProject.websiteUrl);
            if (selectedProject.repositoryUrl) formData.append("repositoryUrl", selectedProject.repositoryUrl);
            const response = await PostCreateProject(formData, profileId);
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
    const putUpdateProjectApiCall = async () => {
        try {
            const projectId = selectedProject._id || "";
            const formData = new FormData();
            if (projectPictureFile) formData.append("projectPicture", projectPictureFile);
            if (selectedProject.title) formData.append("title", selectedProject.title);
            if (selectedProject.description) formData.append("description", selectedProject.description);
            if (selectedProject.skillsInvolved) formData.append("skillsInvolved", JSON.stringify(selectedProject.skillsInvolved));
            if (selectedProject.websiteUrl) formData.append("websiteUrl", selectedProject.websiteUrl);
            if (selectedProject.repositoryUrl) formData.append("repositoryUrl", selectedProject.repositoryUrl);
            const response = await PutUpdateProject(formData, projectId);
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
    const deleteProjectDataApiCall = async () => {
        try {
            const projectId = selectedProject._id || "";
            const response = await DeleteProjectData(projectId);
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

    // Project Submit Functions
    const handleGetAllProjectsSubmit = async () => {
        dispatch(submitGetProjectForm());
        const response = await getAllProjectsApiCall();
        if (response.success === true) {
            const projectsData = response?.data;
            dispatch(getProjectFormSuccess(projectsData));
            dispatch(resetGetProjectForm());
        } else {
            dispatch(getProjectFormFailure());
        }
    };
    const handlePostCreateProjectSubmit = async () => {
        dispatch(submitCreateProjectForm());
        const response = await postCreateProjectApiCall();
        if (response.success === true) {
            const projectsData = response?.data;
            dispatch(createProjectFormSuccess(projectsData));
            dispatch(resetCreateProjectForm());
            handleProjectDialogClose();
        } else {
            dispatch(createProjectFormFailure());
        }
    };
    const handlePutUpdateProjectSubmit = async () => {
        dispatch(submitUpdateProjectForm());
        const response = await putUpdateProjectApiCall();
        if (response.success === true) {
            const projectsData = response?.data;
            dispatch(updateProjectFormSuccess(projectsData));
            dispatch(resetUpdateProjectForm());
            handleProjectDialogClose();
        } else {
            dispatch(updateProjectFormFailure());
        }
    };
    const handleDeleteProjectDataSubmit = async () => {
        dispatch(submitDeleteProjectForm());
        const response = await deleteProjectDataApiCall();
        if (response.success === true) {
            const projectsData = response?.data;
            dispatch(deleteProjectFormSuccess(projectsData));
            dispatch(resetDeleteProjectForm());
            handleProjectDialogClose();
        } else {
            dispatch(deleteProjectFormFailure());
        }
    };

    // Dialog Functions
    const handleProjectDialogOpen = (type: string, item?: Project) => {
        setProjectDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedProject(item);
        }
    };
    const handleProjectDialogClose = () => {
        setProjectDialogOpen(false);
        setSelectedProject({
            projectPicture: "",
            title: "",
            description: "",
            skillsInvolved: [],
            websiteUrl: "",
            repositoryUrl: "",
        });
    };

    // Event Handling Functions
    const handleSkillsChange = (value: string) => {
        const skills = value.split("\n").map(skill => skill.trim());
        setSelectedProject({ ...selectedProject, skillsInvolved: skills });
    };
    const handleFileSelect = (file: File) => {
        setSelectedProject({ ...selectedProject, projectPicture: URL.createObjectURL(file) });
        setProjectPictureFile(file);
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetAllProjectsSubmit();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Projects</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    {projects && projects.map((item, index) => {
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
                                onClick={() => handleProjectDialogOpen("edit", item)}
                            >
                                <Grid container item xs={12} justifyContent="space-between" alignItems="flex-start">
                                    <Grid container item xs={10} direction="column">
                                        <Grid item>
                                            <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Project Title:-</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.title, 25)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={(e) => { e.stopPropagation(); handleProjectDialogOpen("delete", item) }}>
                                            <DeleteForeverOutlined className="text-cyan-400 hover:text-cyan-200" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} direction="column">
                                    <Grid item>
                                        <Typography className="text-cyan-400" variant="body1" fontWeight={500} fontFamily='inter'>Project Description:-</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" fontWeight={400} fontFamily='inter'>{ellipsisString(item.description, 85)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                {projects?.length === 0 &&
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily="inter" className="text-center">There are no projects to display.</Typography>
                    </Grid>
                }
                <Grid item>
                    <IconButton sx={{ "&:hover": { backgroundColor: "#0F172A", } }} onClick={() => handleProjectDialogOpen("add")}>
                        <Add className="text-cyan-300" />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog open={projectDialogOpen} onClose={() => handleProjectDialogClose()} fullWidth disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">
                        {(dialogType === "add") ? "Add" : (dialogType === "edit") ? "Edit" : "Delete"} Project
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2} className="mt-2">
                        {(dialogType === "add") || (dialogType === "edit") ?
                            <>
                                <Grid item>
                                    <FileUploader
                                        onFileSelect={handleFileSelect}
                                        existingFileUrl={selectedProject.projectPicture}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="project_title_field"
                                        label="Project Title"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedProject.title}
                                        onChange={(event) => setSelectedProject({ ...selectedProject, title: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="project_description_field"
                                        label="Project Description"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedProject.description}
                                        onChange={(event) => setSelectedProject({ ...selectedProject, description: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="project_skills_field"
                                        label="Skills Involved"
                                        placeholder="Enter skills, one per line"
                                        variant="filled"
                                        type="text"
                                        multiline
                                        minRows={3}
                                        maxRows={10}
                                        fullWidth
                                        value={selectedProject?.skillsInvolved?.join("\n")}
                                        onChange={(event) => handleSkillsChange(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="project_websiteurl_field"
                                        label="Project Website Url"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedProject.websiteUrl}
                                        onChange={(event) => setSelectedProject({ ...selectedProject, websiteUrl: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="project_repositoryurl_field"
                                        label="Project Repository Url"
                                        variant="filled"
                                        type="text"
                                        fullWidth
                                        value={selectedProject.repositoryUrl}
                                        onChange={(event) => setSelectedProject({ ...selectedProject, repositoryUrl: event.target.value })}
                                    />
                                </Grid>
                            </>
                            :
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} fontFamily="inter">Are you sure you want to delete this "{selectedProject?.title}" project?</Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color={(dialogType === "add") || (dialogType === "edit") ? "error" : "success"} onClick={() => handleProjectDialogClose()}>Close</Button>
                        </Grid>
                        {(dialogType === "add") &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePostCreateProjectSubmit()}>Add Project</Button>
                            </Grid>
                        }
                        {(dialogType === "edit") &&
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handlePutUpdateProjectSubmit()}>Update Project</Button>
                            </Grid>
                        }
                        {(dialogType === "delete") &&
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleDeleteProjectDataSubmit()}>Delete Project</Button>
                            </Grid>
                        }
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProjectCard
