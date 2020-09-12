// STEPS FOR BUILDING

//  1. IMPORTING

import express from "express";
import mongoose from "mongoose";
import dbMessages from "./dbMessages.js";
import Pusher from "pusher";
import bodyParser from "body-parser";
import cors from "cors";

//  2.  APP CONFIG

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const port = process.env.PORT || 9000;

// Pusher Config

var pusher = new Pusher({
  appId: "1070439",
  key: "39ff89d92f6207034637",
  secret: "85e22aa1ed143a0520e3",
  cluster: "ap2",
  encrypted: true
});

//  3. MIDDLEWARE
app.use(express.json());
//Ensure connection for everywhere (not for deployment-heroku)
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//  4. DB CONFIG
const connection_url =
  "mongodb+srv://admin:97a7TBSOR3HTbkXc@cluster0.rssia.mongodb.net/whatsupdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  // Function that will fireoff when db is changed

  changeStream.on("change", change => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestmap: messageDetails.timestmap,
        recieved: messageDetails.recieved
      });
    } else {
      console.log("Error trigerring Pusher");
    }
  });
});

//  5. ???? SURPRISE
//  6. API Routes

app.get("/", (req, res) => res.status(200).send("HELLO MERN"));

app.get("/message/sync", (req, res) => {
  dbMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  dbMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//  7. LISTENER

app.listen(port, () => console.log(`Listening on localhost:${port}`));

//dbuserPassword:97a7TBSOR3HTbkXc

// //{
// "message":"Hi mern",
//"name":"Zaid",
// "timestmap":"Demo",
//"recieved":false
//}
