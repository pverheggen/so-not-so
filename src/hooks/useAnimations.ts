import { useState } from 'preact/hooks';
import { IUseAnimationReturn } from 'types';
import { useTimeout } from './useTimeout';

interface IAnimationState<TStyleOverride> {
  resolve?: () => void;
  overrides?: TStyleOverride;
  timeout: number;
}

const defaultState = { timeout: 0 };

export const useAnimations = <
  TStyleOverride,
>(): IUseAnimationReturn<TStyleOverride> => {
  const [state, setState] =
    useState<IAnimationState<TStyleOverride>>(defaultState);
  const { resolve, overrides, timeout } = state;
  const isPlaying = !!resolve;
  useTimeout(
    () => {
      resolve?.();
      setState(defaultState);
    },
    isPlaying,
    timeout,
  );

  const play = async (duration: number, overrides: TStyleOverride) => {
    if (isPlaying) return;
    return new Promise<void>((resolve) => {
      setState({
        resolve,
        overrides,
        timeout: duration,
      });
    });
  };
  return {
    isPlaying,
    play,
    overrides,
  };
};
