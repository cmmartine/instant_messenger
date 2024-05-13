import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentChatroomContext } from "./Main";
import { getMessages } from "../util/messageUtil";

export default function ChatroomMessages(props) {
  const { fetchedMessages, setFetchedMessages } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const [allMessages, setAllMessages] = useState();

  useEffect(() => {
    if (!fetchedMessages) {
      getMessages(currentChatroom, setAllMessages);
      setFetchedMessages(true);
    }
  })

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