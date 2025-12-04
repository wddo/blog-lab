import { useCallback, useRef } from "react";

/**
 * 디바운스 훅
 * @param callback 디바운스할 콜백 함수
 * @param delay 디바운스 지연 시간 (ms)
 */
export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
): (...args: Args) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
