import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createSkillFormFailure, createSkillFormSuccess, deleteSkillFormFailure, deleteSkillFormSuccess, getSkillsFormFailure, getSkillsFormSuccess, resetCreateSkillForm, resetDeleteSkillForm, resetGetSkillsForm, resetUpdateSkillForm, submitCreateSkillForm, submitDeleteSkillForm, submitGetSkillsForm, submitUpdateSkillForm, updateSkillFormFailure, updateSkillFormSuccess, WallOfCode, WallOfCodeState } from "../../redux/wallOfCode/wallOfCodeSlice";
import { DeleteSkillData, GetAllSkillsData, PostCreateSkill, PutUpdateSkill } from "../../services/ServiceControllers";
import SvgIconProvider from "../SvgIconProvider";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";

interface Props extends WallOfCodeState {
    profile: string[] | undefined;
    handleAlertSliderOpen: (type: string, message: string) => void
}

const WallOfCodeCard: React.FC<Props> = (props) => {
    const { profile, wallOfCodeList, availableSkillsList, handleAlertSliderOpen } = props;
    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    // Local State Management
    const [selectedSkill, setSelectedSkill] = useState<WallOfCode>({
        _id: "",
        skillName: "",
        skillIcon: "",
    });
    const [skillDialogOpen, setSkillDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("");

    // Api Calls
    const postCreateSkillApiCall = async () => {
        try {
            const formData = {
                skillName: selectedSkill.skillName,
                skillIcon: selectedSkill.skillIcon,
            };
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await PostCreateSkill(formData, profileId);
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
    const getAllSkillsApiCall = async () => {
        try {
            const profileId = (profile && profile.length !== 0) ? profile[0] : '';
            const response = await GetAllSkillsData(profileId);
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
    const putUpdateSkillApiCall = async () => {
        try {
            const formData = {
                skillName: selectedSkill.skillName,
                skillIcon: selectedSkill.skillIcon,
            };
            const skillId = selectedSkill._id || "";
            const response = await PutUpdateSkill(formData, skillId);
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
    const deleteSkillDataApiCall = async () => {
        try {
            const skillId = selectedSkill._id || "";
            const response = await DeleteSkillData(skillId);
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
    const handleCreateSkillSubmit = async () => {
        dispatch(submitCreateSkillForm());
        const response = await postCreateSkillApiCall();
        if (response.success) {
            const skillsData = response?.data;
            dispatch(createSkillFormSuccess(skillsData));
            dispatch(resetCreateSkillForm());
            handleSkillDialogClose();
        } else {
            dispatch(createSkillFormFailure());
        }
    };
    const handleGetSkillsSubmit = async () => {
        dispatch(submitGetSkillsForm());
        const response = await getAllSkillsApiCall();
        if (response.success) {
            const skillsData = response?.data;
            dispatch(getSkillsFormSuccess(skillsData));
            dispatch(resetGetSkillsForm());
        } else {
            dispatch(getSkillsFormFailure());
        }
    };
    const handleUpdateSkillSubmit = async () => {
        dispatch(submitUpdateSkillForm());
        const response = await putUpdateSkillApiCall();
        if (response.success) {
            const skillsData = response?.data;
            dispatch(updateSkillFormSuccess(skillsData));
            dispatch(resetUpdateSkillForm());
        } else {
            dispatch(updateSkillFormFailure());
        }
    };
    const handleDeleteSkillSubmit = async () => {
        dispatch(submitDeleteSkillForm());
        const response = await deleteSkillDataApiCall();
        if (response.success) {
            const skillsData = response?.data;
            dispatch(deleteSkillFormSuccess(skillsData));
            dispatch(resetDeleteSkillForm());
            handleSkillDialogClose();
        } else {
            dispatch(deleteSkillFormFailure());
        }
    };

    // Dropdown OnChange Function
    const addSkillOnChange = (value: string) => {
        availableSkillsList?.find((item) => {
            if (item.skillName === value) {
                setSelectedSkill({
                    _id: item._id,
                    skillName: item.skillName,
                    skillIcon: item.skillIcon,
                });
            }
        });
    };

    // Dialog Functions
    const handleSkillDialogOpen = (type: string, item?: WallOfCode) => {
        setSkillDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedSkill(item);
        }
    };
    const handleSkillDialogClose = () => {
        setSkillDialogOpen(false);
        setSelectedSkill({
            _id: "",
            skillName: "",
            skillIcon: "",
        });
    };

    useEffect(() => {
        if (profile && profile.length !== 0) {
            handleGetSkillsSubmit();
        }
    }, []);
    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Wall Of Code</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" rowGap={2} columnGap={2}>
                    {wallOfCodeList && wallOfCodeList.map((item, index) => {
                        return (
                            <Grid
                                key={index}
                                container
                                item
                                xs={5}
                                className="experience-card py-2 px-3 cursor-pointer"
                                justifyContent="center"
                                alignItems="center"
                                direction="column"
                                onClick={() => handleSkillDialogOpen("delete", item)}
                            >
                                <Grid item>
                                    <SvgIconProvider iconReference={item.skillIcon} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" fontWeight={500} fontFamily="inter">{ellipsisString(item?.skillName, 10)}</Typography>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                {wallOfCodeList?.length === 0 &&
                    <Grid item xs={12}>
                        <Typography variant="body2" fontWeight={400} fontFamily="inter" className="text-center">There are no skills to display.</Typography>
                    </Grid>
                }
                <Grid item>
                    <IconButton sx={{ "&:hover": { backgroundColor: "#0F172A", } }} onClick={() => handleSkillDialogOpen("add")}>
                        <Add className="text-cyan-300" />
                    </IconButton>
                </Grid>
            </Grid>
            <Dialog open={skillDialogOpen} onClose={() => handleSkillDialogClose()} fullWidth disableEscapeKeyDown fullScreen={isXs}>
                <DialogTitle>
                    <Typography variant="h6" fontWeight={500} fontFamily="inter">{dialogType === "add" ? "Add" : "Delete"} Skill</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} justifyContent="flex-start" alignItems="center" rowGap={2} className="mt-2">
                        {dialogType === "add" ?
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="skill_select_label">Skill</InputLabel>
                                    <Select
                                        labelId="skill_select_label"
                                        id="skill_select_label"
                                        placeholder="Select A Skill To Add"
                                        value={selectedSkill.skillName}
                                        label="Skill"
                                        onChange={(event) => addSkillOnChange(event.target.value as string)}
                                    >
                                        {availableSkillsList && availableSkillsList.map((item, index) => {
                                            return <MenuItem key={index} value={item.skillName}>{item.skillName}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={500} fontFamily="inter">Are you sure you want to delete "{selectedSkill?.skillName}" skill?</Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container xs={12} justifyContent="flex-end" alignItems="center" columnGap={1}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={() => handleSkillDialogClose()}>Close</Button>
                        </Grid>
                        <Grid item>
                            {dialogType === "add" ?
                                <Button variant="contained" color="success" onClick={() => handleCreateSkillSubmit()}>
                                    Add
                                </Button>
                                :
                                <Button variant="contained" color="success" onClick={() => handleDeleteSkillSubmit()}>
                                    Delete
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default WallOfCodeCard