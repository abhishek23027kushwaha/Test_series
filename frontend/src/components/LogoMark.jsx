import React, { useId } from 'react';

/**
 * Shared brand mark for Prep Portal — an open-book / launch-chevron icon
 * used consistently across the landing page, auth page, and sidebar.
 * Each instance gets its own gradient id so multiple copies can render
 * on the same page without SVG id collisions.
 */
export default function LogoMark({ size = 34, className, animated = false }) {
  const uid = useId();
  const gradId = `ppLogoGrad-${uid}`;
  const glowId = `ppLogoGlow-${uid}`;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a996ff" />
          <stop offset="55%" stopColor="#8b7cf6" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="48" height="48" rx="13" fill={`url(#${gradId})`} />
      <rect width="48" height="48" rx="13" fill={`url(#${glowId})`} />

      {/* upward chevron / launch mark */}
      <path d="M24 12L38.5 20V22.4L24 14.8L9.5 22.4V20L24 12Z" fill="#fff" />
      <path
        d="M15.5 21.5V29.2C15.5 29.2 18.7 33 24 33C29.3 33 32.5 29.2 32.5 29.2V21.5"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="27" r="1.6" fill="#fff">
        {animated && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="2.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}
