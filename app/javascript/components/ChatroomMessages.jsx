import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { getMessages } from "../util/messageUtil";

export default function ChatroomMessages(props) {
  const currentChatroom = useContext(CurrentChatroomContext);
  const [allMessages, setAllMessages] = useState();

  useEffect(() => {
    if (currentChatroom.connection) {
      currentChatroom.connection.received = () => {getMessages(currentChatroom, setAllMessages)};
    };
    getMessages(currentChatroom, setAllMessages)
  }, [currentChatroom])

  const createMessageList = () => {
    const messageList = allMessages.map((message) => {
      return <li key={message.id}>{message.body}</li>
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
      <div>
        Start Chatting!
      </div>
    );
  }
}