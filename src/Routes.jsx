// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
// import Dashboard from './components/Dashboard';
// import Settings from './components/Settings';
import SpinningCube from './Components/SpinningCube';
import RotatingCube from './Components/RotatingCube';
import ScrollingPage from './Components/ScrollingPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SpinningCube />} />
      <Route path='rotating-cube' element={<RotatingCube />} />
      <Route path='/scrolling-page' element={<ScrollingPage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
};

export default App;
