/**
 * @a2ui-bridge/react-cre8 - Component mapping
 * MIT License - Copyright (c) 2025 southleft
 */

import type { ComponentMapping } from '@a2ui-bridge/react';

// Core A2UI adapters
import { Row } from './components/Row.js';
import { Column } from './components/Column.js';
import { Card } from './components/Card.js';
import { Divider } from './components/Divider.js';
import { Text } from './components/Text.js';
import { Badge } from './components/Badge.js';
import { Image } from './components/Image.js';
import { Icon } from './components/Icon.js';
import { Button } from './components/Button.js';
import { TextField } from './components/TextField.js';
import { Select } from './components/Select.js';
import { Checkbox } from './components/Checkbox.js';

// Extended cre8-specific adapters
import { Alert } from './components/Alert.js';
import { Hero } from './components/Hero.js';
import { Band } from './components/Band.js';
import { LoadingSpinner } from './components/LoadingSpinner.js';

// Layout (new)
import { Separator } from './components/Separator.js';
import { ScrollArea } from './components/ScrollArea.js';
import { AspectRatio } from './components/AspectRatio.js';
import { Flex } from './components/Flex.js';
import { Grid } from './components/Grid.js';
import { Center } from './components/Center.js';
import { Box } from './components/Box.js';
import { Container } from './components/Container.js';

// Typography & Display (new)
import { Label } from './components/Label.js';
import { Link } from './components/Link.js';
import { Avatar } from './components/Avatar.js';
import { Skeleton } from './components/Skeleton.js';
import { Title } from './components/Title.js';
import { Code } from './components/Code.js';
import { Blockquote } from './components/Blockquote.js';

// Form inputs (new)
import { Input } from './components/Input.js';
import { TextArea } from './components/TextArea.js';
import { Switch } from './components/Switch.js';
import { RadioGroup } from './components/RadioGroup.js';
import { Slider } from './components/Slider.js';
import { ActionIcon } from './components/ActionIcon.js';
import { MultiSelect } from './components/MultiSelect.js';
import { NumberInput } from './components/NumberInput.js';
import { DateTimeInput } from './components/DateTimeInput.js';

// Feedback & Status (new)
import { Progress } from './components/Progress.js';
import { Toast } from './components/Toast.js';
import { Tooltip } from './components/Tooltip.js';

// Navigation (new)
import { Tabs } from './components/Tabs.js';
import { TabPanel } from './components/TabPanel.js';
import { Breadcrumb } from './components/Breadcrumb.js';
import { Pagination } from './components/Pagination.js';

// Data display (new)
import { List } from './components/List.js';
import { Table } from './components/Table.js';
import { TableHeader } from './components/TableHeader.js';
import { TableBody } from './components/TableBody.js';
import { TableRow } from './components/TableRow.js';
import { TableCell } from './components/TableCell.js';

// Disclosure & Overlay (new)
import { Accordion } from './components/Accordion.js';
import { AccordionItem } from './components/AccordionItem.js';
import { Collapsible } from './components/Collapsible.js';
import { Dialog } from './components/Dialog.js';
import { Sheet } from './components/Sheet.js';
import { Popover } from './components/Popover.js';
import { DropdownMenu } from './components/DropdownMenu.js';
import { HoverCard } from './components/HoverCard.js';

// Utility
import { Fallback } from './components/Fallback.js';

/**
 * Cre8 component mapping for A2UI.
 * Use this with the Root or Surface components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { cre8Components } from '@a2ui-bridge/react-cre8';
 *
 * // Import cre8 design tokens (choose one):
 * // Via CDN in HTML: <link href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css" rel="stylesheet">
 * // Via npm: import '@cre8_dev/cre8-design-tokens/lib/web/brands/cre8/css/tokens_cre8.css';
 *
 * <Surface
 *   processor={processor}
 *   components={cre8Components}
 *   onAction={handleAction}
 * />
 * ```
 */
export const cre8Components: ComponentMapping = {
  // Core A2UI types
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
  CheckBox: Checkbox,

  // Layout aliases
  HStack: Row,
  VStack: Column,
  Stack: Column,

  // Extended cre8-specific types
  Alert,
  Hero,
  Band,
  LoadingSpinner,
  Spinner: LoadingSpinner,
  Loader: LoadingSpinner,

  // Layout (new)
  Separator,
  ScrollArea,
  AspectRatio,
  Flex,
  Grid,
  Center,
  Box,
  Container,

  // Typography & Display (new)
  Label,
  Link,
  Avatar,
  Skeleton,
  Title,
  Code,
  Blockquote,
  // Typography aliases
  Heading: Title,
  H1: Title,
  H2: Title,
  H3: Title,
  H4: Title,
  H5: Title,
  H6: Title,

  // Form inputs (new)
  Input,
  TextArea,
  Switch,
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
  Toggle: Switch,

  // Feedback & Status (new)
  Progress,
  Toast,
  Tooltip,

  // Navigation (new)
  Tabs,
  TabPanel,
  Breadcrumb,
  Pagination,
  // Navigation aliases
  Breadcrumbs: Breadcrumb,

  // Data display (new)
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,

  // Disclosure & Overlay (new)
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

  // Fallback for unknown components
  __fallback__: Fallback,
};

/**
 * Creates a component mapping with custom overrides.
 */
export function createComponentsWithFallback(
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
