/* eslint-disable @typescript-eslint/no-explicit-any */
type Fn<A, B> = (a: A) => B;

type ChainFunction = {
  <A, B, C>(a2b: Fn<A, B>, b2c: Fn<B, C>): Fn<A, C>;
  <A, B, C, D>(a2b: Fn<A, B>, b2c: Fn<B, C>, c2d: Fn<C, D>): Fn<A, D>;
  <A, B, C, D, E>(
    a2b: Fn<A, B>,
    b2c: Fn<B, C>,
    c2d: Fn<C, D>,
    d2e: Fn<D, E>,
  ): Fn<A, E>;
};

export const chain: ChainFunction = (...fns: any[]) => {
  return (a: any) => fns.reduce((prev, fn) => fn(prev), a);
};
