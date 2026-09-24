# Estrutura do Projeto

```
Teste/
├── index.html              # Arquivo principal HTML do formulário
├── styles/
│   ├── variables.css       # Variáveis CSS globais (cores, tipografia, etc.)
│   └── form.css           # Estilos principais do formulário
├── js/
│   ├── app-config.js      # Configurações centralizadas
│   ├── form-validation.js # Validação do formulário
│   └── form-init.js       # Inicialização do formulário
├── .htaccess              # Configurações do servidor Apache
├── .gitignore             # Arquivos e pastas ignorados pelo Git
├── .eslintrc.json         # Configuração do ESLint para JavaScript
├── .stylelintrc.json      # Configuração do Stylelint para CSS
├── .prettierrc.json       # Configuração do Prettier para formatação
├── .prettierignore        # Arquivos a serem ignorados pelo Prettier
├── package.json           # Configuração do projeto e dependências
└── README.md              # Documentação do projeto
```

## Explicação da Estrutura

### Arquivos Raiz
- **index.html**: Arquivo principal que contém toda a estrutura HTML do formulário
- **.htaccess**: Configurações do servidor Apache para reescrita de URL e segurança
- **.gitignore**: Define quais arquivos/diretórios devem ser ignorados pelo Git
- **package.json**: Metadados do projeto e dependências npm

### Pastas

#### styles/
Contém todos os arquivos de estilização:
- **variables.css**: Variáveis CSS centralizadas para manter consistência
- **form.css**: Estilos específicos do formulário (CSS modular)

#### js/
Contém todos os arquivos JavaScript:
- **app-config.js**: Configurações globais e constantes do projeto
- **form-validation.js**: Lógica de validação de campos
- **form-init.js**: Inicialização e eventos do formulário

### Arquivos de Configuração

#### .htaccess
- Redirecionamento de URLs
- Proteção de arquivos sensíveis
- Configuração de cache
- Compressão Gzip
- Configurações de segurança (headers)

#### .eslintrc.json
- Configuração do ESLint para padronização de código JavaScript
- Regras para estilo, boas práticas e detecção de erros

#### .stylelintrc.json
- Configuração do Stylelint para padronização de CSS
- Regras para estilo e consistência

#### .prettierrc.json
- Configuração do Prettier para formatação automática de código
- Garante consistência visual em todos os arquivos

#### .prettierignore
- Lista de arquivos que não devem ser formatados pelo Prettier
- Inclui dependências, builds e arquivos externos

## Boas Práticas Aplicadas

1. **Separation of Concerns**: HTML, CSS e JavaScript separados em arquivos distintos
2. **CSS Modular**: Variáveis para cores e configurações globais
3. **JavaScript Modular**: Funções com responsabilidade única
4. **Configuração Centralizada**: AppConfig.js para fácil manutenção
5. **Semântica HTML**: Uso correto de tags HTML5
6. **Acessibilidade**: ARIA labels e estrutura semântica
7. **Validação no Frontend**: Validação de campos antes do envio
8. **Design Responsivo**: Funciona em mobile, tablet e desktop
9. **Performance**: Minificação e carregamento eficiente
10. **Manutenibilidade**: Código organizado e bem documentado

## Como Executar

### Método 1: Apenas Abrir
1. Abra o arquivo `index.html` no navegador

### Método 2: Com Servidor Local (Recomendado)
```bash
# Instalar dependências (opcional)
npm install

# Iniciar servidor local
npx http-server . -p 8080
```

### Método 3: Com Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## Desenvolvimento

### Estilização
- Use variáveis em `styles/variables.css` para cores e configurações
- Siga o padrão de nomenclatura BEM para classes CSS

### JavaScript
- Siga as regras do ESLint definidas em `.eslintrc.json`
- Use `const` e `let` ao invés de `var`
- Prefira arrow functions para funções curtas

### Validação
- Adicione novas validações em `js/form-validation.js`
- Siga o padrão de validação de campos existentes

## Estrutura do Formulário

### Seções
1. **Dados Pessoais**: Tipo de cadastro, nome, e-mail
2. **Informações de Contato**: CPF, RG, datas, endereço
3. **Segmentos Artísticos**: Seleção de áreas de atuação
4. **Dados da Empresa**: CNPJ e Razão Social (opcional)
5. **Anexos**: Curriculum, trabalhos e produções
6. **Termos e Condições**: Aceitação da política de privacidade

### Campos Obrigatórios
- Tipo de Cadastro
- Nome Completo
- Nome Artístico
- E-mail
- Descrição
- CPF
- Data de Nascimento
- Data de Início
- Bairro
- CEP
- Endereço
- Cidade
- Telefone/Whatsapp
- Site/Blog
- Segmentos Artísticos
- Atividade Principal
- Possui CNPJ
- Premiações
- Últimos Trabalhos
- Aceitação dos Termos

## Notas Técnicas

- O formulário usa Bootstrap para o layout base
- Select2 é utilizado para selectboxes com busca
- Datepicker para seleção de datas
- Validação JavaScript customizada (sem dependências externas)
- Código compatível com navegadores modernos (ES6+)

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
