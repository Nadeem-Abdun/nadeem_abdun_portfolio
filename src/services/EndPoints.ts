const serviceUrls = {
    // baseUrl: "http://localhost:4000",
    baseUrl: "https://nadeem-abdun-portfolio-backend.onrender.com",
}

export const userPaths = {
    SignUp: `${serviceUrls.baseUrl}/api/v1/users/register`,
    Login: `${serviceUrls.baseUrl}/api/v1/users/login`,
    Logout: `${serviceUrls.baseUrl}/api/v1/users/logout`,
    RefreshToken: `${serviceUrls.baseUrl}/api/v1/users/refresh-token`,
    UpdatePassword: `${serviceUrls.baseUrl}/api/v1/users/update-password`,
    GetUserDetails: `${serviceUrls.baseUrl}/api/v1/users/get-user`,
    UpdateUserDetails: `${serviceUrls.baseUrl}/api/v1/users/update-account`,
    GetUserProfiles: `${serviceUrls.baseUrl}/api/v1/users/get-profile/:username`,
}