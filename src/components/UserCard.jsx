import { X, Check } from "lucide-react";
import toast from "react-hot-toast";
import { ALLOWED_CONNECTION_REQUEST_STATUS } from "../../constant";
import api from "../lib/api";
import { removeFromFeed } from "../features/feed/feedSlice";
import { useDispatch } from "react-redux";
import ResponsiveImage from "./ResponsiveImage";
import { useCallback } from "react";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  const data = ALLOWED_CONNECTION_REQUEST_STATUS;
  const {
    _id,
    firstName,
    lastName,
    age,
    profileImage,
    about,
    skills = [],
  } = user;

  const handleSendRequest = useCallback(
    async (status, userId) => {
      try {
        const res = await api.post(
          `/request/send/${status}/${userId}`
        );

        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(removeFromFeed(userId));
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to send request"
        );
      }
    },
    [dispatch]
  );

  return (
    <div className="flex items-center justify-center p-2 mb-5">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-96">
            <ResponsiveImage
              src={profileImage}
              alt={`${firstName} ${lastName}`}
              fallbackSrc="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-24 left-0 right-0 px-6 text-white">
              <h2 className="text-3xl font-bold mb-1">
                {firstName} {lastName}, {age}
              </h2>
              <p className="text-sm mb-3">{about}</p>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {showActions && (
              <div className="absolute bottom-6 left-0 right-0 flex gap-3 px-6">
                <button
                  onClick={() =>
                    handleSendRequest(data[1], _id)
                  }
                  className="flex-1 bg-red-50 text-red-600 rounded-xl py-3"
                >
                  <X className="w-5 h-5 inline" /> No Collab
                </button>
                <button
                  onClick={() =>
                    handleSendRequest(data[0], _id)
                  }
                  className="flex-1 bg-green-50 text-green-600 rounded-xl py-3"
                >
                  <Check className="w-5 h-5 inline" /> Collab
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
