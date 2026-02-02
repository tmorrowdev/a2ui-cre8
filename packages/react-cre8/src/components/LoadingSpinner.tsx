/**
 * @a2ui-bridge/react-cre8 - LoadingSpinner component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8LoadingSpinner as Cre8LoadingSpinnerWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8LoadingSpinner = createPermissiveComponent('cre8-loading-spinner', Cre8LoadingSpinnerWC);

export function LoadingSpinner({ node }: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  // Map size values - cre8 only supports 'small' | 'large'
  const sizeStr = extractString(properties.size);
  const sizeMap: Record<string, 'small' | 'large'> = {
    small: 'small',
    sm: 'small',
    medium: 'large', // Map medium to large
    md: 'large',
    large: 'large',
    lg: 'large',
  };
  const size = sizeStr ? sizeMap[sizeStr] ?? 'large' : 'large';

  return <Cre8LoadingSpinner size={size} />;
}
