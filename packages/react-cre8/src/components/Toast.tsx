/**
 * @a2ui-bridge/react-cre8 - Toast component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8InlineAlert as Cre8InlineAlertWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8InlineAlertComponent = createPermissiveComponent('cre8-inline-alert', Cre8InlineAlertWC);

export function Toast({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const description = extractString(props.description) ?? extractString(props.message) ?? '';
  const variant = extractString(props.variant) ?? 'info';

  const variantMap: Record<string, 'error' | 'warning' | 'success' | 'info'> = {
    error: 'error',
    destructive: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info',
    default: 'info',
  };

  return (
    <Cre8InlineAlertComponent status={variantMap[variant] ?? 'info'}>
      {title && <strong>{title}</strong>}
      {title && description && ' '}
      {description}
    </Cre8InlineAlertComponent>
  );
}
