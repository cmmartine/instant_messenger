import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { getCsrfToken } from "../util/csrfTokenUtil";

export default function ChatroomMessages(props) {
  const { fetchedMessages, setFetchedMessages } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const [allMessages, setAllMessages] = useState();

  useEffect(() => {
    if (!fetchedMessages) {
      getMessages();
      setFetchedMessages(true);
    }
  })

  const getMessages = () => {
    console.log("fetching messages")
    let csrf = getCsrfToken();
    fetch('chatrooms/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': csrf,
      },
      body: 
        JSON.stringify({chatroom: {
          chatroom_id: currentChatroom.id
        }})
      }
    ).then((res) => {
      return res.json();
    }).then((data) => {
      setAllMessages(data);
    });
  };

  const createMessageList = () => {
    const messageList = allMessages.map((message) => {
      return <li>{message.body}</li>
    });

    return <ul>{messageList}</ul>
  };

  if (allMessages) {
    return (
      <div>
        {createMessageList()}
      </div>
    );
  } else {
    return (
      <div>Start Chatting!</div>
    );
  }
}