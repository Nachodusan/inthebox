// Mini cart drawer + Footer

// use React.* directly

const Cart = ({ open, onClose, items, onRemove, onQty }) => {
  const subtotal = items.reduce((a, it) => a + it.price * it.qty, 0);
  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="cart-header">
          <div>
            <div className="label">[ CARRO ]</div>
            <div style={{ fontFamily: 'Archivo Black', fontSize: 28, letterSpacing: '-0.03em', textTransform: 'uppercase', marginTop: 4 }}>
              TU CAJA
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar carro">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="label">CAJA VACÍA — AGREGA ALGO</div>
              <div className="mono" style={{ marginTop: 16, color: 'var(--muted)' }}>"TU ESTILO PARTE ACÁ"</div>
            </div>
          )}
          {items.map(it => {
            const V = window.ProductViz[it.viz];
            return (
              <div key={it.id} className="cart-row">
                <div className="cart-thumb">
                  <div className="ph-stripe" />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <V variant={it.main} />
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.01em' }}>{it.name}</div>
                  <div className="label" style={{ marginTop: 4 }}>N°{String(it.id).padStart(3,'0')} · TALLA {it.sizes[0]}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center' }}>
                    <button className="icon-btn" onClick={() => onQty(it.id, Math.max(1, it.qty - 1))}>−</button>
                    <span className="mono">{String(it.qty).padStart(2, '0')}</span>
                    <button className="icon-btn" onClick={() => onQty(it.id, it.qty + 1)}>+</button>
                    <button className="mono" style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--muted)', textDecoration: 'underline' }} onClick={() => onRemove(it.id)}>QUITAR</button>
                  </div>
                </div>
                <div style={{ fontFamily: 'Archivo Black', fontSize: 16 }}>{window.CLP(it.price * it.qty)}</div>
              </div>
            );
          })}
        </div>

        <div className="cart-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span className="label">SUBTOTAL</span>
            <span style={{ fontFamily: 'Archivo Black', fontSize: 28 }}>{window.CLP(subtotal)}</span>
          </div>
          <div className="mono" style={{ color: 'var(--muted)', marginBottom: 20 }}>
            DESPACHO E IMPUESTOS SE CALCULAN AL PAGAR
          </div>
          <button
            className="btn"
            style={{ width: '100%', justifyContent: 'space-between', opacity: items.length === 0 ? 0.45 : 1 }}
            onClick={() => {
              if (items.length === 0) return;
              const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
              window.location.href = base + 'checkout.html';
            }}
          >
            <span>IR A PAGAR</span>
            <span>→</span>
          </button>
          {items.length === 0 && (
            <div className="mono" style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 8, letterSpacing: '0.15em' }}>
              AGREGA PRODUCTOS PRIMERO
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const Footer = () => (
  <footer className="footer">
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      <div className="footer-mega reveal">INTHEBOX.</div>

      <div className="footer-grid">
        <div>
          <h4>CONTACTO</h4>
          <div className="mono" style={{ color: 'rgba(242,237,228,0.7)', lineHeight: 1.7, marginBottom: 16 }}>
            AV. PROVIDENCIA 1208<br/>
            PROVIDENCIA · SANTIAGO<br/>
            HOLA@INTHEBOX.CL
          </div>
          <h4 style={{ marginTop: 32 }}>NEWSLETTER</h4>
          <form onSubmit={(e) => { e.preventDefault(); const i = e.target.querySelector('input'); if (i.value) { i.value = ''; alert('SUSCRITO — BIENVENIDO A LA CAJA'); } }}
                style={{ display: 'flex', borderBottom: '1px solid rgba(242,237,228,0.3)' }}>
            <input type="email" placeholder="TU EMAIL"
              style={{ background: 'transparent', border: 'none', color: 'var(--bg)', padding: '14px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em', flex: 1, outline: 'none' }}
            />
            <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--bg)', fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.1em' }}>
              →
            </button>
          </form>
        </div>

        <div>
          <h4>TIENDA</h4>
          <a href="tienda.html#shop-hoodies">Polerones</a>
          <a href="tienda.html#shop-tees">Poleras</a>
          <a href="tienda.html#shop-pants">Pantalones</a>
          <a href="tienda.html#shop-shoes">Zapatillas</a>
          <a href="drops.html">Drops nuevos</a>
          <a href="#">Lookbook</a>
        </div>
        <div>
          <h4>AYUDA</h4>
          <a href="#">Envíos y devoluciones</a>
          <a href="#">Guía de tallas</a>
          <a href="#">Seguimiento</a>
          <a href="#">Contacto</a>
          <a href="#">FAQ</a>
        </div>
        <div>
          <h4>LEGAL</h4>
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Cookies</a>
          <a href="#">Trabaja con nosotros</a>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 80, paddingTop: 24, borderTop: '1px solid rgba(242,237,228,0.2)', flexWrap: 'wrap', gap: 16 }}>
        <div className="mono" style={{ opacity: 0.5 }}>© 2026 INTHEBOX CL · TODOS LOS DERECHOS RESERVADOS</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['IG','TT','YT','SC'].map(n => (
            <a key={n} href="#" className="mono" style={{ border: '1px solid rgba(242,237,228,0.3)', padding: '8px 12px' }}>{n}</a>
          ))}
        </div>
        <div className="mono" style={{ opacity: 0.5 }}>HECHO CON ♥ EN SANTIAGO</div>
      </div>
    </div>
  </footer>
);

window.Cart = Cart;
window.Footer = Footer;
