import React, { useEffect } from 'react';
const Connections=lazy(()=>import("../components/Connections"))
import api from '../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { addConnections } from '../features/connections/ConnectionSlice';
import toast from 'react-hot-toast';
import { lazy } from 'react';
import { Suspense } from 'react';
import Fallback from '../utils/Fallback';

const ConnectionsPage = () => {
  const connections = useSelector((state) => state.connections.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    const getConnections = async () => {
      try {
       
        const res = await api.get('/user/connections');
        const connectionsData = res.data.data || [];
        console.log("Fetched:", connectionsData);

        dispatch(addConnections(connectionsData));
        
        if (connectionsData?.length > 0) {
          toast.success(res.data.message || "Connections fetched successfully");
        }
      } catch (error) {
        console.error("Error fetching connections:", error);
        toast.error(error.response?.data?.message || "Failed to fetch connections");
      }
    };

    getConnections();
  }, [dispatch]); 

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="font-mono text-4xl mb-4">No connections yet!</p>
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