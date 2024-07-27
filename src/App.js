import React, { Fragment, useEffect, useState } from 'react'
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
import Myfriend from './Pages/Myfriend';
import My_profile from './Pages/My_profile';
import Notification_drop_down from './components/Notification_drop_down';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import Findfriends from './Pages/Findfriends';


function App() {
     const { user } = useSelector((state) => state.user);
     const {ouvert} = useSelector(state => state.boite_disscussion);

     const [socket, setSocket] = useState(null);
     useEffect(() => { 
       if (user) {
         const newSocket = io('http://localhost:5000');
         setSocket(newSocket);
         newSocket.emit('addNewUser', user._id);
         return () => {
           newSocket.disconnect();
         }
       }
     }, [user]);
  return (
    <BrowserRouter>
    <ToastContainer autoClose={4000}  />
         <Routes>
              <Route path="/" element={<Layout />}>
                   <Route index  element={<Structure socket={socket}/>}/>
                   <Route  path='profile'  element={<Profile/>}/>
                   <Route  path='myfriends'  element={<Myfriend  socket={socket} />}/>
                   <Route  path='myprofile'  element={<My_profile/>}/>
                   <Route  path='Findfriends'  element={<Findfriends/>}/>
              </Route>
              <Route path='/signup'  element={<SignupPage/>}/>
              <Route path='/login'  element={<LoginPage/>}/>
         </Routes>
        {ouvert &&<Boite_disscussion socket={socket} />}
     </BrowserRouter>
  );
}
export default App;
