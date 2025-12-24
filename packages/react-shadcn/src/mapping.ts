/**
 * @a2ui-bridge/react-shadcn - Component mapping
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { ComponentMapping } from '@a2ui-bridge/react';
import { Text } from './components/Text.js';
import { Button } from './components/Button.js';
import { Row } from './components/Row.js';
import { Column } from './components/Column.js';
import { Card } from './components/Card.js';
import { TextField } from './components/TextField.js';
import { Badge } from './components/Badge.js';
import { Divider } from './components/Divider.js';
import { List } from './components/List.js';
import { Image } from './components/Image.js';

/**
 * ShadCN/Tailwind component mapping for A2UI.
 * Use this with the Root or Surface components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { shadcnComponents } from '@a2ui-bridge/react-shadcn';
 *
 * <Surface
 *   processor={processor}
 *   components={shadcnComponents}
 *   onAction={handleAction}
 * />
 * ```
 */
export const shadcnComponents: ComponentMapping = {
  Text,
  Button,
  Row,
  Column,
  Card,
  TextField,
  Badge,
  Divider,
  List,
  Image,
  // TODO: Add more components as needed
  // Icon,
  // Video,
  // AudioPlayer,
  // Select,
  // Grid,
  // Tabs,
  // Modal,
  // CheckBox,
  // DateTimeInput,
  // MultipleChoice,
  // Slider,
};
