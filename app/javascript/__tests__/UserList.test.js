import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserList from "../components/UserList";
import { CurrentUserContext, ChatroomContext, LightDarkContext } from "../components/ContextProviderWrapper";
import * as userUtil from "../util/userUtil";
import * as requestUtil from "../util/requestUtil";
import * as THEMES from "../constants/THEMES";

jest.mock("../components/UserMessageNotification", () => () => {
  const MockUserMessageNotification = "UserMessageNotification";
  return <MockUserMessageNotification/>
});

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

  let chatrooms = [ { info: { id: 1, active_status: true, user_ids: [1, 2] }, connection: { received: jest.fn() }}];
  const mockChangeChattingWithUser = jest.fn();
  const mockRefetchCurrentUser = jest.fn();

  function renderUserList() {
      return render(
        <CurrentUserContext.Provider value={currentUser}>
          <ChatroomContext.Provider value={chatrooms}>
            <LightDarkContext.Provider value={THEMES.light}>
              <UserList changeChattingWithUser={mockChangeChattingWithUser} refetchCurrentUser={mockRefetchCurrentUser}/>
            </LightDarkContext.Provider>
          </ChatroomContext.Provider>
        </CurrentUserContext.Provider>
    );
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue(fakeUserList) });
    jest.spyOn(userUtil, 'getUsersBuddies').mockReturnValue(fakeUserList);
    jest.spyOn(requestUtil, 'getPendingReceivedRequests').mockReturnValue(fakeUserList);
  });

  describe("By default", () => {
    it("makes a call to retrieve the current users buddies", async() => {
      renderUserList();
      expect(userUtil.getUsersBuddies).toBeCalled();
    });

    it("shows a list of buddies", async() => {
      renderUserList();
      let buddyList = screen.getByTestId('buddy-list');
      expect(buddyList).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[0].username}`)).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[1].username}`)).toBeInTheDocument();
    });
  });

  describe("When the request tab is clicked", () => {
    it("makes a call to retrieve the current users pending received requests", async() => {
      renderUserList();
      let requestTab = screen.getByTestId('requests-tab');
      await userEvent.click(requestTab);
      expect(requestUtil.getPendingReceivedRequests).toBeCalled();
    });
  
    it("shows a list of the current users pending received requests", async() => {
      renderUserList();
      let requestTab = screen.getByTestId('requests-tab');
      await userEvent.click(requestTab);
      let requestList = screen.getByTestId('requests-list');
      expect(requestList).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[0].username}`)).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[1].username}`)).toBeInTheDocument();
    });
  });

  describe("When the request tab is clicked and the user has no pending requests", () => {
    it("shows a message indicating there are no pending requests", async() => {
      jest.spyOn(requestUtil, 'getPendingReceivedRequests').mockReturnValue([]);
      renderUserList();
      let requestTab = screen.getByTestId('requests-tab');
      await userEvent.click(requestTab);
      let noRequestsMessage = screen.getByText(/No pending requests/i);
      expect(noRequestsMessage).toBeInTheDocument();
    });
  });

  describe("When the request tab is currently open and then the buddy tab is clicked", () => {
    it("shows a list of buddies", async() => {
      renderUserList();
      let requestTab = screen.getByTestId('requests-tab');
      let buddyTab = screen.getByTestId('buddy-tab');
      await userEvent.click(requestTab);
      await userEvent.click(buddyTab);
      let buddyList = screen.getByTestId('buddy-list');
      expect(buddyList).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[0].username}`)).toBeInTheDocument();
      expect(await screen.findByText(`${fakeUserList[1].username}`)).toBeInTheDocument();
    });
  });
})