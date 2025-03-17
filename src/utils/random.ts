import Prando from 'prando';

const prando = new Prando(3);

export const random = () => prando.next(0, 1);

export const randomInt = (min: number, max: number) => prando.nextInt(min, max);

export const randomElement = <T>(arr: T[]): T => prando.nextArrayItem(arr);
