import consumer from "./consumer";

export default function ChatroomChannel(chatroom) {
  return consumer.subscriptions.create({ channel: "ChatroomChannel", room: chatroom.id }, {
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
}