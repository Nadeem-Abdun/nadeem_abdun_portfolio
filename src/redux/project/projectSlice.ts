import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import FuelCalculatorImg from "../../assets/images/Fuel_Calculator.png";

export interface Project {
    _id?: string,
    projectPicture?: string,
    title?: string,
    description?: string,
    skillsInvolved?: string[],
    websiteUrl?: string,
    repositoryUrl?: string,
}

export interface ProjectState {
    projects?: Project[],
    loading?: boolean,
    success?: boolean | null,
}

const initialState: ProjectState = {
    projects: [
        {
            _id: "",
            projectPicture: FuelCalculatorImg,
            title: "Fuel Calculator",
            description: "Fuel Calculator is a web app that efficiently estimates fuel consumption and costs before your trip, helping you plan with confidence based on current fuel prices.",
            skillsInvolved: ["React", "TypeScript", "Material-UI", "CSS"],
            websiteUrl: "https://nadeem-abdun.github.io/fuel-calculator-app/",
            repositoryUrl: "https://github.com/Nadeem-Abdun/fuel-calculator-app",
        },
        {
            _id: "",
            projectPicture: "https://nadeem-abdun.github.io/find-my-chef/static/media/HeaderNavLogo.f796b4f86a0b2cb06f7e.png",
            title: "Find My Chef!",
            description: "Find My Chef! is the ultimate classified site connecting restaurant owners with top-tier chefs. Empowering chefs to discover dream jobs and assisting restaurant owners in finding the perfect culinary talent for their establishments.",
            skillsInvolved: ["React", "TypeScript", "Material-UI", "CSS"],
            websiteUrl: "https://nadeem-abdun.github.io/find-my-chef/",
            repositoryUrl: "https://github.com/Nadeem-Abdun/find-my-chef",
        },
    ],
    loading: false,
    success: null,
}

export const projectSlice = createSlice({
    name: "Project",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // Create Project Actions
        submitCreateProjectForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        createProjectFormSuccess: (state, action: PayloadAction<Project>) => {
            state.loading = false;
            state.success = true;
            if (state.projects) {
                const existingIndex = state.projects.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.projects[existingIndex] = action.payload;
                } else {
                    state.projects.push(action.payload);
                }
            }
        },
        createProjectFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetCreateProjectForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get Project Actions
        submitGetProjectForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getProjectFormSuccess: (state, action: PayloadAction<Project[]>) => {
            state.loading = false;
            state.success = true;
            state.projects = action.payload;
        },
        getProjectFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetProjectForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Update Project Actions
        submitUpdateProjectForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        updateProjectFormSuccess: (state, action: PayloadAction<Project>) => {
            state.loading = false;
            state.success = true;
            if (state.projects) {
                const existingIndex = state.projects.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.projects[existingIndex] = action.payload;
                } else {
                    state.projects.push(action.payload);
                }
            }
        },
        updateProjectFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetUpdateProjectForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Delete Project Actions       
        submitDeleteProjectForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        deleteProjectFormSuccess: (state, action: PayloadAction<Project>) => {
            state.loading = false;
            state.success = true;
            if (state.projects) {
                const existingIndex = state.projects.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.projects.splice(existingIndex, 1);
                }
            }
        },
        deleteProjectFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetDeleteProjectForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    }
});

// Generating actions against each reducer function
export const {
    loadData,
    submitCreateProjectForm,
    createProjectFormSuccess,
    createProjectFormFailure,
    resetCreateProjectForm,
    submitGetProjectForm,
    getProjectFormSuccess,
    getProjectFormFailure,
    resetGetProjectForm,
    submitUpdateProjectForm,
    updateProjectFormSuccess,
    updateProjectFormFailure,
    resetUpdateProjectForm,
    submitDeleteProjectForm,
    deleteProjectFormSuccess,
    deleteProjectFormFailure,
    resetDeleteProjectForm,
} = projectSlice.actions;

export default projectSlice.reducer;