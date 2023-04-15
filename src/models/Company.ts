import mongoose, { Schema } from "mongoose";

interface ICompany {
  companyName: string;
  category: string;
  branch: string;
  eligibility: {
    minCGPA: number;
    backlog: number;
  };
  CTC: string;
  dateOpen: Date;
  dateClose: Date;
  link: string;
}

const companySchema = new Schema<ICompany>({
  companyName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  eligibility: {
    minCGPA: {
      type: Number,
    },
    backlog: {
      type: Number,
    },
  },
  CTC: {
    type: String,
    required: true,
  },
  dateOpen: {
    type: Date,
    default: Date.now(),
  },
  dateClose: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export const Company = mongoose.model<ICompany>("Company", companySchema);
