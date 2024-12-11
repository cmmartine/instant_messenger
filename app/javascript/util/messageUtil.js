import { getCsrfToken } from "./csrfTokenUtil";
import { apiPostFetch } from "./apiUtil";

export const getMessages = (currentChatroom) => {
  const postParams = {
    chatroom: {
      chatroom_id: currentChatroom.info.id
    }
  };

  return apiPostFetch('chatrooms/messages', postParams);
};

export const postMessage = (message, currentChatroom) => {
  const postParams = {
    message: {
      body: message,
      chatroom_id: currentChatroom.info.id
    }
  };

  return apiPostFetch('messages/create', postParams);
};

export const postAIChatroomMessages = (message, currentChatroom) => {
  // This method throws a 504 timeout, from Nginx proxy?
  const postParams = {
    message: {
      body: message,
      chatroom_id: currentChatroom.info.id
    }
  };

  return apiPostFetch('messages/create_ai_chatroom_messages', postParams);
};

export const checkNewestMessageReadStatus = (chatroom_id) => {
  const postParams = {
    message: {
      chatroom_id: chatroom_id
    }
  };

  return apiPostFetch('messages/most_recent_message_read_status', postParams)
};

export const changeMessagesReadStatus = (chatroom_id) => {
  const postParams = {
    message: {
      chatroom_id: chatroom_id
    }
  };

  return apiPostFetch('messages/update_chatroom_messages_read_status', postParams);
};