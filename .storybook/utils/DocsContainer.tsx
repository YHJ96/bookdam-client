import React, { useEffect, useState } from 'react';

import type { DocsContainerProps } from '@storybook/blocks';
import { DocsContainer as Container } from '@storybook/blocks';
import { addons } from '@storybook/preview-api';
import { themes } from '@storybook/theming';

const DocsContainer: React.FC<DocsContainerProps> = ({ ...props }) => {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark'));
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    const chan = addons.getChannel();
    chan.on('DARK_MODE', setIsDark);
    return () => chan.off('DARK_MODE', setIsDark);
  }, []);

  return <Container {...props} theme={theme} />;
};

export default DocsContainer;
