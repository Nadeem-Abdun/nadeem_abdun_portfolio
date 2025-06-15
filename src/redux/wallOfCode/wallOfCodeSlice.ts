import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import WallOfCode from "../../screens/AppScreens/WallOfCode";

export interface WallOfCode {
    _id?: string,
    skillName?: string,
    skillIcon?: string,
}

export interface WallOfCodeState {
    wallOfCodeList: WallOfCode[],
    availableSkillsList: WallOfCode[],
    loading?: boolean,
    success?: boolean | null,
}

const initialState: WallOfCodeState = {
    wallOfCodeList: [
        {
            _id: "1",
            skillName: "HTML",
            skillIcon: "HtmlIcon",
        },
        {
            _id: "2",
            skillName: "CSS",
            skillIcon: "CssIcon",
        },
        {
            _id: "3",
            skillName: "JavaScript",
            skillIcon: "JavascriptIcon",
        },
        {
            _id: "4",
            skillName: "TypeScript",
            skillIcon: "TypescriptIcon",
        },
        {
            _id: "5",
            skillName: "ReactJS",
            skillIcon: "ReactIcon",
        },
        {
            _id: "6",
            skillName: "React Native",
            skillIcon: "ReactNativeIcon",
        },
        {
            _id: "7",
            skillName: "Node Js",
            skillIcon: "NodeJsIcon",
        },
        {
            _id: "8",
            skillName: "Express Js",
            skillIcon: "ExpressJsIcon",
        },
        {
            _id: "9",
            skillName: "Material UI",
            skillIcon: "MaterialUiIcon",
        },
        {
            _id: "10",
            skillName: "MongoDb",
            skillIcon: "MongoDbIcon",
        },
        {
            _id: "11",
            skillName: "MySQL",
            skillIcon: "MySqlIcon",
        },
        {
            _id: "12",
            skillName: "Tailwind Css",
            skillIcon: "TailwindCssIcon",
        },
        {
            _id: "13",
            skillName: "Redux Toolkit",
            skillIcon: "ReduxIcon",
        },
    ],
    availableSkillsList: [
        {
            _id: "1",
            skillName: "HTML",
            skillIcon: "HtmlIcon",
        },
        {
            _id: "2",
            skillName: "CSS",
            skillIcon: "CssIcon",
        },
        {
            _id: "3",
            skillName: "JavaScript",
            skillIcon: "JavascriptIcon",
        },
        {
            _id: "4",
            skillName: "TypeScript",
            skillIcon: "TypescriptIcon",
        },
        {
            _id: "5",
            skillName: "ReactJS",
            skillIcon: "ReactIcon",
        },
        {
            _id: "6",
            skillName: "React Native",
            skillIcon: "ReactNativeIcon",
        },
        {
            _id: "7",
            skillName: "Angular",
            skillIcon: "AngularIcon",
        },
        {
            _id: "8",
            skillName: "Vue.js",
            skillIcon: "VueJsIcon",
        },
        {
            _id: "9",
            skillName: "Svelte",
            skillIcon: "SvelteIcon",
        },
        {
            _id: "10",
            skillName: "Java",
            skillIcon: "JavaIcon",
        },
        {
            _id: "11",
            skillName: "Spring",
            skillIcon: "SpringIcon",
        },
        {
            _id: "12",
            skillName: "Spring Boot",
            skillIcon: "SpringBootIcon",
        },
        {
            _id: "13",
            skillName: "Python",
            skillIcon: "PythonIcon",
        },
        {
            _id: "14",
            skillName: "Node Js",
            skillIcon: "NodeJsIcon",
        },
        {
            _id: "15",
            skillName: "Express Js",
            skillIcon: "ExpressJsIcon",
        },
        {
            _id: "16",
            skillName: "Django",
            skillIcon: "DjangoIcon",
        },
        {
            _id: "17",
            skillName: "Flask",
            skillIcon: "FlaskIcon",
        },
        {
            _id: "18",
            skillName: "Material UI",
            skillIcon: "MaterialUiIcon",
        },
        {
            _id: "19",
            skillName: "Bootstrap",
            skillIcon: "BootstrapIcon",
        },
        {
            _id: "20",
            skillName: "MongoDb",
            skillIcon: "MongoDbIcon",
        },
        {
            _id: "21",
            skillName: "MySQL",
            skillIcon: "MySqlIcon",
        },
        {
            _id: "22",
            skillName: "PostgreSQL",
            skillIcon: "PostgreSqlIcon",
        },
        {
            _id: "23",
            skillName: "Tailwind Css",
            skillIcon: "TailwindCssIcon",
        },
        {
            _id: "24",
            skillName: "Sass",
            skillIcon: "SassIcon",
        },
        {
            _id: "25",
            skillName: "Redux Toolkit",
            skillIcon: "ReduxIcon",
        },
        {
            _id: "26",
            skillName: "GraphQL",
            skillIcon: "GraphqlIcon",
        },
    ],
    loading: false,
    success: null,
}

const wallOfCodeSlice = createSlice({
    name: "WallOfCode",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // Create Skill Form Actions
        submitCreateSkillForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        createSkillFormSuccess: (state, action: PayloadAction<WallOfCode>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.wallOfCodeList.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.wallOfCodeList[existingIndex] = action.payload;
            } else {
                state.wallOfCodeList.push(action.payload);
            }
        },
        createSkillFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetCreateSkillForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get Skills Forms Actions
        submitGetSkillsForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getSkillsFormSuccess: (state, action: PayloadAction<WallOfCode[]>) => {
            state.loading = false;
            state.success = true;
            state.wallOfCodeList = action.payload;
        },
        getSkillsFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetSkillsForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Update Skill Form Actions
        submitUpdateSkillForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        updateSkillFormSuccess: (state, action: PayloadAction<WallOfCode>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.wallOfCodeList.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.wallOfCodeList[existingIndex] = action.payload;
            } else {
                state.wallOfCodeList.push(action.payload);
            }
        },
        updateSkillFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetUpdateSkillForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Delete Skill Form Actions
        submitDeleteSkillForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        deleteSkillFormSuccess: (state, action: PayloadAction<WallOfCode>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.wallOfCodeList.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.wallOfCodeList.splice(existingIndex, 1);
            }
        },
        deleteSkillFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetDeleteSkillForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    }
});

// Generating actions against each reducer function
export const {
    loadData,
    submitCreateSkillForm,
    createSkillFormSuccess,
    createSkillFormFailure,
    resetCreateSkillForm,
    submitGetSkillsForm,
    getSkillsFormSuccess,
    getSkillsFormFailure,
    resetGetSkillsForm,
    submitUpdateSkillForm,
    updateSkillFormSuccess,
    updateSkillFormFailure,
    resetUpdateSkillForm,
    submitDeleteSkillForm,
    deleteSkillFormSuccess,
    deleteSkillFormFailure,
    resetDeleteSkillForm,
} = wallOfCodeSlice.actions;

export default wallOfCodeSlice.reducer;
