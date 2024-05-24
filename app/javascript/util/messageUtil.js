import { getCsrfToken } from "./csrfTokenUtil";

export const getMessages = (currentChatroom) => {
  let csrf = getCsrfToken();
  return fetch('chatrooms/messages', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({chatroom: {
        chatroom_id: currentChatroom.info.id
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
};

export const postMessage = (message, currentChatroom) => {
  let csrf = getCsrfToken();
  fetch('messages/create', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({message: {
        body: message,
        chatroom_id: currentChatroom.info.id
      }})
    }
  );
};

export const checkNewestMessageReadStatus = (chatroom_id) => {
  let csrf = getCsrfToken();
  return fetch('messages/most_recent_message_read_status', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({message: {
        chatroom_id: chatroom_id
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
};

export const changeMessagesReadStatus = (chatroom_id) => {
  let csrf = getCsrfToken();
  fetch('messages/update_chatroom_messages_read_status', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({message: {
        chatroom_id: chatroom_id
      }})
    }
  );
};