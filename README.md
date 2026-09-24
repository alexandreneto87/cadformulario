# Sistema de Inscrição de Artista - Prefeitura de Fazenda Rio Grande

Sistema completo de inscrição para artistas desenvolvido seguindo as melhores práticas de desenvolvimento web.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-ES6-brightgreen.svg)](https://html5rocks.com)
[![CSS3](https://img.shields.io/badge/CSS3-ES6-brightgreen.svg)](https://www.w3.org/Style/CSS/Overview.en.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-brightgreen.svg)](https://www.ecma-international.org/)
[![VS Code](https://img.shields.io/badge/VS_Code-Recommended-blue.svg)](https://code.visualstudio.com/)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Recursos](#-recursos)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Usar](#-como-usar)
- [Boas Práticas Aplicadas](#-boas-práticas-aplicadas)
- [Configuração do Desenvolvimento](#-configuração-do-desenvolvimento)
- [Validações Implementadas](#-validações-implementadas)
- [Responsividade](#-responsividade)
- [Acessibilidade](#-acessibilidade)
- [Configuração do Servidor](#-configuração-do-servidor)
- [Pacotes e Dependências](#-pacotes-e-dependências)
- [Comandos NPM](#-comandos-npm)
- [Troubleshooting](#-troubleshooting)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🎯 Visão Geral

Este sistema permite que artistas se inscrevam em programas culturais da Prefeitura de Fazenda Rio Grande. O formulário inclui validações avançadas, design responsivo e interface amigável.

**Versão:** 1.0.0  
**Data de lançamento:** Setembro 2026  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande

## ✨ Recursos

### Funcionalidades do Formulário

- ✅ **Validação de Campos**: CPF, Email, CEP, Telefone e URLs
- ✅ **Campos Condicionais**: CNPJ e "Outro Segmento" aparecem apenas quando necessário
- ✅ **Datepicker**: Interface para seleção de datas com formato brasileiro
- ✅ **Select2**: Melhorias no select com busca e seleção
- ✅ **Modal para Anexos**: Janela modal para upload de arquivos
- ✅ **Design Responsivo**: Funciona em mobile, tablet e desktop

### Qualidade de Código

- ✅ **Code Organization**: Separação clara de HTML, CSS e JavaScript
- ✅ **CSS Variables**: Variáveis globais para manter consistência
- ✅ **ESLint & Stylelint**: Validação de código
- ✅ **Prettier**: Formatação automática
- ✅ **EditorConfig**: Configuração padronizada entre editores

### Acessibilidade

- ✅ **HTML Semântico**: Uso correto de tags HTML5
- ✅ **ARIA Labels**: Atributos de acessibilidade
- ✅ **Navegação por Teclado**: Funcionalidade completa sem mouse
- ✅ **Contraste**: Cores com contraste adequado

## 📂 Estrutura do Projeto

```
Teste/
├── 📄 Arquivos Raiz
│   ├── index.html              # Arquivo principal HTML
│   ├── styles/                 # Diretório de CSS
│   │   ├── main.css           # Arquivo principal (importa tudo)
│   │   ├── variables.css      # Variáveis CSS
│   │   ├── reset.css          # Reset/Normalize
│   │   ├── components/        # Componentes CSS
│   │   └── responsive/        # Media queries
│   ├── js/                     # Diretório de JavaScript
│   │   ├── app-config.js      # Configurações
│   │   ├── form-validation.js # Validação
│   │   └── form-init.js       # Inicialização
│   ├── .htaccess              # Configurações Apache
│   ├── .gitignore             # Arquivos ignorados pelo Git
│   ├── package.json           # Dependências
│   └── README.md              # Documentação
│
└── 📁 Configurações de IDE
    └── .vscode/
        ├── settings.json      # Configurações do VS Code
        ├── launch.json        # Configuração de debug
        ├── tasks.json         # Tarefas do VS Code
        ├── extensions.json    # Extensões recomendadas
        └── code-snippets.json # Snippets úteis
```

## 🚀 Como Usar

### Método 1: Apenas Abrir (Rápido)

1. Abra o arquivo `index.html` no seu navegador
2. Preencha os dados obrigatórios (indicados com *)
3. Clique em "Enviar"

### Método 2: Com Servidor Local (Recomendado)

```bash
# Instalar dependências (opcional)
npm install

# Iniciar servidor local
npx http-server . -p 8080

# Ou usar npm
npm start
```

### Método 3: Com Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Método 4: Com Docker (Produção)

```bash
# Construir imagem
docker build -t prefeitura-formulario .

# Executar container
docker run -p 80:80 prefeitura-formulario
```

## ⚙️ Boas Práticas Aplicadas

### Separation of Concerns

- **HTML**: Estrutura semântica
- **CSS**: Estilização modular com variáveis
- **JavaScript**: Lógica separada em módulos

### Code Quality

- **Nomes Descritivos**: Variáveis e funções com nomes claros
- **Funções Únicas**: Cada função tem uma responsabilidade
- **Comentários**: Apenas onde necessário
- **Indentação**: Tab de 4 espaços

### Performance

- **CSS Minificado**: Tamanho reduzido
- **Carregamento Assíncrono**: Scripts não bloqueiam
- **Imagens Responsivas**: Otimização de tamanho
- **Cache**: Configuração de expiry headers

### Segurança

- **Input Sanitization**: Validação de dados
- **HTTPS**: Configuração em .htaccess
- **Headers de Segurança**: Proteção contra ataques
- **XSS Prevention**: Validação de inputs

## 🛠️ Configuração do Desenvolvimento

### VS Code (Recomendado)

O projeto inclui configurações prontas para VS Code:

1. Abra o projeto no VS Code
2. As configurações serão aplicadas automaticamente
3. Instale as extensões recomendadas quando solicitado

### Extensões Recomendadas

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Live Server (ritwickdey.live-server)
- HTML hint (htmlhint team)

### Snippets Disponíveis

| Prefixo | Descrição |
|---------|-----------|
| `html5` | Estrutura HTML5 básica |
| `form-section` | Cria seção de formulário |
| `form-group` | Cria grupo de formulário |
| `select` | Cria componente select |
| `btn-primary` | Cria botão primário |
| `card` | Cria componente card |
| `modal` | Cria modal Bootstrap |
| `form-check` | Cria checkbox |
| `row` | Cria container de linha |
| `col-md` | Cria coluna do grid |

## 🧪 Validações Implementadas

### Validação de Email
- Formato válido (user@example.com)
- Domínio existente
- Não permite espaços

### Validação de CPF
- 11 dígitos numéricos
- Algoritmo matemático
- Evita números repetidos

### Validação de CEP
- 8 dígitos numéricos
- Formato 00000-000
- Pode integrar com API ViaCEP

### Validação de Telefone
- 10 a 11 dígitos
- Formato (00) 00000-0000
- Suporte para WhatsApp

### Validação de URLs
- Formato http/https
- Domínio válido
- Path opcional

### Validação de Campos Condicionais
- CNPJ aparece apenas quando "Sim" é selecionado
- "Outro Segmento" aparece quando a opção "Outro" é marcada

### Validação de Data
- Formato dd/mm/aaaa
- Data futura permitida
- Data de nascimento menor que data atual

## 📱 Responsividade

### Breakpoints

| Dispositivo | Largura Máxima | Colunas |
|-------------|----------------|---------|
| Mobile | 576px | 100% |
| Tablet | 768px | 50% |
| Desktop | 992px+ | 33.33% / 50% / 100% |

### Media Queries

```css
/* Mobile (padrão) */
@media (max-width: 576px) { ... }

/* Tablet */
@media (min-width: 577px) and (max-width: 992px) { ... }

/* Desktop */
@media (min-width: 993px) { ... }
```

## ♿ Acessibilidade

### ARIA Labels

```html
<label class="form-label" for="cpf_insc">
    CPF do artista/responsável <span class="text-red">*</span>
</label>
<input type="text" id="cpf_insc" name="cpf_insc" required>
```

### Navegação por Teclado

- Tab: Avança para o próximo elemento
- Shift + Tab: Retorna ao elemento anterior
- Enter: Seleciona opções
- Space: Seleciona checkboxes

### Contraste de Cores

- Texto: #333 (minimo 4.5:1)
- Fundo: #fff
- Links: #007bff (sublinhado ao hover)

### Formulário Acessível

- Labels associados aos inputs
- Mensagens de erro claras
- Indicação de campos obrigatórios
- Ordem lógica de navegação

## 🖥️ Configuração do Servidor

### Apache (.htaccess)

O projeto inclui um arquivo `.htaccess` com:

- Redirecionamento de URLs
- Proteção de arquivos sensíveis
- Compressão Gzip
- Configuração de cache
- Headers de segurança

### Configurações de Segurança

```apache
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

## 📦 Pacotes e Dependências

### Dependências de Desenvolvimento

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| stylelint | ^16.0.0 | Linting de CSS |
| stylelint-config-recommended | ^13.0.0 | Configuração recomendada |
| eslint | ^8.0.0 | Linting de JavaScript |
| prettier | ^3.0.0 | Formatação de código |

### Instalação

```bash
npm install
```

## 📝 Comandos NPM

| Comando | Descrição |
|---------|-----------|
| `npm start` | Iniciar servidor local |
| `npm run lint:css` | Validar CSS |
| `npm run lint:js` | Validar JavaScript |
| `npm run lint` | Validar ambos |
| `npm run format` | Formatar código |
| `npm run format:check` | Verificar formatação |
| `npm run build` | Build do projeto |
| `npm test` | Executar testes |

## 🔧 Troubleshooting

### Erro: "Cannot find module"

**Solução:** Instale as dependências
```bash
npm install
```

### Erro: "Port already in use"

**Solução:** Use outra porta
```bash
npx http-server . -p 8081
```

### CSS não carregando

**Solução:** Verifique o caminho do CSS no HTML
```html
<link rel="stylesheet" href="styles/main.css">
```

### JavaScript não funcionando

**Solução:** Verifique se o script foi carregado
```html
<script src="js/app-config.js"></script>
```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas changes
4. Push para a branch
5. Abra um Pull Request

### Guidelines

- Siga o estilo de código existente
- Adicione testes para novas funcionalidades
- Atualize a documentação se necessário
- Mantenha commits organizados

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

```
MIT License

Copyright (c) 2026 Prefeitura de Fazenda Rio Grande

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contato

**Email:** culturafazenda@gmail.com  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande

---

[![Build Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)]()
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-brightgreen.svg)](https://code.visualstudio.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
