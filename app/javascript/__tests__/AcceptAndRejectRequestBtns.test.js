import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AcceptAndRejectRequestBtns from "../components/AcceptAndRejectRequestBtns";
import * as requestUtil from "../util/requestUtil";
import { LightDarkContext } from "../components/Main";
import * as THEMES from "../constants/THEMES";

describe("AcceptAndRejectRequestBtns", () => {
  let requestId = 1;
  let resetUsersFetched= jest.fn();

  function renderAcceptAndRejectRequestBtns() {
    return render(
      <LightDarkContext.Provider value={THEMES.light}>
        <AcceptAndRejectRequestBtns requestId={requestId} resetUsersFetched={resetUsersFetched}/>
      </LightDarkContext.Provider>
    );
  };

  describe("When the accept button is clicked", () => {
    beforeEach(async() => {
      jest.spyOn(requestUtil, 'acceptBuddyRequest');
    });

    it("calls acceptBuddyRequest and resetUsersFetched", async() => {
      renderAcceptAndRejectRequestBtns();
      let acceptBtn = await screen.getByText('Accept');
      await userEvent.click(acceptBtn);
      expect(requestUtil.acceptBuddyRequest).toBeCalled();
      expect(resetUsersFetched).toBeCalled();
    })
  });

  describe("When the reject button is clicked", () => {
    beforeEach(async() => {
      jest.spyOn(requestUtil, 'rejectBuddyRequest');
    });

    it("calls rejectBuddyRequest and resetUsersFetched", async() => {
      renderAcceptAndRejectRequestBtns();
      let rejectBtn = await screen.getByText('Reject');
      await userEvent.click(rejectBtn);
      expect(requestUtil.rejectBuddyRequest).toBeCalled();
      expect(resetUsersFetched).toBeCalled();
    })
  });
})