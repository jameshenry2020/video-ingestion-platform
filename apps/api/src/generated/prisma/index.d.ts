
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Video
 * 
 */
export type Video = $Result.DefaultSelection<Prisma.$VideoPayload>
/**
 * Model UploadSession
 * 
 */
export type UploadSession = $Result.DefaultSelection<Prisma.$UploadSessionPayload>
/**
 * Model VideoProcessingJob
 * 
 */
export type VideoProcessingJob = $Result.DefaultSelection<Prisma.$VideoProcessingJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VideoStatus: {
  INITIATED: 'INITIATED',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  PROCESSING: 'PROCESSING',
  EXTRACTING_METADATA: 'EXTRACTING_METADATA',
  GENERATING_THUMBNAIL: 'GENERATING_THUMBNAIL',
  GENERATING_HLS: 'GENERATING_HLS',
  READY: 'READY',
  FAILED: 'FAILED'
};

export type VideoStatus = (typeof VideoStatus)[keyof typeof VideoStatus]


export const UploadSessionStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ABORTED: 'ABORTED',
  EXPIRED: 'EXPIRED'
};

export type UploadSessionStatus = (typeof UploadSessionStatus)[keyof typeof UploadSessionStatus]

}

export type VideoStatus = $Enums.VideoStatus

export const VideoStatus: typeof $Enums.VideoStatus

export type UploadSessionStatus = $Enums.UploadSessionStatus

