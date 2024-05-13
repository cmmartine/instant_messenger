import { getCsrfToken } from "./csrfTokenUtil";

export const getMessages = (currentChatroom, setAllMessages) => {
  console.log("fetching messages")
  let csrf = getCsrfToken();
  fetch('chatrooms/messages', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': csrf,
    },
    body: 
      JSON.stringify({chatroom: {
        chatroom_id: currentChatroom.id
      }})
    }
  ).then((res) => {
    return res.json();
  }).then((data) => {
    setAllMessages(data);
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
        chatroom_id: currentChatroom.id
      }})
    }
  );
};