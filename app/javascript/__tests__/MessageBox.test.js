import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MessageBox from "../components/MessageBox";
import * as chatroomUtil from "../util/chatroomUtil";
import * as messageUtil from "../util/messageUtil";
import { CurrentChatroomContext } from "../components/Main";
import { LightDarkContext } from "../components/Main";
import { THEMES } from "../constants/themes";

require('jest-fetch-mock').enableMocks();

jest.mock("../components/SpeechToTextBtn", () => () => {
  const MockSpeechToTextBtn = "SpeechToTextBtn";
  return <MockSpeechToTextBtn/>
});

describe("MessageBox", () => {

  let chattingWithUser = {
    username: "fakeuser"
  };

  let chattingWithBot = {
    username: "Chatbot"
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function renderMessageBox(user) {
    return render( 
      <CurrentChatroomContext.Provider value={fakeCurrentChatroom()}>
        <LightDarkContext.Provider value={THEMES.light}>
          <MessageBox chattingWithUser={user}/>
        </LightDarkContext.Provider>
      </CurrentChatroomContext.Provider>
    )
  };

  it('calls postMessage when the other user is NOT the bot', async() => {
    renderMessageBox(chattingWithUser);
    await userEvent.click(screen.getByRole('button'));
    expect(messageUtil.postMessage).toBeCalled();
  });

  it('calls postAIChatroomMessages when the other user is the bot', async() => {
    renderMessageBox(chattingWithBot);
    await userEvent.click(screen.getByRole('button'));
    expect(messageUtil.postAIChatroomMessages).toBeCalled();
  });

  it('resets the message after submission', async() => {
    renderMessageBox(chattingWithUser);
    await userEvent.type(screen.getByRole('textbox'), 'Hello');
    expect(screen.getByRole('textbox').value).toBe('Hello');
    await userEvent.click(screen.getByRole('button'));
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
});