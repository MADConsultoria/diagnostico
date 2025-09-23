/**
 * Lead Capture Module
 * Handles form validation, API integration, and data management
 */

class LeadCapture {
  constructor() {
    this.form = document.getElementById('leadForm');
    this.submitBtn = document.getElementById('submitBtn');
    this.apiEndpoint = 'https://api.exemplo.com/leads'; // Configure sua API aqui
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    this.setupPhoneMask();
    this.setupValidation();
    this.setupFormSubmission();
    this.loadSavedData();
  }

  // Máscara de telefone
  setupPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
      });
    }
  }

  // Validação em tempo real
  setupValidation() {
    const validators = {
      name: (value) => value.trim().length >= 2,
      phone: (value) => value.replace(/\D/g, '').length >= 10,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      consent: (checked) => checked
    };

    const errorMessages = {
      name: 'Informe seu nome completo',
      phone: 'Telefone inválido',
      email: 'E-mail inválido',
      consent: 'É necessário aceitar os termos'
    };

    Object.keys(validators).forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      
      if (field && errorElement) {
        field.addEventListener('blur', () => {
          this.validateField(field, validators[fieldId], errorElement, errorMessages[fieldId]);
        });
      }
    });
  }

  validateField(field, validator, errorElement, errorMessage) {
    const isValid = validator(field.value);
    if (isValid) {
      field.classList.remove('error');
      errorElement.textContent = '';
    } else {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
    }
    return isValid;
  }

  // Configuração do envio do formulário
  setupFormSubmission() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;

    // Limpar erros anteriores
    this.clearErrors();

    // Validar todos os campos
    const formData = this.getFormData();
    const isValid = this.validateAllFields(formData);

    if (!isValid) {
      this.scrollToFirstError();
      return;
    }

    this.setLoadingState(true);

    try {
      // Enviar dados para API
      await this.sendToAPI(formData);
      
      // Salvar localmente
      this.saveToLocalStorage(formData);
      
      // Simular delay para feedback visual
      await this.delay(1000);
      
      // Redirecionar para o quiz
      window.location.href = 'index.html';
      
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      this.showError('Ocorreu um erro. Tente novamente.');
      this.setLoadingState(false);
    }
  }

  getFormData() {
    return {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      company: document.getElementById('company').value.trim(),
      consent: document.getElementById('consent').checked,
      timestamp: new Date().toISOString(),
      source: 'roda-empresario-quiz',
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
  }

  validateAllFields(formData) {
    const validators = {
      name: (value) => value.length >= 2,
      phone: (value) => value.replace(/\D/g, '').length >= 10,
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      consent: (checked) => checked
    };

    const errorMessages = {
      name: 'Informe seu nome completo',
      phone: 'Telefone inválido',
      email: 'E-mail inválido',
      consent: 'É necessário aceitar os termos'
    };

    let isValid = true;

    Object.keys(validators).forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const errorElement = document.getElementById(fieldId + 'Error');
      
      if (field && errorElement) {
        const fieldValid = this.validateField(field, validators[fieldId], errorElement, errorMessages[fieldId]);
        if (!fieldValid) isValid = false;
      }
    });

    return isValid;
  }

  clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    const consent = document.getElementById('consent');
    if (consent) consent.classList.remove('error');
  }

  scrollToFirstError() {
    const firstError = document.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
  }

  setLoadingState(loading) {
    this.isSubmitting = loading;
    if (this.submitBtn) {
      this.submitBtn.disabled = loading;
      if (loading) {
        this.submitBtn.classList.add('loading');
        this.submitBtn.textContent = 'Processando...';
      } else {
        this.submitBtn.classList.remove('loading');
        this.submitBtn.textContent = 'Começar o Quiz';
      }
    }
  }

  async sendToAPI(data) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Lead enviado com sucesso:', result);
      
    } catch (error) {
      console.warn('Falha ao enviar para API, salvando localmente:', error);
      // Não interrompe o fluxo se a API falhar
    }
  }

  saveToLocalStorage(data) {
    try {
      localStorage.setItem('leadData', JSON.stringify(data));
      localStorage.setItem('leadSubmitted', 'true');
    } catch (error) {
      console.error('Erro ao salvar dados localmente:', error);
    }
  }

  loadSavedData() {
    try {
      const savedData = localStorage.getItem('leadData');
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.name) document.getElementById('name').value = data.name;
        if (data.phone) document.getElementById('phone').value = data.phone;
        if (data.email) document.getElementById('email').value = data.email;
        if (data.company) document.getElementById('company').value = data.company;
      }
    } catch (error) {
      console.warn('Erro ao carregar dados salvos:', error);
    }
  }

  showError(message) {
    // Criar elemento de erro se não existir
    let errorDiv = document.querySelector('.error-message-global');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message-global';
      this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Remover após 5 segundos
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new LeadCapture();
});

// Exportar para uso em outros módulos se necessário
window.LeadCapture = LeadCapture;
