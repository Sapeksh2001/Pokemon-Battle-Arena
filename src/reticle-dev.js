import { registerCapabilities } from '@reticlehq/core';

if (import.meta.env.DEV) {
  registerCapabilities({
    testids: [
      // Lobby / setup
      'lobby-view',
      'new-player-name',
      'add-player-btn',
      'room-code-input',
      'create-room-btn',
      'join-room-btn',
      // Battle controls
      'attacker-select',
      'attack-target-select',
      'move-type-select',
      'move-power-input',
      'physical-attack-btn',
      'special-attack-btn',
      'end-round-btn',
      // Modals
      'room-modal',
      'join-modal',
      'quick-play-modal',
      'team-editor-modal',
      'confirm-modal',
      // Player cards
      'announcement-banner',
    ],
    signals: [],
    stores: [],
  });
}
