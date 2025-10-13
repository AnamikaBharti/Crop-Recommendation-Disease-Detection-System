import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Upload,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  Zap
} from "lucide-react";

const DiseaseDetection = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const detectionResult = {
    disease: "Late Blight",
    confidence: 87,
    severity: "Moderate",
    affectedArea: "25%",
    description:
      "Late blight is a fungal disease that affects potato and tomato plants, causing dark spots on leaves and stems.",
    symptoms: [
      "Dark, water-soaked spots on leaves",
      "White fungal growth on leaf undersides",
      "Brown/black lesions on stems",
      "Rapid wilting in humid conditions"
    ],
    treatments: [
      {
        method: "Fungicide Application",
        description: "Apply copper-based fungicide spray every 7-10 days",
        urgency: "immediate",
        cost: "₹150-200 per treatment"
      },
      {
        method: "Cultural Control",
        description: "Remove affected plant parts and improve air circulation",
        urgency: "immediate",
        cost: "Labor cost only"
      },
      {
        method: "Preventive Measures",
        description: "Avoid overhead watering and plant resistant varieties",
        urgency: "future",
        cost: "Variable"
      }
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Maintain proper plant spacing",
      "Avoid watering leaves directly",
      "Apply preventive fungicides in monsoon"
    ]
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Please upload an image smaller than 10MB");
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
      alert("Please upload a plant leaf image first");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      alert("Analysis Complete!");
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
              <Upload className="h-5 w-5" /> Upload Plant Image
            </h2>
            <p className="text-gray-600 mb-4">
              Take a clear photo of the affected leaf for accurate detection
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">Upload Leaf Image</p>
              <p className="text-gray-500 mb-6">
                Supported formats: JPG, PNG, WEBP (Max 10MB)
              </p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Choose Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {/* Tips Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tip 1 */}
        <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
          <Leaf className="h-4 w-4 text-green-700 mt-1" />
          <p className="text-green-800 text-sm">
            <strong>Good lighting:</strong> Ensure the leaf is well-lit with natural light
          </p>
        </div>

        {/* Tip 2 */}
        <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
          <Camera className="h-4 w-4 text-green-700 mt-1" />
          <p className="text-green-800 text-sm">
            <strong>Clear focus:</strong> Keep the leaf in sharp focus without blur
          </p>
        </div>

        {/* Tip 3 */}
        <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 rounded-md">
          <Shield className="h-4 w-4 text-green-700 mt-1" />
          <p className="text-green-800 text-sm">
            <strong>Full leaf:</strong> Capture the entire affected leaf area
          </p>
        </div>
      </div>
          </div>
        )}

        {selectedImage && !analysisComplete && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold">Image Preview & Analysis</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedImage}
                alt="Uploaded leaf"
                className="w-full md:w-1/2 h-64 object-cover rounded-lg border"
              />
              <div className="flex-1 space-y-4">
                {isAnalyzing ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      <span className="font-medium">Analyzing Image...</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      AI is examining the leaf for disease symptoms...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleAnalyze}
                      className="w-full bg-green-600 border-gray-300 shadow-md text-white py-2 rounded hover:bg-green-700"
                    >
                      <Leaf className="h-4 w-4 inline mr-2" />
                      Analyze for Diseases
                    </button>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-full border border-gray-300 shadow-md py-2 rounded hover:bg-gray-0"
                    >
                      Upload Different Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {analysisComplete && (
          <div className="space-y-6">
            {/* Detection Results */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Disease Detection Results
              </h2>
              <div className="flex gap-6 mb-6">
                <img
                  src={selectedImage}
                  alt="Analyzed leaf"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-bold text-red-600">
                      {detectionResult.disease}
                    </h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                      {detectionResult.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {detectionResult.description}
                  </p>
                </div>
              </div>

              {/* Symptoms */}
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" /> Identified Symptoms
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {detectionResult.symptoms.map((symptom, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-green-50 rounded"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Treatment Recommendations
              </h2>
              <p className="text-gray-600 mb-4">
                Follow these methods to control the disease effectively
              </p>
              <div className="space-y-4">
                {detectionResult.treatments.map((t, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-green-500 bg-gray-50 p-4 rounded"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium flex items-center gap-2">
                        {getUrgencyIcon(t.urgency)} {t.method}
                      </h4>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                        {t.urgency}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{t.description}</p>
                    <div className="text-sm text-gray-700">
                      <strong>Estimated Cost:</strong> {t.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" /> Prevention for
                Future
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detectionResult.prevention.map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysisComplete(false);
                }}
                className="border border-teal-300 shadow-md px-4 py-2 rounded hover:bg-gray-50"
              >
                Analyze Another Image
              </button>
               
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;
