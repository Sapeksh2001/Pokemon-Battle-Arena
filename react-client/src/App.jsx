import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Arena from './components/Arena';
import TeamManagement from './components/TeamManagement';
import './index.css';

/**
 * App — root state orchestrator.
 * Manages which view is active and holds the shared game state
 * that will be wired into the legacy game engine.
 */

export default function App() {
  const [view, setView] = useState('lobby');

  return (
    <>
      {/* Parallax animated background — always rendered behind all views */}
      <div className="parallax-bg" aria-hidden="true" />

      <div className="app-root">
        {view === 'lobby' && (
          <Lobby
            onStartBattle={() => setView('arena')}
            onManageTeam={() => setView('team')}
          />
        )}
        {view === 'arena' && (
          <Arena onForfeit={() => setView('lobby')} />
        )}
        {view === 'team' && (
          <TeamManagement onBack={() => setView('lobby')} />
        )}
      </div>
    </>
  );
}
