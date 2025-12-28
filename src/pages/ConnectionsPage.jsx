import React, { useEffect } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
const Connections=lazy(()=>import("../components/Connections"))
import api from '../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { addConnections } from '../features/connections/ConnectionSlice';
import toast from 'react-hot-toast';
import Fallback from '../utils/Fallback';
import { normalize } from '../utils/normalizeArray';
import { useState } from 'react';

const ConnectionsPage = () => {
  const connections = useSelector((state) => state.connections.connections);
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const getConnections = async () => {
      try {
        const res = await api.get('/user/connections');
        const connectionsData = normalize(res.data.data);
        console.log("Fetched:", connectionsData);
        dispatch(addConnections(connectionsData));
      } catch (error) {
        console.error("Error fetching connections:", error);
        toast.error(error.response?.data?.message || "Failed to fetch connections");
      }finally{
        setLoading(false);
      }
    };

    getConnections();
   
  }, [dispatch]); 
  if(loading) return <Fallback/>;
  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="font-hero  text-4xl mb-4">No connections yet!</p>
          <p className="text-gray-500 text-lg">
            Start connecting with people to build your network
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-3.5 py-8">
    <Suspense fallback={<Fallback/>}>
      {connections.map((conn) => (
        <Connections key={conn._id} conn={conn} />
      ))}
    </Suspense>
    </div>
  );
};

export default ConnectionsPage;