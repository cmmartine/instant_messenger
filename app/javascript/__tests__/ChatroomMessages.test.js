import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatroomMessages from "../components/ChatroomMessages";
import { CurrentChatroomContext, CurrentUserContext } from "../components/Main";
import * as messageUtil from "../util/messageUtil";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";

require('jest-fetch-mock').enableMocks();

describe("ChatroomMessages", () => {
  let fakeMessages = [
    { 
      id: 1,
      body: "Test 1",
      user_id: 1,
      chatroom_id: 1
    },
    { 
      id: 2,
      body: "Test 2",
      user_id: 2,
      chatroom_id: 1
    }
  ];

  let fakeChatroom = { info: { id: 1, active_status: true } };
  let fakeChatroomId  = { id: 1 };

  let currentUser = {
    username: 'Alfred',
    id: 1
  };

  let chattingWithUser = {
    username: "fakeuser"
  };

  function renderMessageList() {
    return render(
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentChatroomContext.Provider value={fakeChatroom}>
          <LightDarkContext.Provider value={THEMES.light}>
            <ChatroomMessages chattingWithUser={chattingWithUser}/>
          </LightDarkContext.Provider>
        </CurrentChatroomContext.Provider>
      </CurrentUserContext.Provider>
    );
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue([fakeMessages, fakeChatroomId]) });
    jest.spyOn(messageUtil, 'getMessages');
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("Displays the messages obtained from getMessages fetch", async() => {
    renderMessageList();
    expect(fetch).toBeCalled();
    expect(messageUtil.getMessages).toBeCalled();
    expect(await screen.findByText(`${fakeMessages[0].body}`)).toBeInTheDocument();
    expect(await screen.findByText(`${fakeMessages[1].body}`)).toBeInTheDocument();
  });
})
