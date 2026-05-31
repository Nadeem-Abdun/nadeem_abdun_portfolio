import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Box,
} from '@mui/material';
import { useBreakpoints } from '../../utils/Breakpoints';
import { Add } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {
  createSkillFormFailure,
  createSkillFormSuccess,
  deleteSkillFormFailure,
  deleteSkillFormSuccess,
  getSkillsFormFailure,
  getSkillsFormSuccess,
  resetCreateSkillForm,
  resetDeleteSkillForm,
  resetGetSkillsForm,
  // resetUpdateSkillForm,
  submitCreateSkillForm,
  submitDeleteSkillForm,
  submitGetSkillsForm,
  // submitUpdateSkillForm,
  // updateSkillFormFailure,
  // updateSkillFormSuccess,
  WallOfCode,
  WallOfCodeState,
} from '../../redux/wallOfCode/wallOfCodeSlice';
import {
  DeleteSkillData,
  GetAllSkillsData,
  PostCreateSkill,
  // PutUpdateSkill,
} from '../../services/ServiceControllers';
import SvgIconProvider from '../SvgIconProvider';
import ellipsisString from '../../utils/EllipsisString';
import '../../styles/componentStyles.css';

interface Props extends WallOfCodeState {
  profile: string[] | undefined;
  handleAlertSliderOpen: (type: string, message: string) => void;
}

