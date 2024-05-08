import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import FuelCalculatorImg from "../../assets/images/Fuel_Calculator.png";

export interface Project {
    image?: string,
    title?: string,
    description?: string,
    skillsInvolved?: string[],
    websiteUrl?: string,
    repositoryUrl?: string,
}

export interface ProjectState {
    projects?: Project[],
    loading?: boolean,
}

const initialState: ProjectState = {
    projects: [
        {
            image: FuelCalculatorImg,
            title: "Fuel Calculator",
            description: "Fuel Calculator is a web app that efficiently estimates fuel consumption and costs before your trip, helping you plan with confidence based on current fuel prices.",
            skillsInvolved: ["React", "TypeScript", "Material-UI", "CSS"],
            websiteUrl: "https://nadeem-abdun.github.io/fuel-calculator-app/",
            repositoryUrl: "https://github.com/Nadeem-Abdun/fuel-calculator-app",
        },
        {
            image: "https://nadeem-abdun.github.io/find-my-chef/static/media/HeaderNavLogo.f796b4f86a0b2cb06f7e.png",
            title: "Find My Chef!",
            description: "Find My Chef! is the ultimate classified site connecting restaurant owners with top-tier chefs. Empowering chefs to discover dream jobs and assisting restaurant owners in finding the perfect culinary talent for their establishments.",
            skillsInvolved: ["React", "TypeScript", "Material-UI", "CSS"],
            websiteUrl: "https://nadeem-abdun.github.io/find-my-chef/",
            repositoryUrl: "https://github.com/Nadeem-Abdun/find-my-chef",
        },
    ],
    loading: false,
}

export const projectSlice = createSlice({
    name: "Project",
    initialState,
    reducers: {
        loadData: (state) => {

        }
    }
});

// Generating actions against each reducer function
export const { loadData } = projectSlice.actions;

export default projectSlice.reducer;