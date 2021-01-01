import mongoose, { Document, Schema } from 'mongoose';
import { ProductSchema, ProductDocument } from './Product';
import { VariationsSchema } from './Variations';

export type StoreDocument = Document & {
  name: string;
  products: ProductDocument[];
  imageUrl?: string;
  deliveryFee?: number;
  minimumOrderValue?: number;
  bannerUrl?: string;
  address: {
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: [ProductSchema],
  variations: [VariationsSchema],
  deliveryFee: Number,
  minimumOrderValue: Number,
  imageUrl: String,
  bannerUrl: String,
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    complement: String,
    neighborhood: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model<StoreDocument>('Store', StoreSchema);
