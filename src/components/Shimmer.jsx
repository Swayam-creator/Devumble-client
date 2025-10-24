const ShimmerCard = () => (
    <div className="bg-base-200 p-4 rounded-2xl shadow-md animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-40 bg-gray-300 rounded-xl"></div>
    </div>
  );
  export default ShimmerCard;