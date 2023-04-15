import mongoose, { Schema } from "mongoose";

interface IVideo {
  topic: string;
  subtopic: string;
  link: string;
}

const videoSchema = new Schema<IVideo>({
  topic: {
    type: String,
    required: true,
  },
  subtopic: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export const Video = mongoose.model<IVideo>("Video", videoSchema);
