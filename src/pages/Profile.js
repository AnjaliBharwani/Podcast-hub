import React, { useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Common2/Header';
import Button from '../components/Common2/Button';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import Loader from '../components/Common2/Loader';
import UpdateModal from '../components/updateModal/UpdateModal';
import { useLocation } from 'react-router-dom';
// import "/src/index.css"
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

const Profile = ({setFlag}) => {

  
  const location = useLocation();
  const [showModal, setShowModal]= useState(false);
  const user = useSelector((state)=>state.user.user);
  console.log("My user", user);

  useEffect(() => {
    setFlag(false);
}, [location])

  

  const handleLogout = () => {
    signOut(auth)
    .then(() =>{
      toast.success("User Logged Out!");
    })
    .catch((error)=>{
      toast.error("error.message");
    })
  } 
  const handleEditProfile = () =>{
    setShowModal(true);
  }
    
  if(!user){
    return <Loader/>
  }
   

  return (
    <div className="main-container">
      <Header/> 
      <div className='profile-wrapper'>
      {user.image && (
        <div className="profile-image-container">
          <img src={user.image} alt="Profile" className="profile-image" />
        </div>
      )}
      <h1 style={{textAlign:"center"}}>Welcome <br/>{user.name}</h1>
      
      <div className='profile-btn'>
      <Button text={"Logout"} onClick={handleLogout}/>
      <Button text={"Edit-Profile"} onClick={handleEditProfile}/>
      </div>
      </div>
      {
      showModal && <UpdateModal setShowModal={setShowModal} user={user}/>
      }
    </div>
  )
}

export default Profile