import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UsersState {
    username?: string,
    email?: string,
    password?: string,
    profiles?: string[],
    loading?: boolean,
}

const initialState: UsersState = {
    username: "",
    email: "",
    password: "",
    profiles: [],
    loading: false
}

export const usersSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        loadData: (state) => {

        }
    },
});

// Action creators are generated for each case reducer function
export const { loadData } = usersSlice.actions;

export default usersSlice.reducer;