 import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import Navbar from './components/navbar';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <main className="content-area">
        {/* 2. The Outlet component renders the matched child route from your router file */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;