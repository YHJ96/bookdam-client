'use client';

import React, { useState } from 'react';

type List = Array<{
  key: string;
  component: React.FC<any>;
  props: object;
  resolve: (value: any) => void;
}>;

type InferPromiseResolve<T> = T extends { resolve: (arg: infer A) => any } ? A : never;
type PromiseResolve<T extends React.ComponentProps<any>> = Promise<InferPromiseResolve<T>>;

function useDialogContoller() {
  const [list, setList] = useState<List>([]);

  const top = () => list[list.length - 1];

  const push = <T extends React.FunctionComponent<any>, P = React.ComponentProps<T>>(
    component: T,
    props: Omit<P, 'resolve'>,
  ): PromiseResolve<P> => {
    const key = uniqueKey();

    return new Promise((resolve) => {
      setList((prev) => {
        const result = [...prev];
        result.push({ key, component, props, resolve });
        return result;
      });
    });
  };

  const pop = () => {
    setList((prev) => {
      const result = [...prev];
      result.pop();
      return result;
    });
  };

  const uniqueKey = () => {
    while (true) {
      const key = (Math.random() * 10000).toString();
      const idx = list.findIndex((item) => item.key === key);
      if (idx === -1) return key;
    }
  };

  return { push, pop, top };
}

export default useDialogContoller;
