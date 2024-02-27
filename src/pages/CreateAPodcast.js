import React from 'react'
import Header from '../components/Common2/Header'
import CreateAPodcastForm from '../components/StartAPodcast/CreateAPodcastForm'

const CreateAPodcastPage = () => {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Create A Podcast</h1>
            <CreateAPodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcastPage