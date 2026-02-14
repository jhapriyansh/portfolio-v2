import mongoose, { Schema, Document } from "mongoose";

export interface ISkillCategory extends Document {
  title: string;
  icon: string;
  color: string;
  skills: string[];
  order: number;
}

const SkillCategorySchema = new Schema<ISkillCategory>(
  {
    title: { type: String, required: true },
    icon: { type: String, default: "⌨️" },
    color: { type: String, default: "#a6ff00" },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SkillCategory ||
  mongoose.model<ISkillCategory>("SkillCategory", SkillCategorySchema);
