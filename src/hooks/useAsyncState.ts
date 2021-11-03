import { useEffect, useState } from "react";

export function useAsyncState<T>(
  initialState: T,
  asyncGetter: () => Promise<T> | undefined,
  localStorageKey?: string | undefined
): [T, () => void] {
  const [state, setState] = useState<T>(initialState);
  const [dirty, setDirty] = useState<boolean>(true);
  useEffect(() => {
    if (localStorageKey) {
      const localStorageValue = localStorage.getItem(localStorageKey);
      if (localStorageValue) {
        setState(JSON.parse(localStorageValue));
      }
    }

    asyncGetter()
      ?.then((v) => {
        setState(v);
        if (localStorageKey) {
          localStorage.setItem(localStorageKey, JSON.stringify(v));
        }
        setDirty(false);
      })
      .catch(console.warn);
  }, [asyncGetter, dirty, localStorageKey]);

  const refetch = () => {
    setDirty(true);
  };

  return [state, refetch];
}
