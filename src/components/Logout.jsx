import React from 'react'
import api from '../lib/api'
import { removeUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
const Logout = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutUser=async()=>{
        try {
            const res=await api.post('/auth/logout');
            if(res.data.success){
                dispatch(removeUser())
                navigate('/login');
                toast.success('Logout successfull!');
            }
        } catch (error) {
            console.log(error);
            toast.error('Logout failed!');

        }
    }

  return (
    <div>
       <button
       className='btn btn-soft'
       onClick={()=>logoutUser()}
       >Logout</button>
    </div>
  )
}

export default Logout
