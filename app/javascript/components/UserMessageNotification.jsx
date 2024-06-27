import React, { useContext, useEffect, useState } from "react";
import { ChatroomContext, CurrentChatroomContext, CurrentUserContext } from "./Main";
import { findOrCreateChatroom } from "../util/chatroomUtil";
import { checkNewestMessageReadStatus, changeMessagesReadStatus } from "../util/messageUtil";

export default function UserMessageNotification(props) {
  const { userInfo } = props;
  const chatrooms = useContext(ChatroomContext);
  const currentChatroom = useContext(CurrentChatroomContext);
  const currentUser = useContext(CurrentUserContext);
  const [chatroom, setChatroom] = useState();
  const [unreadMessage, setUnreadMessage] = useState(false);
  const [userIsTyping, setUserIsTyping] = useState(false);


  useEffect(() => {
    let matchedChatroom = matchChatroomForUser();
    if (matchedChatroom) {
      checkReadStatus(matchedChatroom);
      matchedChatroom.connection.received = (data) => {
        if (data.finished_message) {
          checkReadStatus(matchedChatroom)
        } else if (data.user_is_typing) {
          const isCurrentUserTyping = data.user_is_typing.current_user_id == currentUser.id;
          data.user_is_typing.status && !isCurrentUserTyping ? setUserIsTyping(true) : setUserIsTyping(false);
        };
      };
    };
    return() => {
      if (matchedChatroom) {
        matchedChatroom.connection.received = () => {};
      };
    };
  });

  const matchChatroomForUser = () => {
    let matchedChatroom;
    if (!chatroom) {
      findOrCreateChatroom(userInfo).then((data) => {
          setChatroom(data);
      });
    } else if (chatroom) {
      chatrooms.forEach((room) => {
        if (room.info.id == chatroom.id) {
           matchedChatroom = room;
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

  const checkReadStatus = (matchedChatroom) => {
    checkNewestMessageReadStatus(matchedChatroom.info.id).then((data) => {
      setUnreadMessage(!data.read_status)
    });
  };

 if (userIsTyping) {
    return(
      <div>...</div>
    )
  } else if (unreadMessage && !isChatroomCurrentlyOpen()) {
    return(
      <div>
        New Message!
      </div>
    )
  } else if (!unreadMessage && isChatroomCurrentlyOpen()) {
    return(
      <div style={{display: 'none'}}>
        New Message!
      </div>
    )
  } 
}