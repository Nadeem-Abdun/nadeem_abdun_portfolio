import React, { useState } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add, DeleteForeverOutlined } from "@mui/icons-material";
import { Project, ProjectState } from "../../redux/project/projectSlice";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";
import FileUploader from "../FileUploader";

const ProjectCard: React.FC<ProjectState> = (props) => {
    const { projects } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const [selectedProject, setSelectedProject] = useState<Project>({
        image: "",
        title: "",
        description: "",
        skillsInvolved: [],
        websiteUrl: "",
        repositoryUrl: "",
    });
    const [projectDialogOpen, setProjectDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");
    const handleProjectDialogOpen = (type: string, item?: Project) => {
        setProjectDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedProject(item);
        }
    }
    const handleProjectDialogClose = () => {
        setProjectDialogOpen(false);
        setSelectedProject({
            image: "",
            title: "",
            description: "",
            skillsInvolved: [],
            websiteUrl: "",
            repositoryUrl: "",
        });
    }

    const handleSkillsChange = (value: string) => {
        const skills = value.split("\n").map(skill => skill.trim());
        setSelectedProject({ ...selectedProject, skillsInvolved: skills });
    }

    const handleFileSelect = (file: File) => {
        setSelectedProject({ ...selectedProject, image: URL.createObjectURL(file) });
    };

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
                        {/* {(dialogType === "add") ? "Add" : "Edit"} Project */}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2} className="mt-2">
                        {(dialogType === "add") || (dialogType === "edit") ?
                            <>
                                <Grid item>
                                    {
                                        selectedProject.image ?
                                            <img
                                                src={selectedProject.image}
                                                alt='Project_Picture'
                                                style={{
                                                    width: isXs ? '45vw' : isSm ? '35vw' : '14vw',
                                                    height: isXs ? '45vw' : isSm ? '35vw' : '14vw',
                                                    borderRadius: '10%',
                                                }}
                                            />
                                            :
                                            <FileUploader onFileSelect={handleFileSelect} />
                                    }
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
                        {(dialogType === "add") || (dialogType === "edit") ?
                            <Grid item>
                                <Button variant="contained" color="success" onClick={() => handleProjectDialogClose()}>{(dialogType === "add") ? "Add" : "Update"} Project</Button>
                            </Grid>
                            :
                            <Grid item>
                                <Button variant="contained" color="error" onClick={() => handleProjectDialogClose()}>Delete Project</Button>
                            </Grid>
                        }
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProjectCard