// Chile + CLP helper
const CLP = (n) => '$' + n.toLocaleString('es-CL');
window.CLP = CLP;

// Stylised SVG visualizations for each product
const HoodieViz = ({ variant = 'orange' }) => {
  const colors = {
    orange: { body: '#FF5A1F', accent: '#FFD600', shade: '#C8400F' },
    black: { body: '#1a1a1a', accent: '#FFD600', shade: '#0a0a0a' },
    cream: { body: '#E8E1D4', accent: '#FF5A1F', shade: '#C9C1AF' },
    green: { body: '#4a5d3a', accent: '#FFD600', shade: '#2f3d25' },
  };
  const c = colors[variant] || colors.orange;
  return (
    <svg viewBox="0 0 200 250" style={{ width: '80%', height: '80%' }}>
      <path d="M40 80 L40 230 L160 230 L160 80 L140 60 L60 60 Z" fill={c.body}/>
      <path d="M60 60 Q60 30 100 30 Q140 30 140 60 L130 70 Q100 50 70 70 Z" fill={c.shade}/>
      <path d="M40 80 L10 180 L30 200 L55 110 Z" fill={c.shade}/>
      <path d="M160 80 L190 180 L170 200 L145 110 Z" fill={c.shade}/>
      <path d="M60 150 L140 150 L130 190 L70 190 Z" fill="none" stroke={c.shade} strokeWidth="1.5"/>
      <line x1="90" y1="60" x2="88" y2="95" stroke={c.accent} strokeWidth="2"/>
      <line x1="110" y1="60" x2="112" y2="95" stroke={c.accent} strokeWidth="2"/>
      <circle cx="88" cy="97" r="3" fill={c.accent}/>
      <circle cx="112" cy="97" r="3" fill={c.accent}/>
      <text x="100" y="130" textAnchor="middle" fill={c.accent} fontFamily="Archivo Black" fontSize="10" letterSpacing="1">INTHEBOX</text>
    </svg>
  );
};

const TeeViz = ({ variant = 'white' }) => {
  const colors = {
    white: { body: '#F2EDE4', accent: '#FF5A1F', shade: '#D8D0C0' },
    black: { body: '#1a1a1a', accent: '#FFD600', shade: '#0a0a0a' },
    red: { body: '#B9321A', accent: '#F2EDE4', shade: '#7A1E0E' },
  };
  const c = colors[variant] || colors.white;
  return (
    <svg viewBox="0 0 200 250" style={{ width: '75%', height: '75%' }}>
      <path d="M60 60 L40 90 L20 200 L60 210 L60 230 L140 230 L140 210 L180 200 L160 90 L140 60 L120 70 Q100 85 80 70 Z" fill={c.body}/>
      <path d="M80 70 Q100 85 120 70 L115 60 Q100 75 85 60 Z" fill={c.shade}/>
      <rect x="72" y="120" width="56" height="60" fill="none" stroke={c.accent} strokeWidth="2" strokeDasharray="4 3"/>
      <text x="100" y="150" textAnchor="middle" fill={c.accent} fontFamily="Archivo Black" fontSize="18">IN</text>
      <text x="100" y="170" textAnchor="middle" fill={c.accent} fontFamily="Archivo Black" fontSize="14">THE BOX</text>
    </svg>
  );
};

const PantsViz = ({ variant = 'denim' }) => {
  const colors = {
    denim: { body: '#4a6b8a', accent: '#FFD600', shade: '#2e4560' },
    black: { body: '#1a1a1a', accent: '#FF5A1F', shade: '#0a0a0a' },
    cargo: { body: '#6b7047', accent: '#FFD600', shade: '#454930' },
  };
  const c = colors[variant] || colors.denim;
  return (
    <svg viewBox="0 0 200 250" style={{ width: '60%', height: '90%' }}>
      <path d="M50 20 L150 20 L160 30 L155 230 L115 235 L105 80 L95 80 L85 235 L45 230 L40 30 Z" fill={c.body}/>
      <rect x="48" y="20" width="104" height="18" fill={c.shade}/>
      {[60, 80, 100, 120, 140].map(x => <rect key={x} x={x-2} y="18" width="4" height="8" fill={c.body}/>)}
      <path d="M55 50 L55 85 L85 85 L85 50" fill="none" stroke={c.shade} strokeWidth="1.5"/>
      <path d="M145 50 L145 85 L115 85 L115 50" fill="none" stroke={c.shade} strokeWidth="1.5"/>
      <line x1="100" y1="80" x2="105" y2="235" stroke={c.shade} strokeWidth="1" strokeDasharray="2 2"/>
      <line x1="100" y1="80" x2="95" y2="235" stroke={c.shade} strokeWidth="1" strokeDasharray="2 2"/>
      <rect x="130" y="40" width="14" height="10" fill={c.accent}/>
    </svg>
  );
};

const ShoeViz = ({ variant = 'white' }) => {
  const colors = {
    white: { body: '#F2EDE4', accent: '#FF5A1F', sole: '#E0D8C8', lace: '#1a1a1a' },
    black: { body: '#1a1a1a', accent: '#FFD600', sole: '#0a0a0a', lace: '#F2EDE4' },
    red: { body: '#B9321A', accent: '#F2EDE4', sole: '#7A1E0E', lace: '#F2EDE4' },
  };
  const c = colors[variant] || colors.white;
  return (
    <svg viewBox="0 0 240 150" style={{ width: '90%', height: '70%' }}>
      <path d="M20 110 Q20 130 40 130 L200 130 Q220 130 220 115 L220 105 L20 105 Z" fill={c.sole}/>
      <path d="M30 105 Q30 60 80 55 L140 50 Q180 50 200 75 L210 100 L210 110 L30 110 Z" fill={c.body}/>
      <path d="M175 50 Q210 50 215 90 L215 100 L180 100 Q175 70 175 50 Z" fill={c.sole} opacity="0.6"/>
      <path d="M60 95 Q100 70 160 80" stroke={c.accent} strokeWidth="6" fill="none" strokeLinecap="round"/>
      {[90, 110, 130, 150].map(x => (
        <g key={x}>
          <line x1={x} y1="65" x2={x+15} y2="85" stroke={c.lace} strokeWidth="2"/>
          <circle cx={x} cy="65" r="2" fill={c.lace}/>
          <circle cx={x+15} cy="85" r="2" fill={c.lace}/>
        </g>
      ))}
      <rect x="30" y="70" width="12" height="20" fill={c.accent}/>
    </svg>
  );
};

window.ProductViz = { HoodieViz, TeeViz, PantsViz, ShoeViz };
