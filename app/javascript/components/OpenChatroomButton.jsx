import React from "react";
import { createChatroom } from "../util/chatroomUtil";

export default function OpenChatroomButton(props) {
  const { userInfo, changeChattingWithUser, refetchCurrentUser, changeCurrentChatroom } = props;

  const createAndOpenChatbox = () => {
    createChatroom(userInfo, refetchCurrentUser, changeCurrentChatroom);
    changeChattingWithUser(userInfo);
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