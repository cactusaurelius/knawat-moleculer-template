import { Errors, ServiceSchema } from 'moleculer';
import DbService from 'moleculer-db';
import MongoAdapter from 'moleculer-db-adapter-mongo';

const { MoleculerClientError } = Errors;

export default (collection: string): ServiceSchema => {
  if (!process.env.MONGO_URI) {
    throw new MoleculerClientError('Database connection error', 500);
  }

  return {
    name: 'mongo_service',
    mixins: [DbService],
    adapter: new MongoAdapter(process.env.MONGO_URI, { useNewUrlParser: true }),
    collection,
  };
};
