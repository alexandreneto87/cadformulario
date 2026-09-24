/**
 * ============================================
 * FRONTEND - FORMULARIO DE ARTISTAS
 * Arquitetura: Clean Code + Secure by Default
 * Stack: Vanilla JS com Supabase SDK
 * ============================================
 */

// ============================================
// CONFIGURAÇÃO (NÃO COMMITAR CREDENCIAIS)
// ============================================
const AppConfig = {
    // Supabase (usar chaves anon no frontend - NÃO service keys)
    supabase: {
        url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
        anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'
    },
    
    // Configurações de validação
    validation: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedFileTypes: ['application/pdf', 'image/jpeg', 'image/png'],
        allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png']
    },
    
    // IDs dos elementos do DOM
    elements: {
        form: 'form-inscricao',
        btnEnviar: 'btn-enviar',
        btnAnexarArquivos: 'btnAnexarArquivos',
        modalAnexar: 'modalAnexarArquivos',
        campoArquivo: 'arquivo_curriculum',
        statusMessage: 'status-message',
        statusContainer: 'status-container',
        turnstileContainer: 'turnstile-container'
    },
    
    // Mensagens
    messages: {
        success: 'Submissão realizada com sucesso! Em breve entraremos em contato.',
        error: 'Ocorreu um erro ao processar sua inscrição.',
        required: 'Este campo é obrigatório.',
        invalidEmail: 'Por favor, informe um e-mail válido.',
        invalidCPF: 'O CPF deve conter 11 dígitos numéricos.',
        invalidPhone: 'O telefone deve conter 10 ou 11 dígitos numéricos.',
        invalidCEP: 'O CEP deve conter 8 dígitos numéricos.',
        fileSize: 'O arquivo deve ter no máximo 5MB.',
        fileType: 'Arquivos permitidos: PDF, JPG, PNG.',
        uploading: 'Uploading do arquivo em andamento...',
        submitting: 'Enviando dados...',
        emailSent: 'Email de confirmação enviado!'
    }
};

// ============================================
// UTILITÁRIOS DE VALIDAÇÃO
// ============================================
const Validators = {
    // Validação de Email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validação de CPF
    validateCPF(cpf) {
        // Remove não numéricos
        const cpfLimpo = cpf.replace(/[^\d]/g, '');
        
        // Deve ter 11 dígitos
        if (cpfLimpo.length !== 11) return false;
        
        // Não pode ser todos iguais (ex: 111.111.111-11)
        if (/^(\d)\1+$/.test(cpfLimpo)) return false;
        
        // Algoritmo de validação
        let tamanho = cpfLimpo.length - 2;
        let numeros = cpfLimpo.substring(0, tamanho);
        let digitos = cpfLimpo.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return false;
        
        tamanho = tamanho + 1;
        numeros = cpfLimpo.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado == digitos.charAt(1);
    },
    
    // Validação de Telefone
    validatePhone(phone) {
        const phoneLimpo = phone.replace(/[^\d]/g, '');
        return phoneLimpo.length >= 10 && phoneLimpo.length <= 11;
    },
    
    // Validação de CEP
    validateCEP(cep) {
        const cepLimpo = cep.replace(/[^\d]/g, '');
        return cepLimpo.length === 8;
    },
    
    // Validação de URL
    validateURL(url) {
        if (!url) return true; // Opcional
        
        try {
            new URL(url.startsWith('http') ? url : `https://${url}`);
            return true;
        } catch {
            return false;
        }
    },
    
    // Validação de Data
    validateDate(date) {
        const dateObj = new Date(date);
        return dateObj instanceof Date && !isNaN(dateObj);
    }
};

// ============================================
// GERENCIADOR DE STATUS (FEEDBACK UI)
// ============================================
class StatusManager {
    constructor() {
        this.container = document.getElementById(AppConfig.elements.statusContainer);
        this.message = document.getElementById(AppConfig.elements.statusMessage);
    }
    
    showLoading(message) {
        if (this.container) this.container.style.display = 'block';
        if (this.message) this.message.textContent = message || 'Processando...';
        this.container.className = 'status-container loading';
    }
    
    showSuccess(message) {
        if (this.container) this.container.style.display = 'block';
        if (this.message) this.message.textContent = message || AppConfig.messages.success;
        this.container.className = 'status-container success';
    }
    
    showError(message) {
        if (this.container) this.container.style.display = 'block';
        if (this.message) this.message.textContent = message || AppConfig.messages.error;
        this.container.className = 'status-container error';
    }
    
    hide() {
        if (this.container) this.container.style.display = 'none';
    }
}

// ============================================
// GERENCIADOR DE SUPABASE
// ============================================
class SupabaseManager {
    constructor() {
        this.supabaseUrl = AppConfig.supabase.url;
        this.supabaseKey = AppConfig.supabase.anonKey;
        this.client = null;
        
        this.init();
    }
    
