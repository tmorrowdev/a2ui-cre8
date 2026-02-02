/**
 * @a2ui-bridge/react-cre8 - Text component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { TextNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Heading as Cre8HeadingWC, Cre8TextPassage as Cre8TextPassageWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8Heading = createPermissiveComponent('cre8-heading', Cre8HeadingWC);
const Cre8TextPassage = createPermissiveComponent('cre8-text-passage', Cre8TextPassageWC);

// Map A2UI usageHint to cre8 style-variant
const headingVariantMap: Record<string, string> = {
  h1: 'display-default',
  h2: 'display-small',
  h3: 'headline-large',
  h4: 'headline-default',
  h5: 'headline-small',
  h6: 'title-large',
  title: 'title-default',
  subtitle: 'title-small',
  label: 'label-default',
};

const bodyVariantMap: Record<string, string> = {
  body: 'body-default',
  caption: 'meta-default',
  overline: 'meta-small',
};

export function Text({ node }: A2UIComponentProps<TextNode>): JSX.Element {
  const { properties } = node;

  const text = extractString(properties.text) ?? '';
  const usageHint = properties.usageHint ?? 'body';

  // Check if this is a heading variant
  if (headingVariantMap[usageHint]) {
    return (
      <Cre8Heading style-variant={headingVariantMap[usageHint]}>
        {text}
      </Cre8Heading>
    );
  }

  // Use Cre8TextPassage for body text
  const bodyVariant = bodyVariantMap[usageHint] ?? 'body-default';
  return <Cre8TextPassage style-variant={bodyVariant}>{text}</Cre8TextPassage>;
}
