import React from 'react'

const Sbutton = ({ text, onClick, disabled }) => {
  return (
    <div onClick={onClick} className="small-custom-button" disabled={disabled}>
    {text}
  </div>
  )
}

export default Sbutton