
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductVariations
 * 
 */
export type ProductVariations = $Result.DefaultSelection<Prisma.$ProductVariationsPayload>
/**
 * Model GoodsReceiptNote
 * 
 */
export type GoodsReceiptNote = $Result.DefaultSelection<Prisma.$GoodsReceiptNotePayload>
/**
 * Model GoodsReceiptNoteLine
 * 
 */
export type GoodsReceiptNoteLine = $Result.DefaultSelection<Prisma.$GoodsReceiptNoteLinePayload>
/**
 * Model GoodsIssueNote
 * 
 */
export type GoodsIssueNote = $Result.DefaultSelection<Prisma.$GoodsIssueNotePayload>
/**
 * Model GoodsIssueNoteLine
 * 
 */
export type GoodsIssueNoteLine = $Result.DefaultSelection<Prisma.$GoodsIssueNoteLinePayload>
/**
 * Model Purpose
 * 
 */
export type Purpose = $Result.DefaultSelection<Prisma.$PurposePayload>
/**
 * Model GoodsReturnNote
 * 
 */
export type GoodsReturnNote = $Result.DefaultSelection<Prisma.$GoodsReturnNotePayload>
/**
 * Model GoodsReturnNoteLine
 * 
 */
export type GoodsReturnNoteLine = $Result.DefaultSelection<Prisma.$GoodsReturnNoteLinePayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model Sequence
 * 
 */
