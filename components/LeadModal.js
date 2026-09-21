import { useState } from 'react';
import { STATUSES, ORIGENS, PRIORIDADES } from '../lib/constants';

const emptyLead = {
  name: '',
  niche: '',
  phone: '',
  origin: 'busca_ativa',
  status: 'novo',
  priority: 'media',
  notes: '',
  tags: [],
  lastContact: '',
};

export default function LeadModal({ lead, onClose, onSave, onDelete }) {
  const isEditing = Boolean(lead);
  const [form, setForm] = useState(() => ({
    ...emptyLead,
    ...lead,
    tags: lead?.tags?.join(', ') || '',
  }));

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    onSave({
      ...form,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      lastContact: form.lastContact || null,
    });
  }

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50">
      <div className="bg-paper border border-line rounded-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-ink">
              {isEditing ? 'Editar lead' : 'Novo lead'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted hover:text-ink text-sm"
            >
              Fechar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-[12px] text-muted mb-1">Nome</label>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] text-muted mb-1">Nicho</label>
                <input
                  value={form.niche}
                  onChange={(e) => update('niche', e.target.value)}
                  placeholder="Ex: Odontologia"
                  className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-[12px] text-muted mb-1">Telefone</label>
                <input
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+5541999999999"
                  className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[12px] text-muted mb-1">Origem</label>
                <select
                  value={form.origin}
                  onChange={(e) => update('origin', e.target.value)}
                  className="w-full text-[14px] border border-line rounded-sm px-2 py-1.5 bg-paper focus:outline-none focus:border-ink"
                >
                  {ORIGENS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-muted mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => update('status', e.target.value)}
                  className="w-full text-[14px] border border-line rounded-sm px-2 py-1.5 bg-paper focus:outline-none focus:border-ink"
                >
                  {STATUSES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] text-muted mb-1">Prioridade</label>
                <select
                  value={form.priority}
                  onChange={(e) => update('priority', e.target.value)}
                  className="w-full text-[14px] border border-line rounded-sm px-2 py-1.5 bg-paper focus:outline-none focus:border-ink"
                >
                  {PRIORIDADES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] text-muted mb-1">Último contato</label>
              <input
                type="date"
                value={form.lastContact || ''}
                onChange={(e) => update('lastContact', e.target.value)}
                className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="block text-[12px] text-muted mb-1">Etiquetas (separadas por vírgula)</label>
              <input
                value={form.tags}
                onChange={(e) => update('tags', e.target.value)}
                placeholder="recém aberto, recuperação de imagem"
                className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="block text-[12px] text-muted mb-1">Observações</label>
              <textarea
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                rows={4}
                className="w-full text-[14px] border border-line rounded-sm px-2.5 py-1.5 focus:outline-none focus:border-ink resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            {isEditing ? (
              <button
                type="button"
                onClick={() => onDelete(lead.id)}
                className="text-[13px] text-muted hover:text-accent underline underline-offset-2"
              >
                Excluir lead
              </button>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="text-[13px] bg-ink text-paper rounded-sm px-4 py-1.5 hover:bg-accent transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
