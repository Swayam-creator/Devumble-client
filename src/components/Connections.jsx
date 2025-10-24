import { Mail, MessageCircle } from "lucide-react";

const Connections = ({ conn }) => {
  // If conn is an array with one object, keep your original destructure:
  const [{ firstName, lastName, emailId, about, gender, profileImage }] = conn;

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}?subject=Invitation to collab with Me`;
  };

  return (
    <div className="w-full max-w-xl mx-auto"> {/* container: full width up to max */}
      <div className="border-2 rounded-2xl p-5 bg-base-100 border-orange-200 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={profileImage}
              className="h-24 w-24 rounded-full object-cover"
              alt={`${firstName} ${lastName}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-2xl font-medium">
              {firstName} {lastName}
            </div>
            <p className="text-gray-400 text-sm truncate">
              {about}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MessageCircle className="cursor-pointer hover:text-amber-400" size={28} />
            <Mail
              onClick={() => handleEmail(emailId)}
              className="cursor-pointer hover:text-amber-400"
              size={28}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
