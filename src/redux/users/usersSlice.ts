import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
    _id?: string,
    username?: string,
    email?: string,
    profile?: string[],
    loading?: boolean,
    success?: boolean | null,
}

const initialState: UsersState = {
    _id: "",
    username: "",
    email: "",
    profile: [],
    loading: false,
    success: null,
}

export const usersSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // SignUp Actions
        submitSignUpForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        signUpFormSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        signUpFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetSignUpForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Login Actions
        submitLoginForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        loginFormSuccess: (state, action: PayloadAction<UsersState>) => {
            state.loading = false;
            state.success = true;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.profile = action.payload.profile;
        },
        loginFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetLoginForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get User Actions
        submitGetUser: (state) => {
            state.loading = true;
            state.success = null;
        },
        getUserSuccess: (state, action: PayloadAction<UsersState>) => {
            state.loading = false;
            state.success = true;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.profile = action.payload.profile;
        },
        getUserFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetUser: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Logout Actions
        submitLogoutForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        logoutFormSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state._id = "";
            state.username = "";
            state.email = "";
            state.profile = [];
        },
        logoutFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetLogoutForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    loadData,
    submitSignUpForm,
    signUpFormSuccess,
    signUpFormFailure,
    resetSignUpForm,
    submitLoginForm,
    loginFormSuccess,
    loginFormFailure,
    resetLoginForm,
    submitGetUser,
    getUserSuccess,
    getUserFailure,
    resetGetUser,
    submitLogoutForm,
    logoutFormSuccess,
    logoutFormFailure,
    resetLogoutForm,
} = usersSlice.actions;

export default usersSlice.reducer;
