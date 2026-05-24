// Catalog — Spanish + CLP

const CATEGORIES = [
  { id: 'hoodies', num: '01', name: 'POLERONES', count: 4, tag: 'ALGODÓN PESADO', bg: 'hoodie' },
  { id: 'tees',    num: '02', name: 'POLERAS',   count: 4, tag: 'CORTE OVERSIZE', bg: 'tees' },
  { id: 'pants',   num: '03', name: 'PANTALONES',count: 4, tag: 'BAGGY / ANCHO',  bg: 'pants' },
  { id: 'shoes',   num: '04', name: 'ZAPATILLAS',count: 4, tag: 'SKATE-READY',    bg: 'shoes' },
];

const PRODUCTS = [
  { id: 1,  cat: 'hoodies', type: 'Polerón', name: 'POLERÓN BOX LOGO',       price: 75000, tag: 'NUEVO',    viz: 'HoodieViz', main: 'orange', alt: 'black',  sizes: ['S','M','L','XL'] },
  { id: 2,  cat: 'hoodies', type: 'Polerón', name: 'POLERÓN ZIP CEMENTO',    price: 95000, tag: null,       viz: 'HoodieViz', main: 'black',  alt: 'green',  sizes: ['S','M','L','XL','XXL'] },
  { id: 3,  cat: 'hoodies', type: 'Polerón', name: 'POLERÓN CROP CREMA',     price: 65000, tag: 'LIMITADO', viz: 'HoodieViz', main: 'cream',  alt: 'orange', sizes: ['XS','S','M','L'] },
  { id: 4,  cat: 'hoodies', type: 'Polerón', name: 'POLERÓN VERDE PATRULLA', price: 85000, tag: null,       viz: 'HoodieViz', main: 'green',  alt: 'black',  sizes: ['M','L','XL','XXL'] },
  { id: 5,  cat: 'tees', type: 'Polera', name: 'POLERA BASIC HUESO',   price: 29000, tag: null,       viz: 'TeeViz', main: 'white', alt: 'black', sizes: ['S','M','L','XL'] },
  { id: 6,  cat: 'tees', type: 'Polera', name: 'POLERA SINFONÍA NEGRA', price: 32000, tag: 'NUEVO',    viz: 'TeeViz', main: 'black', alt: 'red',   sizes: ['S','M','L','XL'] },
  { id: 7,  cat: 'tees', type: 'Polera', name: 'POLERA BOX ROJO HAZARD',price: 35000, tag: 'LIMITADO', viz: 'TeeViz', main: 'red',   alt: 'white', sizes: ['M','L','XL'] },
  { id: 8,  cat: 'tees', type: 'Polera', name: 'POLERA ARCHIVE BLANCA', price: 25000, tag: null,       viz: 'TeeViz', main: 'white', alt: 'red',   sizes: ['XS','S','M','L','XL'] },
  { id: 9,  cat: 'pants', type: 'Pantalón', name: 'JEAN BAGGY LAVADO',     price: 95000,  tag: null,       viz: 'PantsViz', main: 'denim', alt: 'black',  sizes: ['28','30','32','34','36'] },
  { id: 10, cat: 'pants', type: 'Pantalón', name: 'CARGO OLIVO DROP',      price: 105000, tag: 'NUEVO',    viz: 'PantsViz', main: 'cargo', alt: 'denim',  sizes: ['S','M','L','XL'] },
  { id: 11, cat: 'pants', type: 'Pantalón', name: 'PANTALÓN WIDE NEGRO',   price: 89000,  tag: null,       viz: 'PantsViz', main: 'black', alt: 'denim',  sizes: ['28','30','32','34'] },
  { id: 12, cat: 'pants', type: 'Pantalón', name: 'JEAN DOUBLE-KNEE',      price: 115000, tag: 'LIMITADO', viz: 'PantsViz', main: 'denim', alt: 'cargo',  sizes: ['30','32','34','36'] },
  { id: 13, cat: 'shoes', type: 'Zapatilla', name: 'CEMENTO LOW BLANCA',   price: 79000,  tag: null,       viz: 'ShoeViz', main: 'white', alt: 'black', sizes: ['40','41','42','43','44'] },
  { id: 14, cat: 'shoes', type: 'Zapatilla', name: 'CEMENTO LOW NEGRA',    price: 79000,  tag: null,       viz: 'ShoeViz', main: 'black', alt: 'white', sizes: ['40','41','42','43','44','45'] },
  { id: 15, cat: 'shoes', type: 'Zapatilla', name: 'BLOOD RUN CAÑA ALTA',  price: 99000,  tag: 'NUEVO',    viz: 'ShoeViz', main: 'red',   alt: 'black', sizes: ['41','42','43','44'] },
  { id: 16, cat: 'shoes', type: 'Zapatilla', name: 'RE-SOLE OG BLANCA',    price: 69000,  tag: 'LIMITADO', viz: 'ShoeViz', main: 'white', alt: 'red',   sizes: ['40','41','42','43'] },
];

