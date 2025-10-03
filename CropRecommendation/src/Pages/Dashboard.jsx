
// ==================== src/pages/Dashboard.jsx ====================
const Dashboard = () => {
  const user = authService.getCurrentUser();

  return (
    <div style={styles.container}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Email: {user?.email}</p>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>🌾 Crop Recommendation</h3>
          <p>Get personalized crop recommendations based on soil and climate data.</p>
          <Link to="/crop-recommend" style={styles.cardLink}>Go to Recommendations</Link>
        </div>
        <div style={styles.card}>
          <h3>🔬 Disease Detection</h3>
          <p>Upload plant images to detect diseases using AI.</p>
          <Link to="/disease-detect" style={styles.cardLink}>Detect Disease</Link>
        </div>
      </div>
    </div>
  );
};
