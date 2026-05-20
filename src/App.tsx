import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import AdminLayout from './layout/AdminLayout';
import AboutMe from './screens/AppScreens/AboutMe';
import Experience from './screens/AppScreens/Experience';
import Resume from './screens/AppScreens/Resume';
import Projects from './screens/AppScreens/Projects';
import ContactMe from './screens/AppScreens/ContactMe';
import WebNavigation from './screens/AppScreens/WebNavigation';
import MobileNavigation from './screens/AppScreens/MobileNavigation';
import WallOfCode from './screens/AppScreens/WallOfCode';
import Summary from './screens/AppScreens/Summary';
import TopNavBar from './components/TopNavBar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './screens/AdminScreens/AdminPanel';
import AdminSignup from './screens/AdminScreens/AdminSignup';
import AdminLogin from './screens/AdminScreens/AdminLogin';
import AdminHome from './screens/AdminScreens/AdminHome';
import AdminProfile from './screens/AdminScreens/AdminProfile';
import { useDispatch } from 'react-redux';
import dataLoader from './utils/DataLoader';
import checkServerHealth from './utils/CheckServerHealth';
import {
  checkServerHealthFailure,
  checkServerHealthSuccess,
  resetCheckServerHealth,
  submitCheckServerHealth,
} from './redux/health/healthSlice';

const App = () => {
  const dispatch = useDispatch();
  const profileId = '6692a6e7a7900e23064b7c75';

  const rightElementsArray = [
    <AboutMe key="aboutMe" />,
    <Experience key="experience" />,
    <Resume key="resume" />,
    <WallOfCode key="wallofcode" />,
    <Projects key="projects" />,
    <ContactMe key="contactMe" />,
    <Summary key="summary" />,
  ];

  // Event tracker for the cursor light background
  const handleMouseMove = (e: MouseEvent) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  };

  // Event tracker for the cursor light background
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check server health and load data if server is up
  useEffect(() => {
    dispatch(resetCheckServerHealth());
    dispatch(submitCheckServerHealth());
    checkServerHealth().then(isServerUp => {
      if (isServerUp) {
        dispatch(checkServerHealthSuccess());
        dataLoader({ profileId, dispatch });
      } else {
        dispatch(checkServerHealthFailure());
        console.error('Server is down');
      }
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen min-w-full bg-darkblue text-gray-300">
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              leftElement={<WebNavigation />}
              rightElements={rightElementsArray}
              mobileElement={<MobileNavigation />}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminLayout
              navbarElement={<TopNavBar />}
              childElement={<AdminPanel />}
            />
          }
        />
        <Route
          path="/admin/signup"
          element={
            <AdminLayout
              navbarElement={<TopNavBar />}
              childElement={<AdminSignup />}
            />
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminLayout
              navbarElement={<TopNavBar />}
              childElement={<AdminLogin />}
            />
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminLayout
                navbarElement={<TopNavBar />}
                childElement={<AdminProfile />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <AdminLayout
                navbarElement={<TopNavBar />}
                childElement={<AdminHome />}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
