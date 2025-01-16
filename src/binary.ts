
/**
 * **BufferLike** - A type that represents any object that can be used as a buffer.
 *
 * This type encompasses various structures that can hold binary data, including `Buffer`, `string`, `ArrayBuffer`, `Uint8Array`, `Uint16Array`, `Uint32Array`, `SharedArrayBuffer`, `ArrayBufferView`, and `DataView`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const buffer: BufferLike = Buffer.from('Hello, world');
 * const array: BufferLike = new Uint8Array([1, 2, 3, 4]);
 * ```
 *
 * ### Behavior:
 * - Accepts a variety of data types that can represent raw binary data.
 * - Useful for scenarios like file handling, networking, or other binary data processing.
 */
export type BufferLike = 
  | Buffer
  | string
  | ArrayBuffer
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | SharedArrayBuffer
  | ArrayBufferView
  | DataView;


/**
 * **BitFlags** - A utility type for representing bit flags as a set of key-value pairs where each value is either `1` or `0`.
 *
 * @template T - A tuple of string literals representing the keys of the bit flags.
 *
 * This type is useful for defining flags that can be used for bitwise operations, where each flag is represented by a key with a value of either `1` (on) or `0` (off).
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Flags = BitFlags<['flagA', 'flagB', 'flagC']>;
 * const flags: Flags = { flagA: 1, flagB: 0, flagC: 1 }; // Valid
 * ```
 *
 * ### Behavior:
 * - Maps each string in the tuple `T` to either `1` or `0` as values.
 * - Ideal for scenarios like flags or feature toggles.
 */
export type BitFlags<T extends string[]> = {
  [K in T[number]]: 1 | 0;
};


/**
 * **BinaryAnd** - A type that computes the result of a binary AND operation between two values (`0` or `1`).
 *
 * @template A - The first operand, either `0` or `1`.
 * @template B - The second operand, either `0` or `1`.
 *
 * This type returns `1` if both `A` and `B` are `1`, otherwise, it returns `0`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = BinaryAnd<1, 1>;  // Result: 1
 * type Result = BinaryAnd<0, 1>;  // Result: 0
 * ```
 *
 * ### Behavior:
 * - Computes the result of the binary AND operation.
 * - Restricts the operands to only `0` or `1`.
 */
export type BinaryAnd<A extends 0 | 1, B extends 0 | 1> = A extends 1 ? (B extends 1 ? 1 : 0) : 0;


/**
 * **BinaryOr** - A type that computes the result of a binary OR operation between two values (`0` or `1`).
 *
 * @template A - The first operand, either `0` or `1`.
 * @template B - The second operand, either `0` or `1`.
 *
 * This type returns `1` if either `A` or `B` is `1`, otherwise, it returns `0`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = BinaryOr<1, 0>;   // Result: 1
 * type Result = BinaryOr<0, 0>;   // Result: 0
 * ```
 *
 * ### Behavior:
 * - Computes the result of the binary OR operation.
 * - Restricts the operands to only `0` or `1`.
 */
export type BinaryOr<A extends 0 | 1, B extends 0 | 1> = A extends 1 ? 1 : (B extends 1 ? 1 : 0);


/**
 * **BinaryXor** - A type that computes the result of a binary XOR operation between two values (`0` or `1`).
 *
 * @template A - The first operand, either `0` or `1`.
 * @template B - The second operand, either `0` or `1`.
 *
 * This type returns `1` if `A` and `B` are different, otherwise, it returns `0`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = BinaryXor<1, 0>;  // Result: 1
 * type Result = BinaryXor<1, 1>;  // Result: 0
 * ```
 *
 * ### Behavior:
 * - Computes the result of the binary XOR operation.
 * - Restricts the operands to only `0` or `1`.
 */
export type BinaryXor<A extends 0 | 1, B extends 0 | 1> = A extends B ? 0 : 1;


/**
 * **Increment** - A type that appends a `1` to the end of a binary tuple, effectively incrementing the value.
 *
 * @template T - A tuple representing a binary number (an array of `0`s and `1`s).
 *
 * This type adds `1` to the end of a binary tuple, allowing you to represent incrementing a binary number.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Incremented = Increment<[0, 1]>;  // Incremented: [0, 1, 1]
 * ```
 *
 * ### Behavior:
 * - Appends `1` to the tuple, effectively incrementing the binary value.
 * - Works with binary tuples represented by `0`s and `1`s.
 */
export type Increment<T extends 0[] | 1[]> = [...T, 1];


/**
 * **Decrement** - A type that removes the last `1` from a binary tuple, effectively decrementing the value.
 *
 * @template T - A tuple representing a binary number (an array of `0`s and `1`s).
 *
 * This type removes the last `1` from a binary tuple, allowing you to represent decrementing a binary number.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Decremented = Decrement<[0, 1, 1]>;  // Decremented: [0, 1]
 * ```
 *
 * ### Behavior:
 * - Removes the last `1` from the tuple, effectively decrementing the binary value.
 * - Works with binary tuples represented by `0`s and `1`s.
 */
export type Decrement<T extends 0[] | 1[]> = T extends [...infer R, 1] ? R : never;


/**
 * **BinaryTuple** - A type that generates a binary tuple of a specified length `N`.
 *
 * @template N - The number of `0`s to generate in the tuple.
 * @template R - An internal recursive helper that builds the tuple.
 *
 * This type recursively constructs a binary tuple of length `N` filled with `0`s.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Binary5 = BinaryTuple<5>;  // Binary5: [0, 0, 0, 0, 0]
 * ```
 *
 * ### Behavior:
 * - Recursively generates a tuple with `N` `0`s.
 * - Useful for generating binary representations of fixed lengths.
 */
export type BinaryTuple<N extends number, R extends 0[] = []> = R['length'] extends N ? R : BinaryTuple<N, [0, ...R]>;


/**
 * **BinaryLessThanOrEqual** - A type that checks if a binary number represented by a tuple `Arr` is less than or equal to `A`.
 *
 * @template A - The first binary number to compare.
 * @template B - The second binary number to compare.
 * @template Arr - An internal helper array for recursive length checking.
 *
 * This type checks if the length of a binary tuple is less than or equal to a specified number `A`, comparing it with `B` recursively.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = BinaryLessThanOrEqual<3, 5>;  // Result: true
 * ```
 *
 * ### Behavior:
 * - Recursively compares binary numbers represented by the tuple length.
 * - Returns `true` if the length of `Arr` is less than or equal to `A`, `false` otherwise.
 */
export type BinaryLessThanOrEqual<
  A extends number,
  B extends number,
  Arr extends 0[] = []
> = Arr['length'] extends A
  ? true
  : Arr['length'] extends B
  ? false
  : BinaryLessThanOrEqual<A, B, [0, ...Arr]>;




/**
 * A transportable signed token is a package that contains an token and its signature
 * as well as the headers of the package and the signature of the package.
 * 
 * The headers are encoded as base64 and the signature is a string.
 */
export interface TransportableSignedToken {

  /**
   * The headers of the package encoded as base64
   */
  readonly headers: string;

  /**
   * The signature of the package
   */
  readonly signature: string;

  /**
   * The payload of the package including the token
   */
  readonly token: {
    /**
     * The target token transported by this package
     */
    readonly value: string;

    /**
     * The signature of the token transported by this package
     */
    readonly signature: string;
  };
}
