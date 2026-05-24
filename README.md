# INTHEBOX — Streetwear / Skate · Chile 🛹

> Sitio e-commerce completo para marca de streetwear chilena. Diseño brutalist editorial con animaciones 3D, catálogo de productos, carrito y pasarela de pago.

**[→ Ver demo en vivo](https://intheboxes.shop)**

---

## Stack

| Tecnología | Uso |
|---|---|
| React 18 (CDN) | UI sin build step |
| GSAP 3 | Animaciones 3D y timeline |
| CSS Variables | Design system / theming |
| Vanilla JS | Lógica de carrito y estado |
| Node.js | Dev server + API Mercado Pago |

---

## Estructura

```
inthebox/
├── index.html          # Home
├── tienda.html         # Catálogo de productos
├── drops.html          # Drops exclusivos
├── checkout.html       # Pasarela de pago
├── styles.css          # Design system completo
├── server.js           # Dev server (Node)
├── components/
│   ├── AppShell.jsx    # Nav, preloader, cursor, carrito global
│   ├── Hero.jsx        # Animación 3D cubo → título
│   ├── Chrome.jsx      # Cursor, grain, marquee, nav
│   ├── Catalog.jsx     # Grid de productos
│   ├── CartFooter.jsx  # Drawer de carrito + footer
│   ├── Checkout.jsx    # Formulario de pago
│   ├── ProductViz.jsx  # Visualizaciones CSS de productos
│   ├── Shoe360.jsx     # Viewer 360° drag-to-rotate
│   ├── DropsPage.jsx   # Página de drops
│   └── TiendaPage.jsx  # Página tienda
└── assets/
    └── nike-360/       # 36 frames para viewer 360°
```

---

## Features

- **Animación Hero** — cubo 3D con GSAP: entra girando, pulsa, expulsa el título y se encoge hasta ser el punto de "BOX."
- **Cursor personalizado** — crosshair + dot naranja con parallax
- **Preloader** — animación de carga tipo terminal
- **Tema claro/oscuro** — persistido en localStorage
- **Carrito** — drawer lateral con estado global, qty controls, persistencia
- **Viewer 360°** — drag para rotar zapatilla (36 frames preload)
- **Checkout** — formulario + 3 opciones de despacho
- **Marquee** — texto infinito animado doble fila
- **Scroll reveals** — Intersection Observer en secciones
- **Responsive** — mobile-first

---

## Correr localmente

```bash
# Clonar
git clone https://github.com/Nachodusan/inthebox.git
cd inthebox

# Iniciar servidor (Node nativo, sin dependencias)
node server.js

# Abrir en el navegador
open http://localhost:8080
```

> No requiere `npm install` — el servidor usa solo módulos nativos de Node.

---

## Capturas

| Home | Tienda | Checkout |
|---|---|---|
| Animación hero 3D | Catálogo con filtros | Formulario minimalista |

---

## Integración Mercado Pago

El servidor (`server.js`) incluye el endpoint `/api/create-preference.php` para conectar con la API de Mercado Pago. Configurar el access token como variable de entorno:

```bash
MP_ACCESS_TOKEN=APP_USR-tu-token node server.js
```

---

## Autor

**Dusan** — [@Nachodusan](https://github.com/Nachodusan)  
Diseño & desarrollo — Santiago, Chile 🇨🇱
