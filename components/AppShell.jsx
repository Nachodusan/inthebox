// Shared App shell — nav, preloader, cursor, grain, cart, footer.
// Pages pass a `children` to render their unique content.

const AppShell = ({ children, activePage }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState(() => localStorage.getItem('ib-theme') || 'light');
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ib-cart') || '[]'); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ib-theme', theme);
  }, [theme]);
  React.useEffect(() => {
    localStorage.setItem('ib-cart', JSON.stringify(cart));
  }, [cart]);

  useReveal();

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id));
  const setQty = (id, qty) => setCart(prev => prev.map(x => x.id === id ? { ...x, qty } : x));
  const cartCount = cart.reduce((a, x) => a + x.qty, 0);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Grain />
      <CustomCursor />
      <Nav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} theme={theme} setTheme={setTheme} activePage={activePage} />

      <main>
        {typeof children === 'function' ? children({ addToCart }) : children}
      </main>

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cart} onRemove={removeFromCart} onQty={setQty} />
    </>
  );
};

window.AppShell = AppShell;
