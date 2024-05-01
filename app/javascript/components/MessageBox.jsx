import React from "react";
import { useEffect, useContext } from "react";
import { CurrentChatroomContext } from "./Main";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  const currentChatroom = useContext(CurrentChatroomContext);
  let newMessage;
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

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
    console.log(currentChatroom.id)
    fetch('messages/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': csrf,
      },
      body: 
        JSON.stringify({message: {
          body: message,
          chatroom_id: currentChatroom.id
        }})
      }
    );
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