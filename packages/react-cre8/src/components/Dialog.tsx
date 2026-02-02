/**
 * @a2ui-bridge/react-cre8 - Dialog component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Modal as Cre8ModalWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8ModalComponent = createPermissiveComponent('cre8-modal', Cre8ModalWC, {
  onCloseModal: 'close-modal',
});

export function Dialog({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const open = extractBoolean(props.open) ?? false;
  const ariaLabel = extractString(props.ariaLabel) ?? title;

  const handleClose = () => {
    if (props.onClose?.name) {
      onAction({
        actionName: props.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!open) return <></>;

  return (
    <Cre8ModalComponent
      isActive={open}
      utilityModalTitle={title}
      aria-label={ariaLabel}
      onCloseModal={handleClose}
    >
      {children}
    </Cre8ModalComponent>
  );
}
