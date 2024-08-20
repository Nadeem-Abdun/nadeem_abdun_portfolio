import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ContactMe {
    _id?: string,
    visitorName?: string,
    visitorEmail?: string,
    visitorPhone?: string,
    visitorMessage?: string,
    userReplyMessage?: string,
};

export interface ContactMeState {
    contactMeForms: ContactMe[],
    loading?: boolean,
    success?: boolean | null,
};

const initialState: ContactMeState = {
    contactMeForms: [],
    loading: false,
    success: null,
};

export const contactMeSlice = createSlice({
    name: "ContactMe",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // Create Contact Form Actions
        submitCreateContactForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        createContactFormSuccess: (state, action: PayloadAction<ContactMe>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.contactMeForms?.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.contactMeForms[existingIndex] = action.payload;
            } else {
                state.contactMeForms.push(action.payload);
            }
        },
        createContactFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetCreateContactForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get Contact Forms Actions
        submitGetContactForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getContactFormSuccess: (state, action: PayloadAction<ContactMe[]>) => {
            state.loading = false;
            state.success = true;
            state.contactMeForms = action.payload;
        },
        getContactFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetContactForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Reply Contact Forms Actions
        submitReplyContactForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        replyContactFormSuccess: (state, action: PayloadAction<ContactMe>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.contactMeForms.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.contactMeForms[existingIndex] = action.payload;
            } else {
                state.contactMeForms.push(action.payload);
            }
        },
        replyContactFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetReplyContactForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Delete Contact Forms Actions
        submitDeleteContactForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        deleteContactFormSuccess: (state, action: PayloadAction<ContactMe>) => {
            state.loading = false;
            state.success = true;
            const existingIndex = state.contactMeForms.findIndex(form => form._id === action.payload._id);
            if (existingIndex >= 0) {
                state.contactMeForms.splice(existingIndex, 1);
            }
        },
        deleteContactFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetDeleteContactForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    }
});

// Generating actions against each reducer function
export const {
    loadData,
    submitCreateContactForm,
    createContactFormSuccess,
    createContactFormFailure,
    resetCreateContactForm,
    submitGetContactForm,
    getContactFormSuccess,
    getContactFormFailure,
    resetGetContactForm,
    submitReplyContactForm,
    replyContactFormSuccess,
    replyContactFormFailure,
    resetReplyContactForm,
    submitDeleteContactForm,
    deleteContactFormSuccess,
    deleteContactFormFailure,
    resetDeleteContactForm,
} = contactMeSlice.actions;

export default contactMeSlice.reducer;