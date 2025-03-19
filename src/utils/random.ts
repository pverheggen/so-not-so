import Prando from 'prando';

let prando = new Prando();

export const reseed = (seed: number) => {
  prando = new Prando(seed);
};

export const random = () => prando.next(0, 1);

export const randomInt = (min: number, max: number) => prando.nextInt(min, max);

export const randomElement = <T>(arr: T[]): T => prando.nextArrayItem(arr);