export const UploadSessionStatus: typeof $Enums.UploadSessionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Videos
 * const videos = await prisma.video.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Videos
   * const videos = await prisma.video.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.video`: Exposes CRUD operations for the **Video** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Videos
    * const videos = await prisma.video.findMany()
    * ```
    */
  get video(): Prisma.VideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadSession`: Exposes CRUD operations for the **UploadSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadSessions
    * const uploadSessions = await prisma.uploadSession.findMany()
    * ```
    */
  get uploadSession(): Prisma.UploadSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoProcessingJob`: Exposes CRUD operations for the **VideoProcessingJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoProcessingJobs
    * const videoProcessingJobs = await prisma.videoProcessingJob.findMany()
    * ```
    */
  get videoProcessingJob(): Prisma.VideoProcessingJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Video: 'Video',
    UploadSession: 'UploadSession',
    VideoProcessingJob: 'VideoProcessingJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "video" | "uploadSession" | "videoProcessingJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Video: {
        payload: Prisma.$VideoPayload<ExtArgs>
        fields: Prisma.VideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findFirst: {
            args: Prisma.VideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findMany: {
            args: Prisma.VideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          create: {
            args: Prisma.VideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          createMany: {
            args: Prisma.VideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          delete: {
            args: Prisma.VideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          update: {
            args: Prisma.VideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          deleteMany: {
            args: Prisma.VideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          upsert: {
            args: Prisma.VideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          aggregate: {
            args: Prisma.VideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideo>
          }
          groupBy: {
            args: Prisma.VideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCountAggregateOutputType> | number
          }
        }
      }
      UploadSession: {
        payload: Prisma.$UploadSessionPayload<ExtArgs>
        fields: Prisma.UploadSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findFirst: {
            args: Prisma.UploadSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findMany: {
            args: Prisma.UploadSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          create: {
            args: Prisma.UploadSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          createMany: {
            args: Prisma.UploadSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          delete: {
            args: Prisma.UploadSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          update: {
            args: Prisma.UploadSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          deleteMany: {
            args: Prisma.UploadSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          upsert: {
            args: Prisma.UploadSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          aggregate: {
            args: Prisma.UploadSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadSession>
          }
          groupBy: {
            args: Prisma.UploadSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionCountAggregateOutputType> | number
          }
        }
      }
      VideoProcessingJob: {
        payload: Prisma.$VideoProcessingJobPayload<ExtArgs>
        fields: Prisma.VideoProcessingJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoProcessingJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoProcessingJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          findFirst: {
            args: Prisma.VideoProcessingJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoProcessingJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          findMany: {
            args: Prisma.VideoProcessingJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>[]
          }
          create: {
            args: Prisma.VideoProcessingJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          createMany: {
            args: Prisma.VideoProcessingJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoProcessingJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>[]
          }
          delete: {
            args: Prisma.VideoProcessingJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          update: {
            args: Prisma.VideoProcessingJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          deleteMany: {
            args: Prisma.VideoProcessingJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoProcessingJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoProcessingJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>[]
          }
          upsert: {
            args: Prisma.VideoProcessingJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoProcessingJobPayload>
          }
          aggregate: {
            args: Prisma.VideoProcessingJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoProcessingJob>
          }
          groupBy: {
            args: Prisma.VideoProcessingJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoProcessingJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoProcessingJobCountArgs<ExtArgs>
            result: $Utils.Optional<VideoProcessingJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    video?: VideoOmit
    uploadSession?: UploadSessionOmit
    videoProcessingJob?: VideoProcessingJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VideoCountOutputType
   */

  export type VideoCountOutputType = {
    processingJobs: number
  }

  export type VideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processingJobs?: boolean | VideoCountOutputTypeCountProcessingJobsArgs
  }

  // Custom InputTypes
  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoCountOutputType
     */
    select?: VideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountProcessingJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoProcessingJobWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Video
   */

  export type AggregateVideo = {
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  export type VideoAvgAggregateOutputType = {
    uploadProgress: number | null
    processingProgress: number | null
    fileSize: number | null
    duration: number | null
    width: number | null
    height: number | null
    fps: number | null
    bitrate: number | null
  }

  export type VideoSumAggregateOutputType = {
    uploadProgress: number | null
    processingProgress: number | null
    fileSize: bigint | null
    duration: number | null
    width: number | null
    height: number | null
    fps: number | null
    bitrate: number | null
  }

  export type VideoMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.VideoStatus | null
    uploadProgress: number | null
    processingProgress: number | null
    originalFileName: string | null
    mimeType: string | null
    fileSize: bigint | null
    duration: number | null
    width: number | null
    height: number | null
    fps: number | null
    bitrate: number | null
    codec: string | null
    thumbnailUrl: string | null
    playbackUrl: string | null
    originalObjectKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.VideoStatus | null
    uploadProgress: number | null
    processingProgress: number | null
    originalFileName: string | null
    mimeType: string | null
    fileSize: bigint | null
    duration: number | null
    width: number | null
    height: number | null
    fps: number | null
    bitrate: number | null
    codec: string | null
    thumbnailUrl: string | null
    playbackUrl: string | null
    originalObjectKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VideoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    uploadProgress: number
    processingProgress: number
    originalFileName: number
    mimeType: number
    fileSize: number
    duration: number
    width: number
    height: number
    fps: number
    bitrate: number
    codec: number
    thumbnailUrl: number
    playbackUrl: number
    originalObjectKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VideoAvgAggregateInputType = {
    uploadProgress?: true
    processingProgress?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    fps?: true
    bitrate?: true
  }

  export type VideoSumAggregateInputType = {
    uploadProgress?: true
    processingProgress?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    fps?: true
    bitrate?: true
  }

  export type VideoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    uploadProgress?: true
    processingProgress?: true
    originalFileName?: true
    mimeType?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    fps?: true
    bitrate?: true
    codec?: true
    thumbnailUrl?: true
    playbackUrl?: true
    originalObjectKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    uploadProgress?: true
    processingProgress?: true
    originalFileName?: true
    mimeType?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    fps?: true
    bitrate?: true
    codec?: true
    thumbnailUrl?: true
    playbackUrl?: true
    originalObjectKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VideoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    uploadProgress?: true
    processingProgress?: true
    originalFileName?: true
    mimeType?: true
    fileSize?: true
    duration?: true
    width?: true
    height?: true
    fps?: true
    bitrate?: true
    codec?: true
    thumbnailUrl?: true
    playbackUrl?: true
    originalObjectKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Video to aggregate.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Videos
    **/
    _count?: true | VideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoMaxAggregateInputType
  }

  export type GetVideoAggregateType<T extends VideoAggregateArgs> = {
        [P in keyof T & keyof AggregateVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideo[P]>
      : GetScalarType<T[P], AggregateVideo[P]>
  }




  export type VideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithAggregationInput | VideoOrderByWithAggregationInput[]
    by: VideoScalarFieldEnum[] | VideoScalarFieldEnum
    having?: VideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCountAggregateInputType | true
    _avg?: VideoAvgAggregateInputType
    _sum?: VideoSumAggregateInputType
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  }

  export type VideoGroupByOutputType = {
    id: string
    title: string | null
    description: string | null
    status: $Enums.VideoStatus
    uploadProgress: number
    processingProgress: number
    originalFileName: string
    mimeType: string
    fileSize: bigint
    duration: number | null
    width: number | null
    height: number | null
    fps: number | null
    bitrate: number | null
    codec: string | null
    thumbnailUrl: string | null
    playbackUrl: string | null
    originalObjectKey: string
    createdAt: Date
    updatedAt: Date
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  type GetVideoGroupByPayload<T extends VideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoGroupByOutputType[P]>
            : GetScalarType<T[P], VideoGroupByOutputType[P]>
        }
      >
    >


  export type VideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    uploadProgress?: boolean
    processingProgress?: boolean
    originalFileName?: boolean
    mimeType?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    fps?: boolean
    bitrate?: boolean
    codec?: boolean
    thumbnailUrl?: boolean
    playbackUrl?: boolean
    originalObjectKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    uploadSession?: boolean | Video$uploadSessionArgs<ExtArgs>
    processingJobs?: boolean | Video$processingJobsArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type VideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    uploadProgress?: boolean
    processingProgress?: boolean
    originalFileName?: boolean
    mimeType?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    fps?: boolean
    bitrate?: boolean
    codec?: boolean
    thumbnailUrl?: boolean
    playbackUrl?: boolean
    originalObjectKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    uploadProgress?: boolean
    processingProgress?: boolean
    originalFileName?: boolean
    mimeType?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    fps?: boolean
    bitrate?: boolean
    codec?: boolean
    thumbnailUrl?: boolean
    playbackUrl?: boolean
    originalObjectKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    uploadProgress?: boolean
    processingProgress?: boolean
    originalFileName?: boolean
    mimeType?: boolean
    fileSize?: boolean
    duration?: boolean
    width?: boolean
    height?: boolean
    fps?: boolean
    bitrate?: boolean
    codec?: boolean
    thumbnailUrl?: boolean
    playbackUrl?: boolean
    originalObjectKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "uploadProgress" | "processingProgress" | "originalFileName" | "mimeType" | "fileSize" | "duration" | "width" | "height" | "fps" | "bitrate" | "codec" | "thumbnailUrl" | "playbackUrl" | "originalObjectKey" | "createdAt" | "updatedAt", ExtArgs["result"]["video"]>
  export type VideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadSession?: boolean | Video$uploadSessionArgs<ExtArgs>
    processingJobs?: boolean | Video$processingJobsArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Video"
    objects: {
      uploadSession: Prisma.$UploadSessionPayload<ExtArgs> | null
      processingJobs: Prisma.$VideoProcessingJobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string | null
      description: string | null
      status: $Enums.VideoStatus
      uploadProgress: number
      processingProgress: number
      originalFileName: string
      mimeType: string
      fileSize: bigint
      duration: number | null
      width: number | null
      height: number | null
      fps: number | null
      bitrate: number | null
      codec: string | null
      thumbnailUrl: string | null
      playbackUrl: string | null
      originalObjectKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["video"]>
    composites: {}
  }

  type VideoGetPayload<S extends boolean | null | undefined | VideoDefaultArgs> = $Result.GetResult<Prisma.$VideoPayload, S>

  type VideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoCountAggregateInputType | true
    }

  export interface VideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Video'], meta: { name: 'Video' } }
    /**
     * Find zero or one Video that matches the filter.
     * @param {VideoFindUniqueArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoFindUniqueArgs>(args: SelectSubset<T, VideoFindUniqueArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Video that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoFindUniqueOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoFindFirstArgs>(args?: SelectSubset<T, VideoFindFirstArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Videos
     * const videos = await prisma.video.findMany()
     * 
     * // Get first 10 Videos
     * const videos = await prisma.video.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoWithIdOnly = await prisma.video.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoFindManyArgs>(args?: SelectSubset<T, VideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Video.
     * @param {VideoCreateArgs} args - Arguments to create a Video.
     * @example
     * // Create one Video
     * const Video = await prisma.video.create({
     *   data: {
     *     // ... data to create a Video
     *   }
     * })
     * 
     */
    create<T extends VideoCreateArgs>(args: SelectSubset<T, VideoCreateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Videos.
     * @param {VideoCreateManyArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoCreateManyArgs>(args?: SelectSubset<T, VideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Videos and returns the data saved in the database.
     * @param {VideoCreateManyAndReturnArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Video.
     * @param {VideoDeleteArgs} args - Arguments to delete one Video.
     * @example
     * // Delete one Video
     * const Video = await prisma.video.delete({
     *   where: {
     *     // ... filter to delete one Video
     *   }
     * })
     * 
     */
    delete<T extends VideoDeleteArgs>(args: SelectSubset<T, VideoDeleteArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Video.
     * @param {VideoUpdateArgs} args - Arguments to update one Video.
     * @example
     * // Update one Video
     * const video = await prisma.video.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoUpdateArgs>(args: SelectSubset<T, VideoUpdateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Videos.
     * @param {VideoDeleteManyArgs} args - Arguments to filter Videos to delete.
     * @example
     * // Delete a few Videos
     * const { count } = await prisma.video.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoDeleteManyArgs>(args?: SelectSubset<T, VideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoUpdateManyArgs>(args: SelectSubset<T, VideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos and returns the data updated in the database.
     * @param {VideoUpdateManyAndReturnArgs} args - Arguments to update many Videos.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Video.
     * @param {VideoUpsertArgs} args - Arguments to update or create a Video.
     * @example
     * // Update or create a Video
     * const video = await prisma.video.upsert({
     *   create: {
     *     // ... data to create a Video
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Video we want to update
     *   }
     * })
     */
    upsert<T extends VideoUpsertArgs>(args: SelectSubset<T, VideoUpsertArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCountArgs} args - Arguments to filter Videos to count.
     * @example
     * // Count the number of Videos
     * const count = await prisma.video.count({
     *   where: {
     *     // ... the filter for the Videos we want to count
     *   }
     * })
    **/
    count<T extends VideoCountArgs>(
      args?: Subset<T, VideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoAggregateArgs>(args: Subset<T, VideoAggregateArgs>): Prisma.PrismaPromise<GetVideoAggregateType<T>>

    /**
     * Group by Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoGroupByArgs['orderBy'] }
        : { orderBy?: VideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Video model
   */
  readonly fields: VideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Video.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadSession<T extends Video$uploadSessionArgs<ExtArgs> = {}>(args?: Subset<T, Video$uploadSessionArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    processingJobs<T extends Video$processingJobsArgs<ExtArgs> = {}>(args?: Subset<T, Video$processingJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Video model
   */
  interface VideoFieldRefs {
    readonly id: FieldRef<"Video", 'String'>
    readonly title: FieldRef<"Video", 'String'>
    readonly description: FieldRef<"Video", 'String'>
    readonly status: FieldRef<"Video", 'VideoStatus'>
    readonly uploadProgress: FieldRef<"Video", 'Int'>
    readonly processingProgress: FieldRef<"Video", 'Int'>
    readonly originalFileName: FieldRef<"Video", 'String'>
    readonly mimeType: FieldRef<"Video", 'String'>
    readonly fileSize: FieldRef<"Video", 'BigInt'>
    readonly duration: FieldRef<"Video", 'Float'>
    readonly width: FieldRef<"Video", 'Int'>
    readonly height: FieldRef<"Video", 'Int'>
    readonly fps: FieldRef<"Video", 'Float'>
    readonly bitrate: FieldRef<"Video", 'Int'>
    readonly codec: FieldRef<"Video", 'String'>
    readonly thumbnailUrl: FieldRef<"Video", 'String'>
    readonly playbackUrl: FieldRef<"Video", 'String'>
    readonly originalObjectKey: FieldRef<"Video", 'String'>
    readonly createdAt: FieldRef<"Video", 'DateTime'>
    readonly updatedAt: FieldRef<"Video", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Video findUnique
   */
  export type VideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findUniqueOrThrow
   */
  export type VideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findFirst
   */
  export type VideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findFirstOrThrow
   */
  export type VideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findMany
   */
  export type VideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Videos to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video create
   */
  export type VideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to create a Video.
     */
    data: XOR<VideoCreateInput, VideoUncheckedCreateInput>
  }

  /**
   * Video createMany
   */
  export type VideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Video createManyAndReturn
   */
  export type VideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Video update
   */
  export type VideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to update a Video.
     */
    data: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
    /**
     * Choose, which Video to update.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video updateMany
   */
  export type VideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
  }

  /**
   * Video updateManyAndReturn
   */
  export type VideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
  }

  /**
   * Video upsert
   */
  export type VideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The filter to search for the Video to update in case it exists.
     */
    where: VideoWhereUniqueInput
    /**
     * In case the Video found by the `where` argument doesn't exist, create a new Video with this data.
     */
    create: XOR<VideoCreateInput, VideoUncheckedCreateInput>
    /**
     * In case the Video was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
  }

  /**
   * Video delete
   */
  export type VideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter which Video to delete.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video deleteMany
   */
  export type VideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Videos to delete
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to delete.
     */
    limit?: number
  }

  /**
   * Video.uploadSession
   */
  export type Video$uploadSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    where?: UploadSessionWhereInput
  }

  /**
   * Video.processingJobs
   */
  export type Video$processingJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    where?: VideoProcessingJobWhereInput
    orderBy?: VideoProcessingJobOrderByWithRelationInput | VideoProcessingJobOrderByWithRelationInput[]
    cursor?: VideoProcessingJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoProcessingJobScalarFieldEnum | VideoProcessingJobScalarFieldEnum[]
  }

  /**
   * Video without action
   */
  export type VideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
  }


  /**
   * Model UploadSession
   */

  export type AggregateUploadSession = {
    _count: UploadSessionCountAggregateOutputType | null
    _avg: UploadSessionAvgAggregateOutputType | null
    _sum: UploadSessionSumAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  export type UploadSessionAvgAggregateOutputType = {
    totalParts: number | null
    uploadedParts: number | null
  }

  export type UploadSessionSumAggregateOutputType = {
    totalParts: number | null
    uploadedParts: number | null
  }

  export type UploadSessionMinAggregateOutputType = {
    id: string | null
    videoId: string | null
    uploadId: string | null
    objectKey: string | null
    status: $Enums.UploadSessionStatus | null
    totalParts: number | null
    uploadedParts: number | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UploadSessionMaxAggregateOutputType = {
    id: string | null
    videoId: string | null
    uploadId: string | null
    objectKey: string | null
    status: $Enums.UploadSessionStatus | null
    totalParts: number | null
    uploadedParts: number | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UploadSessionCountAggregateOutputType = {
    id: number
    videoId: number
    uploadId: number
    objectKey: number
    status: number
    totalParts: number
    uploadedParts: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UploadSessionAvgAggregateInputType = {
    totalParts?: true
    uploadedParts?: true
  }

  export type UploadSessionSumAggregateInputType = {
    totalParts?: true
    uploadedParts?: true
  }

  export type UploadSessionMinAggregateInputType = {
    id?: true
    videoId?: true
    uploadId?: true
    objectKey?: true
    status?: true
    totalParts?: true
    uploadedParts?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UploadSessionMaxAggregateInputType = {
    id?: true
    videoId?: true
    uploadId?: true
    objectKey?: true
    status?: true
    totalParts?: true
    uploadedParts?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UploadSessionCountAggregateInputType = {
    id?: true
    videoId?: true
    uploadId?: true
    objectKey?: true
    status?: true
    totalParts?: true
    uploadedParts?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UploadSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSession to aggregate.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadSessions
    **/
    _count?: true | UploadSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadSessionMaxAggregateInputType
  }

  export type GetUploadSessionAggregateType<T extends UploadSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadSession[P]>
      : GetScalarType<T[P], AggregateUploadSession[P]>
  }




  export type UploadSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadSessionWhereInput
    orderBy?: UploadSessionOrderByWithAggregationInput | UploadSessionOrderByWithAggregationInput[]
    by: UploadSessionScalarFieldEnum[] | UploadSessionScalarFieldEnum
    having?: UploadSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadSessionCountAggregateInputType | true
    _avg?: UploadSessionAvgAggregateInputType
    _sum?: UploadSessionSumAggregateInputType
    _min?: UploadSessionMinAggregateInputType
    _max?: UploadSessionMaxAggregateInputType
  }

  export type UploadSessionGroupByOutputType = {
    id: string
    videoId: string
    uploadId: string
    objectKey: string
    status: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: UploadSessionCountAggregateOutputType | null
    _avg: UploadSessionAvgAggregateOutputType | null
    _sum: UploadSessionSumAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  type GetUploadSessionGroupByPayload<T extends UploadSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
        }
      >
    >


  export type UploadSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    uploadId?: boolean
    objectKey?: boolean
    status?: boolean
    totalParts?: boolean
    uploadedParts?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    uploadId?: boolean
    objectKey?: boolean
    status?: boolean
    totalParts?: boolean
    uploadedParts?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    uploadId?: boolean
    objectKey?: boolean
    status?: boolean
    totalParts?: boolean
    uploadedParts?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectScalar = {
    id?: boolean
    videoId?: boolean
    uploadId?: boolean
    objectKey?: boolean
    status?: boolean
    totalParts?: boolean
    uploadedParts?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UploadSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "uploadId" | "objectKey" | "status" | "totalParts" | "uploadedParts" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["uploadSession"]>
  export type UploadSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $UploadSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadSession"
    objects: {
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      videoId: string
      uploadId: string
      objectKey: string
      status: $Enums.UploadSessionStatus
      totalParts: number
      uploadedParts: number
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["uploadSession"]>
    composites: {}
  }

  type UploadSessionGetPayload<S extends boolean | null | undefined | UploadSessionDefaultArgs> = $Result.GetResult<Prisma.$UploadSessionPayload, S>

  type UploadSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadSessionCountAggregateInputType | true
    }

  export interface UploadSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadSession'], meta: { name: 'UploadSession' } }
    /**
     * Find zero or one UploadSession that matches the filter.
     * @param {UploadSessionFindUniqueArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadSessionFindUniqueArgs>(args: SelectSubset<T, UploadSessionFindUniqueArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadSessionFindUniqueOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadSessionFindFirstArgs>(args?: SelectSubset<T, UploadSessionFindFirstArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany()
     * 
     * // Get first 10 UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadSessionFindManyArgs>(args?: SelectSubset<T, UploadSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadSession.
     * @param {UploadSessionCreateArgs} args - Arguments to create a UploadSession.
     * @example
     * // Create one UploadSession
     * const UploadSession = await prisma.uploadSession.create({
     *   data: {
     *     // ... data to create a UploadSession
     *   }
     * })
     * 
     */
    create<T extends UploadSessionCreateArgs>(args: SelectSubset<T, UploadSessionCreateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadSessions.
     * @param {UploadSessionCreateManyArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadSessionCreateManyArgs>(args?: SelectSubset<T, UploadSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadSessions and returns the data saved in the database.
     * @param {UploadSessionCreateManyAndReturnArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadSession.
     * @param {UploadSessionDeleteArgs} args - Arguments to delete one UploadSession.
     * @example
     * // Delete one UploadSession
     * const UploadSession = await prisma.uploadSession.delete({
     *   where: {
     *     // ... filter to delete one UploadSession
     *   }
     * })
     * 
     */
    delete<T extends UploadSessionDeleteArgs>(args: SelectSubset<T, UploadSessionDeleteArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadSession.
     * @param {UploadSessionUpdateArgs} args - Arguments to update one UploadSession.
     * @example
     * // Update one UploadSession
     * const uploadSession = await prisma.uploadSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadSessionUpdateArgs>(args: SelectSubset<T, UploadSessionUpdateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadSessions.
     * @param {UploadSessionDeleteManyArgs} args - Arguments to filter UploadSessions to delete.
     * @example
     * // Delete a few UploadSessions
     * const { count } = await prisma.uploadSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadSessionDeleteManyArgs>(args?: SelectSubset<T, UploadSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadSessionUpdateManyArgs>(args: SelectSubset<T, UploadSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions and returns the data updated in the database.
     * @param {UploadSessionUpdateManyAndReturnArgs} args - Arguments to update many UploadSessions.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UploadSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadSession.
     * @param {UploadSessionUpsertArgs} args - Arguments to update or create a UploadSession.
     * @example
     * // Update or create a UploadSession
     * const uploadSession = await prisma.uploadSession.upsert({
     *   create: {
     *     // ... data to create a UploadSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadSession we want to update
     *   }
     * })
     */
    upsert<T extends UploadSessionUpsertArgs>(args: SelectSubset<T, UploadSessionUpsertArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionCountArgs} args - Arguments to filter UploadSessions to count.
     * @example
     * // Count the number of UploadSessions
     * const count = await prisma.uploadSession.count({
     *   where: {
     *     // ... the filter for the UploadSessions we want to count
     *   }
     * })
    **/
    count<T extends UploadSessionCountArgs>(
      args?: Subset<T, UploadSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UploadSessionAggregateArgs>(args: Subset<T, UploadSessionAggregateArgs>): Prisma.PrismaPromise<GetUploadSessionAggregateType<T>>

    /**
     * Group by UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UploadSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadSessionGroupByArgs['orderBy'] }
        : { orderBy?: UploadSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UploadSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadSession model
   */
  readonly fields: UploadSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UploadSession model
   */
  interface UploadSessionFieldRefs {
    readonly id: FieldRef<"UploadSession", 'String'>
    readonly videoId: FieldRef<"UploadSession", 'String'>
    readonly uploadId: FieldRef<"UploadSession", 'String'>
    readonly objectKey: FieldRef<"UploadSession", 'String'>
    readonly status: FieldRef<"UploadSession", 'UploadSessionStatus'>
    readonly totalParts: FieldRef<"UploadSession", 'Int'>
    readonly uploadedParts: FieldRef<"UploadSession", 'Int'>
    readonly expiresAt: FieldRef<"UploadSession", 'DateTime'>
    readonly createdAt: FieldRef<"UploadSession", 'DateTime'>
    readonly updatedAt: FieldRef<"UploadSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadSession findUnique
   */
  export type UploadSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findUniqueOrThrow
   */
  export type UploadSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findFirst
   */
  export type UploadSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findFirstOrThrow
   */
  export type UploadSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findMany
   */
  export type UploadSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSessions to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession create
   */
  export type UploadSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadSession.
     */
    data: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
  }

  /**
   * UploadSession createMany
   */
  export type UploadSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadSession createManyAndReturn
   */
  export type UploadSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession update
   */
  export type UploadSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadSession.
     */
    data: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
    /**
     * Choose, which UploadSession to update.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession updateMany
   */
  export type UploadSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
  }

  /**
   * UploadSession updateManyAndReturn
   */
  export type UploadSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession upsert
   */
  export type UploadSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadSession to update in case it exists.
     */
    where: UploadSessionWhereUniqueInput
    /**
     * In case the UploadSession found by the `where` argument doesn't exist, create a new UploadSession with this data.
     */
    create: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
    /**
     * In case the UploadSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
  }

  /**
   * UploadSession delete
   */
  export type UploadSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter which UploadSession to delete.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession deleteMany
   */
  export type UploadSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSessions to delete
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to delete.
     */
    limit?: number
  }

  /**
   * UploadSession without action
   */
  export type UploadSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
  }


  /**
   * Model VideoProcessingJob
   */

  export type AggregateVideoProcessingJob = {
    _count: VideoProcessingJobCountAggregateOutputType | null
    _avg: VideoProcessingJobAvgAggregateOutputType | null
    _sum: VideoProcessingJobSumAggregateOutputType | null
    _min: VideoProcessingJobMinAggregateOutputType | null
    _max: VideoProcessingJobMaxAggregateOutputType | null
  }

  export type VideoProcessingJobAvgAggregateOutputType = {
    progress: number | null
  }

  export type VideoProcessingJobSumAggregateOutputType = {
    progress: number | null
  }

  export type VideoProcessingJobMinAggregateOutputType = {
    id: string | null
    videoId: string | null
    jobId: string | null
    status: string | null
    progress: number | null
    error: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type VideoProcessingJobMaxAggregateOutputType = {
    id: string | null
    videoId: string | null
    jobId: string | null
    status: string | null
    progress: number | null
    error: string | null
    startedAt: Date | null
    completedAt: Date | null
  }

  export type VideoProcessingJobCountAggregateOutputType = {
    id: number
    videoId: number
    jobId: number
    status: number
    progress: number
    error: number
    startedAt: number
    completedAt: number
    _all: number
  }


  export type VideoProcessingJobAvgAggregateInputType = {
    progress?: true
  }

  export type VideoProcessingJobSumAggregateInputType = {
    progress?: true
  }

  export type VideoProcessingJobMinAggregateInputType = {
    id?: true
    videoId?: true
    jobId?: true
    status?: true
    progress?: true
    error?: true
    startedAt?: true
    completedAt?: true
  }

  export type VideoProcessingJobMaxAggregateInputType = {
    id?: true
    videoId?: true
    jobId?: true
    status?: true
    progress?: true
    error?: true
    startedAt?: true
    completedAt?: true
  }

  export type VideoProcessingJobCountAggregateInputType = {
    id?: true
    videoId?: true
    jobId?: true
    status?: true
    progress?: true
    error?: true
    startedAt?: true
    completedAt?: true
    _all?: true
  }

  export type VideoProcessingJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoProcessingJob to aggregate.
     */
    where?: VideoProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProcessingJobs to fetch.
     */
    orderBy?: VideoProcessingJobOrderByWithRelationInput | VideoProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoProcessingJobs
    **/
    _count?: true | VideoProcessingJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoProcessingJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoProcessingJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoProcessingJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoProcessingJobMaxAggregateInputType
  }

  export type GetVideoProcessingJobAggregateType<T extends VideoProcessingJobAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoProcessingJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoProcessingJob[P]>
      : GetScalarType<T[P], AggregateVideoProcessingJob[P]>
  }




  export type VideoProcessingJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoProcessingJobWhereInput
    orderBy?: VideoProcessingJobOrderByWithAggregationInput | VideoProcessingJobOrderByWithAggregationInput[]
    by: VideoProcessingJobScalarFieldEnum[] | VideoProcessingJobScalarFieldEnum
    having?: VideoProcessingJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoProcessingJobCountAggregateInputType | true
    _avg?: VideoProcessingJobAvgAggregateInputType
    _sum?: VideoProcessingJobSumAggregateInputType
    _min?: VideoProcessingJobMinAggregateInputType
    _max?: VideoProcessingJobMaxAggregateInputType
  }

  export type VideoProcessingJobGroupByOutputType = {
    id: string
    videoId: string
    jobId: string
    status: string
    progress: number
    error: string | null
    startedAt: Date
    completedAt: Date | null
    _count: VideoProcessingJobCountAggregateOutputType | null
    _avg: VideoProcessingJobAvgAggregateOutputType | null
    _sum: VideoProcessingJobSumAggregateOutputType | null
    _min: VideoProcessingJobMinAggregateOutputType | null
    _max: VideoProcessingJobMaxAggregateOutputType | null
  }

  type GetVideoProcessingJobGroupByPayload<T extends VideoProcessingJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoProcessingJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoProcessingJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoProcessingJobGroupByOutputType[P]>
            : GetScalarType<T[P], VideoProcessingJobGroupByOutputType[P]>
        }
      >
    >


  export type VideoProcessingJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    jobId?: boolean
    status?: boolean
    progress?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingJob"]>

  export type VideoProcessingJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    jobId?: boolean
    status?: boolean
    progress?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingJob"]>

  export type VideoProcessingJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    jobId?: boolean
    status?: boolean
    progress?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoProcessingJob"]>

  export type VideoProcessingJobSelectScalar = {
    id?: boolean
    videoId?: boolean
    jobId?: boolean
    status?: boolean
    progress?: boolean
    error?: boolean
    startedAt?: boolean
    completedAt?: boolean
  }

  export type VideoProcessingJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "jobId" | "status" | "progress" | "error" | "startedAt" | "completedAt", ExtArgs["result"]["videoProcessingJob"]>
  export type VideoProcessingJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type VideoProcessingJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type VideoProcessingJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $VideoProcessingJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoProcessingJob"
    objects: {
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      videoId: string
      jobId: string
      status: string
      progress: number
      error: string | null
      startedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["videoProcessingJob"]>
    composites: {}
  }

  type VideoProcessingJobGetPayload<S extends boolean | null | undefined | VideoProcessingJobDefaultArgs> = $Result.GetResult<Prisma.$VideoProcessingJobPayload, S>

  type VideoProcessingJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoProcessingJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoProcessingJobCountAggregateInputType | true
    }

  export interface VideoProcessingJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoProcessingJob'], meta: { name: 'VideoProcessingJob' } }
    /**
     * Find zero or one VideoProcessingJob that matches the filter.
     * @param {VideoProcessingJobFindUniqueArgs} args - Arguments to find a VideoProcessingJob
     * @example
     * // Get one VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoProcessingJobFindUniqueArgs>(args: SelectSubset<T, VideoProcessingJobFindUniqueArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoProcessingJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoProcessingJobFindUniqueOrThrowArgs} args - Arguments to find a VideoProcessingJob
     * @example
     * // Get one VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoProcessingJobFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoProcessingJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProcessingJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobFindFirstArgs} args - Arguments to find a VideoProcessingJob
     * @example
     * // Get one VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoProcessingJobFindFirstArgs>(args?: SelectSubset<T, VideoProcessingJobFindFirstArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoProcessingJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobFindFirstOrThrowArgs} args - Arguments to find a VideoProcessingJob
     * @example
     * // Get one VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoProcessingJobFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoProcessingJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoProcessingJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoProcessingJobs
     * const videoProcessingJobs = await prisma.videoProcessingJob.findMany()
     * 
     * // Get first 10 VideoProcessingJobs
     * const videoProcessingJobs = await prisma.videoProcessingJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoProcessingJobWithIdOnly = await prisma.videoProcessingJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoProcessingJobFindManyArgs>(args?: SelectSubset<T, VideoProcessingJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoProcessingJob.
     * @param {VideoProcessingJobCreateArgs} args - Arguments to create a VideoProcessingJob.
     * @example
     * // Create one VideoProcessingJob
     * const VideoProcessingJob = await prisma.videoProcessingJob.create({
     *   data: {
     *     // ... data to create a VideoProcessingJob
     *   }
     * })
     * 
     */
    create<T extends VideoProcessingJobCreateArgs>(args: SelectSubset<T, VideoProcessingJobCreateArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoProcessingJobs.
     * @param {VideoProcessingJobCreateManyArgs} args - Arguments to create many VideoProcessingJobs.
     * @example
     * // Create many VideoProcessingJobs
     * const videoProcessingJob = await prisma.videoProcessingJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoProcessingJobCreateManyArgs>(args?: SelectSubset<T, VideoProcessingJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoProcessingJobs and returns the data saved in the database.
     * @param {VideoProcessingJobCreateManyAndReturnArgs} args - Arguments to create many VideoProcessingJobs.
     * @example
     * // Create many VideoProcessingJobs
     * const videoProcessingJob = await prisma.videoProcessingJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoProcessingJobs and only return the `id`
     * const videoProcessingJobWithIdOnly = await prisma.videoProcessingJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoProcessingJobCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoProcessingJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoProcessingJob.
     * @param {VideoProcessingJobDeleteArgs} args - Arguments to delete one VideoProcessingJob.
     * @example
     * // Delete one VideoProcessingJob
     * const VideoProcessingJob = await prisma.videoProcessingJob.delete({
     *   where: {
     *     // ... filter to delete one VideoProcessingJob
     *   }
     * })
     * 
     */
    delete<T extends VideoProcessingJobDeleteArgs>(args: SelectSubset<T, VideoProcessingJobDeleteArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoProcessingJob.
     * @param {VideoProcessingJobUpdateArgs} args - Arguments to update one VideoProcessingJob.
     * @example
     * // Update one VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoProcessingJobUpdateArgs>(args: SelectSubset<T, VideoProcessingJobUpdateArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoProcessingJobs.
     * @param {VideoProcessingJobDeleteManyArgs} args - Arguments to filter VideoProcessingJobs to delete.
     * @example
     * // Delete a few VideoProcessingJobs
     * const { count } = await prisma.videoProcessingJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoProcessingJobDeleteManyArgs>(args?: SelectSubset<T, VideoProcessingJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProcessingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoProcessingJobs
     * const videoProcessingJob = await prisma.videoProcessingJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoProcessingJobUpdateManyArgs>(args: SelectSubset<T, VideoProcessingJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoProcessingJobs and returns the data updated in the database.
     * @param {VideoProcessingJobUpdateManyAndReturnArgs} args - Arguments to update many VideoProcessingJobs.
     * @example
     * // Update many VideoProcessingJobs
     * const videoProcessingJob = await prisma.videoProcessingJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoProcessingJobs and only return the `id`
     * const videoProcessingJobWithIdOnly = await prisma.videoProcessingJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoProcessingJobUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoProcessingJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoProcessingJob.
     * @param {VideoProcessingJobUpsertArgs} args - Arguments to update or create a VideoProcessingJob.
     * @example
     * // Update or create a VideoProcessingJob
     * const videoProcessingJob = await prisma.videoProcessingJob.upsert({
     *   create: {
     *     // ... data to create a VideoProcessingJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoProcessingJob we want to update
     *   }
     * })
     */
    upsert<T extends VideoProcessingJobUpsertArgs>(args: SelectSubset<T, VideoProcessingJobUpsertArgs<ExtArgs>>): Prisma__VideoProcessingJobClient<$Result.GetResult<Prisma.$VideoProcessingJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoProcessingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobCountArgs} args - Arguments to filter VideoProcessingJobs to count.
     * @example
     * // Count the number of VideoProcessingJobs
     * const count = await prisma.videoProcessingJob.count({
     *   where: {
     *     // ... the filter for the VideoProcessingJobs we want to count
     *   }
     * })
    **/
    count<T extends VideoProcessingJobCountArgs>(
      args?: Subset<T, VideoProcessingJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoProcessingJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoProcessingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoProcessingJobAggregateArgs>(args: Subset<T, VideoProcessingJobAggregateArgs>): Prisma.PrismaPromise<GetVideoProcessingJobAggregateType<T>>

    /**
     * Group by VideoProcessingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoProcessingJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoProcessingJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoProcessingJobGroupByArgs['orderBy'] }
        : { orderBy?: VideoProcessingJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoProcessingJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoProcessingJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoProcessingJob model
   */
  readonly fields: VideoProcessingJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoProcessingJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoProcessingJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoProcessingJob model
   */
  interface VideoProcessingJobFieldRefs {
    readonly id: FieldRef<"VideoProcessingJob", 'String'>
    readonly videoId: FieldRef<"VideoProcessingJob", 'String'>
    readonly jobId: FieldRef<"VideoProcessingJob", 'String'>
    readonly status: FieldRef<"VideoProcessingJob", 'String'>
    readonly progress: FieldRef<"VideoProcessingJob", 'Int'>
    readonly error: FieldRef<"VideoProcessingJob", 'String'>
    readonly startedAt: FieldRef<"VideoProcessingJob", 'DateTime'>
    readonly completedAt: FieldRef<"VideoProcessingJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoProcessingJob findUnique
   */
  export type VideoProcessingJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoProcessingJob to fetch.
     */
    where: VideoProcessingJobWhereUniqueInput
  }

  /**
   * VideoProcessingJob findUniqueOrThrow
   */
  export type VideoProcessingJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoProcessingJob to fetch.
     */
    where: VideoProcessingJobWhereUniqueInput
  }

  /**
   * VideoProcessingJob findFirst
   */
  export type VideoProcessingJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoProcessingJob to fetch.
     */
    where?: VideoProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProcessingJobs to fetch.
     */
    orderBy?: VideoProcessingJobOrderByWithRelationInput | VideoProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoProcessingJobs.
     */
    cursor?: VideoProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoProcessingJobs.
     */
    distinct?: VideoProcessingJobScalarFieldEnum | VideoProcessingJobScalarFieldEnum[]
  }

  /**
   * VideoProcessingJob findFirstOrThrow
   */
  export type VideoProcessingJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoProcessingJob to fetch.
     */
    where?: VideoProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProcessingJobs to fetch.
     */
    orderBy?: VideoProcessingJobOrderByWithRelationInput | VideoProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoProcessingJobs.
     */
    cursor?: VideoProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoProcessingJobs.
     */
    distinct?: VideoProcessingJobScalarFieldEnum | VideoProcessingJobScalarFieldEnum[]
  }

  /**
   * VideoProcessingJob findMany
   */
  export type VideoProcessingJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter, which VideoProcessingJobs to fetch.
     */
    where?: VideoProcessingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoProcessingJobs to fetch.
     */
    orderBy?: VideoProcessingJobOrderByWithRelationInput | VideoProcessingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoProcessingJobs.
     */
    cursor?: VideoProcessingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoProcessingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoProcessingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoProcessingJobs.
     */
    distinct?: VideoProcessingJobScalarFieldEnum | VideoProcessingJobScalarFieldEnum[]
  }

  /**
   * VideoProcessingJob create
   */
  export type VideoProcessingJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * The data needed to create a VideoProcessingJob.
     */
    data: XOR<VideoProcessingJobCreateInput, VideoProcessingJobUncheckedCreateInput>
  }

  /**
   * VideoProcessingJob createMany
   */
  export type VideoProcessingJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoProcessingJobs.
     */
    data: VideoProcessingJobCreateManyInput | VideoProcessingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoProcessingJob createManyAndReturn
   */
  export type VideoProcessingJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * The data used to create many VideoProcessingJobs.
     */
    data: VideoProcessingJobCreateManyInput | VideoProcessingJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoProcessingJob update
   */
  export type VideoProcessingJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * The data needed to update a VideoProcessingJob.
     */
    data: XOR<VideoProcessingJobUpdateInput, VideoProcessingJobUncheckedUpdateInput>
    /**
     * Choose, which VideoProcessingJob to update.
     */
    where: VideoProcessingJobWhereUniqueInput
  }

  /**
   * VideoProcessingJob updateMany
   */
  export type VideoProcessingJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoProcessingJobs.
     */
    data: XOR<VideoProcessingJobUpdateManyMutationInput, VideoProcessingJobUncheckedUpdateManyInput>
    /**
     * Filter which VideoProcessingJobs to update
     */
    where?: VideoProcessingJobWhereInput
    /**
     * Limit how many VideoProcessingJobs to update.
     */
    limit?: number
  }

  /**
   * VideoProcessingJob updateManyAndReturn
   */
  export type VideoProcessingJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * The data used to update VideoProcessingJobs.
     */
    data: XOR<VideoProcessingJobUpdateManyMutationInput, VideoProcessingJobUncheckedUpdateManyInput>
    /**
     * Filter which VideoProcessingJobs to update
     */
    where?: VideoProcessingJobWhereInput
    /**
     * Limit how many VideoProcessingJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoProcessingJob upsert
   */
  export type VideoProcessingJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * The filter to search for the VideoProcessingJob to update in case it exists.
     */
    where: VideoProcessingJobWhereUniqueInput
    /**
     * In case the VideoProcessingJob found by the `where` argument doesn't exist, create a new VideoProcessingJob with this data.
     */
    create: XOR<VideoProcessingJobCreateInput, VideoProcessingJobUncheckedCreateInput>
    /**
     * In case the VideoProcessingJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoProcessingJobUpdateInput, VideoProcessingJobUncheckedUpdateInput>
  }

  /**
   * VideoProcessingJob delete
   */
  export type VideoProcessingJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
    /**
     * Filter which VideoProcessingJob to delete.
     */
    where: VideoProcessingJobWhereUniqueInput
  }

  /**
   * VideoProcessingJob deleteMany
   */
  export type VideoProcessingJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoProcessingJobs to delete
     */
    where?: VideoProcessingJobWhereInput
    /**
     * Limit how many VideoProcessingJobs to delete.
     */
    limit?: number
  }

  /**
   * VideoProcessingJob without action
   */
  export type VideoProcessingJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoProcessingJob
     */
    select?: VideoProcessingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoProcessingJob
     */
    omit?: VideoProcessingJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoProcessingJobInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const VideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    uploadProgress: 'uploadProgress',
    processingProgress: 'processingProgress',
    originalFileName: 'originalFileName',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    duration: 'duration',
    width: 'width',
    height: 'height',
    fps: 'fps',
    bitrate: 'bitrate',
    codec: 'codec',
    thumbnailUrl: 'thumbnailUrl',
    playbackUrl: 'playbackUrl',
    originalObjectKey: 'originalObjectKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum]


  export const UploadSessionScalarFieldEnum: {
    id: 'id',
    videoId: 'videoId',
    uploadId: 'uploadId',
    objectKey: 'objectKey',
    status: 'status',
    totalParts: 'totalParts',
    uploadedParts: 'uploadedParts',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UploadSessionScalarFieldEnum = (typeof UploadSessionScalarFieldEnum)[keyof typeof UploadSessionScalarFieldEnum]


  export const VideoProcessingJobScalarFieldEnum: {
    id: 'id',
    videoId: 'videoId',
    jobId: 'jobId',
    status: 'status',
    progress: 'progress',
    error: 'error',
    startedAt: 'startedAt',
    completedAt: 'completedAt'
  };

  export type VideoProcessingJobScalarFieldEnum = (typeof VideoProcessingJobScalarFieldEnum)[keyof typeof VideoProcessingJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'VideoStatus'
   */
  export type EnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus'>
    


  /**
   * Reference to a field of type 'VideoStatus[]'
   */
  export type ListEnumVideoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UploadSessionStatus'
   */
  export type EnumUploadSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadSessionStatus'>
    


  /**
   * Reference to a field of type 'UploadSessionStatus[]'
   */
  export type ListEnumUploadSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadSessionStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type VideoWhereInput = {
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    id?: StringFilter<"Video"> | string
    title?: StringNullableFilter<"Video"> | string | null
    description?: StringNullableFilter<"Video"> | string | null
    status?: EnumVideoStatusFilter<"Video"> | $Enums.VideoStatus
    uploadProgress?: IntFilter<"Video"> | number
    processingProgress?: IntFilter<"Video"> | number
    originalFileName?: StringFilter<"Video"> | string
    mimeType?: StringFilter<"Video"> | string
    fileSize?: BigIntFilter<"Video"> | bigint | number
    duration?: FloatNullableFilter<"Video"> | number | null
    width?: IntNullableFilter<"Video"> | number | null
    height?: IntNullableFilter<"Video"> | number | null
    fps?: FloatNullableFilter<"Video"> | number | null
    bitrate?: IntNullableFilter<"Video"> | number | null
    codec?: StringNullableFilter<"Video"> | string | null
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    playbackUrl?: StringNullableFilter<"Video"> | string | null
    originalObjectKey?: StringFilter<"Video"> | string
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    uploadSession?: XOR<UploadSessionNullableScalarRelationFilter, UploadSessionWhereInput> | null
    processingJobs?: VideoProcessingJobListRelationFilter
  }

  export type VideoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    originalFileName?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    fps?: SortOrderInput | SortOrder
    bitrate?: SortOrderInput | SortOrder
    codec?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    playbackUrl?: SortOrderInput | SortOrder
    originalObjectKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    uploadSession?: UploadSessionOrderByWithRelationInput
    processingJobs?: VideoProcessingJobOrderByRelationAggregateInput
  }

  export type VideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    title?: StringNullableFilter<"Video"> | string | null
    description?: StringNullableFilter<"Video"> | string | null
    status?: EnumVideoStatusFilter<"Video"> | $Enums.VideoStatus
    uploadProgress?: IntFilter<"Video"> | number
    processingProgress?: IntFilter<"Video"> | number
    originalFileName?: StringFilter<"Video"> | string
    mimeType?: StringFilter<"Video"> | string
    fileSize?: BigIntFilter<"Video"> | bigint | number
    duration?: FloatNullableFilter<"Video"> | number | null
    width?: IntNullableFilter<"Video"> | number | null
    height?: IntNullableFilter<"Video"> | number | null
    fps?: FloatNullableFilter<"Video"> | number | null
    bitrate?: IntNullableFilter<"Video"> | number | null
    codec?: StringNullableFilter<"Video"> | string | null
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    playbackUrl?: StringNullableFilter<"Video"> | string | null
    originalObjectKey?: StringFilter<"Video"> | string
    createdAt?: DateTimeFilter<"Video"> | Date | string
    updatedAt?: DateTimeFilter<"Video"> | Date | string
    uploadSession?: XOR<UploadSessionNullableScalarRelationFilter, UploadSessionWhereInput> | null
    processingJobs?: VideoProcessingJobListRelationFilter
  }, "id">

  export type VideoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    originalFileName?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrderInput | SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    fps?: SortOrderInput | SortOrder
    bitrate?: SortOrderInput | SortOrder
    codec?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    playbackUrl?: SortOrderInput | SortOrder
    originalObjectKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VideoCountOrderByAggregateInput
    _avg?: VideoAvgOrderByAggregateInput
    _max?: VideoMaxOrderByAggregateInput
    _min?: VideoMinOrderByAggregateInput
    _sum?: VideoSumOrderByAggregateInput
  }

  export type VideoScalarWhereWithAggregatesInput = {
    AND?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    OR?: VideoScalarWhereWithAggregatesInput[]
    NOT?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Video"> | string
    title?: StringNullableWithAggregatesFilter<"Video"> | string | null
    description?: StringNullableWithAggregatesFilter<"Video"> | string | null
    status?: EnumVideoStatusWithAggregatesFilter<"Video"> | $Enums.VideoStatus
    uploadProgress?: IntWithAggregatesFilter<"Video"> | number
    processingProgress?: IntWithAggregatesFilter<"Video"> | number
    originalFileName?: StringWithAggregatesFilter<"Video"> | string
    mimeType?: StringWithAggregatesFilter<"Video"> | string
    fileSize?: BigIntWithAggregatesFilter<"Video"> | bigint | number
    duration?: FloatNullableWithAggregatesFilter<"Video"> | number | null
    width?: IntNullableWithAggregatesFilter<"Video"> | number | null
    height?: IntNullableWithAggregatesFilter<"Video"> | number | null
    fps?: FloatNullableWithAggregatesFilter<"Video"> | number | null
    bitrate?: IntNullableWithAggregatesFilter<"Video"> | number | null
    codec?: StringNullableWithAggregatesFilter<"Video"> | string | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Video"> | string | null
    playbackUrl?: StringNullableWithAggregatesFilter<"Video"> | string | null
    originalObjectKey?: StringWithAggregatesFilter<"Video"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
  }

  export type UploadSessionWhereInput = {
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    id?: StringFilter<"UploadSession"> | string
    videoId?: StringFilter<"UploadSession"> | string
    uploadId?: StringFilter<"UploadSession"> | string
    objectKey?: StringFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusFilter<"UploadSession"> | $Enums.UploadSessionStatus
    totalParts?: IntFilter<"UploadSession"> | number
    uploadedParts?: IntFilter<"UploadSession"> | number
    expiresAt?: DateTimeFilter<"UploadSession"> | Date | string
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeFilter<"UploadSession"> | Date | string
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type UploadSessionOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    uploadId?: SortOrder
    objectKey?: SortOrder
    status?: SortOrder
    totalParts?: SortOrder
    uploadedParts?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    video?: VideoOrderByWithRelationInput
  }

  export type UploadSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    videoId?: string
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    uploadId?: StringFilter<"UploadSession"> | string
    objectKey?: StringFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusFilter<"UploadSession"> | $Enums.UploadSessionStatus
    totalParts?: IntFilter<"UploadSession"> | number
    uploadedParts?: IntFilter<"UploadSession"> | number
    expiresAt?: DateTimeFilter<"UploadSession"> | Date | string
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeFilter<"UploadSession"> | Date | string
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id" | "videoId">

  export type UploadSessionOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    uploadId?: SortOrder
    objectKey?: SortOrder
    status?: SortOrder
    totalParts?: SortOrder
    uploadedParts?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UploadSessionCountOrderByAggregateInput
    _avg?: UploadSessionAvgOrderByAggregateInput
    _max?: UploadSessionMaxOrderByAggregateInput
    _min?: UploadSessionMinOrderByAggregateInput
    _sum?: UploadSessionSumOrderByAggregateInput
  }

  export type UploadSessionScalarWhereWithAggregatesInput = {
    AND?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    OR?: UploadSessionScalarWhereWithAggregatesInput[]
    NOT?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadSession"> | string
    videoId?: StringWithAggregatesFilter<"UploadSession"> | string
    uploadId?: StringWithAggregatesFilter<"UploadSession"> | string
    objectKey?: StringWithAggregatesFilter<"UploadSession"> | string
    status?: EnumUploadSessionStatusWithAggregatesFilter<"UploadSession"> | $Enums.UploadSessionStatus
    totalParts?: IntWithAggregatesFilter<"UploadSession"> | number
    uploadedParts?: IntWithAggregatesFilter<"UploadSession"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
  }

  export type VideoProcessingJobWhereInput = {
    AND?: VideoProcessingJobWhereInput | VideoProcessingJobWhereInput[]
    OR?: VideoProcessingJobWhereInput[]
    NOT?: VideoProcessingJobWhereInput | VideoProcessingJobWhereInput[]
    id?: StringFilter<"VideoProcessingJob"> | string
    videoId?: StringFilter<"VideoProcessingJob"> | string
    jobId?: StringFilter<"VideoProcessingJob"> | string
    status?: StringFilter<"VideoProcessingJob"> | string
    progress?: IntFilter<"VideoProcessingJob"> | number
    error?: StringNullableFilter<"VideoProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"VideoProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"VideoProcessingJob"> | Date | string | null
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type VideoProcessingJobOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    video?: VideoOrderByWithRelationInput
  }

  export type VideoProcessingJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobId?: string
    AND?: VideoProcessingJobWhereInput | VideoProcessingJobWhereInput[]
    OR?: VideoProcessingJobWhereInput[]
    NOT?: VideoProcessingJobWhereInput | VideoProcessingJobWhereInput[]
    videoId?: StringFilter<"VideoProcessingJob"> | string
    status?: StringFilter<"VideoProcessingJob"> | string
    progress?: IntFilter<"VideoProcessingJob"> | number
    error?: StringNullableFilter<"VideoProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"VideoProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"VideoProcessingJob"> | Date | string | null
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id" | "jobId">

  export type VideoProcessingJobOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: VideoProcessingJobCountOrderByAggregateInput
    _avg?: VideoProcessingJobAvgOrderByAggregateInput
    _max?: VideoProcessingJobMaxOrderByAggregateInput
    _min?: VideoProcessingJobMinOrderByAggregateInput
    _sum?: VideoProcessingJobSumOrderByAggregateInput
  }

  export type VideoProcessingJobScalarWhereWithAggregatesInput = {
    AND?: VideoProcessingJobScalarWhereWithAggregatesInput | VideoProcessingJobScalarWhereWithAggregatesInput[]
    OR?: VideoProcessingJobScalarWhereWithAggregatesInput[]
    NOT?: VideoProcessingJobScalarWhereWithAggregatesInput | VideoProcessingJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoProcessingJob"> | string
    videoId?: StringWithAggregatesFilter<"VideoProcessingJob"> | string
    jobId?: StringWithAggregatesFilter<"VideoProcessingJob"> | string
    status?: StringWithAggregatesFilter<"VideoProcessingJob"> | string
    progress?: IntWithAggregatesFilter<"VideoProcessingJob"> | number
    error?: StringNullableWithAggregatesFilter<"VideoProcessingJob"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"VideoProcessingJob"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"VideoProcessingJob"> | Date | string | null
  }

  export type VideoCreateInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadSession?: UploadSessionCreateNestedOneWithoutVideoInput
    processingJobs?: VideoProcessingJobCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadSession?: UploadSessionUncheckedCreateNestedOneWithoutVideoInput
    processingJobs?: VideoProcessingJobUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadSession?: UploadSessionUpdateOneWithoutVideoNestedInput
    processingJobs?: VideoProcessingJobUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadSession?: UploadSessionUncheckedUpdateOneWithoutVideoNestedInput
    processingJobs?: VideoProcessingJobUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoCreateManyInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionCreateInput = {
    id?: string
    uploadId: string
    objectKey: string
    status?: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts?: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    video: VideoCreateNestedOneWithoutUploadSessionInput
  }

  export type UploadSessionUncheckedCreateInput = {
    id?: string
    videoId: string
    uploadId: string
    objectKey: string
    status?: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts?: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: VideoUpdateOneRequiredWithoutUploadSessionNestedInput
  }

  export type UploadSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionCreateManyInput = {
    id?: string
    videoId: string
    uploadId: string
    objectKey: string
    status?: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts?: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProcessingJobCreateInput = {
    id?: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    video: VideoCreateNestedOneWithoutProcessingJobsInput
  }

  export type VideoProcessingJobUncheckedCreateInput = {
    id?: string
    videoId: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type VideoProcessingJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    video?: VideoUpdateOneRequiredWithoutProcessingJobsNestedInput
  }

  export type VideoProcessingJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoProcessingJobCreateManyInput = {
    id?: string
    videoId: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type VideoProcessingJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoProcessingJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UploadSessionNullableScalarRelationFilter = {
    is?: UploadSessionWhereInput | null
    isNot?: UploadSessionWhereInput | null
  }

  export type VideoProcessingJobListRelationFilter = {
    every?: VideoProcessingJobWhereInput
    some?: VideoProcessingJobWhereInput
    none?: VideoProcessingJobWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VideoProcessingJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VideoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    originalFileName?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fps?: SortOrder
    bitrate?: SortOrder
    codec?: SortOrder
    thumbnailUrl?: SortOrder
    playbackUrl?: SortOrder
    originalObjectKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoAvgOrderByAggregateInput = {
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fps?: SortOrder
    bitrate?: SortOrder
  }

  export type VideoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    originalFileName?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fps?: SortOrder
    bitrate?: SortOrder
    codec?: SortOrder
    thumbnailUrl?: SortOrder
    playbackUrl?: SortOrder
    originalObjectKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    originalFileName?: SortOrder
    mimeType?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fps?: SortOrder
    bitrate?: SortOrder
    codec?: SortOrder
    thumbnailUrl?: SortOrder
    playbackUrl?: SortOrder
    originalObjectKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VideoSumOrderByAggregateInput = {
    uploadProgress?: SortOrder
    processingProgress?: SortOrder
    fileSize?: SortOrder
    duration?: SortOrder
    width?: SortOrder
    height?: SortOrder
    fps?: SortOrder
    bitrate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUploadSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusFilter<$PrismaModel> | $Enums.UploadSessionStatus
  }

  export type VideoScalarRelationFilter = {
    is?: VideoWhereInput
    isNot?: VideoWhereInput
  }

  export type UploadSessionCountOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    uploadId?: SortOrder
    objectKey?: SortOrder
    status?: SortOrder
    totalParts?: SortOrder
    uploadedParts?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadSessionAvgOrderByAggregateInput = {
    totalParts?: SortOrder
    uploadedParts?: SortOrder
  }

  export type UploadSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    uploadId?: SortOrder
    objectKey?: SortOrder
    status?: SortOrder
    totalParts?: SortOrder
    uploadedParts?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadSessionMinOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    uploadId?: SortOrder
    objectKey?: SortOrder
    status?: SortOrder
    totalParts?: SortOrder
    uploadedParts?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UploadSessionSumOrderByAggregateInput = {
    totalParts?: SortOrder
    uploadedParts?: SortOrder
  }

  export type EnumUploadSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type VideoProcessingJobCountOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type VideoProcessingJobAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type VideoProcessingJobMaxOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type VideoProcessingJobMinOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    jobId?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type VideoProcessingJobSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UploadSessionCreateNestedOneWithoutVideoInput = {
    create?: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
    connectOrCreate?: UploadSessionCreateOrConnectWithoutVideoInput
    connect?: UploadSessionWhereUniqueInput
  }

  export type VideoProcessingJobCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput> | VideoProcessingJobCreateWithoutVideoInput[] | VideoProcessingJobUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProcessingJobCreateOrConnectWithoutVideoInput | VideoProcessingJobCreateOrConnectWithoutVideoInput[]
    createMany?: VideoProcessingJobCreateManyVideoInputEnvelope
    connect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
  }

  export type UploadSessionUncheckedCreateNestedOneWithoutVideoInput = {
    create?: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
    connectOrCreate?: UploadSessionCreateOrConnectWithoutVideoInput
    connect?: UploadSessionWhereUniqueInput
  }

  export type VideoProcessingJobUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput> | VideoProcessingJobCreateWithoutVideoInput[] | VideoProcessingJobUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProcessingJobCreateOrConnectWithoutVideoInput | VideoProcessingJobCreateOrConnectWithoutVideoInput[]
    createMany?: VideoProcessingJobCreateManyVideoInputEnvelope
    connect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumVideoStatusFieldUpdateOperationsInput = {
    set?: $Enums.VideoStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UploadSessionUpdateOneWithoutVideoNestedInput = {
    create?: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
    connectOrCreate?: UploadSessionCreateOrConnectWithoutVideoInput
    upsert?: UploadSessionUpsertWithoutVideoInput
    disconnect?: UploadSessionWhereInput | boolean
    delete?: UploadSessionWhereInput | boolean
    connect?: UploadSessionWhereUniqueInput
    update?: XOR<XOR<UploadSessionUpdateToOneWithWhereWithoutVideoInput, UploadSessionUpdateWithoutVideoInput>, UploadSessionUncheckedUpdateWithoutVideoInput>
  }

  export type VideoProcessingJobUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput> | VideoProcessingJobCreateWithoutVideoInput[] | VideoProcessingJobUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProcessingJobCreateOrConnectWithoutVideoInput | VideoProcessingJobCreateOrConnectWithoutVideoInput[]
    upsert?: VideoProcessingJobUpsertWithWhereUniqueWithoutVideoInput | VideoProcessingJobUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoProcessingJobCreateManyVideoInputEnvelope
    set?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    disconnect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    delete?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    connect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    update?: VideoProcessingJobUpdateWithWhereUniqueWithoutVideoInput | VideoProcessingJobUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoProcessingJobUpdateManyWithWhereWithoutVideoInput | VideoProcessingJobUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoProcessingJobScalarWhereInput | VideoProcessingJobScalarWhereInput[]
  }

  export type UploadSessionUncheckedUpdateOneWithoutVideoNestedInput = {
    create?: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
    connectOrCreate?: UploadSessionCreateOrConnectWithoutVideoInput
    upsert?: UploadSessionUpsertWithoutVideoInput
    disconnect?: UploadSessionWhereInput | boolean
    delete?: UploadSessionWhereInput | boolean
    connect?: UploadSessionWhereUniqueInput
    update?: XOR<XOR<UploadSessionUpdateToOneWithWhereWithoutVideoInput, UploadSessionUpdateWithoutVideoInput>, UploadSessionUncheckedUpdateWithoutVideoInput>
  }

  export type VideoProcessingJobUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput> | VideoProcessingJobCreateWithoutVideoInput[] | VideoProcessingJobUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: VideoProcessingJobCreateOrConnectWithoutVideoInput | VideoProcessingJobCreateOrConnectWithoutVideoInput[]
    upsert?: VideoProcessingJobUpsertWithWhereUniqueWithoutVideoInput | VideoProcessingJobUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: VideoProcessingJobCreateManyVideoInputEnvelope
    set?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    disconnect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    delete?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    connect?: VideoProcessingJobWhereUniqueInput | VideoProcessingJobWhereUniqueInput[]
    update?: VideoProcessingJobUpdateWithWhereUniqueWithoutVideoInput | VideoProcessingJobUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: VideoProcessingJobUpdateManyWithWhereWithoutVideoInput | VideoProcessingJobUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: VideoProcessingJobScalarWhereInput | VideoProcessingJobScalarWhereInput[]
  }

  export type VideoCreateNestedOneWithoutUploadSessionInput = {
    create?: XOR<VideoCreateWithoutUploadSessionInput, VideoUncheckedCreateWithoutUploadSessionInput>
    connectOrCreate?: VideoCreateOrConnectWithoutUploadSessionInput
    connect?: VideoWhereUniqueInput
  }

  export type EnumUploadSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.UploadSessionStatus
  }

  export type VideoUpdateOneRequiredWithoutUploadSessionNestedInput = {
    create?: XOR<VideoCreateWithoutUploadSessionInput, VideoUncheckedCreateWithoutUploadSessionInput>
    connectOrCreate?: VideoCreateOrConnectWithoutUploadSessionInput
    upsert?: VideoUpsertWithoutUploadSessionInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutUploadSessionInput, VideoUpdateWithoutUploadSessionInput>, VideoUncheckedUpdateWithoutUploadSessionInput>
  }

  export type VideoCreateNestedOneWithoutProcessingJobsInput = {
    create?: XOR<VideoCreateWithoutProcessingJobsInput, VideoUncheckedCreateWithoutProcessingJobsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutProcessingJobsInput
    connect?: VideoWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type VideoUpdateOneRequiredWithoutProcessingJobsNestedInput = {
    create?: XOR<VideoCreateWithoutProcessingJobsInput, VideoUncheckedCreateWithoutProcessingJobsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutProcessingJobsInput
    upsert?: VideoUpsertWithoutProcessingJobsInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutProcessingJobsInput, VideoUpdateWithoutProcessingJobsInput>, VideoUncheckedUpdateWithoutProcessingJobsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumVideoStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusFilter<$PrismaModel> | $Enums.VideoStatus
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoStatus | EnumVideoStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoStatus[] | ListEnumVideoStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoStatusWithAggregatesFilter<$PrismaModel> | $Enums.VideoStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoStatusFilter<$PrismaModel>
    _max?: NestedEnumVideoStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUploadSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusFilter<$PrismaModel> | $Enums.UploadSessionStatus
  }

  export type NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadSessionStatus | EnumUploadSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadSessionStatus[] | ListEnumUploadSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadSessionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UploadSessionCreateWithoutVideoInput = {
    id?: string
    uploadId: string
    objectKey: string
    status?: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts?: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadSessionUncheckedCreateWithoutVideoInput = {
    id?: string
    uploadId: string
    objectKey: string
    status?: $Enums.UploadSessionStatus
    totalParts: number
    uploadedParts?: number
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UploadSessionCreateOrConnectWithoutVideoInput = {
    where: UploadSessionWhereUniqueInput
    create: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
  }

  export type VideoProcessingJobCreateWithoutVideoInput = {
    id?: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type VideoProcessingJobUncheckedCreateWithoutVideoInput = {
    id?: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type VideoProcessingJobCreateOrConnectWithoutVideoInput = {
    where: VideoProcessingJobWhereUniqueInput
    create: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput>
  }

  export type VideoProcessingJobCreateManyVideoInputEnvelope = {
    data: VideoProcessingJobCreateManyVideoInput | VideoProcessingJobCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type UploadSessionUpsertWithoutVideoInput = {
    update: XOR<UploadSessionUpdateWithoutVideoInput, UploadSessionUncheckedUpdateWithoutVideoInput>
    create: XOR<UploadSessionCreateWithoutVideoInput, UploadSessionUncheckedCreateWithoutVideoInput>
    where?: UploadSessionWhereInput
  }

  export type UploadSessionUpdateToOneWithWhereWithoutVideoInput = {
    where?: UploadSessionWhereInput
    data: XOR<UploadSessionUpdateWithoutVideoInput, UploadSessionUncheckedUpdateWithoutVideoInput>
  }

  export type UploadSessionUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    uploadId?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    status?: EnumUploadSessionStatusFieldUpdateOperationsInput | $Enums.UploadSessionStatus
    totalParts?: IntFieldUpdateOperationsInput | number
    uploadedParts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoProcessingJobUpsertWithWhereUniqueWithoutVideoInput = {
    where: VideoProcessingJobWhereUniqueInput
    update: XOR<VideoProcessingJobUpdateWithoutVideoInput, VideoProcessingJobUncheckedUpdateWithoutVideoInput>
    create: XOR<VideoProcessingJobCreateWithoutVideoInput, VideoProcessingJobUncheckedCreateWithoutVideoInput>
  }

  export type VideoProcessingJobUpdateWithWhereUniqueWithoutVideoInput = {
    where: VideoProcessingJobWhereUniqueInput
    data: XOR<VideoProcessingJobUpdateWithoutVideoInput, VideoProcessingJobUncheckedUpdateWithoutVideoInput>
  }

  export type VideoProcessingJobUpdateManyWithWhereWithoutVideoInput = {
    where: VideoProcessingJobScalarWhereInput
    data: XOR<VideoProcessingJobUpdateManyMutationInput, VideoProcessingJobUncheckedUpdateManyWithoutVideoInput>
  }

  export type VideoProcessingJobScalarWhereInput = {
    AND?: VideoProcessingJobScalarWhereInput | VideoProcessingJobScalarWhereInput[]
    OR?: VideoProcessingJobScalarWhereInput[]
    NOT?: VideoProcessingJobScalarWhereInput | VideoProcessingJobScalarWhereInput[]
    id?: StringFilter<"VideoProcessingJob"> | string
    videoId?: StringFilter<"VideoProcessingJob"> | string
    jobId?: StringFilter<"VideoProcessingJob"> | string
    status?: StringFilter<"VideoProcessingJob"> | string
    progress?: IntFilter<"VideoProcessingJob"> | number
    error?: StringNullableFilter<"VideoProcessingJob"> | string | null
    startedAt?: DateTimeFilter<"VideoProcessingJob"> | Date | string
    completedAt?: DateTimeNullableFilter<"VideoProcessingJob"> | Date | string | null
  }

  export type VideoCreateWithoutUploadSessionInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: VideoProcessingJobCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutUploadSessionInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    processingJobs?: VideoProcessingJobUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutUploadSessionInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutUploadSessionInput, VideoUncheckedCreateWithoutUploadSessionInput>
  }

  export type VideoUpsertWithoutUploadSessionInput = {
    update: XOR<VideoUpdateWithoutUploadSessionInput, VideoUncheckedUpdateWithoutUploadSessionInput>
    create: XOR<VideoCreateWithoutUploadSessionInput, VideoUncheckedCreateWithoutUploadSessionInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutUploadSessionInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutUploadSessionInput, VideoUncheckedUpdateWithoutUploadSessionInput>
  }

  export type VideoUpdateWithoutUploadSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: VideoProcessingJobUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutUploadSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processingJobs?: VideoProcessingJobUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoCreateWithoutProcessingJobsInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadSession?: UploadSessionCreateNestedOneWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutProcessingJobsInput = {
    id?: string
    title?: string | null
    description?: string | null
    status?: $Enums.VideoStatus
    uploadProgress?: number
    processingProgress?: number
    originalFileName: string
    mimeType: string
    fileSize: bigint | number
    duration?: number | null
    width?: number | null
    height?: number | null
    fps?: number | null
    bitrate?: number | null
    codec?: string | null
    thumbnailUrl?: string | null
    playbackUrl?: string | null
    originalObjectKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadSession?: UploadSessionUncheckedCreateNestedOneWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutProcessingJobsInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutProcessingJobsInput, VideoUncheckedCreateWithoutProcessingJobsInput>
  }

  export type VideoUpsertWithoutProcessingJobsInput = {
    update: XOR<VideoUpdateWithoutProcessingJobsInput, VideoUncheckedUpdateWithoutProcessingJobsInput>
    create: XOR<VideoCreateWithoutProcessingJobsInput, VideoUncheckedCreateWithoutProcessingJobsInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutProcessingJobsInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutProcessingJobsInput, VideoUncheckedUpdateWithoutProcessingJobsInput>
  }

  export type VideoUpdateWithoutProcessingJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadSession?: UploadSessionUpdateOneWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutProcessingJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumVideoStatusFieldUpdateOperationsInput | $Enums.VideoStatus
    uploadProgress?: IntFieldUpdateOperationsInput | number
    processingProgress?: IntFieldUpdateOperationsInput | number
    originalFileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    fileSize?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: NullableFloatFieldUpdateOperationsInput | number | null
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    fps?: NullableFloatFieldUpdateOperationsInput | number | null
    bitrate?: NullableIntFieldUpdateOperationsInput | number | null
    codec?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    playbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    originalObjectKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadSession?: UploadSessionUncheckedUpdateOneWithoutVideoNestedInput
  }

  export type VideoProcessingJobCreateManyVideoInput = {
    id?: string
    jobId: string
    status: string
    progress?: number
    error?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type VideoProcessingJobUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoProcessingJobUncheckedUpdateWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoProcessingJobUncheckedUpdateManyWithoutVideoInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}