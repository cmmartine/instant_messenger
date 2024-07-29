import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chatroom from "../components/Chatroom";
import userEvent from "@testing-library/user-event";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";

jest.mock("../components/ChatroomMessages", () => () => {
  const MockChatroomMessages = "ChatroomMessages";
  return <MockChatroomMessages/>
});

jest.mock("../components/MessageBox", () => () => {
  const MockMessageBox = "MessageBox";
  return <MockMessageBox/>
});

describe("Chatroom", () => {

  let chattingWithUser = {
    username: "fakeuser"
  };

  const changeCurrentChatroom = jest.fn();

  function renderChatroom() {
    return render(
      <LightDarkContext.Provider value={THEMES.light}>
        <Chatroom chattingWithUser={chattingWithUser} changeCurrentChatroom={changeCurrentChatroom}/>
      </LightDarkContext.Provider>
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