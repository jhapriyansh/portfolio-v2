import mongoose, { Schema, Document } from "mongoose";

export interface ILogEntry extends Document {
  title: string;
  content: string;
  tags: string[];
  emoji: string;
  createdAt: Date;
}

const LogEntrySchema = new Schema<ILogEntry>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    emoji: { type: String, default: "📝" },
  },
  { timestamps: true }
);

export default mongoose.models.LogEntry ||
  mongoose.model<ILogEntry>("LogEntry", LogEntrySchema);
