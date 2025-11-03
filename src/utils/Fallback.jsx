import React from 'react'
import ShimmerCard from '../components/Shimmer'
const Fallback = () => {
  return (
    <div>
       <div className="pb-24 min-h-screen bg-base-100 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-6 grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {Array.from({ length:6}).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Fallback
