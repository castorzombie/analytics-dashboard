import React from 'react';

export const DotsSpinner: React.FC<{ color?: string; size?: number }> = ({
  color = '#60a5fa',
  size = 16,
}) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: size * 2 }}
  >
    <span className="dot-spinner">
      <span className="dot" style={{ background: color, width: size, height: size }} />
      <span
        className="dot"
        style={{ background: color, width: size, height: size, animationDelay: '0.2s' }}
      />
      <span
        className="dot"
        style={{ background: color, width: size, height: size, animationDelay: '0.4s' }}
      />
    </span>
    <style>{`
      .dot-spinner { display: flex; gap: ${size / 2}px; }
      .dot {
        border-radius: 50%;
        display: inline-block;
        animation: dot-bounce 1s infinite ease-in-out;
      }
      @keyframes dot-bounce {
        0%, 80%, 100% { transform: scale(1); opacity: 1; }
        40% { transform: scale(1.4); opacity: 0.7; }
      }
    `}</style>
  </div>
);

export const ChartSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 w-full">
    <div style={{ display: 'flex', alignItems: 'end', height: 60, gap: 10, marginBottom: 12 }}>
      <div
        className="bar-loader"
        style={{
          background: '#64748b',
          width: 14,
          height: 40,
          borderRadius: 6,
          animationDelay: '0s',
        }}
      />
      <div
        className="bar-loader"
        style={{
          background: '#64748b',
          width: 14,
          height: 40,
          borderRadius: 6,
          animationDelay: '0.2s',
        }}
      />
      <div
        className="bar-loader"
        style={{
          background: '#64748b',
          width: 14,
          height: 40,
          borderRadius: 6,
          animationDelay: '0.4s',
        }}
      />
    </div>
    <span className="text-slate-400 text-sm">Loading chart...</span>
    <style>{`
      .bar-loader {
        animation: bar-bounce 1.2s infinite cubic-bezier(.4,0,.2,1);
      }
      @keyframes bar-bounce {
        0%, 100% { height: 40px; opacity: 0.7; }
        30% { height: 60px; opacity: 1; }
        60% { height: 30px; opacity: 0.5; }
      }
    `}</style>
  </div>
);
