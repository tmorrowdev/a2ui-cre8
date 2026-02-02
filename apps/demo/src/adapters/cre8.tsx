/**
 * Cre8 Component Adapters for A2UI Bridge
 *
 * Comprehensive adapter set for Cre8 web components.
 * Maps A2UI protocol nodes to @tmorrow/cre8-wc components.
 */

import type { ComponentMapping } from '@a2ui-bridge/react';

// Import all components from react-cre8
import {
  // Core A2UI adapters
  Row,
  Column,
  Card,
  Divider,
  Text,
  Badge,
  Image,
  Icon,
  Button,
  TextField,
  Select,
  Checkbox,

  // Extended cre8-specific adapters
  Alert,
  Hero,
  Band,
  LoadingSpinner,

  // Layout
  Separator,
  ScrollArea,
  AspectRatio,
  Flex,
  Grid,
  Center,
  Box,
  Container,

  // Typography & Display
  Label,
  Link,
  Avatar,
  Skeleton,
  Title,
  Code,
  Blockquote,

  // Form inputs
  Input,
  TextArea,
  Switch,
  RadioGroup,
  Slider,
  ActionIcon,
  MultiSelect,
  NumberInput,
  DateTimeInput,

  // Feedback & Status
  Progress,
  Toast,
  Tooltip,

  // Navigation
  Tabs,
  TabPanel,
  Breadcrumb,
  Pagination,

  // Data display
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,

  // Disclosure & Overlay
  Accordion,
  AccordionItem,
  Collapsible,
  Dialog,
  Sheet,
  Popover,
  DropdownMenu,
  HoverCard,

  // Utility
  Fallback,
} from '@a2ui-bridge/react-cre8';

/**
 * Cre8 component mapping for A2UI.
 * Use this with the Root or Surface components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { cre8Components } from './adapters/cre8';
 *
 * <Surface
 *   processor={processor}
 *   components={cre8Components}
 *   onAction={handleAction}
 * />
 * ```
 */
export const cre8Components: ComponentMapping = {
  // Layout (12 + aliases)
  Row,
  Column,
  Card,
  Divider,
  Separator,
  ScrollArea,
  AspectRatio,
  Flex,
  Grid,
  Center,
  Box,
  Container,
  // Layout aliases
  HStack: Row,
  VStack: Column,
  Stack: Column,

  // Typography & Display (10)
  Text,
  Badge,
  Label,
  Link,
  Image,
  Avatar,
  Skeleton,
  Title,
  Code,
  Blockquote,
  Icon,
  // Typography aliases
  Heading: Title,
  H1: Title,
  H2: Title,
  H3: Title,
  H4: Title,
  H5: Title,
  H6: Title,

  // Form inputs (13)
  Button,
  Input,
  TextField,
  TextArea,
  Checkbox,
  Switch,
  Select,
  RadioGroup,
  Slider,
  ActionIcon,
  MultiSelect,
  NumberInput,
  DateTimeInput,
  // Form aliases
  IconButton: ActionIcon,
  TextInput: TextField,
  Textarea: TextArea,
  CheckBox: Checkbox,
  Toggle: Switch,

  // Feedback & Status (5)
  Alert,
  Progress,
  Toast,
  Tooltip,
  // Feedback aliases - map Spinner to LoadingSpinner
  Spinner: LoadingSpinner,
  Loader: LoadingSpinner,
  Loading: LoadingSpinner,

  // Navigation (4)
  Tabs,
  TabPanel,
  Breadcrumb,
  Pagination,
  // Navigation aliases
  Breadcrumbs: Breadcrumb,

  // Data display (6)
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,

  // Disclosure & Overlay (8)
  Accordion,
  AccordionItem,
  Collapsible,
  Dialog,
  Sheet,
  Popover,
  DropdownMenu,
  HoverCard,
  // Overlay aliases
  Modal: Dialog,
  Drawer: Sheet,
  Menu: DropdownMenu,

  // Cre8-specific components
  Hero,
  Band,
  LoadingSpinner,

  // Fallback for unknown components (1)
  __fallback__: Fallback,
};

/**
 * Creates a component mapping that includes fallback handling for unknown component types.
 * Use this instead of cre8Components if you want graceful degradation for unknown components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { createCre8ComponentsWithFallback } from './adapters/cre8';
 *
 * const components = createCre8ComponentsWithFallback();
 *
 * <Surface
 *   processor={processor}
 *   components={components}
 *   onAction={handleAction}
 * />
 * ```
 */
export function createCre8ComponentsWithFallback(
  customComponents?: Partial<ComponentMapping>
): ComponentMapping {
  return {
    ...cre8Components,
    ...customComponents,
  };
}

/**
 * Re-export the Fallback component for direct use
 */
export { Fallback };