    init() {
        if (!this.supabaseUrl || !this.supabaseKey) {
            console.error('Supabase URL e Key são obrigatórias');
            return;
        }
        
        try {
            // Importar Supabase SDK dinamicamente
            import('https://esm.sh/@supabase/supabase-js@2').then(({ createClient }) => {
                this.client = createClient(this.supabaseUrl, this.supabaseKey);
                console.log('Supabase inicializado com sucesso');
            });
        } catch (error) {
            console.error('Erro ao inicializar Supabase:', error);
        }
    }
    
    // Upload de arquivo
    async uploadFile(file, submissaoId) {
        if (!this.client) {
            throw new Error('Supabase não inicializado');
        }
        
        if (!file) {
            throw new Error('Nenhum arquivo selecionado');
        }
        
        // Validação de tamanho
        if (file.size > AppConfig.validation.maxFileSize) {
            throw new Error(AppConfig.messages.fileSize);
        }
        
        // Validação de tipo
        if (!AppConfig.validation.allowedFileTypes.includes(file.type)) {
            throw new Error(AppConfig.messages.fileType);
        }
        
        // Gerar nome único para o arquivo
        const fileExt = file.name.split('.').pop();
        const fileName = `${submissaoId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        // Upload para o Storage
        const { data, error } = await this.client.storage
            .from('artist-submissions')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) {
            throw new Error(error.message || 'Erro no upload');
        }
        
        return {
            path: data.path,
            filename: fileName,
            url: this.client.storage.from('artist-submissions').getPublicUrl(data.path).data.publicUrl
        };
    }
    
    // Inserir dados no banco
    async insertSubmission(data) {
        if (!this.client) {
            throw new Error('Supabase não inicializado');
        }
        
        const { data: submission, error } = await this.client
            .from('artist_submissions')
            .insert([data])
            .select();
        
        if (error) {
            throw new Error(error.message || 'Erro ao inserir dados');
        }
        
        return submission[0];
    }
    
    // Atualizar caminho do arquivo após upload
    async updateFileUrl(submissionId, filePath, fileName) {
        if (!this.client) {
            throw new Error('Supabase não inicializado');
        }
        
        const { data, error } = await this.client
            .from('artist_submissions')
            .update({
                curriculum_path: filePath,
                curriculum_filename: fileName
            })
            .eq('id', submissionId)
            .select();
        
        if (error) {
            console.error('Erro ao atualizar arquivo:', error);
            throw new Error('Erro ao atualizar arquivo');
        }
        
        return data[0];
    }
}

// ============================================
// FORMULÁRIO PRINCIPAL
// ============================================
class ArtistForm {
    constructor() {
        this.form = document.getElementById(AppConfig.elements.form);
        this.submitBtn = document.getElementById(AppConfig.elements.btnEnviar);
        this.statusManager = new StatusManager();
        this.supabaseManager = new SupabaseManager();
        
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Validação em tempo real
        const fields = this.form?.querySelectorAll('input[required], select[required], textarea[required]');
        fields?.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                field.classList.remove('is-invalid');
                this.clearError(field);
            });
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.id) {
            case 'email_insc':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (!Validators.validateEmail(value)) {
                    isValid = false;
                    errorMessage = AppConfig.messages.invalidEmail;
                }
                break;
                
            case 'cpf_insc':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (!Validators.validateCPF(value)) {
                    isValid = false;
                    errorMessage = AppConfig.messages.invalidCPF;
                }
                break;
                
            case 'celular':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (!Validators.validatePhone(value)) {
                    isValid = false;
                    errorMessage = AppConfig.messages.invalidPhone;
                }
                break;
                
            case 'cep':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (!Validators.validateCEP(value)) {
                    isValid = false;
                    errorMessage = AppConfig.messages.invalidCEP;
                }
                break;
                
            case 'site_blog':
                if (value && !Validators.validateURL(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, informe uma URL válida (ex: https://exemplo.com)';
                }
                break;
                
            case 'data_nasc':
            case 'data_inicio':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (!Validators.validateDate(value)) {
                    isValid = false;
                    errorMessage = 'Data inválida. Use o formato dd/mm/aaaa';
                }
                break;
                
            case 'nome_pessoa':
            case 'nome_artista':
            case 'descricao':
            case 'atividades':
            case 'premios':
            case 'ultimo_trab':
            case 'endereco':
                if (!value) {
                    isValid = false;
                    errorMessage = AppConfig.messages.required;
                } else if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Este campo deve ter pelo menos 3 caracteres';
                }
                break;
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
            return false;
        } else {
            this.clearError(field);
            return true;
        }
    }
    
    validateAllFields() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let allValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });
        
        return allValid;
    }
    
    getFormData() {
        const formData = {
            tipo_cadastro: document.getElementById('tipo_cadastro')?.value || '',
            nome_pessoa: document.getElementById('nome_pessoa')?.value?.trim() || '',
            nome_artista: document.getElementById('nome_artista')?.value?.trim() || '',
            email_insc: document.getElementById('email_insc')?.value?.trim() || '',
            descricao: document.getElementById('descricao')?.value?.trim() || '',
            cpf_insc: document.getElementById('cpf_insc')?.value?.trim().replace(/[^\d]/g, '') || '',
            reg_nasc: document.getElementById('reg_nasc')?.value?.trim() || '',
            data_nasc: document.getElementById('data_nasc')?.value?.trim() || '',
            data_inicio: document.getElementById('data_inicio')?.value?.trim() || '',
            id_bairros: parseInt(document.getElementById('id_bairros')?.value) || 0,
            cep: document.getElementById('cep')?.value?.trim().replace(/[^\d]/g, '') || '',
            endereco: document.getElementById('endereco')?.value?.trim() || '',
            id_cidades: parseInt(document.getElementById('id_cidades')?.value) || 0,
            celular: document.getElementById('celular')?.value?.trim().replace(/[^\d]/g, '') || '',
            site_blog: document.getElementById('site_blog')?.value?.trim() || '',
            segmentos: this.getSegmentos(),
            outro_segmento: document.getElementById('outro_segmento')?.value?.trim() || '',
            atividades: document.getElementById('atividades')?.value?.trim() || '',
            possui_cnpj: document.getElementById('possui_cnpj')?.value || '',
            cnpj: document.getElementById('cnpj')?.value?.trim() || '',
            razao_social: document.getElementById('razao_social')?.value?.trim() || '',
            trabalhos_prod: document.getElementById('trab_prod')?.value?.trim() || '',
            premios: document.getElementById('premios')?.value?.trim() || '',
            ultimo_trab: document.getElementById('ultimo_trab')?.value?.trim() || '',
            aceito: document.getElementById('aceito')?.checked || false,
            curriculum_path: '',
            curriculum_filename: ''
        };
        
        return formData;
    }
    
    getSegmentos() {
        const segmentos = [];
        const checkboxes = document.querySelectorAll('input[name="segmentoT[]"]:checked');
        checkboxes.forEach(checkbox => {
            segmentos.push(checkbox.value);
        });
        return segmentos;
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        
        // Validar todos os campos
        if (!this.validateAllFields()) {
            this.statusManager.showError('Por favor, corrija os erros no formulário.');
            
            // Scroll para o primeiro erro
            const firstError = this.form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Verificar termos
        const aceito = document.getElementById('aceito')?.checked;
        if (!aceito) {
            this.statusManager.showError('Você deve aceitar os termos e condições.');
            return;
        }
        
        // Desabilitar botão de submit
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = AppConfig.messages.submitting;
        
        // Limpar mensagens anteriores
        this.statusManager.hide();
        
        try {
            // Passo 1: Obter dados do formulário
            const formData = this.getFormData();
            const arquivo = document.getElementById('arquivo_curriculum')?.files?.[0];
            
            // Passo 2: Fazer INSERT inicial no banco (sem arquivo ainda)
            this.statusManager.showLoading('Criando registro no banco de dados...');
            const submission = await this.supabaseManager.insertSubmission({
                ...formData,
                curriculum_path: '',
                curriculum_filename: ''
            });
            
            const submissionId = submission.id;
            console.log('Registro criado com ID:', submissionId);
            
            // Passo 3: Upload do arquivo (se houver)
            if (arquivo) {
                this.statusManager.showLoading(AppConfig.messages.uploading);
                const uploadResult = await this.supabaseManager.uploadFile(arquivo, submissionId);
                
                console.log('Arquivo uploadado:', uploadResult);
                
                // Passo 4: Atualizar caminho do arquivo no banco
                await this.supabaseManager.updateFileUrl(submissionId, uploadResult.path, uploadResult.filename);
                
                // Passo 5: Atualizar dados localmente
                formData.curriculum_path = uploadResult.path;
                formData.curriculum_filename = uploadResult.filename;
            }
            
            // Sucesso
            this.statusManager.showSuccess(AppConfig.messages.success);
            
            // Feedback sobre o email
            setTimeout(() => {
                this.statusManager.showSuccess(`${AppConfig.messages.success} ${AppConfig.messages.emailSent}`);
            }, 2000);
            
            // Limpar formulário (opcional)
            // this.form.reset();
            
        } catch (error) {
            console.error('Erro completo:', error);
            this.statusManager.showError(error.message || AppConfig.messages.error);
        } finally {
            // Reabilitar botão
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Enviar';
        }
    }
    
    showError(field, message) {
        field.classList.add('is-invalid');
        
        // Criar mensagem de erro
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('invalid-feedback');
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = message;
    }
    
    clearError(field) {
        field.classList.remove('is-invalid');
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.remove();
        }
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = new ArtistForm();
    console.log('Formulário de Artistas inicializado com sucesso!');
});
