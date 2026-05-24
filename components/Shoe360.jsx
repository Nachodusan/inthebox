// 360° rotating shoe viewer with pedestal shelf — manual drag only
const Shoe360 = () => {
  const FRAMES = 36;
  const [frame, setFrame] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const dragStart = React.useRef(null);
  const lastFrame = React.useRef(0);
  const containerRef = React.useRef(null);

  // Preload all frames
  React.useEffect(() => {
    let count = 0;
    for (let i = 1; i <= FRAMES; i++) {
      const img = new Image();
      img.src = `assets/nike-360/img${String(i).padStart(2, '0')}.jpg`;
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === FRAMES) setLoaded(true);
      };
    }
  }, []);

  const getX = e => e.touches ? e.touches[0].clientX : e.clientX;

  const onDragStart = e => {
    setDragging(true);
    dragStart.current = getX(e);
    lastFrame.current = frame;
    e.preventDefault();
  };

  const onDragMove = e => {
    if (!dragging) return;
    const delta = getX(e) - dragStart.current;
    const frameDelta = Math.round(delta / 8);
    const newFrame = ((lastFrame.current - frameDelta) % FRAMES + FRAMES) % FRAMES;
    setFrame(newFrame);
  };

  const onDragEnd = () => setDragging(false);

  const src = `assets/nike-360/img${String(frame + 1).padStart(2, '0')}.jpg`;

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Pedestal / shelf */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 560 }}>

        {/* Ambient glow behind shoe */}
        <div style={{
          position: 'absolute', left: '50%', top: '55%',
          transform: 'translate(-50%, -50%)',
          width: '70%', height: '40%',
          background: 'radial-gradient(ellipse, rgba(255,90,31,0.35) 0%, transparent 70%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}/>

        {/* Shoe viewer */}
        <div
          ref={containerRef}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          style={{
            position: 'relative',
            zIndex: 2,
            userSelect: 'none',
            touchAction: 'none',
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          {!loaded && (
            <div style={{
              aspectRatio: '4/3',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', gap: 16,
            }}>
              <div style={{ width: 200, height: 4, background: 'var(--bg-2)', overflow: 'hidden', borderRadius: 2 }}>
                <div style={{
                  height: '100%',
                  width: `${(loadedCount / FRAMES) * 100}%`,
                  background: 'var(--orange)',
                  transition: 'width 0.1s',
                }}/>
              </div>
              <span className="mono" style={{ fontSize: 10 }}>CARGANDO {loadedCount}/{FRAMES}</span>
            </div>
          )}
          {loaded && (
            <img
              src={src}
              alt="Nike — vista 360°"
              draggable={false}
              style={{ width: '100%', display: 'block', userSelect: 'none' }}
            />
          )}
        </div>

        {/* Shelf platform */}
        <div style={{ position: 'relative', zIndex: 3, marginTop: -8 }}>
          <div style={{
            height: 10,
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
            boxShadow: '0 0 40px rgba(255,90,31,0.2), 0 4px 24px rgba(0,0,0,0.6)',
            borderRadius: '2px 2px 0 0',
          }}/>
          <div style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,90,31,0.6) 30%, rgba(255,255,255,0.3) 50%, rgba(255,90,31,0.6) 70%, transparent 100%)',
          }}/>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '40%', height: 28,
              background: 'linear-gradient(180deg, #1e1e1e 0%, #111 100%)',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
            }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '55%', height: 8,
              background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
            }}/>
          </div>
        </div>
      </div>

    </div>
  );
};

window.Shoe360 = Shoe360;
