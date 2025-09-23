/**
 * Quiz Module
 * Handles quiz logic, progress tracking, and results
 */

class RodaEmpresarioQuiz {
  constructor() {
    this.questions = [];
    this.categories = ["Financeiro", "Gestão de Tempo", "Inovação", "Liderança", "Marketing", "Maturidade Empresarial", "Networking", "Qualidade de vida"];
    this.currentIndex = 0;
    this.answers = [];
    this.shuffles = [];
    this.radarChart = null;
    
    this.elements = {
      qText: document.getElementById('q-text'),
      optsEl: document.getElementById('opts'),
      pbar: document.getElementById('pbar'),
      quizCard: document.getElementById('quiz-card'),
      resultCard: document.getElementById('result-card'),
      btnBack: document.getElementById('btn-back'),
      answersList: document.getElementById('answers-list'),
      radarCanvas: document.getElementById('radarCanvas')
    };

    this.init();
  }

  async init() {
    try {
      await this.loadQuestions();
      this.setupEventListeners();
      this.renderQuestion();
    } catch (error) {
      console.error('Erro ao inicializar quiz:', error);
      this.showError('Erro ao carregar o quiz. Recarregue a página.');
    }
  }

  async loadQuestions() {
    try {
      // Tentar carregar do arquivo JSON primeiro
      const response = await fetch('./assets/data/questions.json');
      if (response.ok) {
        this.questions = await response.json();
      } else {
        throw new Error('Arquivo de perguntas não encontrado');
      }
    } catch (error) {
      console.warn('Carregando perguntas do localStorage:', error);
      // Fallback para dados hardcoded se necessário
      this.loadFallbackQuestions();
    }
    
    this.initializeAnswers();
    this.generateShuffles();
  }

  loadFallbackQuestions() {
    // Dados de fallback - você pode adicionar todas as perguntas aqui
    this.questions = [
      {
        "question": "Como você define as responsabilidades da sua equipe?",
        "options": [
          {"text": "Não há definição clara, cada um faz o que aparece.", "category": "Liderança", "score": 0.2},
          {"text": "Delego verbalmente, sem registros.", "category": "Liderança", "score": 0.4},
          {"text": "Tenho funções definidas, mas sem detalhamento.", "category": "Liderança", "score": 0.6},
          {"text": "Tenho descrição de cargos organizada.", "category": "Liderança", "score": 0.8},
          {"text": "Tenho funções claras, alinhadas com metas e processos.", "category": "Liderança", "score": 1.0}
        ]
      }
      // Adicione mais perguntas aqui se necessário
    ];
  }

  initializeAnswers() {
    this.answers = new Array(this.questions.length).fill(null);
  }

