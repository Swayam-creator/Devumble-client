import {Routes,Route, useNavigate} from 'react-router';
import { useEffect } from 'react';
import Body from './Body';
import Signup from './components/Signup';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { addUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import api from './lib/api';
import Profile from './components/Profile';
import Logout from './components/Logout';
import LoginPage from './pages/LoginPage';
import  Feed from './components/Feed'
import RequestPage from './pages/RequestPage';
import ConnectionsPage from './pages/ConnectionsPage';
function App() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userData=useSelector((state) => state.user.user);

  const fetchUser=async()=>{
    if(userData && userData.length>0) return;
    try {
      const res=await api.get('/profile/view');
      if(res.data.success){
        dispatch(addUser(res.data.data));
         navigate('/feed');
      }
    } catch (error) {
      if(error.response?.status===401 || error.response.status===500) navigate('/login');
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
        <Route path='/feed' element={<Feed/>}/>
        <Route path='/profile/view' element={<Profile/>}/>
        <Route path='/pending-requests' element={<RequestPage/>} />
        <Route path='/connections' element={<ConnectionsPage/>}/>
      </Route>
    </Routes>     
    </>
  )
}

export default App
