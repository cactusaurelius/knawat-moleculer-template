import mongoose, { Schema, Document } from 'mongoose';

import { Product } from '../types';

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true, unique: true },
  category: { type: String },
  price: { type: Number, required: true },
});

export interface ProductDocument extends Document<Product> {}

export const ProductModel = mongoose.model<ProductDocument>(
  'Product',
  ProductSchema
);
