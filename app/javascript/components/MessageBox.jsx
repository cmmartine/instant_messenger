import React from "react";
import { useEffect } from "react";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  let newMessage;

  useEffect(() => {
    //Allow the user to submit by pressing enter or clicking the submit button (button onClick in form)
    function submitOnEnter(e) {
      if (e.which === 13) {
          if (!e.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            e.target.form.dispatchEvent(newEvent);
          }
  
          e.preventDefault(); // Prevents the addition of a new line in the text field
          postMessage(newMessage)
      }
    }
  
    document.getElementById("message-box-text").addEventListener("keydown", submitOnEnter);
  })

  const postMessage = (message) => {
    return message ? console.log(message) : null
  };

  return(
    <form id='chatroom-message-form'>
      <textarea id='message-box-text' aria-label='new-message' rows='1' columns='60' spellCheck='true' onChange={(e) => {newMessage = e.target.value}}/>
      <button type='submit' onClick={(e) => {
        e.preventDefault();
        postMessage(newMessage);
      }}>Send</button>
    </form>
  )
}