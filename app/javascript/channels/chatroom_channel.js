import consumer from "./consumer";

async function getCurrentUserChatrooms() {
  const response = await fetch('/users/current_users_chatrooms');
  const chatrooms = await response.json();
  return chatrooms
};

async function setupUserChatroomConsumers() {

  let users_chatrooms = await getCurrentUserChatrooms();

  users_chatrooms.forEach((room) => {
  consumer.subscriptions.create({ channel: "ChatroomChannel", room: `chatroom_${room.id}` }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log(`connected to chatroom_${room.id}`)
    },
      
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
      
    received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log(data)
    }
  });
  });
}

setupUserChatroomConsumers();