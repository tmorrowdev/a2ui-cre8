/**
 * @a2ui-bridge/react-cre8 - Image component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ImageNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { extractString, cn } from '../utils.js';

const imageTypeClasses: Record<string, string> = {
  icon: 'cre8-image--icon',
  avatar: 'cre8-image--avatar',
  header: 'cre8-image--header',
  largeFeature: 'cre8-image--large-feature',
  mediumFeature: 'cre8-image--medium-feature',
  smallFeature: 'cre8-image--small-feature',
};

const imageFitStyles: Record<string, React.CSSProperties['objectFit']> = {
  contain: 'contain',
  cover: 'cover',
  fill: 'fill',
  none: 'none',
  'scale-down': 'scale-down',
};

export function Image({ node }: A2UIComponentProps<ImageNode>): JSX.Element {
  const { properties } = node;

  const src = extractString(properties.url) ?? '';
  const usageHint = properties.usageHint ?? 'mediumFeature';
  const fit = properties.fit ?? 'cover';

  const className = cn('cre8-image', imageTypeClasses[usageHint]);

  const style: React.CSSProperties = {
    objectFit: imageFitStyles[fit],
  };

  return (
    <img
      src={src}
      alt=""
      className={className}
      style={style}
    />
  );
}
