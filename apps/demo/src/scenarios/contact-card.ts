import type { DemoScenario } from './types';

/**
 * Contact Card Demo
 * Demonstrates a simple contact card with image, text, and action buttons
 */
export const contactCardScenario: DemoScenario = {
  id: 'contact-card',
  title: 'Contact Card',
  description: 'A contact profile card with image, details, and actions',
  messages: [
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'contact-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'contact-card',
            component: {
              componentType: 'Card',
              properties: {
                children: ['contact-content'],
              },
            },
          },
          {
            id: 'contact-content',
            component: {
              componentType: 'Column',
              properties: {
                alignment: 'center',
                children: ['avatar', 'name', 'title', 'email', 'actions'],
              },
            },
          },
          {
            id: 'avatar',
            component: {
              componentType: 'Image',
              properties: {
                url: { literalString: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
                usageHint: 'avatar',
              },
            },
          },
          {
            id: 'name',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Alex Jordan' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'title',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Senior Software Engineer' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'email',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'alex.jordan@example.com' },
                usageHint: 'caption',
              },
            },
          },
          {
            id: 'actions',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['call-btn', 'email-btn'],
              },
            },
          },
          {
            id: 'call-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'call-btn-text',
                action: { name: 'call-contact' },
              },
            },
          },
          {
            id: 'call-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Call' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'email-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'email-btn-text',
                action: { name: 'email-contact' },
              },
            },
          },
          {
            id: 'email-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Email' },
                usageHint: 'body',
              },
            },
          },
        ],
      },
    },
  ],
};
