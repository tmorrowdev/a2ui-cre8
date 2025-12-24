/**
 * @a2ui-bridge/react - Root component for rendering A2UI trees
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { AnyComponentNode, UserAction } from '@a2ui-bridge/core';
import type { ComponentMapping, A2UIComponentProps } from '../types.js';

export interface RootProps {
  /** The component tree to render */
  tree: AnyComponentNode | null;
  /** Mapping of component types to React components */
  components: ComponentMapping;
  /** Handler for user actions */
  onAction: (action: UserAction) => void;
  /** The surface ID */
  surfaceId?: string;
}

/**
 * Root component that recursively renders an A2UI component tree.
 * This is design-system-agnostic - it uses the provided component mapping.
 */
export function Root({
  tree,
  components,
  onAction,
  surfaceId = '@default',
}: RootProps): JSX.Element | null {
  if (!tree) {
    return null;
  }

  return (
    <RenderNode
      node={tree}
      components={components}
      onAction={onAction}
      surfaceId={surfaceId}
    />
  );
}

interface RenderNodeProps {
  node: AnyComponentNode;
  components: ComponentMapping;
  onAction: (action: UserAction) => void;
  surfaceId: string;
}

/**
 * Internal component that renders a single node.
 */
function RenderNode({
  node,
  components,
  onAction,
  surfaceId,
}: RenderNodeProps): JSX.Element | null {
  const props: A2UIComponentProps = {
    node,
    onAction,
    components,
    surfaceId,
  };

  const Component = components[node.type as keyof ComponentMapping];

  if (Component) {
    // @ts-expect-error - TypeScript can't infer the exact node type here
    return <Component {...props} />;
  }

  // Try custom component fallback
  if (components.Custom) {
    // @ts-expect-error - Using custom fallback
    return <components.Custom {...props} />;
  }

  // No component found, render nothing
  console.warn(`No component found for type: ${node.type}`);
  return null;
}

/**
 * Helper function to render children nodes.
 * Use this in your component implementations.
 */
export function renderChildren(
  children: (AnyComponentNode | null)[],
  components: ComponentMapping,
  onAction: (action: UserAction) => void,
  surfaceId: string
): JSX.Element[] {
  return children
    .filter((child): child is AnyComponentNode => child !== null)
    .map((child) => (
      <RenderNode
        key={child.id}
        node={child}
        components={components}
        onAction={onAction}
        surfaceId={surfaceId}
      />
    ));
}

/**
 * Helper function to render a single child node.
 * Use this in your component implementations.
 */
export function renderChild(
  child: AnyComponentNode | null | undefined,
  components: ComponentMapping,
  onAction: (action: UserAction) => void,
  surfaceId: string
): JSX.Element | null {
  if (!child) {
    return null;
  }

  return (
    <RenderNode
      node={child}
      components={components}
      onAction={onAction}
      surfaceId={surfaceId}
    />
  );
}
