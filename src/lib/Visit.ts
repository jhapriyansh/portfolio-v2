import mongoose, { Schema, Document } from "mongoose";

export interface IVisit extends Document {
  path: string;
  referrer?: string;
  userAgent?: string;
  createdAt: Date;
}

const VisitSchema = new Schema<IVisit>(
  {
    path: { type: String, required: true },
    referrer: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

VisitSchema.index({ createdAt: -1 });

export default mongoose.models.Visit ||
  mongoose.model<IVisit>("Visit", VisitSchema);
