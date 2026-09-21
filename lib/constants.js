export const STATUSES = [
  { id: 'novo', label: 'Novo' },
  { id: 'contatado', label: 'Contatado' },
  { id: 'respondeu', label: 'Respondeu' },
  { id: 'negociando', label: 'Negociando' },
  { id: 'fechado', label: 'Fechado' },
  { id: 'perdido', label: 'Perdido' },
];

export const ORIGENS = [
  { id: 'busca_ativa', label: 'Busca ativa' },
  { id: 'ads', label: 'Ads' },
  { id: 'indicacao', label: 'Indicação' },
  { id: 'outro', label: 'Outro' },
];

export const PRIORIDADES = [
  { id: 'alta', label: 'Alta' },
  { id: 'media', label: 'Média' },
  { id: 'baixa', label: 'Baixa' },
];

export function labelFor(list, id) {
  const found = list.find((item) => item.id === id);
  return found ? found.label : id;
}
