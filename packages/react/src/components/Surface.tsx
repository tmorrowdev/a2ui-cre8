/**
 * @a2ui-bridge/react - Surface component
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { UserAction } from '@a2ui-bridge/core';
import type { ReactA2uiMessageProcessor } from '../processor.js';
import { useComponentTree } from '../hooks.js';
import { Root } from './Root.js';
import type { ComponentMapping } from '../types.js';

export interface SurfaceProps {
  /** The message processor instance */
  processor: ReactA2uiMessageProcessor;
  /** The surface ID to render */
  surfaceId?: string;
  /** Mapping of component types to React components */
  components: ComponentMapping;
  /** Handler for user actions */
  onAction: (action: UserAction) => void;
  /** Optional className for the container */
  className?: string;
}

/**
 * Surface component that renders an A2UI surface.
 * This connects the processor to the Root renderer.
 */
export function Surface({
  processor,
  surfaceId = '@default',
  components,
  onAction,
  className,
}: SurfaceProps): JSX.Element {
  const tree = useComponentTree(processor, surfaceId);

  return (
    <div className={className} data-a2ui-surface={surfaceId}>
      <Root
        tree={tree}
        components={components}
        onAction={onAction}
        surfaceId={surfaceId}
      />
    </div>
  );
}
