 import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, Camera, Upload, Leaf, AlertTriangle,
  CheckCircle, Info, Shield, Zap
} from "lucide-react";

const DiseaseDetection = () => {
  const { t, i18n} = useTranslation();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // In a real app, this key would come from API response
  const [resultKey] = useState("lateBlight"); 
  const [confidence] = useState(87);

  // Fetch translated data based on the result key
  const detectionResult = {
    disease: t(`resultsdisease.${resultKey}.disease`),
    description: t(`resultsdisease.${resultKey}.description`),
    symptoms: t(`resultsdisease.${resultKey}.symptoms`, { returnObjects: true }),
    treatments: t(`resultsdisease.${resultKey}.treatments`, { returnObjects: true }),
    prevention: t(`resultsdisease.${resultKey}.prevention`, { returnObjects: true }),
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert(t("diseaseDetection.alerts.fileTooLarge"));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setAnalysisComplete(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      alert(t("diseaseDetection.alerts.noImage"));
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      alert(t("diseaseDetection.alerts.analysisComplete"));
    }, 3000);
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case "immediate":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "soon":
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!selectedImage && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Upload className="h-5 w-5" /> {t('diseaseDetection.uploadTitle')}
            </h2>
            <p className="text-gray-600 mb-4">{t('diseaseDetection.uploadSubtitle')}</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">{t('diseaseDetection.dropzoneTitle')}</p>
              <p className="text-gray-500 mb-6">{t('diseaseDetection.dropzoneSubtitle')}</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Upload className="h-4 w-4 inline mr-2" />
                {t('diseaseDetection.chooseImage')}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
                <Leaf className="h-4 w-4 text-green-700 mt-1" />
                <p className="text-green-800 text-sm">
                  <strong>{t('diseaseDetection.tip1Title')}</strong> {t('diseaseDetection.tip1Text')}
                </p>
              </div>
              <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
                <Camera className="h-4 w-4 text-green-700 mt-1" />
                <p className="text-green-800 text-sm">
                  <strong>{t('diseaseDetection.tip2Title')}</strong> {t('diseaseDetection.tip2Text')}
                </p>
              </div>
              <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
                <Shield className="h-4 w-4 text-green-700 mt-1" />
                <p className="text-green-800 text-sm">
                  <strong>{t('diseaseDetection.tip3Title')}</strong> {t('diseaseDetection.tip3Text')}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedImage && !analysisComplete && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold">{t('diseaseDetection.previewTitle')}</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img src={selectedImage} alt="Uploaded leaf" className="w-full md:w-1/2 h-64 object-cover rounded-lg border" />
              <div className="flex-1 space-y-4">
                {isAnalyzing ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      <span className="font-medium">{t('diseaseDetection.analyzing')}</span>
                    </div>
                    <p className="text-sm text-gray-600">{t('diseaseDetection.analyzingSubtitle')}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button onClick={handleAnalyze} className="w-full bg-green-600 border-gray-300 shadow-md text-white py-2 rounded hover:bg-green-700">
                      <Leaf className="h-4 w-4 inline mr-2" />
                      {t('diseaseDetection.analyzeButton')}
                    </button>
                    <button onClick={() => setSelectedImage(null)} className="w-full border border-gray-300 shadow-md py-2 rounded hover:bg-gray-100">
                      {t('diseaseDetection.uploadDifferentButton')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {analysisComplete && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                 Disease Detection Result
              </h2>
              <div className="flex gap-6 mb-6">
                <img src={selectedImage} alt="Analyzed leaf" className="w-32 h-32 object-cover rounded-lg border" />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-red-600">{detectionResult.disease}</h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                      {confidence}% {t('diseaseDetection.confidence')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{detectionResult.description}</p>
                </div>
              </div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" /> {t('diseaseDetection.symptomsTitle')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {detectionResult.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                {t('diseaseDetection.treatmentTitle')}
              </h2>
              <p className="text-gray-600 mb-4">{t('diseaseDetection.treatmentSubtitle')}</p>
              <div className="space-y-4">
                {detectionResult.treatments.map((treatment, i) => (
                  <div key={i} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium flex items-center gap-2">
                        {getUrgencyIcon(treatment.urgency)} {treatment.method}
                      </h4>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded capitalize">{treatment.urgency}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{treatment.description}</p>
                    <div className="text-sm text-gray-700">
                      <strong>{t('diseaseDetection.estimatedCost')}</strong> {treatment.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" /> {t('diseaseDetection.preventionTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detectionResult.prevention.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysisComplete(false);
                }}
                className="border border-teal-300 shadow-md px-4 py-2 rounded hover:bg-gray-50"
              >
                {t('diseaseDetection.analyzeAnotherButton')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;