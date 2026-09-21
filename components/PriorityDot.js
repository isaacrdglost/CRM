export default function PriorityDot({ priority }) {
  const styles = {
    alta: 'bg-accent',
    media: 'bg-faint',
    baixa: 'bg-line',
  };

  const labels = {
    alta: 'Prioridade alta',
    media: 'Prioridade média',
    baixa: 'Prioridade baixa',
  };

  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${styles[priority] || 'bg-line'}`}
      title={labels[priority] || 'Prioridade'}
    />
  );
}
