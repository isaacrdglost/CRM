'use client';

import { useEffect, useMemo, useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import FilterBar from '../components/FilterBar';
import LeadModal from '../components/LeadModal';
import { loadLeads, saveLeads, makeId } from '../lib/storage';
import { seedLeads } from '../lib/seedData';

export default function Page() {
  const [leads, setLeads] = useState([]);
  const [ready, setReady] = useState(false);
  const [modalLead, setModalLead] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({ search: '', niche: '', origin: '', priority: '' });

  useEffect(() => {
    setLeads(loadLeads(seedLeads));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveLeads(leads);
  }, [leads, ready]);

  const niches = useMemo(() => {
    const set = new Set(leads.map((l) => l.niche).filter(Boolean));
    return Array.from(set).sort();
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (filters.niche && lead.niche !== filters.niche) return false;
      if (filters.origin && lead.origin !== filters.origin) return false;
      if (filters.priority && lead.priority !== filters.priority) return false;
      if (search) {
        const haystack = `${lead.name} ${lead.phone}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }, [leads, filters]);

  const stats = useMemo(() => {
    const quentes = leads.filter((l) => ['respondeu', 'negociando'].includes(l.status)).length;
    const fechados = leads.filter((l) => l.status === 'fechado').length;
    return { total: leads.length, quentes, fechados };
  }, [leads]);

  function openNewLead() {
    setModalLead(null);
    setModalOpen(true);
  }

  function openLead(lead) {
    setModalLead(lead);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setModalLead(null);
  }

  function handleSave(formData) {
    if (modalLead) {
      setLeads((prev) => prev.map((l) => (l.id === modalLead.id ? { ...l, ...formData } : l)));
    } else {
      setLeads((prev) => [...prev, { ...formData, id: makeId(), createdAt: new Date().toISOString().slice(0, 10) }]);
    }
    closeModal();
  }

  function handleDelete(id) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    closeModal();
  }

  function moveLead(id, status) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed)) {
          setLeads(parsed);
        }
      } catch (err) {
        console.error('Arquivo inválido', err);
      }
    };
    reader.readAsText(file);
  }

  if (!ready) return null;

  return (
    <main className="min-h-screen px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-ink">Pipeline de leads</h1>
          <p className="text-[13px] text-muted mt-1">
            {stats.total} leads no total, {stats.quentes} em conversa quente, {stats.fechados} fechados
          </p>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        niches={niches}
        onNewLead={openNewLead}
        onExport={handleExport}
        onImport={handleImport}
      />

      <KanbanBoard leads={filteredLeads} onOpenLead={openLead} onMoveLead={moveLead} />

      {modalOpen && (
        <LeadModal lead={modalLead} onClose={closeModal} onSave={handleSave} onDelete={handleDelete} />
      )}
    </main>
  );
}
