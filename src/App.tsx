import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import AboutMe from "./screens/AppScreens/AboutMe";
import Experience from "./screens/AppScreens/Experience";
import Resume from "./screens/AppScreens/Resume";
import Projects from "./screens/AppScreens/Projects";
import ContactMe from "./screens/AppScreens/ContactMe";
import WebNavigation from "./screens/AppScreens/WebNavigation";
import MobileNavigation from "./screens/AppScreens/MobileNavigation";
import WallOfCode from "./screens/AppScreens/WallOfCode";
import Summary from "./screens/AppScreens/Summary";
import TopNavBar from "./components/TopNavBar";
import AdminPanel from "./screens/AdminScreens/AdminPanel";
import AdminSignup from "./screens/AdminScreens/AdminSignup";
import AdminLogin from "./screens/AdminScreens/AdminLogin";
import AdminHome from "./screens/AdminScreens/AdminHome";
import AdminProfile from "./screens/AdminScreens/AdminProfile";

const App = () => {
  const rightElementsArray = [
    <AboutMe key="aboutMe" />,
    <Experience key="experience" />,
    <Resume key="resume" />,
    <WallOfCode key="wallofcode" />,
    <Projects key="projects" />,
    <ContactMe key="contactMe" />,
    <Summary key="summary" />
  ];

  // Event tracker for the cursor light background
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  });

  return (
    <div className="min-h-screen min-w-full bg-darkblue text-gray-300">
      <Routes>
        <Route path='/' element={
          <AppLayout
            leftElement={<WebNavigation />}
            rightElements={rightElementsArray}
            mobileElement={<MobileNavigation />}
          />}
        />
        <Route path='/admin' element={
          <AdminLayout
            navbarElement={<TopNavBar />}
            childElement={<AdminPanel />}
          />}
        />
        <Route path='/admin/signup' element={
          <AdminLayout
            navbarElement={<TopNavBar />}
            childElement={<AdminSignup />}
          />}
        />
        <Route path='/admin/login' element={
          <AdminLayout
            navbarElement={<TopNavBar />}
            childElement={<AdminLogin />}
          />}
        />
        <Route path='/admin/profile' element={
          <AdminLayout
            navbarElement={<TopNavBar />}
            childElement={<AdminProfile />}
          />}
        />
        <Route path='/admin/home' element={
          <AdminLayout
            navbarElement={<TopNavBar />}
            childElement={<AdminHome />}
          />}
        />
      </Routes>
    </div>
  );
};

export default App;