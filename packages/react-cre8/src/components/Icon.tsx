/**
 * @a2ui-bridge/react-cre8 - Icon component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { IconNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Icon as Cre8IconWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Icon = createPermissiveComponent('cre8-icon', Cre8IconWC);

export function Icon({ node }: A2UIComponentProps<IconNode>): JSX.Element {
  const { properties } = node;

  const name = extractString(properties.name) ?? '';

  return <Cre8Icon svg={name} />;
}
