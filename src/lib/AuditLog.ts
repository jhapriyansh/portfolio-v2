import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  action: "create" | "update" | "delete";
  entity: "project" | "skill" | "logbook" | "settings";
  entityId?: string;
  description: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    entity: {
      type: String,
      enum: ["project", "skill", "logbook", "settings"],
      required: true,
    },
    entityId: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
