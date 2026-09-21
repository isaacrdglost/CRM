# Pipeline de leads

CRM simples em Next.js pra acompanhar a prospecção ativa: kanban por status, filtro por nicho, origem e prioridade, card com etiquetas e observações.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Como funciona a persistência

Não tem banco de dados. Os leads ficam salvos no `localStorage` do navegador, ou seja, é por dispositivo/navegador, não sincroniza sozinho entre celular e computador.

Por isso tem os botões **Exportar** e **Importar** no topo: exporta tudo em um `.json` que você pode guardar e importar de novo em outro navegador, ou como backup.

Se algum dia você quiser que os dados fiquem num lugar só, acessível de qualquer aparelho, o próximo passo seria trocar o `lib/storage.js` por um banco de verdade (Vercel Postgres, Supabase, etc). A estrutura já foi pensada pra isso: só as funções `loadLeads` e `saveLeads` precisariam mudar, o resto do app não sabe de onde os dados vêm.

## Estrutura

```
app/
  layout.js       fontes e wrapper
  page.js         estado principal, filtros, integra tudo
  globals.css     tokens de estilo
components/
  KanbanBoard.js  colunas e drag and drop
  LeadCard.js     card individual
  LeadModal.js    criar/editar/excluir lead
  FilterBar.js    busca e filtros
  PriorityDot.js  indicador de prioridade
lib/
  constants.js    status, origens, prioridades (edite aqui pra mudar as colunas)
  seedData.js     carga inicial de leads (só usada na primeira vez)
  storage.js      leitura/escrita no localStorage
```

## Editando as colunas do kanban ou as origens

Tudo isso está centralizado em `lib/constants.js`. Pra adicionar uma nova origem (por exemplo "Ads" já está lá, mas se quiser separar por rede: "Ads Instagram", "Ads Google"), edite o array `ORIGENS`. O mesmo vale pra `STATUSES` (colunas do kanban) e `PRIORIDADES`.

## Deploy no Vercel

1. Suba essa pasta num repositório novo no GitHub.
2. No Vercel, "Add New Project", selecione o repositório.
3. Framework preset já vem detectado como Next.js, não precisa mudar nada.
4. Deploy.

Como os dados vivem no navegador de quem acessa, se você for a única pessoa usando, tudo funciona liso. Se outra pessoa abrir o link, ela vai ver o board vazio (com a carga inicial de exemplo) e não os seus leads, porque são bases separadas por navegador.
