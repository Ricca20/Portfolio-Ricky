import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      trim: true,
      maxlength: [100, "Subject cannot be more than 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
      trim: true,
      maxlength: [2000, "Message cannot be more than 2000 characters"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>("Message", messageSchema);

export default Message;
