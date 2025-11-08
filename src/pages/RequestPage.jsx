import { useEffect } from "react";
import { addPending, removeRequest } from "../features/pendingRequest/pendingRequestSlice";
import api from "../lib/api";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {ALLOWED_CONNECTION_REVIEW_STATUS} from '../../constant';
import { connect } from "react-redux";
import { normalize } from "../utils/normalizeArray";

const RequestPage = () => {
  const connections = useSelector((state) => state.request.request);
  console.log(connections);
  const dispatch = useDispatch();

  const fetchPendingRequest = async () => {
    try {
      const res = await api.get("/user/request/recieved");
      let requests = normalize(res.data.data);
        console.log(requests)
        dispatch(addPending(requests)); 
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch pending requests");
    }
  };
const reviewStatus=ALLOWED_CONNECTION_REVIEW_STATUS;
  const handleReviewStatus=async(reviewstatus,requestId)=>{
    try {
      const res=await api.post(`/request/review/${reviewstatus}/${requestId}`);
      if(res.data.success){
        toast.success('Review status updated successfully');
        console.log('Status updated');
        dispatch(removeRequest(requestId));
      }
    } catch (error) {
      console.log(error.message+"failed");
      toast.error(error?.message)
    }
  }
  useEffect(() => {
    fetchPendingRequest();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center">
        No Pending Request
      </div>
    );
  }
  if (!connections) {
    return (
      <div className="pb-24 min-h-screen bg-base-100 flex justify-center">
        <div className="w-full max-w-5xl px-4 py-6 grid sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {Array.from({ length:6}).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    );
  }
  


  return (
    <div>
       {
        connections?.map((conn,i) => {
          const{firstName,lastName,about,profileImage,_id}=conn?.senderId;
      
      return (
          <div key={conn?._id} >
               <div className="w-full max-w-xl mx-auto"> 
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
            <button className="btn btn-soft btn-secondary hover:shadow-amber-500" 
            onClick={()=>handleReviewStatus(reviewStatus[0],conn?._id)}
            >Accepted</button>
            <button className="btn btn-soft btn-error"
            onClick={()=>handleReviewStatus(reviewStatus[1],conn?._id)} 
            >Ignored</button>
          </div>
        </div>
      </div>
    </div>
      </div>
     
      )
      })} 
    </div>
  );
};

export default RequestPage;
