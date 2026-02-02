/**
 * @a2ui-bridge/react-cre8 - Breadcrumb component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Breadcrumbs as Cre8BreadcrumbsWC, Cre8BreadcrumbsItem as Cre8BreadcrumbsItemWC, Cre8TextLink as Cre8TextLinkWC } from '@tmorrow/cre8-wc/cdn';
import { createPermissiveComponent } from '../utils.js';

const Cre8Breadcrumbs = createPermissiveComponent('cre8-breadcrumbs', Cre8BreadcrumbsWC);
const Cre8BreadcrumbsItem = createPermissiveComponent('cre8-breadcrumbs-item', Cre8BreadcrumbsItemWC);
const Cre8TextLink = createPermissiveComponent('cre8-text-link', Cre8TextLinkWC);

interface BreadcrumbItemProps {
  label: string | { literalString: string };
  href?: string | { literalString: string };
}

export function Breadcrumb({
  node,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const items: BreadcrumbItemProps[] = (properties as any).items ?? [];

  return (
    <Cre8Breadcrumbs>
      {items.map((item, idx) => {
        const label = typeof item.label === 'object' ? item.label.literalString : item.label;
        const href = item.href ? (typeof item.href === 'object' ? item.href.literalString : item.href) : undefined;
        const isLast = idx === items.length - 1;

        return (
          <Cre8BreadcrumbsItem key={idx}>
            {href && !isLast ? (
              <Cre8TextLink href={href}>{label}</Cre8TextLink>
            ) : (
              label
            )}
          </Cre8BreadcrumbsItem>
        );
      })}
    </Cre8Breadcrumbs>
  );
}
