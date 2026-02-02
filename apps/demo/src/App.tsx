import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, ChevronDown, Copy, Check, ExternalLink, Code, Layers, Zap, Package, BookOpen, Terminal, Box, Layout, Type, Navigation, Bell, Database, Eye, Play, Server, Cpu, Globe, FileJson, GitBranch, Sparkles, ArrowRight, Info } from 'lucide-react';

// ============================================================================
// COMPONENT DATA - Mirrors the A2UI Skill Schema
// ============================================================================
const componentManifest = {
  metadata: {
    library: "@tmorrow/cre8-a2ui",
    version: "1.0.0",
    frameworks: {
      react: { package: "@tmorrow/cre8-react", naming: "PascalCase" },
      webComponents: { package: "@tmorrow/cre8-wc", naming: "kebab-case", prefix: "cre8-" }
    },
    totalComponents: 72,
    mcpEndpoint: "https://enterprisedsnetwork-production.up.railway.app/mcp/design-system"
  },
  categories: {
    actions: {
      icon: "Zap",
      color: "#8B5CF6",
      description: "Interactive elements for user actions",
      components: [
        { 
          name: "Button", 
          react: "Cre8Button", 
          wc: "cre8-button", 
          description: "Primary interactive element for user actions",
          props: [
            { name: "text", type: "string", required: true, description: "Button text. Keep short, max 3 words, Title Case." },
            { name: "variant", type: '"primary" | "secondary" | "tertiary"', default: '"primary"', description: "Visual priority level" },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button size" },
            { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
            { name: "fullWidth", type: "boolean", default: "false", description: "100% width" },
            { name: "loading", type: "boolean", default: "false", description: "Loading state" },
            { name: "href", type: "string", description: "Makes button an anchor element" },
            { name: "type", type: '"button" | "submit" | "reset"', default: '"button"', description: "Button type" }
          ],
          aiRules: [
            "One variant=\"primary\" per screen/view",
            "Use variant=\"secondary\" for secondary actions",
            "Keep text short: max 3 words, use Title Case",
            "Use type=\"submit\" inside forms"
          ]
        },
        { 
          name: "DangerButton", 
          react: "Cre8DangerButton", 
          wc: "cre8-danger-button", 
          description: "Button for destructive actions like delete or remove",
          props: [
            { name: "text", type: "string", required: true, description: "Button text" },
            { name: "disabled", type: "boolean", default: "false", description: "Disabled state" }
          ],
          aiRules: [
            "Reserve for destructive actions only (delete, remove, cancel irreversible)",
            "Always confirm dangerous actions with Cre8Modal",
            "Never use as primary page CTA"
          ]
        }
      ]
    },
    forms: {
      icon: "Type",
      color: "#3B82F6",
      description: "User input and form controls",
      components: [
        { name: "Field", react: "Cre8Field", wc: "cre8-field", description: "Text input field with label and validation",
          props: [
            { name: "label", type: "string", required: true, description: "Field label" },
            { name: "value", type: "string", description: "Input value" },
            { name: "type", type: '"text" | "email" | "password" | "tel" | "url" | "number"', default: '"text"', description: "Input type" },
            { name: "placeholder", type: "string", description: "Placeholder text" },
            { name: "disabled", type: "boolean", default: "false" },
            { name: "required", type: "boolean", default: "false" },
            { name: "errorNote", type: "string", description: "Error message to display" }
          ],
          aiRules: ["Always provide label", "Use appropriate type for better mobile keyboards"]
        },
        { name: "Select", react: "Cre8Select", wc: "cre8-select", description: "Dropdown select input",
          props: [
            { name: "label", type: "string", description: "Field label" },
            { name: "value", type: "string", description: "Selected value" },
            { name: "disabled", type: "boolean", default: "false" },
            { name: "required", type: "boolean", default: "false" }
          ]
        },
        { name: "MultiSelect", react: "Cre8MultiSelect", wc: "cre8-multi-select", description: "Multi-select dropdown" },
        { name: "CheckboxField", react: "Cre8CheckboxField", wc: "cre8-checkbox-field", description: "Container for checkbox items" },
        { name: "CheckboxFieldItem", react: "Cre8CheckboxFieldItem", wc: "cre8-checkbox-field-item", description: "Individual checkbox" },
        { name: "RadioField", react: "Cre8RadioField", wc: "cre8-radio-field", description: "Container for radio buttons" },
        { name: "RadioFieldItem", react: "Cre8RadioFieldItem", wc: "cre8-radio-field-item", description: "Individual radio button" },
        { name: "DatePicker", react: "Cre8DatePicker", wc: "cre8-date-picker", description: "Date picker input" }
      ]
    },
    layout: {
      icon: "Layout",
      color: "#10B981",
      description: "Page structure and content containers",
      components: [
        { name: "Layout", react: "Cre8Layout", wc: "cre8-layout", description: "Page layout wrapper. Top-level container for pages.",
          aiRules: ["Always use as root wrapper for full pages"]
        },
        { name: "LayoutSection", react: "Cre8LayoutSection", wc: "cre8-layout-section", description: "Section within a Layout" },
        { name: "LayoutContainer", react: "Cre8LayoutContainer", wc: "cre8-layout-container", description: "Content container with max-width constraints",
          aiRules: ["Use to constrain content width within sections/bands"]
        },
        { name: "Section", react: "Cre8Section", wc: "cre8-section", description: "Generic section container" },
        { name: "Hero", react: "Cre8Hero", wc: "cre8-hero", description: "Hero section for landing pages",
          aiRules: ["Use for prominent page introductions, typically at top of landing pages"]
        },
        { name: "Band", react: "Cre8Band", wc: "cre8-band", description: "Full-width content band/section" },
        { name: "Card", react: "Cre8Card", wc: "cre8-card", description: "Container card for grouping related content" },
        { name: "Grid", react: "Cre8Grid", wc: "cre8-grid", description: "CSS Grid layout container" },
        { name: "GridItem", react: "Cre8GridItem", wc: "cre8-grid-item", description: "Item within a Grid container" },
        { name: "Divider", react: "Cre8Divider", wc: "cre8-divider", description: "Visual separator between content sections" }
      ]
    },
    typography: {
      icon: "Type",
      color: "#F59E0B",
      description: "Text and heading components",
      components: [
        { name: "Heading", react: "Cre8Heading", wc: "cre8-heading", description: "Semantic heading element",
          props: [
            { name: "type", type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"', required: true, description: "Heading level" }
          ]
        },
        { name: "TextPassage", react: "Cre8TextPassage", wc: "cre8-text-passage", description: "Body text container" },
        { name: "TextLink", react: "Cre8TextLink", wc: "cre8-text-link", description: "Styled text link (inline within text)" }
      ]
    },
    navigation: {
      icon: "Navigation",
      color: "#06B6D4",
      description: "Navigation patterns and links",
      components: [
        { name: "Header", react: "Cre8Header", wc: "cre8-header", description: "Page header container" },
        { name: "Footer", react: "Cre8Footer", wc: "cre8-footer", description: "Page footer container" },
        { name: "GlobalNav", react: "Cre8GlobalNav", wc: "cre8-global-nav", description: "Global navigation bar container" },
        { name: "GlobalNavItem", react: "Cre8GlobalNavItem", wc: "cre8-global-nav-item", description: "Item within GlobalNav" },
        { name: "PrimaryNav", react: "Cre8PrimaryNav", wc: "cre8-primary-nav", description: "Primary navigation container" },
        { name: "PrimaryNavItem", react: "Cre8PrimaryNavItem", wc: "cre8-primary-nav-item", description: "Item within PrimaryNav" },
        { name: "TertiaryNav", react: "Cre8TertiaryNav", wc: "cre8-tertiary-nav", description: "Tertiary navigation container" },
        { name: "TertiaryNavItem", react: "Cre8TertiaryNavItem", wc: "cre8-tertiary-nav-item", description: "Item within TertiaryNav" },
        { name: "Breadcrumbs", react: "Cre8Breadcrumbs", wc: "cre8-breadcrumbs", description: "Breadcrumb navigation container" },
        { name: "BreadcrumbsItem", react: "Cre8BreadcrumbsItem", wc: "cre8-breadcrumbs-item", description: "Item within Breadcrumbs" },
        { name: "Tabs", react: "Cre8Tabs", wc: "cre8-tabs", description: "Tab navigation container" },
        { name: "Tab", react: "Cre8Tab", wc: "cre8-tab", description: "Individual tab within Tabs" },
        { name: "TabPanel", react: "Cre8TabPanel", wc: "cre8-tab-panel", description: "Content panel for a Tab" },
        { name: "Pagination", react: "Cre8Pagination", wc: "cre8-pagination", description: "Pagination controls for lists" },
        { name: "Link", react: "Cre8Link", wc: "cre8-link", description: "Navigation link component" }
      ]
    },
    disclosure: {
      icon: "Eye",
      color: "#EC4899",
      description: "Expandable/hideable content",
      components: [
        { name: "Accordion", react: "Cre8Accordion", wc: "cre8-accordion", description: "Accordion container for collapsible sections" },
        { name: "AccordionItem", react: "Cre8AccordionItem", wc: "cre8-accordion-item", description: "Individual collapsible item within Accordion" },
        { name: "Modal", react: "Cre8Modal", wc: "cre8-modal", description: "Modal dialog overlay",
          aiRules: ["Use for focused tasks, confirmations, forms", "Always provide clear close mechanism"]
        },
        { name: "Dropdown", react: "Cre8Dropdown", wc: "cre8-dropdown", description: "Dropdown menu container" },
        { name: "DropdownItem", react: "Cre8DropdownItem", wc: "cre8-dropdown-item", description: "Item within Dropdown" },
        { name: "Popover", react: "Cre8Popover", wc: "cre8-popover", description: "Popover content container" },
        { name: "Tooltip", react: "Cre8Tooltip", wc: "cre8-tooltip", description: "Tooltip for additional context",
          aiRules: ["Keep content brief (one sentence max)", "Don't put essential information in tooltips"]
        }
      ]
    },
    feedback: {
      icon: "Bell",
      color: "#EAB308",
      description: "User feedback and status indicators",
      components: [
        { name: "Alert", react: "Cre8Alert", wc: "cre8-alert", description: "Alert message for important notifications",
          props: [
            { name: "status", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Alert type" }
          ],
          aiRules: ["error — Failures, problems", "warning — Caution needed", "success — Confirmations", "info — Neutral information"]
        },
        { name: "InlineAlert", react: "Cre8InlineAlert", wc: "cre8-inline-alert", description: "Inline alert for contextual messages" },
        { name: "Badge", react: "Cre8Badge", wc: "cre8-badge", description: "Badge for status indicators or counts" },
        { name: "LoadingSpinner", react: "Cre8LoadingSpinner", wc: "cre8-loading-spinner", description: "Loading spinner indicator" },
        { name: "SkeletonLoader", react: "Cre8SkeletonLoader", wc: "cre8-skeleton-loader", description: "Skeleton loading placeholder" },
        { name: "ProgressMeter", react: "Cre8ProgressMeter", wc: "cre8-progress-meter", description: "Progress bar for completion status" },
        { name: "PercentBar", react: "Cre8PercentBar", wc: "cre8-percent-bar", description: "Percentage bar visualization" }
      ]
    },
    data: {
      icon: "Database",
      color: "#6366F1",
      description: "Data display and visualization",
      components: [
        { name: "Table", react: "Cre8Table", wc: "cre8-table", description: "Data table container" },
        { name: "TableHeader", react: "Cre8TableHeader", wc: "cre8-table-header", description: "Table header section" },
        { name: "TableHeaderCell", react: "Cre8TableHeaderCell", wc: "cre8-table-header-cell", description: "Header cell in table" },
        { name: "TableBody", react: "Cre8TableBody", wc: "cre8-table-body", description: "Table body section" },
        { name: "TableRow", react: "Cre8TableRow", wc: "cre8-table-row", description: "Table row" },
        { name: "TableCell", react: "Cre8TableCell", wc: "cre8-table-cell", description: "Table cell" },
        { name: "List", react: "Cre8List", wc: "cre8-list", description: "List container" },
        { name: "ListItem", react: "Cre8ListItem", wc: "cre8-list-item", description: "Item within List" },
        { name: "LinkList", react: "Cre8LinkList", wc: "cre8-link-list", description: "List of links" },
        { name: "LinkListItem", react: "Cre8LinkListItem", wc: "cre8-link-list-item", description: "Link item within LinkList" },
        { name: "Tag", react: "Cre8Tag", wc: "cre8-tag", description: "Tag/chip for categorization" },
        { name: "TagList", react: "Cre8TagList", wc: "cre8-tag-list", description: "Container for tags" },
        { name: "RemoveTag", react: "Cre8RemoveTag", wc: "cre8-remove-tag", description: "Removable tag with close button" },
        { name: "Chart", react: "Cre8Chart", wc: "cre8-chart", description: "Chart visualization component" }
      ]
    },
    media: {
      icon: "Play",
      color: "#EF4444",
      description: "Media and visual elements",
      components: [
        { name: "Icon", react: "Cre8Icon", wc: "cre8-icon", description: "SVG icon component" },
        { name: "Logo", react: "Cre8Logo", wc: "cre8-logo", description: "Logo component" }
      ]
    },
    marketing: {
      icon: "Box",
      color: "#14B8A6",
      description: "Marketing and promotional components",
      components: [
        { name: "Feature", react: "Cre8Feature", wc: "cre8-feature", description: "Feature highlight component" },
        { name: "PageHeader", react: "Cre8PageHeader", wc: "cre8-page-header", description: "Page header with actions" }
      ]
    }
  }
};

// ============================================================================
// USAGE PATTERNS
// ============================================================================
const usagePatterns = {
  loginForm: {
    name: "Login Form",
    description: "Standard authentication form pattern",
    react: `<Cre8Card>
  <Cre8Heading type="h2">Sign In</Cre8Heading>
  <Cre8Field label="Email" type="email" required />
  <Cre8Field label="Password" type="password" required />
  <Cre8Button text="Sign In" variant="primary" fullWidth />
</Cre8Card>`,
    wc: `<cre8-card>
  <cre8-heading type="h2">Sign In</cre8-heading>
  <cre8-field label="Email" type="email" required></cre8-field>
  <cre8-field label="Password" type="password" required></cre8-field>
  <cre8-button text="Sign In" variant="primary" full-width></cre8-button>
</cre8-card>`
  },
  pageLayout: {
    name: "Page Layout",
    description: "Standard page structure with header and footer",
    react: `<Cre8Layout>
  <Cre8Header>
    <Cre8GlobalNav>
      <Cre8GlobalNavItem href="/">Home</Cre8GlobalNavItem>
      <Cre8GlobalNavItem href="/about">About</Cre8GlobalNavItem>
    </Cre8GlobalNav>
  </Cre8Header>
  <main>
    <Cre8LayoutContainer>
      {/* Page content */}
    </Cre8LayoutContainer>
  </main>
  <Cre8Footer />
</Cre8Layout>`,
    wc: `<cre8-layout>
  <cre8-header>
    <cre8-global-nav>
      <cre8-global-nav-item href="/">Home</cre8-global-nav-item>
      <cre8-global-nav-item href="/about">About</cre8-global-nav-item>
    </cre8-global-nav>
  </cre8-header>
  <main>
    <cre8-layout-container>
      <!-- Page content -->
    </cre8-layout-container>
  </main>
  <cre8-footer></cre8-footer>
</cre8-layout>`
  },
  dataTable: {
    name: "Data Table",
    description: "Table with status badges and actions",
    react: `<Cre8Table>
  <Cre8TableHeader>
    <Cre8TableRow>
      <Cre8TableHeaderCell>Name</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Status</Cre8TableHeaderCell>
      <Cre8TableHeaderCell>Actions</Cre8TableHeaderCell>
    </Cre8TableRow>
  </Cre8TableHeader>
  <Cre8TableBody>
    <Cre8TableRow>
      <Cre8TableCell>Project Alpha</Cre8TableCell>
      <Cre8TableCell>
        <Cre8Badge text="Active" variant="success" />
      </Cre8TableCell>
      <Cre8TableCell>
        <Cre8Button text="Edit" variant="tertiary" size="sm" />
      </Cre8TableCell>
    </Cre8TableRow>
  </Cre8TableBody>
</Cre8Table>`,
    wc: `<cre8-table>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Name</cre8-table-header-cell>
      <cre8-table-header-cell>Status</cre8-table-header-cell>
      <cre8-table-header-cell>Actions</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Project Alpha</cre8-table-cell>
      <cre8-table-cell>
        <cre8-badge text="Active" variant="success"></cre8-badge>
      </cre8-table-cell>
      <cre8-table-cell>
        <cre8-button text="Edit" variant="tertiary" size="sm"></cre8-button>
      </cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`
  },
  alertBanner: {
    name: "Alert Banner",
    description: "Feedback alerts for user notifications",
    react: `<Cre8Alert status="success">
  Your changes have been saved successfully.
</Cre8Alert>

<Cre8Alert status="error">
  Something went wrong. Please try again.
</Cre8Alert>

<Cre8Alert status="warning">
  Your session will expire in 5 minutes.
</Cre8Alert>`,
    wc: `<cre8-alert status="success">
  Your changes have been saved successfully.
</cre8-alert>

<cre8-alert status="error">
  Something went wrong. Please try again.
</cre8-alert>

<cre8-alert status="warning">
  Your session will expire in 5 minutes.
</cre8-alert>`
  },
  tabbedContent: {
    name: "Tabbed Content",
    description: "Tab-based content organization",
    react: `<Cre8Tabs>
  <Cre8Tab label="Overview" selected />
  <Cre8Tab label="Features" />
  <Cre8Tab label="Pricing" />
  <Cre8TabPanel>Overview content here</Cre8TabPanel>
  <Cre8TabPanel>Features content here</Cre8TabPanel>
  <Cre8TabPanel>Pricing content here</Cre8TabPanel>
</Cre8Tabs>`,
    wc: `<cre8-tabs>
  <cre8-tab label="Overview" selected></cre8-tab>
  <cre8-tab label="Features"></cre8-tab>
  <cre8-tab label="Pricing"></cre8-tab>
  <cre8-tab-panel>Overview content here</cre8-tab-panel>
  <cre8-tab-panel>Features content here</cre8-tab-panel>
  <cre8-tab-panel>Pricing content here</cre8-tab-panel>
</cre8-tabs>`
  }
};

// ============================================================================
// ICON COMPONENT MAP
// ============================================================================
const iconMap = {
  Zap, Type, Layout, Navigation, Eye, Bell, Database, Play, Box
};

// ============================================================================
// CODE BLOCK COMPONENT
// ============================================================================
const CodeBlock = ({ code, language = 'jsx', title, showCopy = true }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/80 backdrop-blur">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
          <span className="text-xs font-medium text-slate-400">{title}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700/50"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );
};

// ============================================================================
// SIDEBAR NAVIGATION
// ============================================================================
const Sidebar = ({ activeSection, setActiveSection, activeComponent, setActiveComponent, searchQuery, setSearchQuery }) => {
  const [expandedCategories, setExpandedCategories] = useState(['actions', 'forms', 'layout']);
  
  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };
  
  const filteredCategories = Object.entries(componentManifest.categories).reduce((acc, [key, cat]) => {
    const filtered = cat.components.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[key] = { ...cat, components: filtered };
    return acc;
  }, {});
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'getting-started', label: 'Getting Started', icon: Terminal },
    { id: 'a2ui-schema', label: 'A2UI Schema', icon: FileJson },
    { id: 'mcp-integration', label: 'MCP Integration', icon: Server },
    { id: 'patterns', label: 'Usage Patterns', icon: GitBranch },
  ];
  
  return (
    <aside className="w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 h-screen overflow-y-auto fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="p-5 border-b border-slate-800/50 sticky top-0 bg-slate-900/95 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">CRE8 A2UI</h1>
            <p className="text-xs text-slate-400">v{componentManifest.metadata.version} • 72 components</p>
          </div>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>
      
      <nav className="p-3">
        {/* Main Navigation */}
        <div className="mb-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setActiveComponent(null); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center gap-3 mb-1 transition-all ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon size={18} className={activeSection === item.id ? 'text-indigo-400' : ''} />
                {item.label}
              </button>
            );
          })}
        </div>
        
        {/* Components Section */}
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-6 flex items-center gap-2">
          <Layers size={12} />
          Components
        </div>
        
        {Object.entries(searchQuery ? filteredCategories : componentManifest.categories).map(([key, category]) => {
          const Icon = iconMap[category.icon] || Box;
          const isExpanded = expandedCategories.includes(key);
          
          return (
            <div key={key} className="mb-1">
              <button
                onClick={() => toggleCategory(key)}
                className="w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between text-slate-300 hover:bg-slate-800/50 transition-all group"
              >
                <span className="flex items-center gap-2.5 capitalize">
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                    <Icon size={14} style={{ color: category.color }} />
                  </span>
                  {key}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{category.components.length}</span>
                  <ChevronRight size={14} className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </span>
              </button>
              
              {isExpanded && (
                <div className="ml-8 mt-1 space-y-0.5 border-l border-slate-800 pl-3">
                  {category.components.map(comp => (
                    <button
                      key={comp.name}
                      onClick={() => { setActiveSection('component'); setActiveComponent({ ...comp, category: key, categoryData: category }); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                        activeComponent?.name === comp.name 
                          ? 'bg-indigo-500/20 text-indigo-300' 
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                      }`}
                    >
                      {comp.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

// ============================================================================
// OVERVIEW PAGE
// ============================================================================
const OverviewPage = ({ setActiveSection }) => (
  <div className="max-w-5xl">
    {/* Hero */}
    <div className="mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm mb-6">
        <Sparkles size={14} />
        Agent-to-UI Design System
      </div>
      <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        CRE8 A2UI Documentation
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
        A semantic component schema enabling AI agents to generate consistent, framework-agnostic UIs. 
        72 components across React and Web Components.
      </p>
    </div>
    
    {/* Framework Cards */}
    <div className="grid grid-cols-2 gap-5 mb-12">
      <div className="group relative bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 hover:border-indigo-500/40 transition-all cursor-pointer" onClick={() => setActiveSection('getting-started')}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">@tmorrow/cre8-react</h3>
              <p className="text-sm text-slate-400">React Components</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-4">PascalCase components with full TypeScript support. Ideal for React applications.</p>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
            Get started <ArrowRight size={14} />
          </div>
        </div>
      </div>
      
      <div className="group relative bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all cursor-pointer" onClick={() => setActiveSection('getting-started')}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">@tmorrow/cre8-wc</h3>
              <p className="text-sm text-slate-400">Web Components</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mb-4">Framework-agnostic custom elements built with Lit. Works anywhere HTML works.</p>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            Get started <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
    
    {/* Stats */}
    <div className="grid grid-cols-4 gap-4 mb-12">
      {[
        { label: 'Components', value: '72', icon: Layers },
        { label: 'Categories', value: '10', icon: Box },
        { label: 'Patterns', value: '5', icon: GitBranch },
        { label: 'Frameworks', value: '2', icon: Code }
      ].map(stat => (
        <div key={stat.label} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 text-center">
          <stat.icon size={20} className="mx-auto mb-2 text-slate-500" />
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
    
    {/* Categories Grid */}
    <h2 className="text-2xl font-bold text-white mb-6">Component Categories</h2>
    <div className="grid grid-cols-2 gap-3 mb-12">
      {Object.entries(componentManifest.categories).map(([key, category]) => {
        const Icon = iconMap[category.icon] || Box;
        return (
          <div key={key} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${category.color}20` }}>
              <Icon size={24} style={{ color: category.color }} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white capitalize">{key}</h3>
              <p className="text-xs text-slate-500">{category.components.length} components</p>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          </div>
        );
      })}
    </div>
    
    {/* Quick Example */}
    <h2 className="text-2xl font-bold text-white mb-6">Quick Example</h2>
    <div className="grid grid-cols-2 gap-4">
      <CodeBlock
        title="React"
        code={`import { Cre8Button, Cre8Card, Cre8Heading } from '@tmorrow/cre8-react';

function App() {
  return (
    <Cre8Card>
      <Cre8Heading type="h2">Welcome</Cre8Heading>
      <Cre8Button text="Get Started" variant="primary" />
    </Cre8Card>
  );
}`}
      />
      <CodeBlock
        title="Web Components"
        code={`<script type="module" src="@tmorrow/cre8-wc"></script>

<cre8-card>
  <cre8-heading type="h2">Welcome</cre8-heading>
  <cre8-button text="Get Started" variant="primary"></cre8-button>
</cre8-card>`}
      />
    </div>
  </div>
);

// ============================================================================
// GETTING STARTED PAGE
// ============================================================================
const GettingStartedPage = () => (
  <div className="max-w-4xl">
    <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
    <p className="text-xl text-slate-400 mb-10">Install and configure CRE8 components in your project.</p>
    
    <div className="space-y-10">
      {/* React */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Package size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">React Installation</h2>
        </div>
        
        <div className="space-y-4">
          <CodeBlock title="Install" code="npm install @tmorrow/cre8-react" />
          <CodeBlock
            title="Usage"
            code={`import { 
  Cre8Layout, Cre8Header, Cre8Button, Cre8Card, Cre8Heading 
} from '@tmorrow/cre8-react';

function App() {
  return (
    <Cre8Layout>
      <Cre8Header>{/* Navigation */}</Cre8Header>
      <main>
        <Cre8Card>
          <Cre8Heading type="h1">Hello CRE8</Cre8Heading>
          <Cre8Button text="Click Me" variant="primary" />
        </Cre8Card>
      </main>
    </Cre8Layout>
  );
}`}
          />
        </div>
      </section>
      
      {/* Web Components */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Code size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Web Components Installation</h2>
        </div>
        
        <div className="space-y-4">
          <CodeBlock title="Install" code="npm install @tmorrow/cre8-wc" />
          <CodeBlock
            title="HTML Usage"
            code={`<!DOCTYPE html>
<html>
<head>
  <script type="module" src="node_modules/@tmorrow/cre8-wc/dist/cre8-wc.esm.js"></script>
</head>
<body>
  <cre8-layout>
    <cre8-header><!-- Navigation --></cre8-header>
    <main>
      <cre8-card>
        <cre8-heading type="h1">Hello CRE8</cre8-heading>
        <cre8-button text="Click Me" variant="primary"></cre8-button>
      </cre8-card>
    </main>
  </cre8-layout>
</body>
</html>`}
          />
        </div>
      </section>
      
      {/* Comparison Table */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Framework Comparison</h2>
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="text-left py-4 px-5 text-slate-400 font-medium">Feature</th>
                <th className="text-left py-4 px-5 text-indigo-400 font-medium">React</th>
                <th className="text-left py-4 px-5 text-emerald-400 font-medium">Web Components</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {[
                ['Package', '@tmorrow/cre8-react', '@tmorrow/cre8-wc'],
                ['Naming', 'PascalCase (Cre8Button)', 'kebab-case (cre8-button)'],
                ['Props', 'camelCase (fullWidth)', 'kebab-case (full-width)'],
                ['Events', 'onClick, onChange', '@click, addEventListener'],
                ['Best For', 'React applications', 'Any framework, static sites']
              ].map(([feature, react, wc], i) => (
                <tr key={feature} className={i < 4 ? 'border-b border-slate-700/30' : ''}>
                  <td className="py-3 px-5 text-slate-400">{feature}</td>
                  <td className="py-3 px-5 font-mono text-sm">{react}</td>
                  <td className="py-3 px-5 font-mono text-sm">{wc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
);

// ============================================================================
// A2UI SCHEMA PAGE
// ============================================================================
const A2UISchemaPage = () => (
  <div className="max-w-4xl">
    <h1 className="text-4xl font-bold text-white mb-4">A2UI Schema</h1>
    <p className="text-xl text-slate-400 mb-8">
      Agent-to-UI (A2UI) is a semantic abstraction layer enabling AI agents to generate framework-agnostic UI.
    </p>
    
    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">What is A2UI?</h2>
          <p className="text-slate-300 leading-relaxed">
            A2UI provides a standardized schema for describing UI components, their properties, relationships, and usage patterns. 
            AI agents generate UI specifications using this schema, which transpiles to React or Web Components.
          </p>
        </div>
      </div>
    </div>
    
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">Component Schema</h2>
      <CodeBlock
        title="Example: Button Component Schema"
        code={JSON.stringify({
          name: "Button",
          react: "Cre8Button",
          wc: "cre8-button",
          category: "actions",
          description: "Primary interactive element for user actions",
          props: {
            text: { type: "string", required: true, description: "Button text" },
            variant: { type: "enum", values: ["primary", "secondary", "tertiary"], default: "primary" },
            disabled: { type: "boolean", default: false }
          },
          aiRules: [
            "One variant='primary' per screen",
            "Keep text short: max 3 words"
          ]
        }, null, 2)}
      />
    </section>
    
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-6">AI Generation Flow</h2>
      <div className="space-y-6">
        {[
          { step: 1, title: 'AI Receives Intent', content: '"Create a login form with email, password, and submit button"', color: 'indigo' },
          { step: 2, title: 'AI Generates A2UI Schema', code: `{
  "component": "Cre8Card",
  "children": [
    { "component": "Cre8Heading", "props": { "type": "h2" }, "children": "Sign In" },
    { "component": "Cre8Field", "props": { "label": "Email", "type": "email" } },
    { "component": "Cre8Field", "props": { "label": "Password", "type": "password" } },
    { "component": "Cre8Button", "props": { "text": "Sign In", "variant": "primary" } }
  ]
}`, color: 'purple' },
          { step: 3, title: 'Transpile to Framework', color: 'pink' }
        ].map(item => (
          <div key={item.step} className="flex gap-4">
            <div className={`w-10 h-10 bg-${item.color}-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg shadow-${item.color}-500/25`}>
              {item.step}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              {item.content && <p className="text-slate-400 text-sm italic">"{item.content}"</p>}
              {item.code && <CodeBlock code={item.code} />}
              {item.step === 3 && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <CodeBlock title="React" code={usagePatterns.loginForm.react} />
                  <CodeBlock title="Web Components" code={usagePatterns.loginForm.wc} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ============================================================================
// MCP INTEGRATION PAGE
// ============================================================================
const MCPIntegrationPage = () => (
  <div className="max-w-4xl">
    <h1 className="text-4xl font-bold text-white mb-4">MCP Integration</h1>
    <p className="text-xl text-slate-400 mb-8">
      Connect to the CRE8 Design System via Model Context Protocol for real-time component discovery.
    </p>
    
    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Server size={20} className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">What is MCP?</h2>
          <p className="text-slate-300 leading-relaxed">
            Model Context Protocol (MCP) enables AI models to interact with external services. 
            The CRE8 MCP server provides live component schemas, validation, and usage patterns.
          </p>
        </div>
      </div>
    </div>
    
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">Server Configuration</h2>
      <CodeBlock
        title="Claude Desktop / MCP Client Configuration"
        code={`{
  "mcpServers": {
    "cre8-design-system": {
      "type": "url",
      "url": "${componentManifest.metadata.mcpEndpoint}",
      "name": "design-system"
    }
  }
}`}
      />
    </section>
    
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">Available Tools</h2>
      <div className="space-y-4">
        {[
          { name: 'list_components', description: 'Get all available components with metadata', example: '{ "category": "forms" }' },
          { name: 'get_component', description: 'Get detailed schema for a specific component', example: '{ "name": "Cre8Button" }' },
          { name: 'get_patterns', description: 'Get usage patterns and examples', example: '{ "pattern": "loginForm" }' },
          { name: 'validate_usage', description: 'Validate component prop combinations', example: '{ "component": "Cre8Button", "props": {...} }' }
        ].map(tool => (
          <div key={tool.name} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-cyan-400 font-mono font-semibold">{tool.name}</code>
            </div>
            <p className="text-slate-400 text-sm mb-3">{tool.description}</p>
            <CodeBlock code={tool.example} title="Example Input" />
          </div>
        ))}
      </div>
    </section>
    
    <section>
      <h2 className="text-2xl font-bold text-white mb-4">Example Workflow</h2>
      <CodeBlock
        title="AI Agent Using MCP"
        code={`// 1. Agent receives user request
User: "Create a contact form with name, email, and message fields"

// 2. Agent queries MCP for form components
await mcp.call("list_components", { category: "forms" });
// Returns: [Cre8Field, Cre8Select, Cre8CheckboxField, ...]

// 3. Agent gets component details
await mcp.call("get_component", { name: "Cre8Field" });
// Returns: { props: [...], aiRules: [...], examples: [...] }

// 4. Agent generates A2UI schema following rules
const schema = {
  component: "Cre8Card",
  children: [
    { component: "Cre8Heading", props: { type: "h2" }, children: "Contact Us" },
    { component: "Cre8Field", props: { label: "Name", required: true } },
    { component: "Cre8Field", props: { label: "Email", type: "email", required: true } },
    { component: "Cre8Field", props: { label: "Message" } },
    { component: "Cre8Button", props: { text: "Send", variant: "primary" } }
  ]
};

// 5. Agent validates before rendering
await mcp.call("validate_usage", { schema });
// Returns: { valid: true }`}
      />
    </section>
  </div>
);

// ============================================================================
// PATTERNS PAGE
// ============================================================================
const PatternsPage = () => {
  const [activeFramework, setActiveFramework] = useState('react');
  
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-4">Usage Patterns</h1>
      <p className="text-xl text-slate-400 mb-8">
        Common UI patterns implemented with CRE8 components.
      </p>
      
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setActiveFramework('react')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeFramework === 'react' 
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          React
        </button>
        <button
          onClick={() => setActiveFramework('wc')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeFramework === 'wc' 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Web Components
        </button>
      </div>
      
      <div className="space-y-8">
        {Object.entries(usagePatterns).map(([key, pattern]) => (
          <div key={key} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-1">{pattern.name}</h3>
              <p className="text-slate-400 text-sm">{pattern.description}</p>
            </div>
            <div className="p-0">
              <CodeBlock
                code={activeFramework === 'react' ? pattern.react : pattern.wc}
                title={activeFramework === 'react' ? 'React' : 'HTML'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT DETAIL PAGE
// ============================================================================
const ComponentPage = ({ component }) => {
  const [activeFramework, setActiveFramework] = useState('react');
  
  const generateExample = (fw) => {
    const tag = fw === 'react' ? component.react : component.wc;
    const props = component.props?.slice(0, 2).map(p => {
      if (p.name === 'text') return `${fw === 'react' ? 'text' : 'text'}="Example"`;
      if (p.name === 'variant') return `${fw === 'react' ? 'variant' : 'variant'}="primary"`;
      if (p.name === 'label') return `${fw === 'react' ? 'label' : 'label'}="Field Label"`;
      if (p.name === 'type') return `${fw === 'react' ? 'type' : 'type'}="h2"`;
      return '';
    }).filter(Boolean).join(' ');
    
    return fw === 'react' 
      ? `<${tag}${props ? ' ' + props : ''} />`
      : `<${tag}${props ? ' ' + props : ''}></${tag}>`;
  };
  
  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
        <span className="capitalize">{component.category}</span>
        <ChevronRight size={14} />
        <span className="text-white">{component.name}</span>
      </div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{component.name}</h1>
          <p className="text-xl text-slate-400">{component.description}</p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${component.categoryData.color}20` }}>
          {(() => { const Icon = iconMap[component.categoryData.icon] || Box; return <Icon size={24} style={{ color: component.categoryData.color }} />; })()}
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex gap-3 mb-8">
        <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-sm">
          <span className="text-slate-500">React: </span>
          <code className="text-indigo-400 font-mono">{component.react}</code>
        </div>
        <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-sm">
          <span className="text-slate-500">WC: </span>
          <code className="text-emerald-400 font-mono">&lt;{component.wc}&gt;</code>
        </div>
      </div>
      
      {/* Usage */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Usage</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveFramework('react')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeFramework === 'react' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            React
          </button>
          <button
            onClick={() => setActiveFramework('wc')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeFramework === 'wc' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            Web Components
          </button>
        </div>
        <CodeBlock code={generateExample(activeFramework)} title={activeFramework === 'react' ? 'React' : 'HTML'} />
      </section>
      
      {/* Props */}
      {component.props && component.props.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Props</h2>
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50 bg-slate-800/50">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Prop</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Default</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop, i) => (
                  <tr key={prop.name} className={i < component.props.length - 1 ? 'border-b border-slate-700/30' : ''}>
                    <td className="py-3 px-4">
                      <code className="text-indigo-400 font-mono">{prop.name}</code>
                      {prop.required && <span className="ml-2 text-red-400 text-xs">*</span>}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-xs">{prop.type}</td>
                    <td className="py-3 px-4 text-slate-500">{prop.default || '—'}</td>
                    <td className="py-3 px-4 text-slate-300">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      
      {/* AI Rules */}
      {component.aiRules && component.aiRules.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">AI Implementation Rules</h2>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <ul className="space-y-2">
                {component.aiRules.map((rule, i) => (
                  <li key={i} className="text-slate-300 text-sm">{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
      
      {/* A2UI Schema */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">A2UI Schema</h2>
        <CodeBlock
          title="Component Schema (JSON)"
          code={JSON.stringify({
            name: component.name,
            react: component.react,
            wc: component.wc,
            category: component.category,
            description: component.description,
            props: component.props?.reduce((acc, p) => {
              acc[p.name] = { type: p.type, ...(p.required && { required: true }), ...(p.default && { default: p.default }) };
              return acc;
            }, {}) || {},
            ...(component.aiRules && { aiRules: component.aiRules })
          }, null, 2)}
        />
      </section>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeComponent, setActiveComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="ml-72 p-10 min-h-screen">
        {activeSection === 'overview' && <OverviewPage setActiveSection={setActiveSection} />}
        {activeSection === 'getting-started' && <GettingStartedPage />}
        {activeSection === 'a2ui-schema' && <A2UISchemaPage />}
        {activeSection === 'mcp-integration' && <MCPIntegrationPage />}
        {activeSection === 'patterns' && <PatternsPage />}
        {activeSection === 'component' && activeComponent && <ComponentPage component={activeComponent} />}
      </main>
    </div>
  );
}
