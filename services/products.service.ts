import { ServiceSchema, Context, Errors, GenericObject } from 'moleculer';

import { ProductsOpenapi, ProductsValidation } from '../utilities/mixins';
import { ProductModel, ProductDocument } from '../utilities/models';
import DbService from '../utilities/mixins/mongo.mixin';
import { Product, MetaParams } from '../utilities/types';
import { MyError } from '../utilities/adapters';

const { MoleculerClientError, ValidationError } = Errors;

const ProductsService: ServiceSchema = {
  name: 'products',
  mixins: [
    new DbService('products').start<ProductDocument>(ProductModel),
    ProductsValidation,
    ProductsOpenapi,
  ],

  /**
   * Default settings
   */
  settings: {
    // Base path
    rest: 'products/',
    fields: ['_id', 'name', 'category', 'price'],
  },

  /**
   * Actions
   */
  actions: {
    /**
     * Create a new record.
     * Auth is required!
     *
     * @actions
     * @param {Object} products - Product entity
     *
     * @returns {Object} Created entity
     */
    create: {
      auth: ['Basic'],
      visibility: 'published',
      handler(ctx: Context<Product>): Promise<{ product: Product }> {
        const product = ctx.params;

        return this._create(ctx, product)
          .then((entity: Product) => ({
            product: this.transformResultEntity(entity),
          }))
          .catch((err: MyError) => {
            if (err.name === 'MongoError' && err.code === 11000) {
              throw new ValidationError(err.message);
            }

            throw new ValidationError(err.toString());
          });
      },
    },

    /**
     * Update a record.
     * Auth is required!
     *
     * @actions
     *
     * @returns {Object} Updated product center
     */
    update: {
      auth: ['Basic', 'Bearer'],
      visibility: 'published',
      handler(
        ctx: Context<Partial<Product>, MetaParams<Product>>
      ): Promise<{ product: Product }> {
        const product = ctx.params;

        // Validate bearer only updating his record
        if (
          product._id &&
          ctx.meta.user._id &&
          product?._id !== ctx.meta.user._id
        ) {
          throw new MoleculerClientError("Can't update this entity", 401);
        }

        return this._update(ctx, product).then((entity: Product) => ({
          product: this.transformResultEntity(entity),
        }));
      },
    },

    /**
     * List records with pagination.
     * Auth is required!
     *
     * @actions
     *
     * @returns {Object} List of records
     */
    list: {
      auth: ['Basic'],
      visibility: 'published',
      handler(ctx) {
        if (ctx.params.search && !ctx.params.searchFields)
          ctx.params.searchFields = 'name';
        const params = this.sanitizeParams(ctx, ctx.params);
        return this._list(ctx, params).then(this.transformResultList);
      },
    },

    /**
     * Get a record by id
     * Auth is required!
     *
     * @actions
     * @param {String} id - Product id
     *
     * @returns {Object} Product entity
     */
    get: {
      auth: ['Basic', 'Bearer'],
      visibility: 'published',
      cache: {
        keys: ['id', '#authType'],
        ttl: 60 * 10,
      },
      handler(
        ctx: Context<{ id: string }, MetaParams<Product>>
      ): Promise<{ product: Product }> {
        const { id } = ctx.params;

        // Validate bearer only getting his record
        if (ctx.meta.user._id && id !== ctx.meta.user._id) {
          throw new MoleculerClientError("Can't update this entity", 401);
        }

        return this._get(ctx, { id }).then((entity: Product) => ({
          product: this.transformResultEntity(entity),
        }));
      },
    },
  },

  methods: {
    /**
     * Transform the result entities
     *
     * @param {Array} entities
     */
    transformResultList<T>({ rows, ...props }: GenericObject) {
      const products = rows
        .map(this.transformResultEntity)
        .filter((result: T[]) => result);

      return { products, ...props };
    },

    /**
     * Transform a result entity
     *
     * @param {Context} ctx
     * @param {Object} entity
     */
    transformResultEntity(entity: Product) {
      if (!entity) return false;
      return this.sanitizeObject({
        id: entity._id,
        category: entity.category,
        price: entity.price,
      });
    },

    /* Filter null and undefined values
     *
     * @param {Object} object
     */
    sanitizeObject(object) {
      return Object.entries(object).reduce(
        (acc, [key, val]) =>
          val === null || val === undefined
            ? acc
            : {
                ...acc,
                [key]: val,
              },
        {}
      );
    },
  },
};

export default ProductsService;
