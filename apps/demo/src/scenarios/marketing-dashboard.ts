import type { DemoScenario } from './types';

/**
 * Marketing Dashboard Demo
 * Demonstrates a campaign performance analytics dashboard
 */
export const marketingDashboardScenario: DemoScenario = {
  id: 'marketing-dashboard',
  title: 'Marketing Dashboard',
  description: 'Campaign performance analytics with stats, breakdowns, and actions',
  messages: [
    {
      beginRendering: {
        surfaceId: '@default',
        root: 'dashboard',
      },
    },
    {
      surfaceUpdate: {
        surfaceId: '@default',
        components: [
          // Root container
          {
            id: 'dashboard',
            component: {
              Column: {
                children: [
                  'hero-section',
                  'stats-row',
                  'divider-1',
                  'breakdown-section',
                  'divider-2',
                  'top-content-section',
                  'divider-3',
                  'actions-section',
                  'footer-caption',
                ],
              },
            },
          },

          // Hero Header
          {
            id: 'hero-section',
            component: {
              Column: {
                alignment: 'start',
                children: ['hero-title', 'hero-subtitle', 'hero-context'],
              },
            },
          },
          {
            id: 'hero-title',
            component: {
              Text: {
                text: { literalString: 'Campaign Performance' },
                usageHint: 'h1',
              },
            },
          },
          {
            id: 'hero-subtitle',
            component: {
              Text: {
                text: { literalString: 'Q4 2024 Marketing Analytics' },
                usageHint: 'h3',
              },
            },
          },
          {
            id: 'hero-context',
            component: {
              Text: {
                text: { literalString: 'Last updated: Today at 2:34 PM' },
                usageHint: 'caption',
              },
            },
          },

          // Stats Row
          {
            id: 'stats-row',
            component: {
              Row: {
                distribution: 'spaceEvenly',
                children: ['stat-1', 'stat-2', 'stat-3', 'stat-4'],
              },
            },
          },

          // Stat Card 1 - Impressions
          {
            id: 'stat-1',
            component: {
              Card: {
                children: ['stat-1-content'],
              },
            },
          },
          {
            id: 'stat-1-content',
            component: {
              Column: {
                alignment: 'center',
                children: ['stat-1-badge', 'stat-1-value', 'stat-1-label'],
              },
            },
          },
          {
            id: 'stat-1-badge',
            component: {
              Badge: {
                text: { literalString: '+23%' },
              },
            },
          },
          {
            id: 'stat-1-value',
            component: {
              Text: {
                text: { literalString: '847,293' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'stat-1-label',
            component: {
              Text: {
                text: { literalString: 'Total Impressions' },
                usageHint: 'caption',
              },
            },
          },

          // Stat Card 2 - Clicks
          {
            id: 'stat-2',
            component: {
              Card: {
                children: ['stat-2-content'],
              },
            },
          },
          {
            id: 'stat-2-content',
            component: {
              Column: {
                alignment: 'center',
                children: ['stat-2-badge', 'stat-2-value', 'stat-2-label'],
              },
            },
          },
          {
            id: 'stat-2-badge',
            component: {
              Badge: {
                text: { literalString: '+18%' },
              },
            },
          },
          {
            id: 'stat-2-value',
            component: {
              Text: {
                text: { literalString: '12,847' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'stat-2-label',
            component: {
              Text: {
                text: { literalString: 'Total Clicks' },
                usageHint: 'caption',
              },
            },
          },

          // Stat Card 3 - CTR
          {
            id: 'stat-3',
            component: {
              Card: {
                children: ['stat-3-content'],
              },
            },
          },
          {
            id: 'stat-3-content',
            component: {
              Column: {
                alignment: 'center',
                children: ['stat-3-badge', 'stat-3-value', 'stat-3-label'],
              },
            },
          },
          {
            id: 'stat-3-badge',
            component: {
              Badge: {
                text: { literalString: '+0.3%' },
              },
            },
          },
          {
            id: 'stat-3-value',
            component: {
              Text: {
                text: { literalString: '1.52%' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'stat-3-label',
            component: {
              Text: {
                text: { literalString: 'Click-Through Rate' },
                usageHint: 'caption',
              },
            },
          },

          // Stat Card 4 - CPC
          {
            id: 'stat-4',
            component: {
              Card: {
                children: ['stat-4-content'],
              },
            },
          },
          {
            id: 'stat-4-content',
            component: {
              Column: {
                alignment: 'center',
                children: ['stat-4-badge', 'stat-4-value', 'stat-4-label'],
              },
            },
          },
          {
            id: 'stat-4-badge',
            component: {
              Badge: {
                text: { literalString: '-12%' },
              },
            },
          },
          {
            id: 'stat-4-value',
            component: {
              Text: {
                text: { literalString: '$2.34' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'stat-4-label',
            component: {
              Text: {
                text: { literalString: 'Cost Per Click' },
                usageHint: 'caption',
              },
            },
          },

          // Dividers
          { id: 'divider-1', component: { Divider: {} } },
          { id: 'divider-2', component: { Divider: {} } },
          { id: 'divider-3', component: { Divider: {} } },

          // Campaign Breakdown Section
          {
            id: 'breakdown-section',
            component: {
              Column: {
                children: ['breakdown-heading', 'campaign-1', 'campaign-2', 'campaign-3'],
              },
            },
          },
          {
            id: 'breakdown-heading',
            component: {
              Text: {
                text: { literalString: 'Campaign Breakdown' },
                usageHint: 'h2',
              },
            },
          },

          // Campaign 1 - Email
          {
            id: 'campaign-1',
            component: {
              Card: {
                children: ['campaign-1-content'],
              },
            },
          },
          {
            id: 'campaign-1-content',
            component: {
              Column: {
                children: ['campaign-1-header', 'campaign-1-stats'],
              },
            },
          },
          {
            id: 'campaign-1-header',
            component: {
              Row: {
                distribution: 'spaceBetween',
                children: ['campaign-1-titles', 'campaign-1-badge'],
              },
            },
          },
          {
            id: 'campaign-1-titles',
            component: {
              Column: {
                children: ['campaign-1-title', 'campaign-1-subtitle'],
              },
            },
          },
          {
            id: 'campaign-1-title',
            component: {
              Text: {
                text: { literalString: 'Email Campaign' },
                usageHint: 'h4',
              },
            },
          },
          {
            id: 'campaign-1-subtitle',
            component: {
              Text: {
                text: { literalString: 'Holiday Sale Promotion' },
                usageHint: 'caption',
              },
            },
          },
          {
            id: 'campaign-1-badge',
            component: {
              Badge: {
                text: { literalString: 'Active' },
              },
            },
          },
          {
            id: 'campaign-1-stats',
            component: {
              Row: {
                distribution: 'spaceEvenly',
                children: ['c1-sent', 'c1-open', 'c1-conv'],
              },
            },
          },
          {
            id: 'c1-sent',
            component: {
              Column: {
                alignment: 'center',
                children: ['c1-sent-label', 'c1-sent-value'],
              },
            },
          },
          {
            id: 'c1-sent-label',
            component: {
              Text: { text: { literalString: 'Sent' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c1-sent-value',
            component: {
              Text: { text: { literalString: '125,000' }, usageHint: 'body' },
            },
          },
          {
            id: 'c1-open',
            component: {
              Column: {
                alignment: 'center',
                children: ['c1-open-label', 'c1-open-value'],
              },
            },
          },
          {
            id: 'c1-open-label',
            component: {
              Text: { text: { literalString: 'Open Rate' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c1-open-value',
            component: {
              Text: { text: { literalString: '34.2%' }, usageHint: 'body' },
            },
          },
          {
            id: 'c1-conv',
            component: {
              Column: {
                alignment: 'center',
                children: ['c1-conv-label', 'c1-conv-value'],
              },
            },
          },
          {
            id: 'c1-conv-label',
            component: {
              Text: { text: { literalString: 'Conversions' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c1-conv-value',
            component: {
              Text: { text: { literalString: '2,847' }, usageHint: 'body' },
            },
          },

          // Campaign 2 - Social
          {
            id: 'campaign-2',
            component: {
              Card: {
                children: ['campaign-2-content'],
              },
            },
          },
          {
            id: 'campaign-2-content',
            component: {
              Column: {
                children: ['campaign-2-header', 'campaign-2-stats'],
              },
            },
          },
          {
            id: 'campaign-2-header',
            component: {
              Row: {
                distribution: 'spaceBetween',
                children: ['campaign-2-titles', 'campaign-2-badge'],
              },
            },
          },
          {
            id: 'campaign-2-titles',
            component: {
              Column: {
                children: ['campaign-2-title', 'campaign-2-subtitle'],
              },
            },
          },
          {
            id: 'campaign-2-title',
            component: {
              Text: {
                text: { literalString: 'Social Media Ads' },
                usageHint: 'h4',
              },
            },
          },
          {
            id: 'campaign-2-subtitle',
            component: {
              Text: {
                text: { literalString: 'Instagram & Facebook' },
                usageHint: 'caption',
              },
            },
          },
          {
            id: 'campaign-2-badge',
            component: {
              Badge: {
                text: { literalString: 'Active' },
              },
            },
          },
          {
            id: 'campaign-2-stats',
            component: {
              Row: {
                distribution: 'spaceEvenly',
                children: ['c2-reach', 'c2-engage', 'c2-conv'],
              },
            },
          },
          {
            id: 'c2-reach',
            component: {
              Column: {
                alignment: 'center',
                children: ['c2-reach-label', 'c2-reach-value'],
              },
            },
          },
          {
            id: 'c2-reach-label',
            component: {
              Text: { text: { literalString: 'Reach' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c2-reach-value',
            component: {
              Text: { text: { literalString: '523,000' }, usageHint: 'body' },
            },
          },
          {
            id: 'c2-engage',
            component: {
              Column: {
                alignment: 'center',
                children: ['c2-engage-label', 'c2-engage-value'],
              },
            },
          },
          {
            id: 'c2-engage-label',
            component: {
              Text: { text: { literalString: 'Engagement' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c2-engage-value',
            component: {
              Text: { text: { literalString: '8.7%' }, usageHint: 'body' },
            },
          },
          {
            id: 'c2-conv',
            component: {
              Column: {
                alignment: 'center',
                children: ['c2-conv-label', 'c2-conv-value'],
              },
            },
          },
          {
            id: 'c2-conv-label',
            component: {
              Text: { text: { literalString: 'Conversions' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c2-conv-value',
            component: {
              Text: { text: { literalString: '1,234' }, usageHint: 'body' },
            },
          },

          // Campaign 3 - Google
          {
            id: 'campaign-3',
            component: {
              Card: {
                children: ['campaign-3-content'],
              },
            },
          },
          {
            id: 'campaign-3-content',
            component: {
              Column: {
                children: ['campaign-3-header', 'campaign-3-stats'],
              },
            },
          },
          {
            id: 'campaign-3-header',
            component: {
              Row: {
                distribution: 'spaceBetween',
                children: ['campaign-3-titles', 'campaign-3-badge'],
              },
            },
          },
          {
            id: 'campaign-3-titles',
            component: {
              Column: {
                children: ['campaign-3-title', 'campaign-3-subtitle'],
              },
            },
          },
          {
            id: 'campaign-3-title',
            component: {
              Text: {
                text: { literalString: 'Google Search Ads' },
                usageHint: 'h4',
              },
            },
          },
          {
            id: 'campaign-3-subtitle',
            component: {
              Text: {
                text: { literalString: 'Brand & Product Keywords' },
                usageHint: 'caption',
              },
            },
          },
          {
            id: 'campaign-3-badge',
            component: {
              Badge: {
                text: { literalString: 'Optimizing' },
              },
            },
          },
          {
            id: 'campaign-3-stats',
            component: {
              Row: {
                distribution: 'spaceEvenly',
                children: ['c3-imp', 'c3-ctr', 'c3-conv'],
              },
            },
          },
          {
            id: 'c3-imp',
            component: {
              Column: {
                alignment: 'center',
                children: ['c3-imp-label', 'c3-imp-value'],
              },
            },
          },
          {
            id: 'c3-imp-label',
            component: {
              Text: { text: { literalString: 'Impressions' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c3-imp-value',
            component: {
              Text: { text: { literalString: '199,293' }, usageHint: 'body' },
            },
          },
          {
            id: 'c3-ctr',
            component: {
              Column: {
                alignment: 'center',
                children: ['c3-ctr-label', 'c3-ctr-value'],
              },
            },
          },
          {
            id: 'c3-ctr-label',
            component: {
              Text: { text: { literalString: 'CTR' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c3-ctr-value',
            component: {
              Text: { text: { literalString: '2.1%' }, usageHint: 'body' },
            },
          },
          {
            id: 'c3-conv',
            component: {
              Column: {
                alignment: 'center',
                children: ['c3-conv-label', 'c3-conv-value'],
              },
            },
          },
          {
            id: 'c3-conv-label',
            component: {
              Text: { text: { literalString: 'Conversions' }, usageHint: 'caption' },
            },
          },
          {
            id: 'c3-conv-value',
            component: {
              Text: { text: { literalString: '892' }, usageHint: 'body' },
            },
          },

          // Top Performing Content
          {
            id: 'top-content-section',
            component: {
              Column: {
                children: ['top-content-heading', 'top-item-1', 'top-item-2', 'top-item-3'],
              },
            },
          },
          {
            id: 'top-content-heading',
            component: {
              Text: {
                text: { literalString: 'Top Performing Content' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'top-item-1',
            component: {
              Row: {
                alignment: 'center',
                children: ['top-item-1-icon', 'top-item-1-text'],
              },
            },
          },
          {
            id: 'top-item-1-icon',
            component: {
              Icon: {
                name: { literalString: 'trophy' },
              },
            },
          },
          {
            id: 'top-item-1-text',
            component: {
              Text: {
                text: { literalString: '"Winter Sale 50% Off" email — 42% open rate, $12,340 revenue' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'top-item-2',
            component: {
              Row: {
                alignment: 'center',
                children: ['top-item-2-icon', 'top-item-2-text'],
              },
            },
          },
          {
            id: 'top-item-2-icon',
            component: {
              Icon: {
                name: { literalString: 'trending-up' },
              },
            },
          },
          {
            id: 'top-item-2-text',
            component: {
              Text: {
                text: { literalString: 'Instagram carousel post — 15.2K likes, 847 shares' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'top-item-3',
            component: {
              Row: {
                alignment: 'center',
                children: ['top-item-3-icon', 'top-item-3-text'],
              },
            },
          },
          {
            id: 'top-item-3-icon',
            component: {
              Icon: {
                name: { literalString: 'star' },
              },
            },
          },
          {
            id: 'top-item-3-text',
            component: {
              Text: {
                text: { literalString: '"Best Gifts Under $50" blog — 23,000 page views' },
                usageHint: 'body',
              },
            },
          },

          // Quick Actions
          {
            id: 'actions-section',
            component: {
              Column: {
                children: ['actions-heading', 'actions-row'],
              },
            },
          },
          {
            id: 'actions-heading',
            component: {
              Text: {
                text: { literalString: 'Quick Actions' },
                usageHint: 'h2',
              },
            },
          },
          {
            id: 'actions-row',
            component: {
              Row: {
                distribution: 'start',
                children: ['export-btn', 'schedule-btn', 'create-btn'],
              },
            },
          },
          {
            id: 'export-btn',
            component: {
              Button: {
                child: 'export-btn-text',
                action: { name: 'export-report' },
                variant: { literalString: 'secondary' },
              },
            },
          },
          {
            id: 'export-btn-text',
            component: {
              Text: {
                text: { literalString: 'Export Report' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'schedule-btn',
            component: {
              Button: {
                child: 'schedule-btn-text',
                action: { name: 'schedule-campaign' },
                variant: { literalString: 'secondary' },
              },
            },
          },
          {
            id: 'schedule-btn-text',
            component: {
              Text: {
                text: { literalString: 'Schedule Campaign' },
                usageHint: 'body',
              },
            },
          },
          {
            id: 'create-btn',
            component: {
              Button: {
                child: 'create-btn-text',
                action: { name: 'create-campaign' },
                variant: { literalString: 'primary' },
              },
            },
          },
          {
            id: 'create-btn-text',
            component: {
              Text: {
                text: { literalString: 'Create New Campaign' },
                usageHint: 'body',
              },
            },
          },

          // Footer Caption
          {
            id: 'footer-caption',
            component: {
              Text: {
                text: { literalString: 'Data refreshes every 15 minutes • Compare to previous period in settings' },
                usageHint: 'caption',
              },
            },
          },
        ],
      },
    },
  ],
};
