/**
 * Display Snippets
 *
 * Pre-built display components for showing information.
 */

import type { Snippet } from '../types';

export const headingSnippet: Snippet = {
  id: 'heading',
  name: 'Heading Text',
  description: 'A heading/title text. Use for section headers, page titles.',
  category: 'display',
  tags: ['title', 'header', 'h1', 'h2', 'heading'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Heading text' },
    { name: 'level', type: 'string', default: 'h2', description: 'Heading level: h1, h2, h3' },
  ],
  template: {
    componentIds: ['{{id}}-heading'],
    components: [
      {
        id: '{{id}}-heading',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: '{{level}}' },
        },
      },
    ],
  },
};

export const bodyTextSnippet: Snippet = {
  id: 'body-text',
  name: 'Body Text',
  description: 'Regular paragraph text. Use for descriptions, instructions.',
  category: 'display',
  tags: ['text', 'paragraph', 'body', 'description'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Text content' },
  ],
  template: {
    componentIds: ['{{id}}-text'],
    components: [
      {
        id: '{{id}}-text',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const captionTextSnippet: Snippet = {
  id: 'caption',
  name: 'Caption Text',
  description: 'Small helper text. Use for hints, timestamps, secondary info.',
  category: 'display',
  tags: ['caption', 'helper', 'hint', 'small', 'secondary'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Caption text' },
  ],
  template: {
    componentIds: ['{{id}}-caption'],
    components: [
      {
        id: '{{id}}-caption',
        type: 'Text',
        props: {
          text: { literalString: '{{text}}' },
          usageHint: { literalString: 'caption' },
        },
      },
    ],
  },
};

export const badgeSnippet: Snippet = {
  id: 'badge',
  name: 'Status Badge',
  description: 'A status indicator badge. Use for labels, tags, status indicators.',
  category: 'display',
  tags: ['badge', 'tag', 'label', 'status', 'indicator', 'chip'],
  slots: [
    { name: 'text', type: 'string', required: true, description: 'Badge text' },
    { name: 'color', type: 'string', default: 'blue', description: 'Color: blue, green, red, yellow, gray' },
  ],
  template: {
    componentIds: ['{{id}}-badge'],
    components: [
      {
        id: '{{id}}-badge',
        type: 'Badge',
        props: {
          text: { literalString: '{{text}}' },
          color: { literalString: '{{color}}' },
        },
      },
    ],
  },
};

export const avatarSnippet: Snippet = {
  id: 'avatar',
  name: 'Avatar',
  description: 'A user avatar/profile image placeholder. Use for user representation.',
  category: 'display',
  tags: ['avatar', 'profile', 'user', 'image', 'photo'],
  slots: [
    { name: 'name', type: 'string', description: 'Name for initials fallback' },
  ],
  template: {
    componentIds: ['{{id}}-avatar'],
    components: [
      {
        id: '{{id}}-avatar',
        type: 'Avatar',
        props: {
          name: { literalString: '{{name}}' },
        },
      },
    ],
  },
};

export const labelValueSnippet: Snippet = {
  id: 'label-value',
  name: 'Label-Value Pair',
  description: 'A label with its value. Use for displaying data fields.',
  category: 'display',
  tags: ['label', 'value', 'field', 'data', 'info'],
  slots: [
    { name: 'label', type: 'string', required: true, description: 'Field label' },
    { name: 'value', type: 'string', required: true, description: 'Field value' },
  ],
  template: {
    componentIds: ['{{id}}-lv-container', '{{id}}-label', '{{id}}-value'],
    components: [
      {
        id: '{{id}}-lv-container',
        type: 'Column',
        props: {
          children: ['{{id}}-label', '{{id}}-value'],
          gap: { literalString: 'xs' },
        },
      },
      {
        id: '{{id}}-label',
        type: 'Text',
        props: {
          text: { literalString: '{{label}}' },
          usageHint: { literalString: 'caption' },
        },
      },
      {
        id: '{{id}}-value',
        type: 'Text',
        props: {
          text: { literalString: '{{value}}' },
          usageHint: { literalString: 'body' },
        },
      },
    ],
  },
};

export const amountDisplaySnippet: Snippet = {
  id: 'amount-display',
  name: 'Amount Display',
  description: 'A large currency/amount display. Use for totals, balances, prices.',
  category: 'display',
  tags: ['amount', 'price', 'total', 'currency', 'money', 'balance'],
  slots: [
    { name: 'amount', type: 'string', required: true, description: 'Amount value' },
    { name: 'label', type: 'string', description: 'Optional label below amount' },
  ],
  template: {
    componentIds: ['{{id}}-amount-container', '{{id}}-amount', '{{id}}-amount-label'],
    components: [
      {
        id: '{{id}}-amount-container',
        type: 'Column',
        props: {
          children: ['{{id}}-amount', '{{id}}-amount-label'],
          gap: { literalString: 'xs' },
          align: { literalString: 'center' },
        },
      },
      {
        id: '{{id}}-amount',
        type: 'Text',
        props: {
          text: { literalString: '{{amount}}' },
          usageHint: { literalString: 'h1' },
        },
      },
      {
        id: '{{id}}-amount-label',
        type: 'Text',
        props: {
          text: { literalString: '{{label}}' },
          usageHint: { literalString: 'caption' },
        },
      },
    ],
  },
};

export const alertSnippet: Snippet = {
  id: 'alert',
  name: 'Alert Message',
  description: 'An alert/notification message. Use for warnings, info, success messages.',
  category: 'display',
  tags: ['alert', 'notification', 'message', 'warning', 'info', 'success', 'error'],
  slots: [
    { name: 'title', type: 'string', description: 'Alert title' },
    { name: 'message', type: 'string', required: true, description: 'Alert message' },
    { name: 'type', type: 'string', default: 'info', description: 'Type: info, success, warning, error' },
  ],
  template: {
    componentIds: ['{{id}}-alert'],
    components: [
      {
        id: '{{id}}-alert',
        type: 'Alert',
        props: {
          title: { literalString: '{{title}}' },
          message: { literalString: '{{message}}' },
          variant: { literalString: '{{type}}' },
        },
      },
    ],
  },
};

export const displaySnippets: Snippet[] = [
  headingSnippet,
  bodyTextSnippet,
  captionTextSnippet,
  badgeSnippet,
  avatarSnippet,
  labelValueSnippet,
  amountDisplaySnippet,
  alertSnippet,
];
