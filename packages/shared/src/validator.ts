export type Check<T> = (value: unknown) => value is T;
export type CheckOf<Q> = Q extends Check<infer T> ? T : never;

const number: Check<number> = ((value) =>
  typeof value === "number") as Check<number>;

const string: Check<string> = ((value) =>
  typeof value === "string") as Check<string>;

const boolean: Check<boolean> = ((value) =>
  typeof value === "boolean") as Check<boolean>;

const object: Check<object> = ((value) =>
  typeof value === "object") as Check<object>;

const undefined: Check<undefined> = ((value) =>
  typeof value === "undefined") as Check<undefined>;

/**
 * Composes a function that returns `true` if provided with a value that
 * matches the provided interface.
 */
function iface<T extends { [K: string]: Check<any> }>(
  checks: T
): Check<{ [K in keyof T]: CheckOf<T[K]> }> {
  return ((value) => {
    if (value && typeof value === "object") {
      for (let key in checks) {
        const inner = (value as any)[key as string];

        if (!checks[key](inner)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }) as Check<{ [K in keyof T]: CheckOf<T[K]> }>;
}

/**
 * Composes a function that returns `true` if provided with a value that passes
 * two checks.
 */
function and<A, B>(a: Check<A>, b: Check<B>): Check<A & B> {
  return ((value) => {
    return a(value) && b(value);
  }) as Check<A & B>;
}

/**
 * Composes a function that returns `true` if the provided value is undefined
 * or passes a given check.
 */
function optional<T>(check: Check<T>): Check<T | undefined> {
  return ((value) => {
    return typeof value === "undefined" || check(value);
  }) as Check<T | undefined>;
}

/**
 * Composes a function that returns `true` if the provided value is undefined
 * or passes a given check.
 */
 function array<T>(check: Check<T>): Check<Array<T>> {
  return ((value) => {
    if (!Array.isArray(value))
      return false;
    for (const item in value) {
      if (!check(item))
        return false;
    }
    return true;
  }) as Check<Array<T>>;
}

/**
 * Utilities for validating the schema an arbitrary type at runtime.
 */
export const v = {
  number,
  string,
  object,
  undefined,
  iface,
  and,
  optional,
  boolean,
  array,
};
