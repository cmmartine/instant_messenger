import { getCsrfToken } from "./csrfTokenUtil";

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
  let csrf = getCsrfToken();
  return fetch('chatrooms/user_is_typing', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body:
      JSON.stringify({
        chatroom: {
          chatroom_id: chatroom_id
        }
      })
  }
  );
};

export const postUserIsNotTyping = (chatroom_id) => {
  let csrf = getCsrfToken();
  return fetch('chatrooms/user_is_not_typing', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body:
      JSON.stringify({
        chatroom: {
          chatroom_id: chatroom_id
        }
      })
  }
  );
};