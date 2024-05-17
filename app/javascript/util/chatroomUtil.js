import { getCsrfToken } from "./csrfTokenUtil";

export const createChatroom = (userInfo, refetchCurrentUser, changeChattingWithUser) => {
  let chatroom;
  let csrf = getCsrfToken();
  fetch('chatrooms/create', {
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
    chatroom = data;
    changeChattingWithUser(userInfo);
    refetchCurrentUser(chatroom);
  })
};

export const findChatroom = (userInfo, chatroom, setChatroom) => {
  let csrf = getCsrfToken();
  fetch('chatrooms/match_chatroom', {
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
    if (!chatroom) {
      setChatroom(data);
    }
  })
};