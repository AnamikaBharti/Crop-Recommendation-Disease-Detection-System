 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Leaf, MapPin, Thermometer, Droplets, Wind, Wheat,
  Camera, Beaker, History, Activity,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State to hold dynamic data fetched from the backend
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This data will eventually come from another backend endpoint.
  // For now, it remains hardcoded.
  const recentActivity = [
    { type: "crop", title: "Wheat Recommendation", date: "2 days ago", result: "92% success rate predicted" },
    { type: "disease", title: "Leaf Spot Detection", date: "1 week ago", result: "Treatment suggested: Copper fungicide" },
    { type: "crop", title: "Sugarcane Analysis", date: "2 weeks ago", result: "High yield potential identified" },
  ];

  // UI data arrays are defined inside the component to use the 't' function
  const quickActions = [
    { title: t('dashboard.quickActions.crop.title'), description: t('dashboard.quickActions.crop.description'), icon: Wheat, action: () => navigate("/recommendation"), bg: "bg-green-50", textColor: "green-800", iconColor: "green-600" },
    { title: t('dashboard.quickActions.disease.title'), description: t('dashboard.quickActions.disease.description'), icon: Camera, action: () => navigate("/detection"), bg: "bg-yellow-50", textColor: "yellow-800", iconColor: "yellow-500" },
    { title: t('dashboard.quickActions.soil.title'), description: t('dashboard.quickActions.soil.description'), icon: Beaker, action: () => navigate("/soil-analysis"), bg: "bg-blue-50", textColor: "blue-800", iconColor: "blue-600" },
    { title: t('dashboard.quickActions.history.title'), description: t('dashboard.quickActions.history.description'), icon: History, action: () => navigate("/history"), bg: "bg-pink-50", textColor: "red-700", iconColor: "red-500" },
  ];

  const weatherData = [
    { label: t('dashboard.weather.temperature'), value: "28°C", icon: Thermometer },
    { label: t('dashboard.weather.humidity'), value: "65%", icon: Droplets },
    { label: t('dashboard.weather.wind'), value: "12 km/h", icon: Wind },
  ];

 
  useEffect(() => {
    const fetchUserProfile = async () => {
    
      const token = localStorage.getItem('authToken');
      if (!token) {
        // If there's no token, the user isn't logged in, so redirect them.
        navigate('/login');
        return;
      }

      try {
      
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`;
        const response = await axios.get(API_URL, config);
        setUser(response.data);

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
              {/* Initials are now generated from the fetched user's name */}
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              {/* Display the fetched user's name */}
              <h3 className="font-medium text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {/* Display the fetched user's location */}
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

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Activity className="h-5 w-5 text-green-600" /> {t('dashboard.recentActivityTitle')}
          </h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 bg-green-50 p-3 rounded-md">
                <div className={`p-2 rounded-full ${activity.type === "crop" ? "bg-green-600" : "bg-yellow-500"}`}>
                  {activity.type === "crop" ? <Wheat className="h-4 w-4 text-white" /> : <Leaf className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-500">{activity.result}</p>
                </div>
                <div className="text-sm text-gray-400">{activity.date}</div>
              </div>
            )) : <p className="text-gray-500">{t('dashboard.noActivity')}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}