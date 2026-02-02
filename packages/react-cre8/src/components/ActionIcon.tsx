/**
 * @a2ui-bridge/react-cre8 - ActionIcon component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Button as Cre8ButtonWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8Button = createPermissiveComponent('cre8-button', Cre8ButtonWC);

interface ExtendedActionIconProps {
  variant?: { literalString?: string };
  iconName?: { literalString?: string };
  disabled?: { literalBoolean?: boolean };
}

export function ActionIcon({
  node,
  onAction,
}: A2UIComponentProps<ButtonNode>): JSX.Element {
  const { properties } = node;
  const extendedProps = properties as typeof properties & ExtendedActionIconProps;

  const variant = extractString(extendedProps.variant) ?? 'primary';
  const iconName = extractString(extendedProps.iconName);
  const disabled = extractBoolean(extendedProps.disabled) ?? false;

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
    <Cre8Button
      iconOnly={true}
      variant={variant}
      iconName={iconName}
      disabled={disabled}
      onClick={handleClick}
    />
  );
}
