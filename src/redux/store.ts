import { configureStore } from "@reduxjs/toolkit";
import aboutMeReducer from "./aboutMe/aboutMeSlice";
import experienceReducer from "./experience/experienceSlice";
import wallOfCodeReducer from "./wallOfCode/wallOfCodeSlice";
import projectReducer from "./project/projectSlice";
import contactMeReducer from "./contactMe/contactMeSlice";

export const store = configureStore({
    reducer: {
        aboutMe: aboutMeReducer,
        experience: experienceReducer,
        wallOfCode: wallOfCodeReducer,
        project: projectReducer,
        contactMe: contactMeReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch