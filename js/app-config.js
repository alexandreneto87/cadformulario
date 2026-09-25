import { createClient } from '@supabase/supabase-js';

// 1. COLOQUE AS SUAS CREDENCIAIS DO SUPABASE AQUI
const supabaseUrl = 'https://dhmxevwsmtujxhmaxobw.supabase.co';
const supabaseKey = 'sb_publishable_B8OTLQ0017fECE4lhJZevg_bMWpOA62';

// 2. INICIALIZA E EXPORTA A LIGAÇÃO AO SUPABASE
export const supabase = createClient(supabaseUrl, supabaseKey);

// 3. A SUA CONFIGURAÇÃO ORIGINAL DO APLICATIVO
export const AppConfig = {
    api: {},
    validation: {
        cpf: { length: 11, pattern: /^\d{11}$/ },
        cnpj: { length: 14, pattern: /^\d{14}$/ },
        cep: { length: 8, pattern: /^\d{8}$/ },
        phone: { min: 10, max: 11, pattern: /^\d{10,11}$/ },
        email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    },
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
        other: 14,
    },
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
        invalidFile: 'Formato de arquivo inválido.',
    },
    masks: {
        cpf: '999.999.999-99',
        cnpj: '99.999.999/9999-99',
        cep: '99999-999',
        phone: '(99) 99999-9999',
    },
    limits: {
        maxFiles: 5,
        maxFileSize: 10 * 1024 * 1024,
        maxTextLength: { text: 255, textarea: 1000 },
    },
    ui: {
        modal: { backdrop: 'static', keyboard: true },
        toast: { position: 'top-right', autohide: true, delay: 3000 },
    },
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
        aceito: 'aceito',
    },
};

if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
}
console.log('Configuração carregada com sucesso!');
