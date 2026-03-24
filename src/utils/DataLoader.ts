import { Dispatch } from '@reduxjs/toolkit';
import {
  GetActiveResumeData,
  GetAllProjectsData,
  GetAllSkillsData,
  GetExperienceAllData,
  GetProfileData,
} from '../services/ServiceControllers';
import { getProfileSuccess } from '../redux/profile/profileSlice';
import { getActiveResumeFormSuccess } from '../redux/resume/resumeSlice';
import { getExperienceFormSuccess } from '../redux/experience/experienceSlice';
import { getSkillsFormSuccess } from '../redux/wallOfCode/wallOfCodeSlice';
import { getProjectFormSuccess } from '../redux/project/projectSlice';

interface DataLoaderProps {
  profileId: string;
  dispatch: Dispatch;
}

const dataLoader = async (props: DataLoaderProps): Promise<void> => {
  const { profileId, dispatch } = props;
  try {
    const [profileData, experienceData, resumeData, skillData, projectData] =
      await Promise.all([
        GetProfileData(profileId),
        GetExperienceAllData(profileId),
        GetActiveResumeData(profileId),
        GetAllSkillsData(profileId),
        GetAllProjectsData(profileId),
      ]);
    if (profileData.data) {
      dispatch(getProfileSuccess(profileData.data));
    }
    if (experienceData.data) {
      dispatch(getExperienceFormSuccess(experienceData.data));
    }
    if (resumeData.data) {
      dispatch(getActiveResumeFormSuccess(resumeData.data));
    }
    if (skillData.data) {
      dispatch(getSkillsFormSuccess(skillData.data));
    }
    if (projectData.data) {
      dispatch(getProjectFormSuccess(projectData.data));
    }
  } catch (error) {
    console.error('Error loading initial data:', error);
  }
};

export default dataLoader;
