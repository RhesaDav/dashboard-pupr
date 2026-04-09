
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
 * Model Contract
 * 
 */
export type Contract = $Result.DefaultSelection<Prisma.$ContractPayload>
/**
 * Model PhysicalProgress
 * 
 */
export type PhysicalProgress = $Result.DefaultSelection<Prisma.$PhysicalProgressPayload>
/**
 * Model FinancialProgress
 * 
 */
export type FinancialProgress = $Result.DefaultSelection<Prisma.$FinancialProgressPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Addendum
 * 
 */
export type Addendum = $Result.DefaultSelection<Prisma.$AddendumPayload>
/**
 * Model ContractAccess
 * 
 */
export type ContractAccess = $Result.DefaultSelection<Prisma.$ContractAccessPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
  CONSULTANT: 'CONSULTANT'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Contracts
 * const contracts = await prisma.contract.findMany()
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
   * // Fetch zero or more Contracts
   * const contracts = await prisma.contract.findMany()
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.contract`: Exposes CRUD operations for the **Contract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contracts
    * const contracts = await prisma.contract.findMany()
    * ```
    */
  get contract(): Prisma.ContractDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.physicalProgress`: Exposes CRUD operations for the **PhysicalProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhysicalProgresses
    * const physicalProgresses = await prisma.physicalProgress.findMany()
    * ```
    */
  get physicalProgress(): Prisma.PhysicalProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financialProgress`: Exposes CRUD operations for the **FinancialProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialProgresses
    * const financialProgresses = await prisma.financialProgress.findMany()
    * ```
    */
  get financialProgress(): Prisma.FinancialProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addendum`: Exposes CRUD operations for the **Addendum** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addenda
    * const addenda = await prisma.addendum.findMany()
    * ```
    */
  get addendum(): Prisma.AddendumDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contractAccess`: Exposes CRUD operations for the **ContractAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractAccesses
    * const contractAccesses = await prisma.contractAccess.findMany()
    * ```
    */
  get contractAccess(): Prisma.ContractAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
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
    Contract: 'Contract',
    PhysicalProgress: 'PhysicalProgress',
    FinancialProgress: 'FinancialProgress',
    Location: 'Location',
    Addendum: 'Addendum',
    ContractAccess: 'ContractAccess',
    User: 'User',
    PasswordReset: 'PasswordReset',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
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
      modelProps: "contract" | "physicalProgress" | "financialProgress" | "location" | "addendum" | "contractAccess" | "user" | "passwordReset" | "session" | "account" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Contract: {
        payload: Prisma.$ContractPayload<ExtArgs>
        fields: Prisma.ContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findFirst: {
            args: Prisma.ContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          findMany: {
            args: Prisma.ContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          create: {
            args: Prisma.ContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          createMany: {
            args: Prisma.ContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          delete: {
            args: Prisma.ContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          update: {
            args: Prisma.ContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          deleteMany: {
            args: Prisma.ContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>[]
          }
          upsert: {
            args: Prisma.ContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractPayload>
          }
          aggregate: {
            args: Prisma.ContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContract>
          }
          groupBy: {
            args: Prisma.ContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractCountArgs<ExtArgs>
            result: $Utils.Optional<ContractCountAggregateOutputType> | number
          }
        }
      }
      PhysicalProgress: {
        payload: Prisma.$PhysicalProgressPayload<ExtArgs>
        fields: Prisma.PhysicalProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhysicalProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhysicalProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          findFirst: {
            args: Prisma.PhysicalProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhysicalProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          findMany: {
            args: Prisma.PhysicalProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>[]
          }
          create: {
            args: Prisma.PhysicalProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          createMany: {
            args: Prisma.PhysicalProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhysicalProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>[]
          }
          delete: {
            args: Prisma.PhysicalProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          update: {
            args: Prisma.PhysicalProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          deleteMany: {
            args: Prisma.PhysicalProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhysicalProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhysicalProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>[]
          }
          upsert: {
            args: Prisma.PhysicalProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhysicalProgressPayload>
          }
          aggregate: {
            args: Prisma.PhysicalProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhysicalProgress>
          }
          groupBy: {
            args: Prisma.PhysicalProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhysicalProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhysicalProgressCountArgs<ExtArgs>
            result: $Utils.Optional<PhysicalProgressCountAggregateOutputType> | number
          }
        }
      }
      FinancialProgress: {
        payload: Prisma.$FinancialProgressPayload<ExtArgs>
        fields: Prisma.FinancialProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinancialProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinancialProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          findFirst: {
            args: Prisma.FinancialProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinancialProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          findMany: {
            args: Prisma.FinancialProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>[]
          }
          create: {
            args: Prisma.FinancialProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          createMany: {
            args: Prisma.FinancialProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinancialProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>[]
          }
          delete: {
            args: Prisma.FinancialProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          update: {
            args: Prisma.FinancialProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          deleteMany: {
            args: Prisma.FinancialProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinancialProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinancialProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>[]
          }
          upsert: {
            args: Prisma.FinancialProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialProgressPayload>
          }
          aggregate: {
            args: Prisma.FinancialProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancialProgress>
          }
          groupBy: {
            args: Prisma.FinancialProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancialProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinancialProgressCountArgs<ExtArgs>
            result: $Utils.Optional<FinancialProgressCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Addendum: {
        payload: Prisma.$AddendumPayload<ExtArgs>
        fields: Prisma.AddendumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddendumFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddendumFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          findFirst: {
            args: Prisma.AddendumFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddendumFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          findMany: {
            args: Prisma.AddendumFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>[]
          }
          create: {
            args: Prisma.AddendumCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          createMany: {
            args: Prisma.AddendumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddendumCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>[]
          }
          delete: {
            args: Prisma.AddendumDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          update: {
            args: Prisma.AddendumUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          deleteMany: {
            args: Prisma.AddendumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddendumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AddendumUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>[]
          }
          upsert: {
            args: Prisma.AddendumUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddendumPayload>
          }
          aggregate: {
            args: Prisma.AddendumAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddendum>
          }
          groupBy: {
            args: Prisma.AddendumGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddendumGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddendumCountArgs<ExtArgs>
            result: $Utils.Optional<AddendumCountAggregateOutputType> | number
          }
        }
      }
      ContractAccess: {
        payload: Prisma.$ContractAccessPayload<ExtArgs>
        fields: Prisma.ContractAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          findFirst: {
            args: Prisma.ContractAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          findMany: {
            args: Prisma.ContractAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>[]
          }
          create: {
            args: Prisma.ContractAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          createMany: {
            args: Prisma.ContractAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>[]
          }
          delete: {
            args: Prisma.ContractAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          update: {
            args: Prisma.ContractAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          deleteMany: {
            args: Prisma.ContractAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContractAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>[]
          }
          upsert: {
            args: Prisma.ContractAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractAccessPayload>
          }
          aggregate: {
            args: Prisma.ContractAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractAccess>
          }
          groupBy: {
            args: Prisma.ContractAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractAccessCountArgs<ExtArgs>
            result: $Utils.Optional<ContractAccessCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
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
    contract?: ContractOmit
    physicalProgress?: PhysicalProgressOmit
    financialProgress?: FinancialProgressOmit
    location?: LocationOmit
    addendum?: AddendumOmit
    contractAccess?: ContractAccessOmit
    user?: UserOmit
    passwordReset?: PasswordResetOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
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
   * Count Type ContractCountOutputType
   */

  export type ContractCountOutputType = {
    addendum: number
    physicalProgress: number
    contractAccess: number
  }

  export type ContractCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addendum?: boolean | ContractCountOutputTypeCountAddendumArgs
    physicalProgress?: boolean | ContractCountOutputTypeCountPhysicalProgressArgs
    contractAccess?: boolean | ContractCountOutputTypeCountContractAccessArgs
  }

  // Custom InputTypes
  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractCountOutputType
     */
    select?: ContractCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeCountAddendumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddendumWhereInput
  }

  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeCountPhysicalProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhysicalProgressWhereInput
  }

  /**
   * ContractCountOutputType without action
   */
  export type ContractCountOutputTypeCountContractAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractAccessWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    passwordReset: number
    contractAccess: number
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordReset?: boolean | UserCountOutputTypeCountPasswordResetArgs
    contractAccess?: boolean | UserCountOutputTypeCountContractAccessArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContractAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractAccessWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Contract
   */

  export type AggregateContract = {
    _count: ContractCountAggregateOutputType | null
    _avg: ContractAvgAggregateOutputType | null
    _sum: ContractSumAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  export type ContractAvgAggregateOutputType = {
    paguAnggaran: number | null
    nilaiKontrak: number | null
    masaPelaksanaan: number | null
    totalAddendumWaktu: number | null
    nilaiKontrakSupervisi: number | null
    masaPelaksanaanSupervisi: number | null
  }

  export type ContractSumAggregateOutputType = {
    paguAnggaran: number | null
    nilaiKontrak: number | null
    masaPelaksanaan: number | null
    totalAddendumWaktu: number | null
    nilaiKontrakSupervisi: number | null
    masaPelaksanaanSupervisi: number | null
  }

  export type ContractMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    namaPaket: string | null
    namaPenyedia: string | null
    ppk: string | null
    nipPPK: string | null
    korwaslap: string | null
    nipKorwaslap: string | null
    pengawasLapangan: string | null
    nipPengawasLapangan: string | null
    paguAnggaran: number | null
    nilaiKontrak: number | null
    sumberDana: string | null
    nomorKontrak: string | null
    tanggalKontrak: Date | null
    masaPelaksanaan: number | null
    tanggalSelesaiAwal: Date | null
    tanggalSelesaiAkhir: Date | null
    totalAddendumWaktu: number | null
    volumeKontrak: string | null
    satuanKontrak: string | null
    subKegiatan: string | null
    konsultanSupervisi: string | null
    nomorKontrakSupervisi: string | null
    nilaiKontrakSupervisi: number | null
    tanggalKontrakSupervisi: Date | null
    masaPelaksanaanSupervisi: number | null
    hasilProdukAkhir: string | null
    dimensi: string | null
    dokumentasiAwal: string | null
    dokumentasiTengah: string | null
    dokumentasiAkhir: string | null
    dokumenPendukung: string | null
    hasAddendum: boolean | null
  }

  export type ContractMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    namaPaket: string | null
    namaPenyedia: string | null
    ppk: string | null
    nipPPK: string | null
    korwaslap: string | null
    nipKorwaslap: string | null
    pengawasLapangan: string | null
    nipPengawasLapangan: string | null
    paguAnggaran: number | null
    nilaiKontrak: number | null
    sumberDana: string | null
    nomorKontrak: string | null
    tanggalKontrak: Date | null
    masaPelaksanaan: number | null
    tanggalSelesaiAwal: Date | null
    tanggalSelesaiAkhir: Date | null
    totalAddendumWaktu: number | null
    volumeKontrak: string | null
    satuanKontrak: string | null
    subKegiatan: string | null
    konsultanSupervisi: string | null
    nomorKontrakSupervisi: string | null
    nilaiKontrakSupervisi: number | null
    tanggalKontrakSupervisi: Date | null
    masaPelaksanaanSupervisi: number | null
    hasilProdukAkhir: string | null
    dimensi: string | null
    dokumentasiAwal: string | null
    dokumentasiTengah: string | null
    dokumentasiAkhir: string | null
    dokumenPendukung: string | null
    hasAddendum: boolean | null
  }

  export type ContractCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    namaPaket: number
    namaPenyedia: number
    ppk: number
    nipPPK: number
    korwaslap: number
    nipKorwaslap: number
    pengawasLapangan: number
    nipPengawasLapangan: number
    paguAnggaran: number
    nilaiKontrak: number
    sumberDana: number
    nomorKontrak: number
    tanggalKontrak: number
    masaPelaksanaan: number
    tanggalSelesaiAwal: number
    tanggalSelesaiAkhir: number
    totalAddendumWaktu: number
    volumeKontrak: number
    satuanKontrak: number
    subKegiatan: number
    konsultanSupervisi: number
    nomorKontrakSupervisi: number
    nilaiKontrakSupervisi: number
    tanggalKontrakSupervisi: number
    masaPelaksanaanSupervisi: number
    hasilProdukAkhir: number
    dimensi: number
    dokumentasiAwal: number
    dokumentasiTengah: number
    dokumentasiAkhir: number
    dokumenPendukung: number
    hasAddendum: number
    _all: number
  }


  export type ContractAvgAggregateInputType = {
    paguAnggaran?: true
    nilaiKontrak?: true
    masaPelaksanaan?: true
    totalAddendumWaktu?: true
    nilaiKontrakSupervisi?: true
    masaPelaksanaanSupervisi?: true
  }

  export type ContractSumAggregateInputType = {
    paguAnggaran?: true
    nilaiKontrak?: true
    masaPelaksanaan?: true
    totalAddendumWaktu?: true
    nilaiKontrakSupervisi?: true
    masaPelaksanaanSupervisi?: true
  }

  export type ContractMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    namaPaket?: true
    namaPenyedia?: true
    ppk?: true
    nipPPK?: true
    korwaslap?: true
    nipKorwaslap?: true
    pengawasLapangan?: true
    nipPengawasLapangan?: true
    paguAnggaran?: true
    nilaiKontrak?: true
    sumberDana?: true
    nomorKontrak?: true
    tanggalKontrak?: true
    masaPelaksanaan?: true
    tanggalSelesaiAwal?: true
    tanggalSelesaiAkhir?: true
    totalAddendumWaktu?: true
    volumeKontrak?: true
    satuanKontrak?: true
    subKegiatan?: true
    konsultanSupervisi?: true
    nomorKontrakSupervisi?: true
    nilaiKontrakSupervisi?: true
    tanggalKontrakSupervisi?: true
    masaPelaksanaanSupervisi?: true
    hasilProdukAkhir?: true
    dimensi?: true
    dokumentasiAwal?: true
    dokumentasiTengah?: true
    dokumentasiAkhir?: true
    dokumenPendukung?: true
    hasAddendum?: true
  }

  export type ContractMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    namaPaket?: true
    namaPenyedia?: true
    ppk?: true
    nipPPK?: true
    korwaslap?: true
    nipKorwaslap?: true
    pengawasLapangan?: true
    nipPengawasLapangan?: true
    paguAnggaran?: true
    nilaiKontrak?: true
    sumberDana?: true
    nomorKontrak?: true
    tanggalKontrak?: true
    masaPelaksanaan?: true
    tanggalSelesaiAwal?: true
    tanggalSelesaiAkhir?: true
    totalAddendumWaktu?: true
    volumeKontrak?: true
    satuanKontrak?: true
    subKegiatan?: true
    konsultanSupervisi?: true
    nomorKontrakSupervisi?: true
    nilaiKontrakSupervisi?: true
    tanggalKontrakSupervisi?: true
    masaPelaksanaanSupervisi?: true
    hasilProdukAkhir?: true
    dimensi?: true
    dokumentasiAwal?: true
    dokumentasiTengah?: true
    dokumentasiAkhir?: true
    dokumenPendukung?: true
    hasAddendum?: true
  }

  export type ContractCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    namaPaket?: true
    namaPenyedia?: true
    ppk?: true
    nipPPK?: true
    korwaslap?: true
    nipKorwaslap?: true
    pengawasLapangan?: true
    nipPengawasLapangan?: true
    paguAnggaran?: true
    nilaiKontrak?: true
    sumberDana?: true
    nomorKontrak?: true
    tanggalKontrak?: true
    masaPelaksanaan?: true
    tanggalSelesaiAwal?: true
    tanggalSelesaiAkhir?: true
    totalAddendumWaktu?: true
    volumeKontrak?: true
    satuanKontrak?: true
    subKegiatan?: true
    konsultanSupervisi?: true
    nomorKontrakSupervisi?: true
    nilaiKontrakSupervisi?: true
    tanggalKontrakSupervisi?: true
    masaPelaksanaanSupervisi?: true
    hasilProdukAkhir?: true
    dimensi?: true
    dokumentasiAwal?: true
    dokumentasiTengah?: true
    dokumentasiAkhir?: true
    dokumenPendukung?: true
    hasAddendum?: true
    _all?: true
  }

  export type ContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contract to aggregate.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contracts
    **/
    _count?: true | ContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractMaxAggregateInputType
  }

  export type GetContractAggregateType<T extends ContractAggregateArgs> = {
        [P in keyof T & keyof AggregateContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContract[P]>
      : GetScalarType<T[P], AggregateContract[P]>
  }




  export type ContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractWhereInput
    orderBy?: ContractOrderByWithAggregationInput | ContractOrderByWithAggregationInput[]
    by: ContractScalarFieldEnum[] | ContractScalarFieldEnum
    having?: ContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractCountAggregateInputType | true
    _avg?: ContractAvgAggregateInputType
    _sum?: ContractSumAggregateInputType
    _min?: ContractMinAggregateInputType
    _max?: ContractMaxAggregateInputType
  }

  export type ContractGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    namaPaket: string
    namaPenyedia: string | null
    ppk: string | null
    nipPPK: string | null
    korwaslap: string | null
    nipKorwaslap: string | null
    pengawasLapangan: string | null
    nipPengawasLapangan: string | null
    paguAnggaran: number | null
    nilaiKontrak: number | null
    sumberDana: string | null
    nomorKontrak: string | null
    tanggalKontrak: Date | null
    masaPelaksanaan: number | null
    tanggalSelesaiAwal: Date | null
    tanggalSelesaiAkhir: Date | null
    totalAddendumWaktu: number | null
    volumeKontrak: string | null
    satuanKontrak: string | null
    subKegiatan: string | null
    konsultanSupervisi: string | null
    nomorKontrakSupervisi: string | null
    nilaiKontrakSupervisi: number | null
    tanggalKontrakSupervisi: Date | null
    masaPelaksanaanSupervisi: number | null
    hasilProdukAkhir: string | null
    dimensi: string | null
    dokumentasiAwal: string | null
    dokumentasiTengah: string | null
    dokumentasiAkhir: string | null
    dokumenPendukung: string | null
    hasAddendum: boolean | null
    _count: ContractCountAggregateOutputType | null
    _avg: ContractAvgAggregateOutputType | null
    _sum: ContractSumAggregateOutputType | null
    _min: ContractMinAggregateOutputType | null
    _max: ContractMaxAggregateOutputType | null
  }

  type GetContractGroupByPayload<T extends ContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractGroupByOutputType[P]>
            : GetScalarType<T[P], ContractGroupByOutputType[P]>
        }
      >
    >


  export type ContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    namaPaket?: boolean
    namaPenyedia?: boolean
    ppk?: boolean
    nipPPK?: boolean
    korwaslap?: boolean
    nipKorwaslap?: boolean
    pengawasLapangan?: boolean
    nipPengawasLapangan?: boolean
    paguAnggaran?: boolean
    nilaiKontrak?: boolean
    sumberDana?: boolean
    nomorKontrak?: boolean
    tanggalKontrak?: boolean
    masaPelaksanaan?: boolean
    tanggalSelesaiAwal?: boolean
    tanggalSelesaiAkhir?: boolean
    totalAddendumWaktu?: boolean
    volumeKontrak?: boolean
    satuanKontrak?: boolean
    subKegiatan?: boolean
    konsultanSupervisi?: boolean
    nomorKontrakSupervisi?: boolean
    nilaiKontrakSupervisi?: boolean
    tanggalKontrakSupervisi?: boolean
    masaPelaksanaanSupervisi?: boolean
    hasilProdukAkhir?: boolean
    dimensi?: boolean
    dokumentasiAwal?: boolean
    dokumentasiTengah?: boolean
    dokumentasiAkhir?: boolean
    dokumenPendukung?: boolean
    hasAddendum?: boolean
    addendum?: boolean | Contract$addendumArgs<ExtArgs>
    financialProgress?: boolean | Contract$financialProgressArgs<ExtArgs>
    physicalProgress?: boolean | Contract$physicalProgressArgs<ExtArgs>
    location?: boolean | Contract$locationArgs<ExtArgs>
    contractAccess?: boolean | Contract$contractAccessArgs<ExtArgs>
    _count?: boolean | ContractCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    namaPaket?: boolean
    namaPenyedia?: boolean
    ppk?: boolean
    nipPPK?: boolean
    korwaslap?: boolean
    nipKorwaslap?: boolean
    pengawasLapangan?: boolean
    nipPengawasLapangan?: boolean
    paguAnggaran?: boolean
    nilaiKontrak?: boolean
    sumberDana?: boolean
    nomorKontrak?: boolean
    tanggalKontrak?: boolean
    masaPelaksanaan?: boolean
    tanggalSelesaiAwal?: boolean
    tanggalSelesaiAkhir?: boolean
    totalAddendumWaktu?: boolean
    volumeKontrak?: boolean
    satuanKontrak?: boolean
    subKegiatan?: boolean
    konsultanSupervisi?: boolean
    nomorKontrakSupervisi?: boolean
    nilaiKontrakSupervisi?: boolean
    tanggalKontrakSupervisi?: boolean
    masaPelaksanaanSupervisi?: boolean
    hasilProdukAkhir?: boolean
    dimensi?: boolean
    dokumentasiAwal?: boolean
    dokumentasiTengah?: boolean
    dokumentasiAkhir?: boolean
    dokumenPendukung?: boolean
    hasAddendum?: boolean
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    namaPaket?: boolean
    namaPenyedia?: boolean
    ppk?: boolean
    nipPPK?: boolean
    korwaslap?: boolean
    nipKorwaslap?: boolean
    pengawasLapangan?: boolean
    nipPengawasLapangan?: boolean
    paguAnggaran?: boolean
    nilaiKontrak?: boolean
    sumberDana?: boolean
    nomorKontrak?: boolean
    tanggalKontrak?: boolean
    masaPelaksanaan?: boolean
    tanggalSelesaiAwal?: boolean
    tanggalSelesaiAkhir?: boolean
    totalAddendumWaktu?: boolean
    volumeKontrak?: boolean
    satuanKontrak?: boolean
    subKegiatan?: boolean
    konsultanSupervisi?: boolean
    nomorKontrakSupervisi?: boolean
    nilaiKontrakSupervisi?: boolean
    tanggalKontrakSupervisi?: boolean
    masaPelaksanaanSupervisi?: boolean
    hasilProdukAkhir?: boolean
    dimensi?: boolean
    dokumentasiAwal?: boolean
    dokumentasiTengah?: boolean
    dokumentasiAkhir?: boolean
    dokumenPendukung?: boolean
    hasAddendum?: boolean
  }, ExtArgs["result"]["contract"]>

  export type ContractSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    namaPaket?: boolean
    namaPenyedia?: boolean
    ppk?: boolean
    nipPPK?: boolean
    korwaslap?: boolean
    nipKorwaslap?: boolean
    pengawasLapangan?: boolean
    nipPengawasLapangan?: boolean
    paguAnggaran?: boolean
    nilaiKontrak?: boolean
    sumberDana?: boolean
    nomorKontrak?: boolean
    tanggalKontrak?: boolean
    masaPelaksanaan?: boolean
    tanggalSelesaiAwal?: boolean
    tanggalSelesaiAkhir?: boolean
    totalAddendumWaktu?: boolean
    volumeKontrak?: boolean
    satuanKontrak?: boolean
    subKegiatan?: boolean
    konsultanSupervisi?: boolean
    nomorKontrakSupervisi?: boolean
    nilaiKontrakSupervisi?: boolean
    tanggalKontrakSupervisi?: boolean
    masaPelaksanaanSupervisi?: boolean
    hasilProdukAkhir?: boolean
    dimensi?: boolean
    dokumentasiAwal?: boolean
    dokumentasiTengah?: boolean
    dokumentasiAkhir?: boolean
    dokumenPendukung?: boolean
    hasAddendum?: boolean
  }

  export type ContractOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "namaPaket" | "namaPenyedia" | "ppk" | "nipPPK" | "korwaslap" | "nipKorwaslap" | "pengawasLapangan" | "nipPengawasLapangan" | "paguAnggaran" | "nilaiKontrak" | "sumberDana" | "nomorKontrak" | "tanggalKontrak" | "masaPelaksanaan" | "tanggalSelesaiAwal" | "tanggalSelesaiAkhir" | "totalAddendumWaktu" | "volumeKontrak" | "satuanKontrak" | "subKegiatan" | "konsultanSupervisi" | "nomorKontrakSupervisi" | "nilaiKontrakSupervisi" | "tanggalKontrakSupervisi" | "masaPelaksanaanSupervisi" | "hasilProdukAkhir" | "dimensi" | "dokumentasiAwal" | "dokumentasiTengah" | "dokumentasiAkhir" | "dokumenPendukung" | "hasAddendum", ExtArgs["result"]["contract"]>
  export type ContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addendum?: boolean | Contract$addendumArgs<ExtArgs>
    financialProgress?: boolean | Contract$financialProgressArgs<ExtArgs>
    physicalProgress?: boolean | Contract$physicalProgressArgs<ExtArgs>
    location?: boolean | Contract$locationArgs<ExtArgs>
    contractAccess?: boolean | Contract$contractAccessArgs<ExtArgs>
    _count?: boolean | ContractCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ContractIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contract"
    objects: {
      addendum: Prisma.$AddendumPayload<ExtArgs>[]
      financialProgress: Prisma.$FinancialProgressPayload<ExtArgs> | null
      physicalProgress: Prisma.$PhysicalProgressPayload<ExtArgs>[]
      location: Prisma.$LocationPayload<ExtArgs> | null
      contractAccess: Prisma.$ContractAccessPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      namaPaket: string
      namaPenyedia: string | null
      ppk: string | null
      nipPPK: string | null
      korwaslap: string | null
      nipKorwaslap: string | null
      pengawasLapangan: string | null
      nipPengawasLapangan: string | null
      paguAnggaran: number | null
      nilaiKontrak: number | null
      sumberDana: string | null
      nomorKontrak: string | null
      tanggalKontrak: Date | null
      masaPelaksanaan: number | null
      tanggalSelesaiAwal: Date | null
      tanggalSelesaiAkhir: Date | null
      totalAddendumWaktu: number | null
      volumeKontrak: string | null
      satuanKontrak: string | null
      subKegiatan: string | null
      konsultanSupervisi: string | null
      nomorKontrakSupervisi: string | null
      nilaiKontrakSupervisi: number | null
      tanggalKontrakSupervisi: Date | null
      masaPelaksanaanSupervisi: number | null
      hasilProdukAkhir: string | null
      dimensi: string | null
      dokumentasiAwal: string | null
      dokumentasiTengah: string | null
      dokumentasiAkhir: string | null
      dokumenPendukung: string | null
      hasAddendum: boolean | null
    }, ExtArgs["result"]["contract"]>
    composites: {}
  }

  type ContractGetPayload<S extends boolean | null | undefined | ContractDefaultArgs> = $Result.GetResult<Prisma.$ContractPayload, S>

  type ContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractCountAggregateInputType | true
    }

  export interface ContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contract'], meta: { name: 'Contract' } }
    /**
     * Find zero or one Contract that matches the filter.
     * @param {ContractFindUniqueArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractFindUniqueArgs>(args: SelectSubset<T, ContractFindUniqueArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contract that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractFindUniqueOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractFindFirstArgs>(args?: SelectSubset<T, ContractFindFirstArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindFirstOrThrowArgs} args - Arguments to find a Contract
     * @example
     * // Get one Contract
     * const contract = await prisma.contract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contracts
     * const contracts = await prisma.contract.findMany()
     * 
     * // Get first 10 Contracts
     * const contracts = await prisma.contract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractWithIdOnly = await prisma.contract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractFindManyArgs>(args?: SelectSubset<T, ContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contract.
     * @param {ContractCreateArgs} args - Arguments to create a Contract.
     * @example
     * // Create one Contract
     * const Contract = await prisma.contract.create({
     *   data: {
     *     // ... data to create a Contract
     *   }
     * })
     * 
     */
    create<T extends ContractCreateArgs>(args: SelectSubset<T, ContractCreateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contracts.
     * @param {ContractCreateManyArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractCreateManyArgs>(args?: SelectSubset<T, ContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contracts and returns the data saved in the database.
     * @param {ContractCreateManyAndReturnArgs} args - Arguments to create many Contracts.
     * @example
     * // Create many Contracts
     * const contract = await prisma.contract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contract.
     * @param {ContractDeleteArgs} args - Arguments to delete one Contract.
     * @example
     * // Delete one Contract
     * const Contract = await prisma.contract.delete({
     *   where: {
     *     // ... filter to delete one Contract
     *   }
     * })
     * 
     */
    delete<T extends ContractDeleteArgs>(args: SelectSubset<T, ContractDeleteArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contract.
     * @param {ContractUpdateArgs} args - Arguments to update one Contract.
     * @example
     * // Update one Contract
     * const contract = await prisma.contract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractUpdateArgs>(args: SelectSubset<T, ContractUpdateArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contracts.
     * @param {ContractDeleteManyArgs} args - Arguments to filter Contracts to delete.
     * @example
     * // Delete a few Contracts
     * const { count } = await prisma.contract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractDeleteManyArgs>(args?: SelectSubset<T, ContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractUpdateManyArgs>(args: SelectSubset<T, ContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contracts and returns the data updated in the database.
     * @param {ContractUpdateManyAndReturnArgs} args - Arguments to update many Contracts.
     * @example
     * // Update many Contracts
     * const contract = await prisma.contract.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contracts and only return the `id`
     * const contractWithIdOnly = await prisma.contract.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContractUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contract.
     * @param {ContractUpsertArgs} args - Arguments to update or create a Contract.
     * @example
     * // Update or create a Contract
     * const contract = await prisma.contract.upsert({
     *   create: {
     *     // ... data to create a Contract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contract we want to update
     *   }
     * })
     */
    upsert<T extends ContractUpsertArgs>(args: SelectSubset<T, ContractUpsertArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractCountArgs} args - Arguments to filter Contracts to count.
     * @example
     * // Count the number of Contracts
     * const count = await prisma.contract.count({
     *   where: {
     *     // ... the filter for the Contracts we want to count
     *   }
     * })
    **/
    count<T extends ContractCountArgs>(
      args?: Subset<T, ContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractAggregateArgs>(args: Subset<T, ContractAggregateArgs>): Prisma.PrismaPromise<GetContractAggregateType<T>>

    /**
     * Group by Contract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractGroupByArgs} args - Group by arguments.
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
      T extends ContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractGroupByArgs['orderBy'] }
        : { orderBy?: ContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contract model
   */
  readonly fields: ContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    addendum<T extends Contract$addendumArgs<ExtArgs> = {}>(args?: Subset<T, Contract$addendumArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    financialProgress<T extends Contract$financialProgressArgs<ExtArgs> = {}>(args?: Subset<T, Contract$financialProgressArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    physicalProgress<T extends Contract$physicalProgressArgs<ExtArgs> = {}>(args?: Subset<T, Contract$physicalProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    location<T extends Contract$locationArgs<ExtArgs> = {}>(args?: Subset<T, Contract$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contractAccess<T extends Contract$contractAccessArgs<ExtArgs> = {}>(args?: Subset<T, Contract$contractAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Contract model
   */
  interface ContractFieldRefs {
    readonly id: FieldRef<"Contract", 'String'>
    readonly createdAt: FieldRef<"Contract", 'DateTime'>
    readonly updatedAt: FieldRef<"Contract", 'DateTime'>
    readonly namaPaket: FieldRef<"Contract", 'String'>
    readonly namaPenyedia: FieldRef<"Contract", 'String'>
    readonly ppk: FieldRef<"Contract", 'String'>
    readonly nipPPK: FieldRef<"Contract", 'String'>
    readonly korwaslap: FieldRef<"Contract", 'String'>
    readonly nipKorwaslap: FieldRef<"Contract", 'String'>
    readonly pengawasLapangan: FieldRef<"Contract", 'String'>
    readonly nipPengawasLapangan: FieldRef<"Contract", 'String'>
    readonly paguAnggaran: FieldRef<"Contract", 'Float'>
    readonly nilaiKontrak: FieldRef<"Contract", 'Float'>
    readonly sumberDana: FieldRef<"Contract", 'String'>
    readonly nomorKontrak: FieldRef<"Contract", 'String'>
    readonly tanggalKontrak: FieldRef<"Contract", 'DateTime'>
    readonly masaPelaksanaan: FieldRef<"Contract", 'Int'>
    readonly tanggalSelesaiAwal: FieldRef<"Contract", 'DateTime'>
    readonly tanggalSelesaiAkhir: FieldRef<"Contract", 'DateTime'>
    readonly totalAddendumWaktu: FieldRef<"Contract", 'Int'>
    readonly volumeKontrak: FieldRef<"Contract", 'String'>
    readonly satuanKontrak: FieldRef<"Contract", 'String'>
    readonly subKegiatan: FieldRef<"Contract", 'String'>
    readonly konsultanSupervisi: FieldRef<"Contract", 'String'>
    readonly nomorKontrakSupervisi: FieldRef<"Contract", 'String'>
    readonly nilaiKontrakSupervisi: FieldRef<"Contract", 'Float'>
    readonly tanggalKontrakSupervisi: FieldRef<"Contract", 'DateTime'>
    readonly masaPelaksanaanSupervisi: FieldRef<"Contract", 'Int'>
    readonly hasilProdukAkhir: FieldRef<"Contract", 'String'>
    readonly dimensi: FieldRef<"Contract", 'String'>
    readonly dokumentasiAwal: FieldRef<"Contract", 'String'>
    readonly dokumentasiTengah: FieldRef<"Contract", 'String'>
    readonly dokumentasiAkhir: FieldRef<"Contract", 'String'>
    readonly dokumenPendukung: FieldRef<"Contract", 'String'>
    readonly hasAddendum: FieldRef<"Contract", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Contract findUnique
   */
  export type ContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findUniqueOrThrow
   */
  export type ContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract findFirst
   */
  export type ContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findFirstOrThrow
   */
  export type ContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contract to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract findMany
   */
  export type ContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter, which Contracts to fetch.
     */
    where?: ContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contracts to fetch.
     */
    orderBy?: ContractOrderByWithRelationInput | ContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contracts.
     */
    cursor?: ContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contracts.
     */
    distinct?: ContractScalarFieldEnum | ContractScalarFieldEnum[]
  }

  /**
   * Contract create
   */
  export type ContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to create a Contract.
     */
    data: XOR<ContractCreateInput, ContractUncheckedCreateInput>
  }

  /**
   * Contract createMany
   */
  export type ContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contract createManyAndReturn
   */
  export type ContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to create many Contracts.
     */
    data: ContractCreateManyInput | ContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contract update
   */
  export type ContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The data needed to update a Contract.
     */
    data: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
    /**
     * Choose, which Contract to update.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract updateMany
   */
  export type ContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
  }

  /**
   * Contract updateManyAndReturn
   */
  export type ContractUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * The data used to update Contracts.
     */
    data: XOR<ContractUpdateManyMutationInput, ContractUncheckedUpdateManyInput>
    /**
     * Filter which Contracts to update
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to update.
     */
    limit?: number
  }

  /**
   * Contract upsert
   */
  export type ContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * The filter to search for the Contract to update in case it exists.
     */
    where: ContractWhereUniqueInput
    /**
     * In case the Contract found by the `where` argument doesn't exist, create a new Contract with this data.
     */
    create: XOR<ContractCreateInput, ContractUncheckedCreateInput>
    /**
     * In case the Contract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractUpdateInput, ContractUncheckedUpdateInput>
  }

  /**
   * Contract delete
   */
  export type ContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
    /**
     * Filter which Contract to delete.
     */
    where: ContractWhereUniqueInput
  }

  /**
   * Contract deleteMany
   */
  export type ContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contracts to delete
     */
    where?: ContractWhereInput
    /**
     * Limit how many Contracts to delete.
     */
    limit?: number
  }

  /**
   * Contract.addendum
   */
  export type Contract$addendumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    where?: AddendumWhereInput
    orderBy?: AddendumOrderByWithRelationInput | AddendumOrderByWithRelationInput[]
    cursor?: AddendumWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddendumScalarFieldEnum | AddendumScalarFieldEnum[]
  }

  /**
   * Contract.financialProgress
   */
  export type Contract$financialProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    where?: FinancialProgressWhereInput
  }

  /**
   * Contract.physicalProgress
   */
  export type Contract$physicalProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    where?: PhysicalProgressWhereInput
    orderBy?: PhysicalProgressOrderByWithRelationInput | PhysicalProgressOrderByWithRelationInput[]
    cursor?: PhysicalProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhysicalProgressScalarFieldEnum | PhysicalProgressScalarFieldEnum[]
  }

  /**
   * Contract.location
   */
  export type Contract$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Contract.contractAccess
   */
  export type Contract$contractAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    where?: ContractAccessWhereInput
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    cursor?: ContractAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractAccessScalarFieldEnum | ContractAccessScalarFieldEnum[]
  }

  /**
   * Contract without action
   */
  export type ContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contract
     */
    select?: ContractSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contract
     */
    omit?: ContractOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractInclude<ExtArgs> | null
  }


  /**
   * Model PhysicalProgress
   */

  export type AggregatePhysicalProgress = {
    _count: PhysicalProgressCountAggregateOutputType | null
    _avg: PhysicalProgressAvgAggregateOutputType | null
    _sum: PhysicalProgressSumAggregateOutputType | null
    _min: PhysicalProgressMinAggregateOutputType | null
    _max: PhysicalProgressMaxAggregateOutputType | null
  }

  export type PhysicalProgressAvgAggregateOutputType = {
    week: number | null
    rencana: number | null
    realisasi: number | null
    deviasi: number | null
  }

  export type PhysicalProgressSumAggregateOutputType = {
    week: number | null
    rencana: number | null
    realisasi: number | null
    deviasi: number | null
  }

  export type PhysicalProgressMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    contractId: string | null
    month: string | null
    week: number | null
    startDate: Date | null
    endDate: Date | null
    rencana: number | null
    realisasi: number | null
    deviasi: number | null
    bermasalah: boolean | null
    deskripsiMasalah: string | null
    keterangan: string | null
  }

  export type PhysicalProgressMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    contractId: string | null
    month: string | null
    week: number | null
    startDate: Date | null
    endDate: Date | null
    rencana: number | null
    realisasi: number | null
    deviasi: number | null
    bermasalah: boolean | null
    deskripsiMasalah: string | null
    keterangan: string | null
  }

  export type PhysicalProgressCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    contractId: number
    month: number
    week: number
    startDate: number
    endDate: number
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah: number
    deskripsiMasalah: number
    keterangan: number
    _all: number
  }


  export type PhysicalProgressAvgAggregateInputType = {
    week?: true
    rencana?: true
    realisasi?: true
    deviasi?: true
  }

  export type PhysicalProgressSumAggregateInputType = {
    week?: true
    rencana?: true
    realisasi?: true
    deviasi?: true
  }

  export type PhysicalProgressMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractId?: true
    month?: true
    week?: true
    startDate?: true
    endDate?: true
    rencana?: true
    realisasi?: true
    deviasi?: true
    bermasalah?: true
    deskripsiMasalah?: true
    keterangan?: true
  }

  export type PhysicalProgressMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractId?: true
    month?: true
    week?: true
    startDate?: true
    endDate?: true
    rencana?: true
    realisasi?: true
    deviasi?: true
    bermasalah?: true
    deskripsiMasalah?: true
    keterangan?: true
  }

  export type PhysicalProgressCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    contractId?: true
    month?: true
    week?: true
    startDate?: true
    endDate?: true
    rencana?: true
    realisasi?: true
    deviasi?: true
    bermasalah?: true
    deskripsiMasalah?: true
    keterangan?: true
    _all?: true
  }

  export type PhysicalProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhysicalProgress to aggregate.
     */
    where?: PhysicalProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhysicalProgresses to fetch.
     */
    orderBy?: PhysicalProgressOrderByWithRelationInput | PhysicalProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhysicalProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhysicalProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhysicalProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhysicalProgresses
    **/
    _count?: true | PhysicalProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhysicalProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhysicalProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhysicalProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhysicalProgressMaxAggregateInputType
  }

  export type GetPhysicalProgressAggregateType<T extends PhysicalProgressAggregateArgs> = {
        [P in keyof T & keyof AggregatePhysicalProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhysicalProgress[P]>
      : GetScalarType<T[P], AggregatePhysicalProgress[P]>
  }




  export type PhysicalProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhysicalProgressWhereInput
    orderBy?: PhysicalProgressOrderByWithAggregationInput | PhysicalProgressOrderByWithAggregationInput[]
    by: PhysicalProgressScalarFieldEnum[] | PhysicalProgressScalarFieldEnum
    having?: PhysicalProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhysicalProgressCountAggregateInputType | true
    _avg?: PhysicalProgressAvgAggregateInputType
    _sum?: PhysicalProgressSumAggregateInputType
    _min?: PhysicalProgressMinAggregateInputType
    _max?: PhysicalProgressMaxAggregateInputType
  }

  export type PhysicalProgressGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    contractId: string
    month: string
    week: number
    startDate: Date | null
    endDate: Date | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah: boolean
    deskripsiMasalah: string | null
    keterangan: string | null
    _count: PhysicalProgressCountAggregateOutputType | null
    _avg: PhysicalProgressAvgAggregateOutputType | null
    _sum: PhysicalProgressSumAggregateOutputType | null
    _min: PhysicalProgressMinAggregateOutputType | null
    _max: PhysicalProgressMaxAggregateOutputType | null
  }

  type GetPhysicalProgressGroupByPayload<T extends PhysicalProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhysicalProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhysicalProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhysicalProgressGroupByOutputType[P]>
            : GetScalarType<T[P], PhysicalProgressGroupByOutputType[P]>
        }
      >
    >


  export type PhysicalProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractId?: boolean
    month?: boolean
    week?: boolean
    startDate?: boolean
    endDate?: boolean
    rencana?: boolean
    realisasi?: boolean
    deviasi?: boolean
    bermasalah?: boolean
    deskripsiMasalah?: boolean
    keterangan?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["physicalProgress"]>

  export type PhysicalProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractId?: boolean
    month?: boolean
    week?: boolean
    startDate?: boolean
    endDate?: boolean
    rencana?: boolean
    realisasi?: boolean
    deviasi?: boolean
    bermasalah?: boolean
    deskripsiMasalah?: boolean
    keterangan?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["physicalProgress"]>

  export type PhysicalProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractId?: boolean
    month?: boolean
    week?: boolean
    startDate?: boolean
    endDate?: boolean
    rencana?: boolean
    realisasi?: boolean
    deviasi?: boolean
    bermasalah?: boolean
    deskripsiMasalah?: boolean
    keterangan?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["physicalProgress"]>

  export type PhysicalProgressSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractId?: boolean
    month?: boolean
    week?: boolean
    startDate?: boolean
    endDate?: boolean
    rencana?: boolean
    realisasi?: boolean
    deviasi?: boolean
    bermasalah?: boolean
    deskripsiMasalah?: boolean
    keterangan?: boolean
  }

  export type PhysicalProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "contractId" | "month" | "week" | "startDate" | "endDate" | "rencana" | "realisasi" | "deviasi" | "bermasalah" | "deskripsiMasalah" | "keterangan", ExtArgs["result"]["physicalProgress"]>
  export type PhysicalProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type PhysicalProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type PhysicalProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $PhysicalProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhysicalProgress"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      contractId: string
      month: string
      week: number
      startDate: Date | null
      endDate: Date | null
      rencana: number
      realisasi: number
      deviasi: number
      bermasalah: boolean
      deskripsiMasalah: string | null
      keterangan: string | null
    }, ExtArgs["result"]["physicalProgress"]>
    composites: {}
  }

  type PhysicalProgressGetPayload<S extends boolean | null | undefined | PhysicalProgressDefaultArgs> = $Result.GetResult<Prisma.$PhysicalProgressPayload, S>

  type PhysicalProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhysicalProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhysicalProgressCountAggregateInputType | true
    }

  export interface PhysicalProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhysicalProgress'], meta: { name: 'PhysicalProgress' } }
    /**
     * Find zero or one PhysicalProgress that matches the filter.
     * @param {PhysicalProgressFindUniqueArgs} args - Arguments to find a PhysicalProgress
     * @example
     * // Get one PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhysicalProgressFindUniqueArgs>(args: SelectSubset<T, PhysicalProgressFindUniqueArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhysicalProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhysicalProgressFindUniqueOrThrowArgs} args - Arguments to find a PhysicalProgress
     * @example
     * // Get one PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhysicalProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, PhysicalProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhysicalProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressFindFirstArgs} args - Arguments to find a PhysicalProgress
     * @example
     * // Get one PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhysicalProgressFindFirstArgs>(args?: SelectSubset<T, PhysicalProgressFindFirstArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhysicalProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressFindFirstOrThrowArgs} args - Arguments to find a PhysicalProgress
     * @example
     * // Get one PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhysicalProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, PhysicalProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhysicalProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhysicalProgresses
     * const physicalProgresses = await prisma.physicalProgress.findMany()
     * 
     * // Get first 10 PhysicalProgresses
     * const physicalProgresses = await prisma.physicalProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const physicalProgressWithIdOnly = await prisma.physicalProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhysicalProgressFindManyArgs>(args?: SelectSubset<T, PhysicalProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhysicalProgress.
     * @param {PhysicalProgressCreateArgs} args - Arguments to create a PhysicalProgress.
     * @example
     * // Create one PhysicalProgress
     * const PhysicalProgress = await prisma.physicalProgress.create({
     *   data: {
     *     // ... data to create a PhysicalProgress
     *   }
     * })
     * 
     */
    create<T extends PhysicalProgressCreateArgs>(args: SelectSubset<T, PhysicalProgressCreateArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhysicalProgresses.
     * @param {PhysicalProgressCreateManyArgs} args - Arguments to create many PhysicalProgresses.
     * @example
     * // Create many PhysicalProgresses
     * const physicalProgress = await prisma.physicalProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhysicalProgressCreateManyArgs>(args?: SelectSubset<T, PhysicalProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhysicalProgresses and returns the data saved in the database.
     * @param {PhysicalProgressCreateManyAndReturnArgs} args - Arguments to create many PhysicalProgresses.
     * @example
     * // Create many PhysicalProgresses
     * const physicalProgress = await prisma.physicalProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhysicalProgresses and only return the `id`
     * const physicalProgressWithIdOnly = await prisma.physicalProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhysicalProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, PhysicalProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhysicalProgress.
     * @param {PhysicalProgressDeleteArgs} args - Arguments to delete one PhysicalProgress.
     * @example
     * // Delete one PhysicalProgress
     * const PhysicalProgress = await prisma.physicalProgress.delete({
     *   where: {
     *     // ... filter to delete one PhysicalProgress
     *   }
     * })
     * 
     */
    delete<T extends PhysicalProgressDeleteArgs>(args: SelectSubset<T, PhysicalProgressDeleteArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhysicalProgress.
     * @param {PhysicalProgressUpdateArgs} args - Arguments to update one PhysicalProgress.
     * @example
     * // Update one PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhysicalProgressUpdateArgs>(args: SelectSubset<T, PhysicalProgressUpdateArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhysicalProgresses.
     * @param {PhysicalProgressDeleteManyArgs} args - Arguments to filter PhysicalProgresses to delete.
     * @example
     * // Delete a few PhysicalProgresses
     * const { count } = await prisma.physicalProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhysicalProgressDeleteManyArgs>(args?: SelectSubset<T, PhysicalProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhysicalProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhysicalProgresses
     * const physicalProgress = await prisma.physicalProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhysicalProgressUpdateManyArgs>(args: SelectSubset<T, PhysicalProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhysicalProgresses and returns the data updated in the database.
     * @param {PhysicalProgressUpdateManyAndReturnArgs} args - Arguments to update many PhysicalProgresses.
     * @example
     * // Update many PhysicalProgresses
     * const physicalProgress = await prisma.physicalProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhysicalProgresses and only return the `id`
     * const physicalProgressWithIdOnly = await prisma.physicalProgress.updateManyAndReturn({
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
    updateManyAndReturn<T extends PhysicalProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, PhysicalProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhysicalProgress.
     * @param {PhysicalProgressUpsertArgs} args - Arguments to update or create a PhysicalProgress.
     * @example
     * // Update or create a PhysicalProgress
     * const physicalProgress = await prisma.physicalProgress.upsert({
     *   create: {
     *     // ... data to create a PhysicalProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhysicalProgress we want to update
     *   }
     * })
     */
    upsert<T extends PhysicalProgressUpsertArgs>(args: SelectSubset<T, PhysicalProgressUpsertArgs<ExtArgs>>): Prisma__PhysicalProgressClient<$Result.GetResult<Prisma.$PhysicalProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhysicalProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressCountArgs} args - Arguments to filter PhysicalProgresses to count.
     * @example
     * // Count the number of PhysicalProgresses
     * const count = await prisma.physicalProgress.count({
     *   where: {
     *     // ... the filter for the PhysicalProgresses we want to count
     *   }
     * })
    **/
    count<T extends PhysicalProgressCountArgs>(
      args?: Subset<T, PhysicalProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhysicalProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhysicalProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhysicalProgressAggregateArgs>(args: Subset<T, PhysicalProgressAggregateArgs>): Prisma.PrismaPromise<GetPhysicalProgressAggregateType<T>>

    /**
     * Group by PhysicalProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhysicalProgressGroupByArgs} args - Group by arguments.
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
      T extends PhysicalProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhysicalProgressGroupByArgs['orderBy'] }
        : { orderBy?: PhysicalProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhysicalProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhysicalProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhysicalProgress model
   */
  readonly fields: PhysicalProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhysicalProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhysicalProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PhysicalProgress model
   */
  interface PhysicalProgressFieldRefs {
    readonly id: FieldRef<"PhysicalProgress", 'String'>
    readonly createdAt: FieldRef<"PhysicalProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"PhysicalProgress", 'DateTime'>
    readonly contractId: FieldRef<"PhysicalProgress", 'String'>
    readonly month: FieldRef<"PhysicalProgress", 'String'>
    readonly week: FieldRef<"PhysicalProgress", 'Int'>
    readonly startDate: FieldRef<"PhysicalProgress", 'DateTime'>
    readonly endDate: FieldRef<"PhysicalProgress", 'DateTime'>
    readonly rencana: FieldRef<"PhysicalProgress", 'Float'>
    readonly realisasi: FieldRef<"PhysicalProgress", 'Float'>
    readonly deviasi: FieldRef<"PhysicalProgress", 'Float'>
    readonly bermasalah: FieldRef<"PhysicalProgress", 'Boolean'>
    readonly deskripsiMasalah: FieldRef<"PhysicalProgress", 'String'>
    readonly keterangan: FieldRef<"PhysicalProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PhysicalProgress findUnique
   */
  export type PhysicalProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter, which PhysicalProgress to fetch.
     */
    where: PhysicalProgressWhereUniqueInput
  }

  /**
   * PhysicalProgress findUniqueOrThrow
   */
  export type PhysicalProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter, which PhysicalProgress to fetch.
     */
    where: PhysicalProgressWhereUniqueInput
  }

  /**
   * PhysicalProgress findFirst
   */
  export type PhysicalProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter, which PhysicalProgress to fetch.
     */
    where?: PhysicalProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhysicalProgresses to fetch.
     */
    orderBy?: PhysicalProgressOrderByWithRelationInput | PhysicalProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhysicalProgresses.
     */
    cursor?: PhysicalProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhysicalProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhysicalProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhysicalProgresses.
     */
    distinct?: PhysicalProgressScalarFieldEnum | PhysicalProgressScalarFieldEnum[]
  }

  /**
   * PhysicalProgress findFirstOrThrow
   */
  export type PhysicalProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter, which PhysicalProgress to fetch.
     */
    where?: PhysicalProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhysicalProgresses to fetch.
     */
    orderBy?: PhysicalProgressOrderByWithRelationInput | PhysicalProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhysicalProgresses.
     */
    cursor?: PhysicalProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhysicalProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhysicalProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhysicalProgresses.
     */
    distinct?: PhysicalProgressScalarFieldEnum | PhysicalProgressScalarFieldEnum[]
  }

  /**
   * PhysicalProgress findMany
   */
  export type PhysicalProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter, which PhysicalProgresses to fetch.
     */
    where?: PhysicalProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhysicalProgresses to fetch.
     */
    orderBy?: PhysicalProgressOrderByWithRelationInput | PhysicalProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhysicalProgresses.
     */
    cursor?: PhysicalProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhysicalProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhysicalProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhysicalProgresses.
     */
    distinct?: PhysicalProgressScalarFieldEnum | PhysicalProgressScalarFieldEnum[]
  }

  /**
   * PhysicalProgress create
   */
  export type PhysicalProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a PhysicalProgress.
     */
    data: XOR<PhysicalProgressCreateInput, PhysicalProgressUncheckedCreateInput>
  }

  /**
   * PhysicalProgress createMany
   */
  export type PhysicalProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhysicalProgresses.
     */
    data: PhysicalProgressCreateManyInput | PhysicalProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhysicalProgress createManyAndReturn
   */
  export type PhysicalProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * The data used to create many PhysicalProgresses.
     */
    data: PhysicalProgressCreateManyInput | PhysicalProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhysicalProgress update
   */
  export type PhysicalProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a PhysicalProgress.
     */
    data: XOR<PhysicalProgressUpdateInput, PhysicalProgressUncheckedUpdateInput>
    /**
     * Choose, which PhysicalProgress to update.
     */
    where: PhysicalProgressWhereUniqueInput
  }

  /**
   * PhysicalProgress updateMany
   */
  export type PhysicalProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhysicalProgresses.
     */
    data: XOR<PhysicalProgressUpdateManyMutationInput, PhysicalProgressUncheckedUpdateManyInput>
    /**
     * Filter which PhysicalProgresses to update
     */
    where?: PhysicalProgressWhereInput
    /**
     * Limit how many PhysicalProgresses to update.
     */
    limit?: number
  }

  /**
   * PhysicalProgress updateManyAndReturn
   */
  export type PhysicalProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * The data used to update PhysicalProgresses.
     */
    data: XOR<PhysicalProgressUpdateManyMutationInput, PhysicalProgressUncheckedUpdateManyInput>
    /**
     * Filter which PhysicalProgresses to update
     */
    where?: PhysicalProgressWhereInput
    /**
     * Limit how many PhysicalProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PhysicalProgress upsert
   */
  export type PhysicalProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the PhysicalProgress to update in case it exists.
     */
    where: PhysicalProgressWhereUniqueInput
    /**
     * In case the PhysicalProgress found by the `where` argument doesn't exist, create a new PhysicalProgress with this data.
     */
    create: XOR<PhysicalProgressCreateInput, PhysicalProgressUncheckedCreateInput>
    /**
     * In case the PhysicalProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhysicalProgressUpdateInput, PhysicalProgressUncheckedUpdateInput>
  }

  /**
   * PhysicalProgress delete
   */
  export type PhysicalProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
    /**
     * Filter which PhysicalProgress to delete.
     */
    where: PhysicalProgressWhereUniqueInput
  }

  /**
   * PhysicalProgress deleteMany
   */
  export type PhysicalProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhysicalProgresses to delete
     */
    where?: PhysicalProgressWhereInput
    /**
     * Limit how many PhysicalProgresses to delete.
     */
    limit?: number
  }

  /**
   * PhysicalProgress without action
   */
  export type PhysicalProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhysicalProgress
     */
    select?: PhysicalProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhysicalProgress
     */
    omit?: PhysicalProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhysicalProgressInclude<ExtArgs> | null
  }


  /**
   * Model FinancialProgress
   */

  export type AggregateFinancialProgress = {
    _count: FinancialProgressCountAggregateOutputType | null
    _avg: FinancialProgressAvgAggregateOutputType | null
    _sum: FinancialProgressSumAggregateOutputType | null
    _min: FinancialProgressMinAggregateOutputType | null
    _max: FinancialProgressMaxAggregateOutputType | null
  }

  export type FinancialProgressAvgAggregateOutputType = {
    totalProgress: number | null
    totalPayment: number | null
    uangMuka: number | null
    termin1: number | null
    termin2: number | null
    termin3: number | null
    termin4: number | null
  }

  export type FinancialProgressSumAggregateOutputType = {
    totalProgress: number | null
    totalPayment: number | null
    uangMuka: number | null
    termin1: number | null
    termin2: number | null
    termin3: number | null
    termin4: number | null
  }

  export type FinancialProgressMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    totalProgress: number | null
    totalPayment: number | null
    uangMuka: number | null
    termin1: number | null
    termin2: number | null
    termin3: number | null
    termin4: number | null
    contractId: string | null
  }

  export type FinancialProgressMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    totalProgress: number | null
    totalPayment: number | null
    uangMuka: number | null
    termin1: number | null
    termin2: number | null
    termin3: number | null
    termin4: number | null
    contractId: string | null
  }

  export type FinancialProgressCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    totalProgress: number
    totalPayment: number
    uangMuka: number
    termin1: number
    termin2: number
    termin3: number
    termin4: number
    contractId: number
    _all: number
  }


  export type FinancialProgressAvgAggregateInputType = {
    totalProgress?: true
    totalPayment?: true
    uangMuka?: true
    termin1?: true
    termin2?: true
    termin3?: true
    termin4?: true
  }

  export type FinancialProgressSumAggregateInputType = {
    totalProgress?: true
    totalPayment?: true
    uangMuka?: true
    termin1?: true
    termin2?: true
    termin3?: true
    termin4?: true
  }

  export type FinancialProgressMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    totalProgress?: true
    totalPayment?: true
    uangMuka?: true
    termin1?: true
    termin2?: true
    termin3?: true
    termin4?: true
    contractId?: true
  }

  export type FinancialProgressMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    totalProgress?: true
    totalPayment?: true
    uangMuka?: true
    termin1?: true
    termin2?: true
    termin3?: true
    termin4?: true
    contractId?: true
  }

  export type FinancialProgressCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    totalProgress?: true
    totalPayment?: true
    uangMuka?: true
    termin1?: true
    termin2?: true
    termin3?: true
    termin4?: true
    contractId?: true
    _all?: true
  }

  export type FinancialProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialProgress to aggregate.
     */
    where?: FinancialProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialProgresses to fetch.
     */
    orderBy?: FinancialProgressOrderByWithRelationInput | FinancialProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinancialProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinancialProgresses
    **/
    _count?: true | FinancialProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FinancialProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FinancialProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancialProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancialProgressMaxAggregateInputType
  }

  export type GetFinancialProgressAggregateType<T extends FinancialProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancialProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancialProgress[P]>
      : GetScalarType<T[P], AggregateFinancialProgress[P]>
  }




  export type FinancialProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialProgressWhereInput
    orderBy?: FinancialProgressOrderByWithAggregationInput | FinancialProgressOrderByWithAggregationInput[]
    by: FinancialProgressScalarFieldEnum[] | FinancialProgressScalarFieldEnum
    having?: FinancialProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancialProgressCountAggregateInputType | true
    _avg?: FinancialProgressAvgAggregateInputType
    _sum?: FinancialProgressSumAggregateInputType
    _min?: FinancialProgressMinAggregateInputType
    _max?: FinancialProgressMaxAggregateInputType
  }

  export type FinancialProgressGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    totalProgress: number | null
    totalPayment: number | null
    uangMuka: number | null
    termin1: number | null
    termin2: number | null
    termin3: number | null
    termin4: number | null
    contractId: string
    _count: FinancialProgressCountAggregateOutputType | null
    _avg: FinancialProgressAvgAggregateOutputType | null
    _sum: FinancialProgressSumAggregateOutputType | null
    _min: FinancialProgressMinAggregateOutputType | null
    _max: FinancialProgressMaxAggregateOutputType | null
  }

  type GetFinancialProgressGroupByPayload<T extends FinancialProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancialProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancialProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancialProgressGroupByOutputType[P]>
            : GetScalarType<T[P], FinancialProgressGroupByOutputType[P]>
        }
      >
    >


  export type FinancialProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalProgress?: boolean
    totalPayment?: boolean
    uangMuka?: boolean
    termin1?: boolean
    termin2?: boolean
    termin3?: boolean
    termin4?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialProgress"]>

  export type FinancialProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalProgress?: boolean
    totalPayment?: boolean
    uangMuka?: boolean
    termin1?: boolean
    termin2?: boolean
    termin3?: boolean
    termin4?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialProgress"]>

  export type FinancialProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalProgress?: boolean
    totalPayment?: boolean
    uangMuka?: boolean
    termin1?: boolean
    termin2?: boolean
    termin3?: boolean
    termin4?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialProgress"]>

  export type FinancialProgressSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalProgress?: boolean
    totalPayment?: boolean
    uangMuka?: boolean
    termin1?: boolean
    termin2?: boolean
    termin3?: boolean
    termin4?: boolean
    contractId?: boolean
  }

  export type FinancialProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "totalProgress" | "totalPayment" | "uangMuka" | "termin1" | "termin2" | "termin3" | "termin4" | "contractId", ExtArgs["result"]["financialProgress"]>
  export type FinancialProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type FinancialProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type FinancialProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $FinancialProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinancialProgress"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      totalProgress: number | null
      totalPayment: number | null
      uangMuka: number | null
      termin1: number | null
      termin2: number | null
      termin3: number | null
      termin4: number | null
      contractId: string
    }, ExtArgs["result"]["financialProgress"]>
    composites: {}
  }

  type FinancialProgressGetPayload<S extends boolean | null | undefined | FinancialProgressDefaultArgs> = $Result.GetResult<Prisma.$FinancialProgressPayload, S>

  type FinancialProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinancialProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancialProgressCountAggregateInputType | true
    }

  export interface FinancialProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinancialProgress'], meta: { name: 'FinancialProgress' } }
    /**
     * Find zero or one FinancialProgress that matches the filter.
     * @param {FinancialProgressFindUniqueArgs} args - Arguments to find a FinancialProgress
     * @example
     * // Get one FinancialProgress
     * const financialProgress = await prisma.financialProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialProgressFindUniqueArgs>(args: SelectSubset<T, FinancialProgressFindUniqueArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinancialProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialProgressFindUniqueOrThrowArgs} args - Arguments to find a FinancialProgress
     * @example
     * // Get one FinancialProgress
     * const financialProgress = await prisma.financialProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, FinancialProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressFindFirstArgs} args - Arguments to find a FinancialProgress
     * @example
     * // Get one FinancialProgress
     * const financialProgress = await prisma.financialProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialProgressFindFirstArgs>(args?: SelectSubset<T, FinancialProgressFindFirstArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressFindFirstOrThrowArgs} args - Arguments to find a FinancialProgress
     * @example
     * // Get one FinancialProgress
     * const financialProgress = await prisma.financialProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, FinancialProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinancialProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialProgresses
     * const financialProgresses = await prisma.financialProgress.findMany()
     * 
     * // Get first 10 FinancialProgresses
     * const financialProgresses = await prisma.financialProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financialProgressWithIdOnly = await prisma.financialProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinancialProgressFindManyArgs>(args?: SelectSubset<T, FinancialProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinancialProgress.
     * @param {FinancialProgressCreateArgs} args - Arguments to create a FinancialProgress.
     * @example
     * // Create one FinancialProgress
     * const FinancialProgress = await prisma.financialProgress.create({
     *   data: {
     *     // ... data to create a FinancialProgress
     *   }
     * })
     * 
     */
    create<T extends FinancialProgressCreateArgs>(args: SelectSubset<T, FinancialProgressCreateArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinancialProgresses.
     * @param {FinancialProgressCreateManyArgs} args - Arguments to create many FinancialProgresses.
     * @example
     * // Create many FinancialProgresses
     * const financialProgress = await prisma.financialProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinancialProgressCreateManyArgs>(args?: SelectSubset<T, FinancialProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinancialProgresses and returns the data saved in the database.
     * @param {FinancialProgressCreateManyAndReturnArgs} args - Arguments to create many FinancialProgresses.
     * @example
     * // Create many FinancialProgresses
     * const financialProgress = await prisma.financialProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinancialProgresses and only return the `id`
     * const financialProgressWithIdOnly = await prisma.financialProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinancialProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, FinancialProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinancialProgress.
     * @param {FinancialProgressDeleteArgs} args - Arguments to delete one FinancialProgress.
     * @example
     * // Delete one FinancialProgress
     * const FinancialProgress = await prisma.financialProgress.delete({
     *   where: {
     *     // ... filter to delete one FinancialProgress
     *   }
     * })
     * 
     */
    delete<T extends FinancialProgressDeleteArgs>(args: SelectSubset<T, FinancialProgressDeleteArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinancialProgress.
     * @param {FinancialProgressUpdateArgs} args - Arguments to update one FinancialProgress.
     * @example
     * // Update one FinancialProgress
     * const financialProgress = await prisma.financialProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinancialProgressUpdateArgs>(args: SelectSubset<T, FinancialProgressUpdateArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinancialProgresses.
     * @param {FinancialProgressDeleteManyArgs} args - Arguments to filter FinancialProgresses to delete.
     * @example
     * // Delete a few FinancialProgresses
     * const { count } = await prisma.financialProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinancialProgressDeleteManyArgs>(args?: SelectSubset<T, FinancialProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialProgresses
     * const financialProgress = await prisma.financialProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinancialProgressUpdateManyArgs>(args: SelectSubset<T, FinancialProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialProgresses and returns the data updated in the database.
     * @param {FinancialProgressUpdateManyAndReturnArgs} args - Arguments to update many FinancialProgresses.
     * @example
     * // Update many FinancialProgresses
     * const financialProgress = await prisma.financialProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinancialProgresses and only return the `id`
     * const financialProgressWithIdOnly = await prisma.financialProgress.updateManyAndReturn({
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
    updateManyAndReturn<T extends FinancialProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, FinancialProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinancialProgress.
     * @param {FinancialProgressUpsertArgs} args - Arguments to update or create a FinancialProgress.
     * @example
     * // Update or create a FinancialProgress
     * const financialProgress = await prisma.financialProgress.upsert({
     *   create: {
     *     // ... data to create a FinancialProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialProgress we want to update
     *   }
     * })
     */
    upsert<T extends FinancialProgressUpsertArgs>(args: SelectSubset<T, FinancialProgressUpsertArgs<ExtArgs>>): Prisma__FinancialProgressClient<$Result.GetResult<Prisma.$FinancialProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinancialProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressCountArgs} args - Arguments to filter FinancialProgresses to count.
     * @example
     * // Count the number of FinancialProgresses
     * const count = await prisma.financialProgress.count({
     *   where: {
     *     // ... the filter for the FinancialProgresses we want to count
     *   }
     * })
    **/
    count<T extends FinancialProgressCountArgs>(
      args?: Subset<T, FinancialProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancialProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinancialProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FinancialProgressAggregateArgs>(args: Subset<T, FinancialProgressAggregateArgs>): Prisma.PrismaPromise<GetFinancialProgressAggregateType<T>>

    /**
     * Group by FinancialProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialProgressGroupByArgs} args - Group by arguments.
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
      T extends FinancialProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinancialProgressGroupByArgs['orderBy'] }
        : { orderBy?: FinancialProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FinancialProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinancialProgress model
   */
  readonly fields: FinancialProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinancialProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinancialProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FinancialProgress model
   */
  interface FinancialProgressFieldRefs {
    readonly id: FieldRef<"FinancialProgress", 'String'>
    readonly createdAt: FieldRef<"FinancialProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"FinancialProgress", 'DateTime'>
    readonly totalProgress: FieldRef<"FinancialProgress", 'Float'>
    readonly totalPayment: FieldRef<"FinancialProgress", 'Float'>
    readonly uangMuka: FieldRef<"FinancialProgress", 'Float'>
    readonly termin1: FieldRef<"FinancialProgress", 'Float'>
    readonly termin2: FieldRef<"FinancialProgress", 'Float'>
    readonly termin3: FieldRef<"FinancialProgress", 'Float'>
    readonly termin4: FieldRef<"FinancialProgress", 'Float'>
    readonly contractId: FieldRef<"FinancialProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FinancialProgress findUnique
   */
  export type FinancialProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter, which FinancialProgress to fetch.
     */
    where: FinancialProgressWhereUniqueInput
  }

  /**
   * FinancialProgress findUniqueOrThrow
   */
  export type FinancialProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter, which FinancialProgress to fetch.
     */
    where: FinancialProgressWhereUniqueInput
  }

  /**
   * FinancialProgress findFirst
   */
  export type FinancialProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter, which FinancialProgress to fetch.
     */
    where?: FinancialProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialProgresses to fetch.
     */
    orderBy?: FinancialProgressOrderByWithRelationInput | FinancialProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialProgresses.
     */
    cursor?: FinancialProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialProgresses.
     */
    distinct?: FinancialProgressScalarFieldEnum | FinancialProgressScalarFieldEnum[]
  }

  /**
   * FinancialProgress findFirstOrThrow
   */
  export type FinancialProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter, which FinancialProgress to fetch.
     */
    where?: FinancialProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialProgresses to fetch.
     */
    orderBy?: FinancialProgressOrderByWithRelationInput | FinancialProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialProgresses.
     */
    cursor?: FinancialProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialProgresses.
     */
    distinct?: FinancialProgressScalarFieldEnum | FinancialProgressScalarFieldEnum[]
  }

  /**
   * FinancialProgress findMany
   */
  export type FinancialProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter, which FinancialProgresses to fetch.
     */
    where?: FinancialProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialProgresses to fetch.
     */
    orderBy?: FinancialProgressOrderByWithRelationInput | FinancialProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinancialProgresses.
     */
    cursor?: FinancialProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialProgresses.
     */
    distinct?: FinancialProgressScalarFieldEnum | FinancialProgressScalarFieldEnum[]
  }

  /**
   * FinancialProgress create
   */
  export type FinancialProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a FinancialProgress.
     */
    data: XOR<FinancialProgressCreateInput, FinancialProgressUncheckedCreateInput>
  }

  /**
   * FinancialProgress createMany
   */
  export type FinancialProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialProgresses.
     */
    data: FinancialProgressCreateManyInput | FinancialProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinancialProgress createManyAndReturn
   */
  export type FinancialProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * The data used to create many FinancialProgresses.
     */
    data: FinancialProgressCreateManyInput | FinancialProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialProgress update
   */
  export type FinancialProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a FinancialProgress.
     */
    data: XOR<FinancialProgressUpdateInput, FinancialProgressUncheckedUpdateInput>
    /**
     * Choose, which FinancialProgress to update.
     */
    where: FinancialProgressWhereUniqueInput
  }

  /**
   * FinancialProgress updateMany
   */
  export type FinancialProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialProgresses.
     */
    data: XOR<FinancialProgressUpdateManyMutationInput, FinancialProgressUncheckedUpdateManyInput>
    /**
     * Filter which FinancialProgresses to update
     */
    where?: FinancialProgressWhereInput
    /**
     * Limit how many FinancialProgresses to update.
     */
    limit?: number
  }

  /**
   * FinancialProgress updateManyAndReturn
   */
  export type FinancialProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * The data used to update FinancialProgresses.
     */
    data: XOR<FinancialProgressUpdateManyMutationInput, FinancialProgressUncheckedUpdateManyInput>
    /**
     * Filter which FinancialProgresses to update
     */
    where?: FinancialProgressWhereInput
    /**
     * Limit how many FinancialProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialProgress upsert
   */
  export type FinancialProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the FinancialProgress to update in case it exists.
     */
    where: FinancialProgressWhereUniqueInput
    /**
     * In case the FinancialProgress found by the `where` argument doesn't exist, create a new FinancialProgress with this data.
     */
    create: XOR<FinancialProgressCreateInput, FinancialProgressUncheckedCreateInput>
    /**
     * In case the FinancialProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinancialProgressUpdateInput, FinancialProgressUncheckedUpdateInput>
  }

  /**
   * FinancialProgress delete
   */
  export type FinancialProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
    /**
     * Filter which FinancialProgress to delete.
     */
    where: FinancialProgressWhereUniqueInput
  }

  /**
   * FinancialProgress deleteMany
   */
  export type FinancialProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialProgresses to delete
     */
    where?: FinancialProgressWhereInput
    /**
     * Limit how many FinancialProgresses to delete.
     */
    limit?: number
  }

  /**
   * FinancialProgress without action
   */
  export type FinancialProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialProgress
     */
    select?: FinancialProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialProgress
     */
    omit?: FinancialProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialProgressInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    kota: string | null
    distrik: string | null
    kampung: string | null
    koordinatAwal: string | null
    koordinatAkhir: string | null
    contractId: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    kota: string | null
    distrik: string | null
    kampung: string | null
    koordinatAwal: string | null
    koordinatAkhir: string | null
    contractId: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    kota: number
    distrik: number
    kampung: number
    koordinatAwal: number
    koordinatAkhir: number
    contractId: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    kota?: true
    distrik?: true
    kampung?: true
    koordinatAwal?: true
    koordinatAkhir?: true
    contractId?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    kota?: true
    distrik?: true
    kampung?: true
    koordinatAwal?: true
    koordinatAkhir?: true
    contractId?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    kota?: true
    distrik?: true
    kampung?: true
    koordinatAwal?: true
    koordinatAkhir?: true
    contractId?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    kota: string | null
    distrik: string | null
    kampung: string | null
    koordinatAwal: string | null
    koordinatAkhir: string | null
    contractId: string
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kota?: boolean
    distrik?: boolean
    kampung?: boolean
    koordinatAwal?: boolean
    koordinatAkhir?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kota?: boolean
    distrik?: boolean
    kampung?: boolean
    koordinatAwal?: boolean
    koordinatAkhir?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kota?: boolean
    distrik?: boolean
    kampung?: boolean
    koordinatAwal?: boolean
    koordinatAkhir?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kota?: boolean
    distrik?: boolean
    kampung?: boolean
    koordinatAwal?: boolean
    koordinatAkhir?: boolean
    contractId?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "kota" | "distrik" | "kampung" | "koordinatAwal" | "koordinatAkhir" | "contractId", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      kota: string | null
      distrik: string | null
      kampung: string | null
      koordinatAwal: string | null
      koordinatAkhir: string | null
      contractId: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
    readonly kota: FieldRef<"Location", 'String'>
    readonly distrik: FieldRef<"Location", 'String'>
    readonly kampung: FieldRef<"Location", 'String'>
    readonly koordinatAwal: FieldRef<"Location", 'String'>
    readonly koordinatAkhir: FieldRef<"Location", 'String'>
    readonly contractId: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Addendum
   */

  export type AggregateAddendum = {
    _count: AddendumCountAggregateOutputType | null
    _avg: AddendumAvgAggregateOutputType | null
    _sum: AddendumSumAggregateOutputType | null
    _min: AddendumMinAggregateOutputType | null
    _max: AddendumMaxAggregateOutputType | null
  }

  export type AddendumAvgAggregateOutputType = {
    hari: number | null
  }

  export type AddendumSumAggregateOutputType = {
    hari: number | null
  }

  export type AddendumMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    tipe: string | null
    tanggal: Date | null
    hari: number | null
    volume: string | null
    satuan: string | null
    pemberianKesempatan: boolean | null
    alasan: string | null
    contractId: string | null
  }

  export type AddendumMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    tipe: string | null
    tanggal: Date | null
    hari: number | null
    volume: string | null
    satuan: string | null
    pemberianKesempatan: boolean | null
    alasan: string | null
    contractId: string | null
  }

  export type AddendumCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    tipe: number
    tanggal: number
    hari: number
    volume: number
    satuan: number
    pemberianKesempatan: number
    alasan: number
    contractId: number
    _all: number
  }


  export type AddendumAvgAggregateInputType = {
    hari?: true
  }

  export type AddendumSumAggregateInputType = {
    hari?: true
  }

  export type AddendumMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    tipe?: true
    tanggal?: true
    hari?: true
    volume?: true
    satuan?: true
    pemberianKesempatan?: true
    alasan?: true
    contractId?: true
  }

  export type AddendumMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    tipe?: true
    tanggal?: true
    hari?: true
    volume?: true
    satuan?: true
    pemberianKesempatan?: true
    alasan?: true
    contractId?: true
  }

  export type AddendumCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    tipe?: true
    tanggal?: true
    hari?: true
    volume?: true
    satuan?: true
    pemberianKesempatan?: true
    alasan?: true
    contractId?: true
    _all?: true
  }

  export type AddendumAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addendum to aggregate.
     */
    where?: AddendumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addenda to fetch.
     */
    orderBy?: AddendumOrderByWithRelationInput | AddendumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddendumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addenda
    **/
    _count?: true | AddendumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddendumAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddendumSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddendumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddendumMaxAggregateInputType
  }

  export type GetAddendumAggregateType<T extends AddendumAggregateArgs> = {
        [P in keyof T & keyof AggregateAddendum]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddendum[P]>
      : GetScalarType<T[P], AggregateAddendum[P]>
  }




  export type AddendumGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddendumWhereInput
    orderBy?: AddendumOrderByWithAggregationInput | AddendumOrderByWithAggregationInput[]
    by: AddendumScalarFieldEnum[] | AddendumScalarFieldEnum
    having?: AddendumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddendumCountAggregateInputType | true
    _avg?: AddendumAvgAggregateInputType
    _sum?: AddendumSumAggregateInputType
    _min?: AddendumMinAggregateInputType
    _max?: AddendumMaxAggregateInputType
  }

  export type AddendumGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string | null
    tipe: string | null
    tanggal: Date | null
    hari: number | null
    volume: string | null
    satuan: string | null
    pemberianKesempatan: boolean
    alasan: string | null
    contractId: string
    _count: AddendumCountAggregateOutputType | null
    _avg: AddendumAvgAggregateOutputType | null
    _sum: AddendumSumAggregateOutputType | null
    _min: AddendumMinAggregateOutputType | null
    _max: AddendumMaxAggregateOutputType | null
  }

  type GetAddendumGroupByPayload<T extends AddendumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddendumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddendumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddendumGroupByOutputType[P]>
            : GetScalarType<T[P], AddendumGroupByOutputType[P]>
        }
      >
    >


  export type AddendumSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    tipe?: boolean
    tanggal?: boolean
    hari?: boolean
    volume?: boolean
    satuan?: boolean
    pemberianKesempatan?: boolean
    alasan?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addendum"]>

  export type AddendumSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    tipe?: boolean
    tanggal?: boolean
    hari?: boolean
    volume?: boolean
    satuan?: boolean
    pemberianKesempatan?: boolean
    alasan?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addendum"]>

  export type AddendumSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    tipe?: boolean
    tanggal?: boolean
    hari?: boolean
    volume?: boolean
    satuan?: boolean
    pemberianKesempatan?: boolean
    alasan?: boolean
    contractId?: boolean
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addendum"]>

  export type AddendumSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    tipe?: boolean
    tanggal?: boolean
    hari?: boolean
    volume?: boolean
    satuan?: boolean
    pemberianKesempatan?: boolean
    alasan?: boolean
    contractId?: boolean
  }

  export type AddendumOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "tipe" | "tanggal" | "hari" | "volume" | "satuan" | "pemberianKesempatan" | "alasan" | "contractId", ExtArgs["result"]["addendum"]>
  export type AddendumInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type AddendumIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type AddendumIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $AddendumPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Addendum"
    objects: {
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string | null
      tipe: string | null
      tanggal: Date | null
      hari: number | null
      volume: string | null
      satuan: string | null
      pemberianKesempatan: boolean
      alasan: string | null
      contractId: string
    }, ExtArgs["result"]["addendum"]>
    composites: {}
  }

  type AddendumGetPayload<S extends boolean | null | undefined | AddendumDefaultArgs> = $Result.GetResult<Prisma.$AddendumPayload, S>

  type AddendumCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddendumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddendumCountAggregateInputType | true
    }

  export interface AddendumDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Addendum'], meta: { name: 'Addendum' } }
    /**
     * Find zero or one Addendum that matches the filter.
     * @param {AddendumFindUniqueArgs} args - Arguments to find a Addendum
     * @example
     * // Get one Addendum
     * const addendum = await prisma.addendum.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddendumFindUniqueArgs>(args: SelectSubset<T, AddendumFindUniqueArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Addendum that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddendumFindUniqueOrThrowArgs} args - Arguments to find a Addendum
     * @example
     * // Get one Addendum
     * const addendum = await prisma.addendum.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddendumFindUniqueOrThrowArgs>(args: SelectSubset<T, AddendumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Addendum that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumFindFirstArgs} args - Arguments to find a Addendum
     * @example
     * // Get one Addendum
     * const addendum = await prisma.addendum.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddendumFindFirstArgs>(args?: SelectSubset<T, AddendumFindFirstArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Addendum that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumFindFirstOrThrowArgs} args - Arguments to find a Addendum
     * @example
     * // Get one Addendum
     * const addendum = await prisma.addendum.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddendumFindFirstOrThrowArgs>(args?: SelectSubset<T, AddendumFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addenda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addenda
     * const addenda = await prisma.addendum.findMany()
     * 
     * // Get first 10 Addenda
     * const addenda = await prisma.addendum.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addendumWithIdOnly = await prisma.addendum.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddendumFindManyArgs>(args?: SelectSubset<T, AddendumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Addendum.
     * @param {AddendumCreateArgs} args - Arguments to create a Addendum.
     * @example
     * // Create one Addendum
     * const Addendum = await prisma.addendum.create({
     *   data: {
     *     // ... data to create a Addendum
     *   }
     * })
     * 
     */
    create<T extends AddendumCreateArgs>(args: SelectSubset<T, AddendumCreateArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addenda.
     * @param {AddendumCreateManyArgs} args - Arguments to create many Addenda.
     * @example
     * // Create many Addenda
     * const addendum = await prisma.addendum.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddendumCreateManyArgs>(args?: SelectSubset<T, AddendumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addenda and returns the data saved in the database.
     * @param {AddendumCreateManyAndReturnArgs} args - Arguments to create many Addenda.
     * @example
     * // Create many Addenda
     * const addendum = await prisma.addendum.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addenda and only return the `id`
     * const addendumWithIdOnly = await prisma.addendum.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddendumCreateManyAndReturnArgs>(args?: SelectSubset<T, AddendumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Addendum.
     * @param {AddendumDeleteArgs} args - Arguments to delete one Addendum.
     * @example
     * // Delete one Addendum
     * const Addendum = await prisma.addendum.delete({
     *   where: {
     *     // ... filter to delete one Addendum
     *   }
     * })
     * 
     */
    delete<T extends AddendumDeleteArgs>(args: SelectSubset<T, AddendumDeleteArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Addendum.
     * @param {AddendumUpdateArgs} args - Arguments to update one Addendum.
     * @example
     * // Update one Addendum
     * const addendum = await prisma.addendum.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddendumUpdateArgs>(args: SelectSubset<T, AddendumUpdateArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addenda.
     * @param {AddendumDeleteManyArgs} args - Arguments to filter Addenda to delete.
     * @example
     * // Delete a few Addenda
     * const { count } = await prisma.addendum.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddendumDeleteManyArgs>(args?: SelectSubset<T, AddendumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addenda
     * const addendum = await prisma.addendum.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddendumUpdateManyArgs>(args: SelectSubset<T, AddendumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addenda and returns the data updated in the database.
     * @param {AddendumUpdateManyAndReturnArgs} args - Arguments to update many Addenda.
     * @example
     * // Update many Addenda
     * const addendum = await prisma.addendum.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Addenda and only return the `id`
     * const addendumWithIdOnly = await prisma.addendum.updateManyAndReturn({
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
    updateManyAndReturn<T extends AddendumUpdateManyAndReturnArgs>(args: SelectSubset<T, AddendumUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Addendum.
     * @param {AddendumUpsertArgs} args - Arguments to update or create a Addendum.
     * @example
     * // Update or create a Addendum
     * const addendum = await prisma.addendum.upsert({
     *   create: {
     *     // ... data to create a Addendum
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Addendum we want to update
     *   }
     * })
     */
    upsert<T extends AddendumUpsertArgs>(args: SelectSubset<T, AddendumUpsertArgs<ExtArgs>>): Prisma__AddendumClient<$Result.GetResult<Prisma.$AddendumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumCountArgs} args - Arguments to filter Addenda to count.
     * @example
     * // Count the number of Addenda
     * const count = await prisma.addendum.count({
     *   where: {
     *     // ... the filter for the Addenda we want to count
     *   }
     * })
    **/
    count<T extends AddendumCountArgs>(
      args?: Subset<T, AddendumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddendumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Addendum.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddendumAggregateArgs>(args: Subset<T, AddendumAggregateArgs>): Prisma.PrismaPromise<GetAddendumAggregateType<T>>

    /**
     * Group by Addendum.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddendumGroupByArgs} args - Group by arguments.
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
      T extends AddendumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddendumGroupByArgs['orderBy'] }
        : { orderBy?: AddendumGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddendumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddendumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Addendum model
   */
  readonly fields: AddendumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Addendum.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddendumClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Addendum model
   */
  interface AddendumFieldRefs {
    readonly id: FieldRef<"Addendum", 'String'>
    readonly createdAt: FieldRef<"Addendum", 'DateTime'>
    readonly updatedAt: FieldRef<"Addendum", 'DateTime'>
    readonly name: FieldRef<"Addendum", 'String'>
    readonly tipe: FieldRef<"Addendum", 'String'>
    readonly tanggal: FieldRef<"Addendum", 'DateTime'>
    readonly hari: FieldRef<"Addendum", 'Int'>
    readonly volume: FieldRef<"Addendum", 'String'>
    readonly satuan: FieldRef<"Addendum", 'String'>
    readonly pemberianKesempatan: FieldRef<"Addendum", 'Boolean'>
    readonly alasan: FieldRef<"Addendum", 'String'>
    readonly contractId: FieldRef<"Addendum", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Addendum findUnique
   */
  export type AddendumFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter, which Addendum to fetch.
     */
    where: AddendumWhereUniqueInput
  }

  /**
   * Addendum findUniqueOrThrow
   */
  export type AddendumFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter, which Addendum to fetch.
     */
    where: AddendumWhereUniqueInput
  }

  /**
   * Addendum findFirst
   */
  export type AddendumFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter, which Addendum to fetch.
     */
    where?: AddendumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addenda to fetch.
     */
    orderBy?: AddendumOrderByWithRelationInput | AddendumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addenda.
     */
    cursor?: AddendumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addenda.
     */
    distinct?: AddendumScalarFieldEnum | AddendumScalarFieldEnum[]
  }

  /**
   * Addendum findFirstOrThrow
   */
  export type AddendumFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter, which Addendum to fetch.
     */
    where?: AddendumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addenda to fetch.
     */
    orderBy?: AddendumOrderByWithRelationInput | AddendumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addenda.
     */
    cursor?: AddendumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addenda.
     */
    distinct?: AddendumScalarFieldEnum | AddendumScalarFieldEnum[]
  }

  /**
   * Addendum findMany
   */
  export type AddendumFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter, which Addenda to fetch.
     */
    where?: AddendumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addenda to fetch.
     */
    orderBy?: AddendumOrderByWithRelationInput | AddendumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addenda.
     */
    cursor?: AddendumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addenda.
     */
    distinct?: AddendumScalarFieldEnum | AddendumScalarFieldEnum[]
  }

  /**
   * Addendum create
   */
  export type AddendumCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * The data needed to create a Addendum.
     */
    data: XOR<AddendumCreateInput, AddendumUncheckedCreateInput>
  }

  /**
   * Addendum createMany
   */
  export type AddendumCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addenda.
     */
    data: AddendumCreateManyInput | AddendumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Addendum createManyAndReturn
   */
  export type AddendumCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * The data used to create many Addenda.
     */
    data: AddendumCreateManyInput | AddendumCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Addendum update
   */
  export type AddendumUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * The data needed to update a Addendum.
     */
    data: XOR<AddendumUpdateInput, AddendumUncheckedUpdateInput>
    /**
     * Choose, which Addendum to update.
     */
    where: AddendumWhereUniqueInput
  }

  /**
   * Addendum updateMany
   */
  export type AddendumUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addenda.
     */
    data: XOR<AddendumUpdateManyMutationInput, AddendumUncheckedUpdateManyInput>
    /**
     * Filter which Addenda to update
     */
    where?: AddendumWhereInput
    /**
     * Limit how many Addenda to update.
     */
    limit?: number
  }

  /**
   * Addendum updateManyAndReturn
   */
  export type AddendumUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * The data used to update Addenda.
     */
    data: XOR<AddendumUpdateManyMutationInput, AddendumUncheckedUpdateManyInput>
    /**
     * Filter which Addenda to update
     */
    where?: AddendumWhereInput
    /**
     * Limit how many Addenda to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Addendum upsert
   */
  export type AddendumUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * The filter to search for the Addendum to update in case it exists.
     */
    where: AddendumWhereUniqueInput
    /**
     * In case the Addendum found by the `where` argument doesn't exist, create a new Addendum with this data.
     */
    create: XOR<AddendumCreateInput, AddendumUncheckedCreateInput>
    /**
     * In case the Addendum was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddendumUpdateInput, AddendumUncheckedUpdateInput>
  }

  /**
   * Addendum delete
   */
  export type AddendumDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
    /**
     * Filter which Addendum to delete.
     */
    where: AddendumWhereUniqueInput
  }

  /**
   * Addendum deleteMany
   */
  export type AddendumDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addenda to delete
     */
    where?: AddendumWhereInput
    /**
     * Limit how many Addenda to delete.
     */
    limit?: number
  }

  /**
   * Addendum without action
   */
  export type AddendumDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Addendum
     */
    select?: AddendumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Addendum
     */
    omit?: AddendumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddendumInclude<ExtArgs> | null
  }


  /**
   * Model ContractAccess
   */

  export type AggregateContractAccess = {
    _count: ContractAccessCountAggregateOutputType | null
    _min: ContractAccessMinAggregateOutputType | null
    _max: ContractAccessMaxAggregateOutputType | null
  }

  export type ContractAccessMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    contractId: string | null
  }

  export type ContractAccessMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    contractId: string | null
  }

  export type ContractAccessCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    contractId: number
    _all: number
  }


  export type ContractAccessMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    contractId?: true
  }

  export type ContractAccessMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    contractId?: true
  }

  export type ContractAccessCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    contractId?: true
    _all?: true
  }

  export type ContractAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractAccess to aggregate.
     */
    where?: ContractAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractAccesses to fetch.
     */
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractAccesses
    **/
    _count?: true | ContractAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractAccessMaxAggregateInputType
  }

  export type GetContractAccessAggregateType<T extends ContractAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateContractAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractAccess[P]>
      : GetScalarType<T[P], AggregateContractAccess[P]>
  }




  export type ContractAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractAccessWhereInput
    orderBy?: ContractAccessOrderByWithAggregationInput | ContractAccessOrderByWithAggregationInput[]
    by: ContractAccessScalarFieldEnum[] | ContractAccessScalarFieldEnum
    having?: ContractAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractAccessCountAggregateInputType | true
    _min?: ContractAccessMinAggregateInputType
    _max?: ContractAccessMaxAggregateInputType
  }

  export type ContractAccessGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    contractId: string
    _count: ContractAccessCountAggregateOutputType | null
    _min: ContractAccessMinAggregateOutputType | null
    _max: ContractAccessMaxAggregateOutputType | null
  }

  type GetContractAccessGroupByPayload<T extends ContractAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractAccessGroupByOutputType[P]>
            : GetScalarType<T[P], ContractAccessGroupByOutputType[P]>
        }
      >
    >


  export type ContractAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    contractId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractAccess"]>

  export type ContractAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    contractId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractAccess"]>

  export type ContractAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    contractId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractAccess"]>

  export type ContractAccessSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    contractId?: boolean
  }

  export type ContractAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId" | "contractId", ExtArgs["result"]["contractAccess"]>
  export type ContractAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type ContractAccessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }
  export type ContractAccessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    contract?: boolean | ContractDefaultArgs<ExtArgs>
  }

  export type $ContractAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractAccess"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      contract: Prisma.$ContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
      contractId: string
    }, ExtArgs["result"]["contractAccess"]>
    composites: {}
  }

  type ContractAccessGetPayload<S extends boolean | null | undefined | ContractAccessDefaultArgs> = $Result.GetResult<Prisma.$ContractAccessPayload, S>

  type ContractAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContractAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContractAccessCountAggregateInputType | true
    }

  export interface ContractAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractAccess'], meta: { name: 'ContractAccess' } }
    /**
     * Find zero or one ContractAccess that matches the filter.
     * @param {ContractAccessFindUniqueArgs} args - Arguments to find a ContractAccess
     * @example
     * // Get one ContractAccess
     * const contractAccess = await prisma.contractAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractAccessFindUniqueArgs>(args: SelectSubset<T, ContractAccessFindUniqueArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ContractAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContractAccessFindUniqueOrThrowArgs} args - Arguments to find a ContractAccess
     * @example
     * // Get one ContractAccess
     * const contractAccess = await prisma.contractAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessFindFirstArgs} args - Arguments to find a ContractAccess
     * @example
     * // Get one ContractAccess
     * const contractAccess = await prisma.contractAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractAccessFindFirstArgs>(args?: SelectSubset<T, ContractAccessFindFirstArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ContractAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessFindFirstOrThrowArgs} args - Arguments to find a ContractAccess
     * @example
     * // Get one ContractAccess
     * const contractAccess = await prisma.contractAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ContractAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractAccesses
     * const contractAccesses = await prisma.contractAccess.findMany()
     * 
     * // Get first 10 ContractAccesses
     * const contractAccesses = await prisma.contractAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractAccessWithIdOnly = await prisma.contractAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractAccessFindManyArgs>(args?: SelectSubset<T, ContractAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ContractAccess.
     * @param {ContractAccessCreateArgs} args - Arguments to create a ContractAccess.
     * @example
     * // Create one ContractAccess
     * const ContractAccess = await prisma.contractAccess.create({
     *   data: {
     *     // ... data to create a ContractAccess
     *   }
     * })
     * 
     */
    create<T extends ContractAccessCreateArgs>(args: SelectSubset<T, ContractAccessCreateArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ContractAccesses.
     * @param {ContractAccessCreateManyArgs} args - Arguments to create many ContractAccesses.
     * @example
     * // Create many ContractAccesses
     * const contractAccess = await prisma.contractAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractAccessCreateManyArgs>(args?: SelectSubset<T, ContractAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractAccesses and returns the data saved in the database.
     * @param {ContractAccessCreateManyAndReturnArgs} args - Arguments to create many ContractAccesses.
     * @example
     * // Create many ContractAccesses
     * const contractAccess = await prisma.contractAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractAccesses and only return the `id`
     * const contractAccessWithIdOnly = await prisma.contractAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ContractAccess.
     * @param {ContractAccessDeleteArgs} args - Arguments to delete one ContractAccess.
     * @example
     * // Delete one ContractAccess
     * const ContractAccess = await prisma.contractAccess.delete({
     *   where: {
     *     // ... filter to delete one ContractAccess
     *   }
     * })
     * 
     */
    delete<T extends ContractAccessDeleteArgs>(args: SelectSubset<T, ContractAccessDeleteArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ContractAccess.
     * @param {ContractAccessUpdateArgs} args - Arguments to update one ContractAccess.
     * @example
     * // Update one ContractAccess
     * const contractAccess = await prisma.contractAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractAccessUpdateArgs>(args: SelectSubset<T, ContractAccessUpdateArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ContractAccesses.
     * @param {ContractAccessDeleteManyArgs} args - Arguments to filter ContractAccesses to delete.
     * @example
     * // Delete a few ContractAccesses
     * const { count } = await prisma.contractAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractAccessDeleteManyArgs>(args?: SelectSubset<T, ContractAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractAccesses
     * const contractAccess = await prisma.contractAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractAccessUpdateManyArgs>(args: SelectSubset<T, ContractAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractAccesses and returns the data updated in the database.
     * @param {ContractAccessUpdateManyAndReturnArgs} args - Arguments to update many ContractAccesses.
     * @example
     * // Update many ContractAccesses
     * const contractAccess = await prisma.contractAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ContractAccesses and only return the `id`
     * const contractAccessWithIdOnly = await prisma.contractAccess.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContractAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, ContractAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ContractAccess.
     * @param {ContractAccessUpsertArgs} args - Arguments to update or create a ContractAccess.
     * @example
     * // Update or create a ContractAccess
     * const contractAccess = await prisma.contractAccess.upsert({
     *   create: {
     *     // ... data to create a ContractAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractAccess we want to update
     *   }
     * })
     */
    upsert<T extends ContractAccessUpsertArgs>(args: SelectSubset<T, ContractAccessUpsertArgs<ExtArgs>>): Prisma__ContractAccessClient<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ContractAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessCountArgs} args - Arguments to filter ContractAccesses to count.
     * @example
     * // Count the number of ContractAccesses
     * const count = await prisma.contractAccess.count({
     *   where: {
     *     // ... the filter for the ContractAccesses we want to count
     *   }
     * })
    **/
    count<T extends ContractAccessCountArgs>(
      args?: Subset<T, ContractAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractAccessAggregateArgs>(args: Subset<T, ContractAccessAggregateArgs>): Prisma.PrismaPromise<GetContractAccessAggregateType<T>>

    /**
     * Group by ContractAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractAccessGroupByArgs} args - Group by arguments.
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
      T extends ContractAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractAccessGroupByArgs['orderBy'] }
        : { orderBy?: ContractAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractAccess model
   */
  readonly fields: ContractAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    contract<T extends ContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractDefaultArgs<ExtArgs>>): Prisma__ContractClient<$Result.GetResult<Prisma.$ContractPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ContractAccess model
   */
  interface ContractAccessFieldRefs {
    readonly id: FieldRef<"ContractAccess", 'String'>
    readonly createdAt: FieldRef<"ContractAccess", 'DateTime'>
    readonly updatedAt: FieldRef<"ContractAccess", 'DateTime'>
    readonly userId: FieldRef<"ContractAccess", 'String'>
    readonly contractId: FieldRef<"ContractAccess", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ContractAccess findUnique
   */
  export type ContractAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter, which ContractAccess to fetch.
     */
    where: ContractAccessWhereUniqueInput
  }

  /**
   * ContractAccess findUniqueOrThrow
   */
  export type ContractAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter, which ContractAccess to fetch.
     */
    where: ContractAccessWhereUniqueInput
  }

  /**
   * ContractAccess findFirst
   */
  export type ContractAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter, which ContractAccess to fetch.
     */
    where?: ContractAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractAccesses to fetch.
     */
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractAccesses.
     */
    cursor?: ContractAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractAccesses.
     */
    distinct?: ContractAccessScalarFieldEnum | ContractAccessScalarFieldEnum[]
  }

  /**
   * ContractAccess findFirstOrThrow
   */
  export type ContractAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter, which ContractAccess to fetch.
     */
    where?: ContractAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractAccesses to fetch.
     */
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractAccesses.
     */
    cursor?: ContractAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractAccesses.
     */
    distinct?: ContractAccessScalarFieldEnum | ContractAccessScalarFieldEnum[]
  }

  /**
   * ContractAccess findMany
   */
  export type ContractAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter, which ContractAccesses to fetch.
     */
    where?: ContractAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractAccesses to fetch.
     */
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractAccesses.
     */
    cursor?: ContractAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractAccesses.
     */
    distinct?: ContractAccessScalarFieldEnum | ContractAccessScalarFieldEnum[]
  }

  /**
   * ContractAccess create
   */
  export type ContractAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a ContractAccess.
     */
    data: XOR<ContractAccessCreateInput, ContractAccessUncheckedCreateInput>
  }

  /**
   * ContractAccess createMany
   */
  export type ContractAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractAccesses.
     */
    data: ContractAccessCreateManyInput | ContractAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractAccess createManyAndReturn
   */
  export type ContractAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * The data used to create many ContractAccesses.
     */
    data: ContractAccessCreateManyInput | ContractAccessCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractAccess update
   */
  export type ContractAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a ContractAccess.
     */
    data: XOR<ContractAccessUpdateInput, ContractAccessUncheckedUpdateInput>
    /**
     * Choose, which ContractAccess to update.
     */
    where: ContractAccessWhereUniqueInput
  }

  /**
   * ContractAccess updateMany
   */
  export type ContractAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractAccesses.
     */
    data: XOR<ContractAccessUpdateManyMutationInput, ContractAccessUncheckedUpdateManyInput>
    /**
     * Filter which ContractAccesses to update
     */
    where?: ContractAccessWhereInput
    /**
     * Limit how many ContractAccesses to update.
     */
    limit?: number
  }

  /**
   * ContractAccess updateManyAndReturn
   */
  export type ContractAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * The data used to update ContractAccesses.
     */
    data: XOR<ContractAccessUpdateManyMutationInput, ContractAccessUncheckedUpdateManyInput>
    /**
     * Filter which ContractAccesses to update
     */
    where?: ContractAccessWhereInput
    /**
     * Limit how many ContractAccesses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractAccess upsert
   */
  export type ContractAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the ContractAccess to update in case it exists.
     */
    where: ContractAccessWhereUniqueInput
    /**
     * In case the ContractAccess found by the `where` argument doesn't exist, create a new ContractAccess with this data.
     */
    create: XOR<ContractAccessCreateInput, ContractAccessUncheckedCreateInput>
    /**
     * In case the ContractAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractAccessUpdateInput, ContractAccessUncheckedUpdateInput>
  }

  /**
   * ContractAccess delete
   */
  export type ContractAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    /**
     * Filter which ContractAccess to delete.
     */
    where: ContractAccessWhereUniqueInput
  }

  /**
   * ContractAccess deleteMany
   */
  export type ContractAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractAccesses to delete
     */
    where?: ContractAccessWhereInput
    /**
     * Limit how many ContractAccesses to delete.
     */
    limit?: number
  }

  /**
   * ContractAccess without action
   */
  export type ContractAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    lastLoggedIn: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    lastLoggedIn: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    role: number
    banned: number
    banReason: number
    banExpires: number
    lastLoggedIn: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
    lastLoggedIn?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
    lastLoggedIn?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    role?: true
    banned?: true
    banReason?: true
    banExpires?: true
    lastLoggedIn?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    lastLoggedIn: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    lastLoggedIn?: boolean
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
    contractAccess?: boolean | User$contractAccessArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    lastLoggedIn?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    lastLoggedIn?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean
    banned?: boolean
    banReason?: boolean
    banExpires?: boolean
    lastLoggedIn?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "role" | "banned" | "banReason" | "banExpires" | "lastLoggedIn", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
    contractAccess?: boolean | User$contractAccessArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      passwordReset: Prisma.$PasswordResetPayload<ExtArgs>[]
      contractAccess: Prisma.$ContractAccessPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      role: string | null
      banned: boolean | null
      banReason: string | null
      banExpires: Date | null
      lastLoggedIn: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    passwordReset<T extends User$passwordResetArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contractAccess<T extends User$contractAccessArgs<ExtArgs> = {}>(args?: Subset<T, User$contractAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'String'>
    readonly banned: FieldRef<"User", 'Boolean'>
    readonly banReason: FieldRef<"User", 'String'>
    readonly banExpires: FieldRef<"User", 'DateTime'>
    readonly lastLoggedIn: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.passwordReset
   */
  export type User$passwordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    cursor?: PasswordResetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * User.contractAccess
   */
  export type User$contractAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractAccess
     */
    select?: ContractAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ContractAccess
     */
    omit?: ContractAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractAccessInclude<ExtArgs> | null
    where?: ContractAccessWhereInput
    orderBy?: ContractAccessOrderByWithRelationInput | ContractAccessOrderByWithRelationInput[]
    cursor?: ContractAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractAccessScalarFieldEnum | ContractAccessScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    token: number
    expiresAt: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    token?: true
    expiresAt?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    token?: true
    expiresAt?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    token?: true
    expiresAt?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    token: string
    expiresAt: Date
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>

  export type PasswordResetSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "token" | "expiresAt", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      token: string
      expiresAt: Date
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResets and returns the data saved in the database.
     * @param {PasswordResetCreateManyAndReturnArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets and returns the data updated in the database.
     * @param {PasswordResetUpdateManyAndReturnArgs} args - Arguments to update many PasswordResets.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResets and only return the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordResetUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly createdAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly userId: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly expiresAt: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset createManyAndReturn
   */
  export type PasswordResetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset updateManyAndReturn
   */
  export type PasswordResetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    budgetYear: number | null
  }

  export type SessionSumAggregateOutputType = {
    budgetYear: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    budgetYear: number | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    budgetYear: number | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    budgetYear: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    budgetYear?: true
  }

  export type SessionSumAggregateInputType = {
    budgetYear?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    budgetYear?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    budgetYear?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    budgetYear?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    budgetYear: number | null
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    budgetYear?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    budgetYear?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    budgetYear?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    budgetYear?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId" | "budgetYear", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
      budgetYear: number | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly budgetYear: FieldRef<"Session", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
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
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
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


  export const ContractScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    namaPaket: 'namaPaket',
    namaPenyedia: 'namaPenyedia',
    ppk: 'ppk',
    nipPPK: 'nipPPK',
    korwaslap: 'korwaslap',
    nipKorwaslap: 'nipKorwaslap',
    pengawasLapangan: 'pengawasLapangan',
    nipPengawasLapangan: 'nipPengawasLapangan',
    paguAnggaran: 'paguAnggaran',
    nilaiKontrak: 'nilaiKontrak',
    sumberDana: 'sumberDana',
    nomorKontrak: 'nomorKontrak',
    tanggalKontrak: 'tanggalKontrak',
    masaPelaksanaan: 'masaPelaksanaan',
    tanggalSelesaiAwal: 'tanggalSelesaiAwal',
    tanggalSelesaiAkhir: 'tanggalSelesaiAkhir',
    totalAddendumWaktu: 'totalAddendumWaktu',
    volumeKontrak: 'volumeKontrak',
    satuanKontrak: 'satuanKontrak',
    subKegiatan: 'subKegiatan',
    konsultanSupervisi: 'konsultanSupervisi',
    nomorKontrakSupervisi: 'nomorKontrakSupervisi',
    nilaiKontrakSupervisi: 'nilaiKontrakSupervisi',
    tanggalKontrakSupervisi: 'tanggalKontrakSupervisi',
    masaPelaksanaanSupervisi: 'masaPelaksanaanSupervisi',
    hasilProdukAkhir: 'hasilProdukAkhir',
    dimensi: 'dimensi',
    dokumentasiAwal: 'dokumentasiAwal',
    dokumentasiTengah: 'dokumentasiTengah',
    dokumentasiAkhir: 'dokumentasiAkhir',
    dokumenPendukung: 'dokumenPendukung',
    hasAddendum: 'hasAddendum'
  };

  export type ContractScalarFieldEnum = (typeof ContractScalarFieldEnum)[keyof typeof ContractScalarFieldEnum]


  export const PhysicalProgressScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    contractId: 'contractId',
    month: 'month',
    week: 'week',
    startDate: 'startDate',
    endDate: 'endDate',
    rencana: 'rencana',
    realisasi: 'realisasi',
    deviasi: 'deviasi',
    bermasalah: 'bermasalah',
    deskripsiMasalah: 'deskripsiMasalah',
    keterangan: 'keterangan'
  };

  export type PhysicalProgressScalarFieldEnum = (typeof PhysicalProgressScalarFieldEnum)[keyof typeof PhysicalProgressScalarFieldEnum]


  export const FinancialProgressScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    totalProgress: 'totalProgress',
    totalPayment: 'totalPayment',
    uangMuka: 'uangMuka',
    termin1: 'termin1',
    termin2: 'termin2',
    termin3: 'termin3',
    termin4: 'termin4',
    contractId: 'contractId'
  };

  export type FinancialProgressScalarFieldEnum = (typeof FinancialProgressScalarFieldEnum)[keyof typeof FinancialProgressScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    kota: 'kota',
    distrik: 'distrik',
    kampung: 'kampung',
    koordinatAwal: 'koordinatAwal',
    koordinatAkhir: 'koordinatAkhir',
    contractId: 'contractId'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const AddendumScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    tipe: 'tipe',
    tanggal: 'tanggal',
    hari: 'hari',
    volume: 'volume',
    satuan: 'satuan',
    pemberianKesempatan: 'pemberianKesempatan',
    alasan: 'alasan',
    contractId: 'contractId'
  };

  export type AddendumScalarFieldEnum = (typeof AddendumScalarFieldEnum)[keyof typeof AddendumScalarFieldEnum]


  export const ContractAccessScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    contractId: 'contractId'
  };

  export type ContractAccessScalarFieldEnum = (typeof ContractAccessScalarFieldEnum)[keyof typeof ContractAccessScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    role: 'role',
    banned: 'banned',
    banReason: 'banReason',
    banExpires: 'banExpires',
    lastLoggedIn: 'lastLoggedIn'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    budgetYear: 'budgetYear'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type ContractWhereInput = {
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    id?: StringFilter<"Contract"> | string
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    namaPaket?: StringFilter<"Contract"> | string
    namaPenyedia?: StringNullableFilter<"Contract"> | string | null
    ppk?: StringNullableFilter<"Contract"> | string | null
    nipPPK?: StringNullableFilter<"Contract"> | string | null
    korwaslap?: StringNullableFilter<"Contract"> | string | null
    nipKorwaslap?: StringNullableFilter<"Contract"> | string | null
    pengawasLapangan?: StringNullableFilter<"Contract"> | string | null
    nipPengawasLapangan?: StringNullableFilter<"Contract"> | string | null
    paguAnggaran?: FloatNullableFilter<"Contract"> | number | null
    nilaiKontrak?: FloatNullableFilter<"Contract"> | number | null
    sumberDana?: StringNullableFilter<"Contract"> | string | null
    nomorKontrak?: StringNullableFilter<"Contract"> | string | null
    tanggalKontrak?: DateTimeNullableFilter<"Contract"> | Date | string | null
    masaPelaksanaan?: IntNullableFilter<"Contract"> | number | null
    tanggalSelesaiAwal?: DateTimeNullableFilter<"Contract"> | Date | string | null
    tanggalSelesaiAkhir?: DateTimeNullableFilter<"Contract"> | Date | string | null
    totalAddendumWaktu?: IntNullableFilter<"Contract"> | number | null
    volumeKontrak?: StringNullableFilter<"Contract"> | string | null
    satuanKontrak?: StringNullableFilter<"Contract"> | string | null
    subKegiatan?: StringNullableFilter<"Contract"> | string | null
    konsultanSupervisi?: StringNullableFilter<"Contract"> | string | null
    nomorKontrakSupervisi?: StringNullableFilter<"Contract"> | string | null
    nilaiKontrakSupervisi?: FloatNullableFilter<"Contract"> | number | null
    tanggalKontrakSupervisi?: DateTimeNullableFilter<"Contract"> | Date | string | null
    masaPelaksanaanSupervisi?: IntNullableFilter<"Contract"> | number | null
    hasilProdukAkhir?: StringNullableFilter<"Contract"> | string | null
    dimensi?: StringNullableFilter<"Contract"> | string | null
    dokumentasiAwal?: StringNullableFilter<"Contract"> | string | null
    dokumentasiTengah?: StringNullableFilter<"Contract"> | string | null
    dokumentasiAkhir?: StringNullableFilter<"Contract"> | string | null
    dokumenPendukung?: StringNullableFilter<"Contract"> | string | null
    hasAddendum?: BoolNullableFilter<"Contract"> | boolean | null
    addendum?: AddendumListRelationFilter
    financialProgress?: XOR<FinancialProgressNullableScalarRelationFilter, FinancialProgressWhereInput> | null
    physicalProgress?: PhysicalProgressListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    contractAccess?: ContractAccessListRelationFilter
  }

  export type ContractOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    namaPaket?: SortOrder
    namaPenyedia?: SortOrderInput | SortOrder
    ppk?: SortOrderInput | SortOrder
    nipPPK?: SortOrderInput | SortOrder
    korwaslap?: SortOrderInput | SortOrder
    nipKorwaslap?: SortOrderInput | SortOrder
    pengawasLapangan?: SortOrderInput | SortOrder
    nipPengawasLapangan?: SortOrderInput | SortOrder
    paguAnggaran?: SortOrderInput | SortOrder
    nilaiKontrak?: SortOrderInput | SortOrder
    sumberDana?: SortOrderInput | SortOrder
    nomorKontrak?: SortOrderInput | SortOrder
    tanggalKontrak?: SortOrderInput | SortOrder
    masaPelaksanaan?: SortOrderInput | SortOrder
    tanggalSelesaiAwal?: SortOrderInput | SortOrder
    tanggalSelesaiAkhir?: SortOrderInput | SortOrder
    totalAddendumWaktu?: SortOrderInput | SortOrder
    volumeKontrak?: SortOrderInput | SortOrder
    satuanKontrak?: SortOrderInput | SortOrder
    subKegiatan?: SortOrderInput | SortOrder
    konsultanSupervisi?: SortOrderInput | SortOrder
    nomorKontrakSupervisi?: SortOrderInput | SortOrder
    nilaiKontrakSupervisi?: SortOrderInput | SortOrder
    tanggalKontrakSupervisi?: SortOrderInput | SortOrder
    masaPelaksanaanSupervisi?: SortOrderInput | SortOrder
    hasilProdukAkhir?: SortOrderInput | SortOrder
    dimensi?: SortOrderInput | SortOrder
    dokumentasiAwal?: SortOrderInput | SortOrder
    dokumentasiTengah?: SortOrderInput | SortOrder
    dokumentasiAkhir?: SortOrderInput | SortOrder
    dokumenPendukung?: SortOrderInput | SortOrder
    hasAddendum?: SortOrderInput | SortOrder
    addendum?: AddendumOrderByRelationAggregateInput
    financialProgress?: FinancialProgressOrderByWithRelationInput
    physicalProgress?: PhysicalProgressOrderByRelationAggregateInput
    location?: LocationOrderByWithRelationInput
    contractAccess?: ContractAccessOrderByRelationAggregateInput
  }

  export type ContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractWhereInput | ContractWhereInput[]
    OR?: ContractWhereInput[]
    NOT?: ContractWhereInput | ContractWhereInput[]
    createdAt?: DateTimeFilter<"Contract"> | Date | string
    updatedAt?: DateTimeFilter<"Contract"> | Date | string
    namaPaket?: StringFilter<"Contract"> | string
    namaPenyedia?: StringNullableFilter<"Contract"> | string | null
    ppk?: StringNullableFilter<"Contract"> | string | null
    nipPPK?: StringNullableFilter<"Contract"> | string | null
    korwaslap?: StringNullableFilter<"Contract"> | string | null
    nipKorwaslap?: StringNullableFilter<"Contract"> | string | null
    pengawasLapangan?: StringNullableFilter<"Contract"> | string | null
    nipPengawasLapangan?: StringNullableFilter<"Contract"> | string | null
    paguAnggaran?: FloatNullableFilter<"Contract"> | number | null
    nilaiKontrak?: FloatNullableFilter<"Contract"> | number | null
    sumberDana?: StringNullableFilter<"Contract"> | string | null
    nomorKontrak?: StringNullableFilter<"Contract"> | string | null
    tanggalKontrak?: DateTimeNullableFilter<"Contract"> | Date | string | null
    masaPelaksanaan?: IntNullableFilter<"Contract"> | number | null
    tanggalSelesaiAwal?: DateTimeNullableFilter<"Contract"> | Date | string | null
    tanggalSelesaiAkhir?: DateTimeNullableFilter<"Contract"> | Date | string | null
    totalAddendumWaktu?: IntNullableFilter<"Contract"> | number | null
    volumeKontrak?: StringNullableFilter<"Contract"> | string | null
    satuanKontrak?: StringNullableFilter<"Contract"> | string | null
    subKegiatan?: StringNullableFilter<"Contract"> | string | null
    konsultanSupervisi?: StringNullableFilter<"Contract"> | string | null
    nomorKontrakSupervisi?: StringNullableFilter<"Contract"> | string | null
    nilaiKontrakSupervisi?: FloatNullableFilter<"Contract"> | number | null
    tanggalKontrakSupervisi?: DateTimeNullableFilter<"Contract"> | Date | string | null
    masaPelaksanaanSupervisi?: IntNullableFilter<"Contract"> | number | null
    hasilProdukAkhir?: StringNullableFilter<"Contract"> | string | null
    dimensi?: StringNullableFilter<"Contract"> | string | null
    dokumentasiAwal?: StringNullableFilter<"Contract"> | string | null
    dokumentasiTengah?: StringNullableFilter<"Contract"> | string | null
    dokumentasiAkhir?: StringNullableFilter<"Contract"> | string | null
    dokumenPendukung?: StringNullableFilter<"Contract"> | string | null
    hasAddendum?: BoolNullableFilter<"Contract"> | boolean | null
    addendum?: AddendumListRelationFilter
    financialProgress?: XOR<FinancialProgressNullableScalarRelationFilter, FinancialProgressWhereInput> | null
    physicalProgress?: PhysicalProgressListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    contractAccess?: ContractAccessListRelationFilter
  }, "id">

  export type ContractOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    namaPaket?: SortOrder
    namaPenyedia?: SortOrderInput | SortOrder
    ppk?: SortOrderInput | SortOrder
    nipPPK?: SortOrderInput | SortOrder
    korwaslap?: SortOrderInput | SortOrder
    nipKorwaslap?: SortOrderInput | SortOrder
    pengawasLapangan?: SortOrderInput | SortOrder
    nipPengawasLapangan?: SortOrderInput | SortOrder
    paguAnggaran?: SortOrderInput | SortOrder
    nilaiKontrak?: SortOrderInput | SortOrder
    sumberDana?: SortOrderInput | SortOrder
    nomorKontrak?: SortOrderInput | SortOrder
    tanggalKontrak?: SortOrderInput | SortOrder
    masaPelaksanaan?: SortOrderInput | SortOrder
    tanggalSelesaiAwal?: SortOrderInput | SortOrder
    tanggalSelesaiAkhir?: SortOrderInput | SortOrder
    totalAddendumWaktu?: SortOrderInput | SortOrder
    volumeKontrak?: SortOrderInput | SortOrder
    satuanKontrak?: SortOrderInput | SortOrder
    subKegiatan?: SortOrderInput | SortOrder
    konsultanSupervisi?: SortOrderInput | SortOrder
    nomorKontrakSupervisi?: SortOrderInput | SortOrder
    nilaiKontrakSupervisi?: SortOrderInput | SortOrder
    tanggalKontrakSupervisi?: SortOrderInput | SortOrder
    masaPelaksanaanSupervisi?: SortOrderInput | SortOrder
    hasilProdukAkhir?: SortOrderInput | SortOrder
    dimensi?: SortOrderInput | SortOrder
    dokumentasiAwal?: SortOrderInput | SortOrder
    dokumentasiTengah?: SortOrderInput | SortOrder
    dokumentasiAkhir?: SortOrderInput | SortOrder
    dokumenPendukung?: SortOrderInput | SortOrder
    hasAddendum?: SortOrderInput | SortOrder
    _count?: ContractCountOrderByAggregateInput
    _avg?: ContractAvgOrderByAggregateInput
    _max?: ContractMaxOrderByAggregateInput
    _min?: ContractMinOrderByAggregateInput
    _sum?: ContractSumOrderByAggregateInput
  }

  export type ContractScalarWhereWithAggregatesInput = {
    AND?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    OR?: ContractScalarWhereWithAggregatesInput[]
    NOT?: ContractScalarWhereWithAggregatesInput | ContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contract"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contract"> | Date | string
    namaPaket?: StringWithAggregatesFilter<"Contract"> | string
    namaPenyedia?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    ppk?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nipPPK?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    korwaslap?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nipKorwaslap?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    pengawasLapangan?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nipPengawasLapangan?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    paguAnggaran?: FloatNullableWithAggregatesFilter<"Contract"> | number | null
    nilaiKontrak?: FloatNullableWithAggregatesFilter<"Contract"> | number | null
    sumberDana?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nomorKontrak?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    tanggalKontrak?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    masaPelaksanaan?: IntNullableWithAggregatesFilter<"Contract"> | number | null
    tanggalSelesaiAwal?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    tanggalSelesaiAkhir?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    totalAddendumWaktu?: IntNullableWithAggregatesFilter<"Contract"> | number | null
    volumeKontrak?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    satuanKontrak?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    subKegiatan?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    konsultanSupervisi?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nomorKontrakSupervisi?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    nilaiKontrakSupervisi?: FloatNullableWithAggregatesFilter<"Contract"> | number | null
    tanggalKontrakSupervisi?: DateTimeNullableWithAggregatesFilter<"Contract"> | Date | string | null
    masaPelaksanaanSupervisi?: IntNullableWithAggregatesFilter<"Contract"> | number | null
    hasilProdukAkhir?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    dimensi?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    dokumentasiAwal?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    dokumentasiTengah?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    dokumentasiAkhir?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    dokumenPendukung?: StringNullableWithAggregatesFilter<"Contract"> | string | null
    hasAddendum?: BoolNullableWithAggregatesFilter<"Contract"> | boolean | null
  }

  export type PhysicalProgressWhereInput = {
    AND?: PhysicalProgressWhereInput | PhysicalProgressWhereInput[]
    OR?: PhysicalProgressWhereInput[]
    NOT?: PhysicalProgressWhereInput | PhysicalProgressWhereInput[]
    id?: StringFilter<"PhysicalProgress"> | string
    createdAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    updatedAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    contractId?: StringFilter<"PhysicalProgress"> | string
    month?: StringFilter<"PhysicalProgress"> | string
    week?: IntFilter<"PhysicalProgress"> | number
    startDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    endDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    rencana?: FloatFilter<"PhysicalProgress"> | number
    realisasi?: FloatFilter<"PhysicalProgress"> | number
    deviasi?: FloatFilter<"PhysicalProgress"> | number
    bermasalah?: BoolFilter<"PhysicalProgress"> | boolean
    deskripsiMasalah?: StringNullableFilter<"PhysicalProgress"> | string | null
    keterangan?: StringNullableFilter<"PhysicalProgress"> | string | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type PhysicalProgressOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractId?: SortOrder
    month?: SortOrder
    week?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
    bermasalah?: SortOrder
    deskripsiMasalah?: SortOrderInput | SortOrder
    keterangan?: SortOrderInput | SortOrder
    contract?: ContractOrderByWithRelationInput
  }

  export type PhysicalProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractId_month_week?: PhysicalProgressContractIdMonthWeekCompoundUniqueInput
    AND?: PhysicalProgressWhereInput | PhysicalProgressWhereInput[]
    OR?: PhysicalProgressWhereInput[]
    NOT?: PhysicalProgressWhereInput | PhysicalProgressWhereInput[]
    createdAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    updatedAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    contractId?: StringFilter<"PhysicalProgress"> | string
    month?: StringFilter<"PhysicalProgress"> | string
    week?: IntFilter<"PhysicalProgress"> | number
    startDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    endDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    rencana?: FloatFilter<"PhysicalProgress"> | number
    realisasi?: FloatFilter<"PhysicalProgress"> | number
    deviasi?: FloatFilter<"PhysicalProgress"> | number
    bermasalah?: BoolFilter<"PhysicalProgress"> | boolean
    deskripsiMasalah?: StringNullableFilter<"PhysicalProgress"> | string | null
    keterangan?: StringNullableFilter<"PhysicalProgress"> | string | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id" | "contractId_month_week">

  export type PhysicalProgressOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractId?: SortOrder
    month?: SortOrder
    week?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
    bermasalah?: SortOrder
    deskripsiMasalah?: SortOrderInput | SortOrder
    keterangan?: SortOrderInput | SortOrder
    _count?: PhysicalProgressCountOrderByAggregateInput
    _avg?: PhysicalProgressAvgOrderByAggregateInput
    _max?: PhysicalProgressMaxOrderByAggregateInput
    _min?: PhysicalProgressMinOrderByAggregateInput
    _sum?: PhysicalProgressSumOrderByAggregateInput
  }

  export type PhysicalProgressScalarWhereWithAggregatesInput = {
    AND?: PhysicalProgressScalarWhereWithAggregatesInput | PhysicalProgressScalarWhereWithAggregatesInput[]
    OR?: PhysicalProgressScalarWhereWithAggregatesInput[]
    NOT?: PhysicalProgressScalarWhereWithAggregatesInput | PhysicalProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PhysicalProgress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PhysicalProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PhysicalProgress"> | Date | string
    contractId?: StringWithAggregatesFilter<"PhysicalProgress"> | string
    month?: StringWithAggregatesFilter<"PhysicalProgress"> | string
    week?: IntWithAggregatesFilter<"PhysicalProgress"> | number
    startDate?: DateTimeNullableWithAggregatesFilter<"PhysicalProgress"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"PhysicalProgress"> | Date | string | null
    rencana?: FloatWithAggregatesFilter<"PhysicalProgress"> | number
    realisasi?: FloatWithAggregatesFilter<"PhysicalProgress"> | number
    deviasi?: FloatWithAggregatesFilter<"PhysicalProgress"> | number
    bermasalah?: BoolWithAggregatesFilter<"PhysicalProgress"> | boolean
    deskripsiMasalah?: StringNullableWithAggregatesFilter<"PhysicalProgress"> | string | null
    keterangan?: StringNullableWithAggregatesFilter<"PhysicalProgress"> | string | null
  }

  export type FinancialProgressWhereInput = {
    AND?: FinancialProgressWhereInput | FinancialProgressWhereInput[]
    OR?: FinancialProgressWhereInput[]
    NOT?: FinancialProgressWhereInput | FinancialProgressWhereInput[]
    id?: StringFilter<"FinancialProgress"> | string
    createdAt?: DateTimeFilter<"FinancialProgress"> | Date | string
    updatedAt?: DateTimeFilter<"FinancialProgress"> | Date | string
    totalProgress?: FloatNullableFilter<"FinancialProgress"> | number | null
    totalPayment?: FloatNullableFilter<"FinancialProgress"> | number | null
    uangMuka?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin1?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin2?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin3?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin4?: FloatNullableFilter<"FinancialProgress"> | number | null
    contractId?: StringFilter<"FinancialProgress"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type FinancialProgressOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalProgress?: SortOrderInput | SortOrder
    totalPayment?: SortOrderInput | SortOrder
    uangMuka?: SortOrderInput | SortOrder
    termin1?: SortOrderInput | SortOrder
    termin2?: SortOrderInput | SortOrder
    termin3?: SortOrderInput | SortOrder
    termin4?: SortOrderInput | SortOrder
    contractId?: SortOrder
    contract?: ContractOrderByWithRelationInput
  }

  export type FinancialProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractId?: string
    AND?: FinancialProgressWhereInput | FinancialProgressWhereInput[]
    OR?: FinancialProgressWhereInput[]
    NOT?: FinancialProgressWhereInput | FinancialProgressWhereInput[]
    createdAt?: DateTimeFilter<"FinancialProgress"> | Date | string
    updatedAt?: DateTimeFilter<"FinancialProgress"> | Date | string
    totalProgress?: FloatNullableFilter<"FinancialProgress"> | number | null
    totalPayment?: FloatNullableFilter<"FinancialProgress"> | number | null
    uangMuka?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin1?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin2?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin3?: FloatNullableFilter<"FinancialProgress"> | number | null
    termin4?: FloatNullableFilter<"FinancialProgress"> | number | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id" | "contractId">

  export type FinancialProgressOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalProgress?: SortOrderInput | SortOrder
    totalPayment?: SortOrderInput | SortOrder
    uangMuka?: SortOrderInput | SortOrder
    termin1?: SortOrderInput | SortOrder
    termin2?: SortOrderInput | SortOrder
    termin3?: SortOrderInput | SortOrder
    termin4?: SortOrderInput | SortOrder
    contractId?: SortOrder
    _count?: FinancialProgressCountOrderByAggregateInput
    _avg?: FinancialProgressAvgOrderByAggregateInput
    _max?: FinancialProgressMaxOrderByAggregateInput
    _min?: FinancialProgressMinOrderByAggregateInput
    _sum?: FinancialProgressSumOrderByAggregateInput
  }

  export type FinancialProgressScalarWhereWithAggregatesInput = {
    AND?: FinancialProgressScalarWhereWithAggregatesInput | FinancialProgressScalarWhereWithAggregatesInput[]
    OR?: FinancialProgressScalarWhereWithAggregatesInput[]
    NOT?: FinancialProgressScalarWhereWithAggregatesInput | FinancialProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FinancialProgress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FinancialProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FinancialProgress"> | Date | string
    totalProgress?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    totalPayment?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    uangMuka?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    termin1?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    termin2?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    termin3?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    termin4?: FloatNullableWithAggregatesFilter<"FinancialProgress"> | number | null
    contractId?: StringWithAggregatesFilter<"FinancialProgress"> | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    kota?: StringNullableFilter<"Location"> | string | null
    distrik?: StringNullableFilter<"Location"> | string | null
    kampung?: StringNullableFilter<"Location"> | string | null
    koordinatAwal?: StringNullableFilter<"Location"> | string | null
    koordinatAkhir?: StringNullableFilter<"Location"> | string | null
    contractId?: StringFilter<"Location"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kota?: SortOrderInput | SortOrder
    distrik?: SortOrderInput | SortOrder
    kampung?: SortOrderInput | SortOrder
    koordinatAwal?: SortOrderInput | SortOrder
    koordinatAkhir?: SortOrderInput | SortOrder
    contractId?: SortOrder
    contract?: ContractOrderByWithRelationInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractId?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    kota?: StringNullableFilter<"Location"> | string | null
    distrik?: StringNullableFilter<"Location"> | string | null
    kampung?: StringNullableFilter<"Location"> | string | null
    koordinatAwal?: StringNullableFilter<"Location"> | string | null
    koordinatAkhir?: StringNullableFilter<"Location"> | string | null
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id" | "contractId">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kota?: SortOrderInput | SortOrder
    distrik?: SortOrderInput | SortOrder
    kampung?: SortOrderInput | SortOrder
    koordinatAwal?: SortOrderInput | SortOrder
    koordinatAkhir?: SortOrderInput | SortOrder
    contractId?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    kota?: StringNullableWithAggregatesFilter<"Location"> | string | null
    distrik?: StringNullableWithAggregatesFilter<"Location"> | string | null
    kampung?: StringNullableWithAggregatesFilter<"Location"> | string | null
    koordinatAwal?: StringNullableWithAggregatesFilter<"Location"> | string | null
    koordinatAkhir?: StringNullableWithAggregatesFilter<"Location"> | string | null
    contractId?: StringWithAggregatesFilter<"Location"> | string
  }

  export type AddendumWhereInput = {
    AND?: AddendumWhereInput | AddendumWhereInput[]
    OR?: AddendumWhereInput[]
    NOT?: AddendumWhereInput | AddendumWhereInput[]
    id?: StringFilter<"Addendum"> | string
    createdAt?: DateTimeFilter<"Addendum"> | Date | string
    updatedAt?: DateTimeFilter<"Addendum"> | Date | string
    name?: StringNullableFilter<"Addendum"> | string | null
    tipe?: StringNullableFilter<"Addendum"> | string | null
    tanggal?: DateTimeNullableFilter<"Addendum"> | Date | string | null
    hari?: IntNullableFilter<"Addendum"> | number | null
    volume?: StringNullableFilter<"Addendum"> | string | null
    satuan?: StringNullableFilter<"Addendum"> | string | null
    pemberianKesempatan?: BoolFilter<"Addendum"> | boolean
    alasan?: StringNullableFilter<"Addendum"> | string | null
    contractId?: StringFilter<"Addendum"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type AddendumOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    tipe?: SortOrderInput | SortOrder
    tanggal?: SortOrderInput | SortOrder
    hari?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    satuan?: SortOrderInput | SortOrder
    pemberianKesempatan?: SortOrder
    alasan?: SortOrderInput | SortOrder
    contractId?: SortOrder
    contract?: ContractOrderByWithRelationInput
  }

  export type AddendumWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddendumWhereInput | AddendumWhereInput[]
    OR?: AddendumWhereInput[]
    NOT?: AddendumWhereInput | AddendumWhereInput[]
    createdAt?: DateTimeFilter<"Addendum"> | Date | string
    updatedAt?: DateTimeFilter<"Addendum"> | Date | string
    name?: StringNullableFilter<"Addendum"> | string | null
    tipe?: StringNullableFilter<"Addendum"> | string | null
    tanggal?: DateTimeNullableFilter<"Addendum"> | Date | string | null
    hari?: IntNullableFilter<"Addendum"> | number | null
    volume?: StringNullableFilter<"Addendum"> | string | null
    satuan?: StringNullableFilter<"Addendum"> | string | null
    pemberianKesempatan?: BoolFilter<"Addendum"> | boolean
    alasan?: StringNullableFilter<"Addendum"> | string | null
    contractId?: StringFilter<"Addendum"> | string
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id">

  export type AddendumOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrderInput | SortOrder
    tipe?: SortOrderInput | SortOrder
    tanggal?: SortOrderInput | SortOrder
    hari?: SortOrderInput | SortOrder
    volume?: SortOrderInput | SortOrder
    satuan?: SortOrderInput | SortOrder
    pemberianKesempatan?: SortOrder
    alasan?: SortOrderInput | SortOrder
    contractId?: SortOrder
    _count?: AddendumCountOrderByAggregateInput
    _avg?: AddendumAvgOrderByAggregateInput
    _max?: AddendumMaxOrderByAggregateInput
    _min?: AddendumMinOrderByAggregateInput
    _sum?: AddendumSumOrderByAggregateInput
  }

  export type AddendumScalarWhereWithAggregatesInput = {
    AND?: AddendumScalarWhereWithAggregatesInput | AddendumScalarWhereWithAggregatesInput[]
    OR?: AddendumScalarWhereWithAggregatesInput[]
    NOT?: AddendumScalarWhereWithAggregatesInput | AddendumScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Addendum"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Addendum"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Addendum"> | Date | string
    name?: StringNullableWithAggregatesFilter<"Addendum"> | string | null
    tipe?: StringNullableWithAggregatesFilter<"Addendum"> | string | null
    tanggal?: DateTimeNullableWithAggregatesFilter<"Addendum"> | Date | string | null
    hari?: IntNullableWithAggregatesFilter<"Addendum"> | number | null
    volume?: StringNullableWithAggregatesFilter<"Addendum"> | string | null
    satuan?: StringNullableWithAggregatesFilter<"Addendum"> | string | null
    pemberianKesempatan?: BoolWithAggregatesFilter<"Addendum"> | boolean
    alasan?: StringNullableWithAggregatesFilter<"Addendum"> | string | null
    contractId?: StringWithAggregatesFilter<"Addendum"> | string
  }

  export type ContractAccessWhereInput = {
    AND?: ContractAccessWhereInput | ContractAccessWhereInput[]
    OR?: ContractAccessWhereInput[]
    NOT?: ContractAccessWhereInput | ContractAccessWhereInput[]
    id?: StringFilter<"ContractAccess"> | string
    createdAt?: DateTimeFilter<"ContractAccess"> | Date | string
    updatedAt?: DateTimeFilter<"ContractAccess"> | Date | string
    userId?: StringFilter<"ContractAccess"> | string
    contractId?: StringFilter<"ContractAccess"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }

  export type ContractAccessOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    contractId?: SortOrder
    user?: UserOrderByWithRelationInput
    contract?: ContractOrderByWithRelationInput
  }

  export type ContractAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_contractId?: ContractAccessUserIdContractIdCompoundUniqueInput
    AND?: ContractAccessWhereInput | ContractAccessWhereInput[]
    OR?: ContractAccessWhereInput[]
    NOT?: ContractAccessWhereInput | ContractAccessWhereInput[]
    createdAt?: DateTimeFilter<"ContractAccess"> | Date | string
    updatedAt?: DateTimeFilter<"ContractAccess"> | Date | string
    userId?: StringFilter<"ContractAccess"> | string
    contractId?: StringFilter<"ContractAccess"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    contract?: XOR<ContractScalarRelationFilter, ContractWhereInput>
  }, "id" | "userId_contractId">

  export type ContractAccessOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    contractId?: SortOrder
    _count?: ContractAccessCountOrderByAggregateInput
    _max?: ContractAccessMaxOrderByAggregateInput
    _min?: ContractAccessMinOrderByAggregateInput
  }

  export type ContractAccessScalarWhereWithAggregatesInput = {
    AND?: ContractAccessScalarWhereWithAggregatesInput | ContractAccessScalarWhereWithAggregatesInput[]
    OR?: ContractAccessScalarWhereWithAggregatesInput[]
    NOT?: ContractAccessScalarWhereWithAggregatesInput | ContractAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractAccess"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContractAccess"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContractAccess"> | Date | string
    userId?: StringWithAggregatesFilter<"ContractAccess"> | string
    contractId?: StringWithAggregatesFilter<"ContractAccess"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: StringNullableFilter<"User"> | string | null
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoggedIn?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordReset?: PasswordResetListRelationFilter
    contractAccess?: ContractAccessListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrderInput | SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    lastLoggedIn?: SortOrderInput | SortOrder
    passwordReset?: PasswordResetOrderByRelationAggregateInput
    contractAccess?: ContractAccessOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: StringNullableFilter<"User"> | string | null
    banned?: BoolNullableFilter<"User"> | boolean | null
    banReason?: StringNullableFilter<"User"> | string | null
    banExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    lastLoggedIn?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordReset?: PasswordResetListRelationFilter
    contractAccess?: ContractAccessListRelationFilter
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrderInput | SortOrder
    banned?: SortOrderInput | SortOrder
    banReason?: SortOrderInput | SortOrder
    banExpires?: SortOrderInput | SortOrder
    lastLoggedIn?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    banned?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    banReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    banExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastLoggedIn?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    userId?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    userId?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    userId?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    budgetYear?: IntNullableFilter<"Session"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    budgetYear?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    budgetYear?: IntNullableFilter<"Session"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    budgetYear?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
    budgetYear?: IntNullableWithAggregatesFilter<"Session"> | number | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type ContractCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressCreateNestedManyWithoutContractInput
    location?: LocationCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessCreateNestedManyWithoutContractInput
  }

  export type ContractUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumUncheckedCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressUncheckedCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressUncheckedCreateNestedManyWithoutContractInput
    location?: LocationUncheckedCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUpdateManyWithoutContractNestedInput
    location?: LocationUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUncheckedUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUncheckedUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput
    location?: LocationUncheckedUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
  }

  export type ContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type ContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PhysicalProgressCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
    contract: ContractCreateNestedOneWithoutPhysicalProgressInput
  }

  export type PhysicalProgressUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contractId: string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
  }

  export type PhysicalProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    contract?: ContractUpdateOneRequiredWithoutPhysicalProgressNestedInput
  }

  export type PhysicalProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhysicalProgressCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contractId: string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
  }

  export type PhysicalProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhysicalProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FinancialProgressCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    totalProgress?: number | null
    totalPayment?: number | null
    uangMuka?: number | null
    termin1?: number | null
    termin2?: number | null
    termin3?: number | null
    termin4?: number | null
    contract: ContractCreateNestedOneWithoutFinancialProgressInput
  }

  export type FinancialProgressUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    totalProgress?: number | null
    totalPayment?: number | null
    uangMuka?: number | null
    termin1?: number | null
    termin2?: number | null
    termin3?: number | null
    termin4?: number | null
    contractId: string
  }

  export type FinancialProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
    contract?: ContractUpdateOneRequiredWithoutFinancialProgressNestedInput
  }

  export type FinancialProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type FinancialProgressCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    totalProgress?: number | null
    totalPayment?: number | null
    uangMuka?: number | null
    termin1?: number | null
    termin2?: number | null
    termin3?: number | null
    termin4?: number | null
    contractId: string
  }

  export type FinancialProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type FinancialProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type LocationCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kota?: string | null
    distrik?: string | null
    kampung?: string | null
    koordinatAwal?: string | null
    koordinatAkhir?: string | null
    contract: ContractCreateNestedOneWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kota?: string | null
    distrik?: string | null
    kampung?: string | null
    koordinatAwal?: string | null
    koordinatAkhir?: string | null
    contractId: string
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    contract?: ContractUpdateOneRequiredWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type LocationCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kota?: string | null
    distrik?: string | null
    kampung?: string | null
    koordinatAwal?: string | null
    koordinatAkhir?: string | null
    contractId: string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type AddendumCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
    contract: ContractCreateNestedOneWithoutAddendumInput
  }

  export type AddendumUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
    contractId: string
  }

  export type AddendumUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
    contract?: ContractUpdateOneRequiredWithoutAddendumNestedInput
  }

  export type AddendumUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type AddendumCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
    contractId: string
  }

  export type AddendumUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddendumUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type ContractAccessCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutContractAccessInput
    contract: ContractCreateNestedOneWithoutContractAccessInput
  }

  export type ContractAccessUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    contractId: string
  }

  export type ContractAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContractAccessNestedInput
    contract?: ContractUpdateOneRequiredWithoutContractAccessNestedInput
  }

  export type ContractAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type ContractAccessCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    contractId: string
  }

  export type ContractAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PasswordResetCreateInput = {
    id?: string
    createdAt?: Date | string
    token: string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutPasswordResetInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    token: string
    expiresAt: Date | string
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    token: string
    expiresAt: Date | string
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    budgetYear?: number | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    budgetYear?: number | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    budgetYear?: number | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AddendumListRelationFilter = {
    every?: AddendumWhereInput
    some?: AddendumWhereInput
    none?: AddendumWhereInput
  }

  export type FinancialProgressNullableScalarRelationFilter = {
    is?: FinancialProgressWhereInput | null
    isNot?: FinancialProgressWhereInput | null
  }

  export type PhysicalProgressListRelationFilter = {
    every?: PhysicalProgressWhereInput
    some?: PhysicalProgressWhereInput
    none?: PhysicalProgressWhereInput
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type ContractAccessListRelationFilter = {
    every?: ContractAccessWhereInput
    some?: ContractAccessWhereInput
    none?: ContractAccessWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddendumOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhysicalProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    namaPaket?: SortOrder
    namaPenyedia?: SortOrder
    ppk?: SortOrder
    nipPPK?: SortOrder
    korwaslap?: SortOrder
    nipKorwaslap?: SortOrder
    pengawasLapangan?: SortOrder
    nipPengawasLapangan?: SortOrder
    paguAnggaran?: SortOrder
    nilaiKontrak?: SortOrder
    sumberDana?: SortOrder
    nomorKontrak?: SortOrder
    tanggalKontrak?: SortOrder
    masaPelaksanaan?: SortOrder
    tanggalSelesaiAwal?: SortOrder
    tanggalSelesaiAkhir?: SortOrder
    totalAddendumWaktu?: SortOrder
    volumeKontrak?: SortOrder
    satuanKontrak?: SortOrder
    subKegiatan?: SortOrder
    konsultanSupervisi?: SortOrder
    nomorKontrakSupervisi?: SortOrder
    nilaiKontrakSupervisi?: SortOrder
    tanggalKontrakSupervisi?: SortOrder
    masaPelaksanaanSupervisi?: SortOrder
    hasilProdukAkhir?: SortOrder
    dimensi?: SortOrder
    dokumentasiAwal?: SortOrder
    dokumentasiTengah?: SortOrder
    dokumentasiAkhir?: SortOrder
    dokumenPendukung?: SortOrder
    hasAddendum?: SortOrder
  }

  export type ContractAvgOrderByAggregateInput = {
    paguAnggaran?: SortOrder
    nilaiKontrak?: SortOrder
    masaPelaksanaan?: SortOrder
    totalAddendumWaktu?: SortOrder
    nilaiKontrakSupervisi?: SortOrder
    masaPelaksanaanSupervisi?: SortOrder
  }

  export type ContractMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    namaPaket?: SortOrder
    namaPenyedia?: SortOrder
    ppk?: SortOrder
    nipPPK?: SortOrder
    korwaslap?: SortOrder
    nipKorwaslap?: SortOrder
    pengawasLapangan?: SortOrder
    nipPengawasLapangan?: SortOrder
    paguAnggaran?: SortOrder
    nilaiKontrak?: SortOrder
    sumberDana?: SortOrder
    nomorKontrak?: SortOrder
    tanggalKontrak?: SortOrder
    masaPelaksanaan?: SortOrder
    tanggalSelesaiAwal?: SortOrder
    tanggalSelesaiAkhir?: SortOrder
    totalAddendumWaktu?: SortOrder
    volumeKontrak?: SortOrder
    satuanKontrak?: SortOrder
    subKegiatan?: SortOrder
    konsultanSupervisi?: SortOrder
    nomorKontrakSupervisi?: SortOrder
    nilaiKontrakSupervisi?: SortOrder
    tanggalKontrakSupervisi?: SortOrder
    masaPelaksanaanSupervisi?: SortOrder
    hasilProdukAkhir?: SortOrder
    dimensi?: SortOrder
    dokumentasiAwal?: SortOrder
    dokumentasiTengah?: SortOrder
    dokumentasiAkhir?: SortOrder
    dokumenPendukung?: SortOrder
    hasAddendum?: SortOrder
  }

  export type ContractMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    namaPaket?: SortOrder
    namaPenyedia?: SortOrder
    ppk?: SortOrder
    nipPPK?: SortOrder
    korwaslap?: SortOrder
    nipKorwaslap?: SortOrder
    pengawasLapangan?: SortOrder
    nipPengawasLapangan?: SortOrder
    paguAnggaran?: SortOrder
    nilaiKontrak?: SortOrder
    sumberDana?: SortOrder
    nomorKontrak?: SortOrder
    tanggalKontrak?: SortOrder
    masaPelaksanaan?: SortOrder
    tanggalSelesaiAwal?: SortOrder
    tanggalSelesaiAkhir?: SortOrder
    totalAddendumWaktu?: SortOrder
    volumeKontrak?: SortOrder
    satuanKontrak?: SortOrder
    subKegiatan?: SortOrder
    konsultanSupervisi?: SortOrder
    nomorKontrakSupervisi?: SortOrder
    nilaiKontrakSupervisi?: SortOrder
    tanggalKontrakSupervisi?: SortOrder
    masaPelaksanaanSupervisi?: SortOrder
    hasilProdukAkhir?: SortOrder
    dimensi?: SortOrder
    dokumentasiAwal?: SortOrder
    dokumentasiTengah?: SortOrder
    dokumentasiAkhir?: SortOrder
    dokumenPendukung?: SortOrder
    hasAddendum?: SortOrder
  }

  export type ContractSumOrderByAggregateInput = {
    paguAnggaran?: SortOrder
    nilaiKontrak?: SortOrder
    masaPelaksanaan?: SortOrder
    totalAddendumWaktu?: SortOrder
    nilaiKontrakSupervisi?: SortOrder
    masaPelaksanaanSupervisi?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ContractScalarRelationFilter = {
    is?: ContractWhereInput
    isNot?: ContractWhereInput
  }

  export type PhysicalProgressContractIdMonthWeekCompoundUniqueInput = {
    contractId: string
    month: string
    week: number
  }

  export type PhysicalProgressCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractId?: SortOrder
    month?: SortOrder
    week?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
    bermasalah?: SortOrder
    deskripsiMasalah?: SortOrder
    keterangan?: SortOrder
  }

  export type PhysicalProgressAvgOrderByAggregateInput = {
    week?: SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
  }

  export type PhysicalProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractId?: SortOrder
    month?: SortOrder
    week?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
    bermasalah?: SortOrder
    deskripsiMasalah?: SortOrder
    keterangan?: SortOrder
  }

  export type PhysicalProgressMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractId?: SortOrder
    month?: SortOrder
    week?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
    bermasalah?: SortOrder
    deskripsiMasalah?: SortOrder
    keterangan?: SortOrder
  }

  export type PhysicalProgressSumOrderByAggregateInput = {
    week?: SortOrder
    rencana?: SortOrder
    realisasi?: SortOrder
    deviasi?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FinancialProgressCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalProgress?: SortOrder
    totalPayment?: SortOrder
    uangMuka?: SortOrder
    termin1?: SortOrder
    termin2?: SortOrder
    termin3?: SortOrder
    termin4?: SortOrder
    contractId?: SortOrder
  }

  export type FinancialProgressAvgOrderByAggregateInput = {
    totalProgress?: SortOrder
    totalPayment?: SortOrder
    uangMuka?: SortOrder
    termin1?: SortOrder
    termin2?: SortOrder
    termin3?: SortOrder
    termin4?: SortOrder
  }

  export type FinancialProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalProgress?: SortOrder
    totalPayment?: SortOrder
    uangMuka?: SortOrder
    termin1?: SortOrder
    termin2?: SortOrder
    termin3?: SortOrder
    termin4?: SortOrder
    contractId?: SortOrder
  }

  export type FinancialProgressMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalProgress?: SortOrder
    totalPayment?: SortOrder
    uangMuka?: SortOrder
    termin1?: SortOrder
    termin2?: SortOrder
    termin3?: SortOrder
    termin4?: SortOrder
    contractId?: SortOrder
  }

  export type FinancialProgressSumOrderByAggregateInput = {
    totalProgress?: SortOrder
    totalPayment?: SortOrder
    uangMuka?: SortOrder
    termin1?: SortOrder
    termin2?: SortOrder
    termin3?: SortOrder
    termin4?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kota?: SortOrder
    distrik?: SortOrder
    kampung?: SortOrder
    koordinatAwal?: SortOrder
    koordinatAkhir?: SortOrder
    contractId?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kota?: SortOrder
    distrik?: SortOrder
    kampung?: SortOrder
    koordinatAwal?: SortOrder
    koordinatAkhir?: SortOrder
    contractId?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kota?: SortOrder
    distrik?: SortOrder
    kampung?: SortOrder
    koordinatAwal?: SortOrder
    koordinatAkhir?: SortOrder
    contractId?: SortOrder
  }

  export type AddendumCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tipe?: SortOrder
    tanggal?: SortOrder
    hari?: SortOrder
    volume?: SortOrder
    satuan?: SortOrder
    pemberianKesempatan?: SortOrder
    alasan?: SortOrder
    contractId?: SortOrder
  }

  export type AddendumAvgOrderByAggregateInput = {
    hari?: SortOrder
  }

  export type AddendumMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tipe?: SortOrder
    tanggal?: SortOrder
    hari?: SortOrder
    volume?: SortOrder
    satuan?: SortOrder
    pemberianKesempatan?: SortOrder
    alasan?: SortOrder
    contractId?: SortOrder
  }

  export type AddendumMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    tipe?: SortOrder
    tanggal?: SortOrder
    hari?: SortOrder
    volume?: SortOrder
    satuan?: SortOrder
    pemberianKesempatan?: SortOrder
    alasan?: SortOrder
    contractId?: SortOrder
  }

  export type AddendumSumOrderByAggregateInput = {
    hari?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ContractAccessUserIdContractIdCompoundUniqueInput = {
    userId: string
    contractId: string
  }

  export type ContractAccessCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    contractId?: SortOrder
  }

  export type ContractAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    contractId?: SortOrder
  }

  export type ContractAccessMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    contractId?: SortOrder
  }

  export type PasswordResetListRelationFilter = {
    every?: PasswordResetWhereInput
    some?: PasswordResetWhereInput
    none?: PasswordResetWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type PasswordResetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
    lastLoggedIn?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
    lastLoggedIn?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    banned?: SortOrder
    banReason?: SortOrder
    banExpires?: SortOrder
    lastLoggedIn?: SortOrder
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    budgetYear?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    budgetYear?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    budgetYear?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    budgetYear?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    budgetYear?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddendumCreateNestedManyWithoutContractInput = {
    create?: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput> | AddendumCreateWithoutContractInput[] | AddendumUncheckedCreateWithoutContractInput[]
    connectOrCreate?: AddendumCreateOrConnectWithoutContractInput | AddendumCreateOrConnectWithoutContractInput[]
    createMany?: AddendumCreateManyContractInputEnvelope
    connect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
  }

  export type FinancialProgressCreateNestedOneWithoutContractInput = {
    create?: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
    connectOrCreate?: FinancialProgressCreateOrConnectWithoutContractInput
    connect?: FinancialProgressWhereUniqueInput
  }

  export type PhysicalProgressCreateNestedManyWithoutContractInput = {
    create?: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput> | PhysicalProgressCreateWithoutContractInput[] | PhysicalProgressUncheckedCreateWithoutContractInput[]
    connectOrCreate?: PhysicalProgressCreateOrConnectWithoutContractInput | PhysicalProgressCreateOrConnectWithoutContractInput[]
    createMany?: PhysicalProgressCreateManyContractInputEnvelope
    connect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
  }

  export type LocationCreateNestedOneWithoutContractInput = {
    create?: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
    connectOrCreate?: LocationCreateOrConnectWithoutContractInput
    connect?: LocationWhereUniqueInput
  }

  export type ContractAccessCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput> | ContractAccessCreateWithoutContractInput[] | ContractAccessUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutContractInput | ContractAccessCreateOrConnectWithoutContractInput[]
    createMany?: ContractAccessCreateManyContractInputEnvelope
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
  }

  export type AddendumUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput> | AddendumCreateWithoutContractInput[] | AddendumUncheckedCreateWithoutContractInput[]
    connectOrCreate?: AddendumCreateOrConnectWithoutContractInput | AddendumCreateOrConnectWithoutContractInput[]
    createMany?: AddendumCreateManyContractInputEnvelope
    connect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
  }

  export type FinancialProgressUncheckedCreateNestedOneWithoutContractInput = {
    create?: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
    connectOrCreate?: FinancialProgressCreateOrConnectWithoutContractInput
    connect?: FinancialProgressWhereUniqueInput
  }

  export type PhysicalProgressUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput> | PhysicalProgressCreateWithoutContractInput[] | PhysicalProgressUncheckedCreateWithoutContractInput[]
    connectOrCreate?: PhysicalProgressCreateOrConnectWithoutContractInput | PhysicalProgressCreateOrConnectWithoutContractInput[]
    createMany?: PhysicalProgressCreateManyContractInputEnvelope
    connect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedOneWithoutContractInput = {
    create?: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
    connectOrCreate?: LocationCreateOrConnectWithoutContractInput
    connect?: LocationWhereUniqueInput
  }

  export type ContractAccessUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput> | ContractAccessCreateWithoutContractInput[] | ContractAccessUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutContractInput | ContractAccessCreateOrConnectWithoutContractInput[]
    createMany?: ContractAccessCreateManyContractInputEnvelope
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type AddendumUpdateManyWithoutContractNestedInput = {
    create?: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput> | AddendumCreateWithoutContractInput[] | AddendumUncheckedCreateWithoutContractInput[]
    connectOrCreate?: AddendumCreateOrConnectWithoutContractInput | AddendumCreateOrConnectWithoutContractInput[]
    upsert?: AddendumUpsertWithWhereUniqueWithoutContractInput | AddendumUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: AddendumCreateManyContractInputEnvelope
    set?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    disconnect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    delete?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    connect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    update?: AddendumUpdateWithWhereUniqueWithoutContractInput | AddendumUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: AddendumUpdateManyWithWhereWithoutContractInput | AddendumUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: AddendumScalarWhereInput | AddendumScalarWhereInput[]
  }

  export type FinancialProgressUpdateOneWithoutContractNestedInput = {
    create?: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
    connectOrCreate?: FinancialProgressCreateOrConnectWithoutContractInput
    upsert?: FinancialProgressUpsertWithoutContractInput
    disconnect?: FinancialProgressWhereInput | boolean
    delete?: FinancialProgressWhereInput | boolean
    connect?: FinancialProgressWhereUniqueInput
    update?: XOR<XOR<FinancialProgressUpdateToOneWithWhereWithoutContractInput, FinancialProgressUpdateWithoutContractInput>, FinancialProgressUncheckedUpdateWithoutContractInput>
  }

  export type PhysicalProgressUpdateManyWithoutContractNestedInput = {
    create?: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput> | PhysicalProgressCreateWithoutContractInput[] | PhysicalProgressUncheckedCreateWithoutContractInput[]
    connectOrCreate?: PhysicalProgressCreateOrConnectWithoutContractInput | PhysicalProgressCreateOrConnectWithoutContractInput[]
    upsert?: PhysicalProgressUpsertWithWhereUniqueWithoutContractInput | PhysicalProgressUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: PhysicalProgressCreateManyContractInputEnvelope
    set?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    disconnect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    delete?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    connect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    update?: PhysicalProgressUpdateWithWhereUniqueWithoutContractInput | PhysicalProgressUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: PhysicalProgressUpdateManyWithWhereWithoutContractInput | PhysicalProgressUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: PhysicalProgressScalarWhereInput | PhysicalProgressScalarWhereInput[]
  }

  export type LocationUpdateOneWithoutContractNestedInput = {
    create?: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
    connectOrCreate?: LocationCreateOrConnectWithoutContractInput
    upsert?: LocationUpsertWithoutContractInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutContractInput, LocationUpdateWithoutContractInput>, LocationUncheckedUpdateWithoutContractInput>
  }

  export type ContractAccessUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput> | ContractAccessCreateWithoutContractInput[] | ContractAccessUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutContractInput | ContractAccessCreateOrConnectWithoutContractInput[]
    upsert?: ContractAccessUpsertWithWhereUniqueWithoutContractInput | ContractAccessUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractAccessCreateManyContractInputEnvelope
    set?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    disconnect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    delete?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    update?: ContractAccessUpdateWithWhereUniqueWithoutContractInput | ContractAccessUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractAccessUpdateManyWithWhereWithoutContractInput | ContractAccessUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
  }

  export type AddendumUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput> | AddendumCreateWithoutContractInput[] | AddendumUncheckedCreateWithoutContractInput[]
    connectOrCreate?: AddendumCreateOrConnectWithoutContractInput | AddendumCreateOrConnectWithoutContractInput[]
    upsert?: AddendumUpsertWithWhereUniqueWithoutContractInput | AddendumUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: AddendumCreateManyContractInputEnvelope
    set?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    disconnect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    delete?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    connect?: AddendumWhereUniqueInput | AddendumWhereUniqueInput[]
    update?: AddendumUpdateWithWhereUniqueWithoutContractInput | AddendumUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: AddendumUpdateManyWithWhereWithoutContractInput | AddendumUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: AddendumScalarWhereInput | AddendumScalarWhereInput[]
  }

  export type FinancialProgressUncheckedUpdateOneWithoutContractNestedInput = {
    create?: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
    connectOrCreate?: FinancialProgressCreateOrConnectWithoutContractInput
    upsert?: FinancialProgressUpsertWithoutContractInput
    disconnect?: FinancialProgressWhereInput | boolean
    delete?: FinancialProgressWhereInput | boolean
    connect?: FinancialProgressWhereUniqueInput
    update?: XOR<XOR<FinancialProgressUpdateToOneWithWhereWithoutContractInput, FinancialProgressUpdateWithoutContractInput>, FinancialProgressUncheckedUpdateWithoutContractInput>
  }

  export type PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput> | PhysicalProgressCreateWithoutContractInput[] | PhysicalProgressUncheckedCreateWithoutContractInput[]
    connectOrCreate?: PhysicalProgressCreateOrConnectWithoutContractInput | PhysicalProgressCreateOrConnectWithoutContractInput[]
    upsert?: PhysicalProgressUpsertWithWhereUniqueWithoutContractInput | PhysicalProgressUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: PhysicalProgressCreateManyContractInputEnvelope
    set?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    disconnect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    delete?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    connect?: PhysicalProgressWhereUniqueInput | PhysicalProgressWhereUniqueInput[]
    update?: PhysicalProgressUpdateWithWhereUniqueWithoutContractInput | PhysicalProgressUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: PhysicalProgressUpdateManyWithWhereWithoutContractInput | PhysicalProgressUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: PhysicalProgressScalarWhereInput | PhysicalProgressScalarWhereInput[]
  }

  export type LocationUncheckedUpdateOneWithoutContractNestedInput = {
    create?: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
    connectOrCreate?: LocationCreateOrConnectWithoutContractInput
    upsert?: LocationUpsertWithoutContractInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutContractInput, LocationUpdateWithoutContractInput>, LocationUncheckedUpdateWithoutContractInput>
  }

  export type ContractAccessUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput> | ContractAccessCreateWithoutContractInput[] | ContractAccessUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutContractInput | ContractAccessCreateOrConnectWithoutContractInput[]
    upsert?: ContractAccessUpsertWithWhereUniqueWithoutContractInput | ContractAccessUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractAccessCreateManyContractInputEnvelope
    set?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    disconnect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    delete?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    update?: ContractAccessUpdateWithWhereUniqueWithoutContractInput | ContractAccessUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractAccessUpdateManyWithWhereWithoutContractInput | ContractAccessUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
  }

  export type ContractCreateNestedOneWithoutPhysicalProgressInput = {
    create?: XOR<ContractCreateWithoutPhysicalProgressInput, ContractUncheckedCreateWithoutPhysicalProgressInput>
    connectOrCreate?: ContractCreateOrConnectWithoutPhysicalProgressInput
    connect?: ContractWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ContractUpdateOneRequiredWithoutPhysicalProgressNestedInput = {
    create?: XOR<ContractCreateWithoutPhysicalProgressInput, ContractUncheckedCreateWithoutPhysicalProgressInput>
    connectOrCreate?: ContractCreateOrConnectWithoutPhysicalProgressInput
    upsert?: ContractUpsertWithoutPhysicalProgressInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutPhysicalProgressInput, ContractUpdateWithoutPhysicalProgressInput>, ContractUncheckedUpdateWithoutPhysicalProgressInput>
  }

  export type ContractCreateNestedOneWithoutFinancialProgressInput = {
    create?: XOR<ContractCreateWithoutFinancialProgressInput, ContractUncheckedCreateWithoutFinancialProgressInput>
    connectOrCreate?: ContractCreateOrConnectWithoutFinancialProgressInput
    connect?: ContractWhereUniqueInput
  }

  export type ContractUpdateOneRequiredWithoutFinancialProgressNestedInput = {
    create?: XOR<ContractCreateWithoutFinancialProgressInput, ContractUncheckedCreateWithoutFinancialProgressInput>
    connectOrCreate?: ContractCreateOrConnectWithoutFinancialProgressInput
    upsert?: ContractUpsertWithoutFinancialProgressInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutFinancialProgressInput, ContractUpdateWithoutFinancialProgressInput>, ContractUncheckedUpdateWithoutFinancialProgressInput>
  }

  export type ContractCreateNestedOneWithoutLocationInput = {
    create?: XOR<ContractCreateWithoutLocationInput, ContractUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ContractCreateOrConnectWithoutLocationInput
    connect?: ContractWhereUniqueInput
  }

  export type ContractUpdateOneRequiredWithoutLocationNestedInput = {
    create?: XOR<ContractCreateWithoutLocationInput, ContractUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ContractCreateOrConnectWithoutLocationInput
    upsert?: ContractUpsertWithoutLocationInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutLocationInput, ContractUpdateWithoutLocationInput>, ContractUncheckedUpdateWithoutLocationInput>
  }

  export type ContractCreateNestedOneWithoutAddendumInput = {
    create?: XOR<ContractCreateWithoutAddendumInput, ContractUncheckedCreateWithoutAddendumInput>
    connectOrCreate?: ContractCreateOrConnectWithoutAddendumInput
    connect?: ContractWhereUniqueInput
  }

  export type ContractUpdateOneRequiredWithoutAddendumNestedInput = {
    create?: XOR<ContractCreateWithoutAddendumInput, ContractUncheckedCreateWithoutAddendumInput>
    connectOrCreate?: ContractCreateOrConnectWithoutAddendumInput
    upsert?: ContractUpsertWithoutAddendumInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutAddendumInput, ContractUpdateWithoutAddendumInput>, ContractUncheckedUpdateWithoutAddendumInput>
  }

  export type UserCreateNestedOneWithoutContractAccessInput = {
    create?: XOR<UserCreateWithoutContractAccessInput, UserUncheckedCreateWithoutContractAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutContractAccessInput
    connect?: UserWhereUniqueInput
  }

  export type ContractCreateNestedOneWithoutContractAccessInput = {
    create?: XOR<ContractCreateWithoutContractAccessInput, ContractUncheckedCreateWithoutContractAccessInput>
    connectOrCreate?: ContractCreateOrConnectWithoutContractAccessInput
    connect?: ContractWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutContractAccessNestedInput = {
    create?: XOR<UserCreateWithoutContractAccessInput, UserUncheckedCreateWithoutContractAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutContractAccessInput
    upsert?: UserUpsertWithoutContractAccessInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContractAccessInput, UserUpdateWithoutContractAccessInput>, UserUncheckedUpdateWithoutContractAccessInput>
  }

  export type ContractUpdateOneRequiredWithoutContractAccessNestedInput = {
    create?: XOR<ContractCreateWithoutContractAccessInput, ContractUncheckedCreateWithoutContractAccessInput>
    connectOrCreate?: ContractCreateOrConnectWithoutContractAccessInput
    upsert?: ContractUpsertWithoutContractAccessInput
    connect?: ContractWhereUniqueInput
    update?: XOR<XOR<ContractUpdateToOneWithWhereWithoutContractAccessInput, ContractUpdateWithoutContractAccessInput>, ContractUncheckedUpdateWithoutContractAccessInput>
  }

  export type PasswordResetCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type ContractAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput> | ContractAccessCreateWithoutUserInput[] | ContractAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutUserInput | ContractAccessCreateOrConnectWithoutUserInput[]
    createMany?: ContractAccessCreateManyUserInputEnvelope
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PasswordResetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type ContractAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput> | ContractAccessCreateWithoutUserInput[] | ContractAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutUserInput | ContractAccessCreateOrConnectWithoutUserInput[]
    createMany?: ContractAccessCreateManyUserInputEnvelope
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PasswordResetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type ContractAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput> | ContractAccessCreateWithoutUserInput[] | ContractAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutUserInput | ContractAccessCreateOrConnectWithoutUserInput[]
    upsert?: ContractAccessUpsertWithWhereUniqueWithoutUserInput | ContractAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContractAccessCreateManyUserInputEnvelope
    set?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    disconnect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    delete?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    update?: ContractAccessUpdateWithWhereUniqueWithoutUserInput | ContractAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContractAccessUpdateManyWithWhereWithoutUserInput | ContractAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type ContractAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput> | ContractAccessCreateWithoutUserInput[] | ContractAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContractAccessCreateOrConnectWithoutUserInput | ContractAccessCreateOrConnectWithoutUserInput[]
    upsert?: ContractAccessUpsertWithWhereUniqueWithoutUserInput | ContractAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContractAccessCreateManyUserInputEnvelope
    set?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    disconnect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    delete?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    connect?: ContractAccessWhereUniqueInput | ContractAccessWhereUniqueInput[]
    update?: ContractAccessUpdateWithWhereUniqueWithoutUserInput | ContractAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContractAccessUpdateManyWithWhereWithoutUserInput | ContractAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPasswordResetInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    upsert?: UserUpsertWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetInput, UserUpdateWithoutPasswordResetInput>, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AddendumCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
  }

  export type AddendumUncheckedCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
  }

  export type AddendumCreateOrConnectWithoutContractInput = {
    where: AddendumWhereUniqueInput
    create: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput>
  }

  export type AddendumCreateManyContractInputEnvelope = {
    data: AddendumCreateManyContractInput | AddendumCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type FinancialProgressCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    totalProgress?: number | null
    totalPayment?: number | null
    uangMuka?: number | null
    termin1?: number | null
    termin2?: number | null
    termin3?: number | null
    termin4?: number | null
  }

  export type FinancialProgressUncheckedCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    totalProgress?: number | null
    totalPayment?: number | null
    uangMuka?: number | null
    termin1?: number | null
    termin2?: number | null
    termin3?: number | null
    termin4?: number | null
  }

  export type FinancialProgressCreateOrConnectWithoutContractInput = {
    where: FinancialProgressWhereUniqueInput
    create: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
  }

  export type PhysicalProgressCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
  }

  export type PhysicalProgressUncheckedCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
  }

  export type PhysicalProgressCreateOrConnectWithoutContractInput = {
    where: PhysicalProgressWhereUniqueInput
    create: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput>
  }

  export type PhysicalProgressCreateManyContractInputEnvelope = {
    data: PhysicalProgressCreateManyContractInput | PhysicalProgressCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type LocationCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kota?: string | null
    distrik?: string | null
    kampung?: string | null
    koordinatAwal?: string | null
    koordinatAkhir?: string | null
  }

  export type LocationUncheckedCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    kota?: string | null
    distrik?: string | null
    kampung?: string | null
    koordinatAwal?: string | null
    koordinatAkhir?: string | null
  }

  export type LocationCreateOrConnectWithoutContractInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
  }

  export type ContractAccessCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutContractAccessInput
  }

  export type ContractAccessUncheckedCreateWithoutContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ContractAccessCreateOrConnectWithoutContractInput = {
    where: ContractAccessWhereUniqueInput
    create: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput>
  }

  export type ContractAccessCreateManyContractInputEnvelope = {
    data: ContractAccessCreateManyContractInput | ContractAccessCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type AddendumUpsertWithWhereUniqueWithoutContractInput = {
    where: AddendumWhereUniqueInput
    update: XOR<AddendumUpdateWithoutContractInput, AddendumUncheckedUpdateWithoutContractInput>
    create: XOR<AddendumCreateWithoutContractInput, AddendumUncheckedCreateWithoutContractInput>
  }

  export type AddendumUpdateWithWhereUniqueWithoutContractInput = {
    where: AddendumWhereUniqueInput
    data: XOR<AddendumUpdateWithoutContractInput, AddendumUncheckedUpdateWithoutContractInput>
  }

  export type AddendumUpdateManyWithWhereWithoutContractInput = {
    where: AddendumScalarWhereInput
    data: XOR<AddendumUpdateManyMutationInput, AddendumUncheckedUpdateManyWithoutContractInput>
  }

  export type AddendumScalarWhereInput = {
    AND?: AddendumScalarWhereInput | AddendumScalarWhereInput[]
    OR?: AddendumScalarWhereInput[]
    NOT?: AddendumScalarWhereInput | AddendumScalarWhereInput[]
    id?: StringFilter<"Addendum"> | string
    createdAt?: DateTimeFilter<"Addendum"> | Date | string
    updatedAt?: DateTimeFilter<"Addendum"> | Date | string
    name?: StringNullableFilter<"Addendum"> | string | null
    tipe?: StringNullableFilter<"Addendum"> | string | null
    tanggal?: DateTimeNullableFilter<"Addendum"> | Date | string | null
    hari?: IntNullableFilter<"Addendum"> | number | null
    volume?: StringNullableFilter<"Addendum"> | string | null
    satuan?: StringNullableFilter<"Addendum"> | string | null
    pemberianKesempatan?: BoolFilter<"Addendum"> | boolean
    alasan?: StringNullableFilter<"Addendum"> | string | null
    contractId?: StringFilter<"Addendum"> | string
  }

  export type FinancialProgressUpsertWithoutContractInput = {
    update: XOR<FinancialProgressUpdateWithoutContractInput, FinancialProgressUncheckedUpdateWithoutContractInput>
    create: XOR<FinancialProgressCreateWithoutContractInput, FinancialProgressUncheckedCreateWithoutContractInput>
    where?: FinancialProgressWhereInput
  }

  export type FinancialProgressUpdateToOneWithWhereWithoutContractInput = {
    where?: FinancialProgressWhereInput
    data: XOR<FinancialProgressUpdateWithoutContractInput, FinancialProgressUncheckedUpdateWithoutContractInput>
  }

  export type FinancialProgressUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type FinancialProgressUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    totalPayment?: NullableFloatFieldUpdateOperationsInput | number | null
    uangMuka?: NullableFloatFieldUpdateOperationsInput | number | null
    termin1?: NullableFloatFieldUpdateOperationsInput | number | null
    termin2?: NullableFloatFieldUpdateOperationsInput | number | null
    termin3?: NullableFloatFieldUpdateOperationsInput | number | null
    termin4?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type PhysicalProgressUpsertWithWhereUniqueWithoutContractInput = {
    where: PhysicalProgressWhereUniqueInput
    update: XOR<PhysicalProgressUpdateWithoutContractInput, PhysicalProgressUncheckedUpdateWithoutContractInput>
    create: XOR<PhysicalProgressCreateWithoutContractInput, PhysicalProgressUncheckedCreateWithoutContractInput>
  }

  export type PhysicalProgressUpdateWithWhereUniqueWithoutContractInput = {
    where: PhysicalProgressWhereUniqueInput
    data: XOR<PhysicalProgressUpdateWithoutContractInput, PhysicalProgressUncheckedUpdateWithoutContractInput>
  }

  export type PhysicalProgressUpdateManyWithWhereWithoutContractInput = {
    where: PhysicalProgressScalarWhereInput
    data: XOR<PhysicalProgressUpdateManyMutationInput, PhysicalProgressUncheckedUpdateManyWithoutContractInput>
  }

  export type PhysicalProgressScalarWhereInput = {
    AND?: PhysicalProgressScalarWhereInput | PhysicalProgressScalarWhereInput[]
    OR?: PhysicalProgressScalarWhereInput[]
    NOT?: PhysicalProgressScalarWhereInput | PhysicalProgressScalarWhereInput[]
    id?: StringFilter<"PhysicalProgress"> | string
    createdAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    updatedAt?: DateTimeFilter<"PhysicalProgress"> | Date | string
    contractId?: StringFilter<"PhysicalProgress"> | string
    month?: StringFilter<"PhysicalProgress"> | string
    week?: IntFilter<"PhysicalProgress"> | number
    startDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    endDate?: DateTimeNullableFilter<"PhysicalProgress"> | Date | string | null
    rencana?: FloatFilter<"PhysicalProgress"> | number
    realisasi?: FloatFilter<"PhysicalProgress"> | number
    deviasi?: FloatFilter<"PhysicalProgress"> | number
    bermasalah?: BoolFilter<"PhysicalProgress"> | boolean
    deskripsiMasalah?: StringNullableFilter<"PhysicalProgress"> | string | null
    keterangan?: StringNullableFilter<"PhysicalProgress"> | string | null
  }

  export type LocationUpsertWithoutContractInput = {
    update: XOR<LocationUpdateWithoutContractInput, LocationUncheckedUpdateWithoutContractInput>
    create: XOR<LocationCreateWithoutContractInput, LocationUncheckedCreateWithoutContractInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutContractInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutContractInput, LocationUncheckedUpdateWithoutContractInput>
  }

  export type LocationUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LocationUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kota?: NullableStringFieldUpdateOperationsInput | string | null
    distrik?: NullableStringFieldUpdateOperationsInput | string | null
    kampung?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAwal?: NullableStringFieldUpdateOperationsInput | string | null
    koordinatAkhir?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractAccessUpsertWithWhereUniqueWithoutContractInput = {
    where: ContractAccessWhereUniqueInput
    update: XOR<ContractAccessUpdateWithoutContractInput, ContractAccessUncheckedUpdateWithoutContractInput>
    create: XOR<ContractAccessCreateWithoutContractInput, ContractAccessUncheckedCreateWithoutContractInput>
  }

  export type ContractAccessUpdateWithWhereUniqueWithoutContractInput = {
    where: ContractAccessWhereUniqueInput
    data: XOR<ContractAccessUpdateWithoutContractInput, ContractAccessUncheckedUpdateWithoutContractInput>
  }

  export type ContractAccessUpdateManyWithWhereWithoutContractInput = {
    where: ContractAccessScalarWhereInput
    data: XOR<ContractAccessUpdateManyMutationInput, ContractAccessUncheckedUpdateManyWithoutContractInput>
  }

  export type ContractAccessScalarWhereInput = {
    AND?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
    OR?: ContractAccessScalarWhereInput[]
    NOT?: ContractAccessScalarWhereInput | ContractAccessScalarWhereInput[]
    id?: StringFilter<"ContractAccess"> | string
    createdAt?: DateTimeFilter<"ContractAccess"> | Date | string
    updatedAt?: DateTimeFilter<"ContractAccess"> | Date | string
    userId?: StringFilter<"ContractAccess"> | string
    contractId?: StringFilter<"ContractAccess"> | string
  }

  export type ContractCreateWithoutPhysicalProgressInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressCreateNestedOneWithoutContractInput
    location?: LocationCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessCreateNestedManyWithoutContractInput
  }

  export type ContractUncheckedCreateWithoutPhysicalProgressInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumUncheckedCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressUncheckedCreateNestedOneWithoutContractInput
    location?: LocationUncheckedCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutPhysicalProgressInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutPhysicalProgressInput, ContractUncheckedCreateWithoutPhysicalProgressInput>
  }

  export type ContractUpsertWithoutPhysicalProgressInput = {
    update: XOR<ContractUpdateWithoutPhysicalProgressInput, ContractUncheckedUpdateWithoutPhysicalProgressInput>
    create: XOR<ContractCreateWithoutPhysicalProgressInput, ContractUncheckedCreateWithoutPhysicalProgressInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutPhysicalProgressInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutPhysicalProgressInput, ContractUncheckedUpdateWithoutPhysicalProgressInput>
  }

  export type ContractUpdateWithoutPhysicalProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUpdateOneWithoutContractNestedInput
    location?: LocationUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateWithoutPhysicalProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUncheckedUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUncheckedUpdateOneWithoutContractNestedInput
    location?: LocationUncheckedUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractCreateWithoutFinancialProgressInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumCreateNestedManyWithoutContractInput
    physicalProgress?: PhysicalProgressCreateNestedManyWithoutContractInput
    location?: LocationCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessCreateNestedManyWithoutContractInput
  }

  export type ContractUncheckedCreateWithoutFinancialProgressInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumUncheckedCreateNestedManyWithoutContractInput
    physicalProgress?: PhysicalProgressUncheckedCreateNestedManyWithoutContractInput
    location?: LocationUncheckedCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutFinancialProgressInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutFinancialProgressInput, ContractUncheckedCreateWithoutFinancialProgressInput>
  }

  export type ContractUpsertWithoutFinancialProgressInput = {
    update: XOR<ContractUpdateWithoutFinancialProgressInput, ContractUncheckedUpdateWithoutFinancialProgressInput>
    create: XOR<ContractCreateWithoutFinancialProgressInput, ContractUncheckedCreateWithoutFinancialProgressInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutFinancialProgressInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutFinancialProgressInput, ContractUncheckedUpdateWithoutFinancialProgressInput>
  }

  export type ContractUpdateWithoutFinancialProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUpdateManyWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUpdateManyWithoutContractNestedInput
    location?: LocationUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateWithoutFinancialProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUncheckedUpdateManyWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput
    location?: LocationUncheckedUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractCreateWithoutLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressCreateNestedManyWithoutContractInput
    contractAccess?: ContractAccessCreateNestedManyWithoutContractInput
  }

  export type ContractUncheckedCreateWithoutLocationInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumUncheckedCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressUncheckedCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressUncheckedCreateNestedManyWithoutContractInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutLocationInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutLocationInput, ContractUncheckedCreateWithoutLocationInput>
  }

  export type ContractUpsertWithoutLocationInput = {
    update: XOR<ContractUpdateWithoutLocationInput, ContractUncheckedUpdateWithoutLocationInput>
    create: XOR<ContractCreateWithoutLocationInput, ContractUncheckedCreateWithoutLocationInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutLocationInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutLocationInput, ContractUncheckedUpdateWithoutLocationInput>
  }

  export type ContractUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUpdateManyWithoutContractNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUncheckedUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUncheckedUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractCreateWithoutAddendumInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    financialProgress?: FinancialProgressCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressCreateNestedManyWithoutContractInput
    location?: LocationCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessCreateNestedManyWithoutContractInput
  }

  export type ContractUncheckedCreateWithoutAddendumInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    financialProgress?: FinancialProgressUncheckedCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressUncheckedCreateNestedManyWithoutContractInput
    location?: LocationUncheckedCreateNestedOneWithoutContractInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutAddendumInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutAddendumInput, ContractUncheckedCreateWithoutAddendumInput>
  }

  export type ContractUpsertWithoutAddendumInput = {
    update: XOR<ContractUpdateWithoutAddendumInput, ContractUncheckedUpdateWithoutAddendumInput>
    create: XOR<ContractCreateWithoutAddendumInput, ContractUncheckedCreateWithoutAddendumInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutAddendumInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutAddendumInput, ContractUncheckedUpdateWithoutAddendumInput>
  }

  export type ContractUpdateWithoutAddendumInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialProgress?: FinancialProgressUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUpdateManyWithoutContractNestedInput
    location?: LocationUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateWithoutAddendumInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    financialProgress?: FinancialProgressUncheckedUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput
    location?: LocationUncheckedUpdateOneWithoutContractNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutContractNestedInput
  }

  export type UserCreateWithoutContractAccessInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContractAccessInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContractAccessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContractAccessInput, UserUncheckedCreateWithoutContractAccessInput>
  }

  export type ContractCreateWithoutContractAccessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressCreateNestedManyWithoutContractInput
    location?: LocationCreateNestedOneWithoutContractInput
  }

  export type ContractUncheckedCreateWithoutContractAccessInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    namaPaket: string
    namaPenyedia?: string | null
    ppk?: string | null
    nipPPK?: string | null
    korwaslap?: string | null
    nipKorwaslap?: string | null
    pengawasLapangan?: string | null
    nipPengawasLapangan?: string | null
    paguAnggaran?: number | null
    nilaiKontrak?: number | null
    sumberDana?: string | null
    nomorKontrak?: string | null
    tanggalKontrak?: Date | string | null
    masaPelaksanaan?: number | null
    tanggalSelesaiAwal?: Date | string | null
    tanggalSelesaiAkhir?: Date | string | null
    totalAddendumWaktu?: number | null
    volumeKontrak?: string | null
    satuanKontrak?: string | null
    subKegiatan?: string | null
    konsultanSupervisi?: string | null
    nomorKontrakSupervisi?: string | null
    nilaiKontrakSupervisi?: number | null
    tanggalKontrakSupervisi?: Date | string | null
    masaPelaksanaanSupervisi?: number | null
    hasilProdukAkhir?: string | null
    dimensi?: string | null
    dokumentasiAwal?: string | null
    dokumentasiTengah?: string | null
    dokumentasiAkhir?: string | null
    dokumenPendukung?: string | null
    hasAddendum?: boolean | null
    addendum?: AddendumUncheckedCreateNestedManyWithoutContractInput
    financialProgress?: FinancialProgressUncheckedCreateNestedOneWithoutContractInput
    physicalProgress?: PhysicalProgressUncheckedCreateNestedManyWithoutContractInput
    location?: LocationUncheckedCreateNestedOneWithoutContractInput
  }

  export type ContractCreateOrConnectWithoutContractAccessInput = {
    where: ContractWhereUniqueInput
    create: XOR<ContractCreateWithoutContractAccessInput, ContractUncheckedCreateWithoutContractAccessInput>
  }

  export type UserUpsertWithoutContractAccessInput = {
    update: XOR<UserUpdateWithoutContractAccessInput, UserUncheckedUpdateWithoutContractAccessInput>
    create: XOR<UserCreateWithoutContractAccessInput, UserUncheckedCreateWithoutContractAccessInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContractAccessInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContractAccessInput, UserUncheckedUpdateWithoutContractAccessInput>
  }

  export type UserUpdateWithoutContractAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContractAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ContractUpsertWithoutContractAccessInput = {
    update: XOR<ContractUpdateWithoutContractAccessInput, ContractUncheckedUpdateWithoutContractAccessInput>
    create: XOR<ContractCreateWithoutContractAccessInput, ContractUncheckedCreateWithoutContractAccessInput>
    where?: ContractWhereInput
  }

  export type ContractUpdateToOneWithWhereWithoutContractAccessInput = {
    where?: ContractWhereInput
    data: XOR<ContractUpdateWithoutContractAccessInput, ContractUncheckedUpdateWithoutContractAccessInput>
  }

  export type ContractUpdateWithoutContractAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUpdateManyWithoutContractNestedInput
    location?: LocationUpdateOneWithoutContractNestedInput
  }

  export type ContractUncheckedUpdateWithoutContractAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    namaPaket?: StringFieldUpdateOperationsInput | string
    namaPenyedia?: NullableStringFieldUpdateOperationsInput | string | null
    ppk?: NullableStringFieldUpdateOperationsInput | string | null
    nipPPK?: NullableStringFieldUpdateOperationsInput | string | null
    korwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    nipKorwaslap?: NullableStringFieldUpdateOperationsInput | string | null
    pengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    nipPengawasLapangan?: NullableStringFieldUpdateOperationsInput | string | null
    paguAnggaran?: NullableFloatFieldUpdateOperationsInput | number | null
    nilaiKontrak?: NullableFloatFieldUpdateOperationsInput | number | null
    sumberDana?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    tanggalKontrak?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaan?: NullableIntFieldUpdateOperationsInput | number | null
    tanggalSelesaiAwal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tanggalSelesaiAkhir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalAddendumWaktu?: NullableIntFieldUpdateOperationsInput | number | null
    volumeKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    satuanKontrak?: NullableStringFieldUpdateOperationsInput | string | null
    subKegiatan?: NullableStringFieldUpdateOperationsInput | string | null
    konsultanSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nomorKontrakSupervisi?: NullableStringFieldUpdateOperationsInput | string | null
    nilaiKontrakSupervisi?: NullableFloatFieldUpdateOperationsInput | number | null
    tanggalKontrakSupervisi?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    masaPelaksanaanSupervisi?: NullableIntFieldUpdateOperationsInput | number | null
    hasilProdukAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dimensi?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAwal?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiTengah?: NullableStringFieldUpdateOperationsInput | string | null
    dokumentasiAkhir?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenPendukung?: NullableStringFieldUpdateOperationsInput | string | null
    hasAddendum?: NullableBoolFieldUpdateOperationsInput | boolean | null
    addendum?: AddendumUncheckedUpdateManyWithoutContractNestedInput
    financialProgress?: FinancialProgressUncheckedUpdateOneWithoutContractNestedInput
    physicalProgress?: PhysicalProgressUncheckedUpdateManyWithoutContractNestedInput
    location?: LocationUncheckedUpdateOneWithoutContractNestedInput
  }

  export type PasswordResetCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    token: string
    expiresAt: Date | string
  }

  export type PasswordResetUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    token: string
    expiresAt: Date | string
  }

  export type PasswordResetCreateOrConnectWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetCreateManyUserInputEnvelope = {
    data: PasswordResetCreateManyUserInput | PasswordResetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ContractAccessCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contract: ContractCreateNestedOneWithoutContractAccessInput
  }

  export type ContractAccessUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contractId: string
  }

  export type ContractAccessCreateOrConnectWithoutUserInput = {
    where: ContractAccessWhereUniqueInput
    create: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput>
  }

  export type ContractAccessCreateManyUserInputEnvelope = {
    data: ContractAccessCreateManyUserInput | ContractAccessCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    budgetYear?: number | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    budgetYear?: number | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    update: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    data: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetScalarWhereInput
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetScalarWhereInput = {
    AND?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    OR?: PasswordResetScalarWhereInput[]
    NOT?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    userId?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }

  export type ContractAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: ContractAccessWhereUniqueInput
    update: XOR<ContractAccessUpdateWithoutUserInput, ContractAccessUncheckedUpdateWithoutUserInput>
    create: XOR<ContractAccessCreateWithoutUserInput, ContractAccessUncheckedCreateWithoutUserInput>
  }

  export type ContractAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: ContractAccessWhereUniqueInput
    data: XOR<ContractAccessUpdateWithoutUserInput, ContractAccessUncheckedUpdateWithoutUserInput>
  }

  export type ContractAccessUpdateManyWithWhereWithoutUserInput = {
    where: ContractAccessScalarWhereInput
    data: XOR<ContractAccessUpdateManyMutationInput, ContractAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    budgetYear?: IntNullableFilter<"Session"> | number | null
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type UserCreateWithoutPasswordResetInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    contractAccess?: ContractAccessCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
  }

  export type UserUpsertWithoutPasswordResetInput = {
    update: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAccess?: ContractAccessUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: string | null
    banned?: boolean | null
    banReason?: string | null
    banExpires?: Date | string | null
    lastLoggedIn?: Date | string | null
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    contractAccess?: ContractAccessUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableStringFieldUpdateOperationsInput | string | null
    banned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    banExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLoggedIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    contractAccess?: ContractAccessUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AddendumCreateManyContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name?: string | null
    tipe?: string | null
    tanggal?: Date | string | null
    hari?: number | null
    volume?: string | null
    satuan?: string | null
    pemberianKesempatan: boolean
    alasan?: string | null
  }

  export type PhysicalProgressCreateManyContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    month: string
    week: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    rencana: number
    realisasi: number
    deviasi: number
    bermasalah?: boolean
    deskripsiMasalah?: string | null
    keterangan?: string | null
  }

  export type ContractAccessCreateManyContractInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type AddendumUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddendumUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddendumUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    tipe?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hari?: NullableIntFieldUpdateOperationsInput | number | null
    volume?: NullableStringFieldUpdateOperationsInput | string | null
    satuan?: NullableStringFieldUpdateOperationsInput | string | null
    pemberianKesempatan?: BoolFieldUpdateOperationsInput | boolean
    alasan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhysicalProgressUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhysicalProgressUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PhysicalProgressUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    month?: StringFieldUpdateOperationsInput | string
    week?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rencana?: FloatFieldUpdateOperationsInput | number
    realisasi?: FloatFieldUpdateOperationsInput | number
    deviasi?: FloatFieldUpdateOperationsInput | number
    bermasalah?: BoolFieldUpdateOperationsInput | boolean
    deskripsiMasalah?: NullableStringFieldUpdateOperationsInput | string | null
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractAccessUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContractAccessNestedInput
  }

  export type ContractAccessUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ContractAccessUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordResetCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    token: string
    expiresAt: Date | string
  }

  export type ContractAccessCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    contractId: string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    budgetYear?: number | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PasswordResetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractAccessUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contract?: ContractUpdateOneRequiredWithoutContractAccessNestedInput
  }

  export type ContractAccessUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type ContractAccessUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    budgetYear?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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