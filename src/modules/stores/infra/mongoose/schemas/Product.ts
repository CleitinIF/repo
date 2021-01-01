import mongoose, { Document, Schema } from 'mongoose';
import { VariationsDocument } from './Variations';

export type ProductDocument = Document & {
  name: string;
  variations?: VariationsDocument[];
  value?: number;
  imageUrl?: string;
};

export const ProductSchema = new Schema({
  name: String,
  variations: [Object],
  value: {
    type: Number,
    required: true,
  },
  imageUrl: String,
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);
