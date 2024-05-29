import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserMessageNotification from "../components/UserMessageNotification";
import * as chatroomUtil from "../util/chatroomUtil";
import * as messageUtil from "../util/messageUtil";
import { CurrentChatroomContext, ChatroomContext } from "../components/Main";

require('jest-fetch-mock').enableMocks();

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

  beforeEach(async () => {
    jest.spyOn(chatroomUtil, 'findChatroom').mockResolvedValue(fakeRetrievedChatroom);
    jest.spyOn(messageUtil, 'checkNewestMessageReadStatus').mockResolvedValue({ read_status: false });
    jest.spyOn(messageUtil, 'changeMessagesReadStatus').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows New Messages! text when user is not in a room that has a message with read_status false", async () => {
    renderUserMessageNotification(fakeChatroomIds.differentFromRetrievedRoom);
    expect(await screen.findByText('New Message!')).toBeVisible();
  });

  it("does NOT show New Messages! text when user is in the room that has a message with read_status false", async () => {
    renderUserMessageNotification(fakeChatroomIds.sameAsRetrievedRoom);
    expect(await screen.findByText('New Message!')).not.toBeVisible();
  });
})
