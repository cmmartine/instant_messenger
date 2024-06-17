import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext, CurrentUserContext } from "./Main";
import { getMessages } from "../util/messageUtil";

export default function ChatroomMessages() {
  const currentChatroom = useContext(CurrentChatroomContext);
  const currentUser = useContext(CurrentUserContext);
  const [allMessages, setAllMessages] = useState([]);
  const [messagesChatroom, setMessagesChatroom] = useState({id: null});
  
  useEffect(() => {
    getChatroomMessages();
    if (currentChatroom.connection) {
      currentChatroom.connection.received = () => {getChatroomMessages()};
    };
    return() => {
      if (currentChatroom.connection) {
        currentChatroom.connection.received = () => {};
      };
    };
  }, [currentChatroom]);

  const createMessageList = () => {
    // Reverse array so .message-list flex-direction: column-reverse keeps time order top to bottom
    const messageList = allMessages.reverse().map((message) => {
      const user = whichUserIsMessageFrom(message);
      return <li key={message.id} className={user}>{message.body}</li>
    });

    return <ul className='message-list'>{messageList}</ul>
  };

  const whichUserIsMessageFrom = (message) => {
    console.log(message)
    console.log(currentUser)
    return message.user_id == currentUser.id ? 'current-user-message' : 'other-user-message';
  };

  const getChatroomMessages = () => {
    getMessages(currentChatroom).then((data) => {
      const messages = data[0];
      const chatroom_id = data[1];
      setAllMessages(messages);
      setMessagesChatroom(chatroom_id);
    });
  };

  if (allMessages.length && (currentChatroom.info.id == messagesChatroom.id)) {
    return (
      <div className='messages-container'>
        {createMessageList()}
      </div>
    );
  } else {
    return (
      <div>
        Start Chatting!
      </div>
    );
  }
    
}