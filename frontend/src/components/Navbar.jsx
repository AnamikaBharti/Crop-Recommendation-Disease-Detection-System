
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  navbar: { display: 'flex', padding: '10px 20px', backgroundColor: '#333', color: '#fff', justifyContent: 'space-between', alignItems: 'center' },
  link: { color: '#fff', marginLeft: '10px', textDecoration: 'none' },
  brand: { fontWeight: 'bold', fontSize: '18px' },
};

const Navbar = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>CropApp</div>
      <div>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
