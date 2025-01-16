
/**
 * **LooseAutocomplete** - A utility type for enabling autocomplete suggestions while allowing arbitrary string values.
 *
 * @template T - A type that extends `string`, `number`, or `symbol`.
 *
 * This type is primarily useful for scenarios where strict type enforcement is desired for predefined values,  
 * but flexibility is also required to support custom or dynamic values outside the predefined set.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Colors = 'red' | 'blue' | 'green';
 * const color: LooseAutocomplete<Colors> = 'red';       // Valid (predefined)
 * const customColor: LooseAutocomplete<Colors> = 'pink'; // Valid (custom string)
 * const invalidColor: LooseAutocomplete<Colors> = 42;   // Error (must be a string)
 * ```
 *
 * ### Behavior:
 * - Provides autocomplete suggestions for the values in `T`.
 * - Allows any string value, even if it's not listed in `T`.
 * - Restricts input to string-like types (no numbers or symbols unless explicitly included in `T`).
 */
export type LooseAutocomplete<T extends string | number | symbol> = T | Omit<string, T>;

/**
 * **Tail** - Extracts all but the first element of a tuple or array type.
 *
 * @template T - An array type to process.
 *
 * ### Example Usage:
 * ```typescript
 * type Rest = Tail<[1, 2, 3]>; // [2, 3]
 * ```
 */
export type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

/**
 * **Head** - Extracts the first element of a tuple or array type.
 *
 * @template T - An array type to process.
 *
 * ### Example Usage:
 * ```typescript
 * type First = Head<[1, 2, 3]>; // 1
 * ```
 */
export type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;

/**
 * **RequireKeys** - Makes specified keys of an object required.
 *
 * @template T - The object type.
 * @template K - The keys of `T` to make required.
 *
 * ### Example Usage:
 * ```typescript
 * type Obj = { a?: number; b?: string };
 * type RequiredObj = RequireKeys<Obj, 'a'>; // { a: number; b?: string }
 * ```
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * **ExcludeKeys** - Excludes specified keys from an object type.
 *
 * @template T - The object type.
 * @template K - The keys of `T` to exclude.
 *
 * ### Example Usage:
 * ```typescript
 * type Obj = { a: number; b: string };
 * type ExcludedObj = ExcludeKeys<Obj, 'a'>; // { b: string }
 * ```
 */
export type ExcludeKeys<T, K extends keyof T> = Omit<T, K>;

/**
 * **FlatArray** - Extracts the element type of an array, or returns the type if not an array.
 *
 * @template T - The type to process.
 *
 * ### Example Usage:
 * ```typescript
 * type ElementType = FlatArray<number[]>; // number
 * type SameType = FlatArray<number>; // number
 * ```
 */
export type FlatArray<T> = T extends (infer U)[] ? U : T;

/**
 * **NonEmptyArray** - Represents an array with at least one element.
 *
 * @template T - The element type of the array.
 *
 * ### Example Usage:
 * ```typescript
 * type NonEmpty = NonEmptyArray<number>; // [number, ...number[]]
 * ```
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * **Tuple** - Represents a tuple type of a fixed length.
 *
 * @template T - The element type of the tuple.
 * @template N - The number of elements in the tuple.
 *
 * ### Example Usage:
 * ```typescript
 * type Triple = Tuple<number, 3>; // [number, number, number]
 * ```
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

/**
 * **Dict** - Represents a dictionary type with string keys and a specified value type.
 *
 * @template T - The type of the values.
 *
 * ### Example Usage:
 * ```typescript
 * type NumberDict = Dict<number>; // { [key: string]: number }
 * ```
 */
export type Dict<T> = { [key: string]: T };

/**
 * **ReadonlyDict** - Represents a readonly dictionary with string keys and a specified value type.
 *
 * @template T - The type of the values.
 *
 * ### Example Usage:
 * ```typescript
 * type ReadonlyNumberDict = ReadonlyDict<number>; // { readonly [key: string]: number }
 * ```
 */
export type ReadonlyDict<T> = { readonly [key: string]: T };

/**
 * **MapKey** - Extracts the key type of a `Map`.
 *
 * @template BaseType - The `Map` type to extract from.
 *
 * ### Example Usage:
 * ```typescript
 * type KeyType = MapKey<Map<string, number>>; // string
 * ```
 */
type MapKey<BaseType> = BaseType extends Map<infer KeyType, unknown> ? KeyType : never;

/**
 * **MapValue** - Extracts the value type of a `Map`.
 *
 * @template BaseType - The `Map` type to extract from.
 *
 * ### Example Usage:
 * ```typescript
 * type ValueType = MapValue<Map<string, number>>; // number
 * ```
 */
