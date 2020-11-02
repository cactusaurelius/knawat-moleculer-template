export = index;
declare class index {
  public uri: any;
  public opts: any;
  constructor(uri: any, opts: any);
  public afterRetrieveTransformID(entity: any, idField: any): any;
  public beforeSaveTransformID(entity: any, idField: any): any;
  public clear(): any;
  public connect(): any;
  public count(filters: any): any;
  public createCursor(params: any, isCounting: any): any;
  public disconnect(): any;
  public entityToObject(entity: any): any;
  public find(filters: any): any;
  public findById(_id: any): any;
  public findByIds(idList: any): any;
  public findOne(query: any): any;
  public init(broker: any, service: any): void;
  public insert(entity: any): any;
  public insertMany(entities: any): any;
  public objectIDToString(id: any): any;
  public removeById(_id: any): any;
  public removeMany(query: any): any;
  public stringToObjectID(id: any): any;
  public transformSort(paramSort: any): any;
  public updateById(_id: any, update: any): any;
  public updateMany(query: any, update: any): any;
}
