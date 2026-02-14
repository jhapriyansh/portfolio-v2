import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  subtitle: string;
  type: "Full Stack" | "Frontend" | "Backend";
  description: string;
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
  color: string;
  icon: string;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full Stack", "Frontend", "Backend"],
      default: "Full Stack",
    },
    description: { type: String, required: true },
    tech: { type: [String], default: [] },
    codeUrl: { type: String },
    liveUrl: { type: String },
    color: { type: String, default: "#a6ff00" },
    icon: { type: String, default: "📦" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
