import { useEffect, useState } from "react";
import api from "../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { addtoFeed } from "../features/feed/feedSlice";
import UserCard from "./UserCard";
import { motion } from "motion/react";
import ShimmerCard from "./Shimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state?.feed?.feed);
  const loggedinUser = useSelector((state) => state?.user?.user);
  const [loading, setLoading] = useState(true);

  const getFeedData = async () => {
    try {
      if (feed && feed.length > 0) {
        setLoading(false);
        return;
      }
      const data = await api.get("/user/feed");
      dispatch(addtoFeed(data.data.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedData();
  }, [loggedinUser]);

  if (loading) {
    setTimeout(()=>{
return (
      <div className="pb-24 min-h-screen bg-base-100 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-6 grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {Array.from({ length:6}).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    )
    },2);  
}

  //  If no feed data found
  if (feed.length === 0){
  
  return (
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <picture>
        <img
          className="h-[400px] w-[400px] object-contain opacity-70"
          srcSet="/no-more-user.png"
          alt="dark"
        />
        </picture>
        <p className="font-serif text-4xl font-bold text-gray-700 mt-4">
          You're all caught up!
        </p>
      </div>
    );
}

  
  return (
    <div className="pb-24 min-h-screen bg-base-100 flex justify-center">
      <div className="w-full max-w-5xl px-4 py-6 grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
        {feed.map((user, index) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
