const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="e-Kariah logo"
  >
    {/* Mosque dome */}
    <path
      d="M20 4C14 4 9 10 9 16V28H31V16C31 10 26 4 20 4Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M20 2L20 6M20 6C14.5 6 10 11 10 17V30H30V17C30 11 25.5 6 20 6Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Crescent */}
    <circle cx="20" cy="4" r="2" fill="currentColor" />
    {/* Door */}
    <path
      d="M17 30V24C17 22.3 18.3 21 20 21C21.7 21 23 22.3 23 24V30"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Base */}
    <line x1="6" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Minarets */}
    <rect x="7" y="20" width="3" height="10" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="30" y="20" width="3" height="10" rx="1" fill="currentColor" opacity="0.3" />
  </svg>
);

export default Logo;
