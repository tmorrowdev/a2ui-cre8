/**
 * @a2ui-bridge/react-cre8 - Sheet component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Sheet({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const title = extractString(props.title) ?? '';
  const open = extractBoolean(props.open) ?? false;
  const side = extractString(props.side) ?? 'right';

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

  const positionStyles: Record<string, React.CSSProperties> = {
    left: { left: 0, top: 0, bottom: 0, width: '320px' },
    right: { right: 0, top: 0, bottom: 0, width: '320px' },
    top: { top: 0, left: 0, right: 0, height: '320px' },
    bottom: { bottom: 0, left: 0, right: 0, height: '320px' },
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const sheetStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 51,
    backgroundColor: 'var(--cre8-color-background-primary, white)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '1.5rem',
    overflow: 'auto',
    ...positionStyles[side],
  };

  return (
    <>
      <div style={overlayStyle} onClick={handleClose} />
      <div role="dialog" aria-modal="true" style={sheetStyle}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', fontWeight: 600 }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  );
}
