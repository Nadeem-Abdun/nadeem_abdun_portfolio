import React from 'react';
import AppLayout from './layout/AppLayout';
import AboutMe from './screens/AboutMe';
import Experience from './screens/Experience';
import Projects from './screens/Projects';
import ContactMe from './screens/ContactMe';
import LeftNavigation from './screens/LeftNavigation';

const App = () => {

  const rightElementsArray = [
    <AboutMe key="aboutMe" />,
    <Experience key="experience" />,
    <Projects key="projects" />,
    <ContactMe key="contactMe" />,
  ];

  return (
    <div className="min-h-screen bg-darkblue text-gray-300">
      <AppLayout
        leftElement={<LeftNavigation />}
        rightElements={rightElementsArray}
      />
    </div>
  );
};

export default App;