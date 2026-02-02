/**
 * @a2ui-bridge/react-cre8 - Fallback component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';

/**
 * Fallback component for unknown component types.
 */
export function Fallback({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const componentType = node.type ?? 'Unknown';

  return (
    <div style={{
      border: '2px dashed #f59e0b',
      borderRadius: '4px',
      padding: '12px',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
    }}>
      <div style={{
        fontSize: '12px',
        color: '#d97706',
        marginBottom: '8px',
        fontFamily: 'monospace',
      }}>
        ⚠️ Unknown component: <code style={{
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          padding: '2px 4px',
          borderRadius: '2px',
        }}>{componentType}</code>
      </div>
      {children && <div style={{ marginTop: '8px' }}>{children}</div>}
      <details style={{ marginTop: '8px', fontSize: '12px' }}>
        <summary style={{ cursor: 'pointer', color: '#6b7280' }}>
          Component data
        </summary>
        <pre style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '11px',
          overflow: 'auto',
          maxHeight: '160px',
        }}>
          {JSON.stringify(node, null, 2)}
        </pre>
      </details>
    </div>
  );
}
