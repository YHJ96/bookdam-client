type MutationMeta = {
  isThrowError?: boolean;
};

// https://github.com/TanStack/query/discussions/6045
declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export {};
