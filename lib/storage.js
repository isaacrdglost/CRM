const KEY = 'crm-leads-v1';

export function loadLeads(seed) {
  if (typeof window === 'undefined') return seed;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seed;
    return parsed;
  } catch (err) {
    console.error('Não foi possível carregar os leads salvos', err);
    return seed;
  }
}

export function saveLeads(leads) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Não foi possível salvar os leads', err);
  }
}

export function makeId() {
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
