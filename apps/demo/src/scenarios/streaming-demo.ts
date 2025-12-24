import type { DemoScenario } from './types';

/**
 * Streaming Demo
 * Demonstrates incremental UI updates simulating real-time LLM streaming
 */
export const streamingDemoScenario: DemoScenario = {
  id: 'streaming-demo',
  title: 'Streaming Updates',
  description: 'Simulates real-time LLM response with incremental UI updates',
  messages: [
    // Initial frame - set up root and empty card structure with thinking badge
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'response-card',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-card',
            component: {
              componentType: 'Card',
              properties: {
                children: ['response-content'],
              },
            },
          },
          {
            id: 'response-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['thinking-badge'],
              },
            },
          },
          {
            id: 'thinking-badge',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: 'Thinking...' },
              },
            },
          },
        ],
      },
    },
    // Second frame - title appears
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['response-title', 'thinking-badge'],
              },
            },
          },
          {
            id: 'response-title',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Weather Report' },
                usageHint: 'h2',
              },
            },
          },
        ],
      },
    },
    // Third frame - location appears
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['response-title', 'location-row', 'thinking-badge'],
              },
            },
          },
          {
            id: 'location-row',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['location-badge', 'location-text'],
              },
            },
          },
          {
            id: 'location-badge',
            component: {
              componentType: 'Badge',
              properties: {
                text: { literalString: 'San Francisco, CA' },
              },
            },
          },
          {
            id: 'location-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Current conditions' },
                usageHint: 'caption',
              },
            },
          },
        ],
      },
    },
    // Fourth frame - weather details
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['response-title', 'location-row', 'weather-details', 'thinking-badge'],
              },
            },
          },
          {
            id: 'weather-details',
            component: {
              componentType: 'Column',
              properties: {
                children: ['temp-text', 'condition-text'],
              },
            },
          },
          {
            id: 'temp-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: '72°F (22°C)' },
                usageHint: 'h3',
              },
            },
          },
          {
            id: 'condition-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Partly cloudy with mild temperatures. Perfect weather for outdoor activities.' },
                usageHint: 'body',
              },
            },
          },
        ],
      },
    },
    // Final frame - complete response with actions (remove thinking badge)
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          {
            id: 'response-content',
            component: {
              componentType: 'Column',
              properties: {
                children: ['response-title', 'location-row', 'weather-details', 'divider', 'actions'],
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
            id: 'actions',
            component: {
              componentType: 'Row',
              properties: {
                alignment: 'center',
                children: ['refresh-btn', 'details-btn'],
              },
            },
          },
          {
            id: 'refresh-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'refresh-btn-text',
                action: { name: 'refresh-weather' },
              },
            },
          },
          {
            id: 'refresh-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'Refresh' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'details-btn',
            component: {
              componentType: 'Button',
              properties: {
                child: 'details-btn-text',
                action: { name: 'view-forecast' },
              },
            },
          },
          {
            id: 'details-btn-text',
            component: {
              componentType: 'Text',
              properties: {
                text: { literalString: 'View Forecast' },
                usageHint: 'body',
              },
            },
          },
        ],
      },
    },
  ],
};
