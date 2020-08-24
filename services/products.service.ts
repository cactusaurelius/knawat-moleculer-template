import { ServiceSchema } from 'moleculer';

import { ProductsDB } from '../mixins';
import { ProductsOpenapi } from '../mixins/openapi';
import { ProductsValidation } from '../mixins/validation';

const ProductsService: ServiceSchema = {
  name: 'products',
  mixins: [ProductsDB, ProductsValidation, ProductsOpenapi],

  /**
   * Actions
   */
  actions: {
    create: {
      rest: 'POST /products',
      auth: [],
    },
    test: {
      handler() {
        throw new Error('Yeah');
      },
    },
  },
};

export = ProductsService;
