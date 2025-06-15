import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Resume {
    _id?: string,
    resumeURL?: string,
    resumeStatus?: string,
};

export interface ResumeState {
    activeResume?: Resume,
    resumes: Resume[],
    loading?: boolean,
    success?: boolean | null,
};

const initialState: ResumeState = {
    activeResume: {
        _id: "",
        resumeURL: "",
        resumeStatus: "",
    },
    resumes: [
        {
            _id: "",
            resumeURL: "",
            resumeStatus: "InActive",
        }
    ],
    loading: false,
    success: null,
};

export const resumeSlice = createSlice({
    name: "Resume",
    initialState,
    reducers: {
        loadData: (state) => {

        },
        // Upload Resume Actions
        submitUploadResumeForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        uploadResumeFormSuccess: (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.success = true;
            if (state.resumes) {
                const existingIndex = state.resumes.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.resumes[existingIndex] = action.payload;
                } else {
                    state.resumes.push(action.payload);
                }
            }
        },
        uploadResumeFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetUploadResumeForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get Active Resume Actions
        submitGetActiveResumeForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getActiveResumeFormSuccess: (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.success = true;
            state.activeResume = action.payload;
        },
        getActiveResumeFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetActiveResumeForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Get All Resumes Actions
        submitGetAllResumesForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        getAllResumesFormSuccess: (state, action: PayloadAction<Resume[]>) => {
            state.loading = false;
            state.success = true;
            state.resumes = action.payload;
        },
        getAllResumesFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetGetAllResumesForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Update Resume Actions
        submitUpdateResumeForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        updateResumeFormSuccess: (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.success = true;
            if (state.resumes) {
                const existingIndex = state.resumes.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.resumes[existingIndex] = action.payload;
                } else {
                    state.resumes.push(action.payload);
                }
            }
        },
        updateResumeFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetUpdateResumeForm: (state) => {
            state.loading = false;
            state.success = null;
        },
        // Delete Resume Actions       
        submitDeleteResumeForm: (state) => {
            state.loading = true;
            state.success = null;
        },
        deleteResumeFormSuccess: (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.success = true;
            if (state.resumes) {
                const existingIndex = state.resumes.findIndex(form => form._id === action.payload._id);
                if (existingIndex >= 0) {
                    state.resumes.splice(existingIndex, 1);
                }
            }
        },
        deleteResumeFormFailure: (state) => {
            state.loading = false;
            state.success = false;
        },
        resetDeleteResumeForm: (state) => {
            state.loading = false;
            state.success = null;
        },
    }
});

// Generating actions against each reducer function
export const {
    loadData,
    submitUploadResumeForm,
    uploadResumeFormSuccess,
    uploadResumeFormFailure,
    resetUploadResumeForm,
    submitGetActiveResumeForm,
    getActiveResumeFormSuccess,
    getActiveResumeFormFailure,
    resetGetActiveResumeForm,
    submitGetAllResumesForm,
    getAllResumesFormSuccess,
    getAllResumesFormFailure,
    resetGetAllResumesForm,
    submitUpdateResumeForm,
    updateResumeFormSuccess,
    updateResumeFormFailure,
    resetUpdateResumeForm,
    submitDeleteResumeForm,
    deleteResumeFormSuccess,
    deleteResumeFormFailure,
    resetDeleteResumeForm,
} = resumeSlice.actions;

export default resumeSlice.reducer;
