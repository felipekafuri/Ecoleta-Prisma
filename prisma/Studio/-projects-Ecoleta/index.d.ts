import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw }

/**
 * Prisma Client JS version: 2.0.0-beta.7
 * Query Engine version: 5d39801acf2e3475bd9dab029a63634358b07bf1
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
declare type JsonValue = string | number | boolean | null | Date | JsonObject | JsonArray
 
declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Items
 * const items = await prisma.items.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Items
   * const items = await prisma.items.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.items`: Exposes CRUD operations for the **Items** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.items.findMany()
    * ```
    */
  get items(): ItemsDelegate;

  /**
   * `prisma.points`: Exposes CRUD operations for the **Points** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Points
    * const points = await prisma.points.findMany()
    * ```
    */
  get points(): PointsDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model Items
 */

export type Items = {
  id: number
  title: string
  image: string
  pointsId: number | null
}

export type ItemsSelect = {
  id?: boolean
  title?: boolean
  image?: boolean
  points?: boolean | PointsArgs
  pointsId?: boolean
}

export type ItemsInclude = {
  points?: boolean | PointsArgs
}

export type ItemsGetPayload<
  S extends boolean | null | undefined | ItemsArgs,
  U = keyof S
> = S extends true
  ? Items
  : S extends undefined
  ? never
  : S extends ItemsArgs | FindManyItemsArgs
  ? 'include' extends U
    ? Items  & {
      [P in TrueKeys<S['include']>]:
      P extends 'points'
      ? PointsGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Items ? Items[P]
: 
      P extends 'points'
      ? PointsGetPayload<S['select'][P]> | null : never
    }
  : Items
: Items


export interface ItemsDelegate {
  /**
   * Find zero or one Items.
   * @param {FindOneItemsArgs} args - Arguments to find a Items
   * @example
   * // Get one Items
   * const items = await prisma.items.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneItemsArgs>(
    args: Subset<T, FindOneItemsArgs>
  ): CheckSelect<T, ItemsClient<Items | null>, ItemsClient<ItemsGetPayload<T> | null>>
  /**
   * Find zero or more Items.
   * @param {FindManyItemsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Items
   * const items = await prisma.items.findMany()
   * 
   * // Get first 10 Items
   * const items = await prisma.items.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const itemsWithIdOnly = await prisma.items.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyItemsArgs>(
    args?: Subset<T, FindManyItemsArgs>
  ): CheckSelect<T, Promise<Array<Items>>, Promise<Array<ItemsGetPayload<T>>>>
  /**
   * Create a Items.
   * @param {ItemsCreateArgs} args - Arguments to create a Items.
   * @example
   * // Create one Items
   * const user = await prisma.items.create({
   *   data: {
   *     // ... data to create a Items
   *   }
   * })
   * 
  **/
  create<T extends ItemsCreateArgs>(
    args: Subset<T, ItemsCreateArgs>
  ): CheckSelect<T, ItemsClient<Items>, ItemsClient<ItemsGetPayload<T>>>
  /**
   * Delete a Items.
   * @param {ItemsDeleteArgs} args - Arguments to delete one Items.
   * @example
   * // Delete one Items
   * const user = await prisma.items.delete({
   *   where: {
   *     // ... filter to delete one Items
   *   }
   * })
   * 
  **/
  delete<T extends ItemsDeleteArgs>(
    args: Subset<T, ItemsDeleteArgs>
  ): CheckSelect<T, ItemsClient<Items>, ItemsClient<ItemsGetPayload<T>>>
  /**
   * Update one Items.
   * @param {ItemsUpdateArgs} args - Arguments to update one Items.
   * @example
   * // Update one Items
   * const items = await prisma.items.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ItemsUpdateArgs>(
    args: Subset<T, ItemsUpdateArgs>
  ): CheckSelect<T, ItemsClient<Items>, ItemsClient<ItemsGetPayload<T>>>
  /**
   * Delete zero or more Items.
   * @param {ItemsDeleteManyArgs} args - Arguments to filter Items to delete.
   * @example
   * // Delete a few Items
   * const { count } = await prisma.items.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ItemsDeleteManyArgs>(
    args: Subset<T, ItemsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Items.
   * @param {ItemsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Items
   * const items = await prisma.items.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ItemsUpdateManyArgs>(
    args: Subset<T, ItemsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Items.
   * @param {ItemsUpsertArgs} args - Arguments to update or create a Items.
   * @example
   * // Update or create a Items
   * const items = await prisma.items.upsert({
   *   create: {
   *     // ... data to create a Items
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Items we want to update
   *   }
   * })
  **/
  upsert<T extends ItemsUpsertArgs>(
    args: Subset<T, ItemsUpsertArgs>
  ): CheckSelect<T, ItemsClient<Items>, ItemsClient<ItemsGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyItemsArgs, 'select' | 'include'>): Promise<number>
}

