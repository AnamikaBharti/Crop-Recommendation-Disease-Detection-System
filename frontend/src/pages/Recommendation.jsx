import React, { useState } from "react";
import axios from "axios"; // ✅ Import Axios
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beaker, Leaf, MapPin, Droplets, Thermometer, CloudRain,
  Sun, Calendar, DollarSign, Wheat, Award, RefreshCw, Loader2 // Added Loader icon
} from "lucide-react";

const customStyles = `
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type='number'] { -moz-appearance: textfield; }
`;

const Label = ({ children, ...props }) => ( <label className="text-sm font-medium text-gray-600 block mb-1" {...props}>{children}</label> );
const Input = (props) => ( <input className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all shadow-sm" {...props} /> );

const colorClasses = {
  green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', valueText: 'text-green-800' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', valueText: 'text-blue-800' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', valueText: 'text-yellow-800' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', valueText: 'text-pink-800' }
};

const Recommendation = () => {
  const { t } = useTranslation();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nitrogen: "", phosphorus: "", potassium: "", ph: "",
    temperature: "", humidity: "", rainfall: "", location: "",
  });

  // ✅ New State for API Data
  const [apiResult, setApiResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => { setFormData((prev) => ({ ...prev, [field]: value })); };
  
  const handleAutoFill = () => {
    setFormData({
      nitrogen: "90", phosphorus: "42", potassium: "43", ph: "6.5",
      temperature: "25", humidity: "80", rainfall: "200", location: "Punjab, India",
    });
    alert(t('alert.autofillSuccess'));
  };

  // ✅ Updated Analyze Function to Call Java API
  const handleAnalyze = async () => {
    if (Object.values(formData).some((value) => !value)) {
      alert(t('alert.fillAllFields'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Map frontend state names to backend DTO names (N, P, K)
      const payload = {
        N: parseInt(formData.nitrogen),
        P: parseInt(formData.phosphorus),
        K: parseInt(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      };

     // 1. Check for Token
      const token = localStorage.getItem("authToken");

      // 2. Prepare Config
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }

      // 3. Send Request with Config
      const response = await axios.post("http://localhost:8080/api/recommend", payload, config);
      
      // Set the real data from backend
      setApiResult(response.data.top_crops); 
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server. Please check if backend is running.");
      alert("Error connecting to server!");
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidenceStr) => {
    // Remove '%' and convert to number
    const confidence = parseFloat(confidenceStr.replace('%', ''));
    if (confidence >= 85) return "bg-green-100 text-green-800 border-green-300";
    if (confidence >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Adjusted threshold
    return "bg-red-100 text-red-800 border-red-300";
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
        
          {step === 1 && (
            <motion.div
              key="form"
              initial="initial" animate="in" exit="out" variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto bg-white text-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200"
            >
                 <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">{t('formSections.mainTitle')}</h1>
                <p className="text-gray-500 mt-2 text-lg">{t('formSections.mainSubtitle')}</p>
              </div>

              <div className="flex justify-between items-center mb-8 bg-green-50 p-4 rounded-lg border border-green-200">
                <div>
                  <h3 className="font-semibold text-green-800">{t('recommendation.autofillTitle')}</h3>
                  <p className="text-gray-600 text-sm">{t('recommendation.autofillDesc')}</p>
                </div>
                <button
                  onClick={handleAutoFill}
                  className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-sm"
                >
                  {t('common.autofill')}
                </button>
              </div>

              <div className="space-y-8">
                <FormSection icon={<Leaf className="text-green-600"/>} title={t('formSections.nutrients')}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="nitrogen">{t('formLabels.nitrogen')}</Label>
                      <Input id="nitrogen" type="number" placeholder={t('formPlaceholders.nitrogen')} value={formData.nitrogen} onChange={(e) => handleInputChange("nitrogen", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="phosphorus">{t('formLabels.phosphorus')}</Label>
                      <Input id="phosphorus" type="number" placeholder={t('formPlaceholders.phosphorus')} value={formData.phosphorus} onChange={(e) => handleInputChange("phosphorus", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="potassium">{t('formLabels.potassium')}</Label>
                      <Input id="potassium" type="number" placeholder={t('formPlaceholders.potassium')} value={formData.potassium} onChange={(e) => handleInputChange("potassium", e.target.value)} />
                    </div>
                  </div>
                </FormSection>

                <FormSection icon={<Beaker className="text-blue-600"/>} title={t('formSections.ph')}>
                  <Input type="number" step="0.1" placeholder={t('formPlaceholders.ph')} value={formData.ph} onChange={(e) => handleInputChange("ph", e.target.value)} />
                </FormSection>

                <FormSection icon={<Thermometer className="text-orange-600"/>} title={t('formSections.weather')}>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="temperature">{t('formLabels.temperature')}</Label>
                      <Input id="temperature" type="number" placeholder={t('formPlaceholders.temperature')} value={formData.temperature} onChange={(e) => handleInputChange("temperature", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="humidity">{t('formLabels.humidity')}</Label>
                      <Input id="humidity" type="number" placeholder={t('formPlaceholders.humidity')} value={formData.humidity} onChange={(e) => handleInputChange("humidity", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="rainfall">{t('formLabels.rainfall')}</Label>
                      <Input id="rainfall" type="number" placeholder={t('formPlaceholders.rainfall')} value={formData.rainfall} onChange={(e) => handleInputChange("rainfall", e.target.value)} />
                    </div>
                  </div>
                </FormSection>

                <FormSection icon={<MapPin className="text-red-600"/>} title={t('formSections.location')}>
                  <Input type="text" placeholder={t('formPlaceholders.location')} value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} />
                </FormSection>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading} // Disable while loading
                className="w-full mt-10 py-3 rounded-lg font-semibold text-lg bg-[#004D40] text-white hover:bg-teal-800 transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  t('recommendation.analyzeButton')
                )}
              </button>
            </motion.div>
          )}

        
          {step === 2 && (
            <motion.div
              key="results"
              initial="initial" animate="in" exit="out" variants={pageVariants}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-white text-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold mb-3">{t('summary.title')}</h2>
                <p className="text-gray-600 mb-6">
                  {t('summary.basedOn')} (N:{formData.nitrogen}, P:{formData.phosphorus}, K:{formData.potassium}, pH:{formData.ph}) {t('summary.andWeather')} {formData.location}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <SummaryCard icon={<Wheat className="text-green-700"/>} title={t('summary.soilHealth')} value={t('summary.good')} color="green" />
                  <SummaryCard icon={<Sun className="text-blue-700"/>} title={t('summary.weather')} value={t('summary.favorable')} color="blue" />
                  <SummaryCard icon={<Droplets className="text-yellow-700"/>} title={t('summary.waterNeeds')} value={t('summary.moderate')} color="yellow" />
                  <SummaryCard icon={<Calendar className="text-pink-700"/>} title={t('summary.bestSeason')} value={t('summary.kharif')} color="pink" />
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{t('results.title')}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ✅ Use Real API Results here */}
                {apiResult.map((resultItem, i) => {
                  // We use the crop name from API (e.g., "rice") to find translation
                  const cropKey = resultItem.crop.toLowerCase();
                  const rec = t(`recommendations.${cropKey}`, { returnObjects: true });
                  
                  // Fallback if translation is missing for a specific crop
                  const displayRec = rec && rec.crop ? rec : {
                    crop: resultItem.crop,
                    description: "Optimized for your soil conditions.",
                    expectedYield: "High",
                    profit: "High",
                    duration: "Standard",
                    waterRequirement: "Medium"
                  };

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 relative"
                    >
                      {i === 0 && (
                        <div className="absolute top-0 right-4 -mt-4 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-md">
                          <Award className="h-4 w-4 mr-1.5" />
                          {t('results.bestMatch')}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold capitalize">{displayRec.crop}</h3>
                          <p className="text-gray-600 text-sm mt-1">{displayRec.description}</p>
                        </div>
                        {/* Use confidence from API */}
                        <div className={`text-sm font-semibold px-3 py-1.5 rounded-full border ${getConfidenceColor(resultItem.confidence)}`}>
                          {resultItem.confidence}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                        <StatCard icon={<Wheat className="text-green-700"/>} title={t('results.yield')} value={displayRec.expectedYield} color="green" />
                        <StatCard icon={<DollarSign className="text-yellow-700"/>} title={t('results.profit')} value={displayRec.profit} color="yellow" />
                        <StatCard icon={<Calendar className="text-blue-700"/>} title={t('results.duration')} value={displayRec.duration} color="blue" />
                        <StatCard icon={<Droplets className="text-pink-700"/>} title={t('results.water')} value={displayRec.waterRequirement} color="pink" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-gray-800 font-semibold hover:bg-gray-100 border border-gray-300 transition-colors shadow-sm"
                >
                  <RefreshCw className="h-5 w-5" />
                  {t('common.backToAnalysis')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const FormSection = ({ icon, title, children }) => (
  <div className="border-t border-gray-200 pt-6">
    <h3 className="flex items-center text-xl font-semibold mb-4 text-gray-700">
      <span className="mr-3">{icon}</span> {title}
    </h3>
    {children}
  </div>
);

const SummaryCard = ({ icon, title, value, color }) => {
  const classes = colorClasses[color] || colorClasses.green; 
  return (
    <div className={`${classes.bg} p-4 rounded-lg text-center flex flex-col items-center justify-center border ${classes.border}`}>
      <div className="mb-2">{icon}</div>
      <p className="font-semibold text-gray-700 text-sm">{title}</p>
      <p className={`font-bold text-lg ${classes.text}`}>{value}</p>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const classes = colorClasses[color] || colorClasses.green; 
  return (
    <div className={`${classes.bg} p-4 rounded-lg`}>
      <div className="flex items-center justify-center gap-2 mb-1">
        {icon}
        <p className="font-semibold text-sm text-gray-700">{title}</p>
      </div>
      <p className={`font-bold text-lg ${classes.valueText}`}>{value}</p>
    </div>
  );
};

export default Recommendation;