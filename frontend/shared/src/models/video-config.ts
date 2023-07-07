export interface VideoConfig {
  readonly onPlay?: () => void
  readonly onPause?: () => void
  readonly onEnded?: () => void
  readonly onFullscreenEntered?: () => void
  readonly onFullscreenLeft?: () => void
}
