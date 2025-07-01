// Quiz data and state management
const quizData = [
    {
        question: "Você analisa possíveis problemas financeiros devido a venda de produtos parcelados e pagamento de fornecedores a vista?",
        options: [
            {
                text: "Sim",
                observation: "",
                plan: ""
            },
            {
                text: "Não", 
                observation: "Você pode ter um problema de fluxo de caixa, isso acontece porque, mesmo seu faturamento seja maior que seus custos, sua receita acaba sendo menor devido ao parcelamento. Gerando taxas de antecipação ou dívidas com fornecedores.",
                plan: "Reveja seus métodos de pagamento e o pagamento de fornecedores."
            },
            {
                text: "Nunca pensei nisso",
                observation: "Você pode ter um problema de fluxo de caixa, isso acontece porque, mesmo seu faturamento seja maior que seus custos, sua receita acaba sendo menor devido ao parcelamento. Gerando taxas de antecipação ou dívidas com fornecedores.",
                plan: "Analise seus métodos de pagamento e o acerto com fornecedores."
            }
        ]
    },
    {
        question: "Há produtos parados há mais de 30 dias?",
        options: [
            {
                text: "Sim",
                observation: "Produtos parados indicam problema no giro de estoque e podem gerar prejuízos com vencimento, obsolescência ou capital imobilizado.",
                plan: "Levantar itens parados, classificar por valor, criar promoções, revisar política de compras."
            },
            {
                text: "Não",
                observation: "Estoque baixo pode significar que você está vendendo muito barato.",
                plan: "Analise o preço de mercado e sua margem de lucro para os produtos com maior giro e estoque baixo."
            },
            {
                text: "Não vendo produtos",
                observation: "",
                plan: ""
            }
        ]
    },
    {
        question: "Você simula cenários com base em histórico financeiro?",
        options: [
            {
                text: "Sim",
                observation: "Simular cenários ajuda na tomada de decisões estratégicas, mas é importante ter o olhar de fora da garrafa para analisar o rótulo.",
                plan: "Tenha um mentor ou conselheiro estratégico de confiança para te auxiliar nas decisões."
            },
            {
                text: "Não",
                observation: "Deixar de simular cenários compromete a capacidade de se planejar.",
                plan: "Organizar dados, simular 3 cenários, definir plano de contingência."
            }
        ]
    },
    {
        question: "Você sente que algumas coisas são feitas ou solicitadas várias vezes antes de serem entregues com qualidade?",
        options: [
            {
                text: "Sim",
                observation: "Sinal de retrabalho, gera desperdício. Precisa de padronização e capacitação.",
                plan: "Mapear processos, identificar gargalos, padronizar execuções, treinar equipe."
            },
            {
                text: "Não",
                observation: "Seus processos parecem estar bem definidos, mas avalie também se sua equipe não está ociosa.",
                plan: "Analisar os indicadores de desempenho de cada atividade dos colaboradores do time."
            }
        ]
    },
    {
        question: "Existe uma política ou rotina para realizar compras?",
        options: [
            {
                text: "Sim",
                observation: "",
                plan: ""
            },
            {
                text: "Não",
                observation: "A ausência de rotina nas compras pode gerar gastos descontrolados.",
                plan: "Revisar histórico, padronizar fluxos, formalizar política e treinar equipe."
            }
        ]
    },
    {
        question: "Como você define o desconto nas promoções?",
        options: [
            {
                text: "Copio promoções que meus concorrentes estão fazendo",
                observation: "Copiar concorrentes sem base nos próprios números pode comprometer a lucratividade.",
                plan: "Avaliar margem antes de aplicar promoções, criar calendário próprio, analisar resultados."
            },
            {
                text: "Pelo pedido de meus clientes",
                observation: "Ceder aos pedidos dos clientes sem análise pode comprometer a saúde financeira.",
                plan: "Definir regras claras para concessão de desconto e educar o cliente."
            },
            {
                text: "Estudando meus números do plano de contas",
                observation: "",
                plan: ""
            },
            {
                text: "Usando de base antigas promoções que já fiz",
                observation: "Repetir promoções pode ser útil, mas é preciso revisar se as condições ainda são válidas.",
                plan: "Atualizar cálculos, testar promoções e registrar resultados."
            }
        ]
    },
    {
        question: "Já mapeou quais produtos ou serviços têm margem negativa?",
        options: [
            {
                text: "Sim, faço todo semestre",
                observation: "",
                plan: ""
            },
            {
                text: "Já fiz uma vez",
                observation: "Crie uma rotina para revisar as margens de seus produtos e serviços.",
                plan: "Programar análise trimestral e ajustar tabela de preços."
            },
            {
                text: "Já me falaram para fazer mas nunca fiz",
                observation: "Você precisa analisar a margem de seus produtos e serviços com urgência.",
                plan: "Aprender a calcular margem negativa, priorizar produtos principais, revisar preços."
            },
            {
                text: "Não sei fazer",
                observation: "Sem o conhecimento e análise da margem negativa de seus produtos e serviços, você pode estar vendendo produtos com prejuízo sem perceber.",
                plan: "Aprender a calcular margem negativa, priorizar produtos principais, revisar preços."
            },
            {
                text: "O que é margem negativa?",
                observation: "Sem o conhecimento e análise da margem negativa de seus produtos e serviços, você pode estar vendendo produtos com prejuízo sem perceber.",
                plan: "Aprender a calcular margem negativa, priorizar produtos principais, revisar preços."
            }
        ]
    },
    {
        question: "Como você define seus preços?",
        options: [
            {
                text: "Com base nos concorrentes de mercado",
                observation: "Olhar o preço de mercado é importante, mas precificar só por isso pode prejudicar a rentabilidade.",
                plan: "Unir análise de mercado com cálculo de custo e margem."
            },
            {
                text: "Com o que eu acho que vale o produto",
                observation: "Precificar seus produtos e serviços pela sua percepção de valor é válida, mas não pode ser o único critério.",
                plan: "Estabelecer modelo de precificação baseado em custos e margem."
            },
            {
                text: "Com base nos custos básicos desse produto",
                observation: "Um bom ponto de partida, mas o ideal é incluir todos os custos e margem.",
                plan: "Incluir impostos, logística, margem e revisar periodicamente."
            },
            {
                text: "Com base no cálculo certo do CMV",
                observation: "",
                plan: ""
            }
        ]
    },
    {
        question: "Há fidelização com poucos fornecedores ou busca ativa por melhores?",
        options: [
            {
                text: "Apenas de alguns fornecedores",
                observation: "Faça um banco de fornecedores e revise regularmente seus fornecedores.",
                plan: "Avaliar desempenho e negociar com base em pesquisa de mercado."
            },
            {
                text: "Até tenho fidelização mas nunca mais fui atrás de ver se existem melhores oportunidades no mercado",
                observation: "Crie uma rotina de reavaliar regularmente seus fornecedores, o mercado muda e os preços também.",
                plan: "Fazer pesquisa a cada 6 meses e negociar melhores condições."
            },
            {
                text: "Faço uma busca ativa a cada 3 meses e tenho todos meus fornecedores fidelizados com contrato",
                observation: "",
                plan: ""
            },
            {
                text: "Sei que é importante mas nunca tive tempo de ir atrás",
                observation: "Você precisa reavaliar fornecedores, isso pode gerar economia e qualidade. A falta de tempo pode estar custando caro.",
                plan: "Delegar essa função e programar revisão semestral."
            },
            {
                text: "Nunca pensei nisso",
                observation: "Você precisa reavaliar fornecedores, isso pode gerar economia e qualidade.",
                plan: "Listar insumos principais, buscar cotações alternativas e avaliar impacto."
            }
        ]
    }
];

