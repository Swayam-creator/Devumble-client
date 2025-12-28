import React, { useState, useEffect } from 'react';

 function WakeinServer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const maxTime = 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= maxTime) {
          clearInterval(interval);
          return maxTime;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeRemaining = Math.max(0, maxTime - timeElapsed);

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 min-h-screen flex items-center justify-center overflow-hidden font-sans">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-white/5 float float-delay-1"></div>
        <div className="absolute top-[60%] left-[70%] w-[200px] h-[200px] rounded-full bg-white/5 float float-delay-2"></div>
        <div className="absolute top-[80%] left-[20%] w-[150px] h-[150px] rounded-full bg-white/5 float float-delay-3"></div>
        <div className="absolute top-[30%] left-[80%] w-[250px] h-[250px] rounded-full bg-white/5 float float-delay-4"></div>
      </div>

 
      <div className="relative text-center p-12 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-[90%] slide-up">
        
    
        <div className="text-6xl mb-6 inline-block steam drop-shadow-lg">☕</div>
     
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Waking Up the Server</h1>

        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          We're bringing everything online for you. This usually takes just a moment.
        </p>
        
      
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/50 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeElapsed / maxTime) * 100}%` }}
          ></div>
        </div>
        
       
        <div className="text-sm text-gray-500 font-medium">
          {timeRemaining > 0 ? (
            <>Estimated time: {timeRemaining} second{timeRemaining !== 1 ? 's' : ''}</>
          ) : (
            <>Almost there</>
          )}
          <span className="inline-flex gap-1 ml-1">
            <span className="w-1 h-1 bg-gray-500 rounded-full dot dot-delay-1"></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full dot dot-delay-2"></span>
            <span className="w-1 h-1 bg-gray-500 rounded-full dot dot-delay-3"></span>
          </span>
        </div>

      
        <div className="mt-6 p-3 bg-gray-50 rounded-xl text-sm text-gray-700 border-l-4 border-indigo-500">
          💡 Tip: The server goes to sleep during periods of inactivity to save resources. Thanks for your patience!
        </div>
      </div>
    </div>
  );
}


export default WakeinServer;