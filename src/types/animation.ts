import { IStyleProps } from 'utils';

export interface IAnimation extends IStyleProps {
  duration: number;
}

export interface IUseAnimationReturn {
  isPlaying: boolean;
  play: () => Promise<void>;
  styles: IStyleProps[];
}
