/**
 * Form Validation Module
 * Módulo para validação de formulários seguindo as melhores práticas
 */

// Usa a configuração centralizada
const Config = window.AppConfig || {};

const FormValidator = {
    // Elementos do DOM
    elements: {
        form: null,
        tipoCadastro: null,
        nomePessoa: null,
        nomeArtista: null,
        email: null,
        descricao: null,
        cpf: null,
        rg: null,
        dataNasc: null,
        dataInicio: null,
        bairros: null,
        cep: null,
        endereco: null,
        cidades: null,
        celular: null,
        siteBlog: null,
        segmentos: [],
        outroSegmento: null,
        outroSegmentoGroup: null,
        atividades: null,
        possuiCnpj: null,
        cnpj: null,
        cnpjGroup: null,
        razaoSocial: null,
        razaoSocialGroup: null,
        aceito: null,
        btnAnexarArquivos: null,
        modalAnexarArquivos: null,
        btnEnviar: null,
    },

    /**
     * Inicializa o validador
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupConditionalFields();
        this.setupSelect2();
        this.setupDatepicker();
    },

    /**
     * Caches dos elementos do DOM
     */
    cacheElements() {
        this.elements.form = document.getElementById('form-inscricao');
        this.elements.tipoCadastro = document.getElementById('tipo_cadastro');
        this.elements.nomePessoa = document.getElementById('nome_pessoa');
        this.elements.nomeArtista = document.getElementById('nome_artista');
        this.elements.email = document.getElementById('email_insc');
        this.elements.descricao = document.getElementById('descricao');
        this.elements.cpf = document.getElementById('cpf_insc');
        this.elements.rg = document.getElementById('reg_nasc');
        this.elements.dataNasc = document.getElementById('data_nasc');
        this.elements.dataInicio = document.getElementById('data_inicio');
        this.elements.bairros = document.getElementById('id_bairros');
        this.elements.cep = document.getElementById('cep');
        this.elements.endereco = document.getElementById('endereco');
        this.elements.cidades = document.getElementById('id_cidades');
        this.elements.celular = document.getElementById('celular');
        this.elements.siteBlog = document.getElementById('site_blog');
        this.elements.segmentos = document.querySelectorAll('input[name="segmentoT[]"]');
        this.elements.outroSegmento = document.getElementById('outro_segmento');
        this.elements.outroSegmentoGroup = document.getElementById('outroSegmentoGroup');
        this.elements.atividades = document.getElementById('atividades');
        this.elements.possuiCnpj = document.getElementById('possui_cnpj');
        this.elements.cnpj = document.getElementById('cnpj');
        this.elements.cnpjGroup = document.getElementById('cnpjGroup');
        this.elements.razaoSocial = document.getElementById('razao_social');
        this.elements.razaoSocialGroup = document.getElementById('razaoSocialGroup');
        this.elements.aceito = document.getElementById('aceito');
        this.elements.btnAnexarArquivos = document.getElementById('btnAnexarArquivos');
        this.elements.modalAnexarArquivos = document.getElementById('modalAnexarArquivos');
        this.elements.btnEnviar = document.getElementById('btn-enviar');
    },

    /**
     * Bind de eventos
     */
    bindEvents() {
        if (this.elements.form) {
            this.elements.form.addEventListener('submit', e => this.validateForm(e));
        }

        if (this.elements.possuiCnpj) {
            this.elements.possuiCnpj.addEventListener('change', () => this.toggleCNPJFields());
        }

        if (this.elements.btnAnexarArquivos && this.elements.modalAnexarArquivos) {
            this.elements.btnAnexarArquivos.addEventListener('click', () => this.showModal());
        }

        // Evento para mostrar/ocultar campo "Outro Segmento"
        this.elements.segmentos.forEach(segmento => {
            segmento.addEventListener('change', () => this.toggleOutroSegmento());
        });

        // Evento para campo de outro segmento
        if (this.elements.outroSegmento) {
            this.elements.outroSegmento.addEventListener('input', () =>
                this.validateOutroSegmento()
            );
        }

        // Evento para campo de email
        if (this.elements.email) {
            this.elements.email.addEventListener('blur', () => this.validateEmail());
        }

        // Evento para campo de CPF
        if (this.elements.cpf) {
            this.elements.cpf.addEventListener('blur', () => this.validateCPF());
        }

        // Evento para campo de celular
        if (this.elements.celular) {
            this.elements.celular.addEventListener('blur', () => this.validateCelular());
        }

        // Evento para campo de CEP
        if (this.elements.cep) {
            this.elements.cep.addEventListener('blur', () => this.validateCEP());
        }

        // Evento para campo de site
        if (this.elements.siteBlog) {
            this.elements.siteBlog.addEventListener('blur', () => this.validateURL());
        }
    },

    /**
     * Configuração de campos condicionais
     */
    setupConditionalFields() {
        this.toggleCNPJFields();
        this.toggleOutroSegmento();
    },

    /**
     * Configuração do Select2
     */
    setupSelect2() {
        // Se o Select2 estiver disponível, inicializa
        if (typeof jQuery !== 'undefined' && jQuery().select2) {
            jQuery('.select2').select2();
        }
    },

    /**
     * Configuração do datepicker
     */
    setupDatepicker() {
        // Se o datepicker estiver disponível, inicializa
        if (typeof jQuery !== 'undefined' && jQuery().datepicker) {
            jQuery('.fc-datepicker').datepicker({
                format: 'dd/mm/yyyy',
                language: 'pt-BR',
                autoclose: true,
            });
        }
    },

    /**
     * Exibe o modal de anexar arquivos
     */
    showModal() {
        if (this.elements.modalAnexarArquivos) {
            const modal = new bootstrap.Modal(this.elements.modalAnexarArquivos);
            modal.show();
        }
    },

    /**
     * Toggles os campos de CNPJ
     */
    toggleCNPJFields() {
        const possuiCnpj = this.elements.possuiCnpj?.value;

        if (possuiCnpj === 'Sim') {
            if (this.elements.cnpjGroup) this.elements.cnpjGroup.style.display = 'block';
            if (this.elements.razaoSocialGroup)
                this.elements.razaoSocialGroup.style.display = 'block';

            // Torna obrigatório quando selecionado Sim
            if (this.elements.cnpj) this.elements.cnpj.setAttribute('required', 'required');
            if (this.elements.razaoSocial)
                this.elements.razaoSocial.setAttribute('required', 'required');
        } else {
            if (this.elements.cnpjGroup) this.elements.cnpjGroup.style.display = 'none';
            if (this.elements.razaoSocialGroup)
                this.elements.razaoSocialGroup.style.display = 'none';

            // Remove o required quando não é necessário
            if (this.elements.cnpj) this.elements.cnpj.removeAttribute('required');
            if (this.elements.razaoSocial) this.elements.razaoSocial.removeAttribute('required');
        }
    },

    /**
     * Toggles o campo de outro segmento
     */
    toggleOutroSegmento() {
        const outrosSegmentos = Array.from(this.elements.segmentos)
            .filter(segmento => segmento.checked)
            .map(segmento => segmento.value);

        // Se o segmento "Outro" (valor 14) estiver selecionado, mostra o campo
        if (outrosSegmentos.includes('14')) {
            if (this.elements.outroSegmentoGroup) {
                this.elements.outroSegmentoGroup.style.display = 'block';
                this.elements.outroSegmento.setAttribute('required', 'required');
            }
        } else {
            if (this.elements.outroSegmentoGroup) {
                this.elements.outroSegmentoGroup.style.display = 'none';
                this.elements.outroSegmento.removeAttribute('required');
                this.elements.outroSegmento.value = '';
            }
        }
    },

    /**
     * Validação de email
     */
    validateEmail() {
        const email = this.elements.email?.value;
        if (!email) return true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError(this.elements.email, 'Por favor, informe um e-mail válido.');
            return false;
        }

        this.clearFieldError(this.elements.email);
        return true;
    },

    /**
     * Validação de CPF
     */
    validateCPF() {
        const cpf = this.elements.cpf?.value;
        if (!cpf) return true;

        // Remove máscara
        const cpfLimpo = cpf.replace(/[^\d]/g, '');

        if (cpfLimpo.length !== 11) {
            this.showFieldError(this.elements.cpf, 'O CPF deve conter 11 dígitos.');
            return false;
        }

        // Verifica se todos os dígitos são iguais (CPF inválido)
        if (/^(\d)\1+$/.test(cpfLimpo)) {
            this.showFieldError(this.elements.cpf, 'CPF inválido.');
            return false;
        }

        // Algoritmo de validação de CPF (Corrigido)
        let tamanho = cpfLimpo.length - 2;
        let numeros = cpfLimpo.substring(0, tamanho);
        const digitos = cpfLimpo.substring(tamanho);
        let soma = 0;

        // 1º Dígito: Multiplica os 9 primeiros números pelos pesos de 10 até 2
        for (let i = 0; i < tamanho; i++) {
            soma += numeros.charAt(i) * (10 - i);
        }

        let resultado = (soma * 10) % 11;
        if (resultado === 10 || resultado === 11) resultado = 0;

        if (resultado != digitos.charAt(0)) {
            this.showFieldError(this.elements.cpf, 'CPF inválido.');
            return false;
        }

        // 2º Dígito: Multiplica os 10 primeiros números pelos pesos de 11 até 2
        tamanho = tamanho + 1;
        numeros = cpfLimpo.substring(0, tamanho);
        soma = 0;

        for (let i = 0; i < tamanho; i++) {
            soma += numeros.charAt(i) * (11 - i);
        }

        resultado = (soma * 10) % 11;
        if (resultado === 10 || resultado === 11) resultado = 0;

        if (resultado != digitos.charAt(1)) {
            this.showFieldError(this.elements.cpf, 'CPF inválido.');
            return false;
        }

        this.clearFieldError(this.elements.cpf);
        return true;
    },

    /**
     * Validação de celular/telefone
     */
    validateCelular() {
        const celular = this.elements.celular?.value;
        if (!celular) return true;

        // Remove máscara e caracteres não numéricos
        const celularLimpo = celular.replace(/[^\d]/g, '');

        if (celularLimpo.length < 10 || celularLimpo.length > 11) {
            this.showFieldError(
                this.elements.celular,
                'O número de telefone deve conter de 10 a 11 dígitos.'
            );
            return false;
        }

        this.clearFieldError(this.elements.celular);
        return true;
    },

    /**
     * Validação de CEP
     */
    validateCEP() {
        const cep = this.elements.cep?.value;
        if (!cep) return true;

        // Remove máscara e caracteres não numéricos
        const cepLimpo = cep.replace(/[^\d]/g, '');

        if (cepLimpo.length !== 8) {
            this.showFieldError(this.elements.cep, 'O CEP deve conter 8 dígitos.');
            return false;
        }

        this.clearFieldError(this.elements.cep);
        return true;
    },

    /**
     * Validação de URL
     */
    validateURL() {
        const url = this.elements.siteBlog?.value;
        if (!url) return true;

        let urlFormatada = url;
        if (!urlFormatada.startsWith('http://') && !urlFormatada.startsWith('https://')) {
            urlFormatada = 'https://' + urlFormatada;
        }

        try {
            new URL(urlFormatada);
            this.clearFieldError(this.elements.siteBlog);
            return true;
        } catch (e) {
            this.showFieldError(this.elements.siteBlog, 'Por favor, informe uma URL válida.');
            return false;
        }
    },

    /**
     * Validação do campo "Outro Segmento"
     */
    validateOutroSegmento() {
        const outrosSegmentos = Array.from(this.elements.segmentos)
            .filter(segmento => segmento.checked)
            .map(segmento => segmento.value);

        if (outrosSegmentos.includes('14') && !this.elements.outroSegmento?.value.trim()) {
            this.showFieldError(
                this.elements.outroSegmento,
                'Por favor, informe o outro segmento.'
            );
            return false;
        }

        this.clearFieldError(this.elements.outroSegmento);
        return true;
    },

    /**
     * Validação completa do formulário
     */
    validateForm(event) {
        let isValid = true;

        // Validação dos campos obrigatórios
        const requiredFields = [
            this.elements.tipoCadastro,
            this.elements.nomePessoa,
            this.elements.nomeArtista,
            this.elements.email,
            this.elements.descricao,
            this.elements.cpf,
            this.elements.dataNasc,
            this.elements.dataInicio,
            this.elements.bairros,
            this.elements.cep,
            this.elements.endereco,
            this.elements.cidades,
            this.elements.celular,
            this.elements.siteBlog,
            this.elements.atividades,
            this.elements.possuiCnpj,
            this.elements.aceito,
        ];

        requiredFields.forEach(field => {
            if (field && !field.value) {
                this.showFieldError(field, 'Este campo é obrigatório.');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Validações específicas
        if (!this.validateEmail()) isValid = false;
        if (!this.validateCPF()) isValid = false;
        if (!this.validateCelular()) isValid = false;
        if (!this.validateCEP()) isValid = false;
        if (!this.validateURL()) isValid = false;
        if (!this.validateOutroSegmento()) isValid = false;

        // Validação de seleção de segmentos
        const segmentosSelecionados = Array.from(this.elements.segmentos).filter(
            segmento => segmento.checked
        ).length;

        if (segmentosSelecionados === 0) {
            // Você pode adicionar uma validação personalizada aqui
            // isValid = false;
        }

        if (!isValid) {
            event.preventDefault();

            // Mensagem de erro para o usuário
            alert('Por favor, corrija os erros no formulário.');

            // Scroll para o primeiro erro
            const firstError = document.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }

        return isValid;
    },

    /**
     * Mostra erro em um campo
     */
    showFieldError(element, message) {
        if (!element) return;

        // Remove a classe de erro anterior
        this.clearFieldError(element);

        // Adiciona classe de erro
        element.classList.add('is-invalid');

        // Cria mensagem de erro (se não existir)
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('invalid-feedback');
            errorElement.style.display = 'block';
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }

        errorElement.textContent = message;
    },

    /**
     * Remove erro de um campo
     */
    clearFieldError(element) {
        if (!element) return;

        element.classList.remove('is-invalid');

        const errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.remove();
        }
    },
};

// Inicializa o validador quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FormValidator.init());
} else {
    FormValidator.init();
}
