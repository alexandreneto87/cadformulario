/**
 * Form Initialization Module
 * Módulo para inicialização e configuração do formulário
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Inicialização do Select2
     */
    if (typeof jQuery !== 'undefined') {
        // Inicializa Select2 para os campos select
        jQuery('.select2').select2({
            width: '100%',
            language: 'pt-BR',
            placeholder: 'Escolher'
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
            todayHighlight: true
        });
    }

    /**
     * Configuração do botão de anexar arquivos
     */
    const btnAnexarArquivos = document.getElementById('btnAnexarArquivos');
    if (btnAnexarArquivos) {
        btnAnexarArquivos.addEventListener('click', function() {
            console.log('Abrindo modal para anexar arquivos...');
            // Aqui você pode adicionar lógica adicional se necessário
        });
    }

    /**
     * Configuração do botão de envio
     */
    const btnEnviar = document.getElementById('btn-enviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', function(event) {
            // Opcional: Adicionar lógica antes do envio
            console.log('Botão de envio clicado');
        });
    }

    /**
     * Configuração do botão de voltar ao topo
     */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        // Mostra o botão quando o usuário rola 300px
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        // Volta ao topo ao clicar
        backToTop.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Configuração de eventos para o formulário
     */
    const form = document.getElementById('form-inscricao');
    if (form) {
        // Limpa mensagens de erro ao iniciar a digitação
        const inputFields = form.querySelectorAll('input, select, textarea');
        inputFields.forEach(function(field) {
            field.addEventListener('input', function() {
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
            emailField.addEventListener('blur', function() {
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
            cpfField.addEventListener('blur', function() {
                const cpfLimpo = this.value.replace(/[^\d]/g, '');
                if (cpfLimpo.length === 11) {
                    console.log('CPF completo - validação pode ser realizada');
                }
            });
        }
    }

    /**
     * Carregamento de dados de CEP (opcional)
     * Você pode integrar com uma API como ViaCEP para preencher automaticamente
     */
    const cepField = document.getElementById('cep');
    if (cepField) {
        cepField.addEventListener('blur', function() {
            const cep = this.value.replace(/[^\d]/g, '');
            
            if (cep.length === 8) {
                // Exemplo de integração com ViaCEP
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            // Preencher campos com os dados do CEP
                            // Este código precisa ser adaptado para o seu caso específico
                            console.log('Dados do CEP:', data);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                    });
            }
        });
    }

    console.log('Formulário inicializado com sucesso!');
});
