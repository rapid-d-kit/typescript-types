
/**
 * **Primitive** - A type that represents the basic primitive types in JavaScript.
 *
 * This type is a union of all the basic primitive types in JavaScript, including `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const str: Primitive = "Hello";    // Valid
 * const num: Primitive = 42;         // Valid
 * const isActive: Primitive = true;  // Valid
 * const unknown: Primitive = {};     // Error (object is not a primitive)
 * ```
 *
 * ### Behavior:
 * - Covers all JavaScript primitive types.
 * - Excludes non-primitive types like `object` and `function`.
 */
export type Primitive = string | number | boolean | bigint | symbol | null | undefined;


/**
 * **DeepPartial** - A type that makes all properties of a given type `T` optional, including nested properties.
 *
 * @template T - The type to be partially made optional.
 *
 * This type recursively applies `Partial` to all properties of `T`, including properties of objects and arrays.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type User = { name: string, address: { city: string } };
 * const partialUser: DeepPartial<User> = { address: { city: "New York" } }; // Valid
 * ```
 *
 * ### Behavior:
 * - Makes all properties of `T` optional.
 * - Recursively makes nested properties optional for objects and arrays.
 */
export type DeepPartial<T> = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function ?
    T :
    T extends Array<infer InferredArrayMember> ?
      DeepPartialArray<InferredArrayMember> :
      T extends object ?
      DeepPartialObject<T> :
      T | undefined
);

interface DeepPartialArray<T> extends Array<DeepPartial<T>> { }

type DeepPartialObject<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};


/**
 * **Mutable** - A utility type that removes the `readonly` modifier from all properties of a given type.
 *
 * @template T - The type from which the `readonly` modifier will be removed.
 *
 * This type transforms a given type `T` into a mutable version, where all `readonly` properties become writable.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type ReadonlyUser = { readonly name: string };
 * type MutableUser = Mutable<ReadonlyUser>;
 * const user: MutableUser = { name: "John" }; // Valid
 * user.name = "Jane"; // Valid, because the property is now mutable
 * ```
 *
 * ### Behavior:
 * - Removes the `readonly` modifier from all properties.
 * - Allows mutations to properties that were originally `readonly`.
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};


/**
 * **DeepMutable** - A utility type that recursively removes the `readonly` modifier from all properties and nested properties of a given type.
 *
 * @template T - The type from which the `readonly` modifier will be removed recursively.
 *
 * This type transforms a given type `T` and its nested properties into mutable types, where all `readonly` properties become writable.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type ReadonlyUser = { readonly name: string, address: { readonly city: string } };
 * type MutableUser = DeepMutable<ReadonlyUser>;
 * const user: MutableUser = { name: "John", address: { city: "New York" } }; // Valid
 * user.address.city = "Los Angeles"; // Valid, because the property is now mutable
 * ```
 *
 * ### Behavior:
 * - Recursively removes the `readonly` modifier from properties.
 * - Allows mutations to nested properties of the original type.
 */
export type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};


/**
 * **DeepReadonly** - A utility type that makes all properties and nested properties of a given type `readonly`.
 *
 * @template T - The type to be made `readonly`.
 *
 * This type recursively applies `Readonly` to all properties of `T`, including properties of objects and arrays.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type User = { name: string, address: { city: string } };
 * type ReadonlyUser = DeepReadonly<User>;
 * const user: ReadonlyUser = { name: "John", address: { city: "New York" } };
 * user.name = "Jane"; // Error (cannot assign to a readonly property)
 * ```
 *
 * ### Behavior:
 * - Makes all properties `readonly`.
 * - Recursively makes nested properties `readonly` for objects and arrays.
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};


/**
 * **MaybePromise** - A utility type that allows a value to be either a direct value or a `Promise` of that value.
 *
 * @template T - The type of the value, which may be wrapped in a `Promise`.
 *
 * This type is useful for situations where a value may be returned directly or wrapped in a `Promise`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * async function fetchData(): MaybePromise<string> {
 *   return fetch('/api').then(res => res.text());
 * }
 * ```
 *
 * ### Behavior:
 * - Allows a value to be either directly of type `T` or wrapped in a `Promise<T>`.
 */
export type MaybePromise<T> = T | Promise<T>;


/**
 * **MaybeArray** - A utility type that allows a value to be either a single value or an array of values.
 *
 * @template T - The type of the value, which may be a single item or an array of items.
 *
 * This type is useful for scenarios where a single value or an array of values can be provided.
 *
 * ### Example Usage:
 *
 * ```typescript
 * function process(items: MaybeArray<number>): void {
 *   const array = Array.isArray(items) ? items : [items];
 * }
 * ```
 *
 * ### Behavior:
 * - Allows a value to be either a single value or an array of that value type.
 */
export type MaybeArray<T> = T | T[];
