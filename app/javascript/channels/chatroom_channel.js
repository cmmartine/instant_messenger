import consumer from "./consumer";

async function getCurrentUserChatrooms() {
  const response = await fetch('/users/current_users_chatrooms');
  const chatrooms = await response.json();
  return chatrooms
};

async function setupUserChatroomConsumers() {

  let users_chatrooms = await getCurrentUserChatrooms();

  users_chatrooms.forEach((room) => {
  consumer.subscriptions.create("ChatroomChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
    },
      
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
      
    received(data) {
        // Called when there's incoming data on the websocket for this channel
    }
  });
  });
}

setupUserChatroomConsumers();