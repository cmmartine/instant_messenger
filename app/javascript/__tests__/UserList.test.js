import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/UserList";
import { CurrentUserContext, ChatroomContext } from "../components/Main";
import * as userUtil from "../util/userUtil";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";

require('jest-fetch-mock').enableMocks();

describe("UserList", () => {

  let fakeUserList = [
    {
      id: 2,
      username: "Herbert"
    },
    {
      id: 3,
      username: "Alice"
    }
  ];

  let currentUser = {
    username: 'Alfred',
    id: 1
  };

  let chatrooms = [ { info: { id: 1, active_status: true }, connection: null } ];

  function renderUserList() {
      return render(
        <CurrentUserContext.Provider value={currentUser}>
          <ChatroomContext.Provider value={chatrooms}>
            <LightDarkContext.Provider value={THEMES.light}>
              <UserList/>
            </LightDarkContext.Provider>
          </ChatroomContext.Provider>
        </CurrentUserContext.Provider>
    );
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue(fakeUserList) });
    jest.spyOn(userUtil, 'getUsers');
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("shows the clickable user list", async() => {
    renderUserList();
    expect(fetch).toBeCalled();
    expect(userUtil.getUsers).toBeCalled();
    expect(await screen.findByText(`${fakeUserList[0].username}`)).toBeInTheDocument();
    expect(await screen.findByText(`${fakeUserList[1].username}`)).toBeInTheDocument();
  });
})