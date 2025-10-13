 import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Import your main App layout component
import App from '../App'; 
import Home from '../pages/home';
import Login from '../components/LoginModal';
import Recommendation from '../pages/Recommendation';
import DiseaseDetection from '../pages/DiseaseDetection';
import Dashboard from '../pages/Dashboard';


const AppRouter = () => (
  <Routes>
    {/* 3. This is the Layout Route. It uses App as the template. */}
      <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/detection" element={<DiseaseDetection />} />
      <Route path="/dashboard" element={<Dashboard />} />
     
    </Route>

    {/* GROUP 2: Standalone routes WITHOUT the Navbar and Footer */}
   
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<h1>404: Page Not Found</h1>} />
  </Routes>
);

export default AppRouter;