type MapValue<BaseType> = BaseType extends Map<unknown, infer ValueType> ? ValueType : never;

/**
 * **ArrayEntry** - Represents an entry in an array as a tuple of index and value.
 *
 * @template BaseType - The array type.
 *
 * ### Example Usage:
 * ```typescript
 * type Entry = ArrayEntry<[string, number]>; // [number, string | number]
 * ```
 */
export type ArrayEntry<BaseType extends readonly unknown[]> = [number, BaseType[number]];

/**
 * **MapEntry** - Represents an entry in a `Map` as a tuple of key and value.
 *
 * @template BaseType - The `Map` type.
 *
 * ### Example Usage:
 * ```typescript
 * type Entry = MapEntry<Map<string, number>>; // [string, number]
 * ```
 */
export type MapEntry<BaseType> = [MapKey<BaseType>, MapValue<BaseType>];

/**
 * **ObjectEntry** - Represents an entry in an object as a tuple of key and value.
 *
 * @template BaseType - The object type.
 *
 * ### Example Usage:
 * ```typescript
 * type Entry = ObjectEntry<{ a: number; b: string }>; // ['a' | 'b', number | string]
 * ```
 */
export type ObjectEntry<BaseType> = [keyof BaseType, BaseType[keyof BaseType]];

/**
 * **SetEntry** - Represents an entry in a `Set` as a tuple of the same value twice.
 *
 * @template BaseType - The `Set` type.
 *
 * ### Example Usage:
 * ```typescript
 * type Entry = SetEntry<Set<number>>; // [number, number]
 * ```
 */
export type SetEntry<BaseType> = BaseType extends Set<infer ItemType> ? [ItemType, ItemType] : never;

/**
 * **Entry** - Represents an entry in a `Map`, `Set`, array, or object.
 *
 * @template BaseType - The collection type.
 *
 * ### Example Usage:
 * ```typescript
 * type MapEntryType = Entry<Map<string, number>>; // [string, number]
 * type ArrayEntryType = Entry<[number, string]>; // [number, number | string]
 * ```
 */
export type Entry<BaseType> =
  BaseType extends Map<unknown, unknown> ? MapEntry<BaseType>
    : BaseType extends Set<unknown> ? SetEntry<BaseType>
      : BaseType extends readonly unknown[] ? ArrayEntry<BaseType>
        : BaseType extends object ? ObjectEntry<BaseType>
          : never;

/**
 * **Exact** - Ensures `U` extends `T` without adding extra properties.
 *
 * @template T - The base type.
 * @template U - The type to validate.
 *
 * ### Example Usage:
 * ```typescript
 * type Valid = Exact<{ a: number }, { a: number }>; // Valid
 * type Invalid = Exact<{ a: number }, { a: number; b: string }>; // Error
 * ```
 */
export type Exact<T, U extends T> = T & Record<Exclude<keyof U, keyof T>, never>;

/**
 * **LiteralUnion** - Creates a union of literal types and string.
 *
 * @template T - Literal types to include.
 * @template U - Base type (default: `string`).
 *
 * ### Example Usage:
 * ```typescript
 * type Color = LiteralUnion<'red' | 'blue'>; // 'red' | 'blue' | string
 * ```
 */
export type LiteralUnion<T extends U, U = string> = T | (U & {}); // eslint-disable-line @typescript-eslint/ban-types

/**
 * **Constructor** - Represents a class constructor type.
 *
 * @template T - The instance type created by the constructor.
 *
 * ### Example Usage:
 * ```typescript
 * type NumberConstructor = Constructor<number>;
 * ```
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * **VoidableFunction** - Represents a function that can optionally return `void`.
 *
 * @template T - The function type.
 *
 * ### Example Usage:
 * ```typescript
 * type Func = VoidableFunction<(a: string) => number>;
 * ```
 */
export type VoidableFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> | void;

/**
 * **Pipe** - Represents a pipeline of functions, where the output of one function is the input of the next.
 *
 * @template Fns - An array of functions.
 *
 * ### Example Usage:
 * ```typescript
 * type Pipeline = Pipe<[(a: string) => number, (b: number) => boolean]>; // (arg: string) => boolean
 * ```
 */
export type Pipe<Fns extends [...Array<(arg: any) => any>]> = Fns extends [infer First, ...infer Rest] ?
  First extends (arg: any) => any ?
    Rest extends [...Array<(arg: any) => any>] ?
      (arg: Parameters<First>[0]) => ReturnType<Pipe<Rest>> :
     never :
   never :
  never;

