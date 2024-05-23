import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { getMessages } from "../util/messageUtil";

export default function ChatroomMessages() {
  const currentChatroom = useContext(CurrentChatroomContext);
  const [allMessages, setAllMessages] = useState([]);
  const [messagesChatroom, setMessagesChatroom] = useState({id: null});
  
  useEffect(() => {
    getMessages(currentChatroom, setAllMessages, setMessagesChatroom);
    if (currentChatroom.connection) {
      currentChatroom.connection.received = () => {getMessages(currentChatroom, setAllMessages, setMessagesChatroom)};
    };
    return() => {
      if (currentChatroom.connection) {
        currentChatroom.connection.received = () => {};
      };
    };
  }, [currentChatroom]);

  const createMessageList = () => {
    const messageList = allMessages.map((message) => {
      return <li key={message.id}>{message.body}</li>
    });

    return <ul>{messageList}</ul>
  };

  if (allMessages.length && (currentChatroom.info.id == messagesChatroom.id)) {
    return (
      <div>
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