const CategoryShowcase = () => (
  <section id="categories" style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)' }}>
    <div style={{ maxWidth: 1600, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }} className="reveal">
        <div>
          <div className="label">[ 03 — TIENDA ]</div>
          <h2 className="display" style={{ fontSize: 'clamp(48px, 7vw, 120px)', marginTop: 16 }}>
            CUATRO<br/><span style={{ WebkitTextStroke: '2px var(--fg)', color: 'transparent' }}>CAJAS.</span>
          </h2>
        </div>
        <p style={{ maxWidth: 420, color: 'var(--fg-2)' }} className="mono">
          CUATRO FAMILIAS. UN SISTEMA. CADA PIEZA DISEÑADA PARA DURAR MÁS DE UNA TEMPORADA.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {CATEGORIES.map((c, i) => (
          <a key={c.id} href={`tienda.html#shop-${c.id}`} className="cat-tile reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className={`tile-bg ${c.bg}`}></div>
            <span className="cat-num">N°{c.num} / 04</span>
            <div className="cat-arrow">→</div>
            <div className="cat-tile-inner">
              <div className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.tag} · {c.count} PIEZAS</div>
              <div className="cat-name" style={{ marginTop: 8, color: '#fff' }}>{c.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Filters = ({ active, setActive, counts }) => {
  const opts = [
    { id: 'all', label: 'TODO', count: counts.all },
    { id: 'hoodies', label: 'POLERONES', count: counts.hoodies },
    { id: 'tees', label: 'POLERAS', count: counts.tees },
    { id: 'pants', label: 'PANTALONES', count: counts.pants },
    { id: 'shoes', label: 'ZAPATILLAS', count: counts.shoes },
  ];
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', position: 'relative' }}>
      {opts.map(o => (
        <button key={o.id} className={`chip ${active === o.id ? 'active' : ''}`} onClick={() => setActive(o.id)}>
          {o.label}
          <span className="count">[{String(o.count).padStart(2, '0')}]</span>
        </button>
      ))}
    </div>
  );
};

const ProductCard = ({ p, onAdd }) => {
  const V = window.ProductViz[p.viz];
  return (
    <div className="product" id={p.cat}>
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
          <span>+ {CLP(p.price)}</span>
        </button>
      </div>
      <div className="product-info">
        <div>
          <div className="product-name">{p.name}</div>
          <div className="product-category">{p.type} · {p.sizes.length} TALLAS</div>
        </div>
        <div className="product-price">{CLP(p.price)}</div>
      </div>
    </div>
  );
};

const ProductGrid = ({ onAdd }) => {
  const [active, setActive] = React.useState('all');
  const [size, setSize] = React.useState('all');

  const counts = React.useMemo(() => {
    const c = { all: PRODUCTS.length };
    CATEGORIES.forEach(cat => { c[cat.id] = PRODUCTS.filter(p => p.cat === cat.id).length; });
    return c;
  }, []);

  const filtered = React.useMemo(() => {
    return PRODUCTS.filter(p => {
      if (active !== 'all' && p.cat !== active) return false;
      if (size !== 'all' && !p.sizes.includes(size)) return false;
      return true;
    });
  }, [active, size]);

  return (
    <section id="tienda" style={{ padding: '80px 32px', borderBottom: '1px solid var(--fg)' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 24 }} className="reveal">
          <div>
            <div className="label">[ CATÁLOGO / DROP 04 ]</div>
            <h2 className="display" style={{ fontSize: 'clamp(44px, 6vw, 100px)', marginTop: 12 }}>
              COMPRAR EL DROP
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end' }}>
            <Filters active={active} setActive={setActive} counts={counts} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['all','S','M','L','XL','42'].map(s => (
                <button key={s} className={`size-chip ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}
                  style={size === s ? { background: 'var(--fg)', color: 'var(--bg)' } : {}}>
                  {s === 'all' ? 'TODAS LAS TALLAS' : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onAdd={onAdd} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div className="label">NO HAY PIEZAS QUE COINCIDAN — PRUEBA OTROS FILTROS</div>
          </div>
        )}
      </div>
    </section>
  );
};

window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.CategoryShowcase = CategoryShowcase;
window.ProductGrid = ProductGrid;
