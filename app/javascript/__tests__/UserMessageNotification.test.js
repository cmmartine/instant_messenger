import { render, screen } from "@testing-library/react";
import UserMessageNotification from "../components/UserMessageNotification";
import * as chatroomUtil from "../util/chatroomUtil";
import * as messageUtil from "../util/messageUtil";
import { CurrentChatroomContext, ChatroomContext } from "../components/ContextProviderWrapper";

describe("OpenChatroomButton", () => {

  let fakeUser = {
    id: 2,
    username: "Herbert"
  };

  let fakeChatroomIds = {
    sameAsRetrievedRoom: 1,
    differentFromRetrievedRoom: 2
  };

  let fakeRetrievedChatroom = {
    id: 1,
    active_status: true
  };

  let chatrooms = [{ info: { id: 1, active_status: true }, connection: { received: jest.fn() }}];

  function fakeCurrentChatroom(currentChatroomId) {
    let fakeCurrentChatroom = { 
      info: { id: currentChatroomId, active_status: true }, 
      connection: jest.fn() 
    };
    return fakeCurrentChatroom;
  };

  function renderUserMessageNotification(currentChatroomId) {
    return render(
      <CurrentChatroomContext.Provider value={fakeCurrentChatroom(currentChatroomId)}>
        <ChatroomContext.Provider value={chatrooms}>
          <UserMessageNotification userInfo={fakeUser} />
        </ChatroomContext.Provider>
      </CurrentChatroomContext.Provider>
    );
  };

  describe('With read_status false', () => {
    beforeEach(async () => {
      jest.spyOn(chatroomUtil, 'findOrCreateChatroom').mockResolvedValue(fakeRetrievedChatroom);
      jest.spyOn(messageUtil, 'checkNewestMessageReadStatus').mockResolvedValue({ read_status: false });
      jest.spyOn(messageUtil, 'changeMessagesReadStatus').mockImplementation(jest.fn());
    });
  
    it("shows New Messages! text when user is not in the room", async () => {
      renderUserMessageNotification(fakeChatroomIds.differentFromRetrievedRoom);
      expect(await screen.findByText('New Message!')).toBeVisible();
    });
  
    it("does NOT show New Messages! text when user is in the room", async () => {
      renderUserMessageNotification(fakeChatroomIds.sameAsRetrievedRoom);
      expect(await screen.findByText('New Message!')).not.toBeVisible();
    });
  });

  describe('With read_status true', () => {
    beforeEach(async () => {
      jest.spyOn(chatroomUtil, 'findOrCreateChatroom').mockResolvedValue(fakeRetrievedChatroom);
      jest.spyOn(messageUtil, 'checkNewestMessageReadStatus').mockResolvedValue({ read_status: true });
      jest.spyOn(messageUtil, 'changeMessagesReadStatus').mockImplementation(jest.fn());
    });
  
    it("does NOT show New Messages! text when user is in the room", async () => {
      renderUserMessageNotification(fakeChatroomIds.sameAsRetrievedRoom);
      expect(await screen.findByText('New Message!')).not.toBeVisible();
    });
  });
})