export declare class ItemsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  points<T extends PointsArgs = {}>(args?: Subset<T, PointsArgs>): CheckSelect<T, PointsClient<Points | null>, PointsClient<PointsGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Items findOne
 */
export type FindOneItemsArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * Filter, which Items to fetch.
  **/
  where: ItemsWhereUniqueInput
}


/**
 * Items findMany
 */
export type FindManyItemsArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * Filter, which Items to fetch.
  **/
  where?: ItemsWhereInput
  /**
   * Determine the order of the Items to fetch.
  **/
  orderBy?: ItemsOrderByInput
  /**
   * Sets the position for listing Items.
  **/
  cursor?: ItemsWhereUniqueInput
  /**
   * Get all Items that come after or before the Items you provide with the current order.
  **/
  take?: number
  /**
   * Skip the first `n` Items.
  **/
  skip?: number
}


/**
 * Items create
 */
export type ItemsCreateArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * The data needed to create a Items.
  **/
  data: ItemsCreateInput
}


/**
 * Items update
 */
export type ItemsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * The data needed to update a Items.
  **/
  data: ItemsUpdateInput
  /**
   * Choose, which Items to update.
  **/
  where: ItemsWhereUniqueInput
}


/**
 * Items updateMany
 */
export type ItemsUpdateManyArgs = {
  data: ItemsUpdateManyMutationInput
  where?: ItemsWhereInput
}


/**
 * Items upsert
 */
export type ItemsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * The filter to search for the Items to update in case it exists.
  **/
  where: ItemsWhereUniqueInput
  /**
   * In case the Items found by the `where` argument doesn't exist, create a new Items with this data.
  **/
  create: ItemsCreateInput
  /**
   * In case the Items was found with the provided `where` argument, update it with this data.
  **/
  update: ItemsUpdateInput
}


/**
 * Items delete
 */
export type ItemsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
  /**
   * Filter which Items to delete.
  **/
  where: ItemsWhereUniqueInput
}


/**
 * Items deleteMany
 */
export type ItemsDeleteManyArgs = {
  where?: ItemsWhereInput
}


/**
 * Items without action
 */
export type ItemsArgs = {
  /**
   * Select specific fields to fetch from the Items
  **/
  select?: ItemsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ItemsInclude | null
}



/**
 * Model Points
 */

export type Points = {
  id: number
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
  latitude: number
  longitude: number
}

export type PointsSelect = {
  id?: boolean
  name?: boolean
  email?: boolean
  whatsapp?: boolean
  city?: boolean
  uf?: boolean
  latitude?: boolean
  longitude?: boolean
  items?: boolean | FindManyItemsArgs
}

export type PointsInclude = {
  items?: boolean | FindManyItemsArgs
}

export type PointsGetPayload<
  S extends boolean | null | undefined | PointsArgs,
  U = keyof S
> = S extends true
  ? Points
  : S extends undefined
  ? never
  : S extends PointsArgs | FindManyPointsArgs
  ? 'include' extends U
    ? Points  & {
      [P in TrueKeys<S['include']>]:
      P extends 'items'
      ? Array<ItemsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Points ? Points[P]
: 
      P extends 'items'
      ? Array<ItemsGetPayload<S['select'][P]>> : never
    }
  : Points
: Points


