/**
 * @a2ui-bridge/react-cre8 - Avatar component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import type { JSX } from 'react';
import { extractString, extractNumber } from '../utils.js';

export function Avatar({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const src = extractString(props.src);
  const alt = extractString(props.alt) ?? '';
  const fallback = extractString(props.fallback) ?? '';
  const size = extractNumber(props.size) ?? 40;

  const style: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--cre8-color-background-secondary, #e5e7eb)',
    color: 'var(--cre8-color-text-primary, #374151)',
    fontWeight: 500,
    fontSize: `${size * 0.4}px`,
  };

  if (src) {
    return (
      <span style={style}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </span>
    );
  }

  return <span style={style}>{fallback.slice(0, 2).toUpperCase()}</span>;
}
