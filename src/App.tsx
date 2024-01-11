import React from 'react';
import AppLayout from './layout/AppLayout';
import AboutMe from './screens/AboutMe';
import Experience from './screens/Experience';
import Projects from './screens/Projects';
import ContactMe from './screens/ContactMe';
import NavigationPanel from './screens/NavigationPanel';

const App = () => {

  const rightElementsArray = [
    <AboutMe key="aboutMe" />,
    <Experience key="experience" />,
    <Projects key="projects" />,
    <ContactMe key="contactMe" />,
  ];

  // Event tracker for the cursor light background
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
  });

  return (
    <div className="min-h-screen bg-darkblue text-gray-300">
      <AppLayout
        leftElement={<NavigationPanel />}
        rightElements={rightElementsArray}
      />
    </div>
  );
};

export default App;