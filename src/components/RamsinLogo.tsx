interface RamsinLogoProps {
  className?: string;
  size?: number;
}

export const RamsinLogo = ({ className = "", size = 32 }: RamsinLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Logo RAMSIN"
    >
      <defs>
        {/* Dégradé émeraude sombre profond */}
        <linearGradient id="ramsin-emerald-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#123A35" />
          <stop offset="100%" stopColor="#071816" />
        </linearGradient>

        {/* Dégradé vert citron néon */}
        <linearGradient id="ramsin-lime-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9FF7D" />
          <stop offset="100%" stopColor="#C7F36B" />
        </linearGradient>

        {/* Glow doux */}
        <filter id="ramsin-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#C7F36B" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Fond badge aux bords adoucis */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="9.5"
        fill="url(#ramsin-emerald-bg)"
        stroke="#C7F36B"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />

      {/* Monogramme 'R' architectural complet (Pilier, Boucle & Jambe unifiés) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 9H23.5C28.2 9 30.8 11.6 30.8 15.5C30.8 19 28.5 21.2 24.5 21.5L30.8 31H24.5L18.8 21.5H15.5V31H10V9ZM15.5 13.5V17.2H22.5C24.6 17.2 25.5 16.5 25.5 15.35C25.5 14.2 24.6 13.5 22.5 13.5H15.5Z"
        fill="#FFFFFF"
      />

      {/* Biseau d'énergie Vert Citron sur la jambe d'élan du 'R' */}
      <path
        d="M20 21.8L26.5 31H30.5L24 21.8H20Z"
        fill="url(#ramsin-lime-accent)"
        filter="url(#ramsin-subtle-glow)"
      />

      {/* Puce lumineuse architecturale */}
      <circle cx="27.5" cy="11.5" r="1.5" fill="#C7F36B" />
    </svg>
  );
};

export default RamsinLogo;
