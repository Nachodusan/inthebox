// Full TIENDA page — hero + category rail + catalog with filters

const TiendaPage = ({ onAdd }) => {
  const catRef = React.useRef(null);
  const scrollToCat = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHero
        kicker="TIENDA"
        title={<>TIENDA<br/><span style={{ WebkitTextStroke: '3px var(--fg)', color: 'transparent' }}>INTHEBOX.</span></>}
        subtitle="Catálogo completo. Polerones, poleras, pantalones y zapatillas. Todas las piezas numeradas y limitadas al drop en curso. Agrega a tu caja."
        accent="var(--fg)"
      />

      {/* Category rail */}
      <section style={{ padding: '60px 32px 40px', borderBottom: '1px solid var(--fg)', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 20 }}>[ CATEGORÍAS · 04 FAMILIAS ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {window.CATEGORIES.map((c, i) => (
              <button key={c.id} onClick={() => scrollToCat('shop-' + c.id)}
                style={{
                  aspectRatio: '16 / 10', position: 'relative', overflow: 'hidden',
                  border: '1px solid var(--fg)', background: 'var(--bg)',
                  padding: 20, textAlign: 'left', cursor: 'none',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div className={`tile-bg ${c.bg}`} style={{ opacity: 0.35 }}/>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ color: 'var(--muted)' }}>N°{c.num}</span>
                  <span className="mono">{c.count} PIEZAS</span>
                </div>
                <div style={{ position: 'relative', fontFamily: 'Archivo Black', fontSize: 'clamp(32px, 3.5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.9, textTransform: 'uppercase' }}>
                  {c.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog header strip */}
      <div className="ticker" style={{ background: 'var(--bg)' }}>
        <div><span className="ticker-dot"/> DROP 04 · EN VIVO</div>
        <div>{window.PRODUCTS.length} REFERENCIAS</div>
        <div>ENVÍO GRATIS +$80.000</div>
        <div style={{ marginLeft: 'auto', borderRight: 0 }}>CAMBIOS 30 DÍAS</div>
      </div>

      {/* Full product grid */}
      <ProductGrid onAdd={onAdd} />

      {/* Grouped by category — anchor targets */}
      <section style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto' }}>
          <div className="label" style={{ marginBottom: 20 }}>[ POR CATEGORÍA ]</div>
          {window.CATEGORIES.map(cat => {
            const items = window.PRODUCTS.filter(p => p.cat === cat.id);
            return (
              <div key={cat.id} id={'shop-' + cat.id} style={{ marginTop: 48, scrollMarginTop: 80 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 20, borderBottom: '1px solid var(--fg)', paddingBottom: 12 }}>
                  <div className="mono" style={{ color: 'var(--muted)' }}>N°{cat.num}</div>
                  <h3 style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                    {cat.name}
                  </h3>
                  <div className="mono" style={{ marginLeft: 'auto', color: 'var(--muted)' }}>{items.length} PIEZAS</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                  {items.map(p => {
                    const V = window.ProductViz[p.viz];
                    return (
                      <div key={p.id} className="product">
                        <div className="product-media">
                          <span className="product-serial">N°{String(p.id).padStart(3, '0')}/500</span>
                          {p.tag && <span className="product-tag">{p.tag}</span>}
                          <div className="product-img main">
                            <div className="ph-stripe" />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <V variant={p.main} />
                            </div>
                          </div>
                          <div className="product-img alt">
                            <div className="ph-stripe" />
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <V variant={p.alt} />
                            </div>
                          </div>
                          <button className="product-quickadd" onClick={(e) => { e.preventDefault(); onAdd(p); }}>
                            <span>AGREGAR</span>
                            <span>+ {window.CLP(p.price)}</span>
                          </button>
                        </div>
                        <div className="product-info">
                          <div>
                            <div className="product-name">{p.name}</div>
                            <div className="product-category">{p.type} · {p.sizes.length} TALLAS</div>
                          </div>
                          <div className="product-price">{window.CLP(p.price)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

window.TiendaPage = TiendaPage;
