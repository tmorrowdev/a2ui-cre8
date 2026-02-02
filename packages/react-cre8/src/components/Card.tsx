/**
 * @a2ui-bridge/react-cre8 - Card component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CardNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild, renderChildren } from '@a2ui-bridge/react';
import { Cre8Card as Cre8CardWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8Card = createPermissiveComponent('cre8-card', Cre8CardWC);

export function Card({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<CardNode>): JSX.Element {
  const { properties } = node;

  return (
    <Cre8Card>
      {properties.child && renderChild(properties.child, components, onAction, surfaceId)}
      {properties.children && renderChildren(properties.children, components, onAction, surfaceId)}
    </Cre8Card>
  );
}
