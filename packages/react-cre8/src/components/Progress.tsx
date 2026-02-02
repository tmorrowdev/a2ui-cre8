/**
 * @a2ui-bridge/react-cre8 - Progress component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8ProgressMeter as Cre8ProgressMeterWC } from '@tmorrow/cre8-wc/cdn';
import { extractNumber, extractString, createPermissiveComponent } from '../utils.js';

const Cre8ProgressMeterComponent = createPermissiveComponent('cre8-progress-meter', Cre8ProgressMeterWC);

export function Progress({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const value = extractNumber((properties as any).value) ?? 0;
  const max = extractNumber((properties as any).max) ?? 100;
  const label = extractString((properties as any).label) ?? '';

  return (
    <Cre8ProgressMeterComponent
      value={value}
      max={max}
      label={label}
    />
  );
}
