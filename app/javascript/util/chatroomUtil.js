import { getCsrfToken } from "./csrfTokenUtil";
import { apiPostFetch } from "./apiUtil";

export const findOrCreateChatroom = (userInfo) => {
  let csrf = getCsrfToken();
  return fetch('chatrooms/find_or_create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body:
      JSON.stringify({
        chatroom: {
          active_status: true,
          userId: userInfo.id
        }
      })
  }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
};

export const postUserIsTyping = (chatroom_id) => {
  const postParams = {
    chatroom: {
      chatroom_id: chatroom_id
    }
  };

  return apiPostFetch('chatrooms/user_is_typing', postParams);
};

export const postUserIsNotTyping = (chatroom_id) => {
  const postParams = {
    chatroom: {
      chatroom_id: chatroom_id
    }
  };

  return apiPostFetch('chatrooms/user_is_not_typing', postParams);
};