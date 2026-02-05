import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { useEffect, useCallback } from 'react';
import Body from './Body';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './features/user/userSlice';
import {PUBLIC_ROUTES} from '../constant'
import api from './lib/api';
import Profile from './components/Profile';
import Logout from './components/Logout';
import LoginPage from './pages/LoginPage';
import { Suspense, lazy } from 'react';

const Request = lazy(() => import("./pages/RequestPage"));
const Connections = lazy(() => import("./pages/ConnectionsPage"));
import Feed from "./components/Feed";
import Fallback from './utils/Fallback';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const controller=new AbortController();
  const userData = useSelector((state) => state.user.user);

  const fetchUser = useCallback(async () => {
   
    if (userData) return;
    
    
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      return;
    }

    try {
      const res = await api.get('/profile/view',{signal:controller.signal});
      
      if (res.data.success === true) {
        dispatch(addUser(res.data.data));
        
      
        if (location.pathname === '/') {
          navigate('/feed');
        }
      }
    } catch (error) {
     
      if (error.response?.status === 401 || error.response?.status === 500) {
        if (!PUBLIC_ROUTES.includes(location.pathname)) {
          navigate('/login');
        }
      }
      console.error(error);
    }
  }, [userData, location.pathname, navigate, dispatch]);

  useEffect(() => {
    fetchUser();
    return ()=>controller.abort();
  }, [fetchUser]);

  return (
    <Routes>
      <Route path='/' element={<Body />}>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<Logout />} />
       
        <Route element={<ProtectedRoute />}>
          <Route path='/feed' element={<Feed />} />
          <Route path='/profile/view' element={<Profile />} />
          <Route path='/pending-requests' element={
            <Suspense fallback={<Fallback />}>
              <Request />
            </Suspense>
          } />
          <Route path='/connections' element={
            <Suspense fallback={<Fallback />}>
              <Connections />
            </Suspense>
          } />
        </Route>
      </Route>
    </Routes>     
  );
}

export default App;