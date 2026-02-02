/**
 * @a2ui-bridge/react-cre8 - Title component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Heading as Cre8HeadingWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractNumber, createPermissiveComponent } from '../utils.js';

const Cre8HeadingComponent = createPermissiveComponent('cre8-heading', Cre8HeadingWC);

export function Title({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const text = extractString((properties as any).text) ?? '';
  const level = extractNumber((properties as any).level) ?? 2;

  return (
    <Cre8HeadingComponent type={`h${level}` as any}>
      {text || children}
    </Cre8HeadingComponent>
  );
}
