/**
 * @a2ui-bridge/react-shadcn - Button component
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Button({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ButtonNode>): JSX.Element {
  const theme = useTheme();
  const { properties } = node;
  const className = cn(classesToString(theme.components.Button));

  const handleClick = () => {
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: properties.action.context?.reduce(
          (acc, item) => {
            acc[item.key] =
              item.value.literalString ??
              item.value.literalNumber ??
              item.value.literalBoolean;
            return acc;
          },
          {} as Record<string, unknown>
        ),
      });
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {renderChild(properties.child, components, onAction, surfaceId)}
    </button>
  );
}
