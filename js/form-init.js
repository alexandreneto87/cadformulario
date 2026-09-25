/**
 * Form Initialization Module
 * Módulo para inicialização e configuração do formulário
 */
import { supabase } from './app-config.js'; // A importação TEM de ser a linha 1

document.addEventListener('DOMContentLoaded', function () {
    /**
     * Inicialização do Select2
     */
    if (typeof jQuery !== 'undefined') {
        jQuery('.select2').select2({
            width: '100%',
            language: 'pt-BR',
            placeholder: 'Escolher',
        });
    }

    /**
     * Configuração do datepicker
     */
    if (typeof jQuery !== 'undefined' && jQuery().datepicker) {
        jQuery('.fc-datepicker').datepicker({
            format: 'dd/mm/yyyy',
            language: 'pt-BR',
            autoclose: true,
            todayHighlight: true,
        });
    }

    /**
     * Configuração do botão de anexar arquivos
     */
    const btnAnexarArquivos = document.getElementById('btnAnexarArquivos');
    if (btnAnexarArquivos) {
        btnAnexarArquivos.addEventListener('click', function () {
            console.log('Abrindo modal para anexar arquivos...');
        });
    }

    /**
     * Configuração do botão de voltar ao topo
     */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function (event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }

    /**
     * Configuração de eventos para o formulário
     */
    const form = document.getElementById('form-inscricao');
    if (form) {
        // LÓGICA DE ENVIO PARA O SUPABASE
        form.addEventListener('submit', async function (event) {
            event.preventDefault(); // Impede a página de recarregar

            const btnEnviar = document.getElementById('btn-enviar');
            if (btnEnviar) {
                btnEnviar.innerText = 'Enviando...';
                btnEnviar.disabled = true;
            }

            try {
                const formData = new FormData(form);

                // 1. CONVERSÃO DAS DATAS
                const dataNasc = formData.get('data_nasc');
                const dataNascFormatada = dataNasc ? dataNasc.split('/').reverse().join('-') : null;

                const dataInicio = formData.get('data_inicio');
                const dataInicioFormatada = dataInicio
                    ? dataInicio.split('/').reverse().join('-')
                    : null;

                // 2. CAPTURA DOS CHECKBOXES DE SEGMENTO (Enviado como Array para o jsonb)
                const segmentosSelecionados = formData.getAll('segmentoT[]');

                // 3. MAPEAMENTO ALINHADO EXATAMENTE COM O SUPABASE
                const dadosParaSalvar = {
                    tipo_cadastro: formData.get('tipo_cadastro'),
                    nome_pessoa: formData.get('nome_pessoa'),
                    nome_artista: formData.get('nome_artista'),
                    email_insc: formData.get('email_insc'),
                    descricao: formData.get('descricao'),
                    cpf_insc: formData.get('cpf_insc')
                        ? formData.get('cpf_insc').replace(/[^\d]/g, '')
                        : null,
                    // reg_nasc removido, pois não existe na tabela
                    data_nasc: dataNascFormatada,
                    data_inicio: dataInicioFormatada,
                    id_bairros: formData.get('id_bairros'),
                    cep: formData.get('cep') ? formData.get('cep').replace(/[^\d]/g, '') : null,
                    endereco: formData.get('endereco'),
                    id_cidades: formData.get('id_cidades'),
                    celular: formData.get('celular'),
                    site_blog: formData.get('site_blog'),
                    segmentos: segmentosSelecionados, // Envia o array diretamente
                    outro_segmento: formData.get('outro_segmento'),
                    atividades: formData.get('atividades'),
                    possui_cnpj: formData.get('possui_cnpj'),
                    cnpj: formData.get('cnpj') ? formData.get('cnpj').replace(/[^\d]/g, '') : null,
                    razao_social: formData.get('razao_social'),
                    trabalhos_prod: formData.get('trab_prod'), // Correção do nome da coluna!
                    premios: formData.get('premios'),
                    ultimo_trab: formData.get('ultimo_trab'),
                    aceito: formData.get('aceito') ? true : false, // Envia como booleano
                };

                const { data, error } = await supabase
                    .from('artist_submissions')
                    .insert([dadosParaSalvar]);

                if (error) throw error;

                alert('Inscrição enviada com sucesso!');
                form.reset();
            } catch (erro) {
                console.error('Erro ao gravar no Supabase:', erro);
                alert('Erro ao guardar os dados. Verifique a consola.');
            } finally {
                if (btnEnviar) {
                    btnEnviar.innerText = 'Enviar';
                    btnEnviar.disabled = false;
                }
            }
        });

        // Limpa mensagens de erro ao iniciar a digitação
        const inputFields = form.querySelectorAll('input, select, textarea');
        inputFields.forEach(function (field) {
            field.addEventListener('input', function () {
                this.classList.remove('is-invalid');
                const errorFeedback = this.nextElementSibling;
                if (errorFeedback && errorFeedback.classList.contains('invalid-feedback')) {
                    errorFeedback.remove();
                }
            });
        });

        // Validação em tempo real para emails
        const emailField = form.querySelector('#email_insc');
        if (emailField) {
            emailField.addEventListener('blur', function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        }

        // Validação em tempo real para CPF
        const cpfField = form.querySelector('#cpf_insc');
        if (cpfField) {
            cpfField.addEventListener('blur', function () {
                const cpfLimpo = this.value.replace(/[^\d]/g, '');
                if (cpfLimpo.length === 11) {
                    console.log('CPF completo - validação pode ser realizada');
                }
            });
        }
    }

    /**
     * Carregamento de dados de CEP
     */
    const cepField = document.getElementById('cep');
    if (cepField) {
        cepField.addEventListener('blur', function () {
            const cep = this.value.replace(/[^\d]/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            console.log('Dados do CEP:', data);
                        }
                    })
                    .catch(error => console.error('Erro ao buscar CEP:', error));
            }
        });
    }

    console.log('Formulário inicializado com sucesso!');
});
