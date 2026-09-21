import { ORIGENS, PRIORIDADES } from '../lib/constants';

export default function FilterBar({ filters, onChange, niches, onNewLead, onExport, onImport }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  const hasActiveFilters = filters.niche || filters.origin || filters.priority || filters.search;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-line">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
        placeholder="Buscar por nome ou telefone"
        className="text-[13px] border border-line rounded-sm px-2.5 py-1.5 w-56 focus:outline-none focus:border-ink"
      />

      <select
        value={filters.niche}
        onChange={(e) => update('niche', e.target.value)}
        className="text-[13px] border border-line rounded-sm px-2 py-1.5 text-muted focus:outline-none focus:border-ink bg-paper"
      >
        <option value="">Todos os nichos</option>
        {niches.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <select
        value={filters.origin}
        onChange={(e) => update('origin', e.target.value)}
        className="text-[13px] border border-line rounded-sm px-2 py-1.5 text-muted focus:outline-none focus:border-ink bg-paper"
      >
        <option value="">Todas as origens</option>
        {ORIGENS.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => update('priority', e.target.value)}
        className="text-[13px] border border-line rounded-sm px-2 py-1.5 text-muted focus:outline-none focus:border-ink bg-paper"
      >
        <option value="">Toda prioridade</option>
        {PRIORIDADES.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange({ search: '', niche: '', origin: '', priority: '' })}
          className="text-[12px] text-muted underline underline-offset-2 hover:text-ink"
        >
          Limpar filtros
        </button>
      )}

      <div className="flex-1" />

      <label className="text-[12px] text-muted underline underline-offset-2 hover:text-ink cursor-pointer">
        Importar
        <input
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = '';
          }}
        />
      </label>

      <button
        type="button"
        onClick={onExport}
        className="text-[12px] text-muted underline underline-offset-2 hover:text-ink"
      >
        Exportar
      </button>

      <button
        type="button"
        onClick={onNewLead}
        className="text-[13px] bg-ink text-paper rounded-sm px-3 py-1.5 hover:bg-accent transition-colors"
      >
        Novo lead
      </button>
    </div>
  );
}
