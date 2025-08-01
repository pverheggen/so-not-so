export interface IUseAnimationReturn<TStyleOverride> {
  isPlaying: boolean;
  play: (duration: number, overrides: TStyleOverride) => Promise<void>;
  overrides?: TStyleOverride;
}
