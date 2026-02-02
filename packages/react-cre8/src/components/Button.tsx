/**
 * @a2ui-bridge/react-cre8 - Button component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild } from '@a2ui-bridge/react';
import { Cre8Button as Cre8ButtonWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8Button = createPermissiveComponent('cre8-button', Cre8ButtonWC);

// Extended properties that may be passed
interface ExtendedButtonProps {
  variant?: { literalString?: string };
  fullWidth?: { literalBoolean?: boolean };
  size?: { literalString?: string };
  disabled?: { literalBoolean?: boolean };
}

export function Button({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ButtonNode>): JSX.Element {
  const { properties } = node;
  const extendedProps = properties as typeof properties & ExtendedButtonProps;

  // Map A2UI variant to cre8 variant
  const variantMap: Record<string, 'primary' | 'secondary' | 'tertiary'> = {
    filled: 'primary',
    primary: 'primary',
    outline: 'secondary',
    secondary: 'secondary',
    subtle: 'tertiary',
    tertiary: 'tertiary',
    default: 'primary',
  };

  const variantStr = extractString(extendedProps.variant) ?? 'primary';
  const variant = variantMap[variantStr] ?? 'primary';

  const fullWidth = extractBoolean(extendedProps.fullWidth) ?? false;
  const disabled = extractBoolean(extendedProps.disabled) ?? false;
  const size = extractString(extendedProps.size) as 'sm' | 'md' | 'lg' | undefined ?? 'md';

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

  // Extract button text from child if it's a Text node
  const child = properties.child;
  let buttonText = 'Button';
  if (child && typeof child === 'object' && 'type' in child) {
    if (child.type === 'Text' && child.properties?.text) {
      buttonText = extractString(child.properties.text) ?? 'Button';
    }
  }

  return (
    <Cre8Button
      variant={variant}
      text={buttonText}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      onClick={handleClick}
    />
  );
}
