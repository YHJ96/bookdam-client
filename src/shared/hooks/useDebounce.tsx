import { useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(callback: T, time: number) => {
  const id = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (...args: Parameters<T>) => {
    if (id.current) clearTimeout(id.current);
    id.current = setTimeout(() => callback(...args), time);
  };

  return { debounce };
};
