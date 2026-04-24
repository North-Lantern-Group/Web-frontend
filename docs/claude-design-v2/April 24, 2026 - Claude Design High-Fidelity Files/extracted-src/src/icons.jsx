/* Lucide-style line icons, 1.5px stroke. Monochrome. */
const Icon = ({ children, size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round"
       className={className}>
    {children}
  </svg>
);

/* Atlassian Platform: stacked layers */
const IconLayers = (p) => (
  <Icon {...p}>
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 12l10 5 10-5"/>
    <path d="M2 17l10 5 10-5"/>
  </Icon>
);

/* BI and Analytics: chart */
const IconChart = (p) => (
  <Icon {...p}>
    <path d="M3 3v18h18"/>
    <path d="M7 14l4-4 4 3 5-6"/>
    <circle cx="7" cy="14" r="1"/>
    <circle cx="11" cy="10" r="1"/>
    <circle cx="15" cy="13" r="1"/>
    <circle cx="20" cy="7" r="1"/>
  </Icon>
);

/* Automation and Integration: workflow nodes */
const IconWorkflow = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="6" height="6" rx="1"/>
    <rect x="15" y="3" width="6" height="6" rx="1"/>
    <rect x="9" y="15" width="6" height="6" rx="1"/>
    <path d="M6 9v3a2 2 0 0 0 2 2h4"/>
    <path d="M18 9v3a2 2 0 0 1-2 2h-4"/>
  </Icon>
);

const IconArrow = (p) => (
  <Icon {...p}>
    <path d="M5 12h14"/>
    <path d="M13 6l6 6-6 6"/>
  </Icon>
);

const IconPause = (p) => (
  <Icon {...p}>
    <rect x="6" y="5" width="4" height="14" rx="1"/>
    <rect x="14" y="5" width="4" height="14" rx="1"/>
  </Icon>
);

const IconPlay = (p) => (
  <Icon {...p}>
    <path d="M7 5l12 7-12 7V5z"/>
  </Icon>
);

const IconCheck = (p) => (
  <Icon {...p}>
    <path d="M20 6L9 17l-5-5"/>
  </Icon>
);

const IconMail = (p) => (
  <Icon {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 6 10-6"/>
  </Icon>
);

const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </Icon>
);

Object.assign(window, {
  Icon, IconLayers, IconChart, IconWorkflow,
  IconArrow, IconPause, IconPlay, IconCheck,
  IconMail, IconCalendar
});
