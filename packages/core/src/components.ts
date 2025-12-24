/**
 * @a2ui-bridge/core - Component type definitions for A2UI protocol
 * MIT License - Copyright (c) 2024 tpitre
 *
 * Based on Google's A2UI protocol specification
 */

import type { StringValue } from './primitives.js';

/**
 * Represents a user-initiated action sent from the client to the server.
 */
export interface Action {
  /**
   * A unique name identifying the action (e.g., 'submitForm').
   */
  name: string;
  /**
   * A key-value map of data bindings to be resolved when the action is triggered.
   */
  context?: {
    key: string;
    value: {
      path?: string;
      literalString?: string;
      literalNumber?: number;
      literalBoolean?: boolean;
    };
  }[];
}

export interface Text {
  text: StringValue;
  usageHint: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body';
}

export interface Image {
  url: StringValue;
  usageHint:
    | 'icon'
    | 'avatar'
    | 'smallFeature'
    | 'mediumFeature'
    | 'largeFeature'
    | 'header';
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface Icon {
  name: StringValue;
}

export interface Video {
  url: StringValue;
}

export interface AudioPlayer {
  url: StringValue;
  description?: StringValue;
}

export interface Tabs {
  tabItems: {
    title: {
      path?: string;
      literalString?: string;
    };
    child: string;
  }[];
}

export interface Divider {
  axis?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

export interface Modal {
  entryPointChild: string;
  contentChild: string;
}

export interface Button {
  child: string;
  action: Action;
}

export interface Checkbox {
  label: StringValue;
  value: {
    path?: string;
    literalBoolean?: boolean;
  };
}

export interface TextField {
  text?: StringValue;
  label: StringValue;
  type?: 'shortText' | 'number' | 'date' | 'longText';
  validationRegexp?: string;
}

export interface DateTimeInput {
  value: StringValue;
  enableDate?: boolean;
  enableTime?: boolean;
  outputFormat?: string;
}

export interface MultipleChoice {
  selections: {
    path?: string;
    literalArray?: string[];
  };
  options?: {
    label: {
      path?: string;
      literalString?: string;
    };
    value: string;
  }[];
  maxAllowedSelections?: number;
}

export interface Slider {
  value: {
    path?: string;
    literalNumber?: number;
  };
  minValue?: number;
  maxValue?: number;
}

export interface Badge {
  text: StringValue;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface Select {
  label?: StringValue;
  options?: {
    label: {
      path?: string;
      literalString?: string;
    };
    value: string;
  }[];
  value?: {
    path?: string;
    literalString?: string;
  };
  placeholder?: StringValue;
}

export interface Grid {
  columns?: string;
  minColumnWidth?: string;
  gap?: number | string;
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
}
