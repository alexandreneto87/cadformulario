# Estrutura de Diretórios do Projeto

```
Teste/
├── 📄 Arquivos Raiz
│   ├── index.html              # Arquivo principal HTML do formulário
│   ├── styles/                 # Diretório de estilização (CSS)
│   ├── js/                     # Diretório de JavaScript
│   ├── .htaccess              # Configurações do servidor Apache
│   ├── .gitignore             # Arquivos e pastas ignorados pelo Git
│   ├── .eslintrc.json         # Configuração do ESLint para JavaScript
│   ├── .stylelintrc.json      # Configuração do Stylelint para CSS
│   ├── .prettierrc.json       # Configuração do Prettier
│   ├── .prettierignore        # Arquivos a serem ignorados pelo Prettier
│   ├── .editorconfig          # Configuração de editor padronizada
│   ├── package.json           # Configuração do projeto e dependências
│   ├── README.md              # Documentação principal
│   ├── ESTRUTURA.md           # Documentação da estrutura
│   ├── CHANGELOG.md           # Histórico de mudanças
│   └── LICENCA.md             # Licença do projeto
│
└── 📁 styles/                  # Diretório de Estilização
    ├── main.css               # Arquivo principal de imports (recomendado para uso)
    ├── form.css               # Estilos principais do formulário
    ├── variables.css          # Variáveis CSS globais (cores, tipografia, etc.)
    ├── reset.css              # Reset/Normalize CSS
    ├── components/            # Componentes CSS específicos
    │   ├── form.css           # Estilos do formulário
    │   ├── buttons.css        # Estilos de botões
    │   ├── cards.css          # Estilos de cards
    │   └── modals.css         # Estilos de modais
    └── responsive/            # Media queries para responsividade
        ├── mobile.css         # Estilos para mobile
        ├── tablet.css         # Estilos para tablet
        └── desktop.css        # Estilos para desktop
│
└── 📁 js/                      # Diretório de JavaScript
    ├── app-config.js          # Configurações centralizadas
    ├── form-validation.js     # Validação do formulário
    └── form-init.js           # Inicialização do formulário
│
└── 📁 .vscode/                 # Configurações do VS Code (Opcional)
    ├── settings.json          # Configurações do editor
    ├── launch.json            # Configuração de debug
    ├── tasks.json             # Configuração de tarefas
    └── extensions.json        # Extensões recomendadas
```

## Explicação da Estrutura

### Arquivos Raiz

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Arquivo principal HTML do formulário |
| `package.json` | Configuração do projeto e dependências npm |
| `.htaccess` | Configurações do servidor Apache |
| `.gitignore` | Arquivos e pastas ignorados pelo Git |
| `.eslintrc.json` | Configuração do ESLint |
| `.stylelintrc.json` | Configuração do Stylelint |
| `.prettierrc.json` | Configuração do Prettier |
| `.editorconfig` | Configuração padronizada para editores |
| `README.md` | Documentação principal |
| `ESTRUTURA.md` | Documentação da estrutura |
| `CHANGELOG.md` | Histórico de mudanças |
| `LICENCA.md` | Licença do projeto |

### Diretório `styles/`

| Arquivo | Descrição |
|---------|-----------|
| `main.css` | Arquivo principal que importa todos os outros (USO RECOMENDADO) |
| `form.css` | Estilos principais do formulário |
| `variables.css` | Variáveis CSS globais (cores, tipografia, espaçamentos) |
| `reset.css` | Reset/Normalize CSS para padronização entre navegadores |
| `components/` | Diretório com estilos de componentes específicos |
| `responsive/` | Diretório com media queries para responsividade |

### Diretório `js/`

| Arquivo | Descrição |
|---------|-----------|
| `app-config.js` | Configurações centralizadas e constantes |
| `form-validation.js` | Lógica de validação de campos |
| `form-init.js` | Inicialização e eventos do formulário |

### Diretório `.vscode/` (Opcional)

| Arquivo | Descrição |
|---------|-----------|
| `settings.json` | Configurações do editor |
| `launch.json` | Configuração de debug |
| `tasks.json` | Configuração de tarefas |
| `extensions.json` | Extensões recomendadas |

## Como Usar

### Importando o CSS no HTML

Para usar o CSS no seu HTML, basta importar o arquivo `main.css`:

```html
<link rel="stylesheet" href="styles/main.css">
```

Este arquivo já importa todos os outros arquivos CSS necessários.

### Estrutura de Componentes

Os arquivos CSS são organizados por responsabilidade:

1. **variables.css**: Variáveis globais (cores, fontes, espaçamentos)
2. **reset.css**: Reset/Normalize CSS
3. **components/**: Estilos específicos de componentes
4. **responsive/**: Media queries para diferentes dispositivos

### Boas Práticas Aplicadas

✅ **Separation of Concerns**: Cada arquivo tem uma responsabilidade única  
✅ **CSS Modular**: Componentes separados por funcionalidade  
✅ **CSS Variables**: Variáveis para manter consistência  
✅ **Responsive Design**: Media queries organizadas por dispositivo  
✅ **Code Organization**: Estrutura clara e fácil de manter  
✅ **Naming Conventions**: BEM para nomes de classes  
✅ **Performance**: Minificação e carregamento eficiente  

## Configuração do VS Code (Opcional)

Se você usar VS Code, as configurações em `.vscode/` ajudam a padronizar o ambiente de desenvolvimento:

- Formatação automática com Prettier
- Linting com ESLint e Stylelint
- Configurações de tabulação e line endings
- Extensões recomendadas

## Estrutura de Componentes CSS

### Formulário
- `.form-container`: Container principal
- `.form-section`: Seções do formulário
- `.section-title`: Títulos de seções
- `.form-group`: Grupos de controle
- `.form-control`: Inputs, selects e textareas

### Botões
- `.btn`: Estilo base do botão
- `.btn-primary`: Botão primário
- `.btn-secondary`: Botão secundário

### Cards
- `.card`: Container principal
- `.card-header`: Cabeçalho do card
- `.card-body`: Corpo do card

### Modais
- `.modal`: Container do modal
- `.modal-dialog`: Dialog do modal
- `.modal-content`: Conteúdo do modal
- `.modal-header`: Cabeçalho do modal
- `.modal-body`: Corpo do modal
- `.modal-footer`: Rodapé do modal

## Responsividade

O sistema de grid é baseado em colunas:

- `.col-md-12`: 100% de largura (mobile por padrão)
- `.col-md-6`: 50% de largura (tablet e desktop)
- `.col-md-4`: 33.33% de largura (tablet e desktop)

Media queries:
- **Mobile**: ≤ 576px
- **Tablet**: 577px - 992px
- **Desktop**: ≥ 993px

## Licença

Este projeto é de propriedade da Prefeitura de Fazenda Rio Grande.

---

**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande
