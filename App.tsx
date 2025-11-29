
import React from 'react';
import { GameProvider } from './context/GameContext';
import { GameLayout } from './components/GameLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

/**
 * App Component
 * 
 * Acts as the "Root" orchestrator.
 * 1. Wraps the app in an ErrorBoundary for safety.
 * 2. Injects the Global State via GameProvider.
 * 3. Renders the main Layout.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GameProvider>
        <GameLayout />
      </GameProvider>
    </ErrorBoundary>
  );
};

export default App;
