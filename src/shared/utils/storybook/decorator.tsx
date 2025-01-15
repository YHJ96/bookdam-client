import React from 'react';

import type { Decorator } from '@storybook/react';

export const decorator = <T extends unknown>(css: React.CSSProperties): Decorator<T> => {
  const Component: Decorator<T> = (Story) => {
    return (
      <div style={css}>
        <Story />
      </div>
    );
  };

  return Component;
};
