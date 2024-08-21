import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import UserSearchResultBox from "../components/UserSearchResultBox";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";

require('jest-fetch-mock').enableMocks();

describe("UserSearchResultBox", () => {

  const foundUsers = [
    {
      username: 'Harry',
      id: 2
    },
    {
      username: 'Ron',
      id: 3
    }
  ];

  const resetFoundUsers = jest.fn();

  function renderUserSearchResultBox() {
    render(
      <LightDarkContext.Provider value={THEMES.light}>
        <div data-testid='click-test'></div>
        <UserSearchResultBox foundUsers={foundUsers} resetFoundUsers={resetFoundUsers}/>
      </LightDarkContext.Provider> 
    );
  };

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the users in foundUsers in a list', async() => {
    renderUserSearchResultBox();
    expect(await screen.findByText(`${foundUsers[0].username}`)).toBeInTheDocument();
    expect(await screen.findByText(`${foundUsers[1].username}`)).toBeInTheDocument();
  });

  it('calls resetFoundUsers when something outside of component is clicked', async() => {
    // Need to override this methods return to set component position, defaults to 0 in tests otherwise
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(
      {
        x: 1,
        y: 1,
        bottom: 1,
        height: 1,
        left: 1,
        right: 1,
        top: 1,
        width: 1
      }
    );
    renderUserSearchResultBox();
    const clickTestDiv = screen.getByTestId('click-test');
    await userEvent.click(clickTestDiv);
    expect(resetFoundUsers).toBeCalled();
  });
})