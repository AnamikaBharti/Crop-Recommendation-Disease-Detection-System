// src/components/DashboardComponents.jsx

import React from 'react';

// --- STYLES (Moved from Dashboard.jsx) ---
export const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh', 
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed', 
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    backgroundBlendMode: 'lighten'
  },
  contentWrapper: { 
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    color: 'white',
    padding: '30px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  welcomeText: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  subText: {
    fontSize: '16px',
    opacity: 0.9
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '2px solid #e0e0e0'
  },
  tab: (active) => ({
    padding: '12px 24px',
    border: 'none',
    background: active ? '#2e7d32' : 'transparent',
    color: active ? 'white' : '#666',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    fontSize: '16px',
    fontWeight: active ? '600' : '400',
    transition: 'all 0.3s',
    marginBottom: '-2px'
  }),
  card: {
    background: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
    background: 'white'
  },
  button: {
    padding: '12px 24px',
    background: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed'
  },
  result: {
    marginTop: '30px',
    padding: '20px',
    background: '#f1f8e9',
    borderRadius: '8px',
    borderLeft: '4px solid #2e7d32'
  },
  resultTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: '15px'
  },
  resultItem: {
    marginBottom: '10px',
    fontSize: '14px',
    color: '#333'
  },
  imageUpload: {
    border: '2px dashed #ddd',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s',
    background: '#fafafa'
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '400px',
    marginTop: '20px',
    borderRadius: '8px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  statCard: {
    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
    padding: '30px',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  statLabel: {
    fontSize: '16px',
    opacity: 0.9
  },
  chartPlaceholder: {
    background: '#f0f0f0',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    color: '#333',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #999',
    fontSize: '18px'
  }
};


// --- 1. DASHBOARD OVERVIEW COMPONENT ---
export const DashboardOverview = ({ styles }) => (
  <div>
    <div style={styles.card}>
      <h2 style={{ marginTop: 0, color: '#2e7d32' }}>Dashboard Overview</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        Welcome to your agricultural management dashboard. Use our AI-powered tools for optimal farm health.
      </p>
    </div>

    {/* Section 1: Key Performance Indicators (KPIs) */}
    <div style={styles.statsGrid}>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>4</div>
        <div style={styles.statLabel}>Active Crop Cycles</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>92%</div>
        <div style={styles.statLabel}>Success Rate</div>
      </div>
      <div style={styles.statCard}>
        <div style={styles.statNumber}>2</div>
        <div style={styles.statLabel}>Diseases Detected (Last Month)</div>
      </div>
    </div>
    
    {/* Section 2: Visual Data (Chart Placeholder) - A key component of a medium dashboard */}
    <div style={{...styles.card, marginTop: '20px'}}>
      <h3 style={{color: '#2e7d32', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Yield and Health Trends</h3>
      <div style={styles.chartPlaceholder}>
        <p>
          [Placeholder for Chart Library: e.g., Monthly Yield vs. Disease Incidence]
        </p>
      </div>
    </div>

  </div>
);


// --- 2. CROP RECOMMENDATION FORM COMPONENT ---
export const CropRecommendationForm = ({ styles, cropForm, setCropForm, handleCropSubmit, loading, cropResult }) => (
  <div style={styles.card}>
    <h2 style={{ marginTop: 0, color: '#2e7d32' }}>🌱 Crop Recommendation</h2>
    <p style={{ color: '#666', marginBottom: '30px' }}>
      Get personalized crop recommendations based on your farming conditions
    </p>

    <form onSubmit={handleCropSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Soil Type</label>
        <select
          style={styles.select}
          value={cropForm.soil}
          onChange={(e) => setCropForm({ ...cropForm, soil: e.target.value })}
          required
        >
          <option value="">Select soil type</option>
          <option value="loamy">Loamy Soil</option>
          <option value="clayey">Clayey Soil</option>
          <option value="sandy">Sandy Soil</option>
          <option value="silty">Silty Soil</option>
          <option value="peaty">Peaty Soil</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Water Availability</label>
        <select
          style={styles.select}
          value={cropForm.water}
          onChange={(e) => setCropForm({ ...cropForm, water: e.target.value })}
          required
        >
          <option value="">Select water availability</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Season</label>
        <select
          style={styles.select}
          value={cropForm.season}
          onChange={(e) => setCropForm({ ...cropForm, season: e.target.value })}
          required
        >
          <option value="">Select season</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="monsoon">Monsoon</option>
          <option value="autumn">Autumn</option>
          <option value="spring">Spring</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Current Crop (Optional)</label>
        <input
          type="text"
          style={styles.input}
          value={cropForm.cropName}
          onChange={(e) => setCropForm({ ...cropForm, cropName: e.target.value })}
          placeholder="Enter crop name if applicable"
        />
      </div>

      <button 
        type="submit" 
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {})
        }}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Get Recommendation'}
      </button>
    </form>

    {/* Crop Result */}
    {cropResult && (
      <div style={styles.result}>
        <div style={styles.resultTitle}>📋 Recommendation Results</div>
        <div style={styles.resultItem}>
          <strong>Message:</strong> {cropResult.message}
        </div>
        {cropResult.data && (
          <>
            <div style={styles.resultItem}>
              <strong>Recommended Crop:</strong> {cropResult.data.recommendedCrop}
            </div>
            <div style={styles.resultItem}>
              <strong>Soil Type:</strong> {cropResult.data.soil}
            </div>
            <div style={styles.resultItem}>
              <strong>Water Level:</strong> {cropResult.data.water}
            </div>
            <div style={styles.resultItem}>
              <strong>Season:</strong> {cropResult.data.season}
            </div>
          </>
        )}
      </div>
    )}
  </div>
);


