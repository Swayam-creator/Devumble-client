import { RefreshCcw, Sparkles } from "lucide-react";
import { useState } from "react";

const CaughtUp = ({ onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-neutral-300" />
      </div>

      <h2 className="text-3xl font-serif font-bold text-sky-500">
        You're all caught up ✨
      </h2>

      <p className="text-base-content mt-3 max-w-md">
        You've seen all available developers for now.
        Check back later — new profiles arrive often.
      </p>

      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full
                   bg-black text-white hover:bg-gray-800 transition
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <RefreshCcw 
          size={16} 
          className={`transition-transform duration-500 ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        />
        Refresh Feed
      </button>
    </div>
  );
};

export default CaughtUp;