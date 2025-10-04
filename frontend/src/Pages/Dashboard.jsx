// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  CropRecommendationForm,
  DiseaseDetectionForm,
  DashboardOverview,
  styles // Assuming styles is in the same component file for simplicity, but ideally should be in its own file
} from '../components/DashboardComponents'; 


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Crop Recommendation State
  const [cropForm, setCropForm] = useState({
    soil: '',
    water: '',
    season: '',
    cropName: ''
  });
  const [cropResult, setCropResult] = useState(null);

  // Disease Detection State
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);

  // Background Image Configuration (using file from public folder)
  const backgroundImageUrl = '/bg.png';

  // --- Initial Setup and Message Handling ---
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // --- API Handlers ---
  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCropResult(null);

    try {
      const response = await api.post('/crops/recommend', cropForm);
      setCropResult(response.data);
      showMessage('success', 'Crop recommendation generated successfully!');
    } catch (error) {
      console.error('Crop recommendation error:', error);
      showMessage('error', error.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  const handleDiseaseSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      showMessage('error', 'Please select an image first');
      return;
    }

    setLoading(true);
    setDiseaseResult(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await api.post('/disease/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setDiseaseResult(response.data);
      showMessage('success', 'Disease detection completed!');
    } catch (error) {
      console.error('Disease detection error:', error);
      showMessage('error', error.response?.data?.message || 'Failed to detect disease');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ ...styles.container, backgroundImage: `url(${backgroundImageUrl})` }}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.welcomeText}>
            Welcome back, {user?.name || 'User'}! 🌾
          </div>
          <div style={styles.subText}>
            Manage your crops and detect plant diseases with AI-powered tools
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div style={styles.message(message.type)}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            style={styles.tab(activeTab === 'home')} 
            onClick={() => setActiveTab('home')}
          >
            📊 Overview
          </button>
          <button 
            style={styles.tab(activeTab === 'crop')} 
            onClick={() => setActiveTab('crop')}
          >
            🌱 Crop Recommendation
          </button>
          <button 
            style={styles.tab(activeTab === 'disease')} 
            onClick={() => setActiveTab('disease')}
          >
            🔬 Disease Detection
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'home' && <DashboardOverview styles={styles} />}

        {activeTab === 'crop' && (
          <CropRecommendationForm
            styles={styles}
            cropForm={cropForm}
            setCropForm={setCropForm}
            handleCropSubmit={handleCropSubmit}
            loading={loading}
            cropResult={cropResult}
          />
        )}

        {activeTab === 'disease' && (
          <DiseaseDetectionForm
            styles={styles}
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            handleImageChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedImage(file);
                setImagePreview(URL.createObjectURL(file));
                setDiseaseResult(null);
              }
            }}
            handleDiseaseSubmit={handleDiseaseSubmit}
            loading={loading}
            diseaseResult={diseaseResult}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;