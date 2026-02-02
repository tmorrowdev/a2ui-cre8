/**
 * @a2ui-bridge/react-cre8 - Utility functions
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode, DataValue } from '@a2ui-bridge/core';
import { createComponent } from '@lit/react';
import React from 'react';

/**
 * Permissive React component type that accepts any props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PermissiveComponent = React.ComponentType<any>;

/**
 * Create a permissive React wrapper for a web component.
 * This bypasses strict type checking from @lit/react createComponent.
 */
export function createPermissiveComponent(
  tagName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementClass: any,
  events?: Record<string, string>
): PermissiveComponent {
  return createComponent({
    react: React,
    tagName,
    elementClass,
    events,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

/**
 * Extract a string value from A2UI DataValue types.
 */
export function extractString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'literalString' in value) {
    return (value as { literalString: string }).literalString;
  }
  return undefined;
}

/**
 * Extract a number value from A2UI DataValue types.
 */
export function extractNumber(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && 'literalNumber' in value) {
    return (value as { literalNumber: number }).literalNumber;
  }
  return undefined;
}

/**
 * Extract a boolean value from A2UI DataValue types.
 */
export function extractBoolean(value: unknown): boolean | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'object' && 'literalBoolean' in value) {
    return (value as { literalBoolean: boolean }).literalBoolean;
  }
  return undefined;
}

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
