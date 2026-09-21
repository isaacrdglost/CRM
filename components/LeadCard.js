import { ORIGENS, labelFor } from '../lib/constants';
import PriorityDot from './PriorityDot';

export default function LeadCard({ lead, onOpen, onDragStart }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={() => onOpen(lead)}
      className="w-full text-left bg-paper border border-line rounded-md p-3 hover:border-ink transition-colors cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-[15px] leading-snug text-ink">{lead.name}</h3>
        <PriorityDot priority={lead.priority} />
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {lead.niche && (
          <span className="text-[11px] border border-line rounded-sm px-1.5 py-0.5 text-muted">
            {lead.niche}
          </span>
        )}
        <span className="text-[11px] border border-line rounded-sm px-1.5 py-0.5 text-muted">
          {labelFor(ORIGENS, lead.origin)}
        </span>
      </div>

      {lead.phone && <p className="mt-2 text-[13px] text-muted">{lead.phone}</p>}

      {lead.notes && (
        <p className="mt-1.5 text-[12px] text-faint line-clamp-2">{lead.notes}</p>
      )}

      {lead.lastContact && (
        <p className="mt-2 text-[11px] text-faint">Último contato: {lead.lastContact}</p>
      )}
    </button>
  );
}
