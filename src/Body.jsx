import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router';

const Body = () => {
  return (
    <div>
      <Navbar/>
      <div className='pt-20'>
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Body
