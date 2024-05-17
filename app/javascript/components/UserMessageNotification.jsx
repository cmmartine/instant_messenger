import React, { useContext, useEffect, useState } from "react";
import { ChatroomContext } from "./Main";
import { findChatroom } from "../util/chatroomUtil";

export default function UserMessageNotification(props) {
  const { userInfo } = props;
  const chatrooms = useContext(ChatroomContext);
  const [chatroom, setChatroom] = useState();
  const [unreadMessage, setUnreadMessage] = useState(false)


  useEffect(() => {
    let matchedChatroom = matchChatroomForUser();
    if (matchedChatroom) {
      matchedChatroom.connection.received = () => {setUnreadMessage(true)};
    };
  }, [chatrooms]);

  const matchChatroomForUser = () => {
    findChatroom(userInfo, chatroom, setChatroom);
    let matchedChatroom
    if (chatroom) {
      chatrooms.forEach((room) => {
        if (room.info.id == chatroom.id) {
           matchedChatroom = room
        };
      });
    };
    return matchedChatroom;
  };

  if (unreadMessage) {
    return(
      <div>
        New Message!
      </div>
    )
  };
}