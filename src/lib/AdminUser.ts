import mongoose, { Schema, Document } from "mongoose";

export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, default: "admin" },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
