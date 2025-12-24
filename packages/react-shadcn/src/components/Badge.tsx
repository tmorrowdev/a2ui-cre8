/**
 * @a2ui-bridge/react-shadcn - Badge component
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { BadgeNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

const variantClasses: Record<string, string> = {
  primary: 'border-transparent bg-primary text-primary-foreground',
  success: 'border-transparent bg-green-500 text-white',
  warning: 'border-transparent bg-yellow-500 text-black',
  danger: 'border-transparent bg-red-500 text-white',
  neutral: 'border-transparent bg-secondary text-secondary-foreground',
};

export function Badge({ node }: A2UIComponentProps<BadgeNode>): JSX.Element {
  const theme = useTheme();
  const { properties } = node;

  const text = properties.text.literalString ?? properties.text.literal ?? '';
  const variant = properties.variant ?? 'neutral';

  const className = cn(
    classesToString(theme.components.Badge),
    variantClasses[variant] ?? variantClasses.neutral
  );

  return <span className={className}>{text}</span>;
}
