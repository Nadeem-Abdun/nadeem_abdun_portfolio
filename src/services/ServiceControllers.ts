import { CommunicationModule } from "./CommunicationModule";
import { contactMePaths, profilePaths, userPaths } from "../services/EndPoints";
import { UsersState } from "../redux/users/usersSlice";
import { ContactMe } from "../redux/contactMe/contactMeSlice";

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
