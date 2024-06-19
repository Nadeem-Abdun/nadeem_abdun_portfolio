import React, { useState } from "react";
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useBreakpoints } from "../../utils/Breakpoints";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { WallOfCode, WallOfCodeState } from "../../redux/wallOfCode/wallOfCodeSlice";
import { addSkill, deleteSkill } from "../../redux/wallOfCode/wallOfCodeSlice";
import SvgIconProvider from "../SvgIconProvider";
import ellipsisString from "../../utils/EllipsisString";
import "../../styles/componentStyles.css";

const WallOfCodeCard: React.FC<WallOfCodeState> = (props) => {
    const { wallOfCode, availableSkillsList } = props;

    const { isXl, isLg, isMd, isSm, isXs } = useBreakpoints();
    const dispatch = useDispatch();

    const [selectedSkill, setSelectedSkill] = useState<WallOfCode>({
        skillName: "",
        skillIcon: "",
    });
    const [skillDialogOpen, setSkillDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("add");
    const handleSkillDialogOpen = (type: string, item?: WallOfCode) => {
        setSkillDialogOpen(true);
        setDialogType(type);
        if (item) {
            setSelectedSkill(item);
        }
    }
    const handleSkillDialogClose = () => {
        setSkillDialogOpen(false);
        setSelectedSkill({
            skillName: "",
            skillIcon: "",
        });
    }
    const addSkillOnChange = (value: string) => {
        availableSkillsList?.find((item) => {
            if (item.skillName === value) {
                setSelectedSkill({
                    skillName: item.skillName,
                    skillIcon: item.skillIcon,
                });
            }
        });
    }
    const handleSkillAdd = async () => {
        if ((selectedSkill.skillName !== "") && (selectedSkill.skillIcon !== "")) {
            const skillExists = wallOfCode?.find((item) => item.skillName === selectedSkill.skillName);
            if (!skillExists) {
                await dispatch(addSkill(selectedSkill));
                handleSkillDialogClose();
            }
        }
    }
    const handleSkillDelete = async () => {
        if (selectedSkill.skillName !== "") {
            await dispatch(deleteSkill(selectedSkill));
            handleSkillDialogClose();
        }
    }

    return (
        <div className={`admin-card ${(isXs) ? "px-2" : "px-4"} ${(isXs) ? "py-2" : "py-4"} relative min-h-96 max-h-96 overflow-auto`}>
            <Grid container justifyContent="center" alignItems="center" rowGap={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={500} fontFamily="inter">Wall Of Code</Typography>
                </Grid>
                <Grid container item xs={12} justifyContent="center" alignItems="center" rowGap={2} columnGap={2}>
                    {wallOfCode && wallOfCode.map((item, index) => {
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
                {wallOfCode?.length === 0 &&
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
                                <Button variant="contained" color="success" onClick={() => handleSkillAdd()}>
                                    Add
                                </Button>
                                :
                                <Button variant="contained" color="success" onClick={() => handleSkillDelete()}>
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