const WallOfCodeCard: React.FC<Props> = props => {
  const {
    profile,
    wallOfCodeList,
    availableSkillsList,
    handleAlertSliderOpen,
  } = props;
  const { isXs } = useBreakpoints();
  const dispatch = useDispatch();

  // Local State Management
  const [selectedSkill, setSelectedSkill] = useState<WallOfCode>({
    _id: '',
    skillName: '',
    skillIcon: '',
  });
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');

  // Api Calls
  const postCreateSkillApiCall = async () => {
    try {
      const formData = {
        skillName: selectedSkill.skillName,
        skillIcon: selectedSkill.skillIcon,
      };
      const profileId = profile && profile.length !== 0 ? profile[0] : '';
      const response = await PostCreateSkill(formData, profileId);
      if (response.success === true) {
        handleAlertSliderOpen('success', response.message);
      } else {
        handleAlertSliderOpen('error', response.message);
      }
      return response;
    } catch (error) {
      console.error('Unexpected error: ' + error);
      handleAlertSliderOpen('error', 'Unexpected error encountered');
    }
  };
  const getAllSkillsApiCall = async () => {
    try {
      const profileId = profile && profile.length !== 0 ? profile[0] : '';
      const response = await GetAllSkillsData(profileId);
      if (response.success === true) {
        handleAlertSliderOpen('success', response.message);
      } else {
        handleAlertSliderOpen('error', response.message);
      }
      return response;
    } catch (error) {
      console.error('Unexpected error: ' + error);
      handleAlertSliderOpen('error', 'Unexpected error encountered');
    }
  };
  // const putUpdateSkillApiCall = async () => {
  //   try {
  //     const formData = {
  //       skillName: selectedSkill.skillName,
  //       skillIcon: selectedSkill.skillIcon,
  //     };
  //     const skillId = selectedSkill._id || '';
  //     const response = await PutUpdateSkill(formData, skillId);
  //     if (response.success === true) {
  //       handleAlertSliderOpen('success', response.message);
  //     } else {
  //       handleAlertSliderOpen('error', response.message);
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error('Unexpected error: ' + error);
  //     handleAlertSliderOpen('error', 'Unexpected error encountered');
  //   }
  // };
  const deleteSkillDataApiCall = async () => {
    try {
      const skillId = selectedSkill._id || '';
      const response = await DeleteSkillData(skillId);
      if (response.success === true) {
        handleAlertSliderOpen('success', response.message);
      } else {
        handleAlertSliderOpen('error', response.message);
      }
      return response;
    } catch (error) {
      console.error('Unexpected error: ' + error);
      handleAlertSliderOpen('error', 'Unexpected error encountered');
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
  // const handleUpdateSkillSubmit = async () => {
  //   dispatch(submitUpdateSkillForm());
  //   const response = await putUpdateSkillApiCall();
  //   if (response.success) {
  //     const skillsData = response?.data;
  //     dispatch(updateSkillFormSuccess(skillsData));
  //     dispatch(resetUpdateSkillForm());
  //   } else {
  //     dispatch(updateSkillFormFailure());
  //   }
  // };
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
    availableSkillsList?.find(item => {
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
      _id: '',
      skillName: '',
      skillIcon: '',
    });
  };

  useEffect(() => {
    if (profile && profile.length !== 0) {
      handleGetSkillsSubmit();
    }
  }, []);
  return (
    <div
      className={`admin-card ${isXs ? 'px-2' : 'px-4'} ${isXs ? 'py-2' : 'py-4'} relative min-h-96 max-h-96 overflow-auto`}
    >
      <Grid container justifyContent="center" alignItems="center" rowGap={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h5" fontWeight={500} fontFamily="inter">
            Wall Of Code
          </Typography>
        </Grid>
        <Grid
          container
          size={{ xs: 12 }}
          justifyContent="center"
          alignItems="center"
          rowGap={2}
          columnGap={2}
        >
          {wallOfCodeList &&
            wallOfCodeList.map((item, index) => {
              return (
                <Grid
                  key={index}
                  container
                  size={{ xs: 5 }}
                  className="experience-card py-2 px-3 cursor-pointer"
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  onClick={() => handleSkillDialogOpen('delete', item)}
                >
                  <Grid>
                    <SvgIconProvider iconReference={item.skillIcon} />
                  </Grid>
                  <Grid>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      fontFamily="inter"
                    >
                      {ellipsisString(item?.skillName, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
        </Grid>
        {wallOfCodeList?.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="body2"
              fontWeight={400}
              fontFamily="inter"
              className="text-center"
            >
              There are no skills to display.
            </Typography>
          </Grid>
        )}
        <Grid>
          <IconButton
            sx={{ '&:hover': { backgroundColor: '#0F172A' } }}
            onClick={() => handleSkillDialogOpen('add')}
          >
            <Add className="text-cyan-300" />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog
        open={skillDialogOpen}
        onClose={() => handleSkillDialogClose()}
        fullWidth
        disableEscapeKeyDown
        fullScreen={isXs}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={500} fontFamily="inter">
            {dialogType === 'add' ? 'Add' : 'Delete'} Skill
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            size={{ xs: 12 }}
            justifyContent="flex-start"
            alignItems="center"
            rowGap={2}
            className="mt-2"
          >
            {dialogType === 'add' ? (
              <>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="skill_select_label">Skill</InputLabel>
                    <Select
                      labelId="skill_select_label"
                      id="skill_select"
                      value={selectedSkill.skillName}
                      label="Skill"
                      onChange={event =>
                        addSkillOnChange(event.target.value as string)
                      }
                      renderValue={value => (
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          {selectedSkill.skillIcon ? (
                            <Box
                              sx={{
                                display: 'flex',
                                '& svg': { width: 28, height: 28 },
                              }}
                            >
                              <SvgIconProvider
                                iconReference={selectedSkill.skillIcon}
                              />
                            </Box>
                          ) : null}
                          <span>{value}</span>
                        </Stack>
                      )}
                    >
                      {availableSkillsList?.map(item => (
                        <MenuItem key={item._id} value={item.skillName}>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                '& svg': { width: 28, height: 28 },
                              }}
                            >
                              <SvgIconProvider iconReference={item.skillIcon} />
                            </Box>
                            <span>{item.skillName}</span>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectedSkill.skillIcon ? (
                  <Grid size={{ xs: 12 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="center"
                      className="experience-card py-3 px-3"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          '& svg': { width: 48, height: 48 },
                        }}
                      >
                        <SvgIconProvider
                          iconReference={selectedSkill.skillIcon}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        fontFamily="inter"
                      >
                        {selectedSkill.skillName}
                      </Typography>
                    </Stack>
                  </Grid>
                ) : null}
              </>
            ) : (
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1" fontWeight={500} fontFamily="inter">
                  Are you sure you want to delete &quot;
                  {selectedSkill?.skillName}&quot; skill?
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            size={{ xs: 12 }}
            justifyContent="flex-end"
            alignItems="center"
            columnGap={1}
          >
            <Grid>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSkillDialogClose()}
              >
                Close
              </Button>
            </Grid>
            <Grid>
              {dialogType === 'add' ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleCreateSkillSubmit()}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleDeleteSkillSubmit()}
                >
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WallOfCodeCard;
