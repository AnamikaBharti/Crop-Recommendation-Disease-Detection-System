// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field-specific error when user types
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await authService.register(
        formData.name,
        formData.email,
        formData.password
      );

      console.log('Registration successful:', res.data);

      // Backend returns {id, name, email, token}
      const { token, id, name, email } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, name, email }));

      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err.response || err);
      
      if (err.response) {
        const { data, status } = err.response;
        
        // Handle validation errors (400)
        if (status === 400 && data.fields) {
          setFieldErrors(data.fields);
          setError(data.message || 'Please correct the errors below');
        }
        // Handle email already exists (409)
        else if (status === 409) {
          setError(data.message || 'Email address is already registered');
        }
        // Handle other errors
        else {
          setError(data.message || data.error || 'Registration failed. Please try again.');
        }
      } else if (err.request) {
        // Network error
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
      padding: '20px'
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
          Create Account
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
              Name
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              style={{ 
                width:'100%', 
                padding:'10px', 
                borderRadius:'4px', 
                border: fieldErrors.name ? '1px solid #d32f2f' : '1px solid #ccc',
                fontSize:'14px'
              }} 
              required 
            />
            {fieldErrors.name && (
              <span style={{ color:'#d32f2f', fontSize:'12px', marginTop:'4px', display:'block' }}>
                {fieldErrors.name}
              </span>
            )}
          </div>
          
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
                border: fieldErrors.email ? '1px solid #d32f2f' : '1px solid #ccc',
                fontSize:'14px'
              }} 
              required 
            />
            {fieldErrors.email && (
              <span style={{ color:'#d32f2f', fontSize:'12px', marginTop:'4px', display:'block' }}>
                {fieldErrors.email}
              </span>
            )}
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
                border: fieldErrors.password ? '1px solid #d32f2f' : '1px solid #ccc',
                fontSize:'14px'
              }} 
              required 
              minLength={6} 
            />
            {fieldErrors.password && (
              <span style={{ color:'#d32f2f', fontSize:'12px', marginTop:'4px', display:'block' }}>
                {fieldErrors.password}
              </span>
            )}
            <span style={{ fontSize:'12px', color:'#666', marginTop:'4px', display:'block' }}>
              Must be at least 6 characters
            </span>
          </div>
          
          <button 
            type="submit" 
            style={{ 
              width:'100%', 
              padding:'12px', 
              borderRadius:'4px', 
              border:'none', 
              background: loading ? '#ccc' : '#1976d2', 
              color:'white',
              fontSize:'16px',
              fontWeight:'500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }} 
            disabled={loading}
            onMouseOver={(e) => !loading && (e.target.style.background = '#1565c0')}
            onMouseOut={(e) => !loading && (e.target.style.background = '#1976d2')}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p style={{ textAlign:'center', marginTop:'20px', color:'#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'#1976d2', textDecoration:'none', fontWeight:'500' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;