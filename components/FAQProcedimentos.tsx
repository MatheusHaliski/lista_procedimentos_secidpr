'use client';

import { useMemo, useState } from 'react';

type FAQItem = {
  id: number;
  categoria: string;
  pergunta: string;
  resposta: string;
  dica: string;
  tags: string[];
};

// Base de dados completa das perguntas frequentes por categoria
const FAQ_DATA: FAQItem[] = [
  { id: 1, categoria: 'Estrutura Institucional', pergunta: 'O que é a SEIA e qual é a sua missão no governo do Paraná?', resposta: 'A SEIA é a Secretaria da Inovação e Inteligência Artificial do Paraná, criada oficialmente em abril de 2025 pela Lei 22.324. É a evolução da antiga Secretaria da Inovação, Modernização e Transformação Digital. Sua missão central é coordenar as políticas públicas de IA e inovação no Estado, estabelecer diretrizes para o uso de tecnologias emergentes no setor público e fomentar parcerias com universidades, startups e o setor privado.', dica: '“Na prática, somos o motor da transformação digital do governo. O nome mudou, mas o desafio continua o mesmo: fazer o Estado funcionar melhor usando tecnologia. A diferença agora é que IA saiu do discurso e virou diretriz oficial.”', tags: ['Lei 22.324/2025', 'hub de inovação'] },
  { id: 2, categoria: 'Estrutura Institucional', pergunta: 'Qual é a relação entre SEIA, CELEPAR e Fundação Araucária?', resposta: 'São três pilares complementares. A SEIA define as políticas e diretrizes de inovação e IA. A CELEPAR é o braço técnico executor — hospeda sistemas, desenvolve soluções e mantém a infraestrutura de TI do Estado. A Fundação Araucária administra o Fundo Paraná e financia pesquisa científica e projetos de inovação nas universidades. Para projetos de TI, a SEIA define a estratégia, a CELEPAR hospeda e opera, e a Fundação Araucária pode ser parceira de financiamento.', dica: '“Quem não entende essa tríade perde tempo mandando projeto para o lugar errado. Proposta técnica vai para a CELEPAR. Proposta de pesquisa vai para a Araucária. Proposta de política pública vai para a SEIA.”', tags: ['governança', 'infraestrutura'] },
  { id: 3, categoria: 'Estrutura Institucional', pergunta: 'O que é o Programa Conecta IA e por que ele é relevante?', resposta: 'É o programa oficial da SEIA para mapear gargalos operacionais internos e desenvolver soluções de IA. Lançado em março de 2026, já identificou oportunidades nas equipes e iniciou o desenvolvimento de 11 soluções tecnológicas. É a iniciativa operacional que executa o Plano de Diretrizes de IA do Paraná.', dica: '“Isso é uma janela de oportunidade rara. Quando a direção está ativamente buscando soluções de IA e alguém da equipe técnica já tem uma pronta, o timing é perfeito para apresentar. Não espere ser chamado.”', tags: ['oportunidade estratégica', 'Conecta IA'] },
  { id: 4, categoria: 'Processos Internos de TI', pergunta: 'Como funciona o fluxo de abertura e tramitação de processos no SEI?', resposta: 'O SEI é o sistema oficial de gestão documental do governo do Paraná. Todo processo administrativo precisa ser aberto com tipo correto, unidade responsável e documento inicial. A tramitação acontece digitalmente entre unidades. Quem não domina a classificação correta dos tipos de processo perde horas reabrindo ou corrigindo.', dica: '“O SEI resolveu o papel, mas criou um novo problema: cada unidade usa tipos de processo diferentes para a mesma coisa. A primeira coisa que aprendi foi decorar os tipos que uso todo dia e nunca improvisar — processo com tipo errado volta na sua mesa três vezes.”', tags: ['processo crítico', 'candidato à automação'] },
  { id: 5, categoria: 'Processos Internos de TI', pergunta: 'Qual é o processo para contratar um serviço ou fornecedor de TI no governo?', resposta: 'Depende do valor. Abaixo de R$ 57.900 pode usar dispensa de licitação. Acima disso, precisa de processo licitatório formal — pregão eletrônico para serviços comuns de TI. O fluxo envolve: Termo de Referência → aprovação jurídica → publicação → sessão de pregão → contrato → ordem de serviço. O TR é o documento mais crítico e mais subestimado.', dica: '“Já vi projeto de inovação morrer no TR. Você tem a ideia, tem o recurso, mas o Termo de Referência fica na fila do jurídico por não estar no formato certo. Aprenda a escrever TR antes de propor qualquer projeto.”', tags: ['gargalo clássico', 'licitação'] },
  { id: 6, categoria: 'Processos Internos de TI', pergunta: 'Como funciona o processo de homologação de sistemas na CELEPAR?', resposta: 'Todo sistema que roda na infraestrutura do Estado precisa passar pela homologação da CELEPAR — verificação de segurança, conformidade com LGPD, análise de dependências e aprovação da arquitetura. O processo pode levar de 30 a 90 dias.', dica: '“Entre na CELEPAR com a documentação completa desde o primeiro dia. Cada ida e volta na fila de homologação custa em média duas semanas. Arquitetura, fluxo de dados, mapeamento de APIs — tudo documentado antes de submeter.”', tags: ['homologação', 'LGPD', '30–90 dias'] },
  { id: 7, categoria: 'Processos Internos de TI', pergunta: 'O que é o Inova Hub e como um projeto pode participar?', resposta: 'O Inova Hub conecta problemas reais do governo com soluções de startups e equipes internas. Funciona por ciclos com editais. O Hub GovTech Paraná é a vertente focada em GovTechs. Para participar, submeta o problema — não a solução — ao edital.', dica: '“O erro de quem quer entrar no Inova Hub é chegar com a solução pronta. O programa quer o problema. Apresente a dor, não o remédio — isso aumenta muito a chance de aprovação.”', tags: ['Inova Hub', 'GovTech', 'edital'] },
  { id: 8, categoria: 'IA, Automação e Tendências', pergunta: 'Quais são os limites legais do uso de IA para tomar decisões no setor público?', resposta: 'A LGPD, a Lei 14.129/2021 e as diretrizes da SEIA são claras: decisões que afetam direitos de cidadãos ou servidores precisam de validação humana. IA pode sugerir, classificar e recomendar, mas não pode decidir de forma autônoma em contextos de interesse público.', dica: '“Quando apresentar qualquer projeto de IA para gestores, deixe isso explícito logo de início: a IA sugere, o servidor decide. Isso elimina 80% da resistência. O medo não é da tecnologia — é da responsabilização.”', tags: ['responsabilidade do servidor', 'LGPD', 'Lei 14.129/2021'] },
  { id: 9, categoria: 'IA, Automação e Tendências', pergunta: 'Como a LGPD afeta projetos de IA que processam dados de servidores?', resposta: 'A LGPD exige que todo dado pessoal processado tenha base legal, finalidade definida e registro de operação. Para projetos internos de IA, os cuidados principais são: não enviar dados pessoais identificáveis para APIs externas sem DPA, manter logs de processamento e garantir que o titular possa exercer seus direitos.', dica: '“LGPD não é obstáculo — é checklist. Resolva antes de apresentar o projeto, não depois. Chegar com o DPA assinado mostra maturidade e derruba a principal objeção do jurídico.”', tags: ['risco jurídico', 'DPA', 'dados pessoais'] },
  { id: 10, categoria: 'IA, Automação e Tendências', pergunta: 'O que é o Plano de Diretrizes de IA da SEIA?', resposta: 'É o documento estratégico que define como o governo do Paraná deve adotar, governar e escalar o uso de IA na administração pública. Estabelece princípios como transparência, explicabilidade e supervisão humana. Projetos que seguem essas diretrizes têm mais facilidade de aprovação.', dica: '“Leia o Plano de Diretrizes antes de apresentar qualquer projeto de IA. Use os mesmos termos que ele usa. Quando seu projeto fala a língua da direção, ele avança. Quando fala técnico demais, fica na gaveta.”', tags: ['alinhamento estratégico', 'aprovação'] },
  { id: 11, categoria: 'IA, Automação e Tendências', pergunta: 'Qual a diferença prática entre RPA e IA generativa para automação?', resposta: 'RPA automatiza tarefas com regras fixas — clicar em botões, copiar dados, preencher formulários. É determinístico e auditável. IA generativa entende linguagem natural, raciocina sobre contexto ambíguo e produz conteúdo novo. RPA é ideal para processos 100% estruturados; IA generativa é ideal para processos que envolvem interpretação, redação ou decisão com múltiplas variáveis.', dica: '“Não tente usar IA generativa para fazer o que RPA faz melhor e mais barato. E não tente usar RPA para o que só IA consegue resolver. A confusão entre os dois atrasa projetos e queima orçamento.”', tags: ['RPA', 'IA generativa', 'automação'] },
  { id: 12, categoria: 'Dificuldades Clássicas', pergunta: 'Por que projetos de inovação no governo morrem antes de chegar à produção?', resposta: 'As causas mais comuns são: mudança de gestão, falta de dono técnico após remanejamento, documentação insuficiente, dependência de fornecedor sem suporte contratual e falta de métrica de sucesso definida. O projeto morre não por falha técnica, mas por falta de institucionalização.', dica: '“Já vi cinco projetos excelentes morrerem quando o servidor que os criou foi transferido. Documente tudo. Faça o projeto sobreviver sem você. Se só você sabe como funciona, ele não é institucional — é um hobby.”', tags: ['risco crítico', 'documentação', 'institucionalização'] },
  { id: 13, categoria: 'Dificuldades Clássicas', pergunta: 'Como lidar com resistência cultural a novas tecnologias?', resposta: 'A resistência raramente é à tecnologia — é ao esforço de aprender e ao medo de errar. A estratégia mais eficaz é começar com quem já quer, mostrar resultado concreto e deixar a pressão de pares fazer o trabalho. Uma demonstração de 10 minutos que economiza 2 horas convence mais do que qualquer apresentação.', dica: '“Inovação no serviço público é opt-in. Você não convence pela lógica, convence pelo exemplo. Quando a pessoa ao lado economiza duas horas, o cérebro do resistente faz o cálculo sozinho.”', tags: ['mudança cultural', 'piloto voluntário'] },
  { id: 14, categoria: 'Dificuldades Clássicas', pergunta: 'Como o proxy corporativo impacta projetos de IA na SEIA?', resposta: 'O proxy da rede estadual (proxy01.pred.parana:8080) bloqueia APIs externas por padrão. A solução estrutural é solicitar à CELEPAR a liberação das URLs específicas via chamado formal com justificativa técnica. Para projetos internos, a alternativa mais robusta é hospedar o servidor dentro da rede da CELEPAR.', dica: '“O proxy não é burocracia à toa — é segurança. Mas tem uma porta de entrada: você formaliza um chamado na CELEPAR com a URL, a finalidade e a justificativa técnica. Demora uns 5 dias úteis, mas resolve definitivamente.”', tags: ['proxy corporativo', 'CELEPAR', 'segurança de rede'] },
  { id: 15, categoria: 'Dificuldades Clássicas', pergunta: 'Como priorizar qual problema resolver primeiro?', resposta: 'Use dois critérios cruzados: impacto (quantas pessoas afeta e com que frequência) e esforço de implementação. O quadrante de maior impacto com menor esforço é sempre o ponto de entrada correto. Evite começar pelos processos mais complexos para impressionar — eles atrasam e queimam credibilidade.', dica: '“Entrega pequena e rápida vale mais do que projeto grande que nunca sai. Um script que economiza 30 minutos por dia para 10 pessoas é mais valioso para a sua carreira do que um sistema que demora 6 meses para ficar pronto.”', tags: ['priorização', 'impacto × esforço'] },
  { id: 16, categoria: 'Carreira e Estratégia', pergunta: 'Como apresentar um projeto de inovação para a gestão sem ser ignorado?', resposta: 'Gestores públicos respondem a três coisas: economia de recursos, redução de risco e cumprimento de metas do Plano de Governo. Apresente o projeto nessa linguagem. Nunca comece pela tecnologia — comece pelo problema que o gestor já sabe que existe. Depois mostre piloto, métrica, custo baixo e alinhamento com o Conecta IA.', dica: '“Nunca entre na sala do secretário falando de API, token ou bot. Entre falando de redução de X horas por semana e alinhamento com o Conecta IA. A tecnologia é o como — o gestor quer saber o quê e o quanto.”', tags: ['linguagem do gestor', 'piloto + métrica'] },
  { id: 17, categoria: 'Carreira e Estratégia', pergunta: 'O que é o Fundo Paraná e como ele pode financiar projetos de tecnologia?', resposta: 'É a dotação constitucional administrada pela Seti para financiar ciência, tecnologia e inovação. Em 2025 foram aplicados R$ 609,7 milhões. Projetos de TI com base científica ou em parceria com universidades podem ser financiados via editais da Fundação Araucária.', dica: '“O Fundo Paraná passou de R$ 80 milhões em 2019 para R$ 609 milhões em 2025. Mas tem prazo e edital. Quem não acompanha os editais perde o ciclo e espera mais um ano.”', tags: ['financiamento', 'R$ 609 mi', 'editais'] },
  { id: 18, categoria: 'Carreira e Estratégia', pergunta: 'Como o Paraná se posiciona em inovação e IA frente a outros estados?', resposta: 'O Paraná está entre os estados mais avançados do Brasil, ao lado de Minas Gerais e São Paulo. Diferenciais: primeiro Hub GovTech estadual do país, Paraná Anjo Inovador (maior programa público de incentivo a startups do país), Carreta da Inovação (60 mil pessoas em 70 municípios) e SEIA com foco explícito em IA.', dica: '“O Paraná não está apenas falando de inovação — está executando. Isso é raro no setor público brasileiro. Aproveite enquanto o vento está favorável. Janelas como essa fecham quando muda o governo.”', tags: ['referência nacional', 'hub de inovação'] },
  { id: 19, categoria: 'Carreira e Estratégia', pergunta: 'Quais habilidades um analista de TI da SEIA precisará ter em 2026–2028?', resposta: 'Engenharia de prompt, integração de APIs, LGPD aplicada a IA, documentação de processos e comunicação com não-técnicos. Python e SQL continuam essenciais. O diferencial será combinar habilidade técnica com visão de processo público.', dica: '“O servidor de TI que só sabe programar vai perder espaço para o que sabe programar E explicar o que fez E documentar E convencer a gestão. A IA já faz bastante do código. O que ela não faz é a articulação institucional.”', tags: ['engenharia de prompt', 'APIs', 'carreira'] },
  { id: 20, categoria: 'Carreira e Estratégia', pergunta: 'Como formalizar um projeto de IA desenvolvido internamente na SEIA?', resposta: 'O caminho mais estratégico é: 1) resolver infraestrutura (proxy/CELEPAR), 2) rodar piloto de 30 dias com a equipe, 3) documentar métricas, 4) submeter ao Conecta IA como solução interna, 5) apresentar ao Inova Hub para escalar para outras secretarias.', dica: '“Você não está inventando a roda — está construindo a roda que a própria secretaria disse que precisa. Com dados de piloto e alinhamento ao Conecta IA, qualquer projeto tem tudo para virar oficial. Mas precisa sair do chat e entrar no SEI.”', tags: ['Conecta IA', 'Inova Hub', 'formalização'] },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Estrutura Institucional': 'bg-blue-100 text-blue-800 border-blue-200',
  'Processos Internos de TI': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'IA, Automação e Tendências': 'bg-violet-100 text-violet-800 border-violet-200',
  'Dificuldades Clássicas': 'bg-amber-100 text-amber-800 border-amber-200',
  'Carreira e Estratégia': 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function FAQProcedimentos() {
  // Estados principais: categoria, busca, item aberto e itens já abertos (progresso)
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');
  const [busca, setBusca] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());
  const [expandedAll, setExpandedAll] = useState(false);

  const categorias = useMemo(() => ['Todas', ...new Set(FAQ_DATA.map((item) => item.categoria))], []);

  // Filtragem combinada por categoria + busca textual (pergunta, resposta, dica e tags)
  const filteredFaqs = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const categoriaOk = categoriaAtiva === 'Todas' || item.categoria === categoriaAtiva;
      const textoOk =
        !termo ||
        item.pergunta.toLowerCase().includes(termo) ||
        item.resposta.toLowerCase().includes(termo) ||
        item.dica.toLowerCase().includes(termo) ||
        item.tags.join(' ').toLowerCase().includes(termo);
      return categoriaOk && textoOk;
    });
  }, [busca, categoriaAtiva]);

  const toggleItem = (id: number) => {
    if (expandedAll) {
      setExpandedAll(false);
    }

    setOpenId((prev) => (prev === id ? null : id));
    setOpenedSet((prev) => new Set(prev).add(id));
  };

  const handleExpandAll = () => {
    setExpandedAll(true);
    setOpenId(null);
    setOpenedSet((prev) => {
      const next = new Set(prev);
      filteredFaqs.forEach((item) => next.add(item.id));
      return next;
    });
  };

  const handleCollapseAll = () => {
    setExpandedAll(false);
    setOpenId(null);
  };

  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-sm md:p-6">
      <header className="mb-4 flex flex-col gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1B4F8E] md:text-2xl">Perguntas Frequentes</h2>
          <p className="text-sm text-gray-500">{openedSet.size} de 20 perguntas abertas</p>
        </div>

        <div className="relative w-full md:w-80">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por termo, tag ou categoria..."
            className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-[#1B4F8E] focus:bg-white"
          />
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {categorias.map((categoria) => {
          const isActive = categoria === categoriaAtiva;
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaAtiva(categoria)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition md:text-sm ${
                isActive
                  ? 'border-[#1B4F8E] bg-[#1B4F8E] text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#1B4F8E]/50'
              }`}
            >
              {categoria}
            </button>
          );
        })}

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            className="rounded-lg bg-[#1B4F8E] px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110 md:text-sm"
          >
            Expandir todas
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 md:text-sm"
          >
            Recolher todas
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((item) => {
          const isOpen = expandedAll || openId === item.id;
          return (
            <article key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/60">
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleItem(item.id)}
                className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3"
              >
                <div className="space-y-2">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${CATEGORY_COLORS[item.categoria]}`}>
                    {item.categoria}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 md:text-base">{item.pergunta}</h3>
                </div>
                <span className="text-lg text-[#1B4F8E]">{isOpen ? '−' : '+'}</span>
              </div>

              <div
                id={`faq-content-${item.id}`}
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 border-t border-gray-200 bg-white px-4 py-4 text-sm text-gray-700">
                    <p>{item.resposta}</p>
                    <blockquote className="rounded-lg border-l-4 border-[#1B4F8E] bg-blue-50 px-3 py-2 italic text-gray-700">
                      <span className="mr-1 text-[#1B4F8E]">❝</span>
                      {item.dica}
                    </blockquote>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={`${item.id}-${tag}`} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
            Nenhuma pergunta encontrada com os filtros atuais.
          </div>
        )}
      </div>
    </section>
  );
}
