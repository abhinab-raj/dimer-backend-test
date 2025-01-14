import mongoose, { Document, Model, Schema } from 'mongoose';

const UserSchema = new mongoose.Schema<IUser, UserModel>(
  {
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    providerId: { type: String, default: '' },
    uid: { type: String, default: '' },
    displayName: { type: String },
    photoURL: { type: String, default: '' },
    customCategory: { type: Array, default: [] },
  },
  { timestamps: true }
);

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isVerified: boolean;
  organization: string;
  customCategory: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserModel extends Model<IUser> {}

const User = mongoose.model<Document & UserModel>('User', UserSchema);

export default User;
