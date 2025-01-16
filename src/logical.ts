
/**
 * Represents the Left side of an Either type, holding a value of type L.
 * 
 * @interface ILeft
 * @template L - Type of the left value
 * @template A - Type of the right value
 */
export interface ILeft<L, A> {

  /**
   * Readonly property holding the left value.
   */
  readonly value: L;

  /**
   * Checks if the instance is of type Left.
   * 
   * @returns {boolean} True if the instance is Left, false otherwise.
   */
  isLeft(): this is ILeft<L, A>;

  /**
   * Checks if the instance is of type Right.
   * 
   * @returns {boolean} False since this instance is of type Left.
   */
  isRight(): this is IRight<L, A>;
}

/**
 * Represents the Right side of an Either type, holding a value of type A.
 * 
 * @interface IRight
 * @template L - Type of the left value
 * @template A - Type of the right value
 */
export interface IRight<L, A> {

  /**
   * Readonly property holding the right value.
   */
  readonly value: A;

  /**
   * Checks if the instance is of type Left.
   * 
   * @returns {boolean} False since this instance is of type Right.
   */
  isLeft(): this is ILeft<L, A>;

  /**
   * Checks if the instance is of type Right.
   * 
   * @returns {boolean} True if the instance is Right, false otherwise.
   */
  isRight(): this is IRight<L, A>
}


/**
 * Either type representing either a Left or Right instance.
 * 
 * @template L - Type of the left value
 * @template A - Type of the right value
 */
export type Either<L, A> = ILeft<L, A> | IRight<L, A>;
