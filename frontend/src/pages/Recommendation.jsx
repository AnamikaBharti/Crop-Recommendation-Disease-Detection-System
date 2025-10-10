 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Import the hook

const Recommendation = () => {
  const { t } = useTranslation(); // 2. Get the translation function
  const navigate = useNavigate();

  // 🎨 Color Scheme (Unchanged)
  const textCream = "text-white";
  const bgTeal = "bg-[#004D40]";
  const bgGreen = "bg-[#F5FFFA]";
  const hoverGreen = "hover:bg-[#45a049]";
  const textDark = "text-[#00251a]";
  const borderGreen = "border-[#4CAF50]";
  const textGray = "text-gray-700";
  // 🔹 States
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    location: "",
  });

  // 3. Recommendation keys - The actual data is now in the JSON files
  const recommendationKeys = ["rice", "wheat", "sugarcane"];

  // 🧠 Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAutoFill = () => {
    setFormData({
      nitrogen: "45",
      phosphorus: "22",
      potassium: "38",
      ph: "6.8",
      temperature: "28",
      humidity: "65",
      rainfall: "850",
      location: "Punjab, India",
    });
    // Note: It's better to use a custom modal/toast instead of alert()
    alert(t('alert.autofillSuccess'));
  };

  const handleAnalyze = () => {
    if (Object.values(formData).some((value) => !value)) {
      alert(t('alert.fillAllFields'));
      return;
    }
    setStep(2);
    alert(t('alert.analysisComplete'));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return "bg-green-500";
    if (confidence >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Array of form fields to map over
  const formFields = [
    "nitrogen", "phosphorus", "potassium", "ph", 
    "temperature", "humidity", "rainfall", "location"
  ];

  return (
    <div className={`min-h-screen ${bgGreen} ${bgTeal} p-6`}>
      <header className="flex items-center justify-between mb-6">
      
        <h1 className="text-3xl font-bold text-center flex-1">
          🌾 {t('recommendation.title')}
        </h1>
      </header>

      {step === 1 && (
        <div
          className={`max-w-4xl mx-auto ${bgGreen} ${textDark} p-6 rounded-2xl shadow-lg border ${borderGreen}`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t('recommendation.formTitle')}
          </h2>

          <div className="flex justify-between items-center mb-6 bg-[#E8F5E9] p-4 rounded-lg border border-[#C8E6C9]">
            <div>
              <h3 className="font-semibold">{t('recommendation.autofillTitle')}</h3>
              <p className={`${textGray} text-sm`}>
                {t('recommendation.autofillDesc')}
              </p>
            </div>
            <button
              onClick={handleAutoFill}
              className={`px-4 py-2 rounded-md ${bgTeal} ${textCream} ${hoverGreen}`}
            >
              {t('common.autofill')}
            </button>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formFields.map((key) => (
              <div key={key} className="flex flex-col">
                <label className="font-semibold mb-1 capitalize">
                  {t(`formLabels.${key}`)}
                </label>
                <input
                  type="text"
                  className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  value={formData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={t('recommendation.placeholder')}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            className={`w-full mt-6 py-2 rounded-md font-semibold ${bgTeal} ${textCream} ${hoverGreen}`}
          >
            {t('recommendation.analyzeButton')}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-5xl mx-auto">
          {/* Summary */}
          <div
            className={`${bgGreen} ${textDark} rounded-2xl p-6 mb-8 border ${borderGreen}`}
          >
            <h2 className="text-2xl font-bold mb-2">
              {t('summary.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('summary.basedOn')} (N:{formData.nitrogen}, P:{formData.phosphorus}, K:
              {formData.potassium}, pH:{formData.ph}) {t('summary.andWeather')} {formData.location}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <p className="font-semibold">🌱 {t('summary.soilHealth')}</p>
                <p className="text-green-700 font-bold">{t('summary.good')}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="font-semibold">☀️ {t('summary.weather')}</p>
                <p className="text-blue-700 font-bold">{t('summary.favorable')}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <p className="font-semibold">💧 {t('summary.waterNeeds')}</p>
                <p className="text-yellow-700 font-bold">{t('summary.moderate')}</p>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg text-center">
                <p className="font-semibold">📅 {t('summary.bestSeason')}</p>
                <p className="text-pink-700 font-bold">{t('summary.kharif')}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            {t('results.title')}
          </h2>

          <div className="space-y-6">
            {recommendationKeys.map((key, i) => {
               const rec = t(`recommendations.${key}`, { returnObjects: true });
               return (
                <div
                  key={i}
                  className={`${bgGreen} ${textDark} p-6 rounded-2xl border ${borderGreen}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{rec.crop}</h3>
                      <p className="text-gray-700">{rec.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {t('results.confidence')}:{" "}
                        <span
                          className={`px-2 py-1 rounded-md text-white ${getConfidenceColor(
                            rec.confidence
                          )}`}
                        >
                          {rec.confidence}%
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-[#E8F5E9] p-3 rounded-lg">
                      <p className="font-semibold">🌾 {t('results.yield')}</p>
                      <p className="text-green-700 font-bold">{rec.expectedYield}</p>
                    </div>
                    <div className="bg-[#FFF8E1] p-3 rounded-lg">
                      <p className="font-semibold">💰 {t('results.profit')}</p>
                      <p className="text-yellow-700 font-bold">{rec.profit}</p>
                    </div>
                    <div className="bg-[#E3F2FD] p-3 rounded-lg">
                      <p className="font-semibold">⏳ {t('results.duration')}</p>
                      <p className="text-blue-700 font-bold">{rec.duration}</p>
                    </div>
                    <div className="bg-[#FCE4EC] p-3 rounded-lg">
                      <p className="font-semibold">💧 {t('results.water')}</p>
                      <p className="text-pink-700 font-bold">{rec.waterRequirement}</p>
                    </div>
                  </div>
                </div>
               )
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setStep(1)}
              className={`px-6 py-2 rounded-md border border-gray-500 ${hoverGreen}`}
            >
              {t('common.analyzeAgain')}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className={`px-6 py-2 rounded-md ${bgTeal} ${textCream} ${hoverGreen}`}
            >
              {t('common.backToDashboard')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;

