import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  assignedTo: mongoose.Types.ObjectId
  assignedBy: mongoose.Types.ObjectId
  status: 'Pending' | 'In Progress' | 'Completed'
  deadline: Date
  createdAt: Date
}

const TaskSchema = new Schema<ITask>({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  assignedTo:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  deadline:    { type: Date, required: true },
  createdAt:   { type: Date, default: Date.now },
})

const Task = mongoose.models.Task as mongoose.Model<ITask> ?? mongoose.model<ITask>('Task', TaskSchema)

export default Task