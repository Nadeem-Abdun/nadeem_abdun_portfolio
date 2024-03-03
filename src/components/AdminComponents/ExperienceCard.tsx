import React, { useState } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add } from "@mui/icons-material";
import "../../styles/componentStyles.css";

const ExperienceCard = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const experienceList = [
        {
            jobTenure: 'Feb 2023 - Present',
            jobTitle: 'React Frontend Developer',
            jobCompany: 'Bluepal Solution Pvt. Ltd.',
            jobDescription: [
                'Representing Bluepal Solution Pvt Ltd in delivering high-quality solutions and services on behalf of JPMorgan Chase Bank.',
                'Currently working on a Property Management Application for JPMorgan Chase Bank in the Asia region as a dedicated consultant.',
                'Crafting and maintaining a robust React application, contributing to its stability and functionality.',
                'Implementing an intuitive and responsive user interface using Material UI to enhance the user experience.',
                'Creating Proof of Concepts (POCs) for UI enhancements in new applications to be deployed for JPMorgan Chase Bank.',
                'Specializing in Material UI, React, TypeScript, and Jest RTL for comprehensive and effective development.',
                "Ensuring the application's responsiveness and addressing ADA and NVDA issues to enhance accessibility.",
            ],
            jobTechStack: [
                'Html',
                'CSS',
                'JavaScript',
                'TypeScript',
                'React',
                'Material UI',
                'React Testing Library',
                'Jest',
            ],
        }
    ]

    const [addExperienceDialog, setAddExperienceDialog] = useState(false);

    const handleAddExpDialog = () => {
        setAddExperienceDialog(!addExperienceDialog);
    }

    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-80`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Experience</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    <Grid item xs={12}>
                        {experienceList && experienceList.map((exp, index) => {
                            return (
                                <Grid key={index} container xs={12} className="experience-card py-2 px-3" justifyContent="flex-start" alignItems="center">
                                    <Grid item xs={12}>
                                        <Typography variant="body1" fontWeight={500} fontFamily="inter">{exp.jobTitle}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" fontWeight={400} fontFamily="inter">{exp.jobCompany}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" fontWeight={400} fontFamily="inter">{exp.jobTenure}</Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>

            <IconButton sx={{ position: "absolute", bottom: "8px", right: "8px", "&:hover": { backgroundColor: "#0F172A", } }} onClick={() => handleAddExpDialog()}>
                <Add className="text-cyan-300" />
            </IconButton>

            <Dialog open={addExperienceDialog} onClose={() => handleAddExpDialog()} disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">Add Experience</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="flex-start" alignItems="center" rowGap={2} className="mt-2">
                        <Grid item xs={12}>
                            <TextField
                                id="AboutMe-Description-Field-1"
                                label="Description 1"
                                variant="filled"
                                type="text"
                                multiline
                                fullWidth
                            // value={profileDesc.desc1}
                            // onChange={(event) => handleProfileDescChange("desc1", event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="AboutMe-Description-Field-2"
                                label="Description 2"
                                variant="filled"
                                type="text"
                                multiline
                                fullWidth
                            // value={profileDesc.desc2}
                            // onChange={(event) => handleProfileDescChange("desc2", event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={() => handleAddExpDialog()}>Close</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" onClick={() => handleAddExpDialog()}>Update</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ExperienceCard