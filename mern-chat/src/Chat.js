import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import CopyFooter from "./CopyFooter";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async e => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Demo app",
      timestmap: "Abhi Hi aya Hai",
      recieved: false
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__header-info">
          <h3>Room name</h3>
          <p> Last seen ...</p>
        </div>
        <div className="chat__header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(message => (
          <p
            className={`chat__message ${message.recieved && "chat__reciever"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a Message"
            type="Text"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>

      <div className="chat__copy-footer">
        <CopyFooter />
      </div>
    </div>
  );
}

export default Chat;
