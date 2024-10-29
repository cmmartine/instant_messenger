import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserSearchBar from "../components/UserSearchBar";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";
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
    jest.spyOn(global, 'fetch').mockResolvedValue({ status: 200, json: jest.fn().mockResolvedValue('') });
    jest.spyOn(userUtil, 'searchUsers');
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