/**
 * **PickByValue** - Picks keys from an object where values match a specific type.
 *
 * @template T - The object type.
 * @template ValueType - The value type to match.
 *
 * ### Example Usage:
 * ```typescript
 * type Picked = PickByValue<{ a: number; b: string }, string>; // { b: string }
 * ```
 */
export type PickByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

/**
 * **OmitByValue** - Omits keys from an object where values match a specific type.
 *
 * @template T - The object type.
 * @template ValueType - The value type to omit.
 *
 * ### Example Usage:
 * ```typescript
 * type Omitted = OmitByValue<{ a: number; b: string }, string>; // { a: number }
 * ```
 */
export type OmitByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
};


/**
 * **Zip** - A utility type for creating a tuple of paired elements from two input arrays.
 *
 * @template T - The first array type, each element will be paired with the corresponding element from the second array.
 * @template U - The second array type, each element will be paired with the corresponding element from the first array.
 *
 * This type recursively iterates over the elements of both arrays, pairing elements at the same index into a tuple. If one array is shorter, the resulting tuple will be truncated accordingly.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = Zip<[1, 2], ['a', 'b']>;  // Result: [[1, 'a'], [2, 'b']]
 * type Empty = Zip<[1], [2, 3]>;           // Result: [[1, 2]]
 * ```
 *
 * ### Behavior:
 * - Pairs elements from two arrays at the same index.
 * - Returns an empty array if either array is empty.
 * - Truncates the resulting tuple to the length of the shorter array.
 */
export type Zip<T extends any[], U extends any[]> = T extends [infer T1, ...infer TRest] ?
  U extends [infer U1, ...infer URest] ?
    [[T1, U1], ...Zip<TRest, URest>] :
    [] :
  [];


/**
 * **PromiseAllTuple** - A utility type to resolve a tuple of promises into a tuple of their resolved values.
 *
 * @template T - A tuple of values, where each element is either a value or a promise that resolves to a value.
 *
 * This type transforms each element of the tuple into its resolved type if it is a promise, or keeps the original type if it isn't.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = PromiseAllTuple<[Promise<number>, string, Promise<boolean>]>; 
 * // Result: [number, string, boolean]
 * ```
 *
 * ### Behavior:
 * - Resolves promises into their resolved value types.
 * - Leaves non-promise types unchanged.
 */
export type PromiseAllTuple<T extends any[]> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : T[K];
};


/**
 * **StateMachine** - A type to model a simple state machine with states and events.
 *
 * @template State - The type of the states in the state machine.
 * @template Event - The type of the events that can trigger state transitions.
 *
 * This type represents a state machine where `state` defines the current state, and `transitions` defines the possible state transitions for each state based on specific events.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type MyStateMachine = StateMachine<'idle' | 'loading' | 'success', 'start' | 'finish'>;
 * const stateMachine: MyStateMachine = {
 *   state: 'idle',
 *   transitions: {
 *     idle: { start: 'loading' },
 *     loading: { finish: 'success' }
 *   }
 * };
 * ```
 *
 * ### Behavior:
 * - Defines a state and its possible transitions based on events.
 * - Ensures type safety when transitioning between states.
 */
export type StateMachine<State extends string, Event extends string> = {
  state: State;
  transitions: Record<State, Partial<Record<Event, State>>>;
};


/**
 * **Validator** - A type for defining custom type guards that validate a value's type.
 *
 * @template T - The type that the value should be validated as.
 *
 * This type represents a function that takes an unknown value and returns a type guard indicating whether the value matches the specified type `T`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * const isString: Validator<string> = (value): value is string => typeof value === 'string';
 * const result = isString('hello'); // result: true, type is narrowed to string
 * ```
 *
 * ### Behavior:
 * - Validates a value's type.
 * - Narrows the type of the value based on the validation.
 */
export type Validator<T> = (value: unknown) => value is T;


/**
 * **KeysMatching** - A utility type for extracting keys from an object where the values match a specific type.
 *
 * @template T - The object type from which keys will be extracted.
 * @template ValueType - The type that the values must match.
 *
 * This type extracts keys from the object `T` where the value type matches `ValueType`.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = KeysMatching<{ a: number, b: string, c: number }, number>;
 * // Result: 'a' | 'c'
 * ```
 *
 * ### Behavior:
 * - Extracts keys from `T` where the value matches `ValueType`.
 * - Excludes keys with values of types that do not match `ValueType`.
 */
export type KeysMatching<T, ValueType> = keyof {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};


