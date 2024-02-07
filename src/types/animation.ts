import { IStyleProps } from 'utils';

export interface IAnimation extends IStyleProps {
  duration: number;
}

export type AnimationLike = IAnimation | false | undefined;

export interface IUseAnimationReturn {
  isPlaying: boolean;
  play: (animations: AnimationLike[]) => Promise<void>;
  styles: (IStyleProps | undefined)[];
}