export type Sequence = $Result.DefaultSelection<Prisma.$SequencePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productVariations`: Exposes CRUD operations for the **ProductVariations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariations
    * const productVariations = await prisma.productVariations.findMany()
    * ```
    */
  get productVariations(): Prisma.ProductVariationsDelegate<ExtArgs>;

  /**
   * `prisma.goodsReceiptNote`: Exposes CRUD operations for the **GoodsReceiptNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsReceiptNotes
    * const goodsReceiptNotes = await prisma.goodsReceiptNote.findMany()
    * ```
    */
  get goodsReceiptNote(): Prisma.GoodsReceiptNoteDelegate<ExtArgs>;

  /**
   * `prisma.goodsReceiptNoteLine`: Exposes CRUD operations for the **GoodsReceiptNoteLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsReceiptNoteLines
    * const goodsReceiptNoteLines = await prisma.goodsReceiptNoteLine.findMany()
    * ```
    */
  get goodsReceiptNoteLine(): Prisma.GoodsReceiptNoteLineDelegate<ExtArgs>;

  /**
   * `prisma.goodsIssueNote`: Exposes CRUD operations for the **GoodsIssueNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsIssueNotes
    * const goodsIssueNotes = await prisma.goodsIssueNote.findMany()
    * ```
    */
  get goodsIssueNote(): Prisma.GoodsIssueNoteDelegate<ExtArgs>;

  /**
   * `prisma.goodsIssueNoteLine`: Exposes CRUD operations for the **GoodsIssueNoteLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsIssueNoteLines
    * const goodsIssueNoteLines = await prisma.goodsIssueNoteLine.findMany()
    * ```
    */
  get goodsIssueNoteLine(): Prisma.GoodsIssueNoteLineDelegate<ExtArgs>;

  /**
   * `prisma.purpose`: Exposes CRUD operations for the **Purpose** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purposes
    * const purposes = await prisma.purpose.findMany()
    * ```
    */
  get purpose(): Prisma.PurposeDelegate<ExtArgs>;

  /**
   * `prisma.goodsReturnNote`: Exposes CRUD operations for the **GoodsReturnNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsReturnNotes
    * const goodsReturnNotes = await prisma.goodsReturnNote.findMany()
    * ```
    */
  get goodsReturnNote(): Prisma.GoodsReturnNoteDelegate<ExtArgs>;

  /**
   * `prisma.goodsReturnNoteLine`: Exposes CRUD operations for the **GoodsReturnNoteLine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GoodsReturnNoteLines
    * const goodsReturnNoteLines = await prisma.goodsReturnNoteLine.findMany()
    * ```
    */
  get goodsReturnNoteLine(): Prisma.GoodsReturnNoteLineDelegate<ExtArgs>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs>;

  /**
   * `prisma.sequence`: Exposes CRUD operations for the **Sequence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sequences
    * const sequences = await prisma.sequence.findMany()
    * ```
    */
  get sequence(): Prisma.SequenceDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.16.1
   * Query Engine version: 34ace0eb2704183d2c05b60b52fba5c43c13f303
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Category: 'Category',
    Department: 'Department',
    Section: 'Section',
    Product: 'Product',
    ProductVariations: 'ProductVariations',
    GoodsReceiptNote: 'GoodsReceiptNote',
    GoodsReceiptNoteLine: 'GoodsReceiptNoteLine',
    GoodsIssueNote: 'GoodsIssueNote',
    GoodsIssueNoteLine: 'GoodsIssueNoteLine',
    Purpose: 'Purpose',
    GoodsReturnNote: 'GoodsReturnNote',
    GoodsReturnNoteLine: 'GoodsReturnNoteLine',
    Stock: 'Stock',
    Sequence: 'Sequence'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "category" | "department" | "section" | "product" | "productVariations" | "goodsReceiptNote" | "goodsReceiptNoteLine" | "goodsIssueNote" | "goodsIssueNoteLine" | "purpose" | "goodsReturnNote" | "goodsReturnNoteLine" | "stock" | "sequence"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductVariations: {
        payload: Prisma.$ProductVariationsPayload<ExtArgs>
        fields: Prisma.ProductVariationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          findFirst: {
            args: Prisma.ProductVariationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          findMany: {
            args: Prisma.ProductVariationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>[]
          }
          create: {
            args: Prisma.ProductVariationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          createMany: {
            args: Prisma.ProductVariationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>[]
          }
          delete: {
            args: Prisma.ProductVariationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          update: {
            args: Prisma.ProductVariationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductVariationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariationsPayload>
          }
          aggregate: {
            args: Prisma.ProductVariationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariations>
          }
          groupBy: {
            args: Prisma.ProductVariationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariationsCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariationsCountAggregateOutputType> | number
          }
        }
      }
      GoodsReceiptNote: {
        payload: Prisma.$GoodsReceiptNotePayload<ExtArgs>
        fields: Prisma.GoodsReceiptNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsReceiptNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          findFirst: {
            args: Prisma.GoodsReceiptNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          findMany: {
            args: Prisma.GoodsReceiptNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>[]
          }
          create: {
            args: Prisma.GoodsReceiptNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          createMany: {
            args: Prisma.GoodsReceiptNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>[]
          }
          delete: {
            args: Prisma.GoodsReceiptNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          update: {
            args: Prisma.GoodsReceiptNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          deleteMany: {
            args: Prisma.GoodsReceiptNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsReceiptNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsReceiptNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNotePayload>
          }
          aggregate: {
            args: Prisma.GoodsReceiptNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsReceiptNote>
          }
          groupBy: {
            args: Prisma.GoodsReceiptNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsReceiptNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsReceiptNoteCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsReceiptNoteCountAggregateOutputType> | number
          }
        }
      }
      GoodsReceiptNoteLine: {
        payload: Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>
        fields: Prisma.GoodsReceiptNoteLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsReceiptNoteLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsReceiptNoteLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          findFirst: {
            args: Prisma.GoodsReceiptNoteLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsReceiptNoteLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          findMany: {
            args: Prisma.GoodsReceiptNoteLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>[]
          }
          create: {
            args: Prisma.GoodsReceiptNoteLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          createMany: {
            args: Prisma.GoodsReceiptNoteLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsReceiptNoteLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>[]
          }
          delete: {
            args: Prisma.GoodsReceiptNoteLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          update: {
            args: Prisma.GoodsReceiptNoteLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          deleteMany: {
            args: Prisma.GoodsReceiptNoteLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsReceiptNoteLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsReceiptNoteLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReceiptNoteLinePayload>
          }
          aggregate: {
            args: Prisma.GoodsReceiptNoteLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsReceiptNoteLine>
          }
          groupBy: {
            args: Prisma.GoodsReceiptNoteLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsReceiptNoteLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsReceiptNoteLineCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsReceiptNoteLineCountAggregateOutputType> | number
          }
        }
      }
      GoodsIssueNote: {
        payload: Prisma.$GoodsIssueNotePayload<ExtArgs>
        fields: Prisma.GoodsIssueNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsIssueNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsIssueNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          findFirst: {
            args: Prisma.GoodsIssueNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsIssueNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          findMany: {
            args: Prisma.GoodsIssueNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>[]
          }
          create: {
            args: Prisma.GoodsIssueNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          createMany: {
            args: Prisma.GoodsIssueNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsIssueNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>[]
          }
          delete: {
            args: Prisma.GoodsIssueNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          update: {
            args: Prisma.GoodsIssueNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          deleteMany: {
            args: Prisma.GoodsIssueNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsIssueNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsIssueNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNotePayload>
          }
          aggregate: {
            args: Prisma.GoodsIssueNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsIssueNote>
          }
          groupBy: {
            args: Prisma.GoodsIssueNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsIssueNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsIssueNoteCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsIssueNoteCountAggregateOutputType> | number
          }
        }
      }
      GoodsIssueNoteLine: {
        payload: Prisma.$GoodsIssueNoteLinePayload<ExtArgs>
        fields: Prisma.GoodsIssueNoteLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsIssueNoteLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsIssueNoteLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          findFirst: {
            args: Prisma.GoodsIssueNoteLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsIssueNoteLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          findMany: {
            args: Prisma.GoodsIssueNoteLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>[]
          }
          create: {
            args: Prisma.GoodsIssueNoteLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          createMany: {
            args: Prisma.GoodsIssueNoteLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsIssueNoteLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>[]
          }
          delete: {
            args: Prisma.GoodsIssueNoteLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          update: {
            args: Prisma.GoodsIssueNoteLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          deleteMany: {
            args: Prisma.GoodsIssueNoteLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsIssueNoteLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsIssueNoteLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsIssueNoteLinePayload>
          }
          aggregate: {
            args: Prisma.GoodsIssueNoteLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsIssueNoteLine>
          }
          groupBy: {
            args: Prisma.GoodsIssueNoteLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsIssueNoteLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsIssueNoteLineCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsIssueNoteLineCountAggregateOutputType> | number
          }
        }
      }
      Purpose: {
        payload: Prisma.$PurposePayload<ExtArgs>
        fields: Prisma.PurposeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurposeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurposeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          findFirst: {
            args: Prisma.PurposeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurposeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          findMany: {
            args: Prisma.PurposeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>[]
          }
          create: {
            args: Prisma.PurposeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          createMany: {
            args: Prisma.PurposeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurposeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>[]
          }
          delete: {
            args: Prisma.PurposeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          update: {
            args: Prisma.PurposeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          deleteMany: {
            args: Prisma.PurposeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurposeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurposeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurposePayload>
          }
          aggregate: {
            args: Prisma.PurposeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurpose>
          }
          groupBy: {
            args: Prisma.PurposeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurposeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurposeCountArgs<ExtArgs>
            result: $Utils.Optional<PurposeCountAggregateOutputType> | number
          }
        }
      }
      GoodsReturnNote: {
        payload: Prisma.$GoodsReturnNotePayload<ExtArgs>
        fields: Prisma.GoodsReturnNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsReturnNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsReturnNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          findFirst: {
            args: Prisma.GoodsReturnNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsReturnNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          findMany: {
            args: Prisma.GoodsReturnNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>[]
          }
          create: {
            args: Prisma.GoodsReturnNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          createMany: {
            args: Prisma.GoodsReturnNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsReturnNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>[]
          }
          delete: {
            args: Prisma.GoodsReturnNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          update: {
            args: Prisma.GoodsReturnNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          deleteMany: {
            args: Prisma.GoodsReturnNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsReturnNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsReturnNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNotePayload>
          }
          aggregate: {
            args: Prisma.GoodsReturnNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsReturnNote>
          }
          groupBy: {
            args: Prisma.GoodsReturnNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsReturnNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsReturnNoteCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsReturnNoteCountAggregateOutputType> | number
          }
        }
      }
      GoodsReturnNoteLine: {
        payload: Prisma.$GoodsReturnNoteLinePayload<ExtArgs>
        fields: Prisma.GoodsReturnNoteLineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsReturnNoteLineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsReturnNoteLineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          findFirst: {
            args: Prisma.GoodsReturnNoteLineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsReturnNoteLineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          findMany: {
            args: Prisma.GoodsReturnNoteLineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>[]
          }
          create: {
            args: Prisma.GoodsReturnNoteLineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          createMany: {
            args: Prisma.GoodsReturnNoteLineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoodsReturnNoteLineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>[]
          }
          delete: {
            args: Prisma.GoodsReturnNoteLineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          update: {
            args: Prisma.GoodsReturnNoteLineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          deleteMany: {
            args: Prisma.GoodsReturnNoteLineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsReturnNoteLineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsReturnNoteLineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsReturnNoteLinePayload>
          }
          aggregate: {
            args: Prisma.GoodsReturnNoteLineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoodsReturnNoteLine>
          }
          groupBy: {
            args: Prisma.GoodsReturnNoteLineGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsReturnNoteLineGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsReturnNoteLineCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsReturnNoteLineCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      Sequence: {
        payload: Prisma.$SequencePayload<ExtArgs>
        fields: Prisma.SequenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SequenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SequenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          findFirst: {
            args: Prisma.SequenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SequenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          findMany: {
            args: Prisma.SequenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>[]
          }
          create: {
            args: Prisma.SequenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          createMany: {
            args: Prisma.SequenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SequenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>[]
          }
          delete: {
            args: Prisma.SequenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          update: {
            args: Prisma.SequenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          deleteMany: {
            args: Prisma.SequenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SequenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SequenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SequencePayload>
          }
          aggregate: {
            args: Prisma.SequenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSequence>
          }
          groupBy: {
            args: Prisma.SequenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SequenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SequenceCountArgs<ExtArgs>
            result: $Utils.Optional<SequenceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    products: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | SectionCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variations: number
    receiptNoteLines: number
    issueNoteLines: number
    returnLines: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variations?: boolean | ProductCountOutputTypeCountVariationsArgs
    receiptNoteLines?: boolean | ProductCountOutputTypeCountReceiptNoteLinesArgs
    issueNoteLines?: boolean | ProductCountOutputTypeCountIssueNoteLinesArgs
    returnLines?: boolean | ProductCountOutputTypeCountReturnLinesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariationsWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReceiptNoteLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReceiptNoteLineWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountIssueNoteLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsIssueNoteLineWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReturnLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReturnNoteLineWhereInput
  }


  /**
   * Count Type GoodsReceiptNoteCountOutputType
   */

  export type GoodsReceiptNoteCountOutputType = {
    lines: number
  }

  export type GoodsReceiptNoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | GoodsReceiptNoteCountOutputTypeCountLinesArgs
  }

  // Custom InputTypes
  /**
   * GoodsReceiptNoteCountOutputType without action
   */
  export type GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteCountOutputType
     */
    select?: GoodsReceiptNoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoodsReceiptNoteCountOutputType without action
   */
  export type GoodsReceiptNoteCountOutputTypeCountLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReceiptNoteLineWhereInput
  }


  /**
   * Count Type GoodsIssueNoteCountOutputType
   */

  export type GoodsIssueNoteCountOutputType = {
    lines: number
    goodsReturnNotes: number
  }

  export type GoodsIssueNoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | GoodsIssueNoteCountOutputTypeCountLinesArgs
    goodsReturnNotes?: boolean | GoodsIssueNoteCountOutputTypeCountGoodsReturnNotesArgs
  }

  // Custom InputTypes
  /**
   * GoodsIssueNoteCountOutputType without action
   */
  export type GoodsIssueNoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteCountOutputType
     */
    select?: GoodsIssueNoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoodsIssueNoteCountOutputType without action
   */
  export type GoodsIssueNoteCountOutputTypeCountLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsIssueNoteLineWhereInput
  }

  /**
   * GoodsIssueNoteCountOutputType without action
   */
  export type GoodsIssueNoteCountOutputTypeCountGoodsReturnNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReturnNoteWhereInput
  }


  /**
   * Count Type GoodsReturnNoteCountOutputType
   */

  export type GoodsReturnNoteCountOutputType = {
    lines: number
  }

  export type GoodsReturnNoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | GoodsReturnNoteCountOutputTypeCountLinesArgs
  }

  // Custom InputTypes
  /**
   * GoodsReturnNoteCountOutputType without action
   */
  export type GoodsReturnNoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteCountOutputType
     */
    select?: GoodsReturnNoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoodsReturnNoteCountOutputType without action
   */
  export type GoodsReturnNoteCountOutputTypeCountLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReturnNoteLineWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    categoryId: string | null
    name: string | null
    description: string | null
    variations: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    categoryId: string | null
    name: string | null
    description: string | null
    variations: string | null
  }

  export type CategoryCountAggregateOutputType = {
    categoryId: number
    name: number
    description: number
    variations: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    categoryId?: true
    name?: true
    description?: true
    variations?: true
  }

  export type CategoryMaxAggregateInputType = {
    categoryId?: true
    name?: true
    description?: true
    variations?: true
  }

  export type CategoryCountAggregateInputType = {
    categoryId?: true
    name?: true
    description?: true
    variations?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    categoryId: string
    name: string
    description: string | null
    variations: string | null
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    name?: boolean
    description?: boolean
    variations?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    categoryId?: boolean
    name?: boolean
    description?: boolean
    variations?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    categoryId?: boolean
    name?: boolean
    description?: boolean
    variations?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      categoryId: string
      name: string
      description: string | null
      variations: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `categoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.findMany({ select: { categoryId: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `categoryId`
     * const categoryWithCategoryIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { categoryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly categoryId: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly variations: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    departmentId: string | null
    name: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    departmentId: string | null
    name: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    departmentId: number
    name: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    departmentId?: true
    name?: true
  }

  export type DepartmentMaxAggregateInputType = {
    departmentId?: true
    name?: true
  }

  export type DepartmentCountAggregateInputType = {
    departmentId?: true
    name?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    departmentId: string
    name: string
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    departmentId?: boolean
    name?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    departmentId?: boolean
    name?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    departmentId?: boolean
    name?: boolean
  }


  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      departmentId: string
      name: string
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `departmentId`
     * const departmentWithDepartmentIdOnly = await prisma.department.findMany({ select: { departmentId: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `departmentId`
     * const departmentWithDepartmentIdOnly = await prisma.department.createManyAndReturn({ 
     *   select: { departmentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Department model
   */ 
  interface DepartmentFieldRefs {
    readonly departmentId: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionMinAggregateOutputType = {
    sectionId: string | null
    name: string | null
  }

  export type SectionMaxAggregateOutputType = {
    sectionId: string | null
    name: string | null
  }

  export type SectionCountAggregateOutputType = {
    sectionId: number
    name: number
    _all: number
  }


  export type SectionMinAggregateInputType = {
    sectionId?: true
    name?: true
  }

  export type SectionMaxAggregateInputType = {
    sectionId?: true
    name?: true
  }

  export type SectionCountAggregateInputType = {
    sectionId?: true
    name?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    sectionId: string
    name: string
    _count: SectionCountAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sectionId?: boolean
    name?: boolean
    products?: boolean | Section$productsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>

  export type SectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sectionId?: boolean
    name?: boolean
  }, ExtArgs["result"]["section"]>

  export type SectionSelectScalar = {
    sectionId?: boolean
    name?: boolean
  }

  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Section$productsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      sectionId: string
      name: string
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `sectionId`
     * const sectionWithSectionIdOnly = await prisma.section.findMany({ select: { sectionId: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sections and returns the data saved in the database.
     * @param {SectionCreateManyAndReturnArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sections and only return the `sectionId`
     * const sectionWithSectionIdOnly = await prisma.section.createManyAndReturn({ 
     *   select: { sectionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SectionCreateManyAndReturnArgs>(args?: SelectSubset<T, SectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
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
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Section$productsArgs<ExtArgs> = {}>(args?: Subset<T, Section$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Section model
   */ 
  interface SectionFieldRefs {
    readonly sectionId: FieldRef<"Section", 'String'>
    readonly name: FieldRef<"Section", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section createManyAndReturn
   */
  export type SectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
  }

  /**
   * Section.products
   */
  export type Section$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    productId: string | null
    name: string | null
    price: number | null
    categoryId: string | null
    sectionId: string | null
    tags: string | null
    fulltext: string | null
  }

  export type ProductMaxAggregateOutputType = {
    productId: string | null
    name: string | null
    price: number | null
    categoryId: string | null
    sectionId: string | null
    tags: string | null
    fulltext: string | null
  }

  export type ProductCountAggregateOutputType = {
    productId: number
    name: number
    price: number
    categoryId: number
    sectionId: number
    tags: number
    fulltext: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    productId?: true
    name?: true
    price?: true
    categoryId?: true
    sectionId?: true
    tags?: true
    fulltext?: true
  }

  export type ProductMaxAggregateInputType = {
    productId?: true
    name?: true
    price?: true
    categoryId?: true
    sectionId?: true
    tags?: true
    fulltext?: true
  }

  export type ProductCountAggregateInputType = {
    productId?: true
    name?: true
    price?: true
    categoryId?: true
    sectionId?: true
    tags?: true
    fulltext?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    productId: string
    name: string
    price: number
    categoryId: string | null
    sectionId: string | null
    tags: string | null
    fulltext: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    sectionId?: boolean
    tags?: boolean
    fulltext?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    section?: boolean | Product$sectionArgs<ExtArgs>
    variations?: boolean | Product$variationsArgs<ExtArgs>
    receiptNoteLines?: boolean | Product$receiptNoteLinesArgs<ExtArgs>
    issueNoteLines?: boolean | Product$issueNoteLinesArgs<ExtArgs>
    returnLines?: boolean | Product$returnLinesArgs<ExtArgs>
    stock?: boolean | Product$stockArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    productId?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    sectionId?: boolean
    tags?: boolean
    fulltext?: boolean
    category?: boolean | Product$categoryArgs<ExtArgs>
    section?: boolean | Product$sectionArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    productId?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    sectionId?: boolean
    tags?: boolean
    fulltext?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    section?: boolean | Product$sectionArgs<ExtArgs>
    variations?: boolean | Product$variationsArgs<ExtArgs>
    receiptNoteLines?: boolean | Product$receiptNoteLinesArgs<ExtArgs>
    issueNoteLines?: boolean | Product$issueNoteLinesArgs<ExtArgs>
    returnLines?: boolean | Product$returnLinesArgs<ExtArgs>
    stock?: boolean | Product$stockArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Product$categoryArgs<ExtArgs>
    section?: boolean | Product$sectionArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      section: Prisma.$SectionPayload<ExtArgs> | null
      variations: Prisma.$ProductVariationsPayload<ExtArgs>[]
      receiptNoteLines: Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>[]
      issueNoteLines: Prisma.$GoodsIssueNoteLinePayload<ExtArgs>[]
      returnLines: Prisma.$GoodsReturnNoteLinePayload<ExtArgs>[]
      stock: Prisma.$StockPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      productId: string
      name: string
      price: number
      categoryId: string | null
      sectionId: string | null
      tags: string | null
      fulltext: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `productId`
     * const productWithProductIdOnly = await prisma.product.findMany({ select: { productId: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `productId`
     * const productWithProductIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Product$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    section<T extends Product$sectionArgs<ExtArgs> = {}>(args?: Subset<T, Product$sectionArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    variations<T extends Product$variationsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findMany"> | Null>
    receiptNoteLines<T extends Product$receiptNoteLinesArgs<ExtArgs> = {}>(args?: Subset<T, Product$receiptNoteLinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
    issueNoteLines<T extends Product$issueNoteLinesArgs<ExtArgs> = {}>(args?: Subset<T, Product$issueNoteLinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
    returnLines<T extends Product$returnLinesArgs<ExtArgs> = {}>(args?: Subset<T, Product$returnLinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
    stock<T extends Product$stockArgs<ExtArgs> = {}>(args?: Subset<T, Product$stockArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly productId: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly categoryId: FieldRef<"Product", 'String'>
    readonly sectionId: FieldRef<"Product", 'String'>
    readonly tags: FieldRef<"Product", 'String'>
    readonly fulltext: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.category
   */
  export type Product$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Product.section
   */
  export type Product$sectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
  }

  /**
   * Product.variations
   */
  export type Product$variationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    where?: ProductVariationsWhereInput
    orderBy?: ProductVariationsOrderByWithRelationInput | ProductVariationsOrderByWithRelationInput[]
    cursor?: ProductVariationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariationsScalarFieldEnum | ProductVariationsScalarFieldEnum[]
  }

  /**
   * Product.receiptNoteLines
   */
  export type Product$receiptNoteLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    where?: GoodsReceiptNoteLineWhereInput
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsReceiptNoteLineScalarFieldEnum | GoodsReceiptNoteLineScalarFieldEnum[]
  }

  /**
   * Product.issueNoteLines
   */
  export type Product$issueNoteLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    where?: GoodsIssueNoteLineWhereInput
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsIssueNoteLineScalarFieldEnum | GoodsIssueNoteLineScalarFieldEnum[]
  }

  /**
   * Product.returnLines
   */
  export type Product$returnLinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    where?: GoodsReturnNoteLineWhereInput
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsReturnNoteLineScalarFieldEnum | GoodsReturnNoteLineScalarFieldEnum[]
  }

  /**
   * Product.stock
   */
  export type Product$stockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariations
   */

  export type AggregateProductVariations = {
    _count: ProductVariationsCountAggregateOutputType | null
    _avg: ProductVariationsAvgAggregateOutputType | null
    _sum: ProductVariationsSumAggregateOutputType | null
    _min: ProductVariationsMinAggregateOutputType | null
    _max: ProductVariationsMaxAggregateOutputType | null
  }

  export type ProductVariationsAvgAggregateOutputType = {
    id: number | null
  }

  export type ProductVariationsSumAggregateOutputType = {
    id: number | null
  }

  export type ProductVariationsMinAggregateOutputType = {
    id: number | null
    variationId: string | null
    value: string | null
    productId: string | null
  }

  export type ProductVariationsMaxAggregateOutputType = {
    id: number | null
    variationId: string | null
    value: string | null
    productId: string | null
  }

  export type ProductVariationsCountAggregateOutputType = {
    id: number
    variationId: number
    value: number
    productId: number
    _all: number
  }


  export type ProductVariationsAvgAggregateInputType = {
    id?: true
  }

  export type ProductVariationsSumAggregateInputType = {
    id?: true
  }

  export type ProductVariationsMinAggregateInputType = {
    id?: true
    variationId?: true
    value?: true
    productId?: true
  }

  export type ProductVariationsMaxAggregateInputType = {
    id?: true
    variationId?: true
    value?: true
    productId?: true
  }

  export type ProductVariationsCountAggregateInputType = {
    id?: true
    variationId?: true
    value?: true
    productId?: true
    _all?: true
  }

  export type ProductVariationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariations to aggregate.
     */
    where?: ProductVariationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariations to fetch.
     */
    orderBy?: ProductVariationsOrderByWithRelationInput | ProductVariationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariations
    **/
    _count?: true | ProductVariationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductVariationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductVariationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariationsMaxAggregateInputType
  }

  export type GetProductVariationsAggregateType<T extends ProductVariationsAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariations[P]>
      : GetScalarType<T[P], AggregateProductVariations[P]>
  }




  export type ProductVariationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariationsWhereInput
    orderBy?: ProductVariationsOrderByWithAggregationInput | ProductVariationsOrderByWithAggregationInput[]
    by: ProductVariationsScalarFieldEnum[] | ProductVariationsScalarFieldEnum
    having?: ProductVariationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariationsCountAggregateInputType | true
    _avg?: ProductVariationsAvgAggregateInputType
    _sum?: ProductVariationsSumAggregateInputType
    _min?: ProductVariationsMinAggregateInputType
    _max?: ProductVariationsMaxAggregateInputType
  }

  export type ProductVariationsGroupByOutputType = {
    id: number
    variationId: string
    value: string
    productId: string
    _count: ProductVariationsCountAggregateOutputType | null
    _avg: ProductVariationsAvgAggregateOutputType | null
    _sum: ProductVariationsSumAggregateOutputType | null
    _min: ProductVariationsMinAggregateOutputType | null
    _max: ProductVariationsMaxAggregateOutputType | null
  }

  type GetProductVariationsGroupByPayload<T extends ProductVariationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariationsGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariationsGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variationId?: boolean
    value?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariations"]>

  export type ProductVariationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    variationId?: boolean
    value?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariations"]>

  export type ProductVariationsSelectScalar = {
    id?: boolean
    variationId?: boolean
    value?: boolean
    productId?: boolean
  }

  export type ProductVariationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductVariationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductVariationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariations"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      variationId: string
      value: string
      productId: string
    }, ExtArgs["result"]["productVariations"]>
    composites: {}
  }

  type ProductVariationsGetPayload<S extends boolean | null | undefined | ProductVariationsDefaultArgs> = $Result.GetResult<Prisma.$ProductVariationsPayload, S>

  type ProductVariationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductVariationsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductVariationsCountAggregateInputType | true
    }

  export interface ProductVariationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariations'], meta: { name: 'ProductVariations' } }
    /**
     * Find zero or one ProductVariations that matches the filter.
     * @param {ProductVariationsFindUniqueArgs} args - Arguments to find a ProductVariations
     * @example
     * // Get one ProductVariations
     * const productVariations = await prisma.productVariations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariationsFindUniqueArgs>(args: SelectSubset<T, ProductVariationsFindUniqueArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProductVariations that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductVariationsFindUniqueOrThrowArgs} args - Arguments to find a ProductVariations
     * @example
     * // Get one ProductVariations
     * const productVariations = await prisma.productVariations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariationsFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProductVariations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsFindFirstArgs} args - Arguments to find a ProductVariations
     * @example
     * // Get one ProductVariations
     * const productVariations = await prisma.productVariations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariationsFindFirstArgs>(args?: SelectSubset<T, ProductVariationsFindFirstArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProductVariations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsFindFirstOrThrowArgs} args - Arguments to find a ProductVariations
     * @example
     * // Get one ProductVariations
     * const productVariations = await prisma.productVariations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariationsFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProductVariations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariations
     * const productVariations = await prisma.productVariations.findMany()
     * 
     * // Get first 10 ProductVariations
     * const productVariations = await prisma.productVariations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariationsWithIdOnly = await prisma.productVariations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariationsFindManyArgs>(args?: SelectSubset<T, ProductVariationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProductVariations.
     * @param {ProductVariationsCreateArgs} args - Arguments to create a ProductVariations.
     * @example
     * // Create one ProductVariations
     * const ProductVariations = await prisma.productVariations.create({
     *   data: {
     *     // ... data to create a ProductVariations
     *   }
     * })
     * 
     */
    create<T extends ProductVariationsCreateArgs>(args: SelectSubset<T, ProductVariationsCreateArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProductVariations.
     * @param {ProductVariationsCreateManyArgs} args - Arguments to create many ProductVariations.
     * @example
     * // Create many ProductVariations
     * const productVariations = await prisma.productVariations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariationsCreateManyArgs>(args?: SelectSubset<T, ProductVariationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariations and returns the data saved in the database.
     * @param {ProductVariationsCreateManyAndReturnArgs} args - Arguments to create many ProductVariations.
     * @example
     * // Create many ProductVariations
     * const productVariations = await prisma.productVariations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariations and only return the `id`
     * const productVariationsWithIdOnly = await prisma.productVariations.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariationsCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProductVariations.
     * @param {ProductVariationsDeleteArgs} args - Arguments to delete one ProductVariations.
     * @example
     * // Delete one ProductVariations
     * const ProductVariations = await prisma.productVariations.delete({
     *   where: {
     *     // ... filter to delete one ProductVariations
     *   }
     * })
     * 
     */
    delete<T extends ProductVariationsDeleteArgs>(args: SelectSubset<T, ProductVariationsDeleteArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProductVariations.
     * @param {ProductVariationsUpdateArgs} args - Arguments to update one ProductVariations.
     * @example
     * // Update one ProductVariations
     * const productVariations = await prisma.productVariations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariationsUpdateArgs>(args: SelectSubset<T, ProductVariationsUpdateArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProductVariations.
     * @param {ProductVariationsDeleteManyArgs} args - Arguments to filter ProductVariations to delete.
     * @example
     * // Delete a few ProductVariations
     * const { count } = await prisma.productVariations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariationsDeleteManyArgs>(args?: SelectSubset<T, ProductVariationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariations
     * const productVariations = await prisma.productVariations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariationsUpdateManyArgs>(args: SelectSubset<T, ProductVariationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductVariations.
     * @param {ProductVariationsUpsertArgs} args - Arguments to update or create a ProductVariations.
     * @example
     * // Update or create a ProductVariations
     * const productVariations = await prisma.productVariations.upsert({
     *   create: {
     *     // ... data to create a ProductVariations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariations we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariationsUpsertArgs>(args: SelectSubset<T, ProductVariationsUpsertArgs<ExtArgs>>): Prisma__ProductVariationsClient<$Result.GetResult<Prisma.$ProductVariationsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProductVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsCountArgs} args - Arguments to filter ProductVariations to count.
     * @example
     * // Count the number of ProductVariations
     * const count = await prisma.productVariations.count({
     *   where: {
     *     // ... the filter for the ProductVariations we want to count
     *   }
     * })
    **/
    count<T extends ProductVariationsCountArgs>(
      args?: Subset<T, ProductVariationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductVariationsAggregateArgs>(args: Subset<T, ProductVariationsAggregateArgs>): Prisma.PrismaPromise<GetProductVariationsAggregateType<T>>

    /**
     * Group by ProductVariations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariationsGroupByArgs} args - Group by arguments.
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
      T extends ProductVariationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariationsGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductVariationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariations model
   */
  readonly fields: ProductVariationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ProductVariations model
   */ 
  interface ProductVariationsFieldRefs {
    readonly id: FieldRef<"ProductVariations", 'Int'>
    readonly variationId: FieldRef<"ProductVariations", 'String'>
    readonly value: FieldRef<"ProductVariations", 'String'>
    readonly productId: FieldRef<"ProductVariations", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariations findUnique
   */
  export type ProductVariationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariations to fetch.
     */
    where: ProductVariationsWhereUniqueInput
  }

  /**
   * ProductVariations findUniqueOrThrow
   */
  export type ProductVariationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariations to fetch.
     */
    where: ProductVariationsWhereUniqueInput
  }

  /**
   * ProductVariations findFirst
   */
  export type ProductVariationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariations to fetch.
     */
    where?: ProductVariationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariations to fetch.
     */
    orderBy?: ProductVariationsOrderByWithRelationInput | ProductVariationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariations.
     */
    cursor?: ProductVariationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariations.
     */
    distinct?: ProductVariationsScalarFieldEnum | ProductVariationsScalarFieldEnum[]
  }

  /**
   * ProductVariations findFirstOrThrow
   */
  export type ProductVariationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariations to fetch.
     */
    where?: ProductVariationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariations to fetch.
     */
    orderBy?: ProductVariationsOrderByWithRelationInput | ProductVariationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariations.
     */
    cursor?: ProductVariationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariations.
     */
    distinct?: ProductVariationsScalarFieldEnum | ProductVariationsScalarFieldEnum[]
  }

  /**
   * ProductVariations findMany
   */
  export type ProductVariationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariations to fetch.
     */
    where?: ProductVariationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariations to fetch.
     */
    orderBy?: ProductVariationsOrderByWithRelationInput | ProductVariationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariations.
     */
    cursor?: ProductVariationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariations.
     */
    skip?: number
    distinct?: ProductVariationsScalarFieldEnum | ProductVariationsScalarFieldEnum[]
  }

  /**
   * ProductVariations create
   */
  export type ProductVariationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariations.
     */
    data: XOR<ProductVariationsCreateInput, ProductVariationsUncheckedCreateInput>
  }

  /**
   * ProductVariations createMany
   */
  export type ProductVariationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariations.
     */
    data: ProductVariationsCreateManyInput | ProductVariationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductVariations createManyAndReturn
   */
  export type ProductVariationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProductVariations.
     */
    data: ProductVariationsCreateManyInput | ProductVariationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariations update
   */
  export type ProductVariationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariations.
     */
    data: XOR<ProductVariationsUpdateInput, ProductVariationsUncheckedUpdateInput>
    /**
     * Choose, which ProductVariations to update.
     */
    where: ProductVariationsWhereUniqueInput
  }

  /**
   * ProductVariations updateMany
   */
  export type ProductVariationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariations.
     */
    data: XOR<ProductVariationsUpdateManyMutationInput, ProductVariationsUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariations to update
     */
    where?: ProductVariationsWhereInput
  }

  /**
   * ProductVariations upsert
   */
  export type ProductVariationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariations to update in case it exists.
     */
    where: ProductVariationsWhereUniqueInput
    /**
     * In case the ProductVariations found by the `where` argument doesn't exist, create a new ProductVariations with this data.
     */
    create: XOR<ProductVariationsCreateInput, ProductVariationsUncheckedCreateInput>
    /**
     * In case the ProductVariations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariationsUpdateInput, ProductVariationsUncheckedUpdateInput>
  }

  /**
   * ProductVariations delete
   */
  export type ProductVariationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
    /**
     * Filter which ProductVariations to delete.
     */
    where: ProductVariationsWhereUniqueInput
  }

  /**
   * ProductVariations deleteMany
   */
  export type ProductVariationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariations to delete
     */
    where?: ProductVariationsWhereInput
  }

  /**
   * ProductVariations without action
   */
  export type ProductVariationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariations
     */
    select?: ProductVariationsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariationsInclude<ExtArgs> | null
  }


  /**
   * Model GoodsReceiptNote
   */

  export type AggregateGoodsReceiptNote = {
    _count: GoodsReceiptNoteCountAggregateOutputType | null
    _min: GoodsReceiptNoteMinAggregateOutputType | null
    _max: GoodsReceiptNoteMaxAggregateOutputType | null
  }

  export type GoodsReceiptNoteMinAggregateOutputType = {
    noteId: string | null
    entryDate: Date | null
  }

  export type GoodsReceiptNoteMaxAggregateOutputType = {
    noteId: string | null
    entryDate: Date | null
  }

  export type GoodsReceiptNoteCountAggregateOutputType = {
    noteId: number
    entryDate: number
    _all: number
  }


  export type GoodsReceiptNoteMinAggregateInputType = {
    noteId?: true
    entryDate?: true
  }

  export type GoodsReceiptNoteMaxAggregateInputType = {
    noteId?: true
    entryDate?: true
  }

  export type GoodsReceiptNoteCountAggregateInputType = {
    noteId?: true
    entryDate?: true
    _all?: true
  }

  export type GoodsReceiptNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReceiptNote to aggregate.
     */
    where?: GoodsReceiptNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNotes to fetch.
     */
    orderBy?: GoodsReceiptNoteOrderByWithRelationInput | GoodsReceiptNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsReceiptNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsReceiptNotes
    **/
    _count?: true | GoodsReceiptNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsReceiptNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsReceiptNoteMaxAggregateInputType
  }

  export type GetGoodsReceiptNoteAggregateType<T extends GoodsReceiptNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsReceiptNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsReceiptNote[P]>
      : GetScalarType<T[P], AggregateGoodsReceiptNote[P]>
  }




  export type GoodsReceiptNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReceiptNoteWhereInput
    orderBy?: GoodsReceiptNoteOrderByWithAggregationInput | GoodsReceiptNoteOrderByWithAggregationInput[]
    by: GoodsReceiptNoteScalarFieldEnum[] | GoodsReceiptNoteScalarFieldEnum
    having?: GoodsReceiptNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsReceiptNoteCountAggregateInputType | true
    _min?: GoodsReceiptNoteMinAggregateInputType
    _max?: GoodsReceiptNoteMaxAggregateInputType
  }

  export type GoodsReceiptNoteGroupByOutputType = {
    noteId: string
    entryDate: Date
    _count: GoodsReceiptNoteCountAggregateOutputType | null
    _min: GoodsReceiptNoteMinAggregateOutputType | null
    _max: GoodsReceiptNoteMaxAggregateOutputType | null
  }

  type GetGoodsReceiptNoteGroupByPayload<T extends GoodsReceiptNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsReceiptNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsReceiptNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsReceiptNoteGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsReceiptNoteGroupByOutputType[P]>
        }
      >
    >


  export type GoodsReceiptNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    entryDate?: boolean
    lines?: boolean | GoodsReceiptNote$linesArgs<ExtArgs>
    _count?: boolean | GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReceiptNote"]>

  export type GoodsReceiptNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    entryDate?: boolean
  }, ExtArgs["result"]["goodsReceiptNote"]>

  export type GoodsReceiptNoteSelectScalar = {
    noteId?: boolean
    entryDate?: boolean
  }

  export type GoodsReceiptNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lines?: boolean | GoodsReceiptNote$linesArgs<ExtArgs>
    _count?: boolean | GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoodsReceiptNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GoodsReceiptNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsReceiptNote"
    objects: {
      lines: Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      entryDate: Date
    }, ExtArgs["result"]["goodsReceiptNote"]>
    composites: {}
  }

  type GoodsReceiptNoteGetPayload<S extends boolean | null | undefined | GoodsReceiptNoteDefaultArgs> = $Result.GetResult<Prisma.$GoodsReceiptNotePayload, S>

  type GoodsReceiptNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsReceiptNoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsReceiptNoteCountAggregateInputType | true
    }

  export interface GoodsReceiptNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsReceiptNote'], meta: { name: 'GoodsReceiptNote' } }
    /**
     * Find zero or one GoodsReceiptNote that matches the filter.
     * @param {GoodsReceiptNoteFindUniqueArgs} args - Arguments to find a GoodsReceiptNote
     * @example
     * // Get one GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsReceiptNoteFindUniqueArgs>(args: SelectSubset<T, GoodsReceiptNoteFindUniqueArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsReceiptNote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsReceiptNoteFindUniqueOrThrowArgs} args - Arguments to find a GoodsReceiptNote
     * @example
     * // Get one GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsReceiptNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsReceiptNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteFindFirstArgs} args - Arguments to find a GoodsReceiptNote
     * @example
     * // Get one GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsReceiptNoteFindFirstArgs>(args?: SelectSubset<T, GoodsReceiptNoteFindFirstArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsReceiptNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteFindFirstOrThrowArgs} args - Arguments to find a GoodsReceiptNote
     * @example
     * // Get one GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsReceiptNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsReceiptNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsReceiptNotes
     * const goodsReceiptNotes = await prisma.goodsReceiptNote.findMany()
     * 
     * // Get first 10 GoodsReceiptNotes
     * const goodsReceiptNotes = await prisma.goodsReceiptNote.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsReceiptNoteWithNoteIdOnly = await prisma.goodsReceiptNote.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsReceiptNoteFindManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsReceiptNote.
     * @param {GoodsReceiptNoteCreateArgs} args - Arguments to create a GoodsReceiptNote.
     * @example
     * // Create one GoodsReceiptNote
     * const GoodsReceiptNote = await prisma.goodsReceiptNote.create({
     *   data: {
     *     // ... data to create a GoodsReceiptNote
     *   }
     * })
     * 
     */
    create<T extends GoodsReceiptNoteCreateArgs>(args: SelectSubset<T, GoodsReceiptNoteCreateArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsReceiptNotes.
     * @param {GoodsReceiptNoteCreateManyArgs} args - Arguments to create many GoodsReceiptNotes.
     * @example
     * // Create many GoodsReceiptNotes
     * const goodsReceiptNote = await prisma.goodsReceiptNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsReceiptNoteCreateManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsReceiptNotes and returns the data saved in the database.
     * @param {GoodsReceiptNoteCreateManyAndReturnArgs} args - Arguments to create many GoodsReceiptNotes.
     * @example
     * // Create many GoodsReceiptNotes
     * const goodsReceiptNote = await prisma.goodsReceiptNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsReceiptNotes and only return the `noteId`
     * const goodsReceiptNoteWithNoteIdOnly = await prisma.goodsReceiptNote.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsReceiptNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsReceiptNote.
     * @param {GoodsReceiptNoteDeleteArgs} args - Arguments to delete one GoodsReceiptNote.
     * @example
     * // Delete one GoodsReceiptNote
     * const GoodsReceiptNote = await prisma.goodsReceiptNote.delete({
     *   where: {
     *     // ... filter to delete one GoodsReceiptNote
     *   }
     * })
     * 
     */
    delete<T extends GoodsReceiptNoteDeleteArgs>(args: SelectSubset<T, GoodsReceiptNoteDeleteArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsReceiptNote.
     * @param {GoodsReceiptNoteUpdateArgs} args - Arguments to update one GoodsReceiptNote.
     * @example
     * // Update one GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsReceiptNoteUpdateArgs>(args: SelectSubset<T, GoodsReceiptNoteUpdateArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsReceiptNotes.
     * @param {GoodsReceiptNoteDeleteManyArgs} args - Arguments to filter GoodsReceiptNotes to delete.
     * @example
     * // Delete a few GoodsReceiptNotes
     * const { count } = await prisma.goodsReceiptNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsReceiptNoteDeleteManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsReceiptNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsReceiptNotes
     * const goodsReceiptNote = await prisma.goodsReceiptNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsReceiptNoteUpdateManyArgs>(args: SelectSubset<T, GoodsReceiptNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsReceiptNote.
     * @param {GoodsReceiptNoteUpsertArgs} args - Arguments to update or create a GoodsReceiptNote.
     * @example
     * // Update or create a GoodsReceiptNote
     * const goodsReceiptNote = await prisma.goodsReceiptNote.upsert({
     *   create: {
     *     // ... data to create a GoodsReceiptNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsReceiptNote we want to update
     *   }
     * })
     */
    upsert<T extends GoodsReceiptNoteUpsertArgs>(args: SelectSubset<T, GoodsReceiptNoteUpsertArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsReceiptNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteCountArgs} args - Arguments to filter GoodsReceiptNotes to count.
     * @example
     * // Count the number of GoodsReceiptNotes
     * const count = await prisma.goodsReceiptNote.count({
     *   where: {
     *     // ... the filter for the GoodsReceiptNotes we want to count
     *   }
     * })
    **/
    count<T extends GoodsReceiptNoteCountArgs>(
      args?: Subset<T, GoodsReceiptNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsReceiptNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsReceiptNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsReceiptNoteAggregateArgs>(args: Subset<T, GoodsReceiptNoteAggregateArgs>): Prisma.PrismaPromise<GetGoodsReceiptNoteAggregateType<T>>

    /**
     * Group by GoodsReceiptNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteGroupByArgs} args - Group by arguments.
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
      T extends GoodsReceiptNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsReceiptNoteGroupByArgs['orderBy'] }
        : { orderBy?: GoodsReceiptNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsReceiptNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReceiptNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsReceiptNote model
   */
  readonly fields: GoodsReceiptNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsReceiptNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsReceiptNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lines<T extends GoodsReceiptNote$linesArgs<ExtArgs> = {}>(args?: Subset<T, GoodsReceiptNote$linesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the GoodsReceiptNote model
   */ 
  interface GoodsReceiptNoteFieldRefs {
    readonly noteId: FieldRef<"GoodsReceiptNote", 'String'>
    readonly entryDate: FieldRef<"GoodsReceiptNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GoodsReceiptNote findUnique
   */
  export type GoodsReceiptNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNote to fetch.
     */
    where: GoodsReceiptNoteWhereUniqueInput
  }

  /**
   * GoodsReceiptNote findUniqueOrThrow
   */
  export type GoodsReceiptNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNote to fetch.
     */
    where: GoodsReceiptNoteWhereUniqueInput
  }

  /**
   * GoodsReceiptNote findFirst
   */
  export type GoodsReceiptNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNote to fetch.
     */
    where?: GoodsReceiptNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNotes to fetch.
     */
    orderBy?: GoodsReceiptNoteOrderByWithRelationInput | GoodsReceiptNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReceiptNotes.
     */
    cursor?: GoodsReceiptNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReceiptNotes.
     */
    distinct?: GoodsReceiptNoteScalarFieldEnum | GoodsReceiptNoteScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNote findFirstOrThrow
   */
  export type GoodsReceiptNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNote to fetch.
     */
    where?: GoodsReceiptNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNotes to fetch.
     */
    orderBy?: GoodsReceiptNoteOrderByWithRelationInput | GoodsReceiptNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReceiptNotes.
     */
    cursor?: GoodsReceiptNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReceiptNotes.
     */
    distinct?: GoodsReceiptNoteScalarFieldEnum | GoodsReceiptNoteScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNote findMany
   */
  export type GoodsReceiptNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNotes to fetch.
     */
    where?: GoodsReceiptNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNotes to fetch.
     */
    orderBy?: GoodsReceiptNoteOrderByWithRelationInput | GoodsReceiptNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsReceiptNotes.
     */
    cursor?: GoodsReceiptNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNotes.
     */
    skip?: number
    distinct?: GoodsReceiptNoteScalarFieldEnum | GoodsReceiptNoteScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNote create
   */
  export type GoodsReceiptNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsReceiptNote.
     */
    data: XOR<GoodsReceiptNoteCreateInput, GoodsReceiptNoteUncheckedCreateInput>
  }

  /**
   * GoodsReceiptNote createMany
   */
  export type GoodsReceiptNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsReceiptNotes.
     */
    data: GoodsReceiptNoteCreateManyInput | GoodsReceiptNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsReceiptNote createManyAndReturn
   */
  export type GoodsReceiptNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsReceiptNotes.
     */
    data: GoodsReceiptNoteCreateManyInput | GoodsReceiptNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsReceiptNote update
   */
  export type GoodsReceiptNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsReceiptNote.
     */
    data: XOR<GoodsReceiptNoteUpdateInput, GoodsReceiptNoteUncheckedUpdateInput>
    /**
     * Choose, which GoodsReceiptNote to update.
     */
    where: GoodsReceiptNoteWhereUniqueInput
  }

  /**
   * GoodsReceiptNote updateMany
   */
  export type GoodsReceiptNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsReceiptNotes.
     */
    data: XOR<GoodsReceiptNoteUpdateManyMutationInput, GoodsReceiptNoteUncheckedUpdateManyInput>
    /**
     * Filter which GoodsReceiptNotes to update
     */
    where?: GoodsReceiptNoteWhereInput
  }

  /**
   * GoodsReceiptNote upsert
   */
  export type GoodsReceiptNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsReceiptNote to update in case it exists.
     */
    where: GoodsReceiptNoteWhereUniqueInput
    /**
     * In case the GoodsReceiptNote found by the `where` argument doesn't exist, create a new GoodsReceiptNote with this data.
     */
    create: XOR<GoodsReceiptNoteCreateInput, GoodsReceiptNoteUncheckedCreateInput>
    /**
     * In case the GoodsReceiptNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsReceiptNoteUpdateInput, GoodsReceiptNoteUncheckedUpdateInput>
  }

  /**
   * GoodsReceiptNote delete
   */
  export type GoodsReceiptNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
    /**
     * Filter which GoodsReceiptNote to delete.
     */
    where: GoodsReceiptNoteWhereUniqueInput
  }

  /**
   * GoodsReceiptNote deleteMany
   */
  export type GoodsReceiptNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReceiptNotes to delete
     */
    where?: GoodsReceiptNoteWhereInput
  }

  /**
   * GoodsReceiptNote.lines
   */
  export type GoodsReceiptNote$linesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    where?: GoodsReceiptNoteLineWhereInput
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsReceiptNoteLineScalarFieldEnum | GoodsReceiptNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNote without action
   */
  export type GoodsReceiptNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNote
     */
    select?: GoodsReceiptNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteInclude<ExtArgs> | null
  }


  /**
   * Model GoodsReceiptNoteLine
   */

  export type AggregateGoodsReceiptNoteLine = {
    _count: GoodsReceiptNoteLineCountAggregateOutputType | null
    _avg: GoodsReceiptNoteLineAvgAggregateOutputType | null
    _sum: GoodsReceiptNoteLineSumAggregateOutputType | null
    _min: GoodsReceiptNoteLineMinAggregateOutputType | null
    _max: GoodsReceiptNoteLineMaxAggregateOutputType | null
  }

  export type GoodsReceiptNoteLineAvgAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type GoodsReceiptNoteLineSumAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type GoodsReceiptNoteLineMinAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
    comments: string | null
  }

  export type GoodsReceiptNoteLineMaxAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
    comments: string | null
  }

  export type GoodsReceiptNoteLineCountAggregateOutputType = {
    noteId: number
    lineId: number
    productId: number
    goodQuantities: number
    badQuantities: number
    comments: number
    _all: number
  }


  export type GoodsReceiptNoteLineAvgAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type GoodsReceiptNoteLineSumAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type GoodsReceiptNoteLineMinAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    comments?: true
  }

  export type GoodsReceiptNoteLineMaxAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    comments?: true
  }

  export type GoodsReceiptNoteLineCountAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    comments?: true
    _all?: true
  }

  export type GoodsReceiptNoteLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReceiptNoteLine to aggregate.
     */
    where?: GoodsReceiptNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNoteLines to fetch.
     */
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsReceiptNoteLines
    **/
    _count?: true | GoodsReceiptNoteLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsReceiptNoteLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsReceiptNoteLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsReceiptNoteLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsReceiptNoteLineMaxAggregateInputType
  }

  export type GetGoodsReceiptNoteLineAggregateType<T extends GoodsReceiptNoteLineAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsReceiptNoteLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsReceiptNoteLine[P]>
      : GetScalarType<T[P], AggregateGoodsReceiptNoteLine[P]>
  }




  export type GoodsReceiptNoteLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReceiptNoteLineWhereInput
    orderBy?: GoodsReceiptNoteLineOrderByWithAggregationInput | GoodsReceiptNoteLineOrderByWithAggregationInput[]
    by: GoodsReceiptNoteLineScalarFieldEnum[] | GoodsReceiptNoteLineScalarFieldEnum
    having?: GoodsReceiptNoteLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsReceiptNoteLineCountAggregateInputType | true
    _avg?: GoodsReceiptNoteLineAvgAggregateInputType
    _sum?: GoodsReceiptNoteLineSumAggregateInputType
    _min?: GoodsReceiptNoteLineMinAggregateInputType
    _max?: GoodsReceiptNoteLineMaxAggregateInputType
  }

  export type GoodsReceiptNoteLineGroupByOutputType = {
    noteId: string
    lineId: string
    productId: string
    goodQuantities: number
    badQuantities: number
    comments: string | null
    _count: GoodsReceiptNoteLineCountAggregateOutputType | null
    _avg: GoodsReceiptNoteLineAvgAggregateOutputType | null
    _sum: GoodsReceiptNoteLineSumAggregateOutputType | null
    _min: GoodsReceiptNoteLineMinAggregateOutputType | null
    _max: GoodsReceiptNoteLineMaxAggregateOutputType | null
  }

  type GetGoodsReceiptNoteLineGroupByPayload<T extends GoodsReceiptNoteLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsReceiptNoteLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsReceiptNoteLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsReceiptNoteLineGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsReceiptNoteLineGroupByOutputType[P]>
        }
      >
    >


  export type GoodsReceiptNoteLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    comments?: boolean
    note?: boolean | GoodsReceiptNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReceiptNoteLine"]>

  export type GoodsReceiptNoteLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    comments?: boolean
    note?: boolean | GoodsReceiptNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReceiptNoteLine"]>

  export type GoodsReceiptNoteLineSelectScalar = {
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    comments?: boolean
  }

  export type GoodsReceiptNoteLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsReceiptNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type GoodsReceiptNoteLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsReceiptNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $GoodsReceiptNoteLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsReceiptNoteLine"
    objects: {
      note: Prisma.$GoodsReceiptNotePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      lineId: string
      productId: string
      goodQuantities: number
      badQuantities: number
      comments: string | null
    }, ExtArgs["result"]["goodsReceiptNoteLine"]>
    composites: {}
  }

  type GoodsReceiptNoteLineGetPayload<S extends boolean | null | undefined | GoodsReceiptNoteLineDefaultArgs> = $Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload, S>

  type GoodsReceiptNoteLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsReceiptNoteLineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsReceiptNoteLineCountAggregateInputType | true
    }

  export interface GoodsReceiptNoteLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsReceiptNoteLine'], meta: { name: 'GoodsReceiptNoteLine' } }
    /**
     * Find zero or one GoodsReceiptNoteLine that matches the filter.
     * @param {GoodsReceiptNoteLineFindUniqueArgs} args - Arguments to find a GoodsReceiptNoteLine
     * @example
     * // Get one GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsReceiptNoteLineFindUniqueArgs>(args: SelectSubset<T, GoodsReceiptNoteLineFindUniqueArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsReceiptNoteLine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsReceiptNoteLineFindUniqueOrThrowArgs} args - Arguments to find a GoodsReceiptNoteLine
     * @example
     * // Get one GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsReceiptNoteLineFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsReceiptNoteLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsReceiptNoteLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineFindFirstArgs} args - Arguments to find a GoodsReceiptNoteLine
     * @example
     * // Get one GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsReceiptNoteLineFindFirstArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineFindFirstArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsReceiptNoteLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineFindFirstOrThrowArgs} args - Arguments to find a GoodsReceiptNoteLine
     * @example
     * // Get one GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsReceiptNoteLineFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsReceiptNoteLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsReceiptNoteLines
     * const goodsReceiptNoteLines = await prisma.goodsReceiptNoteLine.findMany()
     * 
     * // Get first 10 GoodsReceiptNoteLines
     * const goodsReceiptNoteLines = await prisma.goodsReceiptNoteLine.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsReceiptNoteLineWithNoteIdOnly = await prisma.goodsReceiptNoteLine.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsReceiptNoteLineFindManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsReceiptNoteLine.
     * @param {GoodsReceiptNoteLineCreateArgs} args - Arguments to create a GoodsReceiptNoteLine.
     * @example
     * // Create one GoodsReceiptNoteLine
     * const GoodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.create({
     *   data: {
     *     // ... data to create a GoodsReceiptNoteLine
     *   }
     * })
     * 
     */
    create<T extends GoodsReceiptNoteLineCreateArgs>(args: SelectSubset<T, GoodsReceiptNoteLineCreateArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsReceiptNoteLines.
     * @param {GoodsReceiptNoteLineCreateManyArgs} args - Arguments to create many GoodsReceiptNoteLines.
     * @example
     * // Create many GoodsReceiptNoteLines
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsReceiptNoteLineCreateManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsReceiptNoteLines and returns the data saved in the database.
     * @param {GoodsReceiptNoteLineCreateManyAndReturnArgs} args - Arguments to create many GoodsReceiptNoteLines.
     * @example
     * // Create many GoodsReceiptNoteLines
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsReceiptNoteLines and only return the `noteId`
     * const goodsReceiptNoteLineWithNoteIdOnly = await prisma.goodsReceiptNoteLine.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsReceiptNoteLineCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsReceiptNoteLine.
     * @param {GoodsReceiptNoteLineDeleteArgs} args - Arguments to delete one GoodsReceiptNoteLine.
     * @example
     * // Delete one GoodsReceiptNoteLine
     * const GoodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.delete({
     *   where: {
     *     // ... filter to delete one GoodsReceiptNoteLine
     *   }
     * })
     * 
     */
    delete<T extends GoodsReceiptNoteLineDeleteArgs>(args: SelectSubset<T, GoodsReceiptNoteLineDeleteArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsReceiptNoteLine.
     * @param {GoodsReceiptNoteLineUpdateArgs} args - Arguments to update one GoodsReceiptNoteLine.
     * @example
     * // Update one GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsReceiptNoteLineUpdateArgs>(args: SelectSubset<T, GoodsReceiptNoteLineUpdateArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsReceiptNoteLines.
     * @param {GoodsReceiptNoteLineDeleteManyArgs} args - Arguments to filter GoodsReceiptNoteLines to delete.
     * @example
     * // Delete a few GoodsReceiptNoteLines
     * const { count } = await prisma.goodsReceiptNoteLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsReceiptNoteLineDeleteManyArgs>(args?: SelectSubset<T, GoodsReceiptNoteLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsReceiptNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsReceiptNoteLines
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsReceiptNoteLineUpdateManyArgs>(args: SelectSubset<T, GoodsReceiptNoteLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsReceiptNoteLine.
     * @param {GoodsReceiptNoteLineUpsertArgs} args - Arguments to update or create a GoodsReceiptNoteLine.
     * @example
     * // Update or create a GoodsReceiptNoteLine
     * const goodsReceiptNoteLine = await prisma.goodsReceiptNoteLine.upsert({
     *   create: {
     *     // ... data to create a GoodsReceiptNoteLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsReceiptNoteLine we want to update
     *   }
     * })
     */
    upsert<T extends GoodsReceiptNoteLineUpsertArgs>(args: SelectSubset<T, GoodsReceiptNoteLineUpsertArgs<ExtArgs>>): Prisma__GoodsReceiptNoteLineClient<$Result.GetResult<Prisma.$GoodsReceiptNoteLinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsReceiptNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineCountArgs} args - Arguments to filter GoodsReceiptNoteLines to count.
     * @example
     * // Count the number of GoodsReceiptNoteLines
     * const count = await prisma.goodsReceiptNoteLine.count({
     *   where: {
     *     // ... the filter for the GoodsReceiptNoteLines we want to count
     *   }
     * })
    **/
    count<T extends GoodsReceiptNoteLineCountArgs>(
      args?: Subset<T, GoodsReceiptNoteLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsReceiptNoteLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsReceiptNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsReceiptNoteLineAggregateArgs>(args: Subset<T, GoodsReceiptNoteLineAggregateArgs>): Prisma.PrismaPromise<GetGoodsReceiptNoteLineAggregateType<T>>

    /**
     * Group by GoodsReceiptNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReceiptNoteLineGroupByArgs} args - Group by arguments.
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
      T extends GoodsReceiptNoteLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsReceiptNoteLineGroupByArgs['orderBy'] }
        : { orderBy?: GoodsReceiptNoteLineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsReceiptNoteLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReceiptNoteLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsReceiptNoteLine model
   */
  readonly fields: GoodsReceiptNoteLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsReceiptNoteLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsReceiptNoteLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends GoodsReceiptNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoodsReceiptNoteDefaultArgs<ExtArgs>>): Prisma__GoodsReceiptNoteClient<$Result.GetResult<Prisma.$GoodsReceiptNotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the GoodsReceiptNoteLine model
   */ 
  interface GoodsReceiptNoteLineFieldRefs {
    readonly noteId: FieldRef<"GoodsReceiptNoteLine", 'String'>
    readonly lineId: FieldRef<"GoodsReceiptNoteLine", 'String'>
    readonly productId: FieldRef<"GoodsReceiptNoteLine", 'String'>
    readonly goodQuantities: FieldRef<"GoodsReceiptNoteLine", 'Int'>
    readonly badQuantities: FieldRef<"GoodsReceiptNoteLine", 'Int'>
    readonly comments: FieldRef<"GoodsReceiptNoteLine", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GoodsReceiptNoteLine findUnique
   */
  export type GoodsReceiptNoteLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNoteLine to fetch.
     */
    where: GoodsReceiptNoteLineWhereUniqueInput
  }

  /**
   * GoodsReceiptNoteLine findUniqueOrThrow
   */
  export type GoodsReceiptNoteLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNoteLine to fetch.
     */
    where: GoodsReceiptNoteLineWhereUniqueInput
  }

  /**
   * GoodsReceiptNoteLine findFirst
   */
  export type GoodsReceiptNoteLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNoteLine to fetch.
     */
    where?: GoodsReceiptNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNoteLines to fetch.
     */
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReceiptNoteLines.
     */
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReceiptNoteLines.
     */
    distinct?: GoodsReceiptNoteLineScalarFieldEnum | GoodsReceiptNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNoteLine findFirstOrThrow
   */
  export type GoodsReceiptNoteLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNoteLine to fetch.
     */
    where?: GoodsReceiptNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNoteLines to fetch.
     */
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReceiptNoteLines.
     */
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReceiptNoteLines.
     */
    distinct?: GoodsReceiptNoteLineScalarFieldEnum | GoodsReceiptNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNoteLine findMany
   */
  export type GoodsReceiptNoteLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReceiptNoteLines to fetch.
     */
    where?: GoodsReceiptNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReceiptNoteLines to fetch.
     */
    orderBy?: GoodsReceiptNoteLineOrderByWithRelationInput | GoodsReceiptNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsReceiptNoteLines.
     */
    cursor?: GoodsReceiptNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReceiptNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReceiptNoteLines.
     */
    skip?: number
    distinct?: GoodsReceiptNoteLineScalarFieldEnum | GoodsReceiptNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReceiptNoteLine create
   */
  export type GoodsReceiptNoteLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsReceiptNoteLine.
     */
    data: XOR<GoodsReceiptNoteLineCreateInput, GoodsReceiptNoteLineUncheckedCreateInput>
  }

  /**
   * GoodsReceiptNoteLine createMany
   */
  export type GoodsReceiptNoteLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsReceiptNoteLines.
     */
    data: GoodsReceiptNoteLineCreateManyInput | GoodsReceiptNoteLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsReceiptNoteLine createManyAndReturn
   */
  export type GoodsReceiptNoteLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsReceiptNoteLines.
     */
    data: GoodsReceiptNoteLineCreateManyInput | GoodsReceiptNoteLineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GoodsReceiptNoteLine update
   */
  export type GoodsReceiptNoteLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsReceiptNoteLine.
     */
    data: XOR<GoodsReceiptNoteLineUpdateInput, GoodsReceiptNoteLineUncheckedUpdateInput>
    /**
     * Choose, which GoodsReceiptNoteLine to update.
     */
    where: GoodsReceiptNoteLineWhereUniqueInput
  }

  /**
   * GoodsReceiptNoteLine updateMany
   */
  export type GoodsReceiptNoteLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsReceiptNoteLines.
     */
    data: XOR<GoodsReceiptNoteLineUpdateManyMutationInput, GoodsReceiptNoteLineUncheckedUpdateManyInput>
    /**
     * Filter which GoodsReceiptNoteLines to update
     */
    where?: GoodsReceiptNoteLineWhereInput
  }

  /**
   * GoodsReceiptNoteLine upsert
   */
  export type GoodsReceiptNoteLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsReceiptNoteLine to update in case it exists.
     */
    where: GoodsReceiptNoteLineWhereUniqueInput
    /**
     * In case the GoodsReceiptNoteLine found by the `where` argument doesn't exist, create a new GoodsReceiptNoteLine with this data.
     */
    create: XOR<GoodsReceiptNoteLineCreateInput, GoodsReceiptNoteLineUncheckedCreateInput>
    /**
     * In case the GoodsReceiptNoteLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsReceiptNoteLineUpdateInput, GoodsReceiptNoteLineUncheckedUpdateInput>
  }

  /**
   * GoodsReceiptNoteLine delete
   */
  export type GoodsReceiptNoteLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
    /**
     * Filter which GoodsReceiptNoteLine to delete.
     */
    where: GoodsReceiptNoteLineWhereUniqueInput
  }

  /**
   * GoodsReceiptNoteLine deleteMany
   */
  export type GoodsReceiptNoteLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReceiptNoteLines to delete
     */
    where?: GoodsReceiptNoteLineWhereInput
  }

  /**
   * GoodsReceiptNoteLine without action
   */
  export type GoodsReceiptNoteLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReceiptNoteLine
     */
    select?: GoodsReceiptNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReceiptNoteLineInclude<ExtArgs> | null
  }


  /**
   * Model GoodsIssueNote
   */

  export type AggregateGoodsIssueNote = {
    _count: GoodsIssueNoteCountAggregateOutputType | null
    _avg: GoodsIssueNoteAvgAggregateOutputType | null
    _sum: GoodsIssueNoteSumAggregateOutputType | null
    _min: GoodsIssueNoteMinAggregateOutputType | null
    _max: GoodsIssueNoteMaxAggregateOutputType | null
  }

  export type GoodsIssueNoteAvgAggregateOutputType = {
    total: number | null
    securityDeposit: number | null
  }

  export type GoodsIssueNoteSumAggregateOutputType = {
    total: number | null
    securityDeposit: number | null
  }

  export type GoodsIssueNoteMinAggregateOutputType = {
    noteId: string | null
    issuedAt: Date | null
    returnDate: Date | null
    status: string | null
    total: number | null
    securityDeposit: number | null
    fulltext: string | null
  }

  export type GoodsIssueNoteMaxAggregateOutputType = {
    noteId: string | null
    issuedAt: Date | null
    returnDate: Date | null
    status: string | null
    total: number | null
    securityDeposit: number | null
    fulltext: string | null
  }

  export type GoodsIssueNoteCountAggregateOutputType = {
    noteId: number
    issuedAt: number
    returnDate: number
    status: number
    total: number
    securityDeposit: number
    fulltext: number
    _all: number
  }


  export type GoodsIssueNoteAvgAggregateInputType = {
    total?: true
    securityDeposit?: true
  }

  export type GoodsIssueNoteSumAggregateInputType = {
    total?: true
    securityDeposit?: true
  }

  export type GoodsIssueNoteMinAggregateInputType = {
    noteId?: true
    issuedAt?: true
    returnDate?: true
    status?: true
    total?: true
    securityDeposit?: true
    fulltext?: true
  }

  export type GoodsIssueNoteMaxAggregateInputType = {
    noteId?: true
    issuedAt?: true
    returnDate?: true
    status?: true
    total?: true
    securityDeposit?: true
    fulltext?: true
  }

  export type GoodsIssueNoteCountAggregateInputType = {
    noteId?: true
    issuedAt?: true
    returnDate?: true
    status?: true
    total?: true
    securityDeposit?: true
    fulltext?: true
    _all?: true
  }

  export type GoodsIssueNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsIssueNote to aggregate.
     */
    where?: GoodsIssueNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNotes to fetch.
     */
    orderBy?: GoodsIssueNoteOrderByWithRelationInput | GoodsIssueNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsIssueNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsIssueNotes
    **/
    _count?: true | GoodsIssueNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsIssueNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsIssueNoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsIssueNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsIssueNoteMaxAggregateInputType
  }

  export type GetGoodsIssueNoteAggregateType<T extends GoodsIssueNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsIssueNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsIssueNote[P]>
      : GetScalarType<T[P], AggregateGoodsIssueNote[P]>
  }




  export type GoodsIssueNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsIssueNoteWhereInput
    orderBy?: GoodsIssueNoteOrderByWithAggregationInput | GoodsIssueNoteOrderByWithAggregationInput[]
    by: GoodsIssueNoteScalarFieldEnum[] | GoodsIssueNoteScalarFieldEnum
    having?: GoodsIssueNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsIssueNoteCountAggregateInputType | true
    _avg?: GoodsIssueNoteAvgAggregateInputType
    _sum?: GoodsIssueNoteSumAggregateInputType
    _min?: GoodsIssueNoteMinAggregateInputType
    _max?: GoodsIssueNoteMaxAggregateInputType
  }

  export type GoodsIssueNoteGroupByOutputType = {
    noteId: string
    issuedAt: Date
    returnDate: Date
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    _count: GoodsIssueNoteCountAggregateOutputType | null
    _avg: GoodsIssueNoteAvgAggregateOutputType | null
    _sum: GoodsIssueNoteSumAggregateOutputType | null
    _min: GoodsIssueNoteMinAggregateOutputType | null
    _max: GoodsIssueNoteMaxAggregateOutputType | null
  }

  type GetGoodsIssueNoteGroupByPayload<T extends GoodsIssueNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsIssueNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsIssueNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsIssueNoteGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsIssueNoteGroupByOutputType[P]>
        }
      >
    >


  export type GoodsIssueNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    issuedAt?: boolean
    returnDate?: boolean
    status?: boolean
    total?: boolean
    securityDeposit?: boolean
    fulltext?: boolean
    purpose?: boolean | GoodsIssueNote$purposeArgs<ExtArgs>
    lines?: boolean | GoodsIssueNote$linesArgs<ExtArgs>
    goodsReturnNotes?: boolean | GoodsIssueNote$goodsReturnNotesArgs<ExtArgs>
    _count?: boolean | GoodsIssueNoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsIssueNote"]>

  export type GoodsIssueNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    issuedAt?: boolean
    returnDate?: boolean
    status?: boolean
    total?: boolean
    securityDeposit?: boolean
    fulltext?: boolean
  }, ExtArgs["result"]["goodsIssueNote"]>

  export type GoodsIssueNoteSelectScalar = {
    noteId?: boolean
    issuedAt?: boolean
    returnDate?: boolean
    status?: boolean
    total?: boolean
    securityDeposit?: boolean
    fulltext?: boolean
  }

  export type GoodsIssueNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purpose?: boolean | GoodsIssueNote$purposeArgs<ExtArgs>
    lines?: boolean | GoodsIssueNote$linesArgs<ExtArgs>
    goodsReturnNotes?: boolean | GoodsIssueNote$goodsReturnNotesArgs<ExtArgs>
    _count?: boolean | GoodsIssueNoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoodsIssueNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GoodsIssueNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsIssueNote"
    objects: {
      purpose: Prisma.$PurposePayload<ExtArgs> | null
      lines: Prisma.$GoodsIssueNoteLinePayload<ExtArgs>[]
      goodsReturnNotes: Prisma.$GoodsReturnNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      issuedAt: Date
      returnDate: Date
      status: string
      total: number
      securityDeposit: number
      fulltext: string
    }, ExtArgs["result"]["goodsIssueNote"]>
    composites: {}
  }

  type GoodsIssueNoteGetPayload<S extends boolean | null | undefined | GoodsIssueNoteDefaultArgs> = $Result.GetResult<Prisma.$GoodsIssueNotePayload, S>

  type GoodsIssueNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsIssueNoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsIssueNoteCountAggregateInputType | true
    }

  export interface GoodsIssueNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsIssueNote'], meta: { name: 'GoodsIssueNote' } }
    /**
     * Find zero or one GoodsIssueNote that matches the filter.
     * @param {GoodsIssueNoteFindUniqueArgs} args - Arguments to find a GoodsIssueNote
     * @example
     * // Get one GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsIssueNoteFindUniqueArgs>(args: SelectSubset<T, GoodsIssueNoteFindUniqueArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsIssueNote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsIssueNoteFindUniqueOrThrowArgs} args - Arguments to find a GoodsIssueNote
     * @example
     * // Get one GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsIssueNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsIssueNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsIssueNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteFindFirstArgs} args - Arguments to find a GoodsIssueNote
     * @example
     * // Get one GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsIssueNoteFindFirstArgs>(args?: SelectSubset<T, GoodsIssueNoteFindFirstArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsIssueNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteFindFirstOrThrowArgs} args - Arguments to find a GoodsIssueNote
     * @example
     * // Get one GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsIssueNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsIssueNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsIssueNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsIssueNotes
     * const goodsIssueNotes = await prisma.goodsIssueNote.findMany()
     * 
     * // Get first 10 GoodsIssueNotes
     * const goodsIssueNotes = await prisma.goodsIssueNote.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsIssueNoteWithNoteIdOnly = await prisma.goodsIssueNote.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsIssueNoteFindManyArgs>(args?: SelectSubset<T, GoodsIssueNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsIssueNote.
     * @param {GoodsIssueNoteCreateArgs} args - Arguments to create a GoodsIssueNote.
     * @example
     * // Create one GoodsIssueNote
     * const GoodsIssueNote = await prisma.goodsIssueNote.create({
     *   data: {
     *     // ... data to create a GoodsIssueNote
     *   }
     * })
     * 
     */
    create<T extends GoodsIssueNoteCreateArgs>(args: SelectSubset<T, GoodsIssueNoteCreateArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsIssueNotes.
     * @param {GoodsIssueNoteCreateManyArgs} args - Arguments to create many GoodsIssueNotes.
     * @example
     * // Create many GoodsIssueNotes
     * const goodsIssueNote = await prisma.goodsIssueNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsIssueNoteCreateManyArgs>(args?: SelectSubset<T, GoodsIssueNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsIssueNotes and returns the data saved in the database.
     * @param {GoodsIssueNoteCreateManyAndReturnArgs} args - Arguments to create many GoodsIssueNotes.
     * @example
     * // Create many GoodsIssueNotes
     * const goodsIssueNote = await prisma.goodsIssueNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsIssueNotes and only return the `noteId`
     * const goodsIssueNoteWithNoteIdOnly = await prisma.goodsIssueNote.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsIssueNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsIssueNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsIssueNote.
     * @param {GoodsIssueNoteDeleteArgs} args - Arguments to delete one GoodsIssueNote.
     * @example
     * // Delete one GoodsIssueNote
     * const GoodsIssueNote = await prisma.goodsIssueNote.delete({
     *   where: {
     *     // ... filter to delete one GoodsIssueNote
     *   }
     * })
     * 
     */
    delete<T extends GoodsIssueNoteDeleteArgs>(args: SelectSubset<T, GoodsIssueNoteDeleteArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsIssueNote.
     * @param {GoodsIssueNoteUpdateArgs} args - Arguments to update one GoodsIssueNote.
     * @example
     * // Update one GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsIssueNoteUpdateArgs>(args: SelectSubset<T, GoodsIssueNoteUpdateArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsIssueNotes.
     * @param {GoodsIssueNoteDeleteManyArgs} args - Arguments to filter GoodsIssueNotes to delete.
     * @example
     * // Delete a few GoodsIssueNotes
     * const { count } = await prisma.goodsIssueNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsIssueNoteDeleteManyArgs>(args?: SelectSubset<T, GoodsIssueNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsIssueNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsIssueNotes
     * const goodsIssueNote = await prisma.goodsIssueNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsIssueNoteUpdateManyArgs>(args: SelectSubset<T, GoodsIssueNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsIssueNote.
     * @param {GoodsIssueNoteUpsertArgs} args - Arguments to update or create a GoodsIssueNote.
     * @example
     * // Update or create a GoodsIssueNote
     * const goodsIssueNote = await prisma.goodsIssueNote.upsert({
     *   create: {
     *     // ... data to create a GoodsIssueNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsIssueNote we want to update
     *   }
     * })
     */
    upsert<T extends GoodsIssueNoteUpsertArgs>(args: SelectSubset<T, GoodsIssueNoteUpsertArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsIssueNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteCountArgs} args - Arguments to filter GoodsIssueNotes to count.
     * @example
     * // Count the number of GoodsIssueNotes
     * const count = await prisma.goodsIssueNote.count({
     *   where: {
     *     // ... the filter for the GoodsIssueNotes we want to count
     *   }
     * })
    **/
    count<T extends GoodsIssueNoteCountArgs>(
      args?: Subset<T, GoodsIssueNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsIssueNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsIssueNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsIssueNoteAggregateArgs>(args: Subset<T, GoodsIssueNoteAggregateArgs>): Prisma.PrismaPromise<GetGoodsIssueNoteAggregateType<T>>

    /**
     * Group by GoodsIssueNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteGroupByArgs} args - Group by arguments.
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
      T extends GoodsIssueNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsIssueNoteGroupByArgs['orderBy'] }
        : { orderBy?: GoodsIssueNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsIssueNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsIssueNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsIssueNote model
   */
  readonly fields: GoodsIssueNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsIssueNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsIssueNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purpose<T extends GoodsIssueNote$purposeArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNote$purposeArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    lines<T extends GoodsIssueNote$linesArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNote$linesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
    goodsReturnNotes<T extends GoodsIssueNote$goodsReturnNotesArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNote$goodsReturnNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the GoodsIssueNote model
   */ 
  interface GoodsIssueNoteFieldRefs {
    readonly noteId: FieldRef<"GoodsIssueNote", 'String'>
    readonly issuedAt: FieldRef<"GoodsIssueNote", 'DateTime'>
    readonly returnDate: FieldRef<"GoodsIssueNote", 'DateTime'>
    readonly status: FieldRef<"GoodsIssueNote", 'String'>
    readonly total: FieldRef<"GoodsIssueNote", 'Float'>
    readonly securityDeposit: FieldRef<"GoodsIssueNote", 'Float'>
    readonly fulltext: FieldRef<"GoodsIssueNote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GoodsIssueNote findUnique
   */
  export type GoodsIssueNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNote to fetch.
     */
    where: GoodsIssueNoteWhereUniqueInput
  }

  /**
   * GoodsIssueNote findUniqueOrThrow
   */
  export type GoodsIssueNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNote to fetch.
     */
    where: GoodsIssueNoteWhereUniqueInput
  }

  /**
   * GoodsIssueNote findFirst
   */
  export type GoodsIssueNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNote to fetch.
     */
    where?: GoodsIssueNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNotes to fetch.
     */
    orderBy?: GoodsIssueNoteOrderByWithRelationInput | GoodsIssueNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsIssueNotes.
     */
    cursor?: GoodsIssueNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsIssueNotes.
     */
    distinct?: GoodsIssueNoteScalarFieldEnum | GoodsIssueNoteScalarFieldEnum[]
  }

  /**
   * GoodsIssueNote findFirstOrThrow
   */
  export type GoodsIssueNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNote to fetch.
     */
    where?: GoodsIssueNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNotes to fetch.
     */
    orderBy?: GoodsIssueNoteOrderByWithRelationInput | GoodsIssueNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsIssueNotes.
     */
    cursor?: GoodsIssueNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsIssueNotes.
     */
    distinct?: GoodsIssueNoteScalarFieldEnum | GoodsIssueNoteScalarFieldEnum[]
  }

  /**
   * GoodsIssueNote findMany
   */
  export type GoodsIssueNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNotes to fetch.
     */
    where?: GoodsIssueNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNotes to fetch.
     */
    orderBy?: GoodsIssueNoteOrderByWithRelationInput | GoodsIssueNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsIssueNotes.
     */
    cursor?: GoodsIssueNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNotes.
     */
    skip?: number
    distinct?: GoodsIssueNoteScalarFieldEnum | GoodsIssueNoteScalarFieldEnum[]
  }

  /**
   * GoodsIssueNote create
   */
  export type GoodsIssueNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsIssueNote.
     */
    data: XOR<GoodsIssueNoteCreateInput, GoodsIssueNoteUncheckedCreateInput>
  }

  /**
   * GoodsIssueNote createMany
   */
  export type GoodsIssueNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsIssueNotes.
     */
    data: GoodsIssueNoteCreateManyInput | GoodsIssueNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsIssueNote createManyAndReturn
   */
  export type GoodsIssueNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsIssueNotes.
     */
    data: GoodsIssueNoteCreateManyInput | GoodsIssueNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsIssueNote update
   */
  export type GoodsIssueNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsIssueNote.
     */
    data: XOR<GoodsIssueNoteUpdateInput, GoodsIssueNoteUncheckedUpdateInput>
    /**
     * Choose, which GoodsIssueNote to update.
     */
    where: GoodsIssueNoteWhereUniqueInput
  }

  /**
   * GoodsIssueNote updateMany
   */
  export type GoodsIssueNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsIssueNotes.
     */
    data: XOR<GoodsIssueNoteUpdateManyMutationInput, GoodsIssueNoteUncheckedUpdateManyInput>
    /**
     * Filter which GoodsIssueNotes to update
     */
    where?: GoodsIssueNoteWhereInput
  }

  /**
   * GoodsIssueNote upsert
   */
  export type GoodsIssueNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsIssueNote to update in case it exists.
     */
    where: GoodsIssueNoteWhereUniqueInput
    /**
     * In case the GoodsIssueNote found by the `where` argument doesn't exist, create a new GoodsIssueNote with this data.
     */
    create: XOR<GoodsIssueNoteCreateInput, GoodsIssueNoteUncheckedCreateInput>
    /**
     * In case the GoodsIssueNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsIssueNoteUpdateInput, GoodsIssueNoteUncheckedUpdateInput>
  }

  /**
   * GoodsIssueNote delete
   */
  export type GoodsIssueNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
    /**
     * Filter which GoodsIssueNote to delete.
     */
    where: GoodsIssueNoteWhereUniqueInput
  }

  /**
   * GoodsIssueNote deleteMany
   */
  export type GoodsIssueNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsIssueNotes to delete
     */
    where?: GoodsIssueNoteWhereInput
  }

  /**
   * GoodsIssueNote.purpose
   */
  export type GoodsIssueNote$purposeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    where?: PurposeWhereInput
  }

  /**
   * GoodsIssueNote.lines
   */
  export type GoodsIssueNote$linesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    where?: GoodsIssueNoteLineWhereInput
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsIssueNoteLineScalarFieldEnum | GoodsIssueNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsIssueNote.goodsReturnNotes
   */
  export type GoodsIssueNote$goodsReturnNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    where?: GoodsReturnNoteWhereInput
    orderBy?: GoodsReturnNoteOrderByWithRelationInput | GoodsReturnNoteOrderByWithRelationInput[]
    cursor?: GoodsReturnNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsReturnNoteScalarFieldEnum | GoodsReturnNoteScalarFieldEnum[]
  }

  /**
   * GoodsIssueNote without action
   */
  export type GoodsIssueNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNote
     */
    select?: GoodsIssueNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteInclude<ExtArgs> | null
  }


  /**
   * Model GoodsIssueNoteLine
   */

  export type AggregateGoodsIssueNoteLine = {
    _count: GoodsIssueNoteLineCountAggregateOutputType | null
    _avg: GoodsIssueNoteLineAvgAggregateOutputType | null
    _sum: GoodsIssueNoteLineSumAggregateOutputType | null
    _min: GoodsIssueNoteLineMinAggregateOutputType | null
    _max: GoodsIssueNoteLineMaxAggregateOutputType | null
  }

  export type GoodsIssueNoteLineAvgAggregateOutputType = {
    price: number | null
    goodQuantities: number | null
    badQuantities: number | null
    goodQuantitiesReturned: number | null
    badQuantitiesReturned: number | null
    netTotal: number | null
  }

  export type GoodsIssueNoteLineSumAggregateOutputType = {
    price: number | null
    goodQuantities: number | null
    badQuantities: number | null
    goodQuantitiesReturned: number | null
    badQuantitiesReturned: number | null
    netTotal: number | null
  }

  export type GoodsIssueNoteLineMinAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    productId: string | null
    name: string | null
    price: number | null
    goodQuantities: number | null
    badQuantities: number | null
    goodQuantitiesReturned: number | null
    badQuantitiesReturned: number | null
    netTotal: number | null
    comments: string | null
  }

  export type GoodsIssueNoteLineMaxAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    productId: string | null
    name: string | null
    price: number | null
    goodQuantities: number | null
    badQuantities: number | null
    goodQuantitiesReturned: number | null
    badQuantitiesReturned: number | null
    netTotal: number | null
    comments: string | null
  }

  export type GoodsIssueNoteLineCountAggregateOutputType = {
    noteId: number
    lineId: number
    productId: number
    name: number
    price: number
    goodQuantities: number
    badQuantities: number
    goodQuantitiesReturned: number
    badQuantitiesReturned: number
    netTotal: number
    comments: number
    variations: number
    _all: number
  }


  export type GoodsIssueNoteLineAvgAggregateInputType = {
    price?: true
    goodQuantities?: true
    badQuantities?: true
    goodQuantitiesReturned?: true
    badQuantitiesReturned?: true
    netTotal?: true
  }

  export type GoodsIssueNoteLineSumAggregateInputType = {
    price?: true
    goodQuantities?: true
    badQuantities?: true
    goodQuantitiesReturned?: true
    badQuantitiesReturned?: true
    netTotal?: true
  }

  export type GoodsIssueNoteLineMinAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    name?: true
    price?: true
    goodQuantities?: true
    badQuantities?: true
    goodQuantitiesReturned?: true
    badQuantitiesReturned?: true
    netTotal?: true
    comments?: true
  }

  export type GoodsIssueNoteLineMaxAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    name?: true
    price?: true
    goodQuantities?: true
    badQuantities?: true
    goodQuantitiesReturned?: true
    badQuantitiesReturned?: true
    netTotal?: true
    comments?: true
  }

  export type GoodsIssueNoteLineCountAggregateInputType = {
    noteId?: true
    lineId?: true
    productId?: true
    name?: true
    price?: true
    goodQuantities?: true
    badQuantities?: true
    goodQuantitiesReturned?: true
    badQuantitiesReturned?: true
    netTotal?: true
    comments?: true
    variations?: true
    _all?: true
  }

  export type GoodsIssueNoteLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsIssueNoteLine to aggregate.
     */
    where?: GoodsIssueNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNoteLines to fetch.
     */
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsIssueNoteLines
    **/
    _count?: true | GoodsIssueNoteLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsIssueNoteLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsIssueNoteLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsIssueNoteLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsIssueNoteLineMaxAggregateInputType
  }

  export type GetGoodsIssueNoteLineAggregateType<T extends GoodsIssueNoteLineAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsIssueNoteLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsIssueNoteLine[P]>
      : GetScalarType<T[P], AggregateGoodsIssueNoteLine[P]>
  }




  export type GoodsIssueNoteLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsIssueNoteLineWhereInput
    orderBy?: GoodsIssueNoteLineOrderByWithAggregationInput | GoodsIssueNoteLineOrderByWithAggregationInput[]
    by: GoodsIssueNoteLineScalarFieldEnum[] | GoodsIssueNoteLineScalarFieldEnum
    having?: GoodsIssueNoteLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsIssueNoteLineCountAggregateInputType | true
    _avg?: GoodsIssueNoteLineAvgAggregateInputType
    _sum?: GoodsIssueNoteLineSumAggregateInputType
    _min?: GoodsIssueNoteLineMinAggregateInputType
    _max?: GoodsIssueNoteLineMaxAggregateInputType
  }

  export type GoodsIssueNoteLineGroupByOutputType = {
    noteId: string
    lineId: string
    productId: string
    name: string
    price: number
    goodQuantities: number
    badQuantities: number
    goodQuantitiesReturned: number
    badQuantitiesReturned: number
    netTotal: number
    comments: string | null
    variations: JsonValue | null
    _count: GoodsIssueNoteLineCountAggregateOutputType | null
    _avg: GoodsIssueNoteLineAvgAggregateOutputType | null
    _sum: GoodsIssueNoteLineSumAggregateOutputType | null
    _min: GoodsIssueNoteLineMinAggregateOutputType | null
    _max: GoodsIssueNoteLineMaxAggregateOutputType | null
  }

  type GetGoodsIssueNoteLineGroupByPayload<T extends GoodsIssueNoteLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsIssueNoteLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsIssueNoteLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsIssueNoteLineGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsIssueNoteLineGroupByOutputType[P]>
        }
      >
    >


  export type GoodsIssueNoteLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    name?: boolean
    price?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    goodQuantitiesReturned?: boolean
    badQuantitiesReturned?: boolean
    netTotal?: boolean
    comments?: boolean
    variations?: boolean
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsIssueNoteLine"]>

  export type GoodsIssueNoteLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    name?: boolean
    price?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    goodQuantitiesReturned?: boolean
    badQuantitiesReturned?: boolean
    netTotal?: boolean
    comments?: boolean
    variations?: boolean
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsIssueNoteLine"]>

  export type GoodsIssueNoteLineSelectScalar = {
    noteId?: boolean
    lineId?: boolean
    productId?: boolean
    name?: boolean
    price?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    goodQuantitiesReturned?: boolean
    badQuantitiesReturned?: boolean
    netTotal?: boolean
    comments?: boolean
    variations?: boolean
  }

  export type GoodsIssueNoteLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type GoodsIssueNoteLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $GoodsIssueNoteLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsIssueNoteLine"
    objects: {
      note: Prisma.$GoodsIssueNotePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      lineId: string
      productId: string
      name: string
      price: number
      goodQuantities: number
      badQuantities: number
      goodQuantitiesReturned: number
      badQuantitiesReturned: number
      netTotal: number
      comments: string | null
      variations: Prisma.JsonValue | null
    }, ExtArgs["result"]["goodsIssueNoteLine"]>
    composites: {}
  }

  type GoodsIssueNoteLineGetPayload<S extends boolean | null | undefined | GoodsIssueNoteLineDefaultArgs> = $Result.GetResult<Prisma.$GoodsIssueNoteLinePayload, S>

  type GoodsIssueNoteLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsIssueNoteLineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsIssueNoteLineCountAggregateInputType | true
    }

  export interface GoodsIssueNoteLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsIssueNoteLine'], meta: { name: 'GoodsIssueNoteLine' } }
    /**
     * Find zero or one GoodsIssueNoteLine that matches the filter.
     * @param {GoodsIssueNoteLineFindUniqueArgs} args - Arguments to find a GoodsIssueNoteLine
     * @example
     * // Get one GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsIssueNoteLineFindUniqueArgs>(args: SelectSubset<T, GoodsIssueNoteLineFindUniqueArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsIssueNoteLine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsIssueNoteLineFindUniqueOrThrowArgs} args - Arguments to find a GoodsIssueNoteLine
     * @example
     * // Get one GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsIssueNoteLineFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsIssueNoteLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsIssueNoteLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineFindFirstArgs} args - Arguments to find a GoodsIssueNoteLine
     * @example
     * // Get one GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsIssueNoteLineFindFirstArgs>(args?: SelectSubset<T, GoodsIssueNoteLineFindFirstArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsIssueNoteLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineFindFirstOrThrowArgs} args - Arguments to find a GoodsIssueNoteLine
     * @example
     * // Get one GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsIssueNoteLineFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsIssueNoteLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsIssueNoteLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsIssueNoteLines
     * const goodsIssueNoteLines = await prisma.goodsIssueNoteLine.findMany()
     * 
     * // Get first 10 GoodsIssueNoteLines
     * const goodsIssueNoteLines = await prisma.goodsIssueNoteLine.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsIssueNoteLineWithNoteIdOnly = await prisma.goodsIssueNoteLine.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsIssueNoteLineFindManyArgs>(args?: SelectSubset<T, GoodsIssueNoteLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsIssueNoteLine.
     * @param {GoodsIssueNoteLineCreateArgs} args - Arguments to create a GoodsIssueNoteLine.
     * @example
     * // Create one GoodsIssueNoteLine
     * const GoodsIssueNoteLine = await prisma.goodsIssueNoteLine.create({
     *   data: {
     *     // ... data to create a GoodsIssueNoteLine
     *   }
     * })
     * 
     */
    create<T extends GoodsIssueNoteLineCreateArgs>(args: SelectSubset<T, GoodsIssueNoteLineCreateArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsIssueNoteLines.
     * @param {GoodsIssueNoteLineCreateManyArgs} args - Arguments to create many GoodsIssueNoteLines.
     * @example
     * // Create many GoodsIssueNoteLines
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsIssueNoteLineCreateManyArgs>(args?: SelectSubset<T, GoodsIssueNoteLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsIssueNoteLines and returns the data saved in the database.
     * @param {GoodsIssueNoteLineCreateManyAndReturnArgs} args - Arguments to create many GoodsIssueNoteLines.
     * @example
     * // Create many GoodsIssueNoteLines
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsIssueNoteLines and only return the `noteId`
     * const goodsIssueNoteLineWithNoteIdOnly = await prisma.goodsIssueNoteLine.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsIssueNoteLineCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsIssueNoteLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsIssueNoteLine.
     * @param {GoodsIssueNoteLineDeleteArgs} args - Arguments to delete one GoodsIssueNoteLine.
     * @example
     * // Delete one GoodsIssueNoteLine
     * const GoodsIssueNoteLine = await prisma.goodsIssueNoteLine.delete({
     *   where: {
     *     // ... filter to delete one GoodsIssueNoteLine
     *   }
     * })
     * 
     */
    delete<T extends GoodsIssueNoteLineDeleteArgs>(args: SelectSubset<T, GoodsIssueNoteLineDeleteArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsIssueNoteLine.
     * @param {GoodsIssueNoteLineUpdateArgs} args - Arguments to update one GoodsIssueNoteLine.
     * @example
     * // Update one GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsIssueNoteLineUpdateArgs>(args: SelectSubset<T, GoodsIssueNoteLineUpdateArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsIssueNoteLines.
     * @param {GoodsIssueNoteLineDeleteManyArgs} args - Arguments to filter GoodsIssueNoteLines to delete.
     * @example
     * // Delete a few GoodsIssueNoteLines
     * const { count } = await prisma.goodsIssueNoteLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsIssueNoteLineDeleteManyArgs>(args?: SelectSubset<T, GoodsIssueNoteLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsIssueNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsIssueNoteLines
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsIssueNoteLineUpdateManyArgs>(args: SelectSubset<T, GoodsIssueNoteLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsIssueNoteLine.
     * @param {GoodsIssueNoteLineUpsertArgs} args - Arguments to update or create a GoodsIssueNoteLine.
     * @example
     * // Update or create a GoodsIssueNoteLine
     * const goodsIssueNoteLine = await prisma.goodsIssueNoteLine.upsert({
     *   create: {
     *     // ... data to create a GoodsIssueNoteLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsIssueNoteLine we want to update
     *   }
     * })
     */
    upsert<T extends GoodsIssueNoteLineUpsertArgs>(args: SelectSubset<T, GoodsIssueNoteLineUpsertArgs<ExtArgs>>): Prisma__GoodsIssueNoteLineClient<$Result.GetResult<Prisma.$GoodsIssueNoteLinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsIssueNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineCountArgs} args - Arguments to filter GoodsIssueNoteLines to count.
     * @example
     * // Count the number of GoodsIssueNoteLines
     * const count = await prisma.goodsIssueNoteLine.count({
     *   where: {
     *     // ... the filter for the GoodsIssueNoteLines we want to count
     *   }
     * })
    **/
    count<T extends GoodsIssueNoteLineCountArgs>(
      args?: Subset<T, GoodsIssueNoteLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsIssueNoteLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsIssueNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsIssueNoteLineAggregateArgs>(args: Subset<T, GoodsIssueNoteLineAggregateArgs>): Prisma.PrismaPromise<GetGoodsIssueNoteLineAggregateType<T>>

    /**
     * Group by GoodsIssueNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsIssueNoteLineGroupByArgs} args - Group by arguments.
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
      T extends GoodsIssueNoteLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsIssueNoteLineGroupByArgs['orderBy'] }
        : { orderBy?: GoodsIssueNoteLineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsIssueNoteLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsIssueNoteLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsIssueNoteLine model
   */
  readonly fields: GoodsIssueNoteLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsIssueNoteLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsIssueNoteLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends GoodsIssueNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNoteDefaultArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the GoodsIssueNoteLine model
   */ 
  interface GoodsIssueNoteLineFieldRefs {
    readonly noteId: FieldRef<"GoodsIssueNoteLine", 'String'>
    readonly lineId: FieldRef<"GoodsIssueNoteLine", 'String'>
    readonly productId: FieldRef<"GoodsIssueNoteLine", 'String'>
    readonly name: FieldRef<"GoodsIssueNoteLine", 'String'>
    readonly price: FieldRef<"GoodsIssueNoteLine", 'Float'>
    readonly goodQuantities: FieldRef<"GoodsIssueNoteLine", 'Int'>
    readonly badQuantities: FieldRef<"GoodsIssueNoteLine", 'Int'>
    readonly goodQuantitiesReturned: FieldRef<"GoodsIssueNoteLine", 'Int'>
    readonly badQuantitiesReturned: FieldRef<"GoodsIssueNoteLine", 'Int'>
    readonly netTotal: FieldRef<"GoodsIssueNoteLine", 'Float'>
    readonly comments: FieldRef<"GoodsIssueNoteLine", 'String'>
    readonly variations: FieldRef<"GoodsIssueNoteLine", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * GoodsIssueNoteLine findUnique
   */
  export type GoodsIssueNoteLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNoteLine to fetch.
     */
    where: GoodsIssueNoteLineWhereUniqueInput
  }

  /**
   * GoodsIssueNoteLine findUniqueOrThrow
   */
  export type GoodsIssueNoteLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNoteLine to fetch.
     */
    where: GoodsIssueNoteLineWhereUniqueInput
  }

  /**
   * GoodsIssueNoteLine findFirst
   */
  export type GoodsIssueNoteLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNoteLine to fetch.
     */
    where?: GoodsIssueNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNoteLines to fetch.
     */
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsIssueNoteLines.
     */
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsIssueNoteLines.
     */
    distinct?: GoodsIssueNoteLineScalarFieldEnum | GoodsIssueNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsIssueNoteLine findFirstOrThrow
   */
  export type GoodsIssueNoteLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNoteLine to fetch.
     */
    where?: GoodsIssueNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNoteLines to fetch.
     */
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsIssueNoteLines.
     */
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsIssueNoteLines.
     */
    distinct?: GoodsIssueNoteLineScalarFieldEnum | GoodsIssueNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsIssueNoteLine findMany
   */
  export type GoodsIssueNoteLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsIssueNoteLines to fetch.
     */
    where?: GoodsIssueNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsIssueNoteLines to fetch.
     */
    orderBy?: GoodsIssueNoteLineOrderByWithRelationInput | GoodsIssueNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsIssueNoteLines.
     */
    cursor?: GoodsIssueNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsIssueNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsIssueNoteLines.
     */
    skip?: number
    distinct?: GoodsIssueNoteLineScalarFieldEnum | GoodsIssueNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsIssueNoteLine create
   */
  export type GoodsIssueNoteLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsIssueNoteLine.
     */
    data: XOR<GoodsIssueNoteLineCreateInput, GoodsIssueNoteLineUncheckedCreateInput>
  }

  /**
   * GoodsIssueNoteLine createMany
   */
  export type GoodsIssueNoteLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsIssueNoteLines.
     */
    data: GoodsIssueNoteLineCreateManyInput | GoodsIssueNoteLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsIssueNoteLine createManyAndReturn
   */
  export type GoodsIssueNoteLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsIssueNoteLines.
     */
    data: GoodsIssueNoteLineCreateManyInput | GoodsIssueNoteLineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GoodsIssueNoteLine update
   */
  export type GoodsIssueNoteLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsIssueNoteLine.
     */
    data: XOR<GoodsIssueNoteLineUpdateInput, GoodsIssueNoteLineUncheckedUpdateInput>
    /**
     * Choose, which GoodsIssueNoteLine to update.
     */
    where: GoodsIssueNoteLineWhereUniqueInput
  }

  /**
   * GoodsIssueNoteLine updateMany
   */
  export type GoodsIssueNoteLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsIssueNoteLines.
     */
    data: XOR<GoodsIssueNoteLineUpdateManyMutationInput, GoodsIssueNoteLineUncheckedUpdateManyInput>
    /**
     * Filter which GoodsIssueNoteLines to update
     */
    where?: GoodsIssueNoteLineWhereInput
  }

  /**
   * GoodsIssueNoteLine upsert
   */
  export type GoodsIssueNoteLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsIssueNoteLine to update in case it exists.
     */
    where: GoodsIssueNoteLineWhereUniqueInput
    /**
     * In case the GoodsIssueNoteLine found by the `where` argument doesn't exist, create a new GoodsIssueNoteLine with this data.
     */
    create: XOR<GoodsIssueNoteLineCreateInput, GoodsIssueNoteLineUncheckedCreateInput>
    /**
     * In case the GoodsIssueNoteLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsIssueNoteLineUpdateInput, GoodsIssueNoteLineUncheckedUpdateInput>
  }

  /**
   * GoodsIssueNoteLine delete
   */
  export type GoodsIssueNoteLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
    /**
     * Filter which GoodsIssueNoteLine to delete.
     */
    where: GoodsIssueNoteLineWhereUniqueInput
  }

  /**
   * GoodsIssueNoteLine deleteMany
   */
  export type GoodsIssueNoteLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsIssueNoteLines to delete
     */
    where?: GoodsIssueNoteLineWhereInput
  }

  /**
   * GoodsIssueNoteLine without action
   */
  export type GoodsIssueNoteLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsIssueNoteLine
     */
    select?: GoodsIssueNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsIssueNoteLineInclude<ExtArgs> | null
  }


  /**
   * Model Purpose
   */

  export type AggregatePurpose = {
    _count: PurposeCountAggregateOutputType | null
    _avg: PurposeAvgAggregateOutputType | null
    _sum: PurposeSumAggregateOutputType | null
    _min: PurposeMinAggregateOutputType | null
    _max: PurposeMaxAggregateOutputType | null
  }

  export type PurposeAvgAggregateOutputType = {
    id: number | null
  }

  export type PurposeSumAggregateOutputType = {
    id: number | null
  }

  export type PurposeMinAggregateOutputType = {
    id: number | null
    description: string | null
    notes: string | null
    details: string | null
    noteId: string | null
  }

  export type PurposeMaxAggregateOutputType = {
    id: number | null
    description: string | null
    notes: string | null
    details: string | null
    noteId: string | null
  }

  export type PurposeCountAggregateOutputType = {
    id: number
    description: number
    notes: number
    details: number
    noteId: number
    _all: number
  }


  export type PurposeAvgAggregateInputType = {
    id?: true
  }

  export type PurposeSumAggregateInputType = {
    id?: true
  }

  export type PurposeMinAggregateInputType = {
    id?: true
    description?: true
    notes?: true
    details?: true
    noteId?: true
  }

  export type PurposeMaxAggregateInputType = {
    id?: true
    description?: true
    notes?: true
    details?: true
    noteId?: true
  }

  export type PurposeCountAggregateInputType = {
    id?: true
    description?: true
    notes?: true
    details?: true
    noteId?: true
    _all?: true
  }

  export type PurposeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purpose to aggregate.
     */
    where?: PurposeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purposes to fetch.
     */
    orderBy?: PurposeOrderByWithRelationInput | PurposeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurposeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purposes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purposes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purposes
    **/
    _count?: true | PurposeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurposeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurposeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurposeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurposeMaxAggregateInputType
  }

  export type GetPurposeAggregateType<T extends PurposeAggregateArgs> = {
        [P in keyof T & keyof AggregatePurpose]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurpose[P]>
      : GetScalarType<T[P], AggregatePurpose[P]>
  }




  export type PurposeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurposeWhereInput
    orderBy?: PurposeOrderByWithAggregationInput | PurposeOrderByWithAggregationInput[]
    by: PurposeScalarFieldEnum[] | PurposeScalarFieldEnum
    having?: PurposeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurposeCountAggregateInputType | true
    _avg?: PurposeAvgAggregateInputType
    _sum?: PurposeSumAggregateInputType
    _min?: PurposeMinAggregateInputType
    _max?: PurposeMaxAggregateInputType
  }

  export type PurposeGroupByOutputType = {
    id: number
    description: string
    notes: string
    details: string | null
    noteId: string
    _count: PurposeCountAggregateOutputType | null
    _avg: PurposeAvgAggregateOutputType | null
    _sum: PurposeSumAggregateOutputType | null
    _min: PurposeMinAggregateOutputType | null
    _max: PurposeMaxAggregateOutputType | null
  }

  type GetPurposeGroupByPayload<T extends PurposeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurposeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurposeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurposeGroupByOutputType[P]>
            : GetScalarType<T[P], PurposeGroupByOutputType[P]>
        }
      >
    >


  export type PurposeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    notes?: boolean
    details?: boolean
    noteId?: boolean
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purpose"]>

  export type PurposeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    notes?: boolean
    details?: boolean
    noteId?: boolean
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purpose"]>

  export type PurposeSelectScalar = {
    id?: boolean
    description?: boolean
    notes?: boolean
    details?: boolean
    noteId?: boolean
  }

  export type PurposeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }
  export type PurposeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }

  export type $PurposePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Purpose"
    objects: {
      note: Prisma.$GoodsIssueNotePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      description: string
      notes: string
      details: string | null
      noteId: string
    }, ExtArgs["result"]["purpose"]>
    composites: {}
  }

  type PurposeGetPayload<S extends boolean | null | undefined | PurposeDefaultArgs> = $Result.GetResult<Prisma.$PurposePayload, S>

  type PurposeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurposeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurposeCountAggregateInputType | true
    }

  export interface PurposeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Purpose'], meta: { name: 'Purpose' } }
    /**
     * Find zero or one Purpose that matches the filter.
     * @param {PurposeFindUniqueArgs} args - Arguments to find a Purpose
     * @example
     * // Get one Purpose
     * const purpose = await prisma.purpose.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurposeFindUniqueArgs>(args: SelectSubset<T, PurposeFindUniqueArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Purpose that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurposeFindUniqueOrThrowArgs} args - Arguments to find a Purpose
     * @example
     * // Get one Purpose
     * const purpose = await prisma.purpose.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurposeFindUniqueOrThrowArgs>(args: SelectSubset<T, PurposeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Purpose that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeFindFirstArgs} args - Arguments to find a Purpose
     * @example
     * // Get one Purpose
     * const purpose = await prisma.purpose.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurposeFindFirstArgs>(args?: SelectSubset<T, PurposeFindFirstArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Purpose that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeFindFirstOrThrowArgs} args - Arguments to find a Purpose
     * @example
     * // Get one Purpose
     * const purpose = await prisma.purpose.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurposeFindFirstOrThrowArgs>(args?: SelectSubset<T, PurposeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Purposes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purposes
     * const purposes = await prisma.purpose.findMany()
     * 
     * // Get first 10 Purposes
     * const purposes = await prisma.purpose.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purposeWithIdOnly = await prisma.purpose.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurposeFindManyArgs>(args?: SelectSubset<T, PurposeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Purpose.
     * @param {PurposeCreateArgs} args - Arguments to create a Purpose.
     * @example
     * // Create one Purpose
     * const Purpose = await prisma.purpose.create({
     *   data: {
     *     // ... data to create a Purpose
     *   }
     * })
     * 
     */
    create<T extends PurposeCreateArgs>(args: SelectSubset<T, PurposeCreateArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Purposes.
     * @param {PurposeCreateManyArgs} args - Arguments to create many Purposes.
     * @example
     * // Create many Purposes
     * const purpose = await prisma.purpose.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurposeCreateManyArgs>(args?: SelectSubset<T, PurposeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purposes and returns the data saved in the database.
     * @param {PurposeCreateManyAndReturnArgs} args - Arguments to create many Purposes.
     * @example
     * // Create many Purposes
     * const purpose = await prisma.purpose.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purposes and only return the `id`
     * const purposeWithIdOnly = await prisma.purpose.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurposeCreateManyAndReturnArgs>(args?: SelectSubset<T, PurposeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Purpose.
     * @param {PurposeDeleteArgs} args - Arguments to delete one Purpose.
     * @example
     * // Delete one Purpose
     * const Purpose = await prisma.purpose.delete({
     *   where: {
     *     // ... filter to delete one Purpose
     *   }
     * })
     * 
     */
    delete<T extends PurposeDeleteArgs>(args: SelectSubset<T, PurposeDeleteArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Purpose.
     * @param {PurposeUpdateArgs} args - Arguments to update one Purpose.
     * @example
     * // Update one Purpose
     * const purpose = await prisma.purpose.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurposeUpdateArgs>(args: SelectSubset<T, PurposeUpdateArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Purposes.
     * @param {PurposeDeleteManyArgs} args - Arguments to filter Purposes to delete.
     * @example
     * // Delete a few Purposes
     * const { count } = await prisma.purpose.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurposeDeleteManyArgs>(args?: SelectSubset<T, PurposeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purposes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purposes
     * const purpose = await prisma.purpose.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurposeUpdateManyArgs>(args: SelectSubset<T, PurposeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Purpose.
     * @param {PurposeUpsertArgs} args - Arguments to update or create a Purpose.
     * @example
     * // Update or create a Purpose
     * const purpose = await prisma.purpose.upsert({
     *   create: {
     *     // ... data to create a Purpose
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purpose we want to update
     *   }
     * })
     */
    upsert<T extends PurposeUpsertArgs>(args: SelectSubset<T, PurposeUpsertArgs<ExtArgs>>): Prisma__PurposeClient<$Result.GetResult<Prisma.$PurposePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Purposes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeCountArgs} args - Arguments to filter Purposes to count.
     * @example
     * // Count the number of Purposes
     * const count = await prisma.purpose.count({
     *   where: {
     *     // ... the filter for the Purposes we want to count
     *   }
     * })
    **/
    count<T extends PurposeCountArgs>(
      args?: Subset<T, PurposeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurposeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purpose.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PurposeAggregateArgs>(args: Subset<T, PurposeAggregateArgs>): Prisma.PrismaPromise<GetPurposeAggregateType<T>>

    /**
     * Group by Purpose.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurposeGroupByArgs} args - Group by arguments.
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
      T extends PurposeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurposeGroupByArgs['orderBy'] }
        : { orderBy?: PurposeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PurposeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurposeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Purpose model
   */
  readonly fields: PurposeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purpose.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurposeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends GoodsIssueNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNoteDefaultArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Purpose model
   */ 
  interface PurposeFieldRefs {
    readonly id: FieldRef<"Purpose", 'Int'>
    readonly description: FieldRef<"Purpose", 'String'>
    readonly notes: FieldRef<"Purpose", 'String'>
    readonly details: FieldRef<"Purpose", 'String'>
    readonly noteId: FieldRef<"Purpose", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Purpose findUnique
   */
  export type PurposeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter, which Purpose to fetch.
     */
    where: PurposeWhereUniqueInput
  }

  /**
   * Purpose findUniqueOrThrow
   */
  export type PurposeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter, which Purpose to fetch.
     */
    where: PurposeWhereUniqueInput
  }

  /**
   * Purpose findFirst
   */
  export type PurposeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter, which Purpose to fetch.
     */
    where?: PurposeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purposes to fetch.
     */
    orderBy?: PurposeOrderByWithRelationInput | PurposeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purposes.
     */
    cursor?: PurposeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purposes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purposes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purposes.
     */
    distinct?: PurposeScalarFieldEnum | PurposeScalarFieldEnum[]
  }

  /**
   * Purpose findFirstOrThrow
   */
  export type PurposeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter, which Purpose to fetch.
     */
    where?: PurposeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purposes to fetch.
     */
    orderBy?: PurposeOrderByWithRelationInput | PurposeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purposes.
     */
    cursor?: PurposeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purposes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purposes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purposes.
     */
    distinct?: PurposeScalarFieldEnum | PurposeScalarFieldEnum[]
  }

  /**
   * Purpose findMany
   */
  export type PurposeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter, which Purposes to fetch.
     */
    where?: PurposeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purposes to fetch.
     */
    orderBy?: PurposeOrderByWithRelationInput | PurposeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purposes.
     */
    cursor?: PurposeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purposes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purposes.
     */
    skip?: number
    distinct?: PurposeScalarFieldEnum | PurposeScalarFieldEnum[]
  }

  /**
   * Purpose create
   */
  export type PurposeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * The data needed to create a Purpose.
     */
    data: XOR<PurposeCreateInput, PurposeUncheckedCreateInput>
  }

  /**
   * Purpose createMany
   */
  export type PurposeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Purposes.
     */
    data: PurposeCreateManyInput | PurposeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Purpose createManyAndReturn
   */
  export type PurposeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Purposes.
     */
    data: PurposeCreateManyInput | PurposeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purpose update
   */
  export type PurposeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * The data needed to update a Purpose.
     */
    data: XOR<PurposeUpdateInput, PurposeUncheckedUpdateInput>
    /**
     * Choose, which Purpose to update.
     */
    where: PurposeWhereUniqueInput
  }

  /**
   * Purpose updateMany
   */
  export type PurposeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Purposes.
     */
    data: XOR<PurposeUpdateManyMutationInput, PurposeUncheckedUpdateManyInput>
    /**
     * Filter which Purposes to update
     */
    where?: PurposeWhereInput
  }

  /**
   * Purpose upsert
   */
  export type PurposeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * The filter to search for the Purpose to update in case it exists.
     */
    where: PurposeWhereUniqueInput
    /**
     * In case the Purpose found by the `where` argument doesn't exist, create a new Purpose with this data.
     */
    create: XOR<PurposeCreateInput, PurposeUncheckedCreateInput>
    /**
     * In case the Purpose was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurposeUpdateInput, PurposeUncheckedUpdateInput>
  }

  /**
   * Purpose delete
   */
  export type PurposeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
    /**
     * Filter which Purpose to delete.
     */
    where: PurposeWhereUniqueInput
  }

  /**
   * Purpose deleteMany
   */
  export type PurposeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purposes to delete
     */
    where?: PurposeWhereInput
  }

  /**
   * Purpose without action
   */
  export type PurposeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purpose
     */
    select?: PurposeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurposeInclude<ExtArgs> | null
  }


  /**
   * Model GoodsReturnNote
   */

  export type AggregateGoodsReturnNote = {
    _count: GoodsReturnNoteCountAggregateOutputType | null
    _avg: GoodsReturnNoteAvgAggregateOutputType | null
    _sum: GoodsReturnNoteSumAggregateOutputType | null
    _min: GoodsReturnNoteMinAggregateOutputType | null
    _max: GoodsReturnNoteMaxAggregateOutputType | null
  }

  export type GoodsReturnNoteAvgAggregateOutputType = {
    securityDepositWithheld: number | null
  }

  export type GoodsReturnNoteSumAggregateOutputType = {
    securityDepositWithheld: number | null
  }

  export type GoodsReturnNoteMinAggregateOutputType = {
    noteId: string | null
    goodsIssueNoteId: string | null
    securityDepositWithheld: number | null
    issuedAt: Date | null
  }

  export type GoodsReturnNoteMaxAggregateOutputType = {
    noteId: string | null
    goodsIssueNoteId: string | null
    securityDepositWithheld: number | null
    issuedAt: Date | null
  }

  export type GoodsReturnNoteCountAggregateOutputType = {
    noteId: number
    goodsIssueNoteId: number
    securityDepositWithheld: number
    issuedAt: number
    _all: number
  }


  export type GoodsReturnNoteAvgAggregateInputType = {
    securityDepositWithheld?: true
  }

  export type GoodsReturnNoteSumAggregateInputType = {
    securityDepositWithheld?: true
  }

  export type GoodsReturnNoteMinAggregateInputType = {
    noteId?: true
    goodsIssueNoteId?: true
    securityDepositWithheld?: true
    issuedAt?: true
  }

  export type GoodsReturnNoteMaxAggregateInputType = {
    noteId?: true
    goodsIssueNoteId?: true
    securityDepositWithheld?: true
    issuedAt?: true
  }

  export type GoodsReturnNoteCountAggregateInputType = {
    noteId?: true
    goodsIssueNoteId?: true
    securityDepositWithheld?: true
    issuedAt?: true
    _all?: true
  }

  export type GoodsReturnNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReturnNote to aggregate.
     */
    where?: GoodsReturnNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNotes to fetch.
     */
    orderBy?: GoodsReturnNoteOrderByWithRelationInput | GoodsReturnNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsReturnNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsReturnNotes
    **/
    _count?: true | GoodsReturnNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsReturnNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsReturnNoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsReturnNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsReturnNoteMaxAggregateInputType
  }

  export type GetGoodsReturnNoteAggregateType<T extends GoodsReturnNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsReturnNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsReturnNote[P]>
      : GetScalarType<T[P], AggregateGoodsReturnNote[P]>
  }




  export type GoodsReturnNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReturnNoteWhereInput
    orderBy?: GoodsReturnNoteOrderByWithAggregationInput | GoodsReturnNoteOrderByWithAggregationInput[]
    by: GoodsReturnNoteScalarFieldEnum[] | GoodsReturnNoteScalarFieldEnum
    having?: GoodsReturnNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsReturnNoteCountAggregateInputType | true
    _avg?: GoodsReturnNoteAvgAggregateInputType
    _sum?: GoodsReturnNoteSumAggregateInputType
    _min?: GoodsReturnNoteMinAggregateInputType
    _max?: GoodsReturnNoteMaxAggregateInputType
  }

  export type GoodsReturnNoteGroupByOutputType = {
    noteId: string
    goodsIssueNoteId: string
    securityDepositWithheld: number
    issuedAt: Date
    _count: GoodsReturnNoteCountAggregateOutputType | null
    _avg: GoodsReturnNoteAvgAggregateOutputType | null
    _sum: GoodsReturnNoteSumAggregateOutputType | null
    _min: GoodsReturnNoteMinAggregateOutputType | null
    _max: GoodsReturnNoteMaxAggregateOutputType | null
  }

  type GetGoodsReturnNoteGroupByPayload<T extends GoodsReturnNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsReturnNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsReturnNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsReturnNoteGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsReturnNoteGroupByOutputType[P]>
        }
      >
    >


  export type GoodsReturnNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    goodsIssueNoteId?: boolean
    securityDepositWithheld?: boolean
    issuedAt?: boolean
    goodsIssueNote?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    lines?: boolean | GoodsReturnNote$linesArgs<ExtArgs>
    _count?: boolean | GoodsReturnNoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReturnNote"]>

  export type GoodsReturnNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    goodsIssueNoteId?: boolean
    securityDepositWithheld?: boolean
    issuedAt?: boolean
    goodsIssueNote?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReturnNote"]>

  export type GoodsReturnNoteSelectScalar = {
    noteId?: boolean
    goodsIssueNoteId?: boolean
    securityDepositWithheld?: boolean
    issuedAt?: boolean
  }

  export type GoodsReturnNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goodsIssueNote?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
    lines?: boolean | GoodsReturnNote$linesArgs<ExtArgs>
    _count?: boolean | GoodsReturnNoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoodsReturnNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    goodsIssueNote?: boolean | GoodsIssueNoteDefaultArgs<ExtArgs>
  }

  export type $GoodsReturnNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsReturnNote"
    objects: {
      goodsIssueNote: Prisma.$GoodsIssueNotePayload<ExtArgs>
      lines: Prisma.$GoodsReturnNoteLinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      goodsIssueNoteId: string
      securityDepositWithheld: number
      issuedAt: Date
    }, ExtArgs["result"]["goodsReturnNote"]>
    composites: {}
  }

  type GoodsReturnNoteGetPayload<S extends boolean | null | undefined | GoodsReturnNoteDefaultArgs> = $Result.GetResult<Prisma.$GoodsReturnNotePayload, S>

  type GoodsReturnNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsReturnNoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsReturnNoteCountAggregateInputType | true
    }

  export interface GoodsReturnNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsReturnNote'], meta: { name: 'GoodsReturnNote' } }
    /**
     * Find zero or one GoodsReturnNote that matches the filter.
     * @param {GoodsReturnNoteFindUniqueArgs} args - Arguments to find a GoodsReturnNote
     * @example
     * // Get one GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsReturnNoteFindUniqueArgs>(args: SelectSubset<T, GoodsReturnNoteFindUniqueArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsReturnNote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsReturnNoteFindUniqueOrThrowArgs} args - Arguments to find a GoodsReturnNote
     * @example
     * // Get one GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsReturnNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsReturnNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsReturnNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteFindFirstArgs} args - Arguments to find a GoodsReturnNote
     * @example
     * // Get one GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsReturnNoteFindFirstArgs>(args?: SelectSubset<T, GoodsReturnNoteFindFirstArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsReturnNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteFindFirstOrThrowArgs} args - Arguments to find a GoodsReturnNote
     * @example
     * // Get one GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsReturnNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsReturnNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsReturnNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsReturnNotes
     * const goodsReturnNotes = await prisma.goodsReturnNote.findMany()
     * 
     * // Get first 10 GoodsReturnNotes
     * const goodsReturnNotes = await prisma.goodsReturnNote.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsReturnNoteWithNoteIdOnly = await prisma.goodsReturnNote.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsReturnNoteFindManyArgs>(args?: SelectSubset<T, GoodsReturnNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsReturnNote.
     * @param {GoodsReturnNoteCreateArgs} args - Arguments to create a GoodsReturnNote.
     * @example
     * // Create one GoodsReturnNote
     * const GoodsReturnNote = await prisma.goodsReturnNote.create({
     *   data: {
     *     // ... data to create a GoodsReturnNote
     *   }
     * })
     * 
     */
    create<T extends GoodsReturnNoteCreateArgs>(args: SelectSubset<T, GoodsReturnNoteCreateArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsReturnNotes.
     * @param {GoodsReturnNoteCreateManyArgs} args - Arguments to create many GoodsReturnNotes.
     * @example
     * // Create many GoodsReturnNotes
     * const goodsReturnNote = await prisma.goodsReturnNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsReturnNoteCreateManyArgs>(args?: SelectSubset<T, GoodsReturnNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsReturnNotes and returns the data saved in the database.
     * @param {GoodsReturnNoteCreateManyAndReturnArgs} args - Arguments to create many GoodsReturnNotes.
     * @example
     * // Create many GoodsReturnNotes
     * const goodsReturnNote = await prisma.goodsReturnNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsReturnNotes and only return the `noteId`
     * const goodsReturnNoteWithNoteIdOnly = await prisma.goodsReturnNote.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsReturnNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsReturnNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsReturnNote.
     * @param {GoodsReturnNoteDeleteArgs} args - Arguments to delete one GoodsReturnNote.
     * @example
     * // Delete one GoodsReturnNote
     * const GoodsReturnNote = await prisma.goodsReturnNote.delete({
     *   where: {
     *     // ... filter to delete one GoodsReturnNote
     *   }
     * })
     * 
     */
    delete<T extends GoodsReturnNoteDeleteArgs>(args: SelectSubset<T, GoodsReturnNoteDeleteArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsReturnNote.
     * @param {GoodsReturnNoteUpdateArgs} args - Arguments to update one GoodsReturnNote.
     * @example
     * // Update one GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsReturnNoteUpdateArgs>(args: SelectSubset<T, GoodsReturnNoteUpdateArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsReturnNotes.
     * @param {GoodsReturnNoteDeleteManyArgs} args - Arguments to filter GoodsReturnNotes to delete.
     * @example
     * // Delete a few GoodsReturnNotes
     * const { count } = await prisma.goodsReturnNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsReturnNoteDeleteManyArgs>(args?: SelectSubset<T, GoodsReturnNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsReturnNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsReturnNotes
     * const goodsReturnNote = await prisma.goodsReturnNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsReturnNoteUpdateManyArgs>(args: SelectSubset<T, GoodsReturnNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsReturnNote.
     * @param {GoodsReturnNoteUpsertArgs} args - Arguments to update or create a GoodsReturnNote.
     * @example
     * // Update or create a GoodsReturnNote
     * const goodsReturnNote = await prisma.goodsReturnNote.upsert({
     *   create: {
     *     // ... data to create a GoodsReturnNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsReturnNote we want to update
     *   }
     * })
     */
    upsert<T extends GoodsReturnNoteUpsertArgs>(args: SelectSubset<T, GoodsReturnNoteUpsertArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsReturnNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteCountArgs} args - Arguments to filter GoodsReturnNotes to count.
     * @example
     * // Count the number of GoodsReturnNotes
     * const count = await prisma.goodsReturnNote.count({
     *   where: {
     *     // ... the filter for the GoodsReturnNotes we want to count
     *   }
     * })
    **/
    count<T extends GoodsReturnNoteCountArgs>(
      args?: Subset<T, GoodsReturnNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsReturnNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsReturnNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsReturnNoteAggregateArgs>(args: Subset<T, GoodsReturnNoteAggregateArgs>): Prisma.PrismaPromise<GetGoodsReturnNoteAggregateType<T>>

    /**
     * Group by GoodsReturnNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteGroupByArgs} args - Group by arguments.
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
      T extends GoodsReturnNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsReturnNoteGroupByArgs['orderBy'] }
        : { orderBy?: GoodsReturnNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsReturnNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReturnNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsReturnNote model
   */
  readonly fields: GoodsReturnNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsReturnNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsReturnNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    goodsIssueNote<T extends GoodsIssueNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoodsIssueNoteDefaultArgs<ExtArgs>>): Prisma__GoodsIssueNoteClient<$Result.GetResult<Prisma.$GoodsIssueNotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lines<T extends GoodsReturnNote$linesArgs<ExtArgs> = {}>(args?: Subset<T, GoodsReturnNote$linesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the GoodsReturnNote model
   */ 
  interface GoodsReturnNoteFieldRefs {
    readonly noteId: FieldRef<"GoodsReturnNote", 'String'>
    readonly goodsIssueNoteId: FieldRef<"GoodsReturnNote", 'String'>
    readonly securityDepositWithheld: FieldRef<"GoodsReturnNote", 'Int'>
    readonly issuedAt: FieldRef<"GoodsReturnNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GoodsReturnNote findUnique
   */
  export type GoodsReturnNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNote to fetch.
     */
    where: GoodsReturnNoteWhereUniqueInput
  }

  /**
   * GoodsReturnNote findUniqueOrThrow
   */
  export type GoodsReturnNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNote to fetch.
     */
    where: GoodsReturnNoteWhereUniqueInput
  }

  /**
   * GoodsReturnNote findFirst
   */
  export type GoodsReturnNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNote to fetch.
     */
    where?: GoodsReturnNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNotes to fetch.
     */
    orderBy?: GoodsReturnNoteOrderByWithRelationInput | GoodsReturnNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReturnNotes.
     */
    cursor?: GoodsReturnNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReturnNotes.
     */
    distinct?: GoodsReturnNoteScalarFieldEnum | GoodsReturnNoteScalarFieldEnum[]
  }

  /**
   * GoodsReturnNote findFirstOrThrow
   */
  export type GoodsReturnNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNote to fetch.
     */
    where?: GoodsReturnNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNotes to fetch.
     */
    orderBy?: GoodsReturnNoteOrderByWithRelationInput | GoodsReturnNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReturnNotes.
     */
    cursor?: GoodsReturnNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReturnNotes.
     */
    distinct?: GoodsReturnNoteScalarFieldEnum | GoodsReturnNoteScalarFieldEnum[]
  }

  /**
   * GoodsReturnNote findMany
   */
  export type GoodsReturnNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNotes to fetch.
     */
    where?: GoodsReturnNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNotes to fetch.
     */
    orderBy?: GoodsReturnNoteOrderByWithRelationInput | GoodsReturnNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsReturnNotes.
     */
    cursor?: GoodsReturnNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNotes.
     */
    skip?: number
    distinct?: GoodsReturnNoteScalarFieldEnum | GoodsReturnNoteScalarFieldEnum[]
  }

  /**
   * GoodsReturnNote create
   */
  export type GoodsReturnNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsReturnNote.
     */
    data: XOR<GoodsReturnNoteCreateInput, GoodsReturnNoteUncheckedCreateInput>
  }

  /**
   * GoodsReturnNote createMany
   */
  export type GoodsReturnNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsReturnNotes.
     */
    data: GoodsReturnNoteCreateManyInput | GoodsReturnNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsReturnNote createManyAndReturn
   */
  export type GoodsReturnNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsReturnNotes.
     */
    data: GoodsReturnNoteCreateManyInput | GoodsReturnNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GoodsReturnNote update
   */
  export type GoodsReturnNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsReturnNote.
     */
    data: XOR<GoodsReturnNoteUpdateInput, GoodsReturnNoteUncheckedUpdateInput>
    /**
     * Choose, which GoodsReturnNote to update.
     */
    where: GoodsReturnNoteWhereUniqueInput
  }

  /**
   * GoodsReturnNote updateMany
   */
  export type GoodsReturnNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsReturnNotes.
     */
    data: XOR<GoodsReturnNoteUpdateManyMutationInput, GoodsReturnNoteUncheckedUpdateManyInput>
    /**
     * Filter which GoodsReturnNotes to update
     */
    where?: GoodsReturnNoteWhereInput
  }

  /**
   * GoodsReturnNote upsert
   */
  export type GoodsReturnNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsReturnNote to update in case it exists.
     */
    where: GoodsReturnNoteWhereUniqueInput
    /**
     * In case the GoodsReturnNote found by the `where` argument doesn't exist, create a new GoodsReturnNote with this data.
     */
    create: XOR<GoodsReturnNoteCreateInput, GoodsReturnNoteUncheckedCreateInput>
    /**
     * In case the GoodsReturnNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsReturnNoteUpdateInput, GoodsReturnNoteUncheckedUpdateInput>
  }

  /**
   * GoodsReturnNote delete
   */
  export type GoodsReturnNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
    /**
     * Filter which GoodsReturnNote to delete.
     */
    where: GoodsReturnNoteWhereUniqueInput
  }

  /**
   * GoodsReturnNote deleteMany
   */
  export type GoodsReturnNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReturnNotes to delete
     */
    where?: GoodsReturnNoteWhereInput
  }

  /**
   * GoodsReturnNote.lines
   */
  export type GoodsReturnNote$linesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    where?: GoodsReturnNoteLineWhereInput
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GoodsReturnNoteLineScalarFieldEnum | GoodsReturnNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReturnNote without action
   */
  export type GoodsReturnNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNote
     */
    select?: GoodsReturnNoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteInclude<ExtArgs> | null
  }


  /**
   * Model GoodsReturnNoteLine
   */

  export type AggregateGoodsReturnNoteLine = {
    _count: GoodsReturnNoteLineCountAggregateOutputType | null
    _avg: GoodsReturnNoteLineAvgAggregateOutputType | null
    _sum: GoodsReturnNoteLineSumAggregateOutputType | null
    _min: GoodsReturnNoteLineMinAggregateOutputType | null
    _max: GoodsReturnNoteLineMaxAggregateOutputType | null
  }

  export type GoodsReturnNoteLineAvgAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type GoodsReturnNoteLineSumAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type GoodsReturnNoteLineMinAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    description: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
    comments: string | null
  }

  export type GoodsReturnNoteLineMaxAggregateOutputType = {
    noteId: string | null
    lineId: string | null
    description: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
    comments: string | null
  }

  export type GoodsReturnNoteLineCountAggregateOutputType = {
    noteId: number
    lineId: number
    description: number
    productId: number
    goodQuantities: number
    badQuantities: number
    variations: number
    comments: number
    _all: number
  }


  export type GoodsReturnNoteLineAvgAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type GoodsReturnNoteLineSumAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type GoodsReturnNoteLineMinAggregateInputType = {
    noteId?: true
    lineId?: true
    description?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    comments?: true
  }

  export type GoodsReturnNoteLineMaxAggregateInputType = {
    noteId?: true
    lineId?: true
    description?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    comments?: true
  }

  export type GoodsReturnNoteLineCountAggregateInputType = {
    noteId?: true
    lineId?: true
    description?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    variations?: true
    comments?: true
    _all?: true
  }

  export type GoodsReturnNoteLineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReturnNoteLine to aggregate.
     */
    where?: GoodsReturnNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNoteLines to fetch.
     */
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GoodsReturnNoteLines
    **/
    _count?: true | GoodsReturnNoteLineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsReturnNoteLineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsReturnNoteLineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsReturnNoteLineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsReturnNoteLineMaxAggregateInputType
  }

  export type GetGoodsReturnNoteLineAggregateType<T extends GoodsReturnNoteLineAggregateArgs> = {
        [P in keyof T & keyof AggregateGoodsReturnNoteLine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoodsReturnNoteLine[P]>
      : GetScalarType<T[P], AggregateGoodsReturnNoteLine[P]>
  }




  export type GoodsReturnNoteLineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsReturnNoteLineWhereInput
    orderBy?: GoodsReturnNoteLineOrderByWithAggregationInput | GoodsReturnNoteLineOrderByWithAggregationInput[]
    by: GoodsReturnNoteLineScalarFieldEnum[] | GoodsReturnNoteLineScalarFieldEnum
    having?: GoodsReturnNoteLineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsReturnNoteLineCountAggregateInputType | true
    _avg?: GoodsReturnNoteLineAvgAggregateInputType
    _sum?: GoodsReturnNoteLineSumAggregateInputType
    _min?: GoodsReturnNoteLineMinAggregateInputType
    _max?: GoodsReturnNoteLineMaxAggregateInputType
  }

  export type GoodsReturnNoteLineGroupByOutputType = {
    noteId: string
    lineId: string
    description: string
    productId: string
    goodQuantities: number
    badQuantities: number
    variations: JsonValue | null
    comments: string | null
    _count: GoodsReturnNoteLineCountAggregateOutputType | null
    _avg: GoodsReturnNoteLineAvgAggregateOutputType | null
    _sum: GoodsReturnNoteLineSumAggregateOutputType | null
    _min: GoodsReturnNoteLineMinAggregateOutputType | null
    _max: GoodsReturnNoteLineMaxAggregateOutputType | null
  }

  type GetGoodsReturnNoteLineGroupByPayload<T extends GoodsReturnNoteLineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsReturnNoteLineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsReturnNoteLineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsReturnNoteLineGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsReturnNoteLineGroupByOutputType[P]>
        }
      >
    >


  export type GoodsReturnNoteLineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    description?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    variations?: boolean
    comments?: boolean
    note?: boolean | GoodsReturnNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReturnNoteLine"]>

  export type GoodsReturnNoteLineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    noteId?: boolean
    lineId?: boolean
    description?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    variations?: boolean
    comments?: boolean
    note?: boolean | GoodsReturnNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goodsReturnNoteLine"]>

  export type GoodsReturnNoteLineSelectScalar = {
    noteId?: boolean
    lineId?: boolean
    description?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    variations?: boolean
    comments?: boolean
  }

  export type GoodsReturnNoteLineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsReturnNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type GoodsReturnNoteLineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | GoodsReturnNoteDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $GoodsReturnNoteLinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GoodsReturnNoteLine"
    objects: {
      note: Prisma.$GoodsReturnNotePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      noteId: string
      lineId: string
      description: string
      productId: string
      goodQuantities: number
      badQuantities: number
      variations: Prisma.JsonValue | null
      comments: string | null
    }, ExtArgs["result"]["goodsReturnNoteLine"]>
    composites: {}
  }

  type GoodsReturnNoteLineGetPayload<S extends boolean | null | undefined | GoodsReturnNoteLineDefaultArgs> = $Result.GetResult<Prisma.$GoodsReturnNoteLinePayload, S>

  type GoodsReturnNoteLineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GoodsReturnNoteLineFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GoodsReturnNoteLineCountAggregateInputType | true
    }

  export interface GoodsReturnNoteLineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GoodsReturnNoteLine'], meta: { name: 'GoodsReturnNoteLine' } }
    /**
     * Find zero or one GoodsReturnNoteLine that matches the filter.
     * @param {GoodsReturnNoteLineFindUniqueArgs} args - Arguments to find a GoodsReturnNoteLine
     * @example
     * // Get one GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsReturnNoteLineFindUniqueArgs>(args: SelectSubset<T, GoodsReturnNoteLineFindUniqueArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GoodsReturnNoteLine that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GoodsReturnNoteLineFindUniqueOrThrowArgs} args - Arguments to find a GoodsReturnNoteLine
     * @example
     * // Get one GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsReturnNoteLineFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsReturnNoteLineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GoodsReturnNoteLine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineFindFirstArgs} args - Arguments to find a GoodsReturnNoteLine
     * @example
     * // Get one GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsReturnNoteLineFindFirstArgs>(args?: SelectSubset<T, GoodsReturnNoteLineFindFirstArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GoodsReturnNoteLine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineFindFirstOrThrowArgs} args - Arguments to find a GoodsReturnNoteLine
     * @example
     * // Get one GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsReturnNoteLineFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsReturnNoteLineFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GoodsReturnNoteLines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GoodsReturnNoteLines
     * const goodsReturnNoteLines = await prisma.goodsReturnNoteLine.findMany()
     * 
     * // Get first 10 GoodsReturnNoteLines
     * const goodsReturnNoteLines = await prisma.goodsReturnNoteLine.findMany({ take: 10 })
     * 
     * // Only select the `noteId`
     * const goodsReturnNoteLineWithNoteIdOnly = await prisma.goodsReturnNoteLine.findMany({ select: { noteId: true } })
     * 
     */
    findMany<T extends GoodsReturnNoteLineFindManyArgs>(args?: SelectSubset<T, GoodsReturnNoteLineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GoodsReturnNoteLine.
     * @param {GoodsReturnNoteLineCreateArgs} args - Arguments to create a GoodsReturnNoteLine.
     * @example
     * // Create one GoodsReturnNoteLine
     * const GoodsReturnNoteLine = await prisma.goodsReturnNoteLine.create({
     *   data: {
     *     // ... data to create a GoodsReturnNoteLine
     *   }
     * })
     * 
     */
    create<T extends GoodsReturnNoteLineCreateArgs>(args: SelectSubset<T, GoodsReturnNoteLineCreateArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GoodsReturnNoteLines.
     * @param {GoodsReturnNoteLineCreateManyArgs} args - Arguments to create many GoodsReturnNoteLines.
     * @example
     * // Create many GoodsReturnNoteLines
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsReturnNoteLineCreateManyArgs>(args?: SelectSubset<T, GoodsReturnNoteLineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GoodsReturnNoteLines and returns the data saved in the database.
     * @param {GoodsReturnNoteLineCreateManyAndReturnArgs} args - Arguments to create many GoodsReturnNoteLines.
     * @example
     * // Create many GoodsReturnNoteLines
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GoodsReturnNoteLines and only return the `noteId`
     * const goodsReturnNoteLineWithNoteIdOnly = await prisma.goodsReturnNoteLine.createManyAndReturn({ 
     *   select: { noteId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoodsReturnNoteLineCreateManyAndReturnArgs>(args?: SelectSubset<T, GoodsReturnNoteLineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GoodsReturnNoteLine.
     * @param {GoodsReturnNoteLineDeleteArgs} args - Arguments to delete one GoodsReturnNoteLine.
     * @example
     * // Delete one GoodsReturnNoteLine
     * const GoodsReturnNoteLine = await prisma.goodsReturnNoteLine.delete({
     *   where: {
     *     // ... filter to delete one GoodsReturnNoteLine
     *   }
     * })
     * 
     */
    delete<T extends GoodsReturnNoteLineDeleteArgs>(args: SelectSubset<T, GoodsReturnNoteLineDeleteArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GoodsReturnNoteLine.
     * @param {GoodsReturnNoteLineUpdateArgs} args - Arguments to update one GoodsReturnNoteLine.
     * @example
     * // Update one GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsReturnNoteLineUpdateArgs>(args: SelectSubset<T, GoodsReturnNoteLineUpdateArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GoodsReturnNoteLines.
     * @param {GoodsReturnNoteLineDeleteManyArgs} args - Arguments to filter GoodsReturnNoteLines to delete.
     * @example
     * // Delete a few GoodsReturnNoteLines
     * const { count } = await prisma.goodsReturnNoteLine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsReturnNoteLineDeleteManyArgs>(args?: SelectSubset<T, GoodsReturnNoteLineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GoodsReturnNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GoodsReturnNoteLines
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsReturnNoteLineUpdateManyArgs>(args: SelectSubset<T, GoodsReturnNoteLineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GoodsReturnNoteLine.
     * @param {GoodsReturnNoteLineUpsertArgs} args - Arguments to update or create a GoodsReturnNoteLine.
     * @example
     * // Update or create a GoodsReturnNoteLine
     * const goodsReturnNoteLine = await prisma.goodsReturnNoteLine.upsert({
     *   create: {
     *     // ... data to create a GoodsReturnNoteLine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GoodsReturnNoteLine we want to update
     *   }
     * })
     */
    upsert<T extends GoodsReturnNoteLineUpsertArgs>(args: SelectSubset<T, GoodsReturnNoteLineUpsertArgs<ExtArgs>>): Prisma__GoodsReturnNoteLineClient<$Result.GetResult<Prisma.$GoodsReturnNoteLinePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GoodsReturnNoteLines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineCountArgs} args - Arguments to filter GoodsReturnNoteLines to count.
     * @example
     * // Count the number of GoodsReturnNoteLines
     * const count = await prisma.goodsReturnNoteLine.count({
     *   where: {
     *     // ... the filter for the GoodsReturnNoteLines we want to count
     *   }
     * })
    **/
    count<T extends GoodsReturnNoteLineCountArgs>(
      args?: Subset<T, GoodsReturnNoteLineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsReturnNoteLineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GoodsReturnNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GoodsReturnNoteLineAggregateArgs>(args: Subset<T, GoodsReturnNoteLineAggregateArgs>): Prisma.PrismaPromise<GetGoodsReturnNoteLineAggregateType<T>>

    /**
     * Group by GoodsReturnNoteLine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsReturnNoteLineGroupByArgs} args - Group by arguments.
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
      T extends GoodsReturnNoteLineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsReturnNoteLineGroupByArgs['orderBy'] }
        : { orderBy?: GoodsReturnNoteLineGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GoodsReturnNoteLineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsReturnNoteLineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GoodsReturnNoteLine model
   */
  readonly fields: GoodsReturnNoteLineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GoodsReturnNoteLine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsReturnNoteLineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends GoodsReturnNoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GoodsReturnNoteDefaultArgs<ExtArgs>>): Prisma__GoodsReturnNoteClient<$Result.GetResult<Prisma.$GoodsReturnNotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the GoodsReturnNoteLine model
   */ 
  interface GoodsReturnNoteLineFieldRefs {
    readonly noteId: FieldRef<"GoodsReturnNoteLine", 'String'>
    readonly lineId: FieldRef<"GoodsReturnNoteLine", 'String'>
    readonly description: FieldRef<"GoodsReturnNoteLine", 'String'>
    readonly productId: FieldRef<"GoodsReturnNoteLine", 'String'>
    readonly goodQuantities: FieldRef<"GoodsReturnNoteLine", 'Int'>
    readonly badQuantities: FieldRef<"GoodsReturnNoteLine", 'Int'>
    readonly variations: FieldRef<"GoodsReturnNoteLine", 'Json'>
    readonly comments: FieldRef<"GoodsReturnNoteLine", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GoodsReturnNoteLine findUnique
   */
  export type GoodsReturnNoteLineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNoteLine to fetch.
     */
    where: GoodsReturnNoteLineWhereUniqueInput
  }

  /**
   * GoodsReturnNoteLine findUniqueOrThrow
   */
  export type GoodsReturnNoteLineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNoteLine to fetch.
     */
    where: GoodsReturnNoteLineWhereUniqueInput
  }

  /**
   * GoodsReturnNoteLine findFirst
   */
  export type GoodsReturnNoteLineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNoteLine to fetch.
     */
    where?: GoodsReturnNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNoteLines to fetch.
     */
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReturnNoteLines.
     */
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReturnNoteLines.
     */
    distinct?: GoodsReturnNoteLineScalarFieldEnum | GoodsReturnNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReturnNoteLine findFirstOrThrow
   */
  export type GoodsReturnNoteLineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNoteLine to fetch.
     */
    where?: GoodsReturnNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNoteLines to fetch.
     */
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GoodsReturnNoteLines.
     */
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNoteLines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GoodsReturnNoteLines.
     */
    distinct?: GoodsReturnNoteLineScalarFieldEnum | GoodsReturnNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReturnNoteLine findMany
   */
  export type GoodsReturnNoteLineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter, which GoodsReturnNoteLines to fetch.
     */
    where?: GoodsReturnNoteLineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GoodsReturnNoteLines to fetch.
     */
    orderBy?: GoodsReturnNoteLineOrderByWithRelationInput | GoodsReturnNoteLineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GoodsReturnNoteLines.
     */
    cursor?: GoodsReturnNoteLineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GoodsReturnNoteLines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GoodsReturnNoteLines.
     */
    skip?: number
    distinct?: GoodsReturnNoteLineScalarFieldEnum | GoodsReturnNoteLineScalarFieldEnum[]
  }

  /**
   * GoodsReturnNoteLine create
   */
  export type GoodsReturnNoteLineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to create a GoodsReturnNoteLine.
     */
    data: XOR<GoodsReturnNoteLineCreateInput, GoodsReturnNoteLineUncheckedCreateInput>
  }

  /**
   * GoodsReturnNoteLine createMany
   */
  export type GoodsReturnNoteLineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GoodsReturnNoteLines.
     */
    data: GoodsReturnNoteLineCreateManyInput | GoodsReturnNoteLineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GoodsReturnNoteLine createManyAndReturn
   */
  export type GoodsReturnNoteLineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GoodsReturnNoteLines.
     */
    data: GoodsReturnNoteLineCreateManyInput | GoodsReturnNoteLineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GoodsReturnNoteLine update
   */
  export type GoodsReturnNoteLineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * The data needed to update a GoodsReturnNoteLine.
     */
    data: XOR<GoodsReturnNoteLineUpdateInput, GoodsReturnNoteLineUncheckedUpdateInput>
    /**
     * Choose, which GoodsReturnNoteLine to update.
     */
    where: GoodsReturnNoteLineWhereUniqueInput
  }

  /**
   * GoodsReturnNoteLine updateMany
   */
  export type GoodsReturnNoteLineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GoodsReturnNoteLines.
     */
    data: XOR<GoodsReturnNoteLineUpdateManyMutationInput, GoodsReturnNoteLineUncheckedUpdateManyInput>
    /**
     * Filter which GoodsReturnNoteLines to update
     */
    where?: GoodsReturnNoteLineWhereInput
  }

  /**
   * GoodsReturnNoteLine upsert
   */
  export type GoodsReturnNoteLineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * The filter to search for the GoodsReturnNoteLine to update in case it exists.
     */
    where: GoodsReturnNoteLineWhereUniqueInput
    /**
     * In case the GoodsReturnNoteLine found by the `where` argument doesn't exist, create a new GoodsReturnNoteLine with this data.
     */
    create: XOR<GoodsReturnNoteLineCreateInput, GoodsReturnNoteLineUncheckedCreateInput>
    /**
     * In case the GoodsReturnNoteLine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsReturnNoteLineUpdateInput, GoodsReturnNoteLineUncheckedUpdateInput>
  }

  /**
   * GoodsReturnNoteLine delete
   */
  export type GoodsReturnNoteLineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
    /**
     * Filter which GoodsReturnNoteLine to delete.
     */
    where: GoodsReturnNoteLineWhereUniqueInput
  }

  /**
   * GoodsReturnNoteLine deleteMany
   */
  export type GoodsReturnNoteLineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GoodsReturnNoteLines to delete
     */
    where?: GoodsReturnNoteLineWhereInput
  }

  /**
   * GoodsReturnNoteLine without action
   */
  export type GoodsReturnNoteLineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoodsReturnNoteLine
     */
    select?: GoodsReturnNoteLineSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoodsReturnNoteLineInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type StockSumAggregateOutputType = {
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type StockMinAggregateOutputType = {
    stockId: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type StockMaxAggregateOutputType = {
    stockId: string | null
    productId: string | null
    goodQuantities: number | null
    badQuantities: number | null
  }

  export type StockCountAggregateOutputType = {
    stockId: number
    productId: number
    goodQuantities: number
    badQuantities: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type StockSumAggregateInputType = {
    goodQuantities?: true
    badQuantities?: true
  }

  export type StockMinAggregateInputType = {
    stockId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
  }

  export type StockMaxAggregateInputType = {
    stockId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
  }

  export type StockCountAggregateInputType = {
    stockId?: true
    productId?: true
    goodQuantities?: true
    badQuantities?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    stockId: string
    productId: string
    goodQuantities: number
    badQuantities: number
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    stockId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    stockId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    stockId?: boolean
    productId?: boolean
    goodQuantities?: boolean
    badQuantities?: boolean
  }

  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      stockId: string
      productId: string
      goodQuantities: number
      badQuantities: number
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `stockId`
     * const stockWithStockIdOnly = await prisma.stock.findMany({ select: { stockId: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `stockId`
     * const stockWithStockIdOnly = await prisma.stock.createManyAndReturn({ 
     *   select: { stockId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
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
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Stock model
   */ 
  interface StockFieldRefs {
    readonly stockId: FieldRef<"Stock", 'String'>
    readonly productId: FieldRef<"Stock", 'String'>
    readonly goodQuantities: FieldRef<"Stock", 'Int'>
    readonly badQuantities: FieldRef<"Stock", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model Sequence
   */

  export type AggregateSequence = {
    _count: SequenceCountAggregateOutputType | null
    _avg: SequenceAvgAggregateOutputType | null
    _sum: SequenceSumAggregateOutputType | null
    _min: SequenceMinAggregateOutputType | null
    _max: SequenceMaxAggregateOutputType | null
  }

  export type SequenceAvgAggregateOutputType = {
    value: number | null
  }

  export type SequenceSumAggregateOutputType = {
    value: number | null
  }

  export type SequenceMinAggregateOutputType = {
    name: string | null
    value: number | null
  }

  export type SequenceMaxAggregateOutputType = {
    name: string | null
    value: number | null
  }

  export type SequenceCountAggregateOutputType = {
    name: number
    value: number
    _all: number
  }


  export type SequenceAvgAggregateInputType = {
    value?: true
  }

  export type SequenceSumAggregateInputType = {
    value?: true
  }

  export type SequenceMinAggregateInputType = {
    name?: true
    value?: true
  }

  export type SequenceMaxAggregateInputType = {
    name?: true
    value?: true
  }

  export type SequenceCountAggregateInputType = {
    name?: true
    value?: true
    _all?: true
  }

  export type SequenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sequence to aggregate.
     */
    where?: SequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sequences to fetch.
     */
    orderBy?: SequenceOrderByWithRelationInput | SequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sequences
    **/
    _count?: true | SequenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SequenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SequenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SequenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SequenceMaxAggregateInputType
  }

  export type GetSequenceAggregateType<T extends SequenceAggregateArgs> = {
        [P in keyof T & keyof AggregateSequence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSequence[P]>
      : GetScalarType<T[P], AggregateSequence[P]>
  }




  export type SequenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SequenceWhereInput
    orderBy?: SequenceOrderByWithAggregationInput | SequenceOrderByWithAggregationInput[]
    by: SequenceScalarFieldEnum[] | SequenceScalarFieldEnum
    having?: SequenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SequenceCountAggregateInputType | true
    _avg?: SequenceAvgAggregateInputType
    _sum?: SequenceSumAggregateInputType
    _min?: SequenceMinAggregateInputType
    _max?: SequenceMaxAggregateInputType
  }

  export type SequenceGroupByOutputType = {
    name: string
    value: number
    _count: SequenceCountAggregateOutputType | null
    _avg: SequenceAvgAggregateOutputType | null
    _sum: SequenceSumAggregateOutputType | null
    _min: SequenceMinAggregateOutputType | null
    _max: SequenceMaxAggregateOutputType | null
  }

  type GetSequenceGroupByPayload<T extends SequenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SequenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SequenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SequenceGroupByOutputType[P]>
            : GetScalarType<T[P], SequenceGroupByOutputType[P]>
        }
      >
    >


  export type SequenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    value?: boolean
  }, ExtArgs["result"]["sequence"]>

  export type SequenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    value?: boolean
  }, ExtArgs["result"]["sequence"]>

  export type SequenceSelectScalar = {
    name?: boolean
    value?: boolean
  }


  export type $SequencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sequence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      name: string
      value: number
    }, ExtArgs["result"]["sequence"]>
    composites: {}
  }

  type SequenceGetPayload<S extends boolean | null | undefined | SequenceDefaultArgs> = $Result.GetResult<Prisma.$SequencePayload, S>

  type SequenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SequenceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SequenceCountAggregateInputType | true
    }

  export interface SequenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sequence'], meta: { name: 'Sequence' } }
    /**
     * Find zero or one Sequence that matches the filter.
     * @param {SequenceFindUniqueArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SequenceFindUniqueArgs>(args: SelectSubset<T, SequenceFindUniqueArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Sequence that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SequenceFindUniqueOrThrowArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SequenceFindUniqueOrThrowArgs>(args: SelectSubset<T, SequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Sequence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceFindFirstArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SequenceFindFirstArgs>(args?: SelectSubset<T, SequenceFindFirstArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Sequence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceFindFirstOrThrowArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SequenceFindFirstOrThrowArgs>(args?: SelectSubset<T, SequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sequences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sequences
     * const sequences = await prisma.sequence.findMany()
     * 
     * // Get first 10 Sequences
     * const sequences = await prisma.sequence.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const sequenceWithNameOnly = await prisma.sequence.findMany({ select: { name: true } })
     * 
     */
    findMany<T extends SequenceFindManyArgs>(args?: SelectSubset<T, SequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Sequence.
     * @param {SequenceCreateArgs} args - Arguments to create a Sequence.
     * @example
     * // Create one Sequence
     * const Sequence = await prisma.sequence.create({
     *   data: {
     *     // ... data to create a Sequence
     *   }
     * })
     * 
     */
    create<T extends SequenceCreateArgs>(args: SelectSubset<T, SequenceCreateArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sequences.
     * @param {SequenceCreateManyArgs} args - Arguments to create many Sequences.
     * @example
     * // Create many Sequences
     * const sequence = await prisma.sequence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SequenceCreateManyArgs>(args?: SelectSubset<T, SequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sequences and returns the data saved in the database.
     * @param {SequenceCreateManyAndReturnArgs} args - Arguments to create many Sequences.
     * @example
     * // Create many Sequences
     * const sequence = await prisma.sequence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sequences and only return the `name`
     * const sequenceWithNameOnly = await prisma.sequence.createManyAndReturn({ 
     *   select: { name: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SequenceCreateManyAndReturnArgs>(args?: SelectSubset<T, SequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Sequence.
     * @param {SequenceDeleteArgs} args - Arguments to delete one Sequence.
     * @example
     * // Delete one Sequence
     * const Sequence = await prisma.sequence.delete({
     *   where: {
     *     // ... filter to delete one Sequence
     *   }
     * })
     * 
     */
    delete<T extends SequenceDeleteArgs>(args: SelectSubset<T, SequenceDeleteArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Sequence.
     * @param {SequenceUpdateArgs} args - Arguments to update one Sequence.
     * @example
     * // Update one Sequence
     * const sequence = await prisma.sequence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SequenceUpdateArgs>(args: SelectSubset<T, SequenceUpdateArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sequences.
     * @param {SequenceDeleteManyArgs} args - Arguments to filter Sequences to delete.
     * @example
     * // Delete a few Sequences
     * const { count } = await prisma.sequence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SequenceDeleteManyArgs>(args?: SelectSubset<T, SequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sequences
     * const sequence = await prisma.sequence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SequenceUpdateManyArgs>(args: SelectSubset<T, SequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sequence.
     * @param {SequenceUpsertArgs} args - Arguments to update or create a Sequence.
     * @example
     * // Update or create a Sequence
     * const sequence = await prisma.sequence.upsert({
     *   create: {
     *     // ... data to create a Sequence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sequence we want to update
     *   }
     * })
     */
    upsert<T extends SequenceUpsertArgs>(args: SelectSubset<T, SequenceUpsertArgs<ExtArgs>>): Prisma__SequenceClient<$Result.GetResult<Prisma.$SequencePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceCountArgs} args - Arguments to filter Sequences to count.
     * @example
     * // Count the number of Sequences
     * const count = await prisma.sequence.count({
     *   where: {
     *     // ... the filter for the Sequences we want to count
     *   }
     * })
    **/
    count<T extends SequenceCountArgs>(
      args?: Subset<T, SequenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SequenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SequenceAggregateArgs>(args: Subset<T, SequenceAggregateArgs>): Prisma.PrismaPromise<GetSequenceAggregateType<T>>

    /**
     * Group by Sequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceGroupByArgs} args - Group by arguments.
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
      T extends SequenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SequenceGroupByArgs['orderBy'] }
        : { orderBy?: SequenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sequence model
   */
  readonly fields: SequenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sequence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SequenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Sequence model
   */ 
  interface SequenceFieldRefs {
    readonly name: FieldRef<"Sequence", 'String'>
    readonly value: FieldRef<"Sequence", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Sequence findUnique
   */
  export type SequenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter, which Sequence to fetch.
     */
    where: SequenceWhereUniqueInput
  }

  /**
   * Sequence findUniqueOrThrow
   */
  export type SequenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter, which Sequence to fetch.
     */
    where: SequenceWhereUniqueInput
  }

  /**
   * Sequence findFirst
   */
  export type SequenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter, which Sequence to fetch.
     */
    where?: SequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sequences to fetch.
     */
    orderBy?: SequenceOrderByWithRelationInput | SequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sequences.
     */
    cursor?: SequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sequences.
     */
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * Sequence findFirstOrThrow
   */
  export type SequenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter, which Sequence to fetch.
     */
    where?: SequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sequences to fetch.
     */
    orderBy?: SequenceOrderByWithRelationInput | SequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sequences.
     */
    cursor?: SequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sequences.
     */
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * Sequence findMany
   */
  export type SequenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter, which Sequences to fetch.
     */
    where?: SequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sequences to fetch.
     */
    orderBy?: SequenceOrderByWithRelationInput | SequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sequences.
     */
    cursor?: SequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sequences.
     */
    skip?: number
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * Sequence create
   */
  export type SequenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * The data needed to create a Sequence.
     */
    data: XOR<SequenceCreateInput, SequenceUncheckedCreateInput>
  }

  /**
   * Sequence createMany
   */
  export type SequenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sequences.
     */
    data: SequenceCreateManyInput | SequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sequence createManyAndReturn
   */
  export type SequenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sequences.
     */
    data: SequenceCreateManyInput | SequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sequence update
   */
  export type SequenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * The data needed to update a Sequence.
     */
    data: XOR<SequenceUpdateInput, SequenceUncheckedUpdateInput>
    /**
     * Choose, which Sequence to update.
     */
    where: SequenceWhereUniqueInput
  }

  /**
   * Sequence updateMany
   */
  export type SequenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sequences.
     */
    data: XOR<SequenceUpdateManyMutationInput, SequenceUncheckedUpdateManyInput>
    /**
     * Filter which Sequences to update
     */
    where?: SequenceWhereInput
  }

  /**
   * Sequence upsert
   */
  export type SequenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * The filter to search for the Sequence to update in case it exists.
     */
    where: SequenceWhereUniqueInput
    /**
     * In case the Sequence found by the `where` argument doesn't exist, create a new Sequence with this data.
     */
    create: XOR<SequenceCreateInput, SequenceUncheckedCreateInput>
    /**
     * In case the Sequence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SequenceUpdateInput, SequenceUncheckedUpdateInput>
  }

  /**
   * Sequence delete
   */
  export type SequenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
    /**
     * Filter which Sequence to delete.
     */
    where: SequenceWhereUniqueInput
  }

  /**
   * Sequence deleteMany
   */
  export type SequenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sequences to delete
     */
    where?: SequenceWhereInput
  }

  /**
   * Sequence without action
   */
  export type SequenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sequence
     */
    select?: SequenceSelect<ExtArgs> | null
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


  export const CategoryScalarFieldEnum: {
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    variations: 'variations'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    departmentId: 'departmentId',
    name: 'name'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    sectionId: 'sectionId',
    name: 'name'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    productId: 'productId',
    name: 'name',
    price: 'price',
    categoryId: 'categoryId',
    sectionId: 'sectionId',
    tags: 'tags',
    fulltext: 'fulltext'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductVariationsScalarFieldEnum: {
    id: 'id',
    variationId: 'variationId',
    value: 'value',
    productId: 'productId'
  };

  export type ProductVariationsScalarFieldEnum = (typeof ProductVariationsScalarFieldEnum)[keyof typeof ProductVariationsScalarFieldEnum]


  export const GoodsReceiptNoteScalarFieldEnum: {
    noteId: 'noteId',
    entryDate: 'entryDate'
  };

  export type GoodsReceiptNoteScalarFieldEnum = (typeof GoodsReceiptNoteScalarFieldEnum)[keyof typeof GoodsReceiptNoteScalarFieldEnum]


  export const GoodsReceiptNoteLineScalarFieldEnum: {
    noteId: 'noteId',
    lineId: 'lineId',
    productId: 'productId',
    goodQuantities: 'goodQuantities',
    badQuantities: 'badQuantities',
    comments: 'comments'
  };

  export type GoodsReceiptNoteLineScalarFieldEnum = (typeof GoodsReceiptNoteLineScalarFieldEnum)[keyof typeof GoodsReceiptNoteLineScalarFieldEnum]


  export const GoodsIssueNoteScalarFieldEnum: {
    noteId: 'noteId',
    issuedAt: 'issuedAt',
    returnDate: 'returnDate',
    status: 'status',
    total: 'total',
    securityDeposit: 'securityDeposit',
    fulltext: 'fulltext'
  };

  export type GoodsIssueNoteScalarFieldEnum = (typeof GoodsIssueNoteScalarFieldEnum)[keyof typeof GoodsIssueNoteScalarFieldEnum]


  export const GoodsIssueNoteLineScalarFieldEnum: {
    noteId: 'noteId',
    lineId: 'lineId',
    productId: 'productId',
    name: 'name',
    price: 'price',
    goodQuantities: 'goodQuantities',
    badQuantities: 'badQuantities',
    goodQuantitiesReturned: 'goodQuantitiesReturned',
    badQuantitiesReturned: 'badQuantitiesReturned',
    netTotal: 'netTotal',
    comments: 'comments',
    variations: 'variations'
  };

  export type GoodsIssueNoteLineScalarFieldEnum = (typeof GoodsIssueNoteLineScalarFieldEnum)[keyof typeof GoodsIssueNoteLineScalarFieldEnum]


  export const PurposeScalarFieldEnum: {
    id: 'id',
    description: 'description',
    notes: 'notes',
    details: 'details',
    noteId: 'noteId'
  };

  export type PurposeScalarFieldEnum = (typeof PurposeScalarFieldEnum)[keyof typeof PurposeScalarFieldEnum]


  export const GoodsReturnNoteScalarFieldEnum: {
    noteId: 'noteId',
    goodsIssueNoteId: 'goodsIssueNoteId',
    securityDepositWithheld: 'securityDepositWithheld',
    issuedAt: 'issuedAt'
  };

  export type GoodsReturnNoteScalarFieldEnum = (typeof GoodsReturnNoteScalarFieldEnum)[keyof typeof GoodsReturnNoteScalarFieldEnum]


  export const GoodsReturnNoteLineScalarFieldEnum: {
    noteId: 'noteId',
    lineId: 'lineId',
    description: 'description',
    productId: 'productId',
    goodQuantities: 'goodQuantities',
    badQuantities: 'badQuantities',
    variations: 'variations',
    comments: 'comments'
  };

  export type GoodsReturnNoteLineScalarFieldEnum = (typeof GoodsReturnNoteLineScalarFieldEnum)[keyof typeof GoodsReturnNoteLineScalarFieldEnum]


  export const StockScalarFieldEnum: {
    stockId: 'stockId',
    productId: 'productId',
    goodQuantities: 'goodQuantities',
    badQuantities: 'badQuantities'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const SequenceScalarFieldEnum: {
    name: 'name',
    value: 'value'
  };

  export type SequenceScalarFieldEnum = (typeof SequenceScalarFieldEnum)[keyof typeof SequenceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    categoryId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    variations?: StringNullableFilter<"Category"> | string | null
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    variations?: SortOrderInput | SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    categoryId?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    variations?: StringNullableFilter<"Category"> | string | null
    products?: ProductListRelationFilter
  }, "categoryId" | "categoryId">

  export type CategoryOrderByWithAggregationInput = {
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    variations?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    categoryId?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    variations?: StringNullableWithAggregatesFilter<"Category"> | string | null
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    departmentId?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
  }

  export type DepartmentOrderByWithRelationInput = {
    departmentId?: SortOrder
    name?: SortOrder
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    departmentId?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name?: StringFilter<"Department"> | string
  }, "departmentId" | "departmentId">

  export type DepartmentOrderByWithAggregationInput = {
    departmentId?: SortOrder
    name?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    departmentId?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    sectionId?: StringFilter<"Section"> | string
    name?: StringFilter<"Section"> | string
    products?: ProductListRelationFilter
  }

  export type SectionOrderByWithRelationInput = {
    sectionId?: SortOrder
    name?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    sectionId?: string
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    name?: StringFilter<"Section"> | string
    products?: ProductListRelationFilter
  }, "sectionId" | "sectionId">

  export type SectionOrderByWithAggregationInput = {
    sectionId?: SortOrder
    name?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    sectionId?: StringWithAggregatesFilter<"Section"> | string
    name?: StringWithAggregatesFilter<"Section"> | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    productId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    categoryId?: StringNullableFilter<"Product"> | string | null
    sectionId?: StringNullableFilter<"Product"> | string | null
    tags?: StringNullableFilter<"Product"> | string | null
    fulltext?: StringFilter<"Product"> | string
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    section?: XOR<SectionNullableRelationFilter, SectionWhereInput> | null
    variations?: ProductVariationsListRelationFilter
    receiptNoteLines?: GoodsReceiptNoteLineListRelationFilter
    issueNoteLines?: GoodsIssueNoteLineListRelationFilter
    returnLines?: GoodsReturnNoteLineListRelationFilter
    stock?: XOR<StockNullableRelationFilter, StockWhereInput> | null
  }

  export type ProductOrderByWithRelationInput = {
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    sectionId?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    fulltext?: SortOrder
    category?: CategoryOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
    variations?: ProductVariationsOrderByRelationAggregateInput
    receiptNoteLines?: GoodsReceiptNoteLineOrderByRelationAggregateInput
    issueNoteLines?: GoodsIssueNoteLineOrderByRelationAggregateInput
    returnLines?: GoodsReturnNoteLineOrderByRelationAggregateInput
    stock?: StockOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    productId?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    categoryId?: StringNullableFilter<"Product"> | string | null
    sectionId?: StringNullableFilter<"Product"> | string | null
    tags?: StringNullableFilter<"Product"> | string | null
    fulltext?: StringFilter<"Product"> | string
    category?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    section?: XOR<SectionNullableRelationFilter, SectionWhereInput> | null
    variations?: ProductVariationsListRelationFilter
    receiptNoteLines?: GoodsReceiptNoteLineListRelationFilter
    issueNoteLines?: GoodsIssueNoteLineListRelationFilter
    returnLines?: GoodsReturnNoteLineListRelationFilter
    stock?: XOR<StockNullableRelationFilter, StockWhereInput> | null
  }, "productId" | "productId">

  export type ProductOrderByWithAggregationInput = {
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    sectionId?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    fulltext?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    productId?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    price?: FloatWithAggregatesFilter<"Product"> | number
    categoryId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    sectionId?: StringNullableWithAggregatesFilter<"Product"> | string | null
    tags?: StringNullableWithAggregatesFilter<"Product"> | string | null
    fulltext?: StringWithAggregatesFilter<"Product"> | string
  }

  export type ProductVariationsWhereInput = {
    AND?: ProductVariationsWhereInput | ProductVariationsWhereInput[]
    OR?: ProductVariationsWhereInput[]
    NOT?: ProductVariationsWhereInput | ProductVariationsWhereInput[]
    id?: IntFilter<"ProductVariations"> | number
    variationId?: StringFilter<"ProductVariations"> | string
    value?: StringFilter<"ProductVariations"> | string
    productId?: StringFilter<"ProductVariations"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductVariationsOrderByWithRelationInput = {
    id?: SortOrder
    variationId?: SortOrder
    value?: SortOrder
    productId?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductVariationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductVariationsWhereInput | ProductVariationsWhereInput[]
    OR?: ProductVariationsWhereInput[]
    NOT?: ProductVariationsWhereInput | ProductVariationsWhereInput[]
    variationId?: StringFilter<"ProductVariations"> | string
    value?: StringFilter<"ProductVariations"> | string
    productId?: StringFilter<"ProductVariations"> | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductVariationsOrderByWithAggregationInput = {
    id?: SortOrder
    variationId?: SortOrder
    value?: SortOrder
    productId?: SortOrder
    _count?: ProductVariationsCountOrderByAggregateInput
    _avg?: ProductVariationsAvgOrderByAggregateInput
    _max?: ProductVariationsMaxOrderByAggregateInput
    _min?: ProductVariationsMinOrderByAggregateInput
    _sum?: ProductVariationsSumOrderByAggregateInput
  }

  export type ProductVariationsScalarWhereWithAggregatesInput = {
    AND?: ProductVariationsScalarWhereWithAggregatesInput | ProductVariationsScalarWhereWithAggregatesInput[]
    OR?: ProductVariationsScalarWhereWithAggregatesInput[]
    NOT?: ProductVariationsScalarWhereWithAggregatesInput | ProductVariationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductVariations"> | number
    variationId?: StringWithAggregatesFilter<"ProductVariations"> | string
    value?: StringWithAggregatesFilter<"ProductVariations"> | string
    productId?: StringWithAggregatesFilter<"ProductVariations"> | string
  }

  export type GoodsReceiptNoteWhereInput = {
    AND?: GoodsReceiptNoteWhereInput | GoodsReceiptNoteWhereInput[]
    OR?: GoodsReceiptNoteWhereInput[]
    NOT?: GoodsReceiptNoteWhereInput | GoodsReceiptNoteWhereInput[]
    noteId?: StringFilter<"GoodsReceiptNote"> | string
    entryDate?: DateTimeFilter<"GoodsReceiptNote"> | Date | string
    lines?: GoodsReceiptNoteLineListRelationFilter
  }

  export type GoodsReceiptNoteOrderByWithRelationInput = {
    noteId?: SortOrder
    entryDate?: SortOrder
    lines?: GoodsReceiptNoteLineOrderByRelationAggregateInput
  }

  export type GoodsReceiptNoteWhereUniqueInput = Prisma.AtLeast<{
    noteId?: string
    AND?: GoodsReceiptNoteWhereInput | GoodsReceiptNoteWhereInput[]
    OR?: GoodsReceiptNoteWhereInput[]
    NOT?: GoodsReceiptNoteWhereInput | GoodsReceiptNoteWhereInput[]
    entryDate?: DateTimeFilter<"GoodsReceiptNote"> | Date | string
    lines?: GoodsReceiptNoteLineListRelationFilter
  }, "noteId" | "noteId">

  export type GoodsReceiptNoteOrderByWithAggregationInput = {
    noteId?: SortOrder
    entryDate?: SortOrder
    _count?: GoodsReceiptNoteCountOrderByAggregateInput
    _max?: GoodsReceiptNoteMaxOrderByAggregateInput
    _min?: GoodsReceiptNoteMinOrderByAggregateInput
  }

  export type GoodsReceiptNoteScalarWhereWithAggregatesInput = {
    AND?: GoodsReceiptNoteScalarWhereWithAggregatesInput | GoodsReceiptNoteScalarWhereWithAggregatesInput[]
    OR?: GoodsReceiptNoteScalarWhereWithAggregatesInput[]
    NOT?: GoodsReceiptNoteScalarWhereWithAggregatesInput | GoodsReceiptNoteScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsReceiptNote"> | string
    entryDate?: DateTimeWithAggregatesFilter<"GoodsReceiptNote"> | Date | string
  }

  export type GoodsReceiptNoteLineWhereInput = {
    AND?: GoodsReceiptNoteLineWhereInput | GoodsReceiptNoteLineWhereInput[]
    OR?: GoodsReceiptNoteLineWhereInput[]
    NOT?: GoodsReceiptNoteLineWhereInput | GoodsReceiptNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsReceiptNoteLine"> | string
    lineId?: StringFilter<"GoodsReceiptNoteLine"> | string
    productId?: StringFilter<"GoodsReceiptNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    comments?: StringNullableFilter<"GoodsReceiptNoteLine"> | string | null
    note?: XOR<GoodsReceiptNoteRelationFilter, GoodsReceiptNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type GoodsReceiptNoteLineOrderByWithRelationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrderInput | SortOrder
    note?: GoodsReceiptNoteOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type GoodsReceiptNoteLineWhereUniqueInput = Prisma.AtLeast<{
    lineId?: string
    AND?: GoodsReceiptNoteLineWhereInput | GoodsReceiptNoteLineWhereInput[]
    OR?: GoodsReceiptNoteLineWhereInput[]
    NOT?: GoodsReceiptNoteLineWhereInput | GoodsReceiptNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsReceiptNoteLine"> | string
    productId?: StringFilter<"GoodsReceiptNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    comments?: StringNullableFilter<"GoodsReceiptNoteLine"> | string | null
    note?: XOR<GoodsReceiptNoteRelationFilter, GoodsReceiptNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "lineId" | "lineId">

  export type GoodsReceiptNoteLineOrderByWithAggregationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrderInput | SortOrder
    _count?: GoodsReceiptNoteLineCountOrderByAggregateInput
    _avg?: GoodsReceiptNoteLineAvgOrderByAggregateInput
    _max?: GoodsReceiptNoteLineMaxOrderByAggregateInput
    _min?: GoodsReceiptNoteLineMinOrderByAggregateInput
    _sum?: GoodsReceiptNoteLineSumOrderByAggregateInput
  }

  export type GoodsReceiptNoteLineScalarWhereWithAggregatesInput = {
    AND?: GoodsReceiptNoteLineScalarWhereWithAggregatesInput | GoodsReceiptNoteLineScalarWhereWithAggregatesInput[]
    OR?: GoodsReceiptNoteLineScalarWhereWithAggregatesInput[]
    NOT?: GoodsReceiptNoteLineScalarWhereWithAggregatesInput | GoodsReceiptNoteLineScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsReceiptNoteLine"> | string
    lineId?: StringWithAggregatesFilter<"GoodsReceiptNoteLine"> | string
    productId?: StringWithAggregatesFilter<"GoodsReceiptNoteLine"> | string
    goodQuantities?: IntWithAggregatesFilter<"GoodsReceiptNoteLine"> | number
    badQuantities?: IntWithAggregatesFilter<"GoodsReceiptNoteLine"> | number
    comments?: StringNullableWithAggregatesFilter<"GoodsReceiptNoteLine"> | string | null
  }

  export type GoodsIssueNoteWhereInput = {
    AND?: GoodsIssueNoteWhereInput | GoodsIssueNoteWhereInput[]
    OR?: GoodsIssueNoteWhereInput[]
    NOT?: GoodsIssueNoteWhereInput | GoodsIssueNoteWhereInput[]
    noteId?: StringFilter<"GoodsIssueNote"> | string
    issuedAt?: DateTimeFilter<"GoodsIssueNote"> | Date | string
    returnDate?: DateTimeFilter<"GoodsIssueNote"> | Date | string
    status?: StringFilter<"GoodsIssueNote"> | string
    total?: FloatFilter<"GoodsIssueNote"> | number
    securityDeposit?: FloatFilter<"GoodsIssueNote"> | number
    fulltext?: StringFilter<"GoodsIssueNote"> | string
    purpose?: XOR<PurposeNullableRelationFilter, PurposeWhereInput> | null
    lines?: GoodsIssueNoteLineListRelationFilter
    goodsReturnNotes?: GoodsReturnNoteListRelationFilter
  }

  export type GoodsIssueNoteOrderByWithRelationInput = {
    noteId?: SortOrder
    issuedAt?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
    total?: SortOrder
    securityDeposit?: SortOrder
    fulltext?: SortOrder
    purpose?: PurposeOrderByWithRelationInput
    lines?: GoodsIssueNoteLineOrderByRelationAggregateInput
    goodsReturnNotes?: GoodsReturnNoteOrderByRelationAggregateInput
  }

  export type GoodsIssueNoteWhereUniqueInput = Prisma.AtLeast<{
    noteId?: string
    AND?: GoodsIssueNoteWhereInput | GoodsIssueNoteWhereInput[]
    OR?: GoodsIssueNoteWhereInput[]
    NOT?: GoodsIssueNoteWhereInput | GoodsIssueNoteWhereInput[]
    issuedAt?: DateTimeFilter<"GoodsIssueNote"> | Date | string
    returnDate?: DateTimeFilter<"GoodsIssueNote"> | Date | string
    status?: StringFilter<"GoodsIssueNote"> | string
    total?: FloatFilter<"GoodsIssueNote"> | number
    securityDeposit?: FloatFilter<"GoodsIssueNote"> | number
    fulltext?: StringFilter<"GoodsIssueNote"> | string
    purpose?: XOR<PurposeNullableRelationFilter, PurposeWhereInput> | null
    lines?: GoodsIssueNoteLineListRelationFilter
    goodsReturnNotes?: GoodsReturnNoteListRelationFilter
  }, "noteId" | "noteId">

  export type GoodsIssueNoteOrderByWithAggregationInput = {
    noteId?: SortOrder
    issuedAt?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
    total?: SortOrder
    securityDeposit?: SortOrder
    fulltext?: SortOrder
    _count?: GoodsIssueNoteCountOrderByAggregateInput
    _avg?: GoodsIssueNoteAvgOrderByAggregateInput
    _max?: GoodsIssueNoteMaxOrderByAggregateInput
    _min?: GoodsIssueNoteMinOrderByAggregateInput
    _sum?: GoodsIssueNoteSumOrderByAggregateInput
  }

  export type GoodsIssueNoteScalarWhereWithAggregatesInput = {
    AND?: GoodsIssueNoteScalarWhereWithAggregatesInput | GoodsIssueNoteScalarWhereWithAggregatesInput[]
    OR?: GoodsIssueNoteScalarWhereWithAggregatesInput[]
    NOT?: GoodsIssueNoteScalarWhereWithAggregatesInput | GoodsIssueNoteScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsIssueNote"> | string
    issuedAt?: DateTimeWithAggregatesFilter<"GoodsIssueNote"> | Date | string
    returnDate?: DateTimeWithAggregatesFilter<"GoodsIssueNote"> | Date | string
    status?: StringWithAggregatesFilter<"GoodsIssueNote"> | string
    total?: FloatWithAggregatesFilter<"GoodsIssueNote"> | number
    securityDeposit?: FloatWithAggregatesFilter<"GoodsIssueNote"> | number
    fulltext?: StringWithAggregatesFilter<"GoodsIssueNote"> | string
  }

  export type GoodsIssueNoteLineWhereInput = {
    AND?: GoodsIssueNoteLineWhereInput | GoodsIssueNoteLineWhereInput[]
    OR?: GoodsIssueNoteLineWhereInput[]
    NOT?: GoodsIssueNoteLineWhereInput | GoodsIssueNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsIssueNoteLine"> | string
    lineId?: StringFilter<"GoodsIssueNoteLine"> | string
    productId?: StringFilter<"GoodsIssueNoteLine"> | string
    name?: StringFilter<"GoodsIssueNoteLine"> | string
    price?: FloatFilter<"GoodsIssueNoteLine"> | number
    goodQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    goodQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    netTotal?: FloatFilter<"GoodsIssueNoteLine"> | number
    comments?: StringNullableFilter<"GoodsIssueNoteLine"> | string | null
    variations?: JsonNullableFilter<"GoodsIssueNoteLine">
    note?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type GoodsIssueNoteLineOrderByWithRelationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
    comments?: SortOrderInput | SortOrder
    variations?: SortOrderInput | SortOrder
    note?: GoodsIssueNoteOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type GoodsIssueNoteLineWhereUniqueInput = Prisma.AtLeast<{
    lineId?: string
    AND?: GoodsIssueNoteLineWhereInput | GoodsIssueNoteLineWhereInput[]
    OR?: GoodsIssueNoteLineWhereInput[]
    NOT?: GoodsIssueNoteLineWhereInput | GoodsIssueNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsIssueNoteLine"> | string
    productId?: StringFilter<"GoodsIssueNoteLine"> | string
    name?: StringFilter<"GoodsIssueNoteLine"> | string
    price?: FloatFilter<"GoodsIssueNoteLine"> | number
    goodQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    goodQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    netTotal?: FloatFilter<"GoodsIssueNoteLine"> | number
    comments?: StringNullableFilter<"GoodsIssueNoteLine"> | string | null
    variations?: JsonNullableFilter<"GoodsIssueNoteLine">
    note?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "lineId" | "lineId">

  export type GoodsIssueNoteLineOrderByWithAggregationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
    comments?: SortOrderInput | SortOrder
    variations?: SortOrderInput | SortOrder
    _count?: GoodsIssueNoteLineCountOrderByAggregateInput
    _avg?: GoodsIssueNoteLineAvgOrderByAggregateInput
    _max?: GoodsIssueNoteLineMaxOrderByAggregateInput
    _min?: GoodsIssueNoteLineMinOrderByAggregateInput
    _sum?: GoodsIssueNoteLineSumOrderByAggregateInput
  }

  export type GoodsIssueNoteLineScalarWhereWithAggregatesInput = {
    AND?: GoodsIssueNoteLineScalarWhereWithAggregatesInput | GoodsIssueNoteLineScalarWhereWithAggregatesInput[]
    OR?: GoodsIssueNoteLineScalarWhereWithAggregatesInput[]
    NOT?: GoodsIssueNoteLineScalarWhereWithAggregatesInput | GoodsIssueNoteLineScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsIssueNoteLine"> | string
    lineId?: StringWithAggregatesFilter<"GoodsIssueNoteLine"> | string
    productId?: StringWithAggregatesFilter<"GoodsIssueNoteLine"> | string
    name?: StringWithAggregatesFilter<"GoodsIssueNoteLine"> | string
    price?: FloatWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    goodQuantities?: IntWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    badQuantities?: IntWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    goodQuantitiesReturned?: IntWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    badQuantitiesReturned?: IntWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    netTotal?: FloatWithAggregatesFilter<"GoodsIssueNoteLine"> | number
    comments?: StringNullableWithAggregatesFilter<"GoodsIssueNoteLine"> | string | null
    variations?: JsonNullableWithAggregatesFilter<"GoodsIssueNoteLine">
  }

  export type PurposeWhereInput = {
    AND?: PurposeWhereInput | PurposeWhereInput[]
    OR?: PurposeWhereInput[]
    NOT?: PurposeWhereInput | PurposeWhereInput[]
    id?: IntFilter<"Purpose"> | number
    description?: StringFilter<"Purpose"> | string
    notes?: StringFilter<"Purpose"> | string
    details?: StringNullableFilter<"Purpose"> | string | null
    noteId?: StringFilter<"Purpose"> | string
    note?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
  }

  export type PurposeOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    details?: SortOrderInput | SortOrder
    noteId?: SortOrder
    note?: GoodsIssueNoteOrderByWithRelationInput
  }

  export type PurposeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    noteId?: string
    AND?: PurposeWhereInput | PurposeWhereInput[]
    OR?: PurposeWhereInput[]
    NOT?: PurposeWhereInput | PurposeWhereInput[]
    description?: StringFilter<"Purpose"> | string
    notes?: StringFilter<"Purpose"> | string
    details?: StringNullableFilter<"Purpose"> | string | null
    note?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
  }, "id" | "noteId">

  export type PurposeOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    details?: SortOrderInput | SortOrder
    noteId?: SortOrder
    _count?: PurposeCountOrderByAggregateInput
    _avg?: PurposeAvgOrderByAggregateInput
    _max?: PurposeMaxOrderByAggregateInput
    _min?: PurposeMinOrderByAggregateInput
    _sum?: PurposeSumOrderByAggregateInput
  }

  export type PurposeScalarWhereWithAggregatesInput = {
    AND?: PurposeScalarWhereWithAggregatesInput | PurposeScalarWhereWithAggregatesInput[]
    OR?: PurposeScalarWhereWithAggregatesInput[]
    NOT?: PurposeScalarWhereWithAggregatesInput | PurposeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Purpose"> | number
    description?: StringWithAggregatesFilter<"Purpose"> | string
    notes?: StringWithAggregatesFilter<"Purpose"> | string
    details?: StringNullableWithAggregatesFilter<"Purpose"> | string | null
    noteId?: StringWithAggregatesFilter<"Purpose"> | string
  }

  export type GoodsReturnNoteWhereInput = {
    AND?: GoodsReturnNoteWhereInput | GoodsReturnNoteWhereInput[]
    OR?: GoodsReturnNoteWhereInput[]
    NOT?: GoodsReturnNoteWhereInput | GoodsReturnNoteWhereInput[]
    noteId?: StringFilter<"GoodsReturnNote"> | string
    goodsIssueNoteId?: StringFilter<"GoodsReturnNote"> | string
    securityDepositWithheld?: IntFilter<"GoodsReturnNote"> | number
    issuedAt?: DateTimeFilter<"GoodsReturnNote"> | Date | string
    goodsIssueNote?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
    lines?: GoodsReturnNoteLineListRelationFilter
  }

  export type GoodsReturnNoteOrderByWithRelationInput = {
    noteId?: SortOrder
    goodsIssueNoteId?: SortOrder
    securityDepositWithheld?: SortOrder
    issuedAt?: SortOrder
    goodsIssueNote?: GoodsIssueNoteOrderByWithRelationInput
    lines?: GoodsReturnNoteLineOrderByRelationAggregateInput
  }

  export type GoodsReturnNoteWhereUniqueInput = Prisma.AtLeast<{
    noteId?: string
    AND?: GoodsReturnNoteWhereInput | GoodsReturnNoteWhereInput[]
    OR?: GoodsReturnNoteWhereInput[]
    NOT?: GoodsReturnNoteWhereInput | GoodsReturnNoteWhereInput[]
    goodsIssueNoteId?: StringFilter<"GoodsReturnNote"> | string
    securityDepositWithheld?: IntFilter<"GoodsReturnNote"> | number
    issuedAt?: DateTimeFilter<"GoodsReturnNote"> | Date | string
    goodsIssueNote?: XOR<GoodsIssueNoteRelationFilter, GoodsIssueNoteWhereInput>
    lines?: GoodsReturnNoteLineListRelationFilter
  }, "noteId" | "noteId">

  export type GoodsReturnNoteOrderByWithAggregationInput = {
    noteId?: SortOrder
    goodsIssueNoteId?: SortOrder
    securityDepositWithheld?: SortOrder
    issuedAt?: SortOrder
    _count?: GoodsReturnNoteCountOrderByAggregateInput
    _avg?: GoodsReturnNoteAvgOrderByAggregateInput
    _max?: GoodsReturnNoteMaxOrderByAggregateInput
    _min?: GoodsReturnNoteMinOrderByAggregateInput
    _sum?: GoodsReturnNoteSumOrderByAggregateInput
  }

  export type GoodsReturnNoteScalarWhereWithAggregatesInput = {
    AND?: GoodsReturnNoteScalarWhereWithAggregatesInput | GoodsReturnNoteScalarWhereWithAggregatesInput[]
    OR?: GoodsReturnNoteScalarWhereWithAggregatesInput[]
    NOT?: GoodsReturnNoteScalarWhereWithAggregatesInput | GoodsReturnNoteScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsReturnNote"> | string
    goodsIssueNoteId?: StringWithAggregatesFilter<"GoodsReturnNote"> | string
    securityDepositWithheld?: IntWithAggregatesFilter<"GoodsReturnNote"> | number
    issuedAt?: DateTimeWithAggregatesFilter<"GoodsReturnNote"> | Date | string
  }

  export type GoodsReturnNoteLineWhereInput = {
    AND?: GoodsReturnNoteLineWhereInput | GoodsReturnNoteLineWhereInput[]
    OR?: GoodsReturnNoteLineWhereInput[]
    NOT?: GoodsReturnNoteLineWhereInput | GoodsReturnNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsReturnNoteLine"> | string
    lineId?: StringFilter<"GoodsReturnNoteLine"> | string
    description?: StringFilter<"GoodsReturnNoteLine"> | string
    productId?: StringFilter<"GoodsReturnNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    variations?: JsonNullableFilter<"GoodsReturnNoteLine">
    comments?: StringNullableFilter<"GoodsReturnNoteLine"> | string | null
    note?: XOR<GoodsReturnNoteRelationFilter, GoodsReturnNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type GoodsReturnNoteLineOrderByWithRelationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    description?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    variations?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    note?: GoodsReturnNoteOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type GoodsReturnNoteLineWhereUniqueInput = Prisma.AtLeast<{
    lineId?: string
    AND?: GoodsReturnNoteLineWhereInput | GoodsReturnNoteLineWhereInput[]
    OR?: GoodsReturnNoteLineWhereInput[]
    NOT?: GoodsReturnNoteLineWhereInput | GoodsReturnNoteLineWhereInput[]
    noteId?: StringFilter<"GoodsReturnNoteLine"> | string
    description?: StringFilter<"GoodsReturnNoteLine"> | string
    productId?: StringFilter<"GoodsReturnNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    variations?: JsonNullableFilter<"GoodsReturnNoteLine">
    comments?: StringNullableFilter<"GoodsReturnNoteLine"> | string | null
    note?: XOR<GoodsReturnNoteRelationFilter, GoodsReturnNoteWhereInput>
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "lineId" | "lineId">

  export type GoodsReturnNoteLineOrderByWithAggregationInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    description?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    variations?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    _count?: GoodsReturnNoteLineCountOrderByAggregateInput
    _avg?: GoodsReturnNoteLineAvgOrderByAggregateInput
    _max?: GoodsReturnNoteLineMaxOrderByAggregateInput
    _min?: GoodsReturnNoteLineMinOrderByAggregateInput
    _sum?: GoodsReturnNoteLineSumOrderByAggregateInput
  }

  export type GoodsReturnNoteLineScalarWhereWithAggregatesInput = {
    AND?: GoodsReturnNoteLineScalarWhereWithAggregatesInput | GoodsReturnNoteLineScalarWhereWithAggregatesInput[]
    OR?: GoodsReturnNoteLineScalarWhereWithAggregatesInput[]
    NOT?: GoodsReturnNoteLineScalarWhereWithAggregatesInput | GoodsReturnNoteLineScalarWhereWithAggregatesInput[]
    noteId?: StringWithAggregatesFilter<"GoodsReturnNoteLine"> | string
    lineId?: StringWithAggregatesFilter<"GoodsReturnNoteLine"> | string
    description?: StringWithAggregatesFilter<"GoodsReturnNoteLine"> | string
    productId?: StringWithAggregatesFilter<"GoodsReturnNoteLine"> | string
    goodQuantities?: IntWithAggregatesFilter<"GoodsReturnNoteLine"> | number
    badQuantities?: IntWithAggregatesFilter<"GoodsReturnNoteLine"> | number
    variations?: JsonNullableWithAggregatesFilter<"GoodsReturnNoteLine">
    comments?: StringNullableWithAggregatesFilter<"GoodsReturnNoteLine"> | string | null
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    stockId?: StringFilter<"Stock"> | string
    productId?: StringFilter<"Stock"> | string
    goodQuantities?: IntFilter<"Stock"> | number
    badQuantities?: IntFilter<"Stock"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type StockOrderByWithRelationInput = {
    stockId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    stockId?: string
    productId?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    goodQuantities?: IntFilter<"Stock"> | number
    badQuantities?: IntFilter<"Stock"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "stockId" | "stockId" | "productId">

  export type StockOrderByWithAggregationInput = {
    stockId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    stockId?: StringWithAggregatesFilter<"Stock"> | string
    productId?: StringWithAggregatesFilter<"Stock"> | string
    goodQuantities?: IntWithAggregatesFilter<"Stock"> | number
    badQuantities?: IntWithAggregatesFilter<"Stock"> | number
  }

  export type SequenceWhereInput = {
    AND?: SequenceWhereInput | SequenceWhereInput[]
    OR?: SequenceWhereInput[]
    NOT?: SequenceWhereInput | SequenceWhereInput[]
    name?: StringFilter<"Sequence"> | string
    value?: IntFilter<"Sequence"> | number
  }

  export type SequenceOrderByWithRelationInput = {
    name?: SortOrder
    value?: SortOrder
  }

  export type SequenceWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: SequenceWhereInput | SequenceWhereInput[]
    OR?: SequenceWhereInput[]
    NOT?: SequenceWhereInput | SequenceWhereInput[]
    value?: IntFilter<"Sequence"> | number
  }, "name" | "name">

  export type SequenceOrderByWithAggregationInput = {
    name?: SortOrder
    value?: SortOrder
    _count?: SequenceCountOrderByAggregateInput
    _avg?: SequenceAvgOrderByAggregateInput
    _max?: SequenceMaxOrderByAggregateInput
    _min?: SequenceMinOrderByAggregateInput
    _sum?: SequenceSumOrderByAggregateInput
  }

  export type SequenceScalarWhereWithAggregatesInput = {
    AND?: SequenceScalarWhereWithAggregatesInput | SequenceScalarWhereWithAggregatesInput[]
    OR?: SequenceScalarWhereWithAggregatesInput[]
    NOT?: SequenceScalarWhereWithAggregatesInput | SequenceScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"Sequence"> | string
    value?: IntWithAggregatesFilter<"Sequence"> | number
  }

  export type CategoryCreateInput = {
    categoryId: string
    name: string
    description?: string | null
    variations?: string | null
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    categoryId: string
    name: string
    description?: string | null
    variations?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    categoryId: string
    name: string
    description?: string | null
    variations?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DepartmentCreateInput = {
    departmentId: string
    name: string
  }

  export type DepartmentUncheckedCreateInput = {
    departmentId: string
    name: string
  }

  export type DepartmentUpdateInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUncheckedUpdateInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentCreateManyInput = {
    departmentId: string
    name: string
  }

  export type DepartmentUpdateManyMutationInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    departmentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateInput = {
    sectionId: string
    name: string
    products?: ProductCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateInput = {
    sectionId: string
    name: string
    products?: ProductUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionUpdateInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyInput = {
    sectionId: string
    name: string
  }

  export type SectionUpdateManyMutationInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SectionUncheckedUpdateManyInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
  }

  export type ProductUpdateManyMutationInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsCreateInput = {
    variationId: string
    value: string
    product: ProductCreateNestedOneWithoutVariationsInput
  }

  export type ProductVariationsUncheckedCreateInput = {
    id?: number
    variationId: string
    value: string
    productId: string
  }

  export type ProductVariationsUpdateInput = {
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutVariationsNestedInput
  }

  export type ProductVariationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsCreateManyInput = {
    id?: number
    variationId: string
    value: string
    productId: string
  }

  export type ProductVariationsUpdateManyMutationInput = {
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  export type GoodsReceiptNoteCreateInput = {
    noteId: string
    entryDate: Date | string
    lines?: GoodsReceiptNoteLineCreateNestedManyWithoutNoteInput
  }

  export type GoodsReceiptNoteUncheckedCreateInput = {
    noteId: string
    entryDate: Date | string
    lines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutNoteInput
  }

  export type GoodsReceiptNoteUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: GoodsReceiptNoteLineUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReceiptNoteUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReceiptNoteCreateManyInput = {
    noteId: string
    entryDate: Date | string
  }

  export type GoodsReceiptNoteUpdateManyMutationInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReceiptNoteUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReceiptNoteLineCreateInput = {
    lineId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
    note: GoodsReceiptNoteCreateNestedOneWithoutLinesInput
    product: ProductCreateNestedOneWithoutReceiptNoteLinesInput
  }

  export type GoodsReceiptNoteLineUncheckedCreateInput = {
    noteId: string
    lineId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsReceiptNoteLineUpdateInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    note?: GoodsReceiptNoteUpdateOneRequiredWithoutLinesNestedInput
    product?: ProductUpdateOneRequiredWithoutReceiptNoteLinesNestedInput
  }

  export type GoodsReceiptNoteLineUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReceiptNoteLineCreateManyInput = {
    noteId: string
    lineId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsReceiptNoteLineUpdateManyMutationInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReceiptNoteLineUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsIssueNoteCreateInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeCreateNestedOneWithoutNoteInput
    lines?: GoodsIssueNoteLineCreateNestedManyWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteUncheckedCreateInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeUncheckedCreateNestedOneWithoutNoteInput
    lines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUpdateOneWithoutNoteNestedInput
    lines?: GoodsIssueNoteLineUpdateManyWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type GoodsIssueNoteUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUncheckedUpdateOneWithoutNoteNestedInput
    lines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type GoodsIssueNoteCreateManyInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
  }

  export type GoodsIssueNoteUpdateManyMutationInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type GoodsIssueNoteUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type GoodsIssueNoteLineCreateInput = {
    lineId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    note: GoodsIssueNoteCreateNestedOneWithoutLinesInput
    product: ProductCreateNestedOneWithoutIssueNoteLinesInput
  }

  export type GoodsIssueNoteLineUncheckedCreateInput = {
    noteId: string
    lineId: string
    productId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineUpdateInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    note?: GoodsIssueNoteUpdateOneRequiredWithoutLinesNestedInput
    product?: ProductUpdateOneRequiredWithoutIssueNoteLinesNestedInput
  }

  export type GoodsIssueNoteLineUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineCreateManyInput = {
    noteId: string
    lineId: string
    productId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineUpdateManyMutationInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type PurposeCreateInput = {
    description: string
    notes: string
    details?: string | null
    note: GoodsIssueNoteCreateNestedOneWithoutPurposeInput
  }

  export type PurposeUncheckedCreateInput = {
    id?: number
    description: string
    notes: string
    details?: string | null
    noteId: string
  }

  export type PurposeUpdateInput = {
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    note?: GoodsIssueNoteUpdateOneRequiredWithoutPurposeNestedInput
  }

  export type PurposeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type PurposeCreateManyInput = {
    id?: number
    description: string
    notes: string
    details?: string | null
    noteId: string
  }

  export type PurposeUpdateManyMutationInput = {
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PurposeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    noteId?: StringFieldUpdateOperationsInput | string
  }

  export type GoodsReturnNoteCreateInput = {
    noteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
    goodsIssueNote: GoodsIssueNoteCreateNestedOneWithoutGoodsReturnNotesInput
    lines?: GoodsReturnNoteLineCreateNestedManyWithoutNoteInput
  }

  export type GoodsReturnNoteUncheckedCreateInput = {
    noteId: string
    goodsIssueNoteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
    lines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutNoteInput
  }

  export type GoodsReturnNoteUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goodsIssueNote?: GoodsIssueNoteUpdateOneRequiredWithoutGoodsReturnNotesNestedInput
    lines?: GoodsReturnNoteLineUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReturnNoteUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    goodsIssueNoteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReturnNoteCreateManyInput = {
    noteId: string
    goodsIssueNoteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
  }

  export type GoodsReturnNoteUpdateManyMutationInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReturnNoteUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    goodsIssueNoteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReturnNoteLineCreateInput = {
    lineId: string
    description: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
    note: GoodsReturnNoteCreateNestedOneWithoutLinesInput
    product: ProductCreateNestedOneWithoutReturnLinesInput
  }

  export type GoodsReturnNoteLineUncheckedCreateInput = {
    noteId: string
    lineId: string
    description: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type GoodsReturnNoteLineUpdateInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    note?: GoodsReturnNoteUpdateOneRequiredWithoutLinesNestedInput
    product?: ProductUpdateOneRequiredWithoutReturnLinesNestedInput
  }

  export type GoodsReturnNoteLineUncheckedUpdateInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReturnNoteLineCreateManyInput = {
    noteId: string
    lineId: string
    description: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type GoodsReturnNoteLineUpdateManyMutationInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReturnNoteLineUncheckedUpdateManyInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockCreateInput = {
    stockId: string
    goodQuantities?: number
    badQuantities?: number
    product: ProductCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateInput = {
    stockId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
  }

  export type StockUpdateInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutStockNestedInput
  }

  export type StockUncheckedUpdateInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
  }

  export type StockCreateManyInput = {
    stockId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
  }

  export type StockUpdateManyMutationInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
  }

  export type StockUncheckedUpdateManyInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
  }

  export type SequenceCreateInput = {
    name: string
    value: number
  }

  export type SequenceUncheckedCreateInput = {
    name: string
    value: number
  }

  export type SequenceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type SequenceUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type SequenceCreateManyInput = {
    name: string
    value: number
  }

  export type SequenceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type SequenceUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
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

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variations?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variations?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    variations?: SortOrder
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

  export type DepartmentCountOrderByAggregateInput = {
    departmentId?: SortOrder
    name?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    departmentId?: SortOrder
    name?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    departmentId?: SortOrder
    name?: SortOrder
  }

  export type SectionCountOrderByAggregateInput = {
    sectionId?: SortOrder
    name?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    sectionId?: SortOrder
    name?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    sectionId?: SortOrder
    name?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type SectionNullableRelationFilter = {
    is?: SectionWhereInput | null
    isNot?: SectionWhereInput | null
  }

  export type ProductVariationsListRelationFilter = {
    every?: ProductVariationsWhereInput
    some?: ProductVariationsWhereInput
    none?: ProductVariationsWhereInput
  }

  export type GoodsReceiptNoteLineListRelationFilter = {
    every?: GoodsReceiptNoteLineWhereInput
    some?: GoodsReceiptNoteLineWhereInput
    none?: GoodsReceiptNoteLineWhereInput
  }

  export type GoodsIssueNoteLineListRelationFilter = {
    every?: GoodsIssueNoteLineWhereInput
    some?: GoodsIssueNoteLineWhereInput
    none?: GoodsIssueNoteLineWhereInput
  }

  export type GoodsReturnNoteLineListRelationFilter = {
    every?: GoodsReturnNoteLineWhereInput
    some?: GoodsReturnNoteLineWhereInput
    none?: GoodsReturnNoteLineWhereInput
  }

  export type StockNullableRelationFilter = {
    is?: StockWhereInput | null
    isNot?: StockWhereInput | null
  }

  export type ProductVariationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoodsReceiptNoteLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoodsIssueNoteLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoodsReturnNoteLineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    sectionId?: SortOrder
    tags?: SortOrder
    fulltext?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    sectionId?: SortOrder
    tags?: SortOrder
    fulltext?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    sectionId?: SortOrder
    tags?: SortOrder
    fulltext?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductVariationsCountOrderByAggregateInput = {
    id?: SortOrder
    variationId?: SortOrder
    value?: SortOrder
    productId?: SortOrder
  }

  export type ProductVariationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductVariationsMaxOrderByAggregateInput = {
    id?: SortOrder
    variationId?: SortOrder
    value?: SortOrder
    productId?: SortOrder
  }

  export type ProductVariationsMinOrderByAggregateInput = {
    id?: SortOrder
    variationId?: SortOrder
    value?: SortOrder
    productId?: SortOrder
  }

  export type ProductVariationsSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type GoodsReceiptNoteCountOrderByAggregateInput = {
    noteId?: SortOrder
    entryDate?: SortOrder
  }

  export type GoodsReceiptNoteMaxOrderByAggregateInput = {
    noteId?: SortOrder
    entryDate?: SortOrder
  }

  export type GoodsReceiptNoteMinOrderByAggregateInput = {
    noteId?: SortOrder
    entryDate?: SortOrder
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

  export type GoodsReceiptNoteRelationFilter = {
    is?: GoodsReceiptNoteWhereInput
    isNot?: GoodsReceiptNoteWhereInput
  }

  export type GoodsReceiptNoteLineCountOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReceiptNoteLineAvgOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type GoodsReceiptNoteLineMaxOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReceiptNoteLineMinOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReceiptNoteLineSumOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type PurposeNullableRelationFilter = {
    is?: PurposeWhereInput | null
    isNot?: PurposeWhereInput | null
  }

  export type GoodsReturnNoteListRelationFilter = {
    every?: GoodsReturnNoteWhereInput
    some?: GoodsReturnNoteWhereInput
    none?: GoodsReturnNoteWhereInput
  }

  export type GoodsReturnNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GoodsIssueNoteCountOrderByAggregateInput = {
    noteId?: SortOrder
    issuedAt?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
    total?: SortOrder
    securityDeposit?: SortOrder
    fulltext?: SortOrder
  }

  export type GoodsIssueNoteAvgOrderByAggregateInput = {
    total?: SortOrder
    securityDeposit?: SortOrder
  }

  export type GoodsIssueNoteMaxOrderByAggregateInput = {
    noteId?: SortOrder
    issuedAt?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
    total?: SortOrder
    securityDeposit?: SortOrder
    fulltext?: SortOrder
  }

  export type GoodsIssueNoteMinOrderByAggregateInput = {
    noteId?: SortOrder
    issuedAt?: SortOrder
    returnDate?: SortOrder
    status?: SortOrder
    total?: SortOrder
    securityDeposit?: SortOrder
    fulltext?: SortOrder
  }

  export type GoodsIssueNoteSumOrderByAggregateInput = {
    total?: SortOrder
    securityDeposit?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GoodsIssueNoteRelationFilter = {
    is?: GoodsIssueNoteWhereInput
    isNot?: GoodsIssueNoteWhereInput
  }

  export type GoodsIssueNoteLineCountOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
    comments?: SortOrder
    variations?: SortOrder
  }

  export type GoodsIssueNoteLineAvgOrderByAggregateInput = {
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
  }

  export type GoodsIssueNoteLineMaxOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
    comments?: SortOrder
  }

  export type GoodsIssueNoteLineMinOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
    comments?: SortOrder
  }

  export type GoodsIssueNoteLineSumOrderByAggregateInput = {
    price?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    goodQuantitiesReturned?: SortOrder
    badQuantitiesReturned?: SortOrder
    netTotal?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PurposeCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    details?: SortOrder
    noteId?: SortOrder
  }

  export type PurposeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PurposeMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    details?: SortOrder
    noteId?: SortOrder
  }

  export type PurposeMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    notes?: SortOrder
    details?: SortOrder
    noteId?: SortOrder
  }

  export type PurposeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GoodsReturnNoteCountOrderByAggregateInput = {
    noteId?: SortOrder
    goodsIssueNoteId?: SortOrder
    securityDepositWithheld?: SortOrder
    issuedAt?: SortOrder
  }

  export type GoodsReturnNoteAvgOrderByAggregateInput = {
    securityDepositWithheld?: SortOrder
  }

  export type GoodsReturnNoteMaxOrderByAggregateInput = {
    noteId?: SortOrder
    goodsIssueNoteId?: SortOrder
    securityDepositWithheld?: SortOrder
    issuedAt?: SortOrder
  }

  export type GoodsReturnNoteMinOrderByAggregateInput = {
    noteId?: SortOrder
    goodsIssueNoteId?: SortOrder
    securityDepositWithheld?: SortOrder
    issuedAt?: SortOrder
  }

  export type GoodsReturnNoteSumOrderByAggregateInput = {
    securityDepositWithheld?: SortOrder
  }

  export type GoodsReturnNoteRelationFilter = {
    is?: GoodsReturnNoteWhereInput
    isNot?: GoodsReturnNoteWhereInput
  }

  export type GoodsReturnNoteLineCountOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    description?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    variations?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReturnNoteLineAvgOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type GoodsReturnNoteLineMaxOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    description?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReturnNoteLineMinOrderByAggregateInput = {
    noteId?: SortOrder
    lineId?: SortOrder
    description?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
    comments?: SortOrder
  }

  export type GoodsReturnNoteLineSumOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type StockCountOrderByAggregateInput = {
    stockId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    stockId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    stockId?: SortOrder
    productId?: SortOrder
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    goodQuantities?: SortOrder
    badQuantities?: SortOrder
  }

  export type SequenceCountOrderByAggregateInput = {
    name?: SortOrder
    value?: SortOrder
  }

  export type SequenceAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type SequenceMaxOrderByAggregateInput = {
    name?: SortOrder
    value?: SortOrder
  }

  export type SequenceMinOrderByAggregateInput = {
    name?: SortOrder
    value?: SortOrder
  }

  export type SequenceSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateNestedManyWithoutSectionInput = {
    create?: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput> | ProductCreateWithoutSectionInput[] | ProductUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSectionInput | ProductCreateOrConnectWithoutSectionInput[]
    createMany?: ProductCreateManySectionInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput> | ProductCreateWithoutSectionInput[] | ProductUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSectionInput | ProductCreateOrConnectWithoutSectionInput[]
    createMany?: ProductCreateManySectionInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductUpdateManyWithoutSectionNestedInput = {
    create?: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput> | ProductCreateWithoutSectionInput[] | ProductUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSectionInput | ProductCreateOrConnectWithoutSectionInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSectionInput | ProductUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: ProductCreateManySectionInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSectionInput | ProductUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSectionInput | ProductUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput> | ProductCreateWithoutSectionInput[] | ProductUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutSectionInput | ProductCreateOrConnectWithoutSectionInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutSectionInput | ProductUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: ProductCreateManySectionInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutSectionInput | ProductUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutSectionInput | ProductUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutProductsInput = {
    create?: XOR<SectionCreateWithoutProductsInput, SectionUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutProductsInput
    connect?: SectionWhereUniqueInput
  }

  export type ProductVariationsCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput> | ProductVariationsCreateWithoutProductInput[] | ProductVariationsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariationsCreateOrConnectWithoutProductInput | ProductVariationsCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariationsCreateManyProductInputEnvelope
    connect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
  }

  export type GoodsReceiptNoteLineCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput> | GoodsReceiptNoteLineCreateWithoutProductInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutProductInput | GoodsReceiptNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsReceiptNoteLineCreateManyProductInputEnvelope
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
  }

  export type GoodsIssueNoteLineCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput> | GoodsIssueNoteLineCreateWithoutProductInput[] | GoodsIssueNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutProductInput | GoodsIssueNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsIssueNoteLineCreateManyProductInputEnvelope
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
  }

  export type GoodsReturnNoteLineCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput> | GoodsReturnNoteLineCreateWithoutProductInput[] | GoodsReturnNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutProductInput | GoodsReturnNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsReturnNoteLineCreateManyProductInputEnvelope
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
  }

  export type StockCreateNestedOneWithoutProductInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    connect?: StockWhereUniqueInput
  }

  export type ProductVariationsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput> | ProductVariationsCreateWithoutProductInput[] | ProductVariationsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariationsCreateOrConnectWithoutProductInput | ProductVariationsCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariationsCreateManyProductInputEnvelope
    connect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
  }

  export type GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput> | GoodsReceiptNoteLineCreateWithoutProductInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutProductInput | GoodsReceiptNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsReceiptNoteLineCreateManyProductInputEnvelope
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
  }

  export type GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput> | GoodsIssueNoteLineCreateWithoutProductInput[] | GoodsIssueNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutProductInput | GoodsIssueNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsIssueNoteLineCreateManyProductInputEnvelope
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
  }

  export type GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput> | GoodsReturnNoteLineCreateWithoutProductInput[] | GoodsReturnNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutProductInput | GoodsReturnNoteLineCreateOrConnectWithoutProductInput[]
    createMany?: GoodsReturnNoteLineCreateManyProductInputEnvelope
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedOneWithoutProductInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    connect?: StockWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type SectionUpdateOneWithoutProductsNestedInput = {
    create?: XOR<SectionCreateWithoutProductsInput, SectionUncheckedCreateWithoutProductsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutProductsInput
    upsert?: SectionUpsertWithoutProductsInput
    disconnect?: SectionWhereInput | boolean
    delete?: SectionWhereInput | boolean
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutProductsInput, SectionUpdateWithoutProductsInput>, SectionUncheckedUpdateWithoutProductsInput>
  }

  export type ProductVariationsUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput> | ProductVariationsCreateWithoutProductInput[] | ProductVariationsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariationsCreateOrConnectWithoutProductInput | ProductVariationsCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariationsUpsertWithWhereUniqueWithoutProductInput | ProductVariationsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariationsCreateManyProductInputEnvelope
    set?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    disconnect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    delete?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    connect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    update?: ProductVariationsUpdateWithWhereUniqueWithoutProductInput | ProductVariationsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariationsUpdateManyWithWhereWithoutProductInput | ProductVariationsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariationsScalarWhereInput | ProductVariationsScalarWhereInput[]
  }

  export type GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput> | GoodsReceiptNoteLineCreateWithoutProductInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutProductInput | GoodsReceiptNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsReceiptNoteLineCreateManyProductInputEnvelope
    set?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    disconnect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    delete?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    update?: GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsReceiptNoteLineUpdateManyWithWhereWithoutProductInput | GoodsReceiptNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
  }

  export type GoodsIssueNoteLineUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput> | GoodsIssueNoteLineCreateWithoutProductInput[] | GoodsIssueNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutProductInput | GoodsIssueNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsIssueNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsIssueNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsIssueNoteLineCreateManyProductInputEnvelope
    set?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    disconnect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    delete?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    update?: GoodsIssueNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsIssueNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsIssueNoteLineUpdateManyWithWhereWithoutProductInput | GoodsIssueNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteLineUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput> | GoodsReturnNoteLineCreateWithoutProductInput[] | GoodsReturnNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutProductInput | GoodsReturnNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsReturnNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsReturnNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsReturnNoteLineCreateManyProductInputEnvelope
    set?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    disconnect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    delete?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    update?: GoodsReturnNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsReturnNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsReturnNoteLineUpdateManyWithWhereWithoutProductInput | GoodsReturnNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
  }

  export type StockUpdateOneWithoutProductNestedInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    upsert?: StockUpsertWithoutProductInput
    disconnect?: StockWhereInput | boolean
    delete?: StockWhereInput | boolean
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutProductInput, StockUpdateWithoutProductInput>, StockUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariationsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput> | ProductVariationsCreateWithoutProductInput[] | ProductVariationsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariationsCreateOrConnectWithoutProductInput | ProductVariationsCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariationsUpsertWithWhereUniqueWithoutProductInput | ProductVariationsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariationsCreateManyProductInputEnvelope
    set?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    disconnect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    delete?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    connect?: ProductVariationsWhereUniqueInput | ProductVariationsWhereUniqueInput[]
    update?: ProductVariationsUpdateWithWhereUniqueWithoutProductInput | ProductVariationsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariationsUpdateManyWithWhereWithoutProductInput | ProductVariationsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariationsScalarWhereInput | ProductVariationsScalarWhereInput[]
  }

  export type GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput> | GoodsReceiptNoteLineCreateWithoutProductInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutProductInput | GoodsReceiptNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsReceiptNoteLineCreateManyProductInputEnvelope
    set?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    disconnect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    delete?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    update?: GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsReceiptNoteLineUpdateManyWithWhereWithoutProductInput | GoodsReceiptNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
  }

  export type GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput> | GoodsIssueNoteLineCreateWithoutProductInput[] | GoodsIssueNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutProductInput | GoodsIssueNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsIssueNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsIssueNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsIssueNoteLineCreateManyProductInputEnvelope
    set?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    disconnect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    delete?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    update?: GoodsIssueNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsIssueNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsIssueNoteLineUpdateManyWithWhereWithoutProductInput | GoodsIssueNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput> | GoodsReturnNoteLineCreateWithoutProductInput[] | GoodsReturnNoteLineUncheckedCreateWithoutProductInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutProductInput | GoodsReturnNoteLineCreateOrConnectWithoutProductInput[]
    upsert?: GoodsReturnNoteLineUpsertWithWhereUniqueWithoutProductInput | GoodsReturnNoteLineUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: GoodsReturnNoteLineCreateManyProductInputEnvelope
    set?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    disconnect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    delete?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    update?: GoodsReturnNoteLineUpdateWithWhereUniqueWithoutProductInput | GoodsReturnNoteLineUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: GoodsReturnNoteLineUpdateManyWithWhereWithoutProductInput | GoodsReturnNoteLineUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
  }

  export type StockUncheckedUpdateOneWithoutProductNestedInput = {
    create?: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    connectOrCreate?: StockCreateOrConnectWithoutProductInput
    upsert?: StockUpsertWithoutProductInput
    disconnect?: StockWhereInput | boolean
    delete?: StockWhereInput | boolean
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutProductInput, StockUpdateWithoutProductInput>, StockUncheckedUpdateWithoutProductInput>
  }

  export type ProductCreateNestedOneWithoutVariationsInput = {
    create?: XOR<ProductCreateWithoutVariationsInput, ProductUncheckedCreateWithoutVariationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariationsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutVariationsNestedInput = {
    create?: XOR<ProductCreateWithoutVariationsInput, ProductUncheckedCreateWithoutVariationsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariationsInput
    upsert?: ProductUpsertWithoutVariationsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariationsInput, ProductUpdateWithoutVariationsInput>, ProductUncheckedUpdateWithoutVariationsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GoodsReceiptNoteLineCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput> | GoodsReceiptNoteLineCreateWithoutNoteInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput | GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsReceiptNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
  }

  export type GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput> | GoodsReceiptNoteLineCreateWithoutNoteInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput | GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsReceiptNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GoodsReceiptNoteLineUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput> | GoodsReceiptNoteLineCreateWithoutNoteInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput | GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsReceiptNoteLineCreateManyNoteInputEnvelope
    set?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    disconnect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    delete?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    update?: GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsReceiptNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsReceiptNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
  }

  export type GoodsReceiptNoteLineUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput> | GoodsReceiptNoteLineCreateWithoutNoteInput[] | GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput | GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsReceiptNoteLineCreateManyNoteInputEnvelope
    set?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    disconnect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    delete?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    connect?: GoodsReceiptNoteLineWhereUniqueInput | GoodsReceiptNoteLineWhereUniqueInput[]
    update?: GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsReceiptNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsReceiptNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
  }

  export type GoodsReceiptNoteCreateNestedOneWithoutLinesInput = {
    create?: XOR<GoodsReceiptNoteCreateWithoutLinesInput, GoodsReceiptNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsReceiptNoteCreateOrConnectWithoutLinesInput
    connect?: GoodsReceiptNoteWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReceiptNoteLinesInput = {
    create?: XOR<ProductCreateWithoutReceiptNoteLinesInput, ProductUncheckedCreateWithoutReceiptNoteLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReceiptNoteLinesInput
    connect?: ProductWhereUniqueInput
  }

  export type GoodsReceiptNoteUpdateOneRequiredWithoutLinesNestedInput = {
    create?: XOR<GoodsReceiptNoteCreateWithoutLinesInput, GoodsReceiptNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsReceiptNoteCreateOrConnectWithoutLinesInput
    upsert?: GoodsReceiptNoteUpsertWithoutLinesInput
    connect?: GoodsReceiptNoteWhereUniqueInput
    update?: XOR<XOR<GoodsReceiptNoteUpdateToOneWithWhereWithoutLinesInput, GoodsReceiptNoteUpdateWithoutLinesInput>, GoodsReceiptNoteUncheckedUpdateWithoutLinesInput>
  }

  export type ProductUpdateOneRequiredWithoutReceiptNoteLinesNestedInput = {
    create?: XOR<ProductCreateWithoutReceiptNoteLinesInput, ProductUncheckedCreateWithoutReceiptNoteLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReceiptNoteLinesInput
    upsert?: ProductUpsertWithoutReceiptNoteLinesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReceiptNoteLinesInput, ProductUpdateWithoutReceiptNoteLinesInput>, ProductUncheckedUpdateWithoutReceiptNoteLinesInput>
  }

  export type PurposeCreateNestedOneWithoutNoteInput = {
    create?: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: PurposeCreateOrConnectWithoutNoteInput
    connect?: PurposeWhereUniqueInput
  }

  export type GoodsIssueNoteLineCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput> | GoodsIssueNoteLineCreateWithoutNoteInput[] | GoodsIssueNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutNoteInput | GoodsIssueNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsIssueNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
  }

  export type GoodsReturnNoteCreateNestedManyWithoutGoodsIssueNoteInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput> | GoodsReturnNoteCreateWithoutGoodsIssueNoteInput[] | GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput[]
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput | GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput[]
    createMany?: GoodsReturnNoteCreateManyGoodsIssueNoteInputEnvelope
    connect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
  }

  export type PurposeUncheckedCreateNestedOneWithoutNoteInput = {
    create?: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: PurposeCreateOrConnectWithoutNoteInput
    connect?: PurposeWhereUniqueInput
  }

  export type GoodsIssueNoteLineUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput> | GoodsIssueNoteLineCreateWithoutNoteInput[] | GoodsIssueNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutNoteInput | GoodsIssueNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsIssueNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
  }

  export type GoodsReturnNoteUncheckedCreateNestedManyWithoutGoodsIssueNoteInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput> | GoodsReturnNoteCreateWithoutGoodsIssueNoteInput[] | GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput[]
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput | GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput[]
    createMany?: GoodsReturnNoteCreateManyGoodsIssueNoteInputEnvelope
    connect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
  }

  export type PurposeUpdateOneWithoutNoteNestedInput = {
    create?: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: PurposeCreateOrConnectWithoutNoteInput
    upsert?: PurposeUpsertWithoutNoteInput
    disconnect?: PurposeWhereInput | boolean
    delete?: PurposeWhereInput | boolean
    connect?: PurposeWhereUniqueInput
    update?: XOR<XOR<PurposeUpdateToOneWithWhereWithoutNoteInput, PurposeUpdateWithoutNoteInput>, PurposeUncheckedUpdateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput> | GoodsIssueNoteLineCreateWithoutNoteInput[] | GoodsIssueNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutNoteInput | GoodsIssueNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsIssueNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsIssueNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsIssueNoteLineCreateManyNoteInputEnvelope
    set?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    disconnect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    delete?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    update?: GoodsIssueNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsIssueNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsIssueNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsIssueNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteUpdateManyWithoutGoodsIssueNoteNestedInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput> | GoodsReturnNoteCreateWithoutGoodsIssueNoteInput[] | GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput[]
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput | GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput[]
    upsert?: GoodsReturnNoteUpsertWithWhereUniqueWithoutGoodsIssueNoteInput | GoodsReturnNoteUpsertWithWhereUniqueWithoutGoodsIssueNoteInput[]
    createMany?: GoodsReturnNoteCreateManyGoodsIssueNoteInputEnvelope
    set?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    disconnect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    delete?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    connect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    update?: GoodsReturnNoteUpdateWithWhereUniqueWithoutGoodsIssueNoteInput | GoodsReturnNoteUpdateWithWhereUniqueWithoutGoodsIssueNoteInput[]
    updateMany?: GoodsReturnNoteUpdateManyWithWhereWithoutGoodsIssueNoteInput | GoodsReturnNoteUpdateManyWithWhereWithoutGoodsIssueNoteInput[]
    deleteMany?: GoodsReturnNoteScalarWhereInput | GoodsReturnNoteScalarWhereInput[]
  }

  export type PurposeUncheckedUpdateOneWithoutNoteNestedInput = {
    create?: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
    connectOrCreate?: PurposeCreateOrConnectWithoutNoteInput
    upsert?: PurposeUpsertWithoutNoteInput
    disconnect?: PurposeWhereInput | boolean
    delete?: PurposeWhereInput | boolean
    connect?: PurposeWhereUniqueInput
    update?: XOR<XOR<PurposeUpdateToOneWithWhereWithoutNoteInput, PurposeUpdateWithoutNoteInput>, PurposeUncheckedUpdateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput> | GoodsIssueNoteLineCreateWithoutNoteInput[] | GoodsIssueNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsIssueNoteLineCreateOrConnectWithoutNoteInput | GoodsIssueNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsIssueNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsIssueNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsIssueNoteLineCreateManyNoteInputEnvelope
    set?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    disconnect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    delete?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    connect?: GoodsIssueNoteLineWhereUniqueInput | GoodsIssueNoteLineWhereUniqueInput[]
    update?: GoodsIssueNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsIssueNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsIssueNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsIssueNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteNestedInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput> | GoodsReturnNoteCreateWithoutGoodsIssueNoteInput[] | GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput[]
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput | GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput[]
    upsert?: GoodsReturnNoteUpsertWithWhereUniqueWithoutGoodsIssueNoteInput | GoodsReturnNoteUpsertWithWhereUniqueWithoutGoodsIssueNoteInput[]
    createMany?: GoodsReturnNoteCreateManyGoodsIssueNoteInputEnvelope
    set?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    disconnect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    delete?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    connect?: GoodsReturnNoteWhereUniqueInput | GoodsReturnNoteWhereUniqueInput[]
    update?: GoodsReturnNoteUpdateWithWhereUniqueWithoutGoodsIssueNoteInput | GoodsReturnNoteUpdateWithWhereUniqueWithoutGoodsIssueNoteInput[]
    updateMany?: GoodsReturnNoteUpdateManyWithWhereWithoutGoodsIssueNoteInput | GoodsReturnNoteUpdateManyWithWhereWithoutGoodsIssueNoteInput[]
    deleteMany?: GoodsReturnNoteScalarWhereInput | GoodsReturnNoteScalarWhereInput[]
  }

  export type GoodsIssueNoteCreateNestedOneWithoutLinesInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutLinesInput, GoodsIssueNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutLinesInput
    connect?: GoodsIssueNoteWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutIssueNoteLinesInput = {
    create?: XOR<ProductCreateWithoutIssueNoteLinesInput, ProductUncheckedCreateWithoutIssueNoteLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutIssueNoteLinesInput
    connect?: ProductWhereUniqueInput
  }

  export type GoodsIssueNoteUpdateOneRequiredWithoutLinesNestedInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutLinesInput, GoodsIssueNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutLinesInput
    upsert?: GoodsIssueNoteUpsertWithoutLinesInput
    connect?: GoodsIssueNoteWhereUniqueInput
    update?: XOR<XOR<GoodsIssueNoteUpdateToOneWithWhereWithoutLinesInput, GoodsIssueNoteUpdateWithoutLinesInput>, GoodsIssueNoteUncheckedUpdateWithoutLinesInput>
  }

  export type ProductUpdateOneRequiredWithoutIssueNoteLinesNestedInput = {
    create?: XOR<ProductCreateWithoutIssueNoteLinesInput, ProductUncheckedCreateWithoutIssueNoteLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutIssueNoteLinesInput
    upsert?: ProductUpsertWithoutIssueNoteLinesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutIssueNoteLinesInput, ProductUpdateWithoutIssueNoteLinesInput>, ProductUncheckedUpdateWithoutIssueNoteLinesInput>
  }

  export type GoodsIssueNoteCreateNestedOneWithoutPurposeInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutPurposeInput, GoodsIssueNoteUncheckedCreateWithoutPurposeInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutPurposeInput
    connect?: GoodsIssueNoteWhereUniqueInput
  }

  export type GoodsIssueNoteUpdateOneRequiredWithoutPurposeNestedInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutPurposeInput, GoodsIssueNoteUncheckedCreateWithoutPurposeInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutPurposeInput
    upsert?: GoodsIssueNoteUpsertWithoutPurposeInput
    connect?: GoodsIssueNoteWhereUniqueInput
    update?: XOR<XOR<GoodsIssueNoteUpdateToOneWithWhereWithoutPurposeInput, GoodsIssueNoteUpdateWithoutPurposeInput>, GoodsIssueNoteUncheckedUpdateWithoutPurposeInput>
  }

  export type GoodsIssueNoteCreateNestedOneWithoutGoodsReturnNotesInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedCreateWithoutGoodsReturnNotesInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutGoodsReturnNotesInput
    connect?: GoodsIssueNoteWhereUniqueInput
  }

  export type GoodsReturnNoteLineCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput> | GoodsReturnNoteLineCreateWithoutNoteInput[] | GoodsReturnNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutNoteInput | GoodsReturnNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsReturnNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
  }

  export type GoodsReturnNoteLineUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput> | GoodsReturnNoteLineCreateWithoutNoteInput[] | GoodsReturnNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutNoteInput | GoodsReturnNoteLineCreateOrConnectWithoutNoteInput[]
    createMany?: GoodsReturnNoteLineCreateManyNoteInputEnvelope
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
  }

  export type GoodsIssueNoteUpdateOneRequiredWithoutGoodsReturnNotesNestedInput = {
    create?: XOR<GoodsIssueNoteCreateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedCreateWithoutGoodsReturnNotesInput>
    connectOrCreate?: GoodsIssueNoteCreateOrConnectWithoutGoodsReturnNotesInput
    upsert?: GoodsIssueNoteUpsertWithoutGoodsReturnNotesInput
    connect?: GoodsIssueNoteWhereUniqueInput
    update?: XOR<XOR<GoodsIssueNoteUpdateToOneWithWhereWithoutGoodsReturnNotesInput, GoodsIssueNoteUpdateWithoutGoodsReturnNotesInput>, GoodsIssueNoteUncheckedUpdateWithoutGoodsReturnNotesInput>
  }

  export type GoodsReturnNoteLineUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput> | GoodsReturnNoteLineCreateWithoutNoteInput[] | GoodsReturnNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutNoteInput | GoodsReturnNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsReturnNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsReturnNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsReturnNoteLineCreateManyNoteInputEnvelope
    set?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    disconnect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    delete?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    update?: GoodsReturnNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsReturnNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsReturnNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsReturnNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteLineUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput> | GoodsReturnNoteLineCreateWithoutNoteInput[] | GoodsReturnNoteLineUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: GoodsReturnNoteLineCreateOrConnectWithoutNoteInput | GoodsReturnNoteLineCreateOrConnectWithoutNoteInput[]
    upsert?: GoodsReturnNoteLineUpsertWithWhereUniqueWithoutNoteInput | GoodsReturnNoteLineUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: GoodsReturnNoteLineCreateManyNoteInputEnvelope
    set?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    disconnect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    delete?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    connect?: GoodsReturnNoteLineWhereUniqueInput | GoodsReturnNoteLineWhereUniqueInput[]
    update?: GoodsReturnNoteLineUpdateWithWhereUniqueWithoutNoteInput | GoodsReturnNoteLineUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: GoodsReturnNoteLineUpdateManyWithWhereWithoutNoteInput | GoodsReturnNoteLineUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
  }

  export type GoodsReturnNoteCreateNestedOneWithoutLinesInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutLinesInput, GoodsReturnNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutLinesInput
    connect?: GoodsReturnNoteWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReturnLinesInput = {
    create?: XOR<ProductCreateWithoutReturnLinesInput, ProductUncheckedCreateWithoutReturnLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReturnLinesInput
    connect?: ProductWhereUniqueInput
  }

  export type GoodsReturnNoteUpdateOneRequiredWithoutLinesNestedInput = {
    create?: XOR<GoodsReturnNoteCreateWithoutLinesInput, GoodsReturnNoteUncheckedCreateWithoutLinesInput>
    connectOrCreate?: GoodsReturnNoteCreateOrConnectWithoutLinesInput
    upsert?: GoodsReturnNoteUpsertWithoutLinesInput
    connect?: GoodsReturnNoteWhereUniqueInput
    update?: XOR<XOR<GoodsReturnNoteUpdateToOneWithWhereWithoutLinesInput, GoodsReturnNoteUpdateWithoutLinesInput>, GoodsReturnNoteUncheckedUpdateWithoutLinesInput>
  }

  export type ProductUpdateOneRequiredWithoutReturnLinesNestedInput = {
    create?: XOR<ProductCreateWithoutReturnLinesInput, ProductUncheckedCreateWithoutReturnLinesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReturnLinesInput
    upsert?: ProductUpsertWithoutReturnLinesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReturnLinesInput, ProductUpdateWithoutReturnLinesInput>, ProductUncheckedUpdateWithoutReturnLinesInput>
  }

  export type ProductCreateNestedOneWithoutStockInput = {
    create?: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStockInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutStockNestedInput = {
    create?: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    connectOrCreate?: ProductCreateOrConnectWithoutStockInput
    upsert?: ProductUpsertWithoutStockInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutStockInput, ProductUpdateWithoutStockInput>, ProductUncheckedUpdateWithoutStockInput>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProductCreateWithoutCategoryInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    productId: string
    name: string
    price: number
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    productId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: FloatFilter<"Product"> | number
    categoryId?: StringNullableFilter<"Product"> | string | null
    sectionId?: StringNullableFilter<"Product"> | string | null
    tags?: StringNullableFilter<"Product"> | string | null
    fulltext?: StringFilter<"Product"> | string
  }

  export type ProductCreateWithoutSectionInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutSectionInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutSectionInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput>
  }

  export type ProductCreateManySectionInputEnvelope = {
    data: ProductCreateManySectionInput | ProductCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutSectionInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutSectionInput, ProductUncheckedUpdateWithoutSectionInput>
    create: XOR<ProductCreateWithoutSectionInput, ProductUncheckedCreateWithoutSectionInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutSectionInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutSectionInput, ProductUncheckedUpdateWithoutSectionInput>
  }

  export type ProductUpdateManyWithWhereWithoutSectionInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutSectionInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    categoryId: string
    name: string
    description?: string | null
    variations?: string | null
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    categoryId: string
    name: string
    description?: string | null
    variations?: string | null
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type SectionCreateWithoutProductsInput = {
    sectionId: string
    name: string
  }

  export type SectionUncheckedCreateWithoutProductsInput = {
    sectionId: string
    name: string
  }

  export type SectionCreateOrConnectWithoutProductsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutProductsInput, SectionUncheckedCreateWithoutProductsInput>
  }

  export type ProductVariationsCreateWithoutProductInput = {
    variationId: string
    value: string
  }

  export type ProductVariationsUncheckedCreateWithoutProductInput = {
    id?: number
    variationId: string
    value: string
  }

  export type ProductVariationsCreateOrConnectWithoutProductInput = {
    where: ProductVariationsWhereUniqueInput
    create: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput>
  }

  export type ProductVariationsCreateManyProductInputEnvelope = {
    data: ProductVariationsCreateManyProductInput | ProductVariationsCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type GoodsReceiptNoteLineCreateWithoutProductInput = {
    lineId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
    note: GoodsReceiptNoteCreateNestedOneWithoutLinesInput
  }

  export type GoodsReceiptNoteLineUncheckedCreateWithoutProductInput = {
    noteId: string
    lineId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsReceiptNoteLineCreateOrConnectWithoutProductInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    create: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsReceiptNoteLineCreateManyProductInputEnvelope = {
    data: GoodsReceiptNoteLineCreateManyProductInput | GoodsReceiptNoteLineCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type GoodsIssueNoteLineCreateWithoutProductInput = {
    lineId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    note: GoodsIssueNoteCreateNestedOneWithoutLinesInput
  }

  export type GoodsIssueNoteLineUncheckedCreateWithoutProductInput = {
    noteId: string
    lineId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineCreateOrConnectWithoutProductInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    create: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsIssueNoteLineCreateManyProductInputEnvelope = {
    data: GoodsIssueNoteLineCreateManyProductInput | GoodsIssueNoteLineCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type GoodsReturnNoteLineCreateWithoutProductInput = {
    lineId: string
    description: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
    note: GoodsReturnNoteCreateNestedOneWithoutLinesInput
  }

  export type GoodsReturnNoteLineUncheckedCreateWithoutProductInput = {
    noteId: string
    lineId: string
    description: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type GoodsReturnNoteLineCreateOrConnectWithoutProductInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    create: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsReturnNoteLineCreateManyProductInputEnvelope = {
    data: GoodsReturnNoteLineCreateManyProductInput | GoodsReturnNoteLineCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StockCreateWithoutProductInput = {
    stockId: string
    goodQuantities?: number
    badQuantities?: number
  }

  export type StockUncheckedCreateWithoutProductInput = {
    stockId: string
    goodQuantities?: number
    badQuantities?: number
  }

  export type StockCreateOrConnectWithoutProductInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SectionUpsertWithoutProductsInput = {
    update: XOR<SectionUpdateWithoutProductsInput, SectionUncheckedUpdateWithoutProductsInput>
    create: XOR<SectionCreateWithoutProductsInput, SectionUncheckedCreateWithoutProductsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutProductsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutProductsInput, SectionUncheckedUpdateWithoutProductsInput>
  }

  export type SectionUpdateWithoutProductsInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SectionUncheckedUpdateWithoutProductsInput = {
    sectionId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariationsWhereUniqueInput
    update: XOR<ProductVariationsUpdateWithoutProductInput, ProductVariationsUncheckedUpdateWithoutProductInput>
    create: XOR<ProductVariationsCreateWithoutProductInput, ProductVariationsUncheckedCreateWithoutProductInput>
  }

  export type ProductVariationsUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariationsWhereUniqueInput
    data: XOR<ProductVariationsUpdateWithoutProductInput, ProductVariationsUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariationsUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariationsScalarWhereInput
    data: XOR<ProductVariationsUpdateManyMutationInput, ProductVariationsUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductVariationsScalarWhereInput = {
    AND?: ProductVariationsScalarWhereInput | ProductVariationsScalarWhereInput[]
    OR?: ProductVariationsScalarWhereInput[]
    NOT?: ProductVariationsScalarWhereInput | ProductVariationsScalarWhereInput[]
    id?: IntFilter<"ProductVariations"> | number
    variationId?: StringFilter<"ProductVariations"> | string
    value?: StringFilter<"ProductVariations"> | string
    productId?: StringFilter<"ProductVariations"> | string
  }

  export type GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutProductInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    update: XOR<GoodsReceiptNoteLineUpdateWithoutProductInput, GoodsReceiptNoteLineUncheckedUpdateWithoutProductInput>
    create: XOR<GoodsReceiptNoteLineCreateWithoutProductInput, GoodsReceiptNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutProductInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    data: XOR<GoodsReceiptNoteLineUpdateWithoutProductInput, GoodsReceiptNoteLineUncheckedUpdateWithoutProductInput>
  }

  export type GoodsReceiptNoteLineUpdateManyWithWhereWithoutProductInput = {
    where: GoodsReceiptNoteLineScalarWhereInput
    data: XOR<GoodsReceiptNoteLineUpdateManyMutationInput, GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductInput>
  }

  export type GoodsReceiptNoteLineScalarWhereInput = {
    AND?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
    OR?: GoodsReceiptNoteLineScalarWhereInput[]
    NOT?: GoodsReceiptNoteLineScalarWhereInput | GoodsReceiptNoteLineScalarWhereInput[]
    noteId?: StringFilter<"GoodsReceiptNoteLine"> | string
    lineId?: StringFilter<"GoodsReceiptNoteLine"> | string
    productId?: StringFilter<"GoodsReceiptNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReceiptNoteLine"> | number
    comments?: StringNullableFilter<"GoodsReceiptNoteLine"> | string | null
  }

  export type GoodsIssueNoteLineUpsertWithWhereUniqueWithoutProductInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    update: XOR<GoodsIssueNoteLineUpdateWithoutProductInput, GoodsIssueNoteLineUncheckedUpdateWithoutProductInput>
    create: XOR<GoodsIssueNoteLineCreateWithoutProductInput, GoodsIssueNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsIssueNoteLineUpdateWithWhereUniqueWithoutProductInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    data: XOR<GoodsIssueNoteLineUpdateWithoutProductInput, GoodsIssueNoteLineUncheckedUpdateWithoutProductInput>
  }

  export type GoodsIssueNoteLineUpdateManyWithWhereWithoutProductInput = {
    where: GoodsIssueNoteLineScalarWhereInput
    data: XOR<GoodsIssueNoteLineUpdateManyMutationInput, GoodsIssueNoteLineUncheckedUpdateManyWithoutProductInput>
  }

  export type GoodsIssueNoteLineScalarWhereInput = {
    AND?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
    OR?: GoodsIssueNoteLineScalarWhereInput[]
    NOT?: GoodsIssueNoteLineScalarWhereInput | GoodsIssueNoteLineScalarWhereInput[]
    noteId?: StringFilter<"GoodsIssueNoteLine"> | string
    lineId?: StringFilter<"GoodsIssueNoteLine"> | string
    productId?: StringFilter<"GoodsIssueNoteLine"> | string
    name?: StringFilter<"GoodsIssueNoteLine"> | string
    price?: FloatFilter<"GoodsIssueNoteLine"> | number
    goodQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantities?: IntFilter<"GoodsIssueNoteLine"> | number
    goodQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    badQuantitiesReturned?: IntFilter<"GoodsIssueNoteLine"> | number
    netTotal?: FloatFilter<"GoodsIssueNoteLine"> | number
    comments?: StringNullableFilter<"GoodsIssueNoteLine"> | string | null
    variations?: JsonNullableFilter<"GoodsIssueNoteLine">
  }

  export type GoodsReturnNoteLineUpsertWithWhereUniqueWithoutProductInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    update: XOR<GoodsReturnNoteLineUpdateWithoutProductInput, GoodsReturnNoteLineUncheckedUpdateWithoutProductInput>
    create: XOR<GoodsReturnNoteLineCreateWithoutProductInput, GoodsReturnNoteLineUncheckedCreateWithoutProductInput>
  }

  export type GoodsReturnNoteLineUpdateWithWhereUniqueWithoutProductInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    data: XOR<GoodsReturnNoteLineUpdateWithoutProductInput, GoodsReturnNoteLineUncheckedUpdateWithoutProductInput>
  }

  export type GoodsReturnNoteLineUpdateManyWithWhereWithoutProductInput = {
    where: GoodsReturnNoteLineScalarWhereInput
    data: XOR<GoodsReturnNoteLineUpdateManyMutationInput, GoodsReturnNoteLineUncheckedUpdateManyWithoutProductInput>
  }

  export type GoodsReturnNoteLineScalarWhereInput = {
    AND?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
    OR?: GoodsReturnNoteLineScalarWhereInput[]
    NOT?: GoodsReturnNoteLineScalarWhereInput | GoodsReturnNoteLineScalarWhereInput[]
    noteId?: StringFilter<"GoodsReturnNoteLine"> | string
    lineId?: StringFilter<"GoodsReturnNoteLine"> | string
    description?: StringFilter<"GoodsReturnNoteLine"> | string
    productId?: StringFilter<"GoodsReturnNoteLine"> | string
    goodQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    badQuantities?: IntFilter<"GoodsReturnNoteLine"> | number
    variations?: JsonNullableFilter<"GoodsReturnNoteLine">
    comments?: StringNullableFilter<"GoodsReturnNoteLine"> | string | null
  }

  export type StockUpsertWithoutProductInput = {
    update: XOR<StockUpdateWithoutProductInput, StockUncheckedUpdateWithoutProductInput>
    create: XOR<StockCreateWithoutProductInput, StockUncheckedCreateWithoutProductInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutProductInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutProductInput, StockUncheckedUpdateWithoutProductInput>
  }

  export type StockUpdateWithoutProductInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
  }

  export type StockUncheckedUpdateWithoutProductInput = {
    stockId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateWithoutVariationsInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVariationsInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVariationsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariationsInput, ProductUncheckedCreateWithoutVariationsInput>
  }

  export type ProductUpsertWithoutVariationsInput = {
    update: XOR<ProductUpdateWithoutVariationsInput, ProductUncheckedUpdateWithoutVariationsInput>
    create: XOR<ProductCreateWithoutVariationsInput, ProductUncheckedCreateWithoutVariationsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariationsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariationsInput, ProductUncheckedUpdateWithoutVariationsInput>
  }

  export type ProductUpdateWithoutVariationsInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariationsInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type GoodsReceiptNoteLineCreateWithoutNoteInput = {
    lineId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
    product: ProductCreateNestedOneWithoutReceiptNoteLinesInput
  }

  export type GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput = {
    lineId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsReceiptNoteLineCreateOrConnectWithoutNoteInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    create: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsReceiptNoteLineCreateManyNoteInputEnvelope = {
    data: GoodsReceiptNoteLineCreateManyNoteInput | GoodsReceiptNoteLineCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type GoodsReceiptNoteLineUpsertWithWhereUniqueWithoutNoteInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    update: XOR<GoodsReceiptNoteLineUpdateWithoutNoteInput, GoodsReceiptNoteLineUncheckedUpdateWithoutNoteInput>
    create: XOR<GoodsReceiptNoteLineCreateWithoutNoteInput, GoodsReceiptNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsReceiptNoteLineUpdateWithWhereUniqueWithoutNoteInput = {
    where: GoodsReceiptNoteLineWhereUniqueInput
    data: XOR<GoodsReceiptNoteLineUpdateWithoutNoteInput, GoodsReceiptNoteLineUncheckedUpdateWithoutNoteInput>
  }

  export type GoodsReceiptNoteLineUpdateManyWithWhereWithoutNoteInput = {
    where: GoodsReceiptNoteLineScalarWhereInput
    data: XOR<GoodsReceiptNoteLineUpdateManyMutationInput, GoodsReceiptNoteLineUncheckedUpdateManyWithoutNoteInput>
  }

  export type GoodsReceiptNoteCreateWithoutLinesInput = {
    noteId: string
    entryDate: Date | string
  }

  export type GoodsReceiptNoteUncheckedCreateWithoutLinesInput = {
    noteId: string
    entryDate: Date | string
  }

  export type GoodsReceiptNoteCreateOrConnectWithoutLinesInput = {
    where: GoodsReceiptNoteWhereUniqueInput
    create: XOR<GoodsReceiptNoteCreateWithoutLinesInput, GoodsReceiptNoteUncheckedCreateWithoutLinesInput>
  }

  export type ProductCreateWithoutReceiptNoteLinesInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReceiptNoteLinesInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReceiptNoteLinesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReceiptNoteLinesInput, ProductUncheckedCreateWithoutReceiptNoteLinesInput>
  }

  export type GoodsReceiptNoteUpsertWithoutLinesInput = {
    update: XOR<GoodsReceiptNoteUpdateWithoutLinesInput, GoodsReceiptNoteUncheckedUpdateWithoutLinesInput>
    create: XOR<GoodsReceiptNoteCreateWithoutLinesInput, GoodsReceiptNoteUncheckedCreateWithoutLinesInput>
    where?: GoodsReceiptNoteWhereInput
  }

  export type GoodsReceiptNoteUpdateToOneWithWhereWithoutLinesInput = {
    where?: GoodsReceiptNoteWhereInput
    data: XOR<GoodsReceiptNoteUpdateWithoutLinesInput, GoodsReceiptNoteUncheckedUpdateWithoutLinesInput>
  }

  export type GoodsReceiptNoteUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReceiptNoteUncheckedUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    entryDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutReceiptNoteLinesInput = {
    update: XOR<ProductUpdateWithoutReceiptNoteLinesInput, ProductUncheckedUpdateWithoutReceiptNoteLinesInput>
    create: XOR<ProductCreateWithoutReceiptNoteLinesInput, ProductUncheckedCreateWithoutReceiptNoteLinesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReceiptNoteLinesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReceiptNoteLinesInput, ProductUncheckedUpdateWithoutReceiptNoteLinesInput>
  }

  export type ProductUpdateWithoutReceiptNoteLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReceiptNoteLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type PurposeCreateWithoutNoteInput = {
    description: string
    notes: string
    details?: string | null
  }

  export type PurposeUncheckedCreateWithoutNoteInput = {
    id?: number
    description: string
    notes: string
    details?: string | null
  }

  export type PurposeCreateOrConnectWithoutNoteInput = {
    where: PurposeWhereUniqueInput
    create: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineCreateWithoutNoteInput = {
    lineId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    product: ProductCreateNestedOneWithoutIssueNoteLinesInput
  }

  export type GoodsIssueNoteLineUncheckedCreateWithoutNoteInput = {
    lineId: string
    productId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineCreateOrConnectWithoutNoteInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    create: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineCreateManyNoteInputEnvelope = {
    data: GoodsIssueNoteLineCreateManyNoteInput | GoodsIssueNoteLineCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type GoodsReturnNoteCreateWithoutGoodsIssueNoteInput = {
    noteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
    lines?: GoodsReturnNoteLineCreateNestedManyWithoutNoteInput
  }

  export type GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput = {
    noteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
    lines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutNoteInput
  }

  export type GoodsReturnNoteCreateOrConnectWithoutGoodsIssueNoteInput = {
    where: GoodsReturnNoteWhereUniqueInput
    create: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput>
  }

  export type GoodsReturnNoteCreateManyGoodsIssueNoteInputEnvelope = {
    data: GoodsReturnNoteCreateManyGoodsIssueNoteInput | GoodsReturnNoteCreateManyGoodsIssueNoteInput[]
    skipDuplicates?: boolean
  }

  export type PurposeUpsertWithoutNoteInput = {
    update: XOR<PurposeUpdateWithoutNoteInput, PurposeUncheckedUpdateWithoutNoteInput>
    create: XOR<PurposeCreateWithoutNoteInput, PurposeUncheckedCreateWithoutNoteInput>
    where?: PurposeWhereInput
  }

  export type PurposeUpdateToOneWithWhereWithoutNoteInput = {
    where?: PurposeWhereInput
    data: XOR<PurposeUpdateWithoutNoteInput, PurposeUncheckedUpdateWithoutNoteInput>
  }

  export type PurposeUpdateWithoutNoteInput = {
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PurposeUncheckedUpdateWithoutNoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsIssueNoteLineUpsertWithWhereUniqueWithoutNoteInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    update: XOR<GoodsIssueNoteLineUpdateWithoutNoteInput, GoodsIssueNoteLineUncheckedUpdateWithoutNoteInput>
    create: XOR<GoodsIssueNoteLineCreateWithoutNoteInput, GoodsIssueNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineUpdateWithWhereUniqueWithoutNoteInput = {
    where: GoodsIssueNoteLineWhereUniqueInput
    data: XOR<GoodsIssueNoteLineUpdateWithoutNoteInput, GoodsIssueNoteLineUncheckedUpdateWithoutNoteInput>
  }

  export type GoodsIssueNoteLineUpdateManyWithWhereWithoutNoteInput = {
    where: GoodsIssueNoteLineScalarWhereInput
    data: XOR<GoodsIssueNoteLineUpdateManyMutationInput, GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteInput>
  }

  export type GoodsReturnNoteUpsertWithWhereUniqueWithoutGoodsIssueNoteInput = {
    where: GoodsReturnNoteWhereUniqueInput
    update: XOR<GoodsReturnNoteUpdateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedUpdateWithoutGoodsIssueNoteInput>
    create: XOR<GoodsReturnNoteCreateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedCreateWithoutGoodsIssueNoteInput>
  }

  export type GoodsReturnNoteUpdateWithWhereUniqueWithoutGoodsIssueNoteInput = {
    where: GoodsReturnNoteWhereUniqueInput
    data: XOR<GoodsReturnNoteUpdateWithoutGoodsIssueNoteInput, GoodsReturnNoteUncheckedUpdateWithoutGoodsIssueNoteInput>
  }

  export type GoodsReturnNoteUpdateManyWithWhereWithoutGoodsIssueNoteInput = {
    where: GoodsReturnNoteScalarWhereInput
    data: XOR<GoodsReturnNoteUpdateManyMutationInput, GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteInput>
  }

  export type GoodsReturnNoteScalarWhereInput = {
    AND?: GoodsReturnNoteScalarWhereInput | GoodsReturnNoteScalarWhereInput[]
    OR?: GoodsReturnNoteScalarWhereInput[]
    NOT?: GoodsReturnNoteScalarWhereInput | GoodsReturnNoteScalarWhereInput[]
    noteId?: StringFilter<"GoodsReturnNote"> | string
    goodsIssueNoteId?: StringFilter<"GoodsReturnNote"> | string
    securityDepositWithheld?: IntFilter<"GoodsReturnNote"> | number
    issuedAt?: DateTimeFilter<"GoodsReturnNote"> | Date | string
  }

  export type GoodsIssueNoteCreateWithoutLinesInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeCreateNestedOneWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteUncheckedCreateWithoutLinesInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeUncheckedCreateNestedOneWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteCreateOrConnectWithoutLinesInput = {
    where: GoodsIssueNoteWhereUniqueInput
    create: XOR<GoodsIssueNoteCreateWithoutLinesInput, GoodsIssueNoteUncheckedCreateWithoutLinesInput>
  }

  export type ProductCreateWithoutIssueNoteLinesInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutIssueNoteLinesInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutIssueNoteLinesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutIssueNoteLinesInput, ProductUncheckedCreateWithoutIssueNoteLinesInput>
  }

  export type GoodsIssueNoteUpsertWithoutLinesInput = {
    update: XOR<GoodsIssueNoteUpdateWithoutLinesInput, GoodsIssueNoteUncheckedUpdateWithoutLinesInput>
    create: XOR<GoodsIssueNoteCreateWithoutLinesInput, GoodsIssueNoteUncheckedCreateWithoutLinesInput>
    where?: GoodsIssueNoteWhereInput
  }

  export type GoodsIssueNoteUpdateToOneWithWhereWithoutLinesInput = {
    where?: GoodsIssueNoteWhereInput
    data: XOR<GoodsIssueNoteUpdateWithoutLinesInput, GoodsIssueNoteUncheckedUpdateWithoutLinesInput>
  }

  export type GoodsIssueNoteUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUpdateOneWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type GoodsIssueNoteUncheckedUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUncheckedUpdateOneWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type ProductUpsertWithoutIssueNoteLinesInput = {
    update: XOR<ProductUpdateWithoutIssueNoteLinesInput, ProductUncheckedUpdateWithoutIssueNoteLinesInput>
    create: XOR<ProductCreateWithoutIssueNoteLinesInput, ProductUncheckedCreateWithoutIssueNoteLinesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutIssueNoteLinesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutIssueNoteLinesInput, ProductUncheckedUpdateWithoutIssueNoteLinesInput>
  }

  export type ProductUpdateWithoutIssueNoteLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutIssueNoteLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type GoodsIssueNoteCreateWithoutPurposeInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    lines?: GoodsIssueNoteLineCreateNestedManyWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteUncheckedCreateWithoutPurposeInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    lines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutNoteInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedCreateNestedManyWithoutGoodsIssueNoteInput
  }

  export type GoodsIssueNoteCreateOrConnectWithoutPurposeInput = {
    where: GoodsIssueNoteWhereUniqueInput
    create: XOR<GoodsIssueNoteCreateWithoutPurposeInput, GoodsIssueNoteUncheckedCreateWithoutPurposeInput>
  }

  export type GoodsIssueNoteUpsertWithoutPurposeInput = {
    update: XOR<GoodsIssueNoteUpdateWithoutPurposeInput, GoodsIssueNoteUncheckedUpdateWithoutPurposeInput>
    create: XOR<GoodsIssueNoteCreateWithoutPurposeInput, GoodsIssueNoteUncheckedCreateWithoutPurposeInput>
    where?: GoodsIssueNoteWhereInput
  }

  export type GoodsIssueNoteUpdateToOneWithWhereWithoutPurposeInput = {
    where?: GoodsIssueNoteWhereInput
    data: XOR<GoodsIssueNoteUpdateWithoutPurposeInput, GoodsIssueNoteUncheckedUpdateWithoutPurposeInput>
  }

  export type GoodsIssueNoteUpdateWithoutPurposeInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    lines?: GoodsIssueNoteLineUpdateManyWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type GoodsIssueNoteUncheckedUpdateWithoutPurposeInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    lines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteNestedInput
    goodsReturnNotes?: GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteNestedInput
  }

  export type GoodsIssueNoteCreateWithoutGoodsReturnNotesInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeCreateNestedOneWithoutNoteInput
    lines?: GoodsIssueNoteLineCreateNestedManyWithoutNoteInput
  }

  export type GoodsIssueNoteUncheckedCreateWithoutGoodsReturnNotesInput = {
    noteId: string
    issuedAt: Date | string
    returnDate: Date | string
    status: string
    total: number
    securityDeposit: number
    fulltext: string
    purpose?: PurposeUncheckedCreateNestedOneWithoutNoteInput
    lines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutNoteInput
  }

  export type GoodsIssueNoteCreateOrConnectWithoutGoodsReturnNotesInput = {
    where: GoodsIssueNoteWhereUniqueInput
    create: XOR<GoodsIssueNoteCreateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedCreateWithoutGoodsReturnNotesInput>
  }

  export type GoodsReturnNoteLineCreateWithoutNoteInput = {
    lineId: string
    description: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
    product: ProductCreateNestedOneWithoutReturnLinesInput
  }

  export type GoodsReturnNoteLineUncheckedCreateWithoutNoteInput = {
    lineId: string
    description: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type GoodsReturnNoteLineCreateOrConnectWithoutNoteInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    create: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsReturnNoteLineCreateManyNoteInputEnvelope = {
    data: GoodsReturnNoteLineCreateManyNoteInput | GoodsReturnNoteLineCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type GoodsIssueNoteUpsertWithoutGoodsReturnNotesInput = {
    update: XOR<GoodsIssueNoteUpdateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedUpdateWithoutGoodsReturnNotesInput>
    create: XOR<GoodsIssueNoteCreateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedCreateWithoutGoodsReturnNotesInput>
    where?: GoodsIssueNoteWhereInput
  }

  export type GoodsIssueNoteUpdateToOneWithWhereWithoutGoodsReturnNotesInput = {
    where?: GoodsIssueNoteWhereInput
    data: XOR<GoodsIssueNoteUpdateWithoutGoodsReturnNotesInput, GoodsIssueNoteUncheckedUpdateWithoutGoodsReturnNotesInput>
  }

  export type GoodsIssueNoteUpdateWithoutGoodsReturnNotesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUpdateOneWithoutNoteNestedInput
    lines?: GoodsIssueNoteLineUpdateManyWithoutNoteNestedInput
  }

  export type GoodsIssueNoteUncheckedUpdateWithoutGoodsReturnNotesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    returnDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    total?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    fulltext?: StringFieldUpdateOperationsInput | string
    purpose?: PurposeUncheckedUpdateOneWithoutNoteNestedInput
    lines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReturnNoteLineUpsertWithWhereUniqueWithoutNoteInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    update: XOR<GoodsReturnNoteLineUpdateWithoutNoteInput, GoodsReturnNoteLineUncheckedUpdateWithoutNoteInput>
    create: XOR<GoodsReturnNoteLineCreateWithoutNoteInput, GoodsReturnNoteLineUncheckedCreateWithoutNoteInput>
  }

  export type GoodsReturnNoteLineUpdateWithWhereUniqueWithoutNoteInput = {
    where: GoodsReturnNoteLineWhereUniqueInput
    data: XOR<GoodsReturnNoteLineUpdateWithoutNoteInput, GoodsReturnNoteLineUncheckedUpdateWithoutNoteInput>
  }

  export type GoodsReturnNoteLineUpdateManyWithWhereWithoutNoteInput = {
    where: GoodsReturnNoteLineScalarWhereInput
    data: XOR<GoodsReturnNoteLineUpdateManyMutationInput, GoodsReturnNoteLineUncheckedUpdateManyWithoutNoteInput>
  }

  export type GoodsReturnNoteCreateWithoutLinesInput = {
    noteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
    goodsIssueNote: GoodsIssueNoteCreateNestedOneWithoutGoodsReturnNotesInput
  }

  export type GoodsReturnNoteUncheckedCreateWithoutLinesInput = {
    noteId: string
    goodsIssueNoteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
  }

  export type GoodsReturnNoteCreateOrConnectWithoutLinesInput = {
    where: GoodsReturnNoteWhereUniqueInput
    create: XOR<GoodsReturnNoteCreateWithoutLinesInput, GoodsReturnNoteUncheckedCreateWithoutLinesInput>
  }

  export type ProductCreateWithoutReturnLinesInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    stock?: StockCreateNestedOneWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReturnLinesInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    stock?: StockUncheckedCreateNestedOneWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReturnLinesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReturnLinesInput, ProductUncheckedCreateWithoutReturnLinesInput>
  }

  export type GoodsReturnNoteUpsertWithoutLinesInput = {
    update: XOR<GoodsReturnNoteUpdateWithoutLinesInput, GoodsReturnNoteUncheckedUpdateWithoutLinesInput>
    create: XOR<GoodsReturnNoteCreateWithoutLinesInput, GoodsReturnNoteUncheckedCreateWithoutLinesInput>
    where?: GoodsReturnNoteWhereInput
  }

  export type GoodsReturnNoteUpdateToOneWithWhereWithoutLinesInput = {
    where?: GoodsReturnNoteWhereInput
    data: XOR<GoodsReturnNoteUpdateWithoutLinesInput, GoodsReturnNoteUncheckedUpdateWithoutLinesInput>
  }

  export type GoodsReturnNoteUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goodsIssueNote?: GoodsIssueNoteUpdateOneRequiredWithoutGoodsReturnNotesNestedInput
  }

  export type GoodsReturnNoteUncheckedUpdateWithoutLinesInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    goodsIssueNoteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutReturnLinesInput = {
    update: XOR<ProductUpdateWithoutReturnLinesInput, ProductUncheckedUpdateWithoutReturnLinesInput>
    create: XOR<ProductCreateWithoutReturnLinesInput, ProductUncheckedCreateWithoutReturnLinesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReturnLinesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReturnLinesInput, ProductUncheckedUpdateWithoutReturnLinesInput>
  }

  export type ProductUpdateWithoutReturnLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReturnLinesInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type ProductCreateWithoutStockInput = {
    productId: string
    name: string
    price: number
    tags?: string | null
    fulltext: string
    category?: CategoryCreateNestedOneWithoutProductsInput
    section?: SectionCreateNestedOneWithoutProductsInput
    variations?: ProductVariationsCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutStockInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    sectionId?: string | null
    tags?: string | null
    fulltext: string
    variations?: ProductVariationsUncheckedCreateNestedManyWithoutProductInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedCreateNestedManyWithoutProductInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedCreateNestedManyWithoutProductInput
    returnLines?: GoodsReturnNoteLineUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutStockInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
  }

  export type ProductUpsertWithoutStockInput = {
    update: XOR<ProductUpdateWithoutStockInput, ProductUncheckedUpdateWithoutStockInput>
    create: XOR<ProductCreateWithoutStockInput, ProductUncheckedCreateWithoutStockInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutStockInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutStockInput, ProductUncheckedUpdateWithoutStockInput>
  }

  export type ProductUpdateWithoutStockInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutStockInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyCategoryInput = {
    productId: string
    name: string
    price: number
    sectionId?: string | null
    tags?: string | null
    fulltext: string
  }

  export type ProductUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    section?: SectionUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    sectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateManySectionInput = {
    productId: string
    name: string
    price: number
    categoryId?: string | null
    tags?: string | null
    fulltext: string
  }

  export type ProductUpdateWithoutSectionInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    category?: CategoryUpdateOneWithoutProductsNestedInput
    variations?: ProductVariationsUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUpdateManyWithoutProductNestedInput
    stock?: StockUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutSectionInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
    variations?: ProductVariationsUncheckedUpdateManyWithoutProductNestedInput
    receiptNoteLines?: GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductNestedInput
    issueNoteLines?: GoodsIssueNoteLineUncheckedUpdateManyWithoutProductNestedInput
    returnLines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutProductNestedInput
    stock?: StockUncheckedUpdateOneWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutSectionInput = {
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    fulltext?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsCreateManyProductInput = {
    id?: number
    variationId: string
    value: string
  }

  export type GoodsReceiptNoteLineCreateManyProductInput = {
    noteId: string
    lineId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsIssueNoteLineCreateManyProductInput = {
    noteId: string
    lineId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsReturnNoteLineCreateManyProductInput = {
    noteId: string
    lineId: string
    description: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type ProductVariationsUpdateWithoutProductInput = {
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariationsUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    variationId?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GoodsReceiptNoteLineUpdateWithoutProductInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    note?: GoodsReceiptNoteUpdateOneRequiredWithoutLinesNestedInput
  }

  export type GoodsReceiptNoteLineUncheckedUpdateWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReceiptNoteLineUncheckedUpdateManyWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsIssueNoteLineUpdateWithoutProductInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    note?: GoodsIssueNoteUpdateOneRequiredWithoutLinesNestedInput
  }

  export type GoodsIssueNoteLineUncheckedUpdateWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineUncheckedUpdateManyWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsReturnNoteLineUpdateWithoutProductInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    note?: GoodsReturnNoteUpdateOneRequiredWithoutLinesNestedInput
  }

  export type GoodsReturnNoteLineUncheckedUpdateWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReturnNoteLineUncheckedUpdateManyWithoutProductInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReceiptNoteLineCreateManyNoteInput = {
    lineId: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    comments?: string | null
  }

  export type GoodsReceiptNoteLineUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutReceiptNoteLinesNestedInput
  }

  export type GoodsReceiptNoteLineUncheckedUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReceiptNoteLineUncheckedUpdateManyWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsIssueNoteLineCreateManyNoteInput = {
    lineId: string
    productId: string
    name: string
    price: number
    goodQuantities?: number
    badQuantities?: number
    goodQuantitiesReturned?: number
    badQuantitiesReturned?: number
    netTotal: number
    comments?: string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsReturnNoteCreateManyGoodsIssueNoteInput = {
    noteId: string
    securityDepositWithheld: number
    issuedAt: Date | string
  }

  export type GoodsIssueNoteLineUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
    product?: ProductUpdateOneRequiredWithoutIssueNoteLinesNestedInput
  }

  export type GoodsIssueNoteLineUncheckedUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsIssueNoteLineUncheckedUpdateManyWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    goodQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    badQuantitiesReturned?: IntFieldUpdateOperationsInput | number
    netTotal?: FloatFieldUpdateOperationsInput | number
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    variations?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GoodsReturnNoteUpdateWithoutGoodsIssueNoteInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: GoodsReturnNoteLineUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReturnNoteUncheckedUpdateWithoutGoodsIssueNoteInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lines?: GoodsReturnNoteLineUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type GoodsReturnNoteUncheckedUpdateManyWithoutGoodsIssueNoteInput = {
    noteId?: StringFieldUpdateOperationsInput | string
    securityDepositWithheld?: IntFieldUpdateOperationsInput | number
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsReturnNoteLineCreateManyNoteInput = {
    lineId: string
    description: string
    productId: string
    goodQuantities?: number
    badQuantities?: number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: string | null
  }

  export type GoodsReturnNoteLineUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutReturnLinesNestedInput
  }

  export type GoodsReturnNoteLineUncheckedUpdateWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GoodsReturnNoteLineUncheckedUpdateManyWithoutNoteInput = {
    lineId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    goodQuantities?: IntFieldUpdateOperationsInput | number
    badQuantities?: IntFieldUpdateOperationsInput | number
    variations?: NullableJsonNullValueInput | InputJsonValue
    comments?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SectionCountOutputTypeDefaultArgs instead
     */
    export type SectionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SectionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReceiptNoteCountOutputTypeDefaultArgs instead
     */
    export type GoodsReceiptNoteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReceiptNoteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsIssueNoteCountOutputTypeDefaultArgs instead
     */
    export type GoodsIssueNoteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsIssueNoteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReturnNoteCountOutputTypeDefaultArgs instead
     */
    export type GoodsReturnNoteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReturnNoteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentDefaultArgs instead
     */
    export type DepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SectionDefaultArgs instead
     */
    export type SectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SectionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductVariationsDefaultArgs instead
     */
    export type ProductVariationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductVariationsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReceiptNoteDefaultArgs instead
     */
    export type GoodsReceiptNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReceiptNoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReceiptNoteLineDefaultArgs instead
     */
    export type GoodsReceiptNoteLineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReceiptNoteLineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsIssueNoteDefaultArgs instead
     */
    export type GoodsIssueNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsIssueNoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsIssueNoteLineDefaultArgs instead
     */
    export type GoodsIssueNoteLineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsIssueNoteLineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurposeDefaultArgs instead
     */
    export type PurposeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurposeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReturnNoteDefaultArgs instead
     */
    export type GoodsReturnNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReturnNoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GoodsReturnNoteLineDefaultArgs instead
     */
    export type GoodsReturnNoteLineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GoodsReturnNoteLineDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StockDefaultArgs instead
     */
    export type StockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StockDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SequenceDefaultArgs instead
     */
    export type SequenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SequenceDefaultArgs<ExtArgs>

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