import React from "react";
import { useEffect, useContext, useState } from "react";
import { CurrentChatroomContext } from "./Main";

export default function MessageBox(props) {
  const { chattingWithUser } = props
  const currentChatroom = useContext(CurrentChatroomContext);
  let [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    //Allow the user to submit by pressing enter or clicking the submit button (button onClick in form)
    function submitOnEnter(e) {
      if (e.which === 13) {
          if (!e.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            e.target.form.dispatchEvent(newEvent);
          }
  
          e.preventDefault(); // Prevents the addition of a new line in the text field
          postMessage(newMessage);
          resetMessage();
      }
    }
  
    document.getElementById("message-box-text").addEventListener("keydown", submitOnEnter);
  })

  const postMessage = (message) => {
    let csrf = getCsrfToken();
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

  const resetMessage = () => {
    setNewMessage('');
    document.getElementById('message-box-text').value = '';
  };

  const getCsrfToken = () => {
    if (document.querySelector("meta[name='csrf-token']")) {
      return document.querySelector("meta[name='csrf-token']").getAttribute("content");
    } else {
      return null;
    }
  };

  return(
    <form id='chatroom-message-form'>
      <textarea id='message-box-text' aria-label='new-message' rows='1' columns='60' spellCheck='true' onChange={(e) => {setNewMessage(e.target.value)}}/>
      <button type='submit' onClick={(e) => {
        e.preventDefault();
        postMessage(newMessage);
        resetMessage();
      }}>Send</button>
    </form>
  );
}