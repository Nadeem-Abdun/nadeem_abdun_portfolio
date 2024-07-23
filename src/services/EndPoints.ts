const serviceUrls = {
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://nadeem-abdun-portfolio-backend.onrender.com",
};

export const userPaths = {
    SignUp: `${serviceUrls.baseUrl}/api/v1/users/register`,
    Login: `${serviceUrls.baseUrl}/api/v1/users/login`,
    Logout: `${serviceUrls.baseUrl}/api/v1/users/logout`,
    RefreshToken: `${serviceUrls.baseUrl}/api/v1/users/refresh-token`,
    UpdatePassword: `${serviceUrls.baseUrl}/api/v1/users/update-password`,
    GetUserDetails: `${serviceUrls.baseUrl}/api/v1/users/get-user`,
    UpdateUserDetails: `${serviceUrls.baseUrl}/api/v1/users/update-account`,
    GetUserProfiles: (username: string) => `${serviceUrls.baseUrl}/api/v1/users/get-profile/${username}`,
};

export const profilePaths = {
    CreateProfile: `${serviceUrls.baseUrl}/api/v1/profile/create`,
    GetProfile: (profileId: string) => `${serviceUrls.baseUrl}/api/v1/profile/get/${profileId}`,
    UpdateProfile: (profileId: string) => `${serviceUrls.baseUrl}/api/v1/profile/update/${profileId}`,
    DeleteProfile: (profileId: string) => `${serviceUrls.baseUrl}/api/v1/profile/delete/${profileId}`,
};

export const contactMePaths = {
    CreateContactForm: (profileId: string) => `${serviceUrls.baseUrl}/api/v1/contactMe/create/${profileId}`,
    GetContactForms: (profileId: string) => `${serviceUrls.baseUrl}/api/v1/contactMe/getForms/${profileId}`,
    ReplyContactForm: (id: string) => `${serviceUrls.baseUrl}/api/v1/contactMe/reply/${id}`,
    DeleteContactForm: (id: string) => `${serviceUrls.baseUrl}/api/v1/contactMe/delete/${id}`,
};