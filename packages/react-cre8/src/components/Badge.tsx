/**
 * @a2ui-bridge/react-cre8 - Badge component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { BadgeNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Badge as Cre8BadgeWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Badge = createPermissiveComponent('cre8-badge', Cre8BadgeWC);

export function Badge({ node }: A2UIComponentProps<BadgeNode>): JSX.Element {
  const { properties } = node;

  const text = extractString(properties.text) ?? '';

  return <Cre8Badge />;
}
