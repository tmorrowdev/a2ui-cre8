/**
 * Custom A2UI components with Tailwind CSS support
 * These components render with Tailwind classes instead of cre8 web components
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps, ComponentMapping } from '@a2ui-bridge/react';
import { renderChildren } from '@a2ui-bridge/react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Scissors,
  Bell,
  User,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

// Helper to extract string values from A2UI properties
function extractString(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && 'literalString' in value) {
    return (value as { literalString: string }).literalString;
  }
  return undefined;
}

function extractNumber(value: unknown): number | undefined {
  if (!value) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'object' && 'literalNumber' in value) {
    return (value as { literalNumber: number }).literalNumber;
  }
  return undefined;
}

// Icon name to component mapping
const iconMap: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  users: Users,
  calendar: Calendar,
  scissors: Scissors,
  bell: Bell,
  user: User,
  'trending-up': TrendingUp,
};

// Row component with Tailwind support
function Row({ node, onAction, components, surfaceId }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const className = extractString(props.style) ?? 'flex flex-row items-center gap-2';

  return (
    <div className={`flex flex-row ${className}`}>
      {renderChildren(props.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}

// Column component with Tailwind support
function Column({ node, onAction, components, surfaceId }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const className = extractString(props.style) ?? 'flex flex-col gap-2';

  return (
    <div className={`flex flex-col ${className}`}>
      {renderChildren(props.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}

// Box component with Tailwind support
function Box({ node }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const className = extractString(props.style) ?? '';

  return <div className={className} />;
}

// Text component with Tailwind support
function Text({ node }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const text = extractString(props.text) ?? '';
  const className = extractString(props.style) ?? '';
  const usageHint = extractString(props.usageHint);

  // Use semantic tags based on usageHint
  if (usageHint === 'h1') return <h1 className={className}>{text}</h1>;
  if (usageHint === 'h2') return <h2 className={className}>{text}</h2>;
  if (usageHint === 'h3') return <h3 className={className}>{text}</h3>;
  if (usageHint === 'h4') return <h4 className={className}>{text}</h4>;

  return <span className={className}>{text}</span>;
}

// Icon component with Tailwind support
function Icon({ node }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const name = extractString(props.name) ?? 'circle';
  const size = extractNumber(props.size) ?? 20;
  const className = extractString(props.style) ?? '';

  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return <span className={className}>?</span>;
  }

  return <IconComponent size={size} className={className} />;
}

// ActionIcon (icon button) component
function ActionIcon({ node }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const iconName = extractString(props.icon) ?? 'circle';
  const className = extractString(props.style) ?? '';

  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    return <button className={className}>?</button>;
  }

  return (
    <button className={`flex items-center justify-center ${className}`}>
      <IconComponent size={20} />
    </button>
  );
}

// Badge component with Tailwind support
function Badge({ node }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const text = extractString(props.text) ?? '';
  const className = extractString(props.style) ?? 'px-2 py-1 rounded text-xs';

  return <span className={className}>{text}</span>;
}

// Card component with Tailwind support
function Card({ node, onAction, components, surfaceId }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const className = extractString(props.style) ?? 'bg-barber-card rounded-2xl p-6';

  return (
    <div className={className}>
      {renderChildren(props.children ?? [], components, onAction, surfaceId)}
    </div>
  );
}

// Button component
function Button({ node, onAction }: A2UIComponentProps<AnyComponentNode>) {
  const props = node.properties as any;
  const text = extractString(props.text) ?? 'Button';
  const className = extractString(props.style) ?? 'px-4 py-2 bg-barber-primary text-white rounded';

  const handleClick = () => {
    if (props.action) {
      onAction({
        actionName: props.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
}

// Fallback component for unknown types
function Fallback({ node }: A2UIComponentProps<AnyComponentNode>) {
  return (
    <div className="p-2 border border-red-500 text-red-500 text-sm">
      Unknown component: {node.type}
    </div>
  );
}

/**
 * Tailwind-styled component mapping for A2UI
 */
export const tailwindComponents: ComponentMapping = {
  // Layout
  Row,
  Column,
  Box,
  HStack: Row,
  VStack: Column,
  Stack: Column,
  Flex: Row,
  Container: Column,
  Center: Column,

  // Typography
  Text,
  Title: Text,
  Label: Text,
  Heading: Text,
  H1: Text,
  H2: Text,
  H3: Text,
  H4: Text,

  // Icons & Buttons
  Icon,
  ActionIcon,
  IconButton: ActionIcon,
  Button,

  // Display
  Badge,
  Card,

  // Fallback
  __fallback__: Fallback,
};
