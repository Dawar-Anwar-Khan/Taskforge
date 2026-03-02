import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'employee'
  mustChangePassword: boolean
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  name:               { type: String, required: true },
  email:              { type: String, required: true, unique: true, lowercase: true },
  password:           { type: String, required: true },
  role:               { type: String, enum: ['admin', 'employee'], default: 'employee' },
  mustChangePassword: { type: Boolean, default: false },
  createdAt:          { type: Date, default: Date.now },
})

// This is the critical fix — always define the schema first, then check models
const User = mongoose.models.User as mongoose.Model<IUser> ?? mongoose.model<IUser>('User', UserSchema)

export default User