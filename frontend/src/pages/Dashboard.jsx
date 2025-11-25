// 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Leaf, MapPin, Thermometer, Droplets, Wind, Wheat,
  Camera, Beaker, History, Activity, ArrowLeft
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // --- STATE ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // History State
  const [historyData, setHistoryData] = useState([]);
  const [viewMode, setViewMode] = useState('recent'); // 'recent' or 'history'
  const [loadingHistory, setLoadingHistory] = useState(false);

  // --- API CONFIG ---
  // Use the env variable correctly
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // --- FETCH USER PROFILE ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${API_BASE}/api/user/profile`, config);
        setUser(response.data);
        
        // Fetch history immediately after user is confirmed
        fetchHistory(token);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        localStorage.removeItem('authToken');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // --- FETCH HISTORY ---
  const fetchHistory = async (token) => {
    setLoadingHistory(true);
    try {
      const response = await axios.get(`${API_BASE}/api/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistoryData(response.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // --- TOGGLE FUNCTION ---
  const toggleHistoryView = () => {
    if (viewMode === 'recent') {
      setViewMode('history');
      // Re-fetch to ensure latest data when expanding
      const token = localStorage.getItem('authToken');
      if(token) fetchHistory(token);
    } else {
      setViewMode('recent');
    }
  };

  // --- HELPER: Format History Item ---
  const getHistoryItemDisplay = (item) => {
    // Backend returns: { type: "CROP" or "DISEASE", result: "Rice", timestamp: "..." }
    const isCrop = item.type === "CROP";
    return {
      title: isCrop ? "Crop Recommendation" : "Disease Detection",
      result: item.result,
      date: new Date(item.timestamp).toLocaleDateString(),
      icon: isCrop ? Wheat : Leaf,
      bg: isCrop ? "bg-green-600" : "bg-yellow-500"
    };
  };

  // --- DATA PREPARATION ---
  // If viewMode is 'recent', take top 3. If 'history', take all.
  const displayedActivity = viewMode === 'recent' ? historyData.slice(0, 3) : historyData;

  // --- STATIC DATA (Weather) ---
  const weatherData = [
    { label: t('dashboard.weather.temperature'), value: "28°C", icon: Thermometer },
    { label: t('dashboard.weather.humidity'), value: "65%", icon: Droplets },
    { label: t('dashboard.weather.wind'), value: "12 km/h", icon: Wind },
  ];

  // --- QUICK ACTIONS ---
  const quickActions = [
    { 
      title: t('dashboard.quickActions.crop.title'), 
      description: t('dashboard.quickActions.crop.description'), 
      icon: Wheat, 
      action: () => navigate("/recommendation"), 
      bg: "bg-green-50", textColor: "green-800", iconColor: "green-600" 
    },
    { 
      title: t('dashboard.quickActions.disease.title'), 
      description: t('dashboard.quickActions.disease.description'), 
      icon: Camera, 
      action: () => navigate("/detection"), 
      bg: "bg-yellow-50", textColor: "yellow-800", iconColor: "yellow-500" 
    },
    { 
      title: t('dashboard.quickActions.soil.title'), 
      description: t('dashboard.quickActions.soil.description'), 
      icon: Beaker, 
      action: () => navigate("/soil-analysis"), 
      bg: "bg-blue-50", textColor: "blue-800", iconColor: "blue-600" 
    },
    { 
      // ✅ CHANGED: This now toggles view instead of navigating
      title: viewMode === 'recent' ? t('dashboard.quickActions.history.title') : "Back to Dashboard", 
      description: viewMode === 'recent' ? t('dashboard.quickActions.history.description') : "Show less activity", 
      icon: viewMode === 'recent' ? History : ArrowLeft, 
      action: toggleHistoryView, 
      bg: "bg-pink-50", textColor: "red-700", iconColor: "red-500" 
    },
  ];

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">{t('dashboard.loading')}</div>;
  }
  if (!user) {
    return <div className="min-h-screen flex justify-center items-center">{t('dashboard.error')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto p-6">
        
        {/* Farmer Profile Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100">
          <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-700" />
            {t('dashboard.profileTitle')}
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-semibold">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.location || t('dashboard.locationNotSet')}
              </p>
            </div>
          </div>
          {/* Weather summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weatherData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                <item.icon className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-medium text-green-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            {t('dashboard.quickActionsTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button key={idx} onClick={action.action} className={`${action.bg} rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105`}>
                  <Icon className={`h-7 w-7 ${action.iconColor}`} />
                  <div className="text-center">
                    <p className={`font-medium ${action.textColor} text-sm`}>{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent Activity / Full History Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Activity className="h-5 w-5 text-green-600" /> 
              {viewMode === 'recent' ? t('dashboard.recentActivityTitle') : "Full Activity History"}
            </h3>
            
            {/* Optional: Small View All link if in recent mode */}
            {viewMode === 'recent' && historyData.length > 3 && (
              <button onClick={toggleHistoryView} className="text-sm text-green-600 hover:underline">
                View All
              </button>
            )}
          </div>

          <div className="space-y-4">
            {loadingHistory ? (
              <p className="text-gray-500 text-center py-4">Loading history...</p>
            ) : displayedActivity.length > 0 ? (
              displayedActivity.map((item, index) => {
                const display = getHistoryItemDisplay(item);
                return (
                  <div key={item.id || index} className="flex items-center gap-4 bg-green-50 p-3 rounded-md hover:bg-green-100 transition-colors">
                    <div className={`p-2 rounded-full ${display.bg}`}>
                      <display.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{display.title}</h4>
                      <p className="text-sm text-gray-500">{display.result}</p>
                    </div>
                    <div className="text-sm text-gray-400 whitespace-nowrap">
                      {display.date}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>{t('dashboard.noActivity')}</p>
                {viewMode === 'history' && <p className="text-xs mt-1">Go detect some diseases or get crop recommendations!</p>}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}