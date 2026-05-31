import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const chatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },

    messages: [messageSchema],
  },
  { timestamps: true }
);

export const ChatModel = model(
  "Chat",
  chatSchema
);