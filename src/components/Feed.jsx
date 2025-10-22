import { useEffect,useState } from "react";
import api from "../lib/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addtoFeed } from "../features/feed/feedSlice";
import UserCard from "./UserCard";
import { Loader } from "lucide-react";
import { use } from "react";
const Feed = () => {
    const dispatch=useDispatch();
    const [feedData,setFeedData]=useState([]);
    const feed=useSelector((state)=>state?.feed?.feed);
    const loggedinUser=useSelector((state)=>state?.user?.user);
    const getFeedData=async()=>{
       try {
         if(feed && feed.length>0) return;
         const data= await api.get('/user/feed');
         console.log(data.data.data);
         setFeedData(data.data.data);
         dispatch(addtoFeed(data.data.data));
         console.log(data)
       } catch (error) {
         console.log(error);
       }
        

    }
    useEffect(()=>{
     getFeedData();
    },[feed]);
  return (
    <div className=" grid-rows-1 ">
        <div className="flex justify-center items-center flex-col gap-2 ">
  {feed?.length > 0 ? (
    feedData.map((user) => {
        if(user._id!==loggedinUser._id) return <UserCard key={user._id} user={user} />
    })
  ) : (
    <p className="text-gray-600 text-lg rotate-180 transition-all animate-spin"><Loader /></p>
  )}
</div>

    </div>
  )
}

export default Feed
