// Hero — cubo 3D cerrado, pulsa, expulsa el título, y se convierte en el punto de "BOX."

const Hero = () => {
  const heroRef      = React.useRef(null);
  const cubeRef      = React.useRef(null);
  const titleWrapRef = React.useRef(null);
  const boxTextRef   = React.useRef(null);
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);

  // Parallax
  React.useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMx(((e.clientX - r.left) / r.width  - 0.5) * 2);
      setMy(((e.clientY - r.top)  / r.height - 0.5) * 2);
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, []);

  const SIZE = 320;
  const HALF = SIZE / 2;

  React.useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const cube  = cubeRef.current;
    const wrap  = titleWrapRef.current;
    const boxEl = boxTextRef.current;
    if (!cube || !wrap || !boxEl) return;

    // Estado inicial
    gsap.set(cube, { opacity: 0, scale: 0.05, rotationX: -15, rotationY: 0 });
    gsap.set(wrap, { opacity: 0, scale: 0.6, y: 60, transformOrigin: '50% 100%' });

    const run = () => {
      const tl = gsap.timeline({ delay: 0.25 });

      // 1. El cubo aparece girando desde la nada
      tl.to(cube, {
        opacity: 1,
        scale: 1,
        rotationY: 360,
        duration: 1.5,
        ease: 'power3.out',
      });

      // 2. Pulso antes de soltar el título
      tl.to(cube, { scale: 1.18, duration: 0.22, ease: 'power2.out' });
      tl.to(cube, { scale: 1,    duration: 0.28, ease: 'power2.in'  });

      // 3. El título sale expulsado del cubo
      tl.to(wrap, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.95,
        ease: 'back.out(1.5)',
      }, '-=0.25');

      // 4. El cubo viaja y se achica hasta ser el punto de "BOX."
      tl.add(() => {
        const boxRect  = boxEl.getBoundingClientRect();
        const cubeRect = cube.getBoundingClientRect();
        const targetSize = boxRect.height * 0.17;
        const gap        = boxRect.height * 0.06;
        const targetCx = boxRect.right + gap + targetSize / 2;
        const targetCy = boxRect.bottom - targetSize / 2;
        const dx = targetCx - (cubeRect.left + cubeRect.width / 2);
        const dy = targetCy - (cubeRect.top  + cubeRect.height / 2);
        const targetScale = targetSize / SIZE;

        gsap.to(cube, {
          x: dx,
          y: dy,
          scale: targetScale,
          rotationX: -15,
          duration: 1.3,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.to(cube, {
              rotationY: '+=360',
              duration: 5,
              repeat: -1,
              ease: 'none',
            });
          },
        });
      }, '+=0.35');
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }
  }, []);

  // Estilos base de las caras
  const faceBase = {
    position: 'absolute',
    top: 0, left: 0,
    width: SIZE, height: SIZE,
    border: '2px solid var(--fg)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 14,
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    letterSpacing: '0.2em',
    color: 'var(--fg)',
    background: 'rgba(242,237,228,0.04)',
    backfaceVisibility: 'hidden',
  };

  const faces = [
    { label: 'FRONT',  transform: `translateZ(${HALF}px)`,                  accent: true  },
    { label: 'BACK',   transform: `rotateY(180deg) translateZ(${HALF}px)` },
    { label: 'RIGHT',  transform: `rotateY(90deg)  translateZ(${HALF}px)` },
    { label: 'LEFT',   transform: `rotateY(-90deg) translateZ(${HALF}px)`, accent: true  },
    { label: 'TOP',    transform: `rotateX(90deg)  translateZ(${HALF}px)` },
    { label: 'BOTTOM', transform: `rotateX(-90deg) translateZ(${HALF}px)` },
  ];

  return (
    <section id="top" ref={heroRef} style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--fg)' }}>
      <div style={{
        position: 'relative',
        minHeight: '88vh',
        padding: '60px 32px 80px',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Cubo 3D */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1600,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <div ref={cubeRef} style={{
            position: 'relative',
            width: SIZE, height: SIZE,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}>
            {faces.map((f, i) => (
              <div key={i} style={{
                ...faceBase,
                border: f.accent ? '2px solid var(--orange)' : faceBase.border,
                color:  f.accent ? 'var(--orange)' : faceBase.color,
                transform: f.transform,
              }}>
                <span>● {f.label}</span>
                <span style={{ alignSelf: 'flex-end', opacity: 0.7 }}>IN·THE·BOX</span>
              </div>
            ))}
          </div>
        </div>

        {/* Título */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1600, margin: '0 auto', width: '100%' }}>
          <div ref={titleWrapRef} style={{ willChange: 'transform' }}>
            <h1
              className="mega"
              style={{
                transform: `translate(${mx * -8}px, ${my * -4}px)`,
                transition: 'transform 0.2s linear',
                lineHeight: 0.88,
              }}
            >
              <span style={{ display: 'block' }}>IN THE</span>
              <span style={{ display: 'inline-block', transform: 'translateX(8%)' }}>
                <span ref={boxTextRef} style={{ WebkitTextStroke: '3px var(--fg)', color: 'transparent' }}>BOX</span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
