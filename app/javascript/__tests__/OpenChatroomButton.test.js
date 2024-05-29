import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import OpenChatroomButton from "../components/OpenChatroomButton";
import * as chatroomUtil from "../util/chatroomUtil";

require('jest-fetch-mock').enableMocks();

describe("OpenChatroomButton", () => {

  let fakeUser = {
    id: 2,
    username: "Herbert"
  };

  let fakeChatroom = {
    id: 1,
    active_status: true
  }

  const changeChattingWithUser = jest.fn();
  const refetchCurrentUser = jest.fn();

  function renderOpenChatroomButton() {
    return render (
      <OpenChatroomButton key={fakeUser.id} userInfo={fakeUser} changeChattingWithUser={changeChattingWithUser} refetchCurrentUser={refetchCurrentUser}/>
    );
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue(fakeChatroom) });
    jest.spyOn(chatroomUtil, 'findOrCreateChatroom');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the users name on the button", async() => {
    renderOpenChatroomButton();
    expect(await screen.getByText(`${fakeUser.username}`)).toBeInTheDocument();
  });

  it("fetches a chatroom", async() => {
    renderOpenChatroomButton();
    await userEvent.click(screen.getByText(`${fakeUser.username}`));
    expect(fetch).toBeCalled();
    expect(chatroomUtil.findOrCreateChatroom).toBeCalled();
  })

  it("changes the user being chatted with", async() => {
    renderOpenChatroomButton();
    await userEvent.click(screen.getByText(`${fakeUser.username}`));
    expect(changeChattingWithUser).toBeCalled();
  })

  it("refetches the current users info", async() => {
    renderOpenChatroomButton();
    await userEvent.click(screen.getByText(`${fakeUser.username}`));
    expect(refetchCurrentUser).toBeCalled();
  })
})