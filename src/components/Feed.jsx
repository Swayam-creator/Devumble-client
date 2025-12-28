import { useEffect, useState } from "react";
import api from "../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { addtoFeed } from "../features/feed/feedSlice";
import UserCard from "./UserCard";
import { motion } from "motion/react";
import ShimmerCard from "./Shimmer";
import CaughtUp from "./CaughtUp";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state?.feed?.feed);
  const loggedinUser = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(true);

  const getFeedData = async () => {
    try {
      if (feed?.length > 0) {
        setLoading(false);
        return;
      }
      const res = await api.get("/user/feed");
      dispatch(addtoFeed(res.data.data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedinUser) {
      getFeedData();
    }
  }, [loggedinUser]);

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="pb-24 min-h-screen flex justify-center">
        <div className="w-full max-w-5xl px-4 py-6 grid gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    );
  }


  if (!feed || feed.length === 0) {
    return <CaughtUp onRefresh={getFeedData} />;
  }

 
  return (
    <div className="pb-24 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-4 py-6 grid gap-6">
        {feed.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
