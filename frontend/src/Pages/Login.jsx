// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.login(formData.email, formData.password);
      
      console.log('Login successful:', res.data);

      // Backend returns {id, name, email, token}
      const { token, id, name, email } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, name, email }));

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response || err);
      
      if (err.response) {
        const { data, status } = err.response;
        
        if (status === 401) {
          setError('Invalid email or password');
        } else {
          setError(data.message || data.error || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      minHeight:'100vh', 
      backgroundColor:'#f5f5f5',
      padding:'20px'
    }}>
      <div style={{ 
        width:'100%',
        maxWidth:'400px', 
        padding:'30px', 
        borderRadius:'8px', 
        background:'white', 
        boxShadow:'0 2px 10px rgba(0,0,0,0.1)' 
      }}>
        <h2 style={{ textAlign:'center', marginBottom:'20px', color:'#333' }}>
          Welcome Back
        </h2>
        
        {error && (
          <div style={{ 
            color:'#d32f2f', 
            backgroundColor:'#ffebee',
            padding:'12px',
            borderRadius:'4px',
            marginBottom:'15px',
            fontSize:'14px'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:'15px' }}>
            <label style={{ display:'block', marginBottom:'5px', fontWeight:'500' }}>
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              style={{ 
                width:'100%', 
                padding:'10px', 
                borderRadius:'4px', 
                border:'1px solid #ccc',
                fontSize:'14px'
              }} 
              required 
              autoComplete="email"
            />
          </div>
          
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', marginBottom:'5px', fontWeight:'500' }}>
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              style={{ 
                width:'100%', 
                padding:'10px', 
                borderRadius:'4px', 
                border:'1px solid #ccc',
                fontSize:'14px'
              }} 
              required
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            style={{ 
              width:'100%', 
              padding:'12px', 
              borderRadius:'4px', 
              border:'none', 
              background: loading ? '#ccc' : '#2e7d32', 
              color:'white',
              fontSize:'16px',
              fontWeight:'500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }} 
            disabled={loading}
            onMouseOver={(e) => !loading && (e.target.style.background = '#1b5e20')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#2e7d32')}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{ textAlign:'center', marginTop:'20px', color:'#666' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'#2e7d32', textDecoration:'none', fontWeight:'500' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;