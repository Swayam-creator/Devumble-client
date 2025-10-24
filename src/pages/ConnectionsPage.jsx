import React from 'react'
import Connections from '../components/Connections'
import api from '../lib/api'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addConnections } from '../features/connections/ConnectionSlice'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const ConnectionsPage = () => {
    const connection=useSelector((state)=>state.connections.connections);
    const dispatch=useDispatch();
    const getConnections=async()=>{
        if(connection.length>0) return;
       try {
         const conndata=await api.get('/user/connections');
         dispatch(addConnections(conndata.data.data));
         console.log(conndata);
         toast.success('Connections fetched successfully');
       } catch (error) {
         console.log(error?.response?.data?.message);

       }
    }
    useEffect(()=>{
     getConnections();
    },[]);
    if(connection.length===0) return <p className='flex justify-center items-center font-mono text-4xl'>No connections yet!</p>
  return (
    <div className='flex justify-center items-center flex-col gap-3.5'>
      {
        connection?.map((conn)=>(
      <Connections
        key={conn._id}
        conn={conn}
      />
        ))
      }

    </div>
  )
}

export default ConnectionsPage
