 import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet

import Footer from './components/footer';
import { useState } from 'react';
import LoginModal from './components/LoginModal';
import Navbar from './components/Navbar';


function App() {
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const openLoginModal = () => setIsLoginModalOpen(true);
  return (
    <>
      <Navbar onLoginClick={openLoginModal} />
      <main className="content-area">
        {/* 2. The Outlet component renders the matched child route from your router file */}
        <Outlet />
         <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </main>
      <Footer />
    </>
  );
}

export default App;