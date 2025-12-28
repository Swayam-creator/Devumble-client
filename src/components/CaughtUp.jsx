import { RefreshCcw, Sparkles } from "lucide-react";

const CaughtUp = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-neutral-300" />
      </div>

      <h2 className="text-3xl font-serif font-bold text-gray-800">
        You’re all caught up ✨
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        You’ve seen all available developers for now.
        Check back later — new profiles arrive often.
      </p>

      <button
        onClick={onRefresh}
        className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full
                   bg-black text-white hover:bg-gray-800 transition"
      >
        <RefreshCcw size={16} />
        Refresh Feed
      </button>
    </div>
  );
};

export default CaughtUp;
