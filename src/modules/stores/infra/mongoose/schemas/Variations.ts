import mongoose, { Schema, Document } from 'mongoose';

export interface VariationsValues {
  name: {
    type: string;
    required: true;
  };
  value: number;
  description: string;
}

export type VariationsDocument = Document & {
  name: string;
  required: boolean;
  maxOptions?: number;
  allowRepeatedValues?: boolean;
  values: VariationsValues[];
  modified?: boolean;
};

export const VariationsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  modified: Boolean,
  required: {
    type: Boolean,
    required: true,
    default: false,
  },
  maxOptions: Number,
  allowRepeatedValues: Boolean,
  values: [
    {
      name: {
        type: String,
        required: true,
      },
      value: Number,
      description: String,
    },
  ],
});

export default mongoose.model<VariationsDocument>(
  'Variations',
  VariationsSchema,
);
