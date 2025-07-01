// Sistema de pontuação do quiz
let currentScore = 0;
let selectedOptionIndex = null;

// Atualizar pontuação na tela
function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = currentScore;
    }
}

// Selecionar opção
function selectOption(optionIndex) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelectorAll('.option')[optionIndex].classList.add('selected');
    selectedOptionIndex = optionIndex;
    document.getElementById('nextBtn').disabled = false;
}

// Próxima pergunta
function nextQuestion() {
    if (selectedOptionIndex === null) return;
    const pointsArray = [2, 1, 0, -1];
    const points = pointsArray[selectedOptionIndex];
    currentScore = parseInt(localStorage.getItem('quizScore')) || 0;
    currentScore += points;
    localStorage.setItem('quizScore', currentScore);

    // Salvar resposta
    const currentPage = window.location.pathname.split('/').pop();
    const questionNumber = currentPage.replace('pergunta', '').replace('.html', '');
    localStorage.setItem(`question${questionNumber}Answer`, selectedOptionIndex);

    // Ir para próxima pergunta
    if (currentPage === 'pergunta9.html') {
        window.location.href = 'dados.html';
    } else {
        const currentNumber = parseInt(currentPage.replace('pergunta', '').replace('.html', ''));
        const nextNumber = currentNumber + 1;
        window.location.href = `pergunta${nextNumber}.html`;
    }
}

// Voltar pergunta anterior
function goBack() {
    const currentPage = window.location.pathname.split('/').pop();
    const currentNumber = parseInt(currentPage.replace('pergunta', '').replace('.html', ''));
    
    if (currentNumber > 1) {
        const prevNumber = currentNumber - 1;
        window.location.href = `pergunta${prevNumber}.html`;
    } else {
        window.location.href = 'index.html';
    }
}

// Restaurar seleção ao carregar página
function restoreSelection() {
    const currentPage = window.location.pathname.split('/').pop();
    const questionNumber = currentPage.replace('pergunta', '').replace('.html', '');
    const savedAnswer = localStorage.getItem(`question${questionNumber}Answer`);
    
    if (savedAnswer !== null) {
        // Encontrar qual opção corresponde a essa resposta
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            const onclick = option.getAttribute('onclick');
            if (onclick && onclick.includes(savedAnswer)) {
                option.classList.add('selected');
                document.getElementById('nextBtn').disabled = false;
            }
        });
    }
}

// Inicializar página
window.addEventListener('load', function() {
    currentScore = parseInt(localStorage.getItem('quizScore')) || 0;
    updateScore();
    selectedOptionIndex = null;
    // restoreSelection(); // Removido para não pré-selecionar respostas
    // Animação de entrada
    document.querySelector('.quiz-card').style.animation = 'fadeIn 0.6s ease-out';
});

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !document.getElementById('nextBtn').disabled) {
        nextQuestion();
    }
    
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Teclas numéricas para selecionar opções
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option');
        if (options[optionIndex]) {
            options[optionIndex].click();
        }
    }
});

// Prevenir navegação acidental
// window.addEventListener('beforeunload', function(e) {
//     const currentPage = window.location.pathname.split('/').pop();
//     if (currentPage.includes('pergunta') && !confirm('Tem certeza que deseja sair? Seu progresso será salvo.')) {
//         e.preventDefault();
//         e.returnValue = '';
//     }
// });

function startQuiz() {
    currentScore = 0;
    localStorage.setItem('quizScore', '0');
    for (let i = 1; i <= 9; i++) {
        localStorage.removeItem(`question${i}Answer`);
    }
    window.location.href = 'pergunta1.html';
}
