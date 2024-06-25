import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbare from '../components/Navbare';
function Layout() {
  return (
    <div>
    <Navbare/>
    <Outlet />
    </div>
  )
}

export default Layout