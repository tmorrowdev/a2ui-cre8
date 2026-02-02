/**
 * @a2ui-bridge/react-cre8 - Skeleton component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8SkeletonLoader as Cre8SkeletonLoaderWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8SkeletonLoaderComponent = createPermissiveComponent('cre8-skeleton-loader', Cre8SkeletonLoaderWC);

export function Skeleton({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const width = extractString((properties as any).width) ?? '100%';
  const height = extractString((properties as any).height) ?? '1rem';

  return (
    <Cre8SkeletonLoaderComponent
      style={{ width, height, display: 'block' }}
    />
  );
}
