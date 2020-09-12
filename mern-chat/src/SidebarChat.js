import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebar__chat">
      <Avatar />
      <div className="sidebar__chat-info">
        <h2>room name</h2>
        <p>last msg</p>
      </div>
    </div>
  );
}

export default SidebarChat;
