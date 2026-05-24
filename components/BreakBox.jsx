// Sección "estás dentro de una caja" — bajar rápido para romperla

const BreakBox = () => {
  const sectionRef = React.useRef(null);
  const stageRef   = React.useRef(null);
  const barRef     = React.useRef(null);
  const percentRef = React.useRef(null);
  const wallsRef   = React.useRef([]);
  const shardsRef  = React.useRef(null);
  const [broken, setBroken] = React.useState(false);

  React.useEffect(() => {
    if (broken) return;

    let points = 0;
    let raf = 0;

    const isLocked = () => {
      if (broken || !sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      // Locked while section top has reached (or passed) the viewport top
      return rect.top <= 0 && rect.bottom > window.innerHeight;
    };

    const getLockY = () => {
      if (!sectionRef.current) return 0;
      return sectionRef.current.offsetTop;
    };

    const updateUI = () => {
      const pct = Math.min(100, points);
      if (barRef.current)     barRef.current.style.width = pct + '%';
      if (percentRef.current) percentRef.current.textContent = Math.round(pct) + '%';
      if (stageRef.current) {
        const s = pct / 100;
        const rx = (Math.random() - 0.5) * s * 16;
        const ry = (Math.random() - 0.5) * s * 16;
        stageRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
    };

    // Bloquea el scroll mientras la caja no esté rota
    const onWheel = (e) => {
      if (!isLocked()) return;
      if (e.deltaY > 0) {
        e.preventDefault();
        // fuerza según deltaY
        points += Math.min(25, e.deltaY / 3);
        if (points >= 100) {
          points = 100;
          break_it();
        }
        updateUI();
        // mantener scroll anclado al inicio de la sección
        window.scrollTo(0, getLockY());
      }
    };

    let tStart = 0;
    const onTouchStart = (e) => { tStart = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      if (!isLocked()) return;
      const dy = tStart - e.touches[0].clientY;
      if (dy > 0) {
        e.preventDefault();
        points += Math.min(20, dy / 6);
        if (points >= 100) {
          points = 100;
          break_it();
        }
        updateUI();
        window.scrollTo(0, getLockY());
      }
      tStart = e.touches[0].clientY;
    };

    const onKey = (e) => {
      if (!isLocked()) return;
      if (['ArrowDown','PageDown','Space',' '].includes(e.key) || e.key === ' ') {
        e.preventDefault();
        points += 18;
        if (points >= 100) { points = 100; break_it(); }
        updateUI();
      }
    };

    // Ancla extra: si algo llega a empujar el scroll, lo devuelve
    const onScroll = () => {
      if (!isLocked()) return;
      const y = getLockY();
      if (window.scrollY > y) window.scrollTo(0, y);
    };

    // Decay loop
    const tick = () => {
      points = Math.max(0, points - 0.5);
      updateUI();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const break_it = () => {
      setBroken(true);
      const walls = wallsRef.current.filter(Boolean);
      const dirs = [
        { x: 0,    y: -600, r: -12 },  // top
        { x: 0,    y:  600, r:  12 },  // bottom
        { x: -700, y:  0,   r: -20 },  // left
        { x:  700, y:  0,   r:  20 },  // right
      ];
      walls.forEach((w, i) => {
        gsap.to(w, {
          x: dirs[i].x, y: dirs[i].y, rotation: dirs[i].r,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
      // shards
      if (shardsRef.current) {
        const ss = shardsRef.current.querySelectorAll('.shard');
        gsap.fromTo(ss,
          { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 },
          {
            x: () => (Math.random() - 0.5) * 1400,
            y: () => (Math.random() - 0.5) * 1200,
            rotation: () => (Math.random() - 0.5) * 720,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      }
      // libre text
      gsap.fromTo('.breakbox-free',
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.8)', delay: 0.1 }
      );
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    window.addEventListener('keydown',    onKey,        { passive: false });
    window.addEventListener('scroll',     onScroll,     { passive: true  });
    return () => {
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('keydown',    onKey);
      window.removeEventListener('scroll',     onScroll);
      cancelAnimationFrame(raf);
    };
  }, [broken]);

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '220vh', background: '#0a0a0a', color: '#F2EDE4' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Escena que se sacude */}
        <div ref={stageRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>

          {/* 4 paredes formando la caja interior */}
          <div ref={el => wallsRef.current[0] = el} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: 'var(--fg)', zIndex: 3 }} />
          <div ref={el => wallsRef.current[1] = el} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'var(--fg)', zIndex: 3 }} />
          <div ref={el => wallsRef.current[2] = el} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 40, background: 'var(--fg)', zIndex: 3 }} />
          <div ref={el => wallsRef.current[3] = el} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 40, background: 'var(--fg)', zIndex: 3 }} />

          {/* Esquinas tipo cinta de embalaje */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 16px, rgba(255,90,31,0.06) 16px 18px)' }} />

          {/* Astillas (shards) ocultas hasta romper */}
          <div ref={shardsRef} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="shard" style={{
                position: 'absolute',
                left: `${10 + (i * 67) % 80}%`,
                top:  `${15 + (i * 43) % 70}%`,
                width: 10 + (i % 4) * 8,
                height: 10 + (i % 3) * 10,
                background: i % 2 ? 'var(--fg)' : 'var(--orange)',
                opacity: 0,
              }} />
            ))}
          </div>

          {/* Mensaje central */}
          {!broken && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 5,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '0 48px', textAlign: 'center',
            }}>
              <div className="mono" style={{ letterSpacing: '0.2em', color: 'var(--orange)', marginBottom: 16 }}>
                [ SEÑAL DE EMERGENCIA ]
              </div>
              <h2 style={{
                fontFamily: 'Archivo Black',
                fontSize: 'clamp(48px, 10vw, 160px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                textTransform: 'uppercase',
                margin: 0,
              }}>
                ESTÁS DENTRO<br/>
                DE LA <span style={{ color: 'var(--orange)' }}>CAJA</span>.
              </h2>
              <p className="mono" style={{ marginTop: 28, fontSize: 13, letterSpacing: '0.18em', color: 'rgba(242,237,228,0.7)' }}>
                ↓ ↓ ↓  EMPUJA <span style={{ color: '#fff' }}>FUERTE</span> PARA ROMPERLA  ↓ ↓ ↓
              </p>

              {/* Barra de fuerza */}
              <div style={{ marginTop: 40, width: 'min(520px, 80vw)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(242,237,228,0.5)', marginBottom: 8 }}>
                  <span>FUERZA</span>
                  <span ref={percentRef}>0%</span>
                </div>
                <div style={{ height: 8, border: '1px solid var(--fg-2, #F2EDE4)', background: 'rgba(255,255,255,0.05)' }}>
                  <div ref={barRef} style={{ height: '100%', width: '0%', background: 'var(--orange)', transition: 'width 0.08s linear' }} />
                </div>
              </div>
            </div>
          )}

          {/* Mensaje post-ruptura */}
          <div className="breakbox-free" style={{
            position: 'absolute', inset: 0, zIndex: 6,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: 0, pointerEvents: 'none', textAlign: 'center',
          }}>
            <div className="mono" style={{ letterSpacing: '0.3em', color: 'var(--orange)', marginBottom: 16 }}>
              [ CAJA DESTRUIDA ]
            </div>
            <h2 style={{
              fontFamily: 'Archivo Black',
              fontSize: 'clamp(64px, 14vw, 220px)',
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              textTransform: 'uppercase',
              margin: 0,
              WebkitTextStroke: '3px var(--orange)',
              color: 'transparent',
            }}>
              LIBRE.
            </h2>
            <p className="mono" style={{ marginTop: 20, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(242,237,228,0.6)' }}>
              SIGUE BAJANDO ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

window.BreakBox = BreakBox;
