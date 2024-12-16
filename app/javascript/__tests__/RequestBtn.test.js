import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RequestBtn from "../components/RequestBtn";
import * as requestUtil from "../util/requestUtil";
import { LightDarkContext } from "../components/Main";
import * as THEMES from "../constants/THEMES";

describe("RequestBtn", () => {
  let userId = 1;

  function renderRequestBtn() {
    return render(
      <LightDarkContext.Provider value={THEMES.light}>
        <RequestBtn userId={userId}/>
      </LightDarkContext.Provider>
    );
  };
  
  describe("When there is already a pending request", () => {
    beforeEach(async () => {
      jest.spyOn(requestUtil, 'checkForPendingRequest').mockReturnValue(true);
    });

    it("the button is disabled", async() => {
      renderRequestBtn();
      await waitFor(() => {
        let requestButton = screen.getByRole('button');
        expect(requestButton).toBeDisabled();
      });
    });

    it("the button has text for a pending request", async() => {
      renderRequestBtn();
      await waitFor(() => {
        let requestButton = screen.getByRole('button');
        expect(requestButton).toHaveTextContent('Pending');
      });
    });
  });

  describe("When there is NOT a pending request", () => {
    beforeEach(async () => {
      jest.spyOn(requestUtil, 'checkForPendingRequest').mockReturnValue(false);
      jest.spyOn(requestUtil, 'postNewRequest')
    });

    it("the button is NOT disabled", async() => {
      renderRequestBtn();
      await waitFor(() => {
        let requestButton = screen.getByRole('button');
        expect(requestButton).not.toBeDisabled();
      });
    });

    it("the button has text for adding a buddy", async() => {
      renderRequestBtn();
      await waitFor(() => {
        let requestButton = screen.getByRole('button');
        expect(requestButton).toHaveTextContent('Add Buddy');
      });
    });

    it("posts the new request when button is clicked", async() => {
      renderRequestBtn();
      await waitFor(() => {
        let requestButton = screen.getByRole('button');
        userEvent.click(requestButton);
        expect(requestUtil.postNewRequest).toBeCalled();
      });
    });
  });
})