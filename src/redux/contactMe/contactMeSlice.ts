import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactMe {
    visitorName?: string,
    visitorEmail?: string,
    visitorPhone?: string,
    visitorMessage?: string,
}

export interface ContactMeState {
    contactMeForms: ContactMe[],
    loading?: boolean,
    success?: boolean | null,
}

const initialState: ContactMeState = {
    contactMeForms: [],
    loading: false,
    success: null,
}

export const contactMeSlice = createSlice({
    name: "ContactMe",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        submitForm: (state, action: PayloadAction<ContactMe>) => {
            state.loading = true;
            state.success = null;
            state.contactMeForms?.push(action.payload);
        },
        submitFormSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        submitFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetForm: (state) => {
            state.loading = false;
            state.success = null;
        }
        
    }
});

// Generating actions against each reducer function
export const { loadData, submitForm, submitFormSuccess, submitFormFailure, resetForm } = contactMeSlice.actions;

export default contactMeSlice.reducer;