import { Document, Model, Schema, Types, model } from 'mongoose';

export interface CategoryDocument extends Document {
  user: Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryModel extends Model<CategoryDocument> {}

const categorySchema = new Schema<CategoryDocument, CategoryModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Category = model<CategoryDocument, CategoryModel>('Category', categorySchema);
