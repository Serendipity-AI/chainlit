export {};

/**
 * Enables using the findLast method on arrays.
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH0_DOMAIN: string;
      NODE_ENV: 'development' | 'production';
      AUTH0_CLIENT_ID: string;
    }
  }
  interface Array<T> {
    findLast(
      predicate: (value: T, index: number, array: T[]) => unknown,
      thisArg?: any
    ): T | undefined;
  }
}
