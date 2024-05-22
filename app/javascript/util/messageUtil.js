import { getCsrfToken } from "./csrfTokenUtil";

export const getMessages = (currentChatroom, setAllMessages, setMessagesChatroom) => {
  let csrf = getCsrfToken();
  fetch('chatrooms/messages', {
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
    const messages = data[0];
    const chatroom_id = data[1];
    setAllMessages(messages);
    setMessagesChatroom(chatroom_id);
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
  )
};

export const updateMessageReadStatus = () => {

};

export const checkNewestMessageReadStatus = (chatroom_id, setUnreadMessage) => {
  let csrf = getCsrfToken();
  fetch('messages/most_recent_message_read_status', {
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
    console.log(data)
    let unread_message = !data.read_status;
    setUnreadMessage(unread_message);
  });
};