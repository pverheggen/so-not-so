import { FigureGenerator, Rule, PuzzleGenerator } from 'types';

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

export const map = <A, B>(mapper: Fn<A, B>): Fn<A[], B[]> => {
  return (a) => a.map(mapper);
};

export const count = (array: any[]): number => array.filter((a) => !!a).length;

export const combine =
  <TProps, TData>(
    generator: FigureGenerator<TProps, TData>,
    props: TProps,
    rule: Rule<TData>,
  ): PuzzleGenerator =>
  () => {
    const { svg, data } = generator(props);
    const pass = rule(data);
    return { svg, pass };
  };
