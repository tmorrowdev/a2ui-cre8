/**
 * @a2ui-bridge/react-cre8 - Tabs component
 * MIT License - Copyright (c) 2025 southleft
 */

import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { Cre8Tabs as Cre8TabsWC, Cre8Tab as Cre8TabWC } from '@tmorrow/cre8-wc/cdn';
import { extractString, createPermissiveComponent } from '../utils.js';

const Cre8TabsComponent = createPermissiveComponent('cre8-tabs', Cre8TabsWC, {
  onTabSelected: 'tabSelected',
});
const Cre8TabComponent = createPermissiveComponent('cre8-tab', Cre8TabWC);

interface TabItem {
  id: string;
  label: string | { literalString: string };
}

export function Tabs({
  node,
  children,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const { properties } = node;
  const props = properties as any;

  const tabs: TabItem[] = props.tabs ?? [];
  const defaultTab = extractString(props.defaultTab) ?? tabs[0]?.id ?? '';
  const activeIndex = tabs.findIndex(t => t.id === defaultTab);

  const handleTabSelected = (e: Event) => {
    const customEvent = e as CustomEvent;
    const selectedIndex = customEvent.detail?.activeIndex ?? 0;
    const selectedTab = tabs[selectedIndex];
    if (props.onChange?.name && selectedTab) {
      onAction({
        actionName: props.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { tab: selectedTab.id },
      });
    }
  };

  return (
    <Cre8TabsComponent
      activeIndex={activeIndex >= 0 ? activeIndex : 0}
      onTabSelected={handleTabSelected}
    >
      {tabs.map((tab) => {
        const label = typeof tab.label === 'object' ? tab.label.literalString : tab.label;
        return <Cre8TabComponent key={tab.id}>{label}</Cre8TabComponent>;
      })}
      <div slot="panel">{children}</div>
    </Cre8TabsComponent>
  );
}
