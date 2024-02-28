import React, { useEffect } from 'react'
import Header from '../components/Common2/Header'
import CreateAPodcastForm from '../components/StartAPodcast/CreateAPodcastForm'
import { useLocation } from 'react-router-dom'

const CreateAPodcastPage = ({setFlag}) => {
  const location = useLocation();

  useEffect(() => {
    setFlag(false);
}, [location])

  return (
    <div className="main-container">
        <Header/>
        <div className='input-wrapper create-podcast-wrapper'>
            <h1>Create A Podcast</h1>
            <CreateAPodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcastPage