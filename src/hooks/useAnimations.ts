import { useState } from 'react';
import { IAnimation, IUseAnimationReturn } from 'types';
import { IStyleProps } from 'utils';
import { useTimeout } from './useTimeout';

interface IAnimationState {
  resolve?: () => void;
  styles?: IStyleProps[];
  timeout: number;
}

const defaultState: IAnimationState = { timeout: 0 };

export const useAnimations = (
  animations: IAnimation[],
): IUseAnimationReturn => {
  const [state, setState] = useState<IAnimationState>(defaultState);
  const { resolve, styles, timeout } = state;
  const isPlaying = !!resolve;
  useTimeout(
    () => {
      resolve?.();
      setState(defaultState);
    },
    isPlaying,
    timeout,
  );

  const play = async () => {
    if (isPlaying) return;
    const styles: IStyleProps[] = [];
    let totalDelay = 0;
    animations.forEach(({ duration, styleVars, ...s }) => {
      styles.push({
        ...s,
        styleVars: {
          ...styleVars,
          del: `${totalDelay}ms`,
          dur: `${duration}ms`,
        },
      });
      totalDelay += duration;
    });
    return new Promise<void>((resolve) => {
      setState({
        resolve,
        styles,
        timeout: totalDelay,
      });
    });
  };
  return {
    isPlaying,
    play,
    styles: styles ?? [],
  };
};
