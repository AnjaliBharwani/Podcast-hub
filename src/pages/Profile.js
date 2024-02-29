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
import PodcastCard from '../components/podcasts/PodcastCard';
// import "/src/index.css"
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

const Profile = ({setFlag}) => {

  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [showModal, setShowModal]= useState(false);
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  // console.log(podcasts);
  // console.log(user.uid)

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
   
  
  const userPodcasts = podcasts.filter((podcast) => podcast.createdBy === user.uid)
  console.log(userPodcasts)

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

      <div className="episode-container">
        <h2>Your Podcasts:</h2>
        <div className="podcast-list">
          {userPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              id={podcast.id}
              title={podcast.title}
              displayImage={podcast.displayImage}
              genres={podcast.genres}
            />
          ))}
        </div>
      </div>
      
      {
      showModal && <UpdateModal setShowModal={setShowModal} user={user}/>
      }
    </div>
  )
}

export default Profile