// --- 3. DISEASE DETECTION FORM COMPONENT ---
export const DiseaseDetectionForm = ({ styles, selectedImage, imagePreview, handleImageChange, handleDiseaseSubmit, loading, diseaseResult }) => (
  <div style={styles.card}>
    <h2 style={{ marginTop: 0, color: '#2e7d32' }}>🔬 Plant Disease Detection</h2>
    <p style={{ color: '#666', marginBottom: '30px' }}>
      Upload an image of your plant to detect potential diseases
    </p>

    <form onSubmit={handleDiseaseSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Upload Plant Image</label>
        <div 
          style={styles.imageUpload}
          onClick={() => document.getElementById('imageInput').click()}
        >
          {!imagePreview ? (
            <>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
              <div style={{ color: '#666' }}>Click to upload image</div>
              <div style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
                Supported formats: JPG, PNG, JPEG
              </div>
            </>
          ) : (
            <div>
              <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
              <div style={{ marginTop: '10px', color: '#666' }}>
                Click to change image
              </div>
            </div>
          )}
        </div>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <button 
        type="submit" 
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {})
        }}
        disabled={loading || !selectedImage}
      >
        {loading ? 'Analyzing...' : 'Detect Disease'}
      </button>
    </form>

    {/* Disease Result */}
    {diseaseResult && (
      <div style={styles.result}>
        <div style={styles.resultTitle}>🔍 Detection Results</div>
        <div style={styles.resultItem}>
          <strong>Message:</strong> {diseaseResult.message}
        </div>
        {diseaseResult.data && (
          <>
            <div style={styles.resultItem}>
              <strong>Detected Disease:</strong> {diseaseResult.data.disease}
            </div>
            <div style={styles.resultItem}>
              <strong>Confidence:</strong> {(diseaseResult.data.confidence * 100).toFixed(2)}%
            </div>
            <div style={styles.resultItem}>
              <strong>Image:</strong> {diseaseResult.data.filename}
            </div>
          </>
        )}
      </div>
    )}
  </div>
);