import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import ProfilePic from "../../assets/images/Profile_Avatar.png";

export interface ProfileState {
    _id?: string,
    fullName?: string,
    professionalRoles?: string[],
    introducingLine?: string,
    profilePicture?: string,
    primaryDescription?: string,
    secondaryDescription?: string,
    githubUrl?: string,
    linkedInUrl?: string,
    discordUrl?: string,
    twitterUrl?: string,
    mailToId?: string,
    loading?: boolean,
    success?: boolean | null,
}

const initialState: ProfileState = {
    _id: "",
    fullName: "Nadeem Abdun",
    professionalRoles: ["Web App Developer", "Mobile App Developer", "Mechanical Engineer"],
    introducingLine: "Transforming concepts into code, Specialized in delivering pixel-perfect, accessible wonders as a full-stack web and app developer.",
    profilePicture: ProfilePic,
    primaryDescription: "As a passionate Web & App Developer with one year of hands-on experience in front-end development, I specialize in React, React Native, JavaScript/TypeScript, Node.js, and Express. My creative and adaptable approach focuses on building engaging user interfaces and scalable backends, leveraging technologies like Redux, Material UI, React Native Paper, and databases such as MongoDB and MySQL.",
    secondaryDescription: "My journey began as a mechanical engineer, and my curiosity to explore the virtual realm led me to coding. Embracing it wholeheartedly, I've transformed into a full-stack developer, dedicated to turning concepts into reality. Excited about the journey ahead, I look forward to crafting meaningful digital experiences.",
    githubUrl: "https://github.com/Nadeem-Abdun",
    linkedInUrl: "https://in.linkedin.com/in/abdun-nadeem",
    discordUrl: "",
    twitterUrl: "",
    mailToId: "nadeemabdun@gmail.com",
    loading: false,
    success: null,
}

export const profileSlice = createSlice({
    name: "Profile",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        submitGetProfileForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getProfileSuccess: (state, action: PayloadAction<ProfileState>) => {
            state.loading = false;
            state.success = true;
            state._id = action.payload._id;
            state.fullName = action.payload.fullName;
            state.professionalRoles = action.payload.professionalRoles;
            state.introducingLine = action.payload.introducingLine;
            state.profilePicture = action.payload.profilePicture;
            state.primaryDescription = action.payload.primaryDescription;
            state.secondaryDescription = action.payload.secondaryDescription;
            state.githubUrl = action.payload.githubUrl;
            state.linkedInUrl = action.payload.linkedInUrl;
            state.discordUrl = action.payload.discordUrl;
            state.twitterUrl = action.payload.twitterUrl;
            state.mailToId = action.payload.mailToId;
        },
        getProfileFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetProfileForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadData, submitGetProfileForm, getProfileSuccess, getProfileFailure, resetGetProfileForm } = profileSlice.actions;

export default profileSlice.reducer;