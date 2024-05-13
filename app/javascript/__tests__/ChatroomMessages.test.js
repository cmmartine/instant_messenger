import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatroomMessages from "../components/ChatroomMessages";
import { CurrentChatroomContext } from "../components/Main";

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

  let fakeChatroom = { id: 1, active_status: true }

  function renderMessageList() {
    return render(
      <CurrentChatroomContext.Provider value={fakeChatroom}>
        <ChatroomMessages/>
      </CurrentChatroomContext.Provider>
    );
  };

  beforeEach(async () => {
    fetchMock.mockResolvedValue({status: 200, json: jest.fn(() => fakeMessages)});
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("Displays the messages obtained from getMessages fetch", async() => {
    renderMessageList();
    expect(await screen.findByText(`${fakeMessages[0].body}`)).toBeInTheDocument();
    expect(await screen.findByText(`${fakeMessages[1].body}`)).toBeInTheDocument();
  });
})
