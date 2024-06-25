import React from 'react';
import Navbare from './components/Navbare';
import Post from './components/Post';
import Left_side from './components/Left_side';
import Right_side from './components/Right_side';
import Section_principale from './components/Section_principale';
import Structure from './components/Structure';
import Boite_disscussion  from './components/Boite_disscussion';
import Coverture_pic from './components/Coverture_pic';
import Profile_pic from './components/Profile_pic';
import Add_post from './components/Add_post';
import Profile from './Pages/Profile';
import Notification_drop_down from './components/Notification_drop_down';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
         <Routes>
              <Route path="/" element={<Layout />}>
                   <Route  path='principale'   element={<Structure/>}/>
                   <Route  path='profile'  element={<Profile/>}/>
              </Route>
              <Route path='/signup'  element={<Signup/>}/>
              <Route index  element={<Login/>}/>
         </Routes>
     </BrowserRouter>
  );
}
export default App;
