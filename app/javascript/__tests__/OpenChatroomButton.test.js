import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OpenChatroomButton from "../components/OpenChatroomButton";

require('jest-fetch-mock').enableMocks();

describe("OpenChatroomButton", () => {

  let fakeUser = {
    id: 2,
    username: "Herbert"
  };

  function renderOpenChatroomButton() {
    return render (
      <OpenChatroomButton key={fakeUser.id} userInfo={fakeUser} changeChattingWithUser={jest.fn()} refetchCurrentUser={jest.fn()} changeCurrentChatroom={jest.fn()}/>
    );
  };

  it("renders the users name on the button", async() => {
    renderOpenChatroomButton();
    expect(await screen.getByText(`${fakeUser.username}`)).toBeInTheDocument();
  });
})