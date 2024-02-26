import mongoose from"mongoose";

const messageSchema = mongoose.Schema(
  {
    sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content:{
      type: String,
    },
    chat:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
    },
  },
  {toJSON: {virtuals: true}}
)

export const Message = mongoose.model('Message', messageSchema);