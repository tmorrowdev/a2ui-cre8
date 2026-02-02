/**
 * @a2ui-bridge/react-cre8 - Table component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Table as Cre8TableWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8TableComponent = createPermissiveComponent('cre8-table', Cre8TableWC);

export function Table({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const caption = extractString((properties as any).caption) ?? '';
  const striped = extractBoolean((properties as any).striped) ?? false;
  const hoverable = extractBoolean((properties as any).hoverable) ?? false;

  return (
    <Cre8TableComponent
      caption={caption || undefined}
      variant={striped ? 'striped' : undefined}
      isHoverable={hoverable}
    >
      {children}
    </Cre8TableComponent>
  );
}
