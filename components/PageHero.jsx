// Standalone page heroes + shared page shell helpers

const PageHero = ({ kicker, title, subtitle, accent = 'var(--orange)', bg }) => {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--fg)',
      background: bg || 'var(--bg)',
      padding: '120px 32px 80px',
      minHeight: '68vh', display: 'flex', alignItems: 'flex-end',
    }}>
      {/* Decorative mega number */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: '-4vw', top: '-6vh',
        fontFamily: 'Archivo Black', fontSize: 'clamp(280px, 42vw, 720px)',
        letterSpacing: '-0.06em', lineHeight: 0.8,
        color: accent, opacity: 0.14, pointerEvents: 'none',
        userSelect: 'none',
      }}>{kicker.replace(/[^0-9]/g, '') || '00'}</div>

      {/* Hazard tape decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: -40, top: 80, width: 500, height: 24,
        transform: 'rotate(-8deg)',
        background: 'repeating-linear-gradient(-45deg, var(--hazard) 0 18px, #0A0A0A 18px 36px)',
        boxShadow: '3px 3px 0 rgba(10,10,10,0.2)',
      }}/>

      <div style={{ position: 'relative', maxWidth: 1600, margin: '0 auto', width: '100%' }}>
        <div className="mono" style={{ color: 'var(--muted)', marginBottom: 24, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span>[ {kicker} ]</span>
          <span>SPRING 26 · BCN → WORLDWIDE</span>
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(72px, 14vw, 240px)' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ maxWidth: 620, marginTop: 32, fontSize: 18, lineHeight: 1.5, color: 'var(--fg-2)' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

window.PageHero = PageHero;
