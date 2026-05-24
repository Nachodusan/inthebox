// Servidor local para INTHEBOX — archivos estáticos + endpoint Mercado Pago
// Uso: node server.js
// Abre: http://localhost:3000

const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const https = require('https');

const PORT         = 8080;
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jsx':  'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

// ── Crear preferencia MP ─────────────────────────────────────
function createPreference(body, res) {
  const items    = body.items    || [];
  const payer    = body.payer    || {};
  const shipping = body.shipping || {};

  const preference = JSON.stringify({
    items: items.map(it => ({
      id: String(it.id), title: it.title,
      quantity: Number(it.quantity), unit_price: Number(it.unit_price),
    })),
    payer: { email: payer.email || '', name: payer.name || '' },
    back_urls: {
      success: 'http://localhost:3000/checkout-ok.html',
      failure: 'http://localhost:3000/checkout-error.html',
      pending: 'http://localhost:3000/checkout-pendiente.html',
    },
    statement_descriptor: 'INTHEBOX CL',
    external_reference: 'ib-test-' + Date.now(),
    shipments: {
      mode: 'not_specified',
      cost: Number(shipping.cost || 0),
    },
  });

  const options = {
    hostname: 'api.mercadopago.com',
    path:     '/checkout/preferences',
    method:   'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
      'Content-Length': Buffer.byteLength(preference),
    },
  };

  const req = https.request(options, mpRes => {
    let data = '';
    mpRes.on('data', chunk => data += chunk);
    mpRes.on('end', () => {
      const json = JSON.parse(data);
      if (mpRes.statusCode === 201 && json.init_point) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ init_point: json.init_point }));
      } else {
        console.error('MP error:', json);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: json.message || 'Error de MP', mp: json }));
      }
    });
  });

  req.on('error', e => {
    console.error('Request error:', e);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  });

  req.write(preference);
  req.end();
}

// ── Servidor ─────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const urlPath = req.url.split('?')[0];

  // Endpoint MP — intercepta ANTES de servir archivos
  if (urlPath === '/api/create-preference.php' || urlPath === '/api/create-preference') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204); res.end(); return;
    }
    if (req.method !== 'POST') {
      res.writeHead(405); res.end('Method not allowed'); return;
    }
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      console.log('[MP] POST recibido:', body.slice(0, 120));
      try { createPreference(JSON.parse(body), res); }
      catch(e) {
        console.error('[MP] Error parse:', e.message);
        res.writeHead(400); res.end(JSON.stringify({ error: 'Body inválido' }));
      }
    });
    return;
  }

  // Archivos estáticos
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  // Eliminar query strings (ya está en urlPath)

  // Si no tiene extensión, probar .html
  if (!path.extname(filePath)) filePath += '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 — no encontrado: ' + req.url);
      return;
    }
    const ext  = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  ┌─────────────────────────────────────┐`);
  console.log(`  │  INTHEBOX dev server                │`);
  console.log(`  │  http://localhost:${PORT}              │`);
  console.log(`  │  Checkout → /checkout.html          │`);
  console.log(`  │  MP endpoint activo ✓               │`);
  console.log(`  └─────────────────────────────────────┘\n`);
});
