import mongoose from "mongoose";

const whatsupSchema = mongoose.Schema({
  message: String,
  name: String,
  timestmap: String,
  recieved: Boolean
});

export default mongoose.model("messageContents", whatsupSchema);
