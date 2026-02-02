/**
 * Barbershop Dashboard - A2UI Powered App
 * Renders a barbershop management dashboard using the A2UI protocol
 */

import { useEffect, useState } from 'react';
import { ReactA2uiMessageProcessor, Surface, type UserAction } from '@a2ui-bridge/react';
import { tailwindComponents } from './components/tailwind-components';
import { dashboardMessages } from './a2ui-messages';

export function App() {
  const [processor] = useState(() => new ReactA2uiMessageProcessor());
  const [isReady, setIsReady] = useState(false);

  // Process the static A2UI messages on mount
  useEffect(() => {
    processor.processMessages(dashboardMessages);
    setIsReady(true);
  }, [processor]);

  // Handle user actions from the UI
  const handleAction = (action: UserAction) => {
    console.log('User action:', action);
    // In a real app, this would send the action to a backend or LLM
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-barber-bg flex items-center justify-center">
        <div className="text-barber-muted">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-barber-bg">
      <Surface
        processor={processor}
        surfaceId="barbershop-dashboard"
        components={tailwindComponents}
        onAction={handleAction}
      />
    </div>
  );
}
