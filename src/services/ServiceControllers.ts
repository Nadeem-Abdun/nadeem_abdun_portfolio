import { CommunicationModule } from "./CommunicationModule";
import { contactMePaths, experiencePaths, profilePaths, projectPaths, resumePaths, userPaths, wallOfCodePaths } from "../services/EndPoints";
import { UsersState } from "../redux/users/usersSlice";
import { ContactMe } from "../redux/contactMe/contactMeSlice";
import { Experience } from "../redux/experience/experienceSlice";
import { WallOfCode } from "../redux/wallOfCode/wallOfCodeSlice";
import { Resume } from "../redux/resume/resumeSlice";

// User Service Controllers
export const PostUserSignUp = async (formData: UsersState) => {
    return await CommunicationModule(userPaths.SignUp, {
        method: "POST",
        body: formData,
        isFormData: false,
    });
};
export const PostUserLogin = async (formData: UsersState) => {
    return await CommunicationModule(userPaths.Login, {
        method: "POST",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const GetUserDetails = async () => {
    return await CommunicationModule(userPaths.GetUserDetails, {
        method: "GET",
        credentials: "include"
    });
};
export const GetUserLogout = async () => {
    return await CommunicationModule(userPaths.Logout, {
        method: "GET",
        credentials: "include"
    });
};

// Profile Service Controllers
export const PostCreateProfile = async (formData: FormData) => {
    return await CommunicationModule(profilePaths.CreateProfile, {
        method: "POST",
        body: formData,
        isFormData: true,
        credentials: "include",
    });
};
export const GetProfileData = async (profileId: string) => {
    return await CommunicationModule(profilePaths.GetProfile(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PutUpdateProfile = async (formData: FormData, profileId: string) => {
    return await CommunicationModule(profilePaths.UpdateProfile(profileId), {
        method: "PUT",
        body: formData,
        isFormData: true,
        credentials: "include",
    });
};
export const DeleteProfileData = async (profileId: string) => {
    return await CommunicationModule(profilePaths.DeleteProfile(profileId), {
        method: "DELETE",
        credentials: "include",
    });
};

// Experience Service Controllers
export const PostCreateExperience = async (formData: Experience, profileId: string) => {
    return await CommunicationModule(experiencePaths.CreateExperience(profileId), {
        method: "POST",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const GetExperienceData = async (id: string) => {
    return await CommunicationModule(experiencePaths.GetExperience(id), {
        method: "GET",
    });
};
export const GetExperienceAllData = async (profileId: string) => {
    return await CommunicationModule(experiencePaths.GetAllExperience(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PutUpdateExperience = async (formData: Experience, id: string) => {
    return await CommunicationModule(experiencePaths.UpdateExperience(id), {
        method: "PUT",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const DeleteExperienceData = async (id: string) => {
    return await CommunicationModule(experiencePaths.DeleteExperience(id), {
        method: "DELETE",
        credentials: "include",
    });
};

// Resume Service Controllers
export const PostUploadResume = async (formData: FormData, profileId: string) => {
    return await CommunicationModule(resumePaths.UploadResume(profileId), {
        method: "POST",
        body: formData,
        isFormData: true,
        credentials: "include",
    });
};
export const GetActiveResumeData = async (profileId: string) => {
    return await CommunicationModule(resumePaths.GetActiveResume(profileId), {
        method: "GET",
    });
};
export const GetDownloadResume = async (id: string) => {
    return await CommunicationModule(resumePaths.DownloadResume(id), {
        method: "GET",
    });
};
export const GetAllResumesData = async (profileId: string) => {
    return await CommunicationModule(resumePaths.GetAllResumes(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PatchUpdateResumeStatus = async (formData: Resume, id: string) => {
    return await CommunicationModule(resumePaths.UpdateResumeStatus(id), {
        method: "PATCH",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const DeleteResumeData = async (id: string) => {
    return await CommunicationModule(resumePaths.DeleteResume(id), {
        method: "DELETE",
        credentials: "include",
    });
};

// WallOfCode Service Controllers
export const PostCreateSkill = async (formData: WallOfCode, profileId: string) => {
    return await CommunicationModule(wallOfCodePaths.CreateSkill(profileId), {
        method: "POST",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const GetAllSkillsData = async (profileId: string) => {
    return await CommunicationModule(wallOfCodePaths.GetAllSkills(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PutUpdateSkill = async (formData: WallOfCode, id: string) => {
    return await CommunicationModule(wallOfCodePaths.UpdateSkill(id), {
        method: "PUT",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const DeleteSkillData = async (id: string) => {
    return await CommunicationModule(wallOfCodePaths.DeleteSkill(id), {
        method: "DELETE",
        credentials: "include",
    });
};

// Project Service Controllers
export const PostCreateProject = async (formData: FormData, profileId: string) => {
    return await CommunicationModule(projectPaths.CreateProject(profileId), {
        method: "POST",
        body: formData,
        isFormData: true,
        credentials: "include",
    });
};
export const GetProjectData = async (id: string) => {
    return await CommunicationModule(projectPaths.GetProject(id), {
        method: "GET",
    });
};
export const GetAllProjectsData = async (profileId: string) => {
    return await CommunicationModule(projectPaths.GetAllProjects(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PutUpdateProject = async (formData: FormData, id: string) => {
    return await CommunicationModule(projectPaths.UpdateProject(id), {
        method: "PUT",
        body: formData,
        isFormData: true,
        credentials: "include",
    });
};
export const DeleteProjectData = async (id: string) => {
    return await CommunicationModule(projectPaths.DeleteProject(id), {
        method: "DELETE",
        credentials: "include",
    });
};

// ContactMe Service Controllers
export const PostCreateContactForm = async (formData: ContactMe, profileId: string) => {
    return await CommunicationModule(contactMePaths.CreateContactForm(profileId), {
        method: "POST",
        body: formData,
        isFormData: false,
    });
};
export const GetContactForm = async (profileId: string) => {
    return await CommunicationModule(contactMePaths.GetContactForms(profileId), {
        method: "GET",
        credentials: "include",
    });
};
export const PatchReplyContactForm = async (formData: ContactMe, id: string) => {
    return await CommunicationModule(contactMePaths.ReplyContactForm(id), {
        method: "PATCH",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
};
export const DeleteContactForm = async (id: string) => {
    return await CommunicationModule(contactMePaths.DeleteContactForm(id), {
        method: "DELETE",
        credentials: "include",
    });
};