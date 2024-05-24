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

  let fakeCurrentChatroom = { 
    info: { id: 2, active_status: true }, 
    connection: jest.fn() 
  }

  let fakeRetrievedChatroom = {
    id: 1,
    active_status: true
  }

  let chatrooms = [{ info: { id: 1, active_status: true }, connection: { received: jest.fn() }}];


  function renderUserMessageNotification() {
    return render(
      <CurrentChatroomContext.Provider value={fakeCurrentChatroom}>
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

  it("shows New Messages text when user is not in a room that has a message with read_status false", async () => {
    renderUserMessageNotification();
    expect(await screen.findByText('New Message!')).toBeInTheDocument();
  });
})
