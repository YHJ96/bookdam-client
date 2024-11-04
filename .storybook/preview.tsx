import React from 'react';

import type { Preview } from '@storybook/react';

import '../src/app/globals.css';
import { font } from '../src/shared/libs';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <div className={font.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
