import { Navigate,Outlet } from "react-router"
import { useSelector } from "react-redux"
const ProtectedRoute = () => {
  const userData=useSelector((state) => state?.user?.user);
  return  userData ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute
