import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LightDarkModeBtn from "../components/LightDarkModeBtn";
import { LightDarkContext } from "../components/ContextProviderWrapper";
import * as userUtil from '../util/userUtil';
import { THEMES, THEMEICONS } from "../constants_ts/THEMES";

describe("LightDarkModeBtn", () => {

  let lightOrDark = THEMES.light;
  let setLightOrDark = jest.fn();

  function renderLightDarkModeBtn(currentTheme) {
    return render(
      <LightDarkContext.Provider value={currentTheme}>
        <LightDarkModeBtn lightOrDark ={lightOrDark} setLightOrDark={setLightOrDark}/>
      </LightDarkContext.Provider>
    )
  };

  describe("when current theme is light", () => {
    beforeEach(async () => {
      jest.spyOn(userUtil, 'setTheme').mockImplementation(jest.fn());
    });

    it("renders the light theme icon", async() => {
      renderLightDarkModeBtn(THEMES.light);
      expect(await screen.getByText(THEMEICONS.light)).toBeInTheDocument();
    })

    it("changes and sets the theme when clicked", async() => {
      renderLightDarkModeBtn(THEMES.light);
      await userEvent.click(screen.getAllByText(THEMEICONS.light)[0]);
      expect(userUtil.setTheme).toBeCalled();
      expect(setLightOrDark).toBeCalled();
    })
  })

  describe("when current theme is dark", () => {
    beforeEach(async () => {
      jest.spyOn(userUtil, 'setTheme').mockImplementation(jest.fn());
    });

    it("renders the dark theme icon", async() => {
      renderLightDarkModeBtn(THEMES.dark);
      expect(await screen.getByText(THEMEICONS.dark)).toBeInTheDocument();
    })

    it("changes and sets the theme when clicked", async() => {
      renderLightDarkModeBtn(THEMES.dark);
      await userEvent.click(screen.getAllByText(THEMEICONS.dark)[0]);
      expect(userUtil.setTheme).toBeCalled();
      expect(setLightOrDark).toBeCalled();
    })
  })
});