// Quiz state
let currentQuestion = 0;
let answers = [];
const totalQuestions = quizData.length;

// Local storage keys
const STORAGE_KEYS = {
    ANSWERS: 'quiz_answers',
    CURRENT_QUESTION: 'quiz_current_question',
    COMPLETED: 'quiz_completed'
};

// Initialize app based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initWelcomePage();
            break;
        case 'quiz':
            initQuizPage();
            break;
        case 'results':
            initResultsPage();
            break;
    }
});

// Get current page from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename.includes('quiz')) return 'quiz';
    if (filename.includes('results')) return 'results';
    return 'index';
}

// Welcome page functions
function initWelcomePage() {
    // Clear any existing quiz data
    clearQuizData();
    
    // Add animation to hero elements
    animateWelcomeElements();
}

function animateWelcomeElements() {
    const elements = document.querySelectorAll('.welcome-content > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function startQuiz() {
    window.location.href = 'quiz.html';
}

// Quiz page functions
function initQuizPage() {
    loadQuizState();
    displayCurrentQuestion();
    updateProgress();
}

function loadQuizState() {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    const savedQuestion = localStorage.getItem(STORAGE_KEYS.CURRENT_QUESTION);
    
    if (savedAnswers) {
        answers = JSON.parse(savedAnswers);
    }
    
    if (savedQuestion) {
        currentQuestion = parseInt(savedQuestion);
    }
}

function saveQuizState() {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    localStorage.setItem(STORAGE_KEYS.CURRENT_QUESTION, currentQuestion.toString());
}

function displayCurrentQuestion() {
    if (currentQuestion >= totalQuestions) {
        finishQuiz();
        return;
    }
    
    const questionData = quizData[currentQuestion];
    const questionTitle = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    
    // Update question title
    questionTitle.textContent = questionData.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option.text;
        optionBtn.setAttribute('data-index', index);
        
        // Check if this option was previously selected
        const savedAnswer = answers.find(a => a.questionIndex === currentQuestion);
        if (savedAnswer && savedAnswer.optionIndex === index) {
            optionBtn.classList.add('selected');
            enableNextButton();
        }
        
        optionBtn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionBtn);
    });
    
    // Update next button text
    const nextText = document.getElementById('next-text');
    if (currentQuestion === totalQuestions - 1) {
        nextText.textContent = 'Ver Resultados';
    } else {
        nextText.textContent = 'Próxima';
    }
}

