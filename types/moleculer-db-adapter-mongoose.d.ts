declare module 'moleculer-db-adapter-mongoose' {
  import { GenericObject } from 'moleculer';
  import { MemoryAdapter } from 'moleculer-db';

  export default class MongooseAdapter extends MemoryAdapter {
    // eslint-disable-next-line no-unused-vars
    constructor(connectionUrl: string, connectionOptions?: GenericObject);
  }
}
