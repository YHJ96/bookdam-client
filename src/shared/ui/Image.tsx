'use client';

import React, { useState } from 'react';

import type { ImageProps } from 'next/image';
import NextImage from 'next/image';

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ className, ...props }, ref) => {
  const [src, setSrc] = useState<typeof props.src>(props.src);

  const handleOnError = () => setSrc('https://github.com/yhj96.png');

  return <NextImage ref={ref} {...props} src={src} onError={handleOnError} />;
});
Image.displayName = 'Image';

export { Image };
