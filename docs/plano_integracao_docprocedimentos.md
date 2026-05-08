# Plano de integração do conteúdo de documentação nas seções do site

## 1) Diagnóstico inicial

- Não foi localizado o diretório `/docprocedimentos` no repositório nem no caminho absoluto do container.
- Como base para o plano, foram considerados os módulos já existentes no site e as fontes de conteúdo em `data/*.ts`.
- Quando o diretório de documentação oficial estiver disponível, o mesmo roteiro abaixo pode ser aplicado para ingestão e publicação.

## 2) Mapa de seções do site e destino do conteúdo

### 2.1 Macrofluxos (`/macrofluxos`)
**Objetivo do conteúdo:** explicar etapas de ponta a ponta por processo.

**Fonte alvo sugerida:** documentos de fluxo, BPMN, POPs por área.

**Como inserir:**
1. Criar uma planilha-mestre com colunas: `id`, `area`, `titulo`, `descricao`, `nos[]`, `caminhos[]`, `responsavel`, `documentos[]`.
2. Converter cada macrofluxo para o formato usado em `data/macrofluxos.ts`.
3. Revisar textos de nós de decisão para linguagem objetiva e critérios auditáveis.
4. Validar visualmente as conexões na página de detalhe (`/macrofluxos/[id]`).

### 2.2 Procedimentos (`/workflows`)
**Objetivo do conteúdo:** transformar a documentação em execução operacional (instâncias de processo).

**Fonte alvo sugerida:** roteiros operacionais, SLAs, regras de tramitação.

**Como inserir:**
1. Definir catálogo de tipos de procedimento e prazos padrão por tipo.
2. Atualizar os mocks em `data/workflows.ts` com campos coerentes de prazo, etapas e responsáveis.
3. Incluir checklist mínimo por etapa (vínculo com módulo de checklists).
4. Validar indicadores do painel: em tramitação, aguardando ação, atrasados e concluídos.

### 2.3 Manuais e Checklists (`/manuais`)
**Objetivo do conteúdo:** disponibilizar documentação formal em formato navegável.

**Fonte alvo sugerida:** manuais normativos, instruções de trabalho, listas de conferência.

**Como inserir:**
1. Estruturar cada documento em `metadados + seções + blocos`.
2. Publicar no formato de `data/manuais.ts` (com `area`, `versao`, `paginas`, `secoes`).
3. Extrair itens verificáveis para `data/checklists.ts` marcando obrigatoriedade.
4. Mapear cada checklist para etapa/tipo de procedimento.

### 2.4 Cadernos Orientativos (`/cadernos`)
**Objetivo do conteúdo:** consolidar boas práticas e aprendizado institucional.

**Fonte alvo sugerida:** estudos de caso, notas técnicas, jurisprudência e lições aprendidas.

**Como inserir:**
1. Organizar capítulos por tema e maturidade do usuário (básico/intermediário/avançado).
2. Padronizar blocos especiais (`caso_pratico`, `erro_comum`, `referencia_legal`, `glossario`).
3. Publicar no formato de `data/cadernos.ts`.
4. Revisar legibilidade e evitar duplicidade com manuais.

### 2.5 Convênios (`/convenios`)
**Objetivo do conteúdo:** refletir regras de gestão documental e financeira de convênios.

**Fonte alvo sugerida:** normativos de convênio, fases, exigências de prestação de contas.

**Como inserir:**
1. Definir taxonomia de status com regras de transição.
2. Completar campos de vigência, vencimento e responsável no dataset `data/convenios.ts`.
3. Relacionar documentação obrigatória por status (link para manual/checklist aplicável).
4. Validar alertas de vencimento e inadimplência no painel.

### 2.6 Obras (`/obras`)
**Objetivo do conteúdo:** acompanhar execução física/financeira e fiscalização.

**Fonte alvo sugerida:** cadernos de obra, relatórios de vistoria, medições.

**Como inserir:**
1. Definir padrão mínimo de registro por obra: tipo, valor, execução, vencimento, fiscal.
2. Atualizar `data/obras.ts` com dados consistentes de status e prazos.
3. Associar evento de vistoria a um procedimento no módulo `/workflows`.
4. Validar indicadores de execução e atrasos.

## 3) Pipeline de ingestão recomendado

1. **Inventário documental**: catalogar todos os arquivos por tema, versão, data e órgão emissor.
2. **Normalização**: converter para um modelo intermediário (JSON/planilha) antes de entrar no código.
3. **Curadoria técnica**: revisão por área (Engenharia, Convênios, Urbanismo, Habitação, Sistemas).
4. **Publicação controlada**: subir conteúdo por módulo em lotes pequenos.
5. **QA funcional**: revisar filtros, navegação, modal, acessibilidade e consistência entre telas.
6. **Governança contínua**: rotina mensal de atualização de versão e data de revisão dos documentos.

## 4) Sequência sugerida de implementação (sprints)

### Sprint 1 — Base documental
- Inventário do `/docprocedimentos` (quando disponível).
- Definição do modelo intermediário.
- Publicação piloto em **Manuais + Checklists**.

### Sprint 2 — Operacionalização
- Publicação em **Macrofluxos**.
- Ajuste em **Workflows** para refletir etapas reais e SLAs.
- Amarração checklist ↔ etapa.

### Sprint 3 — Domínios finalísticos
- Publicação em **Convênios** e **Obras**.
- Vínculo com cadernos e referências normativas.
- Revisão de indicadores e alertas.

### Sprint 4 — Qualidade e governança
- Auditoria de consistência textual e normativa.
- Ajustes de UX para leitura de conteúdo extenso.
- Definição de processo de manutenção contínua.

## 5) Critérios de pronto por seção

- Conteúdo da seção mapeado para fonte documental versionada.
- Links/relacionamentos entre módulos funcionando.
- Itens obrigatórios dos checklists identificados.
- Revisão técnica aprovada pelo responsável da área.
- Página validada com teste manual de navegação e filtros.

## 6) Riscos e mitigação

- **Risco:** documentos sem padronização.  
  **Mitigação:** modelo intermediário + validação obrigatória antes de publicação.

- **Risco:** conteúdo duplicado entre manuais e cadernos.  
  **Mitigação:** regra editorial clara (norma x orientação prática).

- **Risco:** divergência entre status de dados e regra de negócio.  
  **Mitigação:** matriz de transição de status aprovada pelo negócio.

## 7) Próximo passo objetivo

Assim que você disponibilizar o diretório correto (ex.: `./docprocedimentos`), eu consigo executar a fase de inventário automaticamente e te devolver:
1. matriz documento → seção;
2. lacunas por módulo;
3. proposta de importação já no formato dos arquivos `data/*.ts`.
