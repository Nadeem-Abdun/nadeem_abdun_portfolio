import React from 'react';
import AppLayout from './layout/AppLayout';
import AdminLayout from './layout/AdminLayout';
import AboutMe from './screens/AboutMe';
import Experience from './screens/Experience';
import Projects from './screens/Projects';
import ContactMe from './screens/ContactMe';
import WebNavigation from './screens/WebNavigation';
import MobileNavigation from './screens/MobileNavigation';
import AdminPanel from './screens/AdminPanel';
import AdminLogin from './screens/AdminLogin';
import AdminHome from './screens/AdminHome';
import Summary from './screens/Summary';
import WallOfCode from './screens/WallOfCode';
import { Route, Routes } from 'react-router-dom';

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