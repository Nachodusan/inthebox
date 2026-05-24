// Cursor, Preloader, Grain, Marquee, Nav, Theme toggle

// use React.* directly to avoid const collisions across babel scripts

const Grain = () => <div className="grain" aria-hidden="true"></div>;

const CustomCursor = () => {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  React.useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    window.addEventListener('mousemove', onMove);
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    // hover states
    const matchSel = 'a, button, [role="button"], .product, .cat-tile, .chip, .size-chip';
    const onOver = (e) => {
      const t = e.target.closest(matchSel);
      if (t) ringRef.current?.classList.add('hover');
    };
    const onOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(matchSel))
        ringRef.current?.classList.remove('hover');
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

const Preloader = ({ onDone }) => {
  const [done, setDone] = React.useState(false);
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      n += Math.random() * 14 + 4;
      if (n >= 100) { n = 100; clearInterval(iv); }
      setPct(Math.floor(n));
    }, 90);
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(() => onDone?.(), 800);
    }, 1900);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);
  const letters = 'INTHEBOX'.split('');
  return (
    <div className={`preloader ${done ? 'done' : ''}`}>
      <div className="preloader-meta">N°001 — CARGANDO CÁPSULA [{String(pct).padStart(3, '0')}%]</div>
      <div className="preloader-logo">
        {letters.map((l, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>{l}</span>
        ))}
      </div>
      <div className="preloader-bar"></div>
      <div className="preloader-meta" style={{ opacity: 0.6 }}>"SKATE / CALLE / DESDE 2020"</div>
    </div>
  );
};

const Marquee = ({ items, alt = false, speed = 30 }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className={`marquee ${alt ? 'marquee-alt' : ''}`}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {tripled.map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-star" />
            <span>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    className="theme-toggle"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    aria-label="Toggle theme"
  >
    <span className="knob" />
  </button>
);

const Nav = ({ cartCount, onCartOpen, theme, setTheme, activePage }) => (
  <nav className="nav">
    <div className="nav-inner">
      <div className="nav-left">
        <a className={`nav-link ${activePage === 'drops' ? 'active' : ''}`} href="drops.html">DROPS</a>
        <a className={`nav-link ${activePage === 'tienda' ? 'active' : ''}`} href="tienda.html">TIENDA</a>
        <a className={`nav-link ${activePage === 'calendario' ? 'active' : ''}`} href="index.html#calendario">CALENDARIO</a>
        <a className={`nav-link ${activePage === 'about' ? 'active' : ''}`} href="index.html#about">NOSOTROS</a>
      </div>
      <a className="nav-logo" href="index.html">
        <span className="box"></span>
        INTHEBOX
      </a>
      <div className="nav-right">
        <span className="mono" style={{ opacity: 0.6 }}>ES-CL / CLP</span>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="nav-link" onClick={onCartOpen} style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '10px 14px', border: 'none' }}>
          CARRO [{String(cartCount).padStart(2, '0')}]
        </button>
      </div>
    </div>
  </nav>
);

/* ============ Reveal on scroll helper ============ */
const useReveal = () => {
  React.useEffect(() => {
    // Fallback: just reveal everything on mount via rAF — simple, always works.
    const reveal = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
    };
    const t1 = setTimeout(reveal, 100);
    const t2 = setTimeout(reveal, 500);
    const t3 = setTimeout(reveal, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
};

Object.assign(window, { Grain, CustomCursor, Preloader, Marquee, ThemeToggle, Nav, useReveal });
