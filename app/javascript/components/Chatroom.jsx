import React from "react";
import { useContext, useEffect } from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";
import { CurrentChatroomContext, LightDarkContext } from "./ContextProviderWrapper";
import { postUserIsNotTyping } from "../util/chatroomUtil";
import { changeMessagesReadStatus } from "../util/messageUtil";
import { THEMES } from "../constants_ts/THEMES";
import setupDraggingAndResizing from "../util/dragAndResize";

export default function Chatroom(props) {
  const { chattingWithUser, changeCurrentChatroom } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const lightDarkTheme = useContext(LightDarkContext);

  const isDarkTheme = lightDarkTheme === THEMES.dark;
  const containerClass = isDarkTheme ? 'chatroom-container chatroom-container-dark' : 'chatroom-container';
  const topbarClass = isDarkTheme ? 'chatroom-topbar chatroom-topbar-dark' : 'chatroom-topbar';
  const exitButtonClass = isDarkTheme ? 'chatroom-exit-btn chatroom-exit-btn-dark' : 'chatroom-exit-btn';

  useEffect(() => {
    const dataType = 'chatroom';
    setupDraggingAndResizing(dataType);
  });

  const exitChatroom = (e) => {
    e.preventDefault();
    let chatroom;
    postUserIsNotTyping(currentChatroom.info.id);
    changeMessagesReadStatus(currentChatroom.info.id);
    changeCurrentChatroom(chatroom);
  };

  return (
    <div className={containerClass} data-draggable-chatroom='true' data-resizable-chatroom='true'>
      <div className={topbarClass} data-drag-handle-chatroom='true'>
        <div>{chattingWithUser.username}</div>
        <button className={exitButtonClass} onClick={exitChatroom}>X</button>
      </div>
      <ChatroomMessages chattingWithUser={chattingWithUser}/>
      <MessageBox chattingWithUser={chattingWithUser}/>
    </div>
  );
}