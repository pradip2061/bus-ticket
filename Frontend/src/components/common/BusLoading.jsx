import React from 'react';

const BusLoading = () => {
  return (
        <div className="fixed  min-h-screen inset-0 bg-gradient-to-br from-blue-50 to-orange-50 flex  justify-center  pt-46 z-20">
    <div className="relative w-60 h-40 overflow-hidden ml-20  bg-transparent ">

      {/* Tilted Infinite Moving Road */}
      <div className="absolute bottom-0 left-0 w-38 h-6 bg-gray-900 overflow-hidden transform skew-x-[-42deg] origin-bottom-left">
        <div className="absolute top-0 left-0 h-full w-[400%] flex items-center animate-infiniteRoad">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="relative w-6 h-1 mx-2">
              <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
              <div
                className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Road edge lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white opacity-10"></div>
      </div>

      {/* Bus */}
      <div className="absolute bottom-3 left-12 transform  w-20 h-10">
        {/* Bus body */}
        <div className="relative w-full h-full bg-gradient-to-r from-indigo-700 to-blue-500 rounded-t-md rounded-br-md shadow-md">
          {/* Windows */}
          <div className="absolute top-1 left-2 w-[calc(100%-14px)] h-3 flex justify-between">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5 h-full bg-blue-200 rounded-sm backdrop-blur-sm"></div>
            ))}
          </div>

          {/* Wheels */}
          <div className="absolute -bottom-1 left-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </div>
          <div className="absolute -bottom-1 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          </div>

          {/* Headlight */}
          <div className="absolute bottom-3 -left-1 w-2 h-2 bg-yellow-300 rounded-r-full shadow-[0_0_6px_2px_rgba(255,255,0,0.5)]"></div>
        </div>

        {/* Exhaust */}
        <div className="absolute -top-2 right-1 w-2 h-4">
          <div className="relative w-full h-full">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute right-0 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-0 animate-exhaustSmoke"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  bottom: `${i * 3}px`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes infiniteRoad {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes exhaustSmoke {
          0% {
            transform: translateY(0) scale(0.3);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10px) scale(1.2);
            opacity: 0;
          }
        }
        .animate-infiniteRoad {
          animation: infiniteRoad 3s linear infinite;
        }
        .animate-exhaustSmoke {
          animation: exhaustSmoke 1s ease-out infinite;
        }
      `}</style>
    </div>
      <div className=" absolute text-lg font-bold text-gray-600 mt-44 ml-4  ">
            <p>Finding best routes for you. </p>
          </div>
         <div className=" absolute text-sm text-black mt-52 ml-4 animate-pulse ">
            <p>Checking available routes...</p>
          </div>
    </div>
  );
};

export default BusLoading;
