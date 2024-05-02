import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Experience {
    joiningDate?: string,
    relievingDate?: string,
    jobTitle?: string,
    organizationName?: string,
    responsibilities?: string[],
    skillsInvolved?: string[],
}

export interface ExperienceState {
    experiences?: Experience[],
    loading?: boolean
}

const initialState: ExperienceState = {
    experiences: [
        {
            joiningDate: "2023-02-06",
            relievingDate: "",
            jobTitle: "React Frontend Developer",
            organizationName: "Bluepal Solution Pvt. Ltd.",
            responsibilities: [
                "Representing Bluepal Solution Pvt Ltd in delivering high-quality solutions and services on behalf of JPMorgan Chase Bank.",
                "Currently working on a Property Management Application for JPMorgan Chase Bank in the Asia region as a dedicated consultant.",
                "Crafting and maintaining a robust React application, contributing to its stability and functionality.",
                "Implementing an intuitive and responsive user interface using Material UI to enhance the user experience.",
                "Creating Proof of Concepts (POCs) for UI enhancements in new applications to be deployed for JPMorgan Chase Bank.",
                "Specializing in Material UI, React, TypeScript, and Jest RTL for comprehensive and effective development.",
                "Ensuring the application's responsiveness and addressing ADA and NVDA issues to enhance accessibility.",
            ],
            skillsInvolved: [
                "Html",
                "CSS",
                "JavaScript",
                "TypeScript",
                "React",
                "Material UI",
                "React Testing Library",
                "Jest",
            ],
        },
    ],
    loading: false,
}

export const experienceSlice = createSlice({
    name: "Experience",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        addExperience: (state, action: PayloadAction<Experience>) => {
            state.loading = true;
            state.experiences?.push(action.payload);
            state.loading = false;
        },
        updateExperience: (state, action: PayloadAction<Experience>) => {
            state.loading = true;

            state.loading = false;
        },
        deleteExperience: (state, action: PayloadAction<Experience>) => {
            state.loading = true;
            state.experiences?.splice(state.experiences.indexOf(action.payload), 1);
            state.loading = false;
        },
    }
});

// Generating actions against each reducer function
export const { loadData, addExperience, updateExperience, deleteExperience } = experienceSlice.actions;

export default experienceSlice.reducer;