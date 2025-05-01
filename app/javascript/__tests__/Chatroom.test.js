import { render, screen } from "@testing-library/react";
import Chatroom from "../components/Chatroom";
import userEvent from "@testing-library/user-event";
import { CurrentChatroomContext, LightDarkContext } from "../components/ContextProviderWrapper";
import * as THEMES from "../constants/THEMES";

jest.mock("../components/ChatroomMessages", () => () => {
  const MockChatroomMessages = "ChatroomMessages";
  return <MockChatroomMessages/>
});

jest.mock("../components/MessageBox", () => () => {
  const MockMessageBox = "MessageBox";
  return <MockMessageBox/>
});

jest.mock("../components/SpeechToTextBtn", () => () => {
  const MockSpeechToTextBtn = "SpeechToTextBtn";
  return <MockSpeechToTextBtn/>
});

describe("Chatroom", () => {

  let chattingWithUser = {
    username: "fakeuser"
  };

  let fakeChatroom = { info: { id: 1, active_status: true } };

  const changeCurrentChatroom = jest.fn();

  function renderChatroom() {
    return render(
      <CurrentChatroomContext.Provider value={fakeChatroom}>
        <LightDarkContext.Provider value={THEMES.light}>
          <Chatroom chattingWithUser={chattingWithUser} changeCurrentChatroom={changeCurrentChatroom}/>
        </LightDarkContext.Provider>
      </CurrentChatroomContext.Provider>
    );
  };

  it("shows the user that is being chatted with", async() => {
    renderChatroom();
    expect(await screen.getByText("fakeuser")).toBeInTheDocument();
  });

  it("removes the component when the exit button is clicked", async() => {
    renderChatroom();
    await userEvent.click(screen.getByRole('button'));
    expect(changeCurrentChatroom).toBeCalled();
  });
})