export class Option<T> {
  private readonly value: T | null

  private constructor(value?: T | null | undefined) {
    this.value = value === undefined ? null : value
  }

  /** Returns an option with the specified value. */
  static of = <T>(value: T | null | undefined): Option<T> => new Option(value)

  /** Returns an empty option. */
  static none = <T>(): Option<T> => new Option<T>()

  /** Tests whether the option is empty. */
  isEmpty = (): boolean => this.value === null

  /** Returns true if the option is defined, false otherwise. */
  isDefined = (): boolean => !this.isEmpty()

  /** Returns the option’s value if the option is nonempty, otherwise throws an error. */
  getOrThrow = (): T => {
    if (this.value === null) {
      throw new Error("Option is empty.")
    }
    return this.value
  }

  /** Returns the option’s value if the option is nonempty, otherwise return the result of evaluating default. */
  getOrElse = <U extends T>(elseValue: U): T => (this.value !== null ? this.value : elseValue)

  /** Returns this option if it is nonempty, otherwise return the result of evaluating alternative. */
  // @ts-ignore
  orElse = (elseOption: Option<T>): Option<T> => (this.value !== null ? Option.of(this.value) : elseOption)

  /** Returns the option’s value if it is nonempty, or null if it is empty. */
  orNull = (): T | null => (this.value !== null ? this.value : null)

  /** Returns the option’s value if it is nonempty, or undefined if it is empty. */
  orUndefined = (): T | undefined => (this.value !== null ? this.value : undefined)

  /** Returns an option containing the result of applying f to this option’s value if this option is nonempty. */
  map = <U>(f: (value: T) => U): Option<U> => (this.value !== null ? Option.of<U>(f(this.value)) : Option.none<U>())

  /**
   * Returns this option if it is nonempty and applying the predicate p to this option’s value returns true.
   * Otherwise, return None.
   */
  filter = (p: (value: T) => boolean): Option<T> =>
    this.value !== null ? Option.of<T>(p(this.value) ? this.value : null) : Option.none<T>()

  /** Returns true if this option is nonempty and the predicate p returns true when applied to this option’s value. */
  exists = (p: (value: T) => boolean): boolean => (this.value !== null ? p(this.value) : false)

  /** Tests whether the option contains a given value as an element. */
  contains = (value: T): boolean => this.value === value

  /** Apply the given procedure f to the option’s value, if it is nonempty. Otherwise, do nothing. */
  forEach = (f: (value: T) => void): void => {
    if (this.value !== null) {
      f(this.value)
    }
  }

  /** Returns the result of applying f to this Option’s value if this scala.Option is nonempty. */
  flatMap = <U>(f: (value: T) => Option<U>): Option<U> => this.map(f).getOrElse(Option.none<U>())

  /** Returns an option for a value's subtype. */
  safeAsSubtype = <U>(): Option<T extends U ? U : T> => this.map<T extends U ? U : T>(v => v as T extends U ? U : T)
}
