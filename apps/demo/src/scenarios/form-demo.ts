import type { DemoScenario } from './types';

/**
 * Form Demo
 * Demonstrates form inputs with data binding
 */
export const formDemoScenario: DemoScenario = {
  id: 'form-demo',
  title: 'Interactive Form',
  description: 'A form with text fields and data binding',
  messages: [
    {
      dataModelUpdate: {
        surfaceId: '@default',
        path: '/',
        contents: [
          { key: 'form.firstName', value: { valueString: 'John' } },
          { key: 'form.lastName', value: { valueString: 'Doe' } },
          { key: 'form.email', value: { valueString: 'john.doe@example.com' } },
        ],
      },
    },
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'form-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'form-card',
            component: {
              componentType: 'Card',
              properties: {
                children: ['form-content'],
              },
            },
          },
          {
            id: 'form-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['form-title', 'form-desc', 'name-row', 'email-field', 'divider', 'submit-row'],
              },
            },
          },
          {
            id: 'form-title',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Edit Profile' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'form-desc',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Update your profile information below' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'name-row',
            component: {
              componentType: 'Row',
              properties: {
                children: ['first-name-field', 'last-name-field'],
              },
            },
          },
          {
            id: 'first-name-field',
            component: {
              componentType: 'TextField',
              properties: {
                label: { literalString: 'First Name' },
                text: { path: 'form.firstName' },
                type: 'shortText',
              },
            },
          },
          {
            id: 'last-name-field',
            component: {
              componentType: 'TextField',
              properties: {
                label: { literalString: 'Last Name' },
                text: { path: 'form.lastName' },
                type: 'shortText',
              },
            },
          },
          {
            id: 'email-field',
            component: {
              componentType: 'TextField',
              properties: {
                label: { literalString: 'Email Address' },
                text: { path: 'form.email' },
                type: 'shortText',
              },
            },
          },
          {
            id: 'divider',
            component: {
              componentType: 'Divider',
              properties: {},
            },
          },
          {
            id: 'submit-row',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'end',
                children: ['cancel-btn', 'save-btn'],
              },
            },
          },
          {
            id: 'cancel-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'cancel-btn-text',
                action: { name: 'cancel-form' },
              },
            },
          },
          {
            id: 'cancel-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Cancel' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'save-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'save-btn-text',
                action: {
                  name: 'save-form',
                  context: [
                    { key: 'firstName', value: { path: 'form.firstName' } },
                    { key: 'lastName', value: { path: 'form.lastName' } },
                    { key: 'email', value: { path: 'form.email' } },
                  ],
                },
              },
            },
          },
          {
            id: 'save-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Save Changes' },
                usageHint: 'body',
              },
            },
          },
        ],
      },
    },
  ],
};
