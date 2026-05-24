// Sections: Calendar + About — Spanish / Chile

const Calendar = () => {
  const events = [
    { d: '04', m: 'MAY', y: '26', title: 'DROP 05 — TEASER', where: 'ONLINE · @inthebox', tag: 'PRÓXIMO' },
    { d: '18', m: 'MAY', y: '26', title: 'DROP 05 — LANZAMIENTO', where: 'INTHEBOX.CL', tag: 'DROP' },
    { d: '25', m: 'MAY', y: '26', title: 'SESIÓN DE SKATE', where: 'PARQUE DE LOS REYES · SANTIAGO', tag: 'EVENTO' },
    { d: '08', m: 'JUN', y: '26', title: 'POP-UP STORE', where: 'BARRIO ITALIA · SANTIAGO', tag: 'POP-UP' },
    { d: '21', m: 'JUN', y: '26', title: 'GO SKATEBOARDING DAY', where: 'MUNDO', tag: 'EVENTO' },
  ];
  const tagColor = { DROP: 'var(--orange)', 'PRÓXIMO': 'var(--hazard)', EVENTO: 'var(--fg)', 'POP-UP': '#4a5d3a' };
  const tagText  = { DROP: '#fff', 'PRÓXIMO': '#0A0A0A', EVENTO: 'var(--bg)', 'POP-UP': '#fff' };
  return (
    <section id="calendario" style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }} className="reveal">
          <div>
            <div className="label">[ 04 — CALENDARIO / 2026 ]</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginTop: 16 }}>
              <span style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}>LO QUE</span><br/>VIENE.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="chip active">TODO</button>
            <button className="chip">DROPS</button>
            <button className="chip">EVENTOS</button>
            <button className="chip">POP-UPS</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 0 }}>
          {events.map((e, i) => (
            <div key={i} className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr auto 140px',
              alignItems: 'center', gap: 32, padding: '28px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: i === events.length - 1 ? '1px solid var(--line)' : 'none',
              transitionDelay: `${i * 0.05}s`,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.9 }}>
                <span style={{ fontFamily: 'Archivo Black', fontSize: 56, letterSpacing: '-0.05em' }}>{e.d}</span>
                <span className="mono" style={{ marginTop: 6 }}>{e.m} {e.y}</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Archivo Black', fontSize: 28, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>{e.title}</div>
                <div className="mono" style={{ marginTop: 6, color: 'var(--muted)' }}>{e.where}</div>
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em',
                padding: '6px 10px',
                background: tagColor[e.tag], color: tagText[e.tag],
              }}>{e.tag}</div>
              <button className="btn btn-outline" style={{ padding: '12px 18px', fontSize: 11 }}>RECORDAR →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" style={{ padding: '100px 32px', borderBottom: '1px solid var(--fg)' }}>
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }} className="about-grid">
        <div className="reveal">
          <div className="label">[ 05 — SOBRE NOSOTROS ]</div>
          <h2 className="display" style={{ fontSize: 'clamp(60px, 9vw, 180px)', marginTop: 16 }}>
            DESDE<br/>
            <span style={{ color: 'var(--orange)' }}>2020.</span>
          </h2>
          <div className="mono" style={{ marginTop: 24, color: 'var(--muted)' }}>SANTIAGO · CHILE</div>
        </div>

        <div className="reveal" style={{ transitionDelay: '0.15s' }}>
          <p style={{ fontSize: 22, lineHeight: 1.4, letterSpacing: '-0.01em', marginBottom: 32 }}>
            Partimos en un taller del centro de Santiago cosiendo polerones para los cabros del bowl.
            Seis años después seguimos igual — <strong>cortes oversize, algodón pesado, producción limitada</strong>.
            No hacemos temporadas. Hacemos <em>drops</em>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', maxWidth: 540 }}>
            Cada capsule nace de una sesión de skate y termina numerada a mano. Sin restock, sin outlet,
            sin influencers. Si está acá es porque nos lo pondríamos — y probablemente ya nos lo pusimos.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            {[
              { k: 'DROPS', v: '04' },
              { k: 'PIEZAS VENDIDAS', v: '1.230' },
              { k: 'REGIONES', v: '16' },
            ].map(s => (
              <div key={s.k}>
                <div style={{ fontFamily: 'Archivo Black', fontSize: 56, letterSpacing: '-0.04em', lineHeight: 0.9 }}>{s.v}</div>
                <div className="label" style={{ marginTop: 8 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 900px) {
        .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
    `}</style>
  </section>
);

window.Calendar = Calendar;
window.About = About;
