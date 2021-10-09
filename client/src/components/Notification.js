import React from 'react'
import './styles/notification.css'

const Notification = ({ message }) => {
  if(!message) return null
  
  return(
    <div className={message.type}>
      {message.text}
    </div>
  )
}

export default Notification