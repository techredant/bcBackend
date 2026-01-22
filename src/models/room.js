// const mongoose = require("mongoose");

// const roomSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     streamRoomId: { type: String, required: true, unique: true },
//     participants: { type: [String], default: [] }, // array of user IDs
//   },
//   { timestamps: true }
// );

// const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
// module.exports = Room;

import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  streamRoomId: String,
  participants: [String],
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room;
