/**
 * LoadingOverlay
 * Matches the legacy #data-loading-overlay exactly.
 */
interface LoadingOverlayProps {
  progress?: number;
  label?: string;
}

export default function LoadingOverlay({ progress = 0, label = '' }: LoadingOverlayProps) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 100%)',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: '#e0e0ff',
      }}
    >
      {/* Spinning Poké Ball */}
      <div style={{
        width: 90, height: 90, borderRadius: '50%',
        border: '5px solid #ef4444', borderTopColor: 'transparent',
        animation: 'pokeball-spin 0.9s linear infinite',
        marginBottom: 28, position: 'relative',
        boxShadow: '0 0 24px rgba(239,68,68,0.4)',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: -5, right: -5, height: 4,
          background: '#e0e0ff', transform: 'translateY(-50%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 18, height: 18, borderRadius: '50%',
          background: '#e0e0ff', border: '3px solid #0d0d1a',
          transform: 'translate(-50%, -50%)',
        }} />
      </div>

      <p style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '0.03em', margin: '0 0 6px' }}>
        Pokémon Battle Arena
      </p>

      <p style={{ fontSize: '0.8rem', color: '#8888cc', margin: '0 0 20px', letterSpacing: '0.06em' }}>
        {label || 'Initializing...'}
      </p>

      {/* Progress bar */}
      <div style={{
        width: 240, height: 6, background: '#1a1a3e',
        borderRadius: 3, overflow: 'hidden', border: '1px solid #333366',
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, #4a40d0, #8a6fff)',
          transition: 'width 0.3s ease',
        }} />
      </div>
      <p style={{ fontSize: '0.7rem', color: '#555588', marginTop: 8 }}>{progress}%</p>

      <style>{`
        @keyframes pokeball-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
