/**
 * @a2ui-bridge/react-cre8 - Collapsible component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import React, { useState } from 'react';
import { extractString, extractBoolean } from '../utils.js';

export function Collapsible({
  node,
  children,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const title = extractString((properties as any).title) ?? '';
  const initialOpen = extractBoolean((properties as any).open) ?? false;

  const [isOpen, setIsOpen] = useState(initialOpen);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    cursor: 'pointer',
    backgroundColor: 'var(--cre8-color-background-secondary, #f9fafb)',
    borderRadius: '0.375rem',
    fontWeight: 500,
  };

  const contentStyle: React.CSSProperties = {
    paddingTop: isOpen ? '0.75rem' : 0,
    maxHeight: isOpen ? '1000px' : 0,
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, padding-top 0.3s ease',
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
