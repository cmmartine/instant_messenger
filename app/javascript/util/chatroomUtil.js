import { getCsrfToken } from "./csrfTokenUtil";

export const createChatroom = (userInfo) => {
  let csrf = getCsrfToken();
  return fetch('chatrooms/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({chatroom: {
        active_status: true,
        userId: userInfo.id
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
};

export const findChatroom = (userInfo) => {
  let csrf = getCsrfToken();
  return fetch('chatrooms/match_chatroom', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({chatroom: {
        userId: userInfo.id
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
};