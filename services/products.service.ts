import { ServiceSchema, GenericObject, Context } from 'moleculer';

import { ProductsOpenapi, ProductsValidation } from '../utilities/mixins';
import DbService from '../utilities/mixins/mongo.mixin';
import { MyError } from '../utilities/adapters';
import { Product } from '../utilities/types';
import { ProductDocument, ProductModel } from '../utilities/models';

const ProductsService: ServiceSchema = {
  name: 'products',
  mixins: [
    new DbService('Products').start<ProductDocument>(ProductModel),
    ProductsValidation,
    ProductsOpenapi,
  ],

  actions: {
    create: {
      rest: 'POST /',
      auth: [],
      cache: {},
      async handler(ctx: Context<Product>) {
        return this.adapter
          .insert(this.createProductSanitize(ctx.params))
          .then((res: Product) => {
            return this.normalizeId(res);
          })
          .catch((err: GenericObject) => {
            if (err.name === 'MoleculerError') {
              throw new MyError('Products Service', err.message, err.code);
            }
            if (err.name === 'MongoError' && err.code === 11000) {
              throw new MyError('Products Service', 'Duplicate Id!', 422);
            }
            throw new MyError('Products Service', String(err), 500);
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
     * Sanitizes Product entry data
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

export default ProductsService;
