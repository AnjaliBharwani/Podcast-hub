import React from 'react'

const Button2 = ({ text, onClick, disabled }) => {
  return (
    <div onClick={onClick} className="small-custom-button" disabled={disabled}>
    {text}
  </div>
  )
}

export default Button2