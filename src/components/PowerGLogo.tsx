import React from 'react';

export function PowerGLogo({ size = 48, className = '' }: { size?: number; className?: string }) {
  const height = Math.round(size * 0.65);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 260 169"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red outer oval */}
      <ellipse cx="130" cy="84.5" rx="129" ry="83.5" fill="#BA0C2F" />
      {/* White ring */}
      <ellipse cx="130" cy="84.5" rx="120" ry="74" fill="white" />
      {/* Black inner oval */}
      <ellipse cx="130" cy="84.5" rx="112" ry="66" fill="#1A1A1A" />
      {/* White block G */}
      <text
        x="130"
        y="120"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="110"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="auto"
      >
        G
      </text>
    </svg>
  );
}
