# Nadeem Abdun - Portfolio

A personal portfolio web application showcasing professional experience, projects, skills, and resume. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

## Live Demo

Deployed on Vercel — backend hosted on Render.

## Tech Stack

| Layer            | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Framework        | React 19 + TypeScript                          |
| Build Tool       | Vite 6                                         |
| Styling          | Tailwind CSS v4, Material UI v7 (MUI), Emotion |
| State Management | Redux Toolkit + React Redux                    |
| Routing          | React Router DOM v7                            |
| Charts           | Recharts                                       |
| Fonts            | Inter (via @fontsource)                        |
| Effects          | typewriter-effect, react-responsive            |
| HTTP             | Native fetch (custom CommunicationModule)      |
| Testing          | Vitest + Testing Library + jsdom               |
| Code Quality     | ESLint 9, Prettier, Husky, lint-staged         |
| Minification     | Terser                                         |

## Features

### Public Portfolio (Single-Page Scroll)

- **Hero / Navigation** — Name, animated typewriter roles, tagline, social links, and scroll-to-section navigation. First letter of the name is a hidden easter egg linking to the admin panel.
- **About Me** — Profile picture with gradient background and bio text. Two-column layout on desktop, stacked on mobile.
- **Experience** — Job history cards filtered by active status and sorted by date (newest first). Displays role, organization, responsibilities, and tech skill tags.
- **Resume** — PDF viewer rendering the active resume from the backend. Download functionality available.
- **Wall of Code** — Skills grid with custom SVG icons.
- **Projects** — Project cards with images, descriptions, tech tags, and links to live sites and repositories. Filtered by active status.
- **Contact Me** — Visitor contact form that posts to the backend API with success/error alerts.
- **Summary** — Footer with closing tagline and copyright.

### Admin Panel

- **Authentication** — Signup, login, and logout with session persistence via sessionStorage.
- **Profile** — View user details with auto-fetch on login.
- **Dashboard** — Analytics with Recharts (pie/gauge charts) and CRUD management cards for all portfolio sections (About, Experience, Resume, Skills, Projects, Contact Forms).
- **Session-Aware Navigation** — TopNavBar adapts menu items based on login state, shows avatar with username fallback, and handles proper navigation/logout flows.

### UX & Design

- **Cursor-Following Glow** — Radial gradient that follows the mouse cursor across the page.
- **Responsive Design** — Adaptive layouts for desktop (xl/lg), tablet (md), and mobile (sm/xs) using react-responsive breakpoints.
- **Conditional Social Icons** — GitHub, LinkedIn, Discord, Twitter/X, and Email icons only render when their URLs are available.
- **Custom Scrollbar** — Styled cyan scrollbar with matching track and buttons.
- **Centralized Data Loading** — All portfolio data (profile, experiences, resume, skills, projects) loaded in parallel on app mount via DataLoader.

## Project Structure

```
src/
├── assets/             # SVG icons and image imports
├── components/
│   ├── AdminComponents/  # CRUD cards, analytics chart
│   └── AppComponents/    # ExperienceCard, ProjectCard, SkillCard
├── layout/             # AppLayout (split-column), AdminLayout
├── redux/              # Store + slices (users, profile, experience, resume, wallOfCode, project, contactMe)
├── screens/
│   ├── AdminScreens/   # AdminPanel, AdminSignup, AdminLogin, AdminProfile, AdminHome
│   └── AppScreens/     # WebNavigation, MobileNavigation, AboutMe, Experience, Resume, WallOfCode, Projects, ContactMe, Summary
├── services/           # EndPoints, CommunicationModule, ServiceControllers
├── styles/             # tailwind.css, screenStyles.css, componentStyles.css
├── upcoming/           # Prototype components (vertical timeline Experience)
├── utils/              # Breakpoints, DataLoader, SessionManager, DateFormatter, SecureHttp, etc.
├── App.tsx             # Routes and cursor effect
└── main.tsx            # Entry point with Redux Provider and BrowserRouter
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

### Code Quality

```bash
# Lint
npm run lint

# Lint and fix
npm run lint:fix

# Format
npm run format

# Fix all (lint + format)
npm run fix-all

# Type check
npm run type-check
```

## Backend

The portfolio connects to a REST API hosted on Render:

**Base URL:** `https://nadeem-abdun-portfolio-backend.onrender.com/api/v1`

Endpoints cover user auth, profile CRUD, experience, resume upload/download, skills, projects, and contact form management. Authenticated requests use cookie-based credentials.

## License

MIT
