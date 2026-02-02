/**
 * @a2ui-bridge/react-cre8 - Accordion component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Accordion as Cre8AccordionWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8Accordion = createPermissiveComponent('cre8-accordion', Cre8AccordionWC);

export function Accordion({
  node,
  children,
}: A2UIComponentProps<CustomNode>): JSX.Element {
  return <Cre8Accordion>{children}</Cre8Accordion>;
}
