import { useCallback, useEffect, useRef } from "react";

export function useAbortController() {
  const controllerRef = useRef<AbortController | null>(null);

  const renew = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  }, []);

  useEffect(() => () => controllerRef.current?.abort(), []);

  return renew;
}
