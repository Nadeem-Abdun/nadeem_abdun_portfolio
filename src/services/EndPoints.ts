const serviceUrls = {
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://nadeem-abdun-portfolio-backend.onrender.com",
};
const apiVersionV1 = '/api/v1';

export const userPaths = {
    SignUp: `${serviceUrls.baseUrl}${apiVersionV1}/users/register`,
    Login: `${serviceUrls.baseUrl}${apiVersionV1}/users/login`,
    Logout: `${serviceUrls.baseUrl}${apiVersionV1}/users/logout`,
    RefreshToken: `${serviceUrls.baseUrl}${apiVersionV1}/users/refresh-token`,
    UpdatePassword: `${serviceUrls.baseUrl}${apiVersionV1}/users/update-password`,
    GetUserDetails: `${serviceUrls.baseUrl}${apiVersionV1}/users/get-user`,
    UpdateUserDetails: `${serviceUrls.baseUrl}${apiVersionV1}/users/update-account`,
    GetUserProfiles: (username: string) => `${serviceUrls.baseUrl}${apiVersionV1}/users/get-profile/${username}`,
};

export const profilePaths = {
    CreateProfile: `${serviceUrls.baseUrl}${apiVersionV1}/profile/create`,
    GetProfile: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/profile/get/${profileId}`,
    UpdateProfile: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/profile/update/${profileId}`,
    DeleteProfile: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/profile/delete/${profileId}`,
};

export const experiencePaths = {
    CreateExperience: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/experience/create/${profileId}`,
    GetExperience: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/experience/get/${id}`,
    GetAllExperience: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/experience/getAll/${profileId}`,
    UpdateExperience: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/experience/update/${id}`,
    DeleteExperience: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/experience/delete/${id}`,
};

export const resumePaths = {
    UploadResume: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/upload/${profileId}`,
    GetActiveResume: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/getActive/${profileId}`,
    DownloadResume: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/download/${id}`,
    GetAllResumes: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/getAll/${profileId}`,
    UpdateResumeStatus: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/update/${id}`,
    DeleteResume: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/resume/delete/${id}`,
};

export const wallOfCodePaths = {
    CreateSkill: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/wallOfCode/create/${profileId}`,
    GetAllSkills: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/wallOfCode/getSkills/${profileId}`,
    UpdateSkill: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/wallOfCode/update/${id}`,
    DeleteSkill: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/wallOfCode/delete/${id}`,
};

export const projectPaths = {
    CreateProject: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/project/create/${profileId}`,
    GetProject: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/project/get/${id}`,
    GetAllProjects: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/project/getAll/${profileId}`,
    UpdateProject: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/project/update/${id}`,
    DeleteProject: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/project/delete/${id}`,
};

export const contactMePaths = {
    CreateContactForm: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/contactMe/create/${profileId}`,
    GetContactForms: (profileId: string) => `${serviceUrls.baseUrl}${apiVersionV1}/contactMe/getForms/${profileId}`,
    ReplyContactForm: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/contactMe/reply/${id}`,
    DeleteContactForm: (id: string) => `${serviceUrls.baseUrl}${apiVersionV1}/contactMe/delete/${id}`,
};
