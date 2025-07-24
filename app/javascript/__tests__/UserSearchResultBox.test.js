import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearchResultBox from "../components/UserSearchResultBox";
import { CurrentUserContext, LightDarkContext } from "../components/ContextProviderWrapper";
import { THEMES } from "../constants_ts/THEMES";

jest.mock("../components/RequestBtn", () => () => {
  const MockRequestBtn = "RequestBtn";
  return <MockRequestBtn data-testid='mock-request-btn'/>
});

describe("UserSearchResultBox", () => {

  const foundUsers = [
    {
      username: 'Harry',
      id: 2
    },
    {
      username: 'Ron',
      id: 3
    },
    {
      username: 'Hermione',
      id: 4
    }
  ];

  let currentUser = {
    username: 'Alfred',
    id: 1
  };

  let allBuddies = [
    {
      username: 'Hermione',
      id: 4
    }
  ]

  const resetFoundUsers = jest.fn();

  function renderUserSearchResultBox() {
    render(
      <CurrentUserContext.Provider value={currentUser}>
        <LightDarkContext.Provider value={THEMES.light}>
          <div data-testid='click-test'></div>
          <UserSearchResultBox foundUsers={foundUsers} resetFoundUsers={resetFoundUsers} allBuddies={allBuddies}/>
        </LightDarkContext.Provider> 
      </CurrentUserContext.Provider>
    );
  };

  it('renders the users in foundUsers in a list', async() => {
    renderUserSearchResultBox();
    expect(await screen.findByText(`${foundUsers[0].username}`)).toBeInTheDocument();
    expect(await screen.findByText(`${foundUsers[1].username}`)).toBeInTheDocument();
  });

  it('does not render request buttons for users that are buddies', async() => {
    renderUserSearchResultBox();
    expect(await screen.findAllByTestId('mock-request-btn')).toHaveLength(2);
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