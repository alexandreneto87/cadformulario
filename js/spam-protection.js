/**
 * ============================================
 * PROTEÇÃO ANTI-SPAM: CLOUDFLARE TURNSTILE
 * Secure by Default - Prevenção de abuso
 * ============================================
 */

class SpamProtection {
    constructor() {
        this.siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || 'your-turnstile-site-key';
        this.apiEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        this.isInitialized = false;
        this.widgetId = null;
        
        this.loadTurnstile();
    }
    
    // Carregar Turnstile dinamicamente
    loadTurnstile() {
        if (this.isInitialized) return;
        
        // Verificar se já carregado
        if (window.turnstile) {
            this.isInitialized = true;
            return;
        }
        
        // Criar script tag
        const script = document.createElement('script');
        script.src = this.apiEndpoint;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.isInitialized = true;
            console.log('Turnstile carregado com sucesso');
        };
        script.onerror = () => {
            console.error('Erro ao carregar Turnstile');
        };
        
        document.head.appendChild(script);
    }
    
    // Renderizar o widget
    render(widgetContainerId) {
        if (!this.isInitialized) {
            console.warn('Turnstile não foi inicializado ainda');
            return null;
        }
        
        try {
            this.widgetId = window.turnstile.render(`#${widgetContainerId}`, {
                sitekey: this.siteKey,
                theme: 'light',
                size: 'normal',
                callback: (token) => {
                    console.log('Turnstile validado com sucesso');
                    return token;
                },
                'error-callback': () => {
                    console.error('Erro na validação do Turnstile');
                }
            });
            
            return this.widgetId;
            
        } catch (error) {
            console.error('Erro ao renderizar Turnstile:', error);
            return null;
        }
    }
    
    // Resetar o widget
    reset() {
        if (this.widgetId && window.turnstile) {
            window.turnstile.reset(this.widgetId);
        }
    }
    
    // Verificar token (para validação no backend)
    verifyToken(token) {
        return fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: import.meta.env.VITE_TURNSTILE_SECRET_KEY || 'your-secret-key',
                response: token,
                remoteip: window.location.hostname
            })
        })
        .then(res => res.json())
        .then(data => {
            return data.success;
        })
        .catch(error => {
            console.error('Erro ao verificar token:', error);
            return false;
        });
    }
}

// ============================================
// INTEGRAÇÃO COM FORMULÁRIO
// ============================================
class FormWithSpamProtection {
    constructor(formId, turnstileContainerId) {
        this.form = document.getElementById(formId);
        this.turnstileContainer = document.getElementById(turnstileContainerId);
        this.spamProtection = new SpamProtection();
        this.tokenElement = null;
        
        this.init();
    }
    
    init() {
        if (!this.form) {
            console.error('Formulário não encontrado');
            return;
        }
        
        // Criar elemento para armazenar o token
        this.tokenElement = document.createElement('input');
        this.tokenElement.type = 'hidden';
        this.tokenElement.name = 'turnstile_token';
        this.tokenElement.id = 'turnstile_token';
        this.form.appendChild(this.tokenElement);
        
        // Renderizar Turnstile
        if (this.turnstileContainer) {
            this.spamProtection.render(turnstileContainerId);
        }
        
        // Validar no submit
        this.form.addEventListener('submit', (e) => this.handleSubmission(e));
    }
    
    async handleSubmission(event) {
        // Se Turnstile não foi inicializado (sem API key), continuar normalmente
        if (!this.spamProtection.isInitialized) {
            console.warn('Turnstile não disponível, prosseguindo sem validação');
            return;
        }
        
        // Obter token
        const token = window.turnstile?.getResponse(this.spamProtection.widgetId);
        
        if (!token) {
            event.preventDefault();
            alert('Por favor, complete a validação anti-spam');
            
            // Re-renderizar se necessário
            if (this.turnstileContainer && !window.turnstile?.getResponse(this.spamProtection.widgetId)) {
                this.spamProtection.render(this.turnstileContainer.id);
            }
            
            return;
        }
        
        // Armazenar token no formulário
        this.tokenElement.value = token;
        
        // Validar token no backend (opcional - para maior segurança)
        // const isValid = await this.spamProtection.verifyToken(token);
        // if (!isValid) {
        //     event.preventDefault();
        //     alert('Validação anti-spam falhou. Por favor, tente novamente.');
        //     this.spamProtection.reset();
        //     return;
        // }
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se Turnstile deve ser usado
    const useTurnstile = import.meta.env.VITE_TURNSTILE_ENABLED !== 'false';
    
    if (useTurnstile) {
        try {
            const spamProtection = new FormWithSpamProtection(
                'form-inscricao', 
                'turnstile-container'
            );
            console.log('Proteção anti-spam ativada');
        } catch (error) {
            console.error('Erro ao inicializar proteção anti-spam:', error);
        }
    }
});
