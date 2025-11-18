
export function OurServices() {
  return (
    <div className="py-20 bg-gray-50"> {/* Light background */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Your Complete Farm Toolkit
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          AI-powered tools to help you make smarter decisions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Crop Recommendation */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-5">
              {/*  */}
              <svg className="w-10 h-10 text-green-700" 
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 3a9 9 0 100 18 9 9 0 000-18z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Smart Crop Recommendation
            </h3>
            <p className="text-gray-600 mb-6">
              Our AI analyzes soil data, weather patterns, and NPK values 
              to provide data-driven recommendations for maximum yield.
            </p>
            
          </div>

          {/* Card 2: Disease Detection */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-5">
              {/*  */}
              <svg className="w-10 h-10 text-green-700" 
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 13.182a4.5 4.5 0 01-6.364 0a4.5 4.5 0 010-6.364a4.5 4.5 0 016.364 0zM12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.192-5.192" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Instant Disease Detection
            </h3>
            <p className="text-gray-600 mb-6">
              Upload a photo of a plant leaf and let our model 
              instantly identify potential diseases and suggest next steps.
            </p>
         
          </div>

        </div>
      </div>
    </div>
  );
}