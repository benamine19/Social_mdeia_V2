import React from 'react'
import { Outlet, Link, Navigate } from "react-router-dom";
import Navbare from '../components/Navbare';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function Layout() {
    const { user } = useSelector((state) => state.user);
    if (!user) {
    return <Navigate to='/login' />;
    }
  
  return (
    <div>
    <Navbare/>
    <Outlet />
    </div>
  )
}

export default Layout
