import { CommunicationModule } from "./CommunicationModule";
import { userPaths } from "../services/EndPoints";
import { UsersState } from "../redux/users/usersSlice";

export const PostUserSignUp = async (formData: UsersState) => {
    return await CommunicationModule(userPaths.SignUp, {
        method: "POST",
        body: formData,
        isFormData: false,
    });
}

export const PostUserLogin = async (formData: UsersState) => {
    return await CommunicationModule(userPaths.Login, {
        method: "POST",
        body: formData,
        isFormData: false,
        credentials: "include",
    });
}

export const GetUserDetails = async () => {
    return await CommunicationModule(userPaths.GetUserDetails, {
        method: "GET",
        credentials: "include"
    });
}