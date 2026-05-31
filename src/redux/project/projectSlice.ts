import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import FuelCalculatorImg from '../../assets/images/Fuel_Calculator.png';
import FindMyChefImg from '../../assets/images/Find_My_Chef.png';
import SilentPoolImg from '../../assets/images/SilentPool.png';

export interface Project {
  _id?: string;
  projectPicture?: string;
  title?: string;
  description?: string;
  skillsInvolved?: string[];
  websiteUrl?: string;
  repositoryUrl?: string;
  projectStatus?: string;
}

export interface ProjectState {
  projects?: Project[];
  loading?: boolean;
  success?: boolean | null;
}

const initialState: ProjectState = {
  projects: [
    {
      _id: '',
      projectPicture: SilentPoolImg,
      title: 'SilentPool',
      description:
        'SilentPool is a privacy-first messaging app for anonymous, encrypted, and ephemeral group conversations. Users get a random alias on launch, create or join private chat pools with a unique ID, and communicate in real time with AES-encrypted messages, no sign-up and no personal data required.',
      skillsInvolved: [
        'React Native',
        'Expo',
        'TypeScript',
        'React Native Paper',
        'Node.js',
        'Express',
        'MongoDB',
        'Socket.io',
      ],
      websiteUrl: '',
      repositoryUrl: 'https://github.com/Nadeem-Abdun/SilentPool',
      projectStatus: 'Active',
    },
    {
      _id: '',
      projectPicture: FindMyChefImg,
      title: 'Find My Chef!',
      description:
        'Find My Chef is a niche culinary job portal where restaurants hire by specialism - not generic listings. Chefs and owners get separate dashboards for browsing, posting, applying, and shortlisting across India, with rich filters for cuisine, city, and experience. Frontend-only showcase powered by a mock API and persisted client state.',
      skillsInvolved: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'shadcn/ui',
        'Redux Toolkit',
        'React Router',
        'React Hook Form',
        'Zod',
        'Vitest',
      ],
      websiteUrl: 'https://nadeem-abdun.github.io/find-my-chef/',
      repositoryUrl: 'https://github.com/Nadeem-Abdun/find-my-chef',
      projectStatus: 'Active',
    },
    {
      _id: '',
      projectPicture: FuelCalculatorImg,
      title: 'Fuel Calculator',
      description:
        'Fuel Calculator is a lightweight trip-planning web app that estimates how much fuel you need and what it will cost. Enter distance, fuel price, and vehicle mileage to get instant liters and rupee totals, then save trips with a title and start/destination labels for later review, all stored in the browser with no backend or account required.',
      skillsInvolved: [
        'React',
        'TypeScript',
        'Create React App',
        'Material UI (MUI)',
        'React Router',
        'LocalStorage',
      ],
      websiteUrl: 'https://nadeem-abdun.github.io/fuel-calculator-app/',
      repositoryUrl: 'https://github.com/Nadeem-Abdun/fuel-calculator-app',
      projectStatus: 'Active',
    },
  ],
  loading: false,
  success: null,
};

export const projectSlice = createSlice({
  name: 'Project',
  initialState,
  reducers: {
    loadData: () => {},
    // Create Project Actions
    submitCreateProjectForm: state => {
      state.loading = true;
      state.success = null;
    },
    createProjectFormSuccess: (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.success = true;
      if (state.projects) {
        const existingIndex = state.projects.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.projects[existingIndex] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
      }
    },
    createProjectFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetCreateProjectForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Get Project Actions
    submitGetProjectForm: state => {
      state.loading = true;
      state.success = null;
    },
    getProjectFormSuccess: (state, action: PayloadAction<Project[]>) => {
      state.loading = false;
      state.success = true;
      state.projects = action.payload;
    },
    getProjectFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetGetProjectForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Update Project Actions
    submitUpdateProjectForm: state => {
      state.loading = true;
      state.success = null;
    },
    updateProjectFormSuccess: (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.success = true;
      if (state.projects) {
        const existingIndex = state.projects.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.projects[existingIndex] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
      }
    },
    updateProjectFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetUpdateProjectForm: state => {
      state.loading = false;
      state.success = null;
    },
    // Delete Project Actions
    submitDeleteProjectForm: state => {
      state.loading = true;
      state.success = null;
    },
    deleteProjectFormSuccess: (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.success = true;
      if (state.projects) {
        const existingIndex = state.projects.findIndex(
          form => form._id === action.payload._id
        );
        if (existingIndex >= 0) {
          state.projects.splice(existingIndex, 1);
        }
      }
    },
    deleteProjectFormFailure: state => {
      state.loading = false;
      state.success = false;
    },
    resetDeleteProjectForm: state => {
      state.loading = false;
      state.success = null;
    },
  },
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
