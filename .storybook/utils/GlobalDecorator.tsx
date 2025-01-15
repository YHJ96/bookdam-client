import React, { useEffect } from 'react';

import type { Decorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';

import { font } from '../../src/shared/libs/font';

const GlobalDecorator: Decorator = (Story) => {
  const isDark = useDarkMode();
  const theme = isDark ? themes.dark.appBg : themes.light.appBg;
  const $body = document.body;
  $body.style.background = theme;

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
  }, []);

  return (
    <div className={font.className}>
      <Story />
    </div>
  );
};

export default GlobalDecorator;
