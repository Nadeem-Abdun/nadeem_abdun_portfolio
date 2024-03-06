import React from "react";
import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";
import AboutMe from "./screens/AppScreens/AboutMe";
import Experience from "./screens/AppScreens/Experience";
import Projects from "./screens/AppScreens/Projects";
import ContactMe from "./screens/AppScreens/ContactMe";
import WebNavigation from "./screens/AppScreens/WebNavigation";
import MobileNavigation from "./screens/AppScreens/MobileNavigation";
import WallOfCode from "./screens/AppScreens/WallOfCode";
import Summary from "./screens/AppScreens/Summary";
import AdminPanel from "./screens/AdminScreens/AdminPanel";
import AdminLogin from "./screens/AdminScreens/AdminLogin";
import AdminHome from "./screens/AdminScreens/AdminHome";
import { Route, Routes } from "react-router-dom";

const App = () => {

  const rightElementsArray = [
    <AboutMe key="aboutMe" />,
    <Experience key="experience" />,
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
            childElement={<AdminPanel />}
          />}
        />
        <Route path='/admin/login' element={
          <AdminLayout
            childElement={<AdminLogin />}
          />}
        />
        <Route path='/admin/home' element={
          <AdminLayout
            childElement={<AdminHome />}
          />}
        />
      </Routes>
    </div>
  );
};

export default App;