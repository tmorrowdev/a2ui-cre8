/**
 * @a2ui-bridge/react-cre8 - Link component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8TextLink as Cre8TextLinkWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8TextLinkComponent = createPermissiveComponent('cre8-text-link', Cre8TextLinkWC);

export function Link({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const href = extractString((properties as any).href) ?? '#';
  const text = extractString((properties as any).text) ?? '';

  return (
    <Cre8TextLinkComponent href={href}>
      {text || children}
    </Cre8TextLinkComponent>
  );
}
