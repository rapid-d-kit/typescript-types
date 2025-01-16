
/**
 * **FunctionArguments** - A utility type to extract the argument types of a function.
 *
 * @template T - A function type from which the argument types will be extracted.
 *
 * This type extracts the types of the arguments from a function type `T` and returns them as a tuple.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Args = FunctionArguments<(x: number, y: string) => void>;
 * // Args: [number, string]
 * ```
 *
 * ### Behavior:
 * - Extracts the argument types from a given function type.
 * - Returns `never` if `T` is not a function.
 */
export type FunctionArguments<T> = T extends (...args: infer A) => any ? A : never;


/**
 * **FunctionReturn** - A utility type to extract the return type of a function.
 *
 * @template T - A function type from which the return type will be extracted.
 *
 * This type extracts the return type from a function type `T`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = FunctionReturn<(x: number, y: string) => boolean>;
 * // Result: boolean
 * ```
 *
 * ### Behavior:
 * - Extracts the return type from a given function type.
 * - Returns `never` if `T` is not a function.
 */
export type FunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;


/**
 * **AsyncFunction** - A utility type to convert a function into one that returns a `Promise` of its return type.
 *
 * @template T - A function type that will be converted into an asynchronous function.
 *
 * This type takes a function `T` and transforms it into a new function that always returns a `Promise` of the original return type.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type AsyncFn = AsyncFunction<(x: number) => string>;
 * // AsyncFn: (x: number) => Promise<string>
 * ```
 *
 * ### Behavior:
 * - Converts the function into one that returns a `Promise` of its original return type.
 * - Preserves the argument types of the original function.
 */
export type AsyncFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => Promise<ReturnType<T>>;


/**
 * **GenericFunction** - A type for defining functions with arbitrary arguments and return types.
 *
 * This type represents a function that can take any number of arguments and return any type.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const myFunc: GenericFunction = (x: string, y: number) => x + y;
 * // The function can accept any arguments and return any type.
 * ```
 *
 * ### Behavior:
 * - Accepts any arguments (`any[]`) and returns any type (`any`).
 */
export type GenericFunction = (...args: any[]) => any;


/**
 * **GenericFunctionWithGenerics** - A type for defining functions with customizable argument and return types.
 *
 * @template TArgs - The type of the arguments, defaulting to `any[]`.
 * @template TResult - The return type of the function, defaulting to `any`.
 *
 * This type allows you to define functions with generic argument and return types, providing flexibility for different use cases.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const myFunc: GenericFunctionWithGenerics<[string, number], boolean> = (x, y) => x.length > y;
 * // The function accepts a string and a number as arguments and returns a boolean.
 * ```
 *
 * ### Behavior:
 * - Accepts arguments and return type defined by generics.
 * - Provides flexibility for different types of functions.
 */
export type GenericFunctionWithGenerics<TArgs extends any[] = any[], TResult = any> = (...args: TArgs) => TResult;


/**
 * **OverloadedFunction** - A type for functions that have multiple overloads with different argument types.
 *
 * @template T - A function type that can have multiple overloads.
 *
 * This type allows a function to have multiple overloads, each with different argument types, and combines them into a single function type.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type MyFunction = OverloadedFunction<
 *   | ((x: number) => string)
 *   | ((x: string) => boolean)
 * >;
 * ```
 *
 * ### Behavior:
 * - Allows a function to have multiple overloads with different signatures.
 * - Merges all overloads into a single type.
 */
export type OverloadedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T>;
  (...args: any[]): any;
};


/**
 * **ThrottledFunction** - A type for creating a function that is throttled to limit its execution frequency.
 *
 * @template T - The function type to throttle.
 *
 * This type defines a function that executes at most once in a given time interval, ignoring further calls within that interval.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const throttledFunc: ThrottledFunction<(x: number) => void> = throttle((x) => console.log(x), 1000);
 * ```
 *
 * ### Behavior:
 * - Limits the execution frequency of the function to one call per interval.
 * - May return a value or `void` depending on the implementation.
 */
export type ThrottledFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> | void;
