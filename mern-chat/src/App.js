import React, { useEffect, useState } from "react";

import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  // to Store the Data Which we get back from axios
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetching the Messages

    axios.get("/message/sync").then(response => {
      setMessages(response.data);
    });
  }, []);

  //This ussEffect is to Connect Pusher and connect to their db

  useEffect(() => {
    //runs when the app loads

    var pusher = new Pusher("39ff89d92f6207034637", {
      cluster: "ap2"
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", newMessage => {
      // Keep the prev msgs and also add new messages
      setMessages([...messages, newMessage]);
    });

    //whenver the new messages is fetch stop the process and unsubscribe
    // and again if messages changes then again insert the new messages and again
    // return the  down function which does not make browser confuse.

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat Component */}
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
