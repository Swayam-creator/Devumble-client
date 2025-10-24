import { useEffect } from "react"
import Request from "../components/Request"
import { addPending,removeRequest } from "../features/pendingRequest/pendingRequestSlice"
import api from "../lib/api"
import { useSelector,useDispatch } from "react-redux"
import toast from "react-hot-toast"

const RequestPage = () => {
    const connections=useSelector((state)=>state.request.request);
    const dispatch=useDispatch();
    const fetchPendingRequest=async()=>{
    try {
         const reqData=await api.get('/user/request/recieved');
         console.log(reqData);
         dispatch(addPending(reqData.data.data));
         toast.success(reqData.data.message);
    } catch (error) {
        console.log(error);
    }
    }
    useEffect(()=>{
     fetchPendingRequest();
    },[connections]);
    if(connections) return;
    if(connections?.length===0) return (
        <div className="flex flex-row justify-center items-center">
            No Pending Request
        </div>
    );
  return (
    <div>
         {connections?.map((conn)=>{
         return  <Request key={conn._id} conn={conn}/>
         })}
    </div>
  )
}

export default RequestPage