function selectOption(optionIndex) {
    // Remove selection from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked option
    const selectedBtn = document.querySelector(`[data-index="${optionIndex}"]`);
    selectedBtn.classList.add('selected');
    
    // Save answer
    const questionData = quizData[currentQuestion];
    const selectedOption = questionData.options[optionIndex];
    
    const answer = {
        questionIndex: currentQuestion,
        question: questionData.question,
        optionIndex: optionIndex,
        answer: selectedOption.text,
        observation: selectedOption.observation,
        plan: selectedOption.plan
    };
    
    // Update or add answer
    const existingIndex = answers.findIndex(a => a.questionIndex === currentQuestion);
    if (existingIndex !== -1) {
        answers[existingIndex] = answer;
    } else {
        answers.push(answer);
    }
    
    // Save state and enable next button
    saveQuizState();
    enableNextButton();
}

function enableNextButton() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        saveQuizState();
        displayCurrentQuestion();
        updateProgress();
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        finishQuiz();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    const progressFill = document.getElementById('progress-fill');
    
    progressText.textContent = `Pergunta ${currentQuestion + 1} de ${totalQuestions}`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    progressFill.style.width = `${progress}%`;
}

function finishQuiz() {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, 'true');
    window.location.href = 'lead.html';
}

// Results page functions
function initResultsPage() {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    
    if (!savedAnswers) {
        // Redirect to quiz if no answers found
        window.location.href = 'index.html';
        return;
    }
    
    answers = JSON.parse(savedAnswers);
    displayResults();
}

function displayResults() {
    const observationsContainer = document.getElementById('observations-container');
    const plansContainer = document.getElementById('plans-container');
    
    // Get unique observations and plans
    const uniqueObservations = getUniqueItems('observation');
    const uniquePlans = getUniqueItems('plan');
    
    // Display observations
    if (uniqueObservations.length > 0) {
        observationsContainer.innerHTML = '';
        uniqueObservations.forEach((observation, index) => {
            const item = createResultItem(observation, index + 1, 'observation');
            observationsContainer.appendChild(item);
        });
    } else {
        observationsContainer.innerHTML = '<div class="empty-state">🎉 Parabéns! Não identificamos pontos críticos que precisem de atenção imediata.</div>';
    }
    
    // Display plans
    if (uniquePlans.length > 0) {
        plansContainer.innerHTML = '';
        uniquePlans.forEach((plan, index) => {
            const item = createResultItem(plan, index + 1, 'action');
            plansContainer.appendChild(item);
        });
    } else {
        plansContainer.innerHTML = '<div class="empty-state">✅ Sua gestão financeira parece estar bem estruturada!</div>';
    }
}

function getUniqueItems(type) {
    const items = [];
    
    answers.forEach(answer => {
        const value = answer[type];
        if (value && value.trim() !== '' && !items.includes(value)) {
            items.push(value);
        }
    });
    
    return items;
}

function createResultItem(text, number, type) {
    const item = document.createElement('div');
    item.className = `result-item ${type}`;
    
    const numberEl = document.createElement('div');
    numberEl.className = 'item-number';
    numberEl.textContent = number;
    
    const textEl = document.createElement('div');
    textEl.className = 'item-text';
    textEl.textContent = text;
    
    item.appendChild(numberEl);
    item.appendChild(textEl);
    
    return item;
}

// Universal functions
function restartQuiz() {
    clearQuizData();
    window.location.href = 'index.html';
}

function clearQuizData() {
    localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_QUESTION);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED);
    currentQuestion = 0;
    answers = [];
}

function contactExpert() {
    // Replace with your contact method (WhatsApp, email, etc.)
    const message = encodeURIComponent('Olá! Acabei de fazer o diagnóstico financeiro e gostaria de falar com um especialista sobre os resultados.');
    const whatsappNumber = '5511999999999'; // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

function downloadResults() {
    // Create a formatted text version of the results
    let resultsText = 'DIAGNÓSTICO FINANCEIRO - RESULTADOS\n\n';
    
    // Add observations
    const uniqueObservations = getUniqueItems('observation');
    if (uniqueObservations.length > 0) {
        resultsText += 'PONTOS DE ATENÇÃO:\n';
        uniqueObservations.forEach((obs, index) => {
            resultsText += `${index + 1}. ${obs}\n\n`;
        });
    }
    
    // Add plans
    const uniquePlans = getUniqueItems('plan');
    if (uniquePlans.length > 0) {
        resultsText += 'PLANOS DE AÇÃO:\n';
        uniquePlans.forEach((plan, index) => {
            resultsText += `${index + 1}. ${plan}\n\n`;
        });
    }
    
    // Create and download file
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnostico-financeiro-resultados.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Quiz error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Analytics tracking (replace with your analytics code)
function trackEvent(eventName, eventData = {}) {
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    const page = getCurrentPage();
    trackEvent('page_view', { page: page });
    
    // Track quiz completion
    if (page === 'results') {
        trackEvent('quiz_completed');
    }
});
