/**
 * @a2ui-bridge/react-cre8 - Pagination component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Pagination as Cre8PaginationWC } from '@tmorrow/cre8-wc/cdn';
import { extractNumber, createPermissiveComponent } from '../utils.js';

const Cre8PaginationComponent = createPermissiveComponent('cre8-pagination', Cre8PaginationWC, {
  onPageChange: 'page-change',
});

export function Pagination({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const totalResults = extractNumber(props.totalResults) ?? extractNumber(props.totalPages) ?? 1;
  const pageSize = extractNumber(props.pageSize) ?? 1;
  const currentPage = extractNumber(props.currentPage) ?? 1;

  const handlePageChange = (e: Event) => {
    const customEvent = e as CustomEvent;
    const page = customEvent.detail?.page ?? customEvent.detail?.currentPage ?? 1;
    if (props.onChange?.name) {
      onAction({
        actionName: props.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { page },
      });
    }
  };

  return (
    <Cre8PaginationComponent
      totalResults={totalResults}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
