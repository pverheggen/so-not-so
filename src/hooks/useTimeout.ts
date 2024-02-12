import { useEffect } from 'preact/hooks';

export const useTimeout = (
  handler: () => void,
  enabled: boolean,
  timeout?: number,
) => {
  useEffect(() => {
    if (enabled) {
      const timeoutId = setTimeout(handler, timeout);
      return () => {
        clearInterval(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};
