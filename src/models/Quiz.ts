import mongoose, { Schema } from "mongoose";

interface IQuiz {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

const quizSchema = new Schema<IQuiz>({
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

export const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
