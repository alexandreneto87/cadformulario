/**
 * Configuração Global do Formulário
 * Centraliza todas as configurações e constantes do formulário
 */

const AppConfig = {
    // URLs e Endpoints
    api: {
        // Não usar endpoints de Edge Functions para upload/insert
        // Estas operações são feitas diretamente pelo Supabase SDK
        // Edge Function só para envio de email (disparada por webhook)
    },
    
    // Validações
    validation: {
        cpf: {
            length: 11,
            pattern: /^\d{11}$/
        },
        cnpj: {
            length: 14,
            pattern: /^\d{14}$/
        },
        cep: {
            length: 8,
            pattern: /^\d{8}$/
        },
        phone: {
            min: 10,
            max: 11,
            pattern: /^\d{10,11}$/
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
    },
    
    // Segmentos artísticos disponíveis
    segmentos: {
        artsCircuses: 1,
        visualArts: 2,
        crafts: 3,
        cinema: 4,
        popularCulture: 5,
        dance: 6,
        design: 7,
        literature: 8,
        music: 9,
        culturalManagement: 10,
        teacher: 11,
        theater: 12,
        creativeCuisine: 13,
        other: 14
    },
    
    // Mensagens de erro
    messages: {
        required: 'Este campo é obrigatório.',
        invalidEmail: 'Por favor, informe um e-mail válido.',
        invalidCPF: 'O CPF deve conter 11 dígitos e ser válido.',
        invalidPhone: 'O número de telefone deve conter de 10 a 11 dígitos.',
        invalidCEP: 'O CEP deve conter 8 dígitos.',
        invalidURL: 'Por favor, informe uma URL válida (ex: https://exemplo.com)',
        selectOption: 'Por favor, selecione uma opção.',
        minSelect: 'Selecione pelo menos uma opção.',
        maxChars: 'Excedido o limite de caracteres.',
        invalidFile: 'Formato de arquivo inválido.'
    },
    
    // Máscaras
    masks: {
        cpf: '999.999.999-99',
        cnpj: '99.999.999/9999-99',
        cep: '99999-999',
        phone: '(99) 99999-9999'
    },
    
    // Limites
    limits: {
        maxFiles: 5,
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxTextLength: {
            text: 255,
            textarea: 1000
        }
    },
    
    // Configurações de UI
    ui: {
        modal: {
            backdrop: 'static',
            keyboard: true
        },
        toast: {
            position: 'top-right',
            autohide: true,
            delay: 3000
        }
    },
    
    // Elementos do DOM (cache)
    elements: {
        form: 'form-inscricao',
        btnEnviar: 'btn-enviar',
        modalAnexar: 'modalAnexarArquivos',
        btnAnexar: 'btnAnexarArquivos',
        cep: 'cep',
        bairros: 'id_bairros',
        cidades: 'id_cidades',
        segmentos: 'segmentoT[]',
        outroSegmento: 'outro_segmento',
        possuiCnpj: 'possui_cnpj',
        cnpj: 'cnpj',
        razaoSocial: 'razao_social',
        aceito: 'aceito'
    }
};

// Exporta se estiver usando módulos ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}

// Exporta globalmente para uso no navegador
if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
}

console.log('Configuração carregada com sucesso!');
