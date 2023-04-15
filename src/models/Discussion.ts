import mongoose, { Model, Schema, Types } from "mongoose";

interface IComment {
  _id: Types.ObjectId;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IDiscussion {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  comments: [IComment];
}

const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const discussionSchema = new Schema<IDiscussion>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

type DiscussionModelType = Model<IDiscussion>;

export const Discussion = mongoose.model<IDiscussion, DiscussionModelType>("Discussion", discussionSchema);
