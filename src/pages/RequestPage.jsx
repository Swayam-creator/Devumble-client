import { useEffect } from "react";
import { Suspense,lazy } from "react";
// import Request from "../components/Request";
import { addPending } from "../features/pendingRequest/pendingRequestSlice";
import api from "../lib/api";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";


const RequestPage = () => {
  const connections = useSelector((state) => state.request.request);
  console.log(connections);
  const dispatch = useDispatch();

  const fetchPendingRequest = async () => {
    try {
      const res = await api.get("/user/request/recieved");
      let requests = [res.data.data.senderId];
      console.log(requests);
        dispatch(addPending(requests)); 
  

      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch pending requests");
    }
  };

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
  

  /* <Request key={conn._id} conn={conn} /> */
  return (
    <div>
      {
        connections?.map((conn) => (
          <div>
               <p>{conn?._id}</p>
               <p>{conn?.firstName}</p>
               <p>{conn?.lastName}</p>
               <pre>{conn?.about}</pre>
               <img src={conn?.profileImage} alt="profileImage" className="w-7 h-5" />
          </div>
      ))}
    </div>
  );
};

export default RequestPage;
