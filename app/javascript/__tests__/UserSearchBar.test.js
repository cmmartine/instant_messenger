import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearchBar from "../components/UserSearchBar";
import { LightDarkContext } from "../components/ContextProviderWrapper";
import * as THEMES from "../constants/THEMES";
import * as userUtil from "../util/userUtil";

describe("UserSearchBar", () => {
  function renderUserSearchBar() {
    return render(
      <LightDarkContext.Provider value={THEMES.light}>
        <UserSearchBar allBuddies={[]}/>
      </LightDarkContext.Provider>
    );
  };

  beforeEach(async () => {
    jest.spyOn(userUtil, 'searchUsers').mockReturnValue([]);
  });

  it('does not call searchUsers when the input value is missing', async() => {
    renderUserSearchBar();
    const submit = screen.getByRole('button');
    await userEvent.click(submit);
    expect(userUtil.searchUsers).not.toBeCalled();
  })

  it('does call searchUsers when the input value is any character', async() => {
    renderUserSearchBar();
    const input = screen.getByRole('searchbox');
    const submit = screen.getByRole('button');
    await userEvent.type(input, 'A');
    await userEvent.click(submit);
    expect(userUtil.searchUsers).toBeCalled();
  })
})