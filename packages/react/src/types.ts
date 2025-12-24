/**
 * @a2ui-bridge/react - React-specific type definitions
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { ComponentType } from 'react';
import type {
  AnyComponentNode,
  TextNode,
  ImageNode,
  IconNode,
  VideoNode,
  AudioPlayerNode,
  BadgeNode,
  SelectNode,
  RowNode,
  ColumnNode,
  ListNode,
  GridNode,
  CardNode,
  TabsNode,
  DividerNode,
  ModalNode,
  ButtonNode,
  CheckboxNode,
  TextFieldNode,
  DateTimeInputNode,
  MultipleChoiceNode,
  SliderNode,
  CustomNode,
  UserAction,
} from '@a2ui-bridge/core';

/**
 * Props passed to every A2UI component.
 */
export interface A2UIComponentProps<T extends AnyComponentNode = AnyComponentNode> {
  /** The component node from the A2UI tree */
  node: T;
  /** Callback to dispatch user actions */
  onAction: (action: UserAction) => void;
  /** Component mapping for rendering children */
  components: ComponentMapping;
  /** The surface ID this component belongs to */
  surfaceId: string;
}

/**
 * Mapping of A2UI component types to React components.
 * This allows design systems to provide their own implementations.
 */
export interface ComponentMapping {
  Text?: ComponentType<A2UIComponentProps<TextNode>>;
  Image?: ComponentType<A2UIComponentProps<ImageNode>>;
  Icon?: ComponentType<A2UIComponentProps<IconNode>>;
  Video?: ComponentType<A2UIComponentProps<VideoNode>>;
  AudioPlayer?: ComponentType<A2UIComponentProps<AudioPlayerNode>>;
  Badge?: ComponentType<A2UIComponentProps<BadgeNode>>;
  Select?: ComponentType<A2UIComponentProps<SelectNode>>;
  Row?: ComponentType<A2UIComponentProps<RowNode>>;
  Column?: ComponentType<A2UIComponentProps<ColumnNode>>;
  List?: ComponentType<A2UIComponentProps<ListNode>>;
  Grid?: ComponentType<A2UIComponentProps<GridNode>>;
  Card?: ComponentType<A2UIComponentProps<CardNode>>;
  Tabs?: ComponentType<A2UIComponentProps<TabsNode>>;
  Divider?: ComponentType<A2UIComponentProps<DividerNode>>;
  Modal?: ComponentType<A2UIComponentProps<ModalNode>>;
  Button?: ComponentType<A2UIComponentProps<ButtonNode>>;
  CheckBox?: ComponentType<A2UIComponentProps<CheckboxNode>>;
  TextField?: ComponentType<A2UIComponentProps<TextFieldNode>>;
  DateTimeInput?: ComponentType<A2UIComponentProps<DateTimeInputNode>>;
  MultipleChoice?: ComponentType<A2UIComponentProps<MultipleChoiceNode>>;
  Slider?: ComponentType<A2UIComponentProps<SliderNode>>;
  /** Fallback for custom/unknown component types */
  Custom?: ComponentType<A2UIComponentProps<CustomNode>>;
}

/**
 * Event handler for A2UI user actions.
 */
export type ActionHandler = (action: UserAction) => void;
