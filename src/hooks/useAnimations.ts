import { useState } from 'react';
import { AnimationLike, IUseAnimationReturn } from 'types';
import { IStyleProps } from 'utils';
import { useTimeout } from './useTimeout';

interface IAnimationState {
  resolve?: () => void;
  styles?: (IStyleProps | undefined)[];
  timeout: number;
}

const defaultState: IAnimationState = { timeout: 0 };

export const useAnimations = (): IUseAnimationReturn => {
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

  const play = async (animations: AnimationLike[]) => {
    if (isPlaying) return;
    const styles: (IStyleProps | undefined)[] = [];
    let totalDelay = 0;
    animations.forEach((animation) => {
      if (!animation) {
        styles.push(undefined);
        return;
      }
      const { duration, styleVars, ...s } = animation;
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