export interface PointsDelegate {
  /**
   * Find zero or one Points.
   * @param {FindOnePointsArgs} args - Arguments to find a Points
   * @example
   * // Get one Points
   * const points = await prisma.points.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePointsArgs>(
    args: Subset<T, FindOnePointsArgs>
  ): CheckSelect<T, PointsClient<Points | null>, PointsClient<PointsGetPayload<T> | null>>
  /**
   * Find zero or more Points.
   * @param {FindManyPointsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Points
   * const points = await prisma.points.findMany()
   * 
   * // Get first 10 Points
   * const points = await prisma.points.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const pointsWithIdOnly = await prisma.points.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyPointsArgs>(
    args?: Subset<T, FindManyPointsArgs>
  ): CheckSelect<T, Promise<Array<Points>>, Promise<Array<PointsGetPayload<T>>>>
  /**
   * Create a Points.
   * @param {PointsCreateArgs} args - Arguments to create a Points.
   * @example
   * // Create one Points
   * const user = await prisma.points.create({
   *   data: {
   *     // ... data to create a Points
   *   }
   * })
   * 
  **/
  create<T extends PointsCreateArgs>(
    args: Subset<T, PointsCreateArgs>
  ): CheckSelect<T, PointsClient<Points>, PointsClient<PointsGetPayload<T>>>
  /**
   * Delete a Points.
   * @param {PointsDeleteArgs} args - Arguments to delete one Points.
   * @example
   * // Delete one Points
   * const user = await prisma.points.delete({
   *   where: {
   *     // ... filter to delete one Points
   *   }
   * })
   * 
  **/
  delete<T extends PointsDeleteArgs>(
    args: Subset<T, PointsDeleteArgs>
  ): CheckSelect<T, PointsClient<Points>, PointsClient<PointsGetPayload<T>>>
  /**
   * Update one Points.
   * @param {PointsUpdateArgs} args - Arguments to update one Points.
   * @example
   * // Update one Points
   * const points = await prisma.points.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PointsUpdateArgs>(
    args: Subset<T, PointsUpdateArgs>
  ): CheckSelect<T, PointsClient<Points>, PointsClient<PointsGetPayload<T>>>
  /**
   * Delete zero or more Points.
   * @param {PointsDeleteManyArgs} args - Arguments to filter Points to delete.
   * @example
   * // Delete a few Points
   * const { count } = await prisma.points.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PointsDeleteManyArgs>(
    args: Subset<T, PointsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Points.
   * @param {PointsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Points
   * const points = await prisma.points.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PointsUpdateManyArgs>(
    args: Subset<T, PointsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Points.
   * @param {PointsUpsertArgs} args - Arguments to update or create a Points.
   * @example
   * // Update or create a Points
   * const points = await prisma.points.upsert({
   *   create: {
   *     // ... data to create a Points
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Points we want to update
   *   }
   * })
  **/
  upsert<T extends PointsUpsertArgs>(
    args: Subset<T, PointsUpsertArgs>
  ): CheckSelect<T, PointsClient<Points>, PointsClient<PointsGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPointsArgs, 'select' | 'include'>): Promise<number>
}

export declare class PointsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  items<T extends FindManyItemsArgs = {}>(args?: Subset<T, FindManyItemsArgs>): CheckSelect<T, Promise<Array<Items>>, Promise<Array<ItemsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Points findOne
 */
export type FindOnePointsArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * Filter, which Points to fetch.
  **/
  where: PointsWhereUniqueInput
}


/**
 * Points findMany
 */
export type FindManyPointsArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * Filter, which Points to fetch.
  **/
  where?: PointsWhereInput
  /**
   * Determine the order of the Points to fetch.
  **/
  orderBy?: PointsOrderByInput
  /**
   * Sets the position for listing Points.
  **/
  cursor?: PointsWhereUniqueInput
  /**
   * Get all Points that come after or before the Points you provide with the current order.
  **/
  take?: number
  /**
   * Skip the first `n` Points.
  **/
  skip?: number
}


/**
 * Points create
 */
export type PointsCreateArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * The data needed to create a Points.
  **/
  data: PointsCreateInput
}


/**
 * Points update
 */
export type PointsUpdateArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * The data needed to update a Points.
  **/
  data: PointsUpdateInput
  /**
   * Choose, which Points to update.
  **/
  where: PointsWhereUniqueInput
}


/**
 * Points updateMany
 */
export type PointsUpdateManyArgs = {
  data: PointsUpdateManyMutationInput
  where?: PointsWhereInput
}


/**
 * Points upsert
 */
export type PointsUpsertArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * The filter to search for the Points to update in case it exists.
  **/
  where: PointsWhereUniqueInput
  /**
   * In case the Points found by the `where` argument doesn't exist, create a new Points with this data.
  **/
  create: PointsCreateInput
  /**
   * In case the Points was found with the provided `where` argument, update it with this data.
  **/
  update: PointsUpdateInput
}


/**
 * Points delete
 */
export type PointsDeleteArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
  /**
   * Filter which Points to delete.
  **/
  where: PointsWhereUniqueInput
}


/**
 * Points deleteMany
 */
export type PointsDeleteManyArgs = {
  where?: PointsWhereInput
}


/**
 * Points without action
 */
export type PointsArgs = {
  /**
   * Select specific fields to fetch from the Points
  **/
  select?: PointsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PointsInclude | null
}



/**
 * Deep Input Types
 */


export type PointsWhereInput = {
  id?: number | IntFilter
  name?: string | StringFilter
  email?: string | StringFilter
  whatsapp?: string | StringFilter
  city?: string | StringFilter
  uf?: string | StringFilter
  latitude?: number | FloatFilter
  longitude?: number | FloatFilter
  items?: ItemsFilter | null
  AND?: Enumerable<PointsWhereInput>
  OR?: Enumerable<PointsWhereInput>
  NOT?: Enumerable<PointsWhereInput>
}

export type ItemsWhereInput = {
  id?: number | IntFilter
  title?: string | StringFilter
  image?: string | StringFilter
  pointsId?: number | NullableIntFilter | null
  AND?: Enumerable<ItemsWhereInput>
  OR?: Enumerable<ItemsWhereInput>
  NOT?: Enumerable<ItemsWhereInput>
  points?: PointsWhereInput | null
}

