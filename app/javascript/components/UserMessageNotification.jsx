import React, { useContext, useEffect, useState } from "react";
import { ChatroomContext, CurrentChatroomContext } from "./Main";
import { findChatroom } from "../util/chatroomUtil";
import { checkNewestMessageReadStatus, changeMessagesReadStatus } from "../util/messageUtil";

export default function UserMessageNotification(props) {
  const { userInfo } = props;
  const chatrooms = useContext(ChatroomContext);
  const currentChatroom = useContext(CurrentChatroomContext);
  const [chatroom, setChatroom] = useState();
  const [unreadMessage, setUnreadMessage] = useState(false)


  useEffect(() => {
    let matchedChatroom = matchChatroomForUser();
    if (matchedChatroom) {
      checkNewestMessageReadStatus(matchedChatroom.info.id, setUnreadMessage);
      matchedChatroom.connection.received = () => {checkNewestMessageReadStatus(matchedChatroom.info.id, setUnreadMessage)};
    };
    return() => {
      if (matchedChatroom) {
        matchedChatroom.connection.received = () => {};
      };
    };
  });

  const matchChatroomForUser = () => {
    findChatroom(userInfo, chatroom, setChatroom);
    let matchedChatroom
    if (chatroom) {
      chatrooms.forEach((room) => {
        if (room.info.id == chatroom.id) {
          console.log(chatroom)
           matchedChatroom = room
        };
      });
    };
    return matchedChatroom;
  };

  const isChatroomCurrentlyOpen = () => {
    if (chatroom && currentChatroom) {
      if (chatroom.id == currentChatroom.info.id) {
        changeMessagesReadStatus(currentChatroom.info.id);
        return true;
      } else {
        return false;
      }
    }
  };

  if (unreadMessage && !isChatroomCurrentlyOpen()) {
    return(
      <div>
        New Message!
      </div>
    )
  };
}