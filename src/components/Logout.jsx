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
    <div className='flex justify-center'>
       <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Logout</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure ?</h3>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn" onClick={logoutUser}>Logout</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default Logout
