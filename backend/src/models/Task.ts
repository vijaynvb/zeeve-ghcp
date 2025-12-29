import { Document, Model, Schema, Types, model } from 'mongoose';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface TaskDocument extends Document {
  user: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  category?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskModel extends Model<TaskDocument> {}

const taskSchema = new Schema<TaskDocument, TaskModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Task = model<TaskDocument, TaskModel>('Task', taskSchema);
