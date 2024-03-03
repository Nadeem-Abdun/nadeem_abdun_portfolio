import React, { useState } from "react";
import { Grid, Typography, Link, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import ProfilePic from "../../assets/images/Profile_Avatar.png";
import "../../styles/componentStyles.css";

const AboutMeCard = () => {

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();

    const [profilePicDialog, setProfilePicDialog] = useState(false);

    const handleProfilePicDialog = () => {
        setProfilePicDialog(!profilePicDialog);
    }

    const [profileDescDialog, setprofileDescDialog] = useState(false);

    const handleProfileDescDialog = () => {
        setprofileDescDialog(!profileDescDialog);
    }

    const [profileDesc, setProfileDesc] = useState({
        desc1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos tempore accusantium itaque culpa nam porro....",
        desc2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos tempore accusantium itaque culpa nam porro...."
    });

    const handleProfileDescChange = (name: string, value: string) => {
        setProfileDesc({
            ...profileDesc, [name]: value
        });
    }

    return (
        <div className={`admin-card ${(isXs) ? 'px-2' : 'px-4'} ${(isXs) ? 'py-2' : 'py-4'} w-full`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily='inter'>About Me</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    <Grid item>
                        <img
                            src={ProfilePic}
                            alt='Profile_Picture'
                            style={{
                                width: isXs ? '45vw' : isSm ? '35vw' : '16vw',
                                height: isXs ? '45vw' : isSm ? '35vw' : '16vw',
                                borderRadius: '20%',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Link variant="caption" color="#00ffff" className="hover:text-pink-300" onClick={() => handleProfilePicDialog()}>
                            Click Here To Update Profile Picture
                        </Link>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" flexDirection="column" rowGap={1}>
                    <Grid item>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>
                            {profileDesc.desc1}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" fontWeight={400} fontFamily='inter'>
                            {profileDesc.desc2}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link variant="caption" color="#00ffff" className="hover:text-pink-300" onClick={() => handleProfileDescDialog()}>
                            Click Here To Update Description
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={profilePicDialog} onClose={() => handleProfilePicDialog()} disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily='inter'>Update Profile Picture</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="center" alignItems="center" rowGap={2}>
                        <Grid item>
                            <img
                                src={ProfilePic}
                                alt='Profile_Picture'
                                style={{
                                    width: isXs ? '75vw' : isSm ? '65vw' : '12vw',
                                    height: isXs ? '75vw' : isSm ? '65vw' : '12vw',
                                    borderRadius: '20%',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="text" fullWidth>
                                Upload Image
                                <input type="file" hidden />
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={() => handleProfilePicDialog()}>Close</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" onClick={() => handleProfilePicDialog()}>Update</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
            <Dialog open={profileDescDialog} onClose={() => handleProfileDescDialog()} disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily='inter'>Update Profile Description</Typography>
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
                                value={profileDesc.desc1}
                                onChange={(event) => handleProfileDescChange("desc1", event.target.value)}
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
                                value={profileDesc.desc2}
                                onChange={(event) => handleProfileDescChange("desc2", event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={() => handleProfileDescDialog()}>Close</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" onClick={() => handleProfileDescDialog()}>Update</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AboutMeCard