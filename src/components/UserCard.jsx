import { useState } from "react";
import { X, Check } from "lucide-react";

const UserCard = ({ user }) => {
const {
_id,
firstName,
lastName,
age,
profileImage,
about,
skills = [],
location,
gender,
} = user;



const handleCollab = () => {
console.log(`✅ Collab requested with: ${firstName}`);
};

const handleNoCollab = () => {
console.log(`❌ No collab with: ${firstName}`);
};

return ( <div className="min-h-screen flex items-center justify-center p-2"> <div className="w-full max-w-sm"> <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
<div className="relative h-96"> <img
           src={profileImage}
           alt={firstName}
           className="w-full h-full object-cover"
         /> <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-1">
            {firstName} {lastName}, {age}
          </h2>
          <p className="text-sm mb-3 leading-relaxed">{about}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex p-4 gap-3">
        <button
          onClick={handleNoCollab}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
        >
          <X className="w-5 h-5" />
          No Collab
        </button>
        <button
          onClick={handleCollab}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl font-semibold hover:bg-green-100 transition-colors"
        >
          <Check className="w-5 h-5" />
          Collab
        </button>
      </div>
    </div>
  </div>
</div>


)
}

export default UserCard;
