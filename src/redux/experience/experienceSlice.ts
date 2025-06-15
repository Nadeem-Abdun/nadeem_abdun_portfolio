import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Experience {
    _id?: string,
    joiningDate?: string,
    relievingDate?: string,
    jobTitle?: string,
    organizationName?: string,
    responsibilities?: string[],
    skillsInvolved?: string[],
}

export interface ExperienceState {
    experiences?: Experience[],
    loading?: boolean,
    success?: boolean | null,
}

const initialState: ExperienceState = {
    experiences: [
        {
            _id: "",
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
    success: null,
}

export const experienceSlice = createSlice({
    name: "Experience",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // Create Experience Actions
        submitCreateExperienceForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        createExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
            state.loading = false;
            state.success = true;
            if (state.experiences) {
                const existingIndex = state.experiences.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.experiences[existingIndex] = action.payload;
                } else {
                    state.experiences.push(action.payload);
                }
            }
        },
        createExperienceFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetCreateExperienceForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get Experience Actions
        submitGetExperienceForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getExperienceFormSuccess: (state, action: PayloadAction<Experience[]>) => {
            state.loading = false;
            state.success = true;
            state.experiences = action.payload;
        },
        getExperienceFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetExperienceForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Update Experience Actions
        submitUpdateExperienceForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        updateExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
            state.loading = false;
            state.success = true;
            if (state.experiences) {
                const existingIndex = state.experiences.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.experiences[existingIndex] = action.payload;
                } else {
                    state.experiences.push(action.payload);
                }
            }
        },
        updateExperienceFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetUpdateExperienceForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Delete Experience Actions       
        submitDeleteExperienceForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        deleteExperienceFormSuccess: (state, action: PayloadAction<Experience>) => {
            state.loading = false;
            state.success = true;
            if (state.experiences) {
                const existingIndex = state.experiences.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.experiences.splice(existingIndex, 1);
                }
            }
        },
        deleteExperienceFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetDeleteExperienceForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    }
});

// Generating actions against each reducer function
export const {
    loadData,
    submitCreateExperienceForm,
    createExperienceFormSuccess,
    createExperienceFormFailure,
    resetCreateExperienceForm,
    submitGetExperienceForm,
    getExperienceFormSuccess,
    getExperienceFormFailure,
    resetGetExperienceForm,
    submitUpdateExperienceForm,
    updateExperienceFormSuccess,
    updateExperienceFormFailure,
    resetUpdateExperienceForm,
    submitDeleteExperienceForm,
    deleteExperienceFormSuccess,
    deleteExperienceFormFailure,
    resetDeleteExperienceForm,
} = experienceSlice.actions;

export default experienceSlice.reducer;