/**
 * **UnionToIntersection** - A utility type that transforms a union type into an intersection type.
 *
 * @template U - The union type that will be transformed into an intersection type.
 *
 * This type takes a union type and returns the intersection of all types within that union.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = UnionToIntersection<{ a: string } | { b: number }> 
 * // Result: { a: string } & { b: number }
 * ```
 *
 * ### Behavior:
 * - Converts a union type into an intersection type.
 * - Combines the properties of all types in the union into one.
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;


/**
 * **DeepMerge** - A utility type for deeply merging two types, including nested objects.
 *
 * @template T - The first object type to merge.
 * @template U - The second object type to merge.
 *
 * This type recursively merges two types, combining properties from both, and resolving conflicts in a nested structure by merging the corresponding sub-objects.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = DeepMerge<{ a: { x: number }, b: string }, { a: { y: string }, c: boolean }>;
 * // Result: { a: { x: number, y: string }, b: string, c: boolean }
 * ```
 *
 * ### Behavior:
 * - Merges objects deeply, preserving their nested structure.
 * - Resolves conflicts by merging values of the same property in nested objects.
 */
export type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T ?
    K extends keyof U ?
      T[K] extends object ?
        U[K] extends object ?
          DeepMerge<T[K], U[K]> :
          T[K] :
        T[K] :
      T[K] :
    K extends keyof U ?
      U[K]
    :
  never;
};


/**
 * **Permutations** - A type that generates all possible permutations of a set of types.
 *
 * @template T - The type of the set of elements to permute.
 * @template U - The type of the resulting permutations (default is the same as `T`).
 *
 * This type recursively generates all possible permutations of the elements in `T`, ensuring no duplicates and that all permutations are valid.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = Permutations<'a' | 'b' | 'c'>;
 * // Result: ['a', 'b', 'c'] | ['a', 'c', 'b'] | ['b', 'a', 'c'] | ...
 * ```
 *
 * ### Behavior:
 * - Generates all possible permutations of the given set.
 * - Excludes duplicates and ensures all permutations are valid.
 */
export type Permutations<T, U = T> = [T] extends [never] ? [] : U extends any ? [U, ...Permutations<Exclude<T, U>>] : never;


/**
 * **RecursiveArray** - A type that defines a nested array structure with recursive types.
 *
 * @template T - The type of elements in the array, which can be recursively nested.
 *
 * This type allows creating arrays where each element can either be a direct value or another array of the same type, enabling deep nesting.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = RecursiveArray<number>;
 * // Result: number | number[]
 * ```
 *
 * ### Behavior:
 * - Allows nesting of arrays of any depth.
 * - Each element can either be a single value or another array of the same type.
 */
export type RecursiveArray<T> = T | Array<RecursiveArray<T>>;


/**
 * **FlatRecord** - A type that flattens an object into a single-level object, converting nested keys into dot notation.
 *
 * @template T - The object type to flatten.
 * @template P - The prefix for keys in nested objects (default is an empty string).
 *
 * This type recursively flattens an object, turning any nested keys into a string path using dot notation.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = FlatRecord<{ a: { b: string }, c: number }>;
 * // Result: { 'a.b': string, c: number }
 * ```
 *
 * ### Behavior:
 * - Converts nested object keys into dot-separated strings.
 * - Flattens all nested structures into a single level.
 */
export type FlatRecord<T, P extends string = ''> = { [K in keyof T]: T[K] extends object ? FlatRecord<T[K], `${P}${K & string}.`> : T[K]; };


/**
 * **DotNestedKeys** - A type that generates a union of string paths for all keys of an object, supporting nested objects.
 *
 * @template T - The object type to extract key paths from.
 *
 * This type recursively generates a union of string paths, where each path represents a key in a nested object using dot notation.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = DotNestedKeys<{ a: { b: number }, c: string }>;
 * // Result: 'a' | 'a.b' | 'c'
 * ```
 *
 * ### Behavior:
 * - Generates string paths for all keys, including nested ones.
 * - Supports deep object structures, providing paths in dot notation.
 */
export type DotNestedKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}` | `${K & string}.${DotNestedKeys<T[K]>}`
        : `${K & string}`;
    }[keyof T]
  : never;


/**
 * **DotNestedValue** - A type that extracts the value at a specific dot-notated key path in a nested object.
 *
 * @template T - The object type from which the value will be extracted.
 * @template Path - The dot-notated key path to extract the value from.
 *
 * This type uses a string path to traverse through an object and extract the corresponding value at that path.
 *
 * ### Example Usage:
 *
 * ```typescript
 * type Result = DotNestedValue<{ a: { b: number }, c: string }, 'a.b'>;
 * // Result: number
 * ```
 *
 * ### Behavior:
 * - Traverses a nested object to extract a value at a specific path.
 * - Ensures that the key path exists and matches the correct type.
 */
export type DotNestedValue<T, Path extends string> = 
  Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DotNestedValue<T[Key], Rest>
      : never
    : Path extends keyof T
    ? T[Path]
    : never;
