const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    width="180"
    height="80"
    viewBox="0 0 1640 700"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Kracked Devs logo"
  >
    <path
      d="M550,250L550,200L590,200L590,210L560,210L560,250L550,250ZM500,250L550,250L550,260L500,260L500,250ZM650,250L650,330L640,330L640,250L650,250ZM590,200L590,110L690,110L690,250L650,250L650,240L680,240L680,120L600,120L600,200L590,200Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
