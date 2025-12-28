import { Navigate } from "react-router"
import { useSelector } from "react-redux"
const ProtectedRoute = (children) => {
  const userData=useSelector((state) => state?.user?.user);
  if(!userData){
    return <Navigate to='/login' replace />
  }
    return 
    children;
}

export default ProtectedRoute
