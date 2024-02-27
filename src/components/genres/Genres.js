import React from 'react'
import "./style.css"

const Genres = ({genres}) => {
  return (
    <div className='genres'>
        {genres.map((genre, index)=>(
            <div className='genre' key={index}>{genre}</div>
        ))}
    </div>
  )
}

export default Genres