  generateShuffles() {
    this.shuffles = this.questions.map(q => {
      const arr = [...Array(q.options.length).keys()];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  }

  setupEventListeners() {
    if (this.elements.btnBack) {
      this.elements.btnBack.addEventListener('click', () => this.goBack());
    }

    // Event listeners para download de PDF
    const btnDownload = document.getElementById('btn-download');
    const btnPrint = document.getElementById('btn-print');
    
    if (btnDownload) {
      btnDownload.addEventListener('click', () => this.downloadPDF());
    }
    
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }
  }

  renderQuestion() {
    if (!this.elements.qText || !this.elements.optsEl || !this.elements.pbar) return;

    const total = this.questions.length;
    const pct = Math.round((this.currentIndex / total) * 100);
    this.elements.pbar.style.width = pct + '%';

    const question = this.questions[this.currentIndex];
    this.elements.qText.textContent = question.question;
    this.elements.optsEl.innerHTML = '';

    const order = this.shuffles[this.currentIndex];
    order.forEach((origIndex) => {
      const option = question.options[origIndex];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.innerHTML = `<span>${option.text}</span>`;
      btn.addEventListener('click', () => this.selectAnswer(origIndex));
      
      // Adicionar navegação por teclado
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectAnswer(origIndex);
        }
      });
      
      this.elements.optsEl.appendChild(btn);
    });

    if (this.elements.btnBack) {
      this.elements.btnBack.disabled = this.currentIndex === 0;
    }
  }

  selectAnswer(originalIndex) {
    this.answers[this.currentIndex] = originalIndex;
    this.saveProgress();
    
    this.currentIndex = Math.min(this.currentIndex + 1, this.questions.length);
    
    if (this.currentIndex === this.questions.length) {
      this.finish();
    } else {
      this.renderQuestion();
    }
  }

  goBack() {
    if (this.currentIndex === 0) return;
    
    this.currentIndex = this.currentIndex - 1;
    this.answers[this.currentIndex] = null;
    this.saveProgress();
    this.renderQuestion();
  }

  saveProgress() {
    try {
      const progressData = {
        currentIndex: this.currentIndex,
        answers: this.answers,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('quizProgress', JSON.stringify(progressData));
    } catch (error) {
      console.warn('Erro ao salvar progresso:', error);
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentIndex = data.currentIndex || 0;
        this.answers = data.answers || new Array(this.questions.length).fill(null);
      }
    } catch (error) {
      console.warn('Erro ao carregar progresso:', error);
    }
  }

  computeTotals() {
    const totals = {};
    this.categories.forEach(c => totals[c] = 0);
    
    this.answers.forEach((origIndex, qi) => {
      if (origIndex !== null && this.questions[qi]) {
        const option = this.questions[qi].options[origIndex];
        totals[option.category] += Number(option.score || 0);
      }
    });
    
    return totals;
  }

  finish() {
    const totals = this.computeTotals();
    this.renderResults(totals);
    this.renderAnswersList();
    
    if (this.elements.quizCard) {
      this.elements.quizCard.classList.add('hidden');
    }
    if (this.elements.resultCard) {
      this.elements.resultCard.classList.remove('hidden');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Salvar resultados
    this.saveResults(totals);
  }

  renderResults(totals) {
    if (!this.elements.radarCanvas) return;

    const labels = this.categories;
    const data = labels.map(cat => totals[cat] || 0);

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    // Verificar se Chart.js está disponível
    if (typeof Chart === 'undefined') {
      console.error('Chart.js não carregado');
      return;
    }

    this.radarChart = new Chart(this.elements.radarCanvas, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Pontuação',
          data,
          fill: true,
          backgroundColor: 'rgba(11,91,75,0.10)',
          borderColor: 'rgba(11,91,75,0.95)',
          pointBackgroundColor: 'rgba(11,91,75,1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
          datalabels: {
            color: '#0B5B4B',
            backgroundColor: '#ffffff',
            borderColor: '#0B5B4B',
            borderWidth: 1,
            borderRadius: 8,
            padding: {left:6,right:6,top:2,bottom:2},
            formatter: (v) => (typeof v === 'number' ? v.toFixed(1) : v),
            anchor: 'end',
            align: 'end',
            offset: 6,
            font: { weight: '800' }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 10,
            ticks: { stepSize: 1, backdropColor: '#ffffff', color: '#374151' },
            grid: { color: '#e5e7eb' },
            angleLines: { color: '#e5e7eb' },
            pointLabels: { color: '#0B5B4B', font: { weight: '700' } }
          }
        },
        elements: { line: { borderWidth: 2 } }
      },
      plugins: [ChartDataLabels]
    });
  }

  renderAnswersList() {
    if (!this.elements.answersList) return;

    this.elements.answersList.innerHTML = '';
    this.questions.forEach((q, i) => {
      const li = document.createElement('li');
      const chosen = this.answers[i];
      const text = chosen !== null && q.options[chosen] ? q.options[chosen].text : '(sem resposta)';
      li.innerHTML = `<strong>${q.question}</strong><div class="muted">${text}</div>`;
      this.elements.answersList.appendChild(li);
    });
  }

  saveResults(totals) {
    try {
      const leadData = JSON.parse(localStorage.getItem('leadData') || '{}');
      const results = {
        ...leadData,
        quizResults: {
          totals,
          answers: this.answers,
          completedAt: new Date().toISOString()
        }
      };
      localStorage.setItem('quizResults', JSON.stringify(results));
    } catch (error) {
      console.warn('Erro ao salvar resultados:', error);
    }
  }

  async downloadPDF() {
    try {
      if (!window.html2canvas || !window.jspdf) {
        throw new Error('Bibliotecas de PDF não carregadas');
      }

      const root = this.elements.resultCard;
      const canvas = await html2canvas(root, { 
        scale: 2, 
        backgroundColor: '#ffffff',
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 40;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      if (imgHeight <= pageHeight - 40) {
        pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      } else {
        let pos = 0;
        const ratio = canvas.width / imgWidth;
        const slice = (pageHeight - 40) * ratio;
        
        while (pos < canvas.height) {
          const pageCanvas = document.createElement('canvas');
          const h = Math.min(slice, canvas.height - pos);
          pageCanvas.width = canvas.width;
          pageCanvas.height = h;
          
          const ctx = pageCanvas.getContext('2d');
          ctx.drawImage(canvas, 0, pos, canvas.width, h, 0, 0, canvas.width, h);
          
          const img = pageCanvas.toDataURL('image/png');
          if (pos > 0) pdf.addPage();
          pdf.addImage(img, 'PNG', 20, 20, imgWidth, h/ratio);
          pos += h;
        }
      }
      
      pdf.save('resultado_roda_empresario.pdf');
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Use a opção de imprimir.');
      window.print();
    }
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'background: #fee; color: #c00; padding: 12px; margin: 16px 0; border-radius: 8px; border: 1px solid #fcc;';
    
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(errorDiv, main.firstChild);
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new RodaEmpresarioQuiz();
});

// Exportar para uso em outros módulos
window.RodaEmpresarioQuiz = RodaEmpresarioQuiz;
