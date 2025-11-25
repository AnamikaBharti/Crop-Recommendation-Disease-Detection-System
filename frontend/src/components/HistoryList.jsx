import React from 'react';
import { Clock, AlertTriangle, Leaf, Sprout } from 'lucide-react';

const HistoryList = ({ historyData, title, onViewMore }) => {
  
  // Helper to choose icon based on type
  const getIcon = (type) => {
    return type === 'CROP' ? <Sprout className="h-6 w-6 text-white" /> : <Leaf className="h-6 w-6 text-white" />;
  };

  // Helper for color
  const getColor = (type) => {
    return type === 'CROP' ? 'bg-green-500' : 'bg-yellow-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" />
          {title}
        </h2>
        {onViewMore && (
          <button 
            onClick={onViewMore}
            className="text-sm text-green-600 font-semibold hover:text-green-700 hover:underline"
          >
            {title === 'Recent Activity' ? 'View All History →' : '← Back to Recent'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {historyData.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No history found.</p>
        ) : (
          historyData.map((item) => (
            <div key={item.id} className="flex items-start p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className={`p-3 rounded-full ${getColor(item.type)} shadow-sm mr-4`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-lg">
                  {item.type === 'CROP' ? 'Crop Recommendation' : 'Disease Detection'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-semibold">Result:</span> {item.result}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
                </p>
              </div>
              {/* Optional: Show input details on hover or click */}
              <div className="hidden md:block text-xs text-gray-400 bg-gray-100 p-2 rounded max-w-xs">
                {item.inputDetails}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryList;