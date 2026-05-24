// Checkout simplificado — conecta con Mercado Pago via PHP backend

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'ESTÁNDAR',      eta: '3–5 DÍAS HÁBILES',   price: 4990 },
  { id: 'express',  label: 'EXPRESS',        eta: '24–48 HRS',          price: 9990 },
  { id: 'pickup',   label: 'RETIRO TIENDA', eta: 'PROVIDENCIA · 1208', price: 0    },
];

const Checkout = () => {
  const [items, setItems] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ib-cart') || '[]'); } catch { return []; }
  });

  const [shipping, setShipping] = React.useState('standard');
  const [error, setError] = React.useState(null);

  const [form, setForm] = React.useState({ email: '', name: '', phone: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const shippingCost = SHIPPING_OPTIONS.find(s => s.id === shipping)?.price || 0;
  const subtotal     = items.reduce((a, it) => a + it.price * it.qty, 0);
  const total        = subtotal + shippingCost;

  const setQty    = (id, qty) => { const n = items.map(x => x.id===id ? {...x,qty} : x).filter(x=>x.qty>0); setItems(n); localStorage.setItem('ib-cart', JSON.stringify(n)); };
  const removeItem = id        => { const n = items.filter(x=>x.id!==id); setItems(n); localStorage.setItem('ib-cart', JSON.stringify(n)); };

  const handlePay = () => {
    setError(null);
    if (!form.email || !form.name) { setError('Ingresa tu nombre y email para continuar.'); return; }
    if (items.length === 0) { setError('Tu caja está vacía.'); return; }
    // Pago pendiente de integración
    alert('Pedido recibido. Nos contactaremos a ' + form.email + ' para coordinar el pago.');
  };

  return (
    <section style={{ minHeight: '100vh', padding: '40px 24px 80px', borderBottom: '1px solid var(--fg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div className="mono" style={{ color: 'var(--orange)', letterSpacing: '0.2em', fontSize: 11 }}>[ CHECKOUT ]</div>
          <h1 style={{ fontFamily: 'Archivo Black', fontSize: 'clamp(40px,8vw,100px)', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 0.88, margin: '8px 0 0' }}>
            CIERRA<br/>LA <span style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}>CAJA.</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,420px)', gap: 40, alignItems: 'start' }} className="checkout-grid">

          {/* ── Formulario ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Contacto */}
            <Block step="01" title="TUS DATOS">
              <Field label="NOMBRE COMPLETO" value={form.name}  onChange={set('name')}  placeholder="Nombre Apellido" />
              <Field label="EMAIL"            value={form.email} onChange={set('email')} type="email" placeholder="tu@email.cl" />
              <Field label="TELÉFONO (OPCIONAL)" value={form.phone} onChange={set('phone')} type="tel" placeholder="+56 9 ..." />
            </Block>

            {/* Envío */}
            <Block step="02" title="ENVÍO">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SHIPPING_OPTIONS.map(opt => {
                  const active = shipping === opt.id;
                  return (
                    <label key={opt.id} onClick={() => setShipping(opt.id)} style={{
                      display: 'grid', gridTemplateColumns: '20px 1fr auto',
                      alignItems: 'center', gap: 14, padding: '16px 18px',
                      border: `2px solid ${active ? 'var(--orange)' : 'var(--fg)'}`,
                      background: active ? 'rgba(255,90,31,0.06)' : 'transparent',
                      cursor: 'pointer',
                    }}>
                      <span style={{
                        width: 14, height: 14, border: '2px solid var(--fg)', borderRadius: '50%',
                        background: active ? 'var(--orange)' : 'transparent',
                        boxShadow: active ? 'inset 0 0 0 3px var(--bg)' : 'none',
                        display: 'block',
                      }}/>
                      <div>
                        <div style={{ fontFamily: 'Archivo Black', fontSize: 14 }}>{opt.label}</div>
                        <div className="mono" style={{ color: 'var(--muted)', fontSize: 10, marginTop: 2, letterSpacing: '0.12em' }}>{opt.eta}</div>
                      </div>
                      <div style={{ fontFamily: 'Archivo Black', fontSize: 14 }}>
                        {opt.price === 0 ? 'GRATIS' : window.CLP(opt.price)}
                      </div>
                    </label>
                  );
                })}
              </div>
            </Block>

            {/* Pago */}
            <Block step="03" title="PAGO">
              <div style={{
                border: '1px solid var(--fg)', padding: '18px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ fontFamily: 'Archivo Black', fontSize: 15 }}>COORDINAMOS EL PAGO CONTIGO</div>
              </div>
              <div className="mono" style={{ color: 'var(--muted)', fontSize: 10, letterSpacing: '0.1em', lineHeight: 1.6 }}>
                AL CONFIRMAR TE CONTACTAMOS POR EMAIL PARA COORDINAR EL MÉTODO DE PAGO.<br/>
                TUS DATOS ESTÁN SEGUROS CON INTHEBOX.
              </div>
            </Block>
          </div>

          {/* ── Resumen ── */}
          <aside style={{ position: 'sticky', top: 90 }}>
            <div style={{ border: '1px solid var(--fg)', padding: 24 }}>
              <div className="label" style={{ marginBottom: 20 }}>● TU CAJA</div>

              {items.length === 0 ? (
                <div className="mono" style={{ color: 'var(--muted)', padding: '20px 0', fontSize: 12 }}>
                  VACÍA. <a href="tienda.html" style={{ color: 'var(--orange)' }}>IR A LA TIENDA →</a>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 340, overflowY: 'auto' }}>
                  {items.map(it => (
                    <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '44px 1fr auto', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, border: '1px solid var(--fg)', position: 'relative', background: 'rgba(0,0,0,0.03)', flexShrink: 0 }}>
                        <span style={{ position: 'absolute', top: 2, left: 3, fontFamily: 'JetBrains Mono', fontSize: 8, color: 'var(--muted)' }}>×{it.qty}</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</div>
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4 }}>
                          <button className="icon-btn" style={{ width: 18, height: 18, fontSize: 11 }} onClick={() => setQty(it.id, Math.max(1, it.qty-1))}>−</button>
                          <span className="mono" style={{ fontSize: 10, minWidth: 16, textAlign: 'center' }}>{it.qty}</span>
                          <button className="icon-btn" style={{ width: 18, height: 18, fontSize: 11 }} onClick={() => setQty(it.id, it.qty+1)}>+</button>
                          <button onClick={() => removeItem(it.id)} className="mono" style={{ background:'transparent', border:'none', color:'var(--muted)', textDecoration:'underline', fontSize:10, marginLeft:'auto', cursor:'pointer' }}>QUITAR</button>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Archivo Black', fontSize: 12 }}>{window.CLP(it.price * it.qty)}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totales */}
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--fg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <TotalRow k="SUBTOTAL" v={window.CLP(subtotal)} />
                <TotalRow k="DESPACHO" v={shippingCost === 0 ? 'GRATIS' : window.CLP(shippingCost)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--fg)' }}>
                  <span className="label">TOTAL</span>
                  <span style={{ fontFamily: 'Archivo Black', fontSize: 28, letterSpacing: '-0.02em' }}>{window.CLP(total)}</span>
                </div>
              </div>

              {error && (
                <div className="mono" style={{ marginTop: 14, padding: '10px 12px', border: '1px solid var(--orange)', color: 'var(--orange)', fontSize: 11, lineHeight: 1.5 }}>
                  ⚠ {error}
                </div>
              )}

              <button onClick={handlePay}
                style={{
                  marginTop: 16, width: '100%', background: 'var(--fg)', color: 'var(--bg)', border: 'none',
                  padding: '18px 20px', fontFamily: 'Archivo Black', fontSize: 15, letterSpacing: '0.05em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                <span>CONFIRMAR PEDIDO</span>
                <span>→</span>
              </button>

              <a href="tienda.html" className="mono" style={{ display: 'block', textAlign: 'center', marginTop: 12, color: 'var(--muted)', fontSize: 10, letterSpacing: '0.15em' }}>
                ← SEGUIR COMPRANDO
              </a>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-grid > aside { position: static !important; }
        }
      `}</style>
    </section>
  );
};

const Block = ({ step, title, children }) => (
  <div style={{ border: '1px solid var(--fg)', padding: 20 }}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 18 }}>
      <span className="mono" style={{ color: 'var(--orange)', fontSize: 10, letterSpacing: '0.2em' }}>[{step}]</span>
      <h2 style={{ fontFamily: 'Archivo Black', fontSize: 18, letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
  </div>
);

const Field = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <label style={{ display: 'block' }}>
    <div className="label" style={{ marginBottom: 5 }}>{label}</div>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        width: '100%', background: 'transparent', border: '1px solid var(--fg)',
        padding: '11px 13px', fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.04em',
        color: 'var(--fg)', outline: 'none', boxSizing: 'border-box',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--orange)'}
      onBlur={e  => e.target.style.borderColor = 'var(--fg)'}
    />
  </label>
);

const TotalRow = ({ k, v }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span className="label">{k}</span>
    <span className="mono" style={{ fontSize: 12 }}>{v}</span>
  </div>
);

window.Checkout = Checkout;
