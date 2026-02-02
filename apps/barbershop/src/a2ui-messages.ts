/**
 * Static A2UI protocol messages that describe the Barbershop Dashboard UI
 * Based on the Pencil design: "Barbershop Dashboard"
 */

// Helper to create literalString values
const str = (value: string) => ({ literalString: value });
const num = (value: number) => ({ literalNumber: value });

/**
 * Begin rendering message - establishes the surface
 */
const beginRenderingMessage = {
  beginRendering: {
    surfaceId: 'barbershop-dashboard',
    root: 'root',
  },
};

/**
 * Surface update message - defines the complete UI tree
 */
const surfaceUpdateMessage = {
  surfaceUpdate: {
    surfaceId: 'barbershop-dashboard',
    components: [
      // Root container
      {
        id: 'root',
        component: {
          componentType: 'Column',
          style: str('min-h-screen bg-barber-bg'),
          children: {
            explicitList: ['header', 'content'],
          },
        },
      },

      // Header
      {
        id: 'header',
        component: {
          componentType: 'Row',
          style: str('h-20 px-12 border-b border-barber-border items-center justify-between'),
          children: {
            explicitList: ['logo', 'header-actions'],
          },
        },
      },
      {
        id: 'logo',
        component: {
          componentType: 'Text',
          text: str('BARBER HOUSE'),
          usageHint: 'h3',
          style: str('font-display text-2xl font-semibold text-barber-text tracking-tight'),
        },
      },
      {
        id: 'header-actions',
        component: {
          componentType: 'Row',
          style: str('gap-4'),
          children: {
            explicitList: ['notif-btn', 'profile-btn'],
          },
        },
      },
      {
        id: 'notif-btn',
        component: {
          componentType: 'ActionIcon',
          icon: str('bell'),
          style: str('w-11 h-11 rounded-full bg-barber-card border border-barber-border text-barber-muted hover:text-barber-text'),
        },
      },
      {
        id: 'profile-btn',
        component: {
          componentType: 'ActionIcon',
          icon: str('user'),
          style: str('w-11 h-11 rounded-full bg-barber-card border border-barber-border text-barber-muted hover:text-barber-text'),
        },
      },

      // Main content area
      {
        id: 'content',
        component: {
          componentType: 'Row',
          style: str('flex-1 gap-6'),
          children: {
            explicitList: ['sidebar', 'main'],
          },
        },
      },

      // Sidebar
      {
        id: 'sidebar',
        component: {
          componentType: 'Column',
          style: str('w-[280px] bg-barber-card rounded-2xl p-6 gap-2 m-6 mr-0'),
          children: {
            explicitList: ['nav-dashboard', 'nav-clients', 'nav-appointments', 'nav-services'],
          },
        },
      },
      {
        id: 'nav-dashboard',
        component: {
          componentType: 'Row',
          style: str('h-12 px-4 gap-3 items-center rounded-xl bg-barber-primary text-white'),
          children: {
            explicitList: ['nav-dashboard-icon', 'nav-dashboard-label'],
          },
        },
      },
      {
        id: 'nav-dashboard-icon',
        component: {
          componentType: 'Icon',
          name: str('layout-dashboard'),
          size: num(20),
        },
      },
      {
        id: 'nav-dashboard-label',
        component: {
          componentType: 'Text',
          text: str('Dashboard'),
          style: str('font-semibold text-[15px]'),
        },
      },
      {
        id: 'nav-clients',
        component: {
          componentType: 'Row',
          style: str('h-12 px-4 gap-3 items-center rounded-xl text-barber-muted hover:bg-barber-border/50 cursor-pointer'),
          children: {
            explicitList: ['nav-clients-icon', 'nav-clients-label'],
          },
        },
      },
      {
        id: 'nav-clients-icon',
        component: {
          componentType: 'Icon',
          name: str('users'),
          size: num(20),
        },
      },
      {
        id: 'nav-clients-label',
        component: {
          componentType: 'Text',
          text: str('Clients'),
          style: str('font-medium text-[15px]'),
        },
      },
      {
        id: 'nav-appointments',
        component: {
          componentType: 'Row',
          style: str('h-12 px-4 gap-3 items-center rounded-xl text-barber-muted hover:bg-barber-border/50 cursor-pointer'),
          children: {
            explicitList: ['nav-appointments-icon', 'nav-appointments-label'],
          },
        },
      },
      {
        id: 'nav-appointments-icon',
        component: {
          componentType: 'Icon',
          name: str('calendar'),
          size: num(20),
        },
      },
      {
        id: 'nav-appointments-label',
        component: {
          componentType: 'Text',
          text: str('Appointments'),
          style: str('font-medium text-[15px]'),
        },
      },
      {
        id: 'nav-services',
        component: {
          componentType: 'Row',
          style: str('h-12 px-4 gap-3 items-center rounded-xl text-barber-muted hover:bg-barber-border/50 cursor-pointer'),
          children: {
            explicitList: ['nav-services-icon', 'nav-services-label'],
          },
        },
      },
      {
        id: 'nav-services-icon',
        component: {
          componentType: 'Icon',
          name: str('scissors'),
          size: num(20),
        },
      },
      {
        id: 'nav-services-label',
        component: {
          componentType: 'Text',
          text: str('Services'),
          style: str('font-medium text-[15px]'),
        },
      },

      // Main content
      {
        id: 'main',
        component: {
          componentType: 'Column',
          style: str('flex-1 p-12 gap-8'),
          children: {
            explicitList: ['welcome', 'metrics-row', 'upcoming-header', 'appointments-card'],
          },
        },
      },

      // Welcome section
      {
        id: 'welcome',
        component: {
          componentType: 'Column',
          style: str('gap-2'),
          children: {
            explicitList: ['greeting', 'subtitle'],
          },
        },
      },
      {
        id: 'greeting',
        component: {
          componentType: 'Text',
          text: str('Welcome back, Marcus'),
          usageHint: 'h2',
          style: str('font-display text-[28px] font-medium text-barber-text tracking-tight'),
        },
      },
      {
        id: 'subtitle',
        component: {
          componentType: 'Text',
          text: str("Here's what's happening today"),
          style: str('text-barber-muted text-base'),
        },
      },

      // Metrics row
      {
        id: 'metrics-row',
        component: {
          componentType: 'Row',
          style: str('gap-4'),
          children: {
            explicitList: ['metric-1', 'metric-2', 'metric-3'],
          },
        },
      },

      // Metric card 1 - Appointments
      {
        id: 'metric-1',
        component: {
          componentType: 'Column',
          style: str('flex-1 bg-barber-card rounded-2xl p-6 gap-3 shadow-lg'),
          children: {
            explicitList: ['metric-1-value', 'metric-1-label', 'metric-1-trend'],
          },
        },
      },
      {
        id: 'metric-1-value',
        component: {
          componentType: 'Text',
          text: str('24'),
          style: str('text-4xl font-bold text-barber-text tracking-tight'),
        },
      },
      {
        id: 'metric-1-label',
        component: {
          componentType: 'Text',
          text: str('Appointments Today'),
          style: str('text-sm font-medium text-barber-muted'),
        },
      },
      {
        id: 'metric-1-trend',
        component: {
          componentType: 'Row',
          style: str('items-center gap-1'),
          children: {
            explicitList: ['metric-1-trend-icon', 'metric-1-trend-text'],
          },
        },
      },
      {
        id: 'metric-1-trend-icon',
        component: {
          componentType: 'Icon',
          name: str('trending-up'),
          size: num(14),
          style: str('text-barber-success'),
        },
      },
      {
        id: 'metric-1-trend-text',
        component: {
          componentType: 'Text',
          text: str('+12%'),
          style: str('text-xs font-medium text-barber-success'),
        },
      },

      // Metric card 2 - Revenue
      {
        id: 'metric-2',
        component: {
          componentType: 'Column',
          style: str('flex-1 bg-barber-card rounded-2xl p-6 gap-3 shadow-lg'),
          children: {
            explicitList: ['metric-2-value', 'metric-2-label', 'metric-2-trend'],
          },
        },
      },
      {
        id: 'metric-2-value',
        component: {
          componentType: 'Text',
          text: str('$2,847'),
          style: str('text-4xl font-bold text-barber-text tracking-tight'),
        },
      },
      {
        id: 'metric-2-label',
        component: {
          componentType: 'Text',
          text: str('Revenue Today'),
          style: str('text-sm font-medium text-barber-muted'),
        },
      },
      {
        id: 'metric-2-trend',
        component: {
          componentType: 'Row',
          style: str('items-center gap-1'),
          children: {
            explicitList: ['metric-2-trend-icon', 'metric-2-trend-text'],
          },
        },
      },
      {
        id: 'metric-2-trend-icon',
        component: {
          componentType: 'Icon',
          name: str('trending-up'),
          size: num(14),
          style: str('text-barber-success'),
        },
      },
      {
        id: 'metric-2-trend-text',
        component: {
          componentType: 'Text',
          text: str('+8%'),
          style: str('text-xs font-medium text-barber-success'),
        },
      },

      // Metric card 3 - Clients
      {
        id: 'metric-3',
        component: {
          componentType: 'Column',
          style: str('flex-1 bg-barber-card rounded-2xl p-6 gap-3 shadow-lg'),
          children: {
            explicitList: ['metric-3-value', 'metric-3-label', 'metric-3-trend'],
          },
        },
      },
      {
        id: 'metric-3-value',
        component: {
          componentType: 'Text',
          text: str('342'),
          style: str('text-4xl font-bold text-barber-text tracking-tight'),
        },
      },
      {
        id: 'metric-3-label',
        component: {
          componentType: 'Text',
          text: str('Active Clients'),
          style: str('text-sm font-medium text-barber-muted'),
        },
      },
      {
        id: 'metric-3-trend',
        component: {
          componentType: 'Row',
          style: str('items-center gap-1'),
          children: {
            explicitList: ['metric-3-trend-icon', 'metric-3-trend-text'],
          },
        },
      },
      {
        id: 'metric-3-trend-icon',
        component: {
          componentType: 'Icon',
          name: str('trending-up'),
          size: num(14),
          style: str('text-barber-success'),
        },
      },
      {
        id: 'metric-3-trend-text',
        component: {
          componentType: 'Text',
          text: str('+5%'),
          style: str('text-xs font-medium text-barber-success'),
        },
      },

      // Upcoming appointments header
      {
        id: 'upcoming-header',
        component: {
          componentType: 'Row',
          style: str('items-center justify-between'),
          children: {
            explicitList: ['upcoming-title', 'view-all-btn'],
          },
        },
      },
      {
        id: 'upcoming-title',
        component: {
          componentType: 'Text',
          text: str('Upcoming Appointments'),
          usageHint: 'h3',
          style: str('font-display text-[22px] font-semibold text-barber-text tracking-tight'),
        },
      },
      {
        id: 'view-all-btn',
        component: {
          componentType: 'Text',
          text: str('View All'),
          style: str('text-sm font-semibold text-barber-primary cursor-pointer hover:underline'),
        },
      },

      // Appointments card container
      {
        id: 'appointments-card',
        component: {
          componentType: 'Column',
          style: str('bg-barber-card rounded-2xl p-1 shadow-lg'),
          children: {
            explicitList: ['appt-1', 'appt-2', 'appt-3'],
          },
        },
      },

      // Appointment 1 - James Rodriguez (Confirmed)
      {
        id: 'appt-1',
        component: {
          componentType: 'Row',
          style: str('p-5 gap-4 items-center'),
          children: {
            explicitList: ['appt-1-bar', 'appt-1-time', 'appt-1-info', 'appt-1-badge'],
          },
        },
      },
      {
        id: 'appt-1-bar',
        component: {
          componentType: 'Box',
          style: str('w-1 h-12 bg-barber-primary rounded-l-lg'),
        },
      },
      {
        id: 'appt-1-time',
        component: {
          componentType: 'Text',
          text: str('9:00 AM'),
          style: str('text-[15px] font-bold text-barber-text w-20'),
        },
      },
      {
        id: 'appt-1-info',
        component: {
          componentType: 'Column',
          style: str('flex-1 gap-1'),
          children: {
            explicitList: ['appt-1-name', 'appt-1-service'],
          },
        },
      },
      {
        id: 'appt-1-name',
        component: {
          componentType: 'Text',
          text: str('James Rodriguez'),
          style: str('text-base font-semibold text-barber-text'),
        },
      },
      {
        id: 'appt-1-service',
        component: {
          componentType: 'Text',
          text: str('Premium Haircut & Beard Trim'),
          style: str('text-[13px] text-barber-muted'),
        },
      },
      {
        id: 'appt-1-badge',
        component: {
          componentType: 'Badge',
          text: str('Confirmed'),
          style: str('bg-barber-primary/20 text-barber-primary text-xs font-semibold px-3 py-1.5 rounded-lg'),
        },
      },

      // Appointment 2 - Michael Chen (In Progress)
      {
        id: 'appt-2',
        component: {
          componentType: 'Row',
          style: str('p-5 gap-4 items-center'),
          children: {
            explicitList: ['appt-2-bar', 'appt-2-time', 'appt-2-info', 'appt-2-badge'],
          },
        },
      },
      {
        id: 'appt-2-bar',
        component: {
          componentType: 'Box',
          style: str('w-1 h-12 bg-barber-danger rounded-l-lg'),
        },
      },
      {
        id: 'appt-2-time',
        component: {
          componentType: 'Text',
          text: str('10:30 AM'),
          style: str('text-[15px] font-bold text-barber-text w-20'),
        },
      },
      {
        id: 'appt-2-info',
        component: {
          componentType: 'Column',
          style: str('flex-1 gap-1'),
          children: {
            explicitList: ['appt-2-name', 'appt-2-service'],
          },
        },
      },
      {
        id: 'appt-2-name',
        component: {
          componentType: 'Text',
          text: str('Michael Chen'),
          style: str('text-base font-semibold text-barber-text'),
        },
      },
      {
        id: 'appt-2-service',
        component: {
          componentType: 'Text',
          text: str('Executive Grooming Package'),
          style: str('text-[13px] text-barber-muted'),
        },
      },
      {
        id: 'appt-2-badge',
        component: {
          componentType: 'Badge',
          text: str('In Progress'),
          style: str('bg-barber-danger/20 text-barber-danger text-xs font-semibold px-3 py-1.5 rounded-lg'),
        },
      },

      // Appointment 3 - David Williams (Pending)
      {
        id: 'appt-3',
        component: {
          componentType: 'Row',
          style: str('p-5 gap-4 items-center'),
          children: {
            explicitList: ['appt-3-bar', 'appt-3-time', 'appt-3-info', 'appt-3-badge'],
          },
        },
      },
      {
        id: 'appt-3-bar',
        component: {
          componentType: 'Box',
          style: str('w-1 h-12 bg-barber-success rounded-l-lg'),
        },
      },
      {
        id: 'appt-3-time',
        component: {
          componentType: 'Text',
          text: str('12:00 PM'),
          style: str('text-[15px] font-bold text-barber-text w-20'),
        },
      },
      {
        id: 'appt-3-info',
        component: {
          componentType: 'Column',
          style: str('flex-1 gap-1'),
          children: {
            explicitList: ['appt-3-name', 'appt-3-service'],
          },
        },
      },
      {
        id: 'appt-3-name',
        component: {
          componentType: 'Text',
          text: str('David Williams'),
          style: str('text-base font-semibold text-barber-text'),
        },
      },
      {
        id: 'appt-3-service',
        component: {
          componentType: 'Text',
          text: str('Classic Cut & Hot Towel Shave'),
          style: str('text-[13px] text-barber-muted'),
        },
      },
      {
        id: 'appt-3-badge',
        component: {
          componentType: 'Badge',
          text: str('Pending'),
          style: str('bg-barber-success/20 text-barber-success text-xs font-semibold px-3 py-1.5 rounded-lg'),
        },
      },
    ],
  },
};

/**
 * Complete list of messages to render the dashboard
 * Using 'as any' to bypass strict type checking for protocol messages
 */
export const dashboardMessages = [
  beginRenderingMessage,
  surfaceUpdateMessage,
] as any[];
