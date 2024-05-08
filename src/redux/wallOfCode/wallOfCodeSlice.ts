import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import WallOfCode from "../../screens/AppScreens/WallOfCode";

export interface WallOfCode {
    skillName?: string,
    skillIcon?: string,
}

export interface WallOfCodeState {
    wallOfCode: WallOfCode[],
    availableSkillsList: WallOfCode[],
    loading?: boolean,
}

const initialState: WallOfCodeState = {
    wallOfCode: [
        {
            skillName: "HTML",
            skillIcon: "HtmlIcon",
        },
        {
            skillName: "CSS",
            skillIcon: "CssIcon",
        },
        {
            skillName: "JavaScript",
            skillIcon: "JavascriptIcon",
        },
        {
            skillName: "TypeScript",
            skillIcon: "TypescriptIcon",
        },
        {
            skillName: "ReactJS",
            skillIcon: "ReactIcon",
        },
        {
            skillName: "React Native",
            skillIcon: "ReactNativeIcon",
        },
        {
            skillName: "Node Js",
            skillIcon: "NodeJsIcon",
        },
        {
            skillName: "Express Js",
            skillIcon: "ExpressJsIcon",
        },
        {
            skillName: "Material UI",
            skillIcon: "MaterialUiIcon",
        },
        {
            skillName: "MongoDb",
            skillIcon: "MongoDbIcon",
        },
        {
            skillName: "MySQL",
            skillIcon: "MySqlIcon",
        },
        {
            skillName: "Tailwind Css",
            skillIcon: "TailwindCssIcon",
        },
        {
            skillName: "Redux Toolkit",
            skillIcon: "ReduxIcon",
        },
    ],
    availableSkillsList: [
        {
            skillName: "HTML",
            skillIcon: "HtmlIcon",
        },
        {
            skillName: "CSS",
            skillIcon: "CssIcon",
        },
        {
            skillName: "JavaScript",
            skillIcon: "JavascriptIcon",
        },
        {
            skillName: "TypeScript",
            skillIcon: "TypescriptIcon",
        },
        {
            skillName: "ReactJS",
            skillIcon: "ReactIcon",
        },
        {
            skillName: "React Native",
            skillIcon: "ReactNativeIcon",
        },
        {
            skillName: "Angular",
            skillIcon: "AngularIcon",
        },
        {
            skillName: "Vue.js",
            skillIcon: "VueJsIcon",
        },
        {
            skillName: "Svelte",
            skillIcon: "SvelteIcon",
        },
        {
            skillName: "Java",
            skillIcon: "JavaIcon",
        },
        {
            skillName: "Spring",
            skillIcon: "SpringIcon",
        },
        {
            skillName: "Spring Boot",
            skillIcon: "SpringBootIcon",
        },
        {
            skillName: "Python",
            skillIcon: "PythonIcon",
        },
        {
            skillName: "Node Js",
            skillIcon: "NodeJsIcon",
        },
        {
            skillName: "Express Js",
            skillIcon: "ExpressJsIcon",
        },
        {
            skillName: "Django",
            skillIcon: "DjangoIcon",
        },
        {
            skillName: "Flask",
            skillIcon: "FlaskIcon",
        },
        {
            skillName: "Material UI",
            skillIcon: "MaterialUiIcon",
        },
        {
            skillName: "Bootstrap",
            skillIcon: "BootstrapIcon",
        },
        {
            skillName: "MongoDb",
            skillIcon: "MongoDbIcon",
        },
        {
            skillName: "MySQL",
            skillIcon: "MySqlIcon",
        },
        {
            skillName: "PostgreSQL",
            skillIcon: "PostgreSqlIcon",
        },
        {
            skillName: "Tailwind Css",
            skillIcon: "TailwindCssIcon",
        },
        {
            skillName: "Sass",
            skillIcon: "SassIcon",
        },
        {
            skillName: "Redux Toolkit",
            skillIcon: "ReduxIcon",
        },
        {
            skillName: "GraphQL",
            skillIcon: "GraphqlIcon",
        },
    ],
    loading: false,
}

const wallOfCodeSlice = createSlice({
    name: "WallOfCode",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        addSkill: (state, action: PayloadAction<WallOfCode>) => {
            state.loading = true;
            state.wallOfCode?.push(action.payload);
            state.loading = false;
        },
        deleteSkill: (state, action: PayloadAction<WallOfCode>) => {
            state.loading = true;
            const index = state.wallOfCode.findIndex(skill => skill.skillName === action.payload?.skillName);
            if (index !== -1) {
                state.wallOfCode.splice(index, 1);
            }
            state.loading = false;
        },
    }
});

// Generating actions against each reducer function
export const { loadData, addSkill, deleteSkill } = wallOfCodeSlice.actions;

export default wallOfCodeSlice.reducer;