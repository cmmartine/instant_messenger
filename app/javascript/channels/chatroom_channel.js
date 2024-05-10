import consumer from "./consumer";

export default function setupUserChatroomConsumers(chatroom) {
  consumer.subscriptions.create({ channel: "ChatroomChannel", room: chatroom.id }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log(`connected to chatroom ${chatroom.id}`)
    },
        
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
        
    received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log(data)
    }
  });
}