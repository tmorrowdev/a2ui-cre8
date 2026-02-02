/**
 * @a2ui-bridge/react-cre8 - Hero component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import { Cre8Hero as Cre8HeroWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8Hero = createPermissiveComponent('cre8-hero', Cre8HeroWC);

export function Hero({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const children = properties.children as any[] | undefined;

  return (
    <Cre8Hero>
      {children && renderChildren(children, components, onAction, surfaceId)}
    </Cre8Hero>
  );
}
