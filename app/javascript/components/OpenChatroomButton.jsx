import React from "react";
import { findOrCreateChatroom } from "../util/chatroomUtil";

export default function OpenChatroomButton(props) {
  const { userInfo, changeChattingWithUser, refetchCurrentUser } = props;

  const createAndOpenChatbox = () => {
    findOrCreateChatroom(userInfo).then((data) => {
      let chatroom = data;
      changeChattingWithUser(userInfo);
      refetchCurrentUser(chatroom);
    });
  };

  return(
    <div id={`user.${userInfo.id}`} onClick={(e) => {
      e.preventDefault();
      createAndOpenChatbox();
    }}>
      <li key={userInfo.id}>{userInfo.username}</li>
    </div>
  );
}