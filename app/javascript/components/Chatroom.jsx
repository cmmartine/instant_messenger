import React from "react";
import { useContext, useEffect } from "react";
import ChatroomMessages from "./ChatroomMessages";
import MessageBox from "./MessageBox";
import { CurrentChatroomContext } from "./Main";
import { LightDarkContext } from "./Main";
import { postUserIsNotTyping } from "../util/chatroomUtil";
import * as THEMES from "../constants/THEMES";
import setupDraggingAndResizing from "../util/dragAndResize";

export default function Chatroom(props) {
  const { chattingWithUser, changeCurrentChatroom } = props;
  const currentChatroom = useContext(CurrentChatroomContext);
  const lightDarkTheme = useContext(LightDarkContext);

  useEffect(() => {
    const dataType = 'chatroom';
    setupDraggingAndResizing(dataType);
  });

  const exitChatroom = (e) => {
    e.preventDefault();
    let chatroom;
    postUserIsNotTyping(currentChatroom.info.id);
    changeCurrentChatroom(chatroom);
  };

  if (lightDarkTheme == THEMES.light) {
    return (
      <div className='chatroom-container' data-draggable-chatroom='true' data-resizable-chatroom='true'>
        <div className='chatroom-topbar' data-drag-handle-chatroom='true'>
          <div>{chattingWithUser.username}</div>
          <button className='chatroom-exit-btn' onClick={exitChatroom}>X</button>
        </div>
        <ChatroomMessages chattingWithUser={chattingWithUser}/>
        <MessageBox chattingWithUser={chattingWithUser}/>
      </div>
    );
  } else if (lightDarkTheme == THEMES.dark) {
    return (
      <div className='chatroom-container chatroom-container-dark' data-draggable-chatroom='true' data-resizable-chatroom='true'>
        <div className='chatroom-topbar chatroom-topbar-dark' data-drag-handle-chatroom='true'>
          <div>{chattingWithUser.username}</div>
          <button className='chatroom-exit-btn chatroom-exit-btn-dark' onClick={exitChatroom}>X</button>
        </div>
        <ChatroomMessages chattingWithUser={chattingWithUser}/>
        <MessageBox chattingWithUser={chattingWithUser}/>
      </div>
    );
  }
}