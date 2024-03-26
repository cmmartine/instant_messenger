import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/UserList";
import { CurrentUserContext } from "../components/Main";

require('jest-fetch-mock').enableMocks()

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
  ]

  let currentUser = {
    username: 'Alfred',
    id: 1
  }

  function renderUserList() {
      return render(
        <CurrentUserContext.Provider value={currentUser}>
          <UserList/>
        </CurrentUserContext.Provider>
    );
  };

  beforeEach(async () => {
    fetchMock.mockResolvedValue({status: 200, json: jest.fn(() => fakeUserList)});
  });

  afterEach(() => {
    fetchMock.resetMocks();
  })

  it("shows the user list", async() => {
    renderUserList();
    expect(await screen.findByText("Herbert")).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
  })
})