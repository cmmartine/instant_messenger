import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageBox from "../components/MessageBox";
import * as chatroomUtil from "../util/chatroomUtil";
import * as messageUtil from "../util/messageUtil";
import { CurrentChatroomContext, CurrentUserContext } from "../components/Main";
import { LightDarkContext } from "../components/Main";
import * as THEMES from "../constants/THEMES";

jest.mock("../components/SpeechToTextBtn", () => () => {
  return <button data-testid='record-button'/>
});

describe("MessageBox", () => {

  let chattingWithUser = {
    username: "fakeuser"
  };

  let chattingWithBot = {
    username: "Chatbot"
  };

  let currentUser = {
    username: 'Alfred',
    id: 1
  };

  function fakeCurrentChatroom() {
    let fakeCurrentChatroom = { 
      info: { id: 1, active_status: true }, 
      connection: jest.fn() 
    };
    return fakeCurrentChatroom;
  };

  beforeEach(async () => {
    jest.spyOn(chatroomUtil, 'postUserIsTyping').mockImplementation(jest.fn());;
    jest.spyOn(chatroomUtil, 'postUserIsNotTyping').mockImplementation(jest.fn());
    jest.spyOn(messageUtil, 'postMessage').mockImplementation(jest.fn());
    jest.spyOn(messageUtil, 'postAIChatroomMessages').mockImplementation(jest.fn());
  });

  function renderMessageBox(user) {
    return render(
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentChatroomContext.Provider value={fakeCurrentChatroom()}>
          <LightDarkContext.Provider value={THEMES.light}>
            <MessageBox chattingWithUser={user}/>
          </LightDarkContext.Provider>
        </CurrentChatroomContext.Provider>
      </CurrentUserContext.Provider>
    )
  };

  it('calls postMessage when the other user is NOT the bot', async() => {
    renderMessageBox(chattingWithUser);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(messageUtil.postMessage).toBeCalled();
  });

  it('calls postAIChatroomMessages when the other user is the bot', async() => {
    renderMessageBox(chattingWithBot);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(messageUtil.postAIChatroomMessages).toBeCalled();
  });

  it('resets the message after submission', async() => {
    renderMessageBox(chattingWithUser);
    await userEvent.type(screen.getByRole('textbox'), 'Hello');
    expect(screen.getByRole('textbox').value).toBe('Hello');
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('textbox').value).toBe('');
  });

  it('calls postUserIsNotTyping when text in the textbox is deleted', async() => {
    renderMessageBox(chattingWithUser);
    const textbox = screen.getByRole('textbox');
    await userEvent.type(textbox, 'Hello');
    await userEvent.clear(textbox);
    expect(chatroomUtil.postUserIsNotTyping).toBeCalled();
    expect(textbox).toHaveValue('');
  });

  it('calls postUserIsTyping when text is entered into the textbox', async() => {
    renderMessageBox(chattingWithUser);
    const textbox = screen.getByRole('textbox');
    await userEvent.type(textbox, 'Hello');
    expect(chatroomUtil.postUserIsTyping).toBeCalled();
    expect(textbox).toHaveValue('Hello');
  });

  describe('When the user is using a SpeechRecognition non-supported browser', () => {
    // November 2024 - Firefox is the only unsupported for up to date browsers
    const unsupportedBrowser = ['Firefox'];
    beforeEach(() => {
      jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(unsupportedBrowser[0])
    });

    afterEach(() => {
      jest.restoreAllMocks();
    })

    it('does not render SpeechToTextBtn', async() => {
      renderMessageBox(chattingWithUser);
      const speechToTextBtn = await screen.queryByTestId('record-button');
      expect(speechToTextBtn).not.toBeInTheDocument();
    })
  });

  describe('When the user is using a SpeechRecognition supported browser', () => {
    const supportedBrowser = ['Chrome'];
    beforeEach(() => {
      jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(supportedBrowser[0])
    });

    afterEach(() => {
      jest.restoreAllMocks();
    })

    it('does not render SpeechToTextBtn', async() => {
      renderMessageBox(chattingWithUser);
      const speechToTextBtn = await screen.queryByTestId('record-button');
      expect(speechToTextBtn).toBeInTheDocument();
    })
  });
});