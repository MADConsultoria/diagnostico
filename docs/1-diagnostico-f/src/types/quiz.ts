
export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface Diagnosis {
  range: [number, number];
  title: string;
  observation: string;
  actionPlan: string[];
  profitImpact: string;
}

export const QuizData = {
  questions: [
    {
      question: "Você sabia que gera problemas financeiros com a venda de produtos parcelados e pagamento de fornecedores à vista?",
      options: [
        { text: "Sim", score: 1 },
        { text: "Não", score: 1 }
      ]
    },
    {
      question: "Há produtos parados há mais de 30 dias?",
      options: [
        { text: "Sim", score: 0 },
        { text: "Não", score: 2 }
      ]
    },
    {
      question: "Você simula cenários com base em histórico financeiro?",
      options: [
        { text: "Sim", score: 2 },
        { text: "Não", score: 0 }
      ]
    },
    {
      question: "Você sente que algumas tarefas são refeitas antes de serem entregues com qualidade?",
      options: [
        { text: "Sim", score: 0 },
        { text: "Não", score: 2 }
      ]
    },
    {
      question: "Existe uma política ou rotina para realizar compras?",
      options: [
        { text: "Sim", score: 2 },
        { text: "Não", score: 0 }
      ]
    },
    {
      question: "Como você define o desconto nas promoções?",
      options: [
        { text: "Copio concorrentes", score: 0 },
        { text: "Pelo pedido de clientes", score: 0 },
        { text: "Uso promoções antigas", score: 1 },
        { text: "Estudo meus números do plano de contas", score: 2 }
      ]
    },
    {
      question: "Já mapeou quais produtos ou serviços têm margem negativa?",
      options: [
        { text: "O que é isso? / Nunca fiz", score: 0 },
        { text: "Já fiz uma vez", score: 1 },
        { text: "Faço todo semestre", score: 2 }
      ]
    },
    {
      question: "Como você define seus preços?",
      options: [
        { text: "Com base nos concorrentes", score: 0 },
        { text: "No que acho que vale", score: 0 },
        { text: "Com base nos custos básicos", score: 1 },
        { text: "Com base no cálculo correto do CMV", score: 2 }
      ]
    },
    {
      question: "Há fidelização com fornecedores ou busca ativa por melhores?",
      options: [
        { text: "Nunca pensei nisso / nunca busquei", score: 0 },
        { text: "Apenas alguns fornecedores", score: 1 },
        { text: "Faço busca ativa a cada 3 meses com contratos", score: 2 }
      ]
    }
  ] as QuizQuestion[],

  diagnoses: [
    {
      range: [0, 6] as [number, number],
      title: "Gestão no Automático",
      observation: "Falta previsibilidade, decisões são tomadas no instinto ou copiando concorrentes. Há ausência de controle e risco elevado.",
      actionPlan: [
        "Criar rotina básica de controle financeiro",
        "Aprender a calcular margem de lucro",
        "Evitar promoções e preços sem base real",
        "Buscar novos fornecedores e estruturar o processo de compras"
      ],
      profitImpact: "Evita perdas ocultas, reduz desperdícios e pode aumentar a rentabilidade em até 20%."
    },
    {
      range: [7, 13] as [number, number],
      title: "Organização Parcial",
      observation: "Existem boas práticas pontuais, mas falta consistência e continuidade. O controle financeiro e de processos ainda é instável.",
      actionPlan: [
        "Formalizar rotinas de compras, precificação e estoque",
        "Estabelecer calendário de análises financeiras",
        "Revisar preços com base na margem real",
        "Criar promoções estratégicas baseadas em dados"
      ],
      profitImpact: "Ganho de controle, previsibilidade e redução de perdas sazonais. Prepara a empresa para crescer com segurança."
    },
    {
      range: [14, 18] as [number, number],
      title: "Gestão Estratégica",
      observation: "Gestão madura, decisões orientadas por dados e processos bem definidos. A empresa está pronta para escalar com segurança.",
      actionPlan: [
        "Refinar projeções financeiras de longo prazo",
        "Integrar mais indicadores estratégicos",
        "Explorar novos canais de crescimento com menos risco",
        "Consolidar-se como referência de boa gestão no setor"
      ],
      profitImpact: "Crescimento sustentável, controle da margem e maior lucratividade com segurança."
    }
  ] as Diagnosis[]
};
