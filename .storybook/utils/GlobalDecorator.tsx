import React from 'react';

import type { Decorator } from '@storybook/react';

import { font } from '../../src/shared/libs/font';

const GlobalDecorator: Decorator = (Story) => {
  return (
    <div className={font.className}>
      <Story />
    </div>
  );
};

export default GlobalDecorator;
