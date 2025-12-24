/**
 * @a2ui-bridge/react-shadcn - Text component
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { TextNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Text({ node }: A2UIComponentProps<TextNode>): JSX.Element {
  const theme = useTheme();
  const { properties } = node;
  const usageHint = properties.usageHint || 'body';

  // Get theme classes for the usage hint
  const themeClasses = theme.components.Text[usageHint] ?? theme.components.Text.all;
  const className = cn(classesToString(themeClasses));

  // Get the text content
  const text = properties.text.literalString ?? properties.text.literal ?? '';

  // Render appropriate element based on usage hint
  switch (usageHint) {
    case 'h1':
      return <h1 className={className}>{text}</h1>;
    case 'h2':
      return <h2 className={className}>{text}</h2>;
    case 'h3':
      return <h3 className={className}>{text}</h3>;
    case 'h4':
      return <h4 className={className}>{text}</h4>;
    case 'h5':
      return <h5 className={className}>{text}</h5>;
    case 'caption':
      return <span className={className}>{text}</span>;
    case 'body':
    default:
      return <p className={className}>{text}</p>;
  }
}
