import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

export const USER_ROLES = ["user", "admin"] as const;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type IUserDocument = HydratedDocument<IUser>;


const UserModel = model<IUser>("User", userSchema);
export default UserModel;