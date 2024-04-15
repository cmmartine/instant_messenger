import React from "react";

export default function MessageBox(props) {
  const {chattingWithUser } = props

  return(
    <div className='chatroom-message-entry'>
      <textarea aria-label='new-message' rows='6' columns='40'/>
      <input type='submit' className='message-submit' value='Send'
        onClick={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  )
}