const BASE = '/api';

// ---------- offline support ----------
const CACHE_KEY = (p) => `hc:${p}`;
const GET_TTL = 15000;
export const isOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false);
export const pendingActions = () => {
  try { return JSON.parse(localStorage.getItem('hc:pending') || '[]'); } catch { return []; }
};
export function enqueuePending(action, payload) {
  const q = pendingActions();
  q.push({ action, payload, at: new Date().toISOString() });
  localStorage.setItem('hc:pending', JSON.stringify(q));
}
export async function flushPending(deviceId = 'DEV-RK-001') {
  const q = pendingActions();
  if (!q.length) return 0;
  try {
    const res = await fetch(`${BASE}/offline/sync`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: deviceId, items: q }),
    });
    if (res.ok) { localStorage.removeItem('hc:pending'); window.dispatchEvent(new CustomEvent('hc:sync')); }
    return (await res.json()).queued || 0;
  } catch { return 0; }
}

async function request(path, opts = {}) {
  const method = (opts.method || 'GET').toUpperCase();
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
    });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    const data = await res.json();
    if (method === 'GET') {
      try {
        localStorage.setItem(CACHE_KEY(path), JSON.stringify({ at: Date.now(), data }));
        localStorage.removeItem(`hc:pending:${path}`);
      } catch { /* storage full — ignore */ }
    }
    return data;
  } catch (err) {
    // offline fallback: serve cached GET, recreate pending POST
    if (method === 'GET') {
      const cached = localStorage.getItem(CACHE_KEY(path));
      if (cached) {
        const { at, data } = JSON.parse(cached);
        if (Date.now() - at < 24 * 3600 * 1000) return data;
      }
    }
    if (method !== 'GET') {
      let body = opts.body;
      try { body = JSON.parse(body); } catch { body = body; }
      enqueuePending(`${method} ${path}`, body);
      window.dispatchEvent(new CustomEvent('hc:syncrequired'));
    }
    if (isOnline()) throw err;
    return null;
  }
}

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p, body) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
  roles: () => request('/roles'),
  me: () => request('/me'),
  hives: (beekeeperId) => request(beekeeperId ? `/hives?beekeeper_id=${beekeeperId}` : '/hives'),
  hive: (id) => request(`/hives/${id}`),
  readings: (id, limit = 400) => request(`/hives/${id}/readings?limit=${limit}`),
  hiveAlerts: (id) => request(`/hives/${id}/alerts`),
  alerts: (beekeeperId) => request(beekeeperId ? `/alerts?beekeeper_id=${beekeeperId}` : '/alerts'),
  simulate: (id, body) => request(`/hives/${id}/simulate`, { method: 'POST', body: JSON.stringify(body) }),
  stress: (id, level) => request(`/hives/${id}/stress`, { method: 'POST', body: JSON.stringify({ level }) }),
  predict: (id) => request(`/hives/${id}/predict`),
  weather: () => request('/weather'),
  assistant: (text, lang = 'en') => request('/assistant', { method: 'POST', body: JSON.stringify({ text, lang }) }),
  beekeepers: () => request('/beekeepers'),
  registerBeekeeper: (b) => request('/beekeepers', { method: 'POST', body: JSON.stringify(b) }),
  registerHive: (b) => request('/hives', { method: 'POST', body: JSON.stringify(b) }),
  batches: (beekeeperId) => request(beekeeperId ? `/batches?beekeeper_id=${beekeeperId}` : '/batches'),
  batch: (id) => request(`/batches/${id}`),
  createBatch: (b) => request('/batches', { method: 'POST', body: JSON.stringify(b) }),
  addBatchEvent: (id, b) => request(`/batches/${id}/event`, { method: 'POST', body: JSON.stringify(b) }),
  labQueue: () => request('/lab/queue'),
  qualify: (b) => request('/lab/qualify', { method: 'POST', body: JSON.stringify(b) }),
  verifyQr: (b) => request('/qr/verify', { method: 'POST', body: JSON.stringify(b) }),
  scanHistory: (id) => request(`/qr/scan-history/${id}`),
  counterfeit: () => request('/counterfeit/alerts'),
  marketplace: () => request('/marketplace'),
  listOnMarket: (b) => request('/marketplace', { method: 'POST', body: JSON.stringify(b) }),
  adminStats: () => request('/admin/stats'),
  adminAlerts: () => request('/admin/alerts'),
  adminDrilldown: () => request('/admin/drilldown'),
  productionSeries: () => request('/admin/production-series'),
  chainVerify: () => request('/chain/verify'),
  chainStats: () => request('/chain/stats'),
  system: () => request('/system'),
};