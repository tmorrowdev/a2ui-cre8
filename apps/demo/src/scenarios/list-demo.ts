import type { DemoScenario } from './types';

/**
 * List Demo
 * Demonstrates dynamic list rendering with cards
 */
export const listDemoScenario: DemoScenario = {
  id: 'list-demo',
  title: 'Task List',
  description: 'A task list with status badges and actions',
  messages: [
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'list-container',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'list-container',
            component: {
              componentType: 'Card',
              properties: {
                children: ['list-content'],
              },
            },
          },
          {
            id: 'list-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['list-header', 'task-list', 'add-task-row'],
              },
            },
          },
          {
            id: 'list-header',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['list-title', 'task-count'],
              },
            },
          },
          {
            id: 'list-title',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'My Tasks' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'task-count',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: '3 items' },
              },
            },
          },
          {
            id: 'task-list',
            component: {
              componentType: 'List',
              properties: {
                direction: 'vertical',
                children: ['task-1', 'task-2', 'task-3'],
              },
            },
          },
          {
            id: 'task-1',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['task-1-badge', 'task-1-text', 'task-1-action'],
              },
            },
          },
          {
            id: 'task-1-badge',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: 'Done' },
              },
            },
          },
          {
            id: 'task-1-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Review pull request #42' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'task-1-action',
            component: {
              componentType: 'Button',
              properties: {
                child: 'task-1-action-text',
                action: { name: 'view-task-1' },
              },
            },
          },
          {
            id: 'task-1-action-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'View' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'task-2',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['task-2-badge', 'task-2-text', 'task-2-action'],
              },
            },
          },
          {
            id: 'task-2-badge',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: 'In Progress' },
              },
            },
          },
          {
            id: 'task-2-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Update documentation' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'task-2-action',
            component: {
              componentType: 'Button',
              properties: {
                child: 'task-2-action-text',
                action: { name: 'view-task-2' },
              },
            },
          },
          {
            id: 'task-2-action-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'View' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'task-3',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['task-3-badge', 'task-3-text', 'task-3-action'],
              },
            },
          },
          {
            id: 'task-3-badge',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: 'Pending' },
              },
            },
          },
          {
            id: 'task-3-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Deploy to production' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'task-3-action',
            component: {
              componentType: 'Button',
              properties: {
                child: 'task-3-action-text',
                action: { name: 'view-task-3' },
              },
            },
          },
          {
            id: 'task-3-action-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'View' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'add-task-row',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['add-task-btn'],
              },
            },
          },
          {
            id: 'add-task-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'add-task-btn-text',
                action: { name: 'add-task' },
              },
            },
          },
          {
            id: 'add-task-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Add Task' },
                usageHint: 'body',
              },
            },
          },
        ],
      },
    },
  ],
};
