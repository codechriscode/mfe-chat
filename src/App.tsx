import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { messages as mock } from "./assets/mock";

export type MessageType = {
  author: string;
  content: string;
  time: string;
};

function Message(props: MessageType) {
  return (
    <li className={`${props.author === "me" ? "my" : ""} message`}>
      <h4>{props.author}</h4>
      <p>{props.content}</p>
      <p className="time">{props.time}</p>
    </li>
  );
}

function App() {
  const [open, setOpen] = useState<Boolean>(false);
  const [messages, setMessages] = useState<Array<MessageType>>([...mock]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((history) => [
      ...history,
      {
        author: "me",
        content: currentMessage,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setCurrentMessage(() => "");
  };

  return (
    <div className="App">
      <div className="floating-button" onClick={toggleOpen}>
        <p>Chat</p>
      </div>
      {open ? (
        <div className="chat-box">
          <div className="message-history">
            <ul>
              {messages.length
                ? messages.map((m: MessageType) => <Message {...m} />)
                : null}
            </ul>
          </div>
          <form className="message-tools" onSubmit={sendMessage}>
            <label hidden htmlFor="curr-msg">
              Mensagem
            </label>
            <input
              type="text"
              id="curr-msg"
              className="curr-msg"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(() => e.target.value)}
            />
            <input
              type="submit"
              className="send"
              value="Enviar"
              disabled={!currentMessage.length}
            />
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default App;
