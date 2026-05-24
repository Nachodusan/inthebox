<?php
// ============================================================
// INTHEBOX — Mercado Pago · Crear preferencia de pago
// Subir este archivo a tu hosting en /api/create-preference.php
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://intheboxes.shop');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ─── TU ACCESS TOKEN (solo vive aquí, nunca en el JS) ───────
$ACCESS_TOKEN = getenv('MP_ACCESS_TOKEN') ?: '';
// ────────────────────────────────────────────────────────────

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) { http_response_code(400); echo json_encode(['error' => 'Body inválido']); exit; }

$items    = $body['items']    ?? [];
$payer    = $body['payer']    ?? [];
$shipping = $body['shipping'] ?? [];
$notes    = $body['notes']    ?? '';

if (empty($items)) { http_response_code(400); echo json_encode(['error' => 'Sin items']); exit; }

// Calcular total (para validar en servidor)
$total = array_reduce($items, fn($s, $i) => $s + ($i['unit_price'] * $i['quantity']), 0);
$total += $shipping['cost'] ?? 0;

$preference = [
    'items' => array_map(fn($it) => [
        'id'          => $it['id'],
        'title'       => $it['title'],
        'quantity'    => (int)$it['quantity'],
        'unit_price'  => (float)$it['unit_price'],
        'currency_id' => 'CLP',
    ], $items),

    'payer' => [
        'email' => $payer['email'] ?? '',
        'name'  => $payer['name']  ?? '',
    ],

    'back_urls' => [
        'success' => 'https://intheboxes.shop/checkout-ok.html',
        'failure' => 'https://intheboxes.shop/checkout-error.html',
        'pending' => 'https://intheboxes.shop/checkout-pendiente.html',
    ],

    'auto_return'          => 'approved',
    'statement_descriptor' => 'INTHEBOX CL',
    'external_reference'   => 'ib-' . time(),

    'shipments' => $shipping['method'] !== 'pickup' ? [
        'cost'            => (float)($shipping['cost'] ?? 0),
        'mode'            => 'not_specified',
        'receiver_address'=> [
            'zip_code'     => $payer['zip']     ?? '',
            'street_name'  => $payer['address'] ?? '',
            'city_name'    => $payer['commune'] ?? '',
            'state_name'   => $payer['region']  ?? 'Metropolitana',
            'country_id'   => 'CL',
        ],
    ] : ['mode' => 'not_specified', 'cost' => 0],

    'payment_methods' => [
        'excluded_payment_types' => [],
        'installments'           => 12,
    ],
];

$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($preference),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $ACCESS_TOKEN,
    ],
]);

$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);

if ($status !== 201 || empty($data['init_point'])) {
    http_response_code(502);
    echo json_encode(['error' => 'MP no respondió bien', 'mp' => $data]);
    exit;
}

echo json_encode(['init_point' => $data['init_point']]);
