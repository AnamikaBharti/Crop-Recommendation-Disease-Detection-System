// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await authService.register(
        formData.name,
        formData.email,
        formData.password
      );

      // Backend returns {id, name, email, token}
      const { token, id, name, email } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, name, email, token }));

      navigate('/dashboard');
    } catch (err) {
      console.error(err.response); // logs actual backend error
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:'#f5f5f5' }}>
      <div style={{ width:'400px', padding:'20px', borderRadius:'8px', background:'white', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign:'center', marginBottom:'20px' }}>Register</h2>
        {error && <div style={{ color:'red', marginBottom:'15px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom:'15px' }}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom:'15px' }}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc' }} required />
          </div>
          <div style={{ marginBottom:'15px' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ width:'100%', padding:'8px', borderRadius:'4px', border:'1px solid #ccc' }} required minLength={6} />
          </div>
          <button type="submit" style={{ width:'100%', padding:'10px', borderRadius:'4px', border:'none', background:'blue', color:'white' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:'10px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
