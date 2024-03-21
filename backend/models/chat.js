import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    allergies: {
      type: [{ type: String, required: true }],
      required: true,
    },
    preferences: {
      type: [{ type: String, required: true }],
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Chat = mongoose.model("Chat", chatSchema);
