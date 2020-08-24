import { ServiceSchema, GenericObject } from 'moleculer';
import DbService from 'moleculer-db';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import mongoose from 'mongoose';

import { config } from '../config';

const { MONGO_URI } = config;

export const ProductsDB: ServiceSchema = {
  name: 'products-db',
  mixins: [DbService],
  adapter: new MongooseAdapter(MONGO_URI),
  model: mongoose.model(
    'Products',
    (() => {
      const schema = new mongoose.Schema(
        {
          name: { type: String },
          category: { type: String, default: null },
          price: { type: Number },
        },
        { timestamps: true }
      );
      schema.virtual('id').get(function () {
        return this._id.toHexString();
      });
      schema.set('toJSON', {
        virtuals: true,
        transform(doc: GenericObject, ret: GenericObject) {
          delete ret.__v;
        },
      });
      return schema;
    })()
  ),
};
