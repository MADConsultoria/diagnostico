/**
 * Lead Capture Module
 * Handles form validation, API integration, and data management
 */

class LeadCapture {
  constructor() {
    this.form = document.getElementById('leadForm');
    this.submitBtn = document.getElementById('submitBtn');
    const ds = this.form ? this.form.dataset : {};
    // Homio CRM (desativado; veja função comentada abaixo)
    this.apiEndpoint = (ds && ds.apiEndpoint) ? ds.apiEndpoint : 'https://api.exemplo.com/leads';
    this.apiToken = (ds && ds.apiToken) ? ds.apiToken : '';
    // Supabase
    this.supabaseUrl = (ds && ds.supabaseUrl) ? ds.supabaseUrl : '';
    this.supabaseKey = (ds && ds.supabaseKey) ? ds.supabaseKey : '';
    this.supabaseTable = (ds && ds.supabaseTable) ? ds.supabaseTable : 'leads';
    this.supabase = null;
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    this.setupPhoneMask();
    this.setupValidation();
    this.setupFormSubmission();
    this.loadSavedData();
    this.setupSupabase();
    this.setupTestHook();
  }

  setupSupabase() {
    try {
      if (this.supabaseUrl && this.supabaseKey && window.supabase) {
        this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
        console.log('[LeadCapture] Supabase inicializado');
      } else {
        console.log('[LeadCapture] Supabase não configurado (URL/Key ausentes ou CDN não carregou)');
      }
    } catch (e) {
      console.warn('Erro ao inicializar Supabase:', e);
    }
  }

  async insertSupabase(data) {
    if (!this.supabase) {
      console.warn('Supabase não inicializado, pulando insert');
      return false;
    }

    try {
      // Mapear para as colunas do seu schema: id (auto), created_at, name, whatsapp, Empresa, email, tag
      const payload = {
        created_at: new Date().toISOString(),
        name: data.name,
        whatsapp: data.phone,
        Empresa: data.company || null,
        email: data.email,
        tag: 'roda-da-vida'
      };

      const { data: result, error } = await this.supabase
        .from(this.supabaseTable)
        .insert(payload)
        .select();

      if (error) {
        console.error('Erro ao inserir no Supabase:', error);
        return false;
      }
      console.log('Supabase insert OK:', result);
      return true;
    } catch (e) {
      console.error('Exceção no insert Supabase:', e);
      return false;
    }
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
      // Apenas Supabase (CRM desativado temporariamente)
      console.log('📤 Enviando dados para Supabase...');
      const supaOk = await this.insertSupabase(formData);

      if (supaOk) {
        console.log('✅ Dados enviados ao Supabase com sucesso!');
        this.saveToLocalStorage(formData);
        await this.delay(600);
        window.location.href = 'index.html';
      } else {
        console.log('❌ Falha ao enviar dados ao Supabase');
        this.showError('Erro ao enviar dados. Tente novamente.');
        this.setLoadingState(false);
      }
      
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

  /*
  // === HOMIO CRM DESATIVADO (comente/descomente para reativar) ===
  async sendToAPI(data) {
    const payload = {
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        empresa: data.company || null,
        fonte: 'roda-da-vida'
      },
      consent: data.consent,
      metadata: {
        timestamp: data.timestamp,
        source: data.source,
        userAgent: data.userAgent,
        referrer: data.referrer
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async testConnectivity() {
    try {
      const response = await fetch(this.apiEndpoint, { method: 'OPTIONS' });
      return response.status < 500;
    } catch (error) {
      return false;
    }
  }
  // === FIM HOMIO CRM ===
  */

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

  async testConnectivity() {
    try {
      console.log('🌐 Testando conectividade com:', this.apiEndpoint);
      const response = await fetch(this.apiEndpoint, {
        method: 'OPTIONS', // Teste de CORS
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('📡 Resposta do teste:', response.status, response.statusText);
      return response.status < 500; // Qualquer coisa abaixo de 500 é "conectável"
      
    } catch (error) {
      console.error('❌ Erro de conectividade:', error);
      return false;
    }
  }

  setupTestHook() {
    try {
      const url = new URL(window.location.href);
      const isTest = url.searchParams.get('test') === '1';
      if (!isTest || !this.form) return;

      // Preencher dados de teste
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const company = document.getElementById('company');
      const consent = document.getElementById('consent');

      if (name) name.value = 'Teste Roda da Vida';
      if (phone) phone.value = '(11) 98888-7777';
      if (email) email.value = 'teste+rodadavida@example.com';
      if (company) company.value = 'Empresa de Teste';
      if (consent) consent.checked = true;

      console.info('[LeadCapture] Test mode ativo (?test=1). Submetendo automaticamente...');
      setTimeout(() => {
        this.form.requestSubmit ? this.form.requestSubmit() : this.form.submit();
      }, 300);
    } catch (_) {
      // ignora
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new LeadCapture();
});

// Exportar para uso em outros módulos se necessário
window.LeadCapture = LeadCapture;
