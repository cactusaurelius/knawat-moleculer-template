import { ServiceSchema, GenericObject } from 'moleculer';

import { ProductsOpenapi, ProductsValidation } from '../utilities/mixins';
import DbService from '../utilities/mixins/mongo.mixin';
import { MpError } from '../utilities/adapters';
import { Product } from '../utilities/types';

const ProductsService: ServiceSchema = {
  name: 'products',
  mixins: [DbService('Products'), ProductsValidation, ProductsOpenapi],

  /**
   * Actions
   */
  actions: {
    create: {
      rest: 'POST /',
      auth: [],
      cache: {},
      async handler(ctx): Promise<Product> {
        return this.adapter
          .insert(this.createProductSanitize(ctx.params))
          .then((res: Product) => {
            return this.normalizeId(res);
          })
          .catch((err: GenericObject) => {
            if (err.name === 'MoleculerError') {
              throw new MpError('Products Service', err.message, err.code);
            }
            if (err.name === 'MongoError' && err.code === 11000) {
              throw new MpError('Products Service', 'Duplicate Id!', 422);
            }
            throw new MpError('Products Service', String(err), 500);
          });
      },
    },
  },
  methods: {
    /**
     * Convert object _id to id
     *
     * @param {({_id: string})} obj
     * @returns
     */
    normalizeId(obj: { _id: string }): GenericObject {
      const newObj = {
        code: obj._id,
        ...obj,
      };
      delete newObj._id;
      return newObj;
    },
    /**
     * Sanitizes Proudct entry data
     *
     * @param {*} params
     * @returns Product
     */
    createProductSanitize(params): Product {
      const product: Product = {
        name: params.name,
        category: params.category,
        price: params.price,
      };
      return product;
    },
  },
};

export = ProductsService;
