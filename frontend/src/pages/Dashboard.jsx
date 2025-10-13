import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Wheat,
  Camera,
  Beaker,
  History,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const recentActivity = [
    {
      type: "crop",
      title: "Wheat Recommendation",
      date: "2 days ago",
      result: "92% success rate predicted",
    },
    {
      type: "disease",
      title: "Leaf Spot Detection",
      date: "1 week ago",
      result: "Treatment suggested: Copper fungicide",
    },
    {
      type: "crop",
      title: "Sugarcane Analysis",
      date: "2 weeks ago",
      result: "High yield potential identified",
    },
  ];

  // 👇 Your given quick actions list
  const quickActions = [
    {
      title: "Crop Recommendation",
      description: "Get AI-powered crop suggestions",
      icon: Wheat,
      action: () => navigate("/crop-recommendation"),
      bg: "bg-green-50",
      textColor: "green-800",
      iconColor: "green-600",
    },
    {
      title: "Disease Detection",
      description: "Upload leaf images for analysis",
      icon: Camera,
      action: () => navigate("/disease-detection"),
      bg: "bg-yellow-50",
      textColor: "yellow-800",
      iconColor: "yellow-500",
    },
    {
      title: "Soil Analysis",
      description: "Check soil health parameters",
      icon: Beaker,
      action: () => navigate("/soil-analysis"),
      bg: "bg-blue-50",
      textColor: "blue-800",
      iconColor: "blue-600",
    },
    {
      title: "View History",
      description: "See past recommendations",
      icon: History,
      action: () => navigate("/history"),
      bg: "bg-pink-50",
      textColor: "red-700",
      iconColor: "red-500",
    },
  ];

  const farmer = {
    name: "Rajesh Kumar",
    location: "Punjab, India",
    area: "12 acres",
  };

  const weatherData = [
    { label: "Temperature", value: "28°C", icon: Thermometer },
    { label: "Humidity", value: "65%", icon: Droplets },
    { label: "Wind", value: "12 km/h", icon: Wind },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className="max-w-5xl mx-auto p-6">
        {/* Farmer Profile */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-green-100">
          <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-700" />
            Your Profile
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-semibold">
              {farmer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{farmer.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {farmer.location}
              </p>
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-1">
                {farmer.area}
              </span>
            </div>
          </div>

          {/* Weather summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {weatherData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3"
              >
                <item.icon className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                  <p className="font-medium text-green-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.action}
                  className={`${action.bg} text-${action.text} rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105`}
                >
                  <Icon className={`h-7 w-7 text-${action.iconColor}`} />
                  <div className="text-center">
                    <p
                      className={`font-medium text-${action.textColor} text-sm`}
                    >
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Activity className="h-5 w-5 text-green-600" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-green-50 p-3 rounded-md"
              >
                <div
                  className={`p-2 rounded-full ${
                    activity.type === "crop" ? "bg-green-600" : "bg-yellow-500"
                  }`}
                >
                  {activity.type === "crop" ? (
                    <Wheat className="h-4 w-4 text-white" />
                  ) : (
                    <Leaf className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-500">{activity.result}</p>
                </div>
                <div className="text-sm text-gray-400">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
