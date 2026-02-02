/**
 * @a2ui-bridge/react-cre8 - Alert component (cre8 extended)
 * MIT License - Copyright (c) 2025 southleft
 */

import type { CustomNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Alert as Cre8AlertWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, extractBoolean, createPermissiveComponent } from '../utils.js';

const Cre8Alert = createPermissiveComponent('cre8-alert', Cre8AlertWC);

export function Alert({ node }: A2UIComponentProps<CustomNode>): JSX.Element {
  const { properties } = node;

  const headerText = extractString(properties.headingText) ?? extractString(properties.headerText) ?? '';
  const ctaBody = extractString(properties.bodyText) ?? extractString(properties.ctaBody) ?? '';
  const status = extractString(properties.status) as 'info' | 'success' | 'warning' | 'error' | 'notification' | 'neutral' | undefined;
  const notDismissible = !extractBoolean(properties.dismissible);

  return (
    <Cre8Alert
      headerText={headerText}
      ctaBody={ctaBody}
      status={status}
      notDismissible={notDismissible}
    />
  );
}
