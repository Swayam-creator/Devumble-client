import {Routes,Route, useNavigate} from 'react-router';
import { useEffect } from 'react';
import Body from './Body';
import Signup from './components/Signup';
import { useDispatch } from 'react-redux';
import { addUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import api from './lib/api';
import Profile from './components/Profile';
import Logout from './components/Logout';
import LoginPage from './pages/LoginPage';
import WakeinServer from './components/WakinServer';
import { Suspense,lazy } from 'react';
const Request=lazy(()=>import("./pages/RequestPage"));
const Connections=lazy(()=>import("./pages/ConnectionsPage"));
import Feed from "./components/Feed"
import Fallback from './utils/Fallback';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userData=useSelector((state) => state.user.user);

  const fetchUser=async()=>{
    if(userData && userData.length>0) return;
    try {
      const res=await api.get('/profile/view');
      if(res.data.success===false) return navigate('/login');
      if(res.data.success===true){
        dispatch(addUser(res.data.data));
        if(window.location.pathname==='/login' || window.location.pathname==='/signup' || window.location.pathname==='/')
         return navigate('/feed');
      }
    
    } catch (error) {
      if(error.response?.status===401 || error.response?.status===500) navigate('/login');
      console.log(error.code);
    }
  }
  useEffect(()=>{
   fetchUser();
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<Body/>}>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/logout' element={<Logout/>} />
       
        <Route element={<ProtectedRoute/>}>
          <Route path='/feed' element={<Feed/>} />
        <Route path='/profile/view' element={<Profile/>}/>
        <Route path='/pending-requests' element={
          <Suspense fallback={<Fallback/>}>
        <Request/>
          </Suspense>
        } />
        <Route path='/connections' element={<Suspense fallback={<Fallback/>}>
        <Connections/>
        </Suspense>}/>
        </Route>
      </Route>
    </Routes>     
    </>
  )
}

export default App
