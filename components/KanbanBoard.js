import { STATUSES } from '../lib/constants';
import LeadCard from './LeadCard';

export default function KanbanBoard({ leads, onOpenLead, onMoveLead }) {
  function handleDragStart(e, leadId) {
    e.dataTransfer.setData('text/plain', leadId);
  }

  function handleDrop(e, statusId) {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) onMoveLead(leadId, statusId);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUSES.map((status) => {
        const columnLeads = leads.filter((lead) => lead.status === status.id);

        return (
          <div
            key={status.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status.id)}
            className="flex-shrink-0 w-72"
          >
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <h2 className="text-[13px] tracking-normal text-ink font-medium">{status.label}</h2>
              <span className="text-[11px] text-paper bg-accent rounded-sm px-1.5 py-0.5 min-w-[20px] text-center">
                {columnLeads.length}
              </span>
            </div>

            <div className="flex flex-col gap-2 min-h-[80px]">
              {columnLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onOpen={onOpenLead}
                  onDragStart={handleDragStart}
                />
              ))}

              {columnLeads.length === 0 && (
                <div className="border border-dashed border-line rounded-md p-4 text-center text-[12px] text-faint">
                  Arraste um lead pra cá
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
