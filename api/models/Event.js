import mongoose from "mongoose";

const { Schema } = mongoose;

const ReplySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }], // Reference to itself
});

const CommentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  replies: [ReplySchema], // Array to store multiple replies
});

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  formLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  tag: {
    type: String,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventIdentifier: {
    type: String,
  },
  unavailableDates: {
    type: [Date],
  },
  eventDate: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required:true,
  },
  comments: [CommentSchema],
});

export default mongoose.model("Event", EventSchema);
