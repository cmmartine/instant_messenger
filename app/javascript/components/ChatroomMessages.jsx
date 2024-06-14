import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { getMessages } from "../util/messageUtil";

export default function ChatroomMessages() {
  const currentChatroom = useContext(CurrentChatroomContext);
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
      return <li key={message.id}>{message.body}</li>
    });

    return <ul className='message-list'>{messageList}</ul>
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