export type ItemsWhereUniqueInput = {
  id?: number
}

export type PointsWhereUniqueInput = {
  id?: number
  name?: string
  email?: string
  whatsapp?: string
}

export type PointsCreateWithoutItemsInput = {
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
  latitude: number
  longitude: number
}

export type PointsCreateOneWithoutItemsInput = {
  create?: PointsCreateWithoutItemsInput
  connect?: PointsWhereUniqueInput
}

export type ItemsCreateInput = {
  title: string
  image: string
  points?: PointsCreateOneWithoutItemsInput | null
}

export type PointsUpdateWithoutItemsDataInput = {
  id?: number
  name?: string
  email?: string
  whatsapp?: string
  city?: string
  uf?: string
  latitude?: number
  longitude?: number
}

export type PointsUpsertWithoutItemsInput = {
  update: PointsUpdateWithoutItemsDataInput
  create: PointsCreateWithoutItemsInput
}

export type PointsUpdateOneWithoutItemsInput = {
  create?: PointsCreateWithoutItemsInput
  connect?: PointsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: PointsUpdateWithoutItemsDataInput
  upsert?: PointsUpsertWithoutItemsInput
}

export type ItemsUpdateInput = {
  id?: number
  title?: string
  image?: string
  points?: PointsUpdateOneWithoutItemsInput
}

export type ItemsUpdateManyMutationInput = {
  id?: number
  title?: string
  image?: string
}

export type ItemsCreateWithoutPointsInput = {
  title: string
  image: string
}

export type ItemsCreateManyWithoutPointsInput = {
  create?: Enumerable<ItemsCreateWithoutPointsInput>
  connect?: Enumerable<ItemsWhereUniqueInput>
}

export type PointsCreateInput = {
  name: string
  email: string
  whatsapp: string
  city: string
  uf: string
  latitude: number
  longitude: number
  items?: ItemsCreateManyWithoutPointsInput | null
}

export type ItemsUpdateWithoutPointsDataInput = {
  id?: number
  title?: string
  image?: string
}

export type ItemsUpdateWithWhereUniqueWithoutPointsInput = {
  where: ItemsWhereUniqueInput
  data: ItemsUpdateWithoutPointsDataInput
}

export type ItemsScalarWhereInput = {
  id?: number | IntFilter
  title?: string | StringFilter
  image?: string | StringFilter
  pointsId?: number | NullableIntFilter | null
  AND?: Enumerable<ItemsScalarWhereInput>
  OR?: Enumerable<ItemsScalarWhereInput>
  NOT?: Enumerable<ItemsScalarWhereInput>
}

export type ItemsUpdateManyDataInput = {
  id?: number
  title?: string
  image?: string
}

export type ItemsUpdateManyWithWhereNestedInput = {
  where: ItemsScalarWhereInput
  data: ItemsUpdateManyDataInput
}

export type ItemsUpsertWithWhereUniqueWithoutPointsInput = {
  where: ItemsWhereUniqueInput
  update: ItemsUpdateWithoutPointsDataInput
  create: ItemsCreateWithoutPointsInput
}

export type ItemsUpdateManyWithoutPointsInput = {
  create?: Enumerable<ItemsCreateWithoutPointsInput>
  connect?: Enumerable<ItemsWhereUniqueInput>
  set?: Enumerable<ItemsWhereUniqueInput>
  disconnect?: Enumerable<ItemsWhereUniqueInput>
  delete?: Enumerable<ItemsWhereUniqueInput>
  update?: Enumerable<ItemsUpdateWithWhereUniqueWithoutPointsInput>
  updateMany?: Enumerable<ItemsUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<ItemsScalarWhereInput>
  upsert?: Enumerable<ItemsUpsertWithWhereUniqueWithoutPointsInput>
}

export type PointsUpdateInput = {
  id?: number
  name?: string
  email?: string
  whatsapp?: string
  city?: string
  uf?: string
  latitude?: number
  longitude?: number
  items?: ItemsUpdateManyWithoutPointsInput
}

export type PointsUpdateManyMutationInput = {
  id?: number
  name?: string
  email?: string
  whatsapp?: string
  city?: string
  uf?: string
  latitude?: number
  longitude?: number
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type FloatFilter = {
  equals?: number
  not?: number | FloatFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type ItemsFilter = {
  every?: ItemsWhereInput
  some?: ItemsWhereInput
  none?: ItemsWhereInput
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type ItemsOrderByInput = {
  id?: OrderByArg | null
  title?: OrderByArg | null
  image?: OrderByArg | null
  pointsId?: OrderByArg | null
}

export type PointsOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  email?: OrderByArg | null
  whatsapp?: OrderByArg | null
  city?: OrderByArg | null
  uf?: OrderByArg | null
  latitude?: OrderByArg | null
  longitude?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
