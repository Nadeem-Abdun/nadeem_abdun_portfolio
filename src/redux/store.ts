import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import profileReducer from "./profile/profileSlice";
import experienceReducer from "./experience/experienceSlice";
import resumeReducer from "./resume/resumeSlice";
import wallOfCodeReducer from "./wallOfCode/wallOfCodeSlice";
import projectReducer from "./project/projectSlice";
import contactMeReducer from "./contactMe/contactMeSlice";

export const store = configureStore({
    reducer: {
        user: usersReducer,
        profile: profileReducer,
        experience: experienceReducer,
        resume: resumeReducer,
        wallOfCode: wallOfCodeReducer,
        project: projectReducer,
        contactMe: contactMeReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch