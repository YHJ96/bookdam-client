'use client';

import React from 'react';

import type { ImageProps } from 'next/image';
import NextImage from 'next/image';

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ className, ...props }, ref) => {
  return <NextImage ref={ref} {...props} />;
});
Image.displayName = 'Image';

export { Image };
