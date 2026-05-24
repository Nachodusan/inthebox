// Countdown timer for auction end
const AuctionTimer = ({ endDate }) => {
  const calc = () => {
    const diff = new Date(endDate) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = React.useState(calc);
  React.useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      {[['d', 'DÍAS'], ['h', 'HRS'], ['m', 'MIN'], ['s', 'SEG']].map(([k, label]) => (
        <div key={k} style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            {pad(t[k])}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 8, letterSpacing: '0.12em', color: 'var(--muted)', marginTop: 2 }}>{label}</div>
        </div>
      ))}
    </div>
  );
};

// Full DROPS page — spotlight + list + archive
const DropsPage = () => {
  const current = { n: '01', name: 'SINFONÍA DE CEMENTO', date: '18.ABR.26', units: '500', sold: 287, color: '#FF5A1F' };
  const soldPct = Math.round((current.sold / parseInt(current.units)) * 100);
  const past = [
    { n: '03', name: 'SUEÑOS DE ASFALTO', color: '#0A0A0A', status: 'PRÓXIMO' },
    { n: '02', name: 'PATRULLA NOCTURNA', color: '#4a5d3a', status: 'PRÓXIMO' },
    { n: '01', name: 'BARRIO BRUTAL',     color: '#B9321A', status: 'AHORA' },
  ];

  return (
    <>
      <PageHero
        kicker="DROPS / 01 — 04"
        title={<>DROPS<br/><span style={{ color: 'var(--orange)' }}>LIMITADOS.</span></>}
        subtitle="Cuatro cápsulas al año. Cada una nace de una sesión de skate, se fabrica en Santiago, se numera a mano y nunca se reimprime. Si no la pillas, no vuelve."
        accent="#FF5A1F"
      />

      {/* Current drop spotlight */}
      <section style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 24 }}>[ DROP ACTUAL · EN VIVO ]</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="drop-spotlight">
            {/* 360° Nike viewer */}
            <div style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(160deg, #111 0%, #0A0A0A 100%)',
              border: '1px solid var(--fg)',
              padding: '40px 24px 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: '#FF5A1F', color: '#fff', padding: '8px 14px',
                fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em',
              }}>● SUBASTA EN VIVO</div>
              <Shoe360 />
            </div>

            <div>
              <div style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(60px, 8vw, 140px)', letterSpacing: '-0.06em', lineHeight: 0.85, textTransform: 'uppercase' }}>
                N°{current.n}
              </div>
              <h2 style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', marginTop: 8 }}>
                {current.name}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', marginTop: 20, maxWidth: 480 }}>
                Las Jordan Retro 4 Flight Club representan el equilibrio perfecto entre historia, estilo y exclusividad.
                Inspiradas en el legendario club de fans de los 80, combinan materiales premium, detalles icónicos
                y una silueta que nunca pasa de moda.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--fg-2)', marginTop: 12, maxWidth: 480 }}>
                Diseño en blanco con acentos negros y rojos, clásica tecnología Air en la suela. Un par pensado
                para quienes entienden el valor de lo auténtico — cultura, nostalgia y tendencia en una sola pieza.
              </p>

              {/* Auction status */}
              <div style={{ marginTop: 32, padding: 24, background: 'var(--bg)', border: '1px solid var(--fg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="mono" style={{ color: 'var(--muted)' }}>OFERTA ACTUAL</span>
                  <span className="mono" style={{ color: 'var(--muted)' }}>TIEMPO RESTANTE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
                  <div style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', color: current.color }}>
                    $480.000
                  </div>
                  <AuctionTimer endDate="2026-04-26T23:59:00" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="mono" style={{ color: 'var(--muted)', fontSize: 9 }}>14 OFERTAS · ÚLTIMA: hace 3 min</span>
                  <span className="mono" style={{ color: 'var(--muted)', fontSize: 9 }}>BASE: $120.000</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-2)', position: 'relative', overflow: 'hidden', marginBottom: 0 }}>
                  <div style={{ position: 'absolute', inset: 0, width: '73%', background: current.color }}/>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <a href="tienda.html" className="btn" style={{ flex: 1, textAlign: 'center' }}>PUJAR DROP 01 →</a>
                <a href="#past" className="btn btn-outline">ARCHIVO</a>
              </div>
              <div style={{ marginTop: 12, fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em' }}>
                * SUBASTA FINALIZA 26.ABR.26 · PAGO EN 48H · ENVÍO GRATIS SANTIAGO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past drops */}
      <section id="past" style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}>
              EL<br/><span style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}>ARCHIVO.</span>
            </h2>
            <p className="mono" style={{ maxWidth: 320, color: 'var(--muted)' }}>
              DROPS PASADOS · NO REIMPRIMIMOS · SÓLO HISTORIA.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {past.map(d => (
              <div key={d.n} style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: '3 / 4',
                background: d.n === '01'
                  ? 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)'
                  : `linear-gradient(160deg, ${d.color} 0%, #0A0A0A 100%)`,
                color: '#fff', padding: 24,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                border: '1px solid var(--fg)',
                transition: 'transform 0.35s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                {/* Diagonal stripe texture (solo en los que no son N°01) */}
                {d.n !== '01' && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'repeating-linear-gradient(-45deg, transparent 0 24px, rgba(255,255,255,0.04) 24px 25px)',
                    pointerEvents: 'none',
                  }}/>
                )}

                {/* Shoe image para N°01 */}
                {d.n === '01' && (
                  <>
                    {/* glow naranja detrás del zapato */}
                    <div style={{
                      position: 'absolute', left: '50%', top: '36%',
                      transform: 'translate(-50%, -50%)',
                      width: '75%', height: '30%',
                      background: 'radial-gradient(ellipse, rgba(255,90,31,0.08) 0%, transparent 70%)',
                      filter: 'blur(28px)',
                      pointerEvents: 'none',
                    }}/>
                    <img
                      src="assets/nike-360/img01.jpg"
                      alt="Nike Drop 01"
                      style={{
                        position: 'absolute',
                        left: '50%', top: '34%',
                        transform: 'translate(-50%, -50%)',
                        width: '82%',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                    />
                    {/* sello EDICIÓN ÚNICA */}
                    <div style={{
                      position: 'absolute', top: '38%', right: '8%',
                      transform: 'rotate(-8deg)',
                      border: '2px solid rgba(255,90,31,0.85)',
                      color: 'rgba(255,90,31,0.85)',
                      fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.2em',
                      padding: '4px 10px', whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                    }}>EDICIÓN ÚNICA</div>
                  </>
                )}

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                  <div className="mono" style={{ opacity: 0.7 }}>CÁPSULA</div>
                  <div style={{
                    fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em',
                    padding: '6px 10px',
                    background: d.status === 'AHORA' ? '#FF5A1F' : 'rgba(255,255,255,0.12)',
                    color: '#fff',
                  }}>{d.status}</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(80px, 12vw, 180px)', letterSpacing: '-0.06em', lineHeight: 0.82, marginBottom: 8 }}>
                    N°{d.n}
                  </div>
                  <div style={{ fontFamily: 'Archivo Black', fontSize: 28, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                    {d.name}
                  </div>
                  <div className="mono" style={{ marginTop: 12, opacity: 0.6 }}>
                    {'??.??.??'} · {d.n === '01' ? '1 PIEZA' : '?? PIEZAS'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto strip */}
      <section style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)', background: 'var(--fg)', color: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div className="label" style={{ color: 'var(--bg)', opacity: 0.5 }}>[ MANIFIESTO ]</div>
          <p style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(32px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: 24, textTransform: 'uppercase' }}>
            "SIN RESTOCK.<br/>SIN OUTLET.<br/>SIN INFLUENCERS.<br/>SÓLO EL <span style={{ color: 'var(--orange)' }}>DROP</span>."
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .drop-spotlight { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
};

window.DropsPage = DropsPage;
