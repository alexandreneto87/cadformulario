# 📚 Índice de Arquivos do Projeto

## 📄 Arquivos Principais (Acessar Primeiro)

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **index.html** | Arquivo principal HTML do formulário | [Abrir](./index.html) |
| **README.md** | Documentação principal do projeto | [Abrir](./README.md) |
| **package.json** | Configuração do projeto e dependências | [Abrir](./package.json) |
| **.htaccess** | Configurações do servidor Apache | [Abrir](./.htaccess) |

---

## 📁 Arquivos de CSS

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **styles/main.css** | Arquivo principal (importa todos os outros) | [Abrir](./styles/main.css) |
| **styles/variables.css** | Variáveis CSS globais (cores, tipografia) | [Abrir](./styles/variables.css) |
| **styles/form.css** | Estilos principais do formulário | [Abrir](./styles/form.css) |
| **styles/reset.css** | Reset/Normalize CSS | [Abrir](./styles/reset.css) |
| **styles/index.css** | Índice de imports dos CSS | [Abrir](./styles/index.css) |

### 📂 Componentes CSS

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **components/form.css** | Estilos do formulário | [Abrir](./styles/components/form.css) |
| **components/buttons.css** | Estilos de botões | [Abrir](./styles/components/buttons.css) |
| **components/cards.css** | Estilos de cards | [Abrir](./styles/components/cards.css) |
| **components/modals.css** | Estilos de modais | [Abrir](./styles/components/modals.css) |

### 📂 Responsividade (Media Queries)

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **responsive/mobile.css** | Estilos para mobile | [Abrir](./styles/responsive/mobile.css) |
| **responsive/tablet.css** | Estilos para tablet | [Abrir](./styles/responsive/tablet.css) |
| **responsive/desktop.css** | Estilos para desktop | [Abrir](./styles/responsive/desktop.css) |

---

## 📁 Arquivos de JavaScript

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **js/app-config.js** | Configurações centralizadas | [Abrir](./js/app-config.js) |
| **js/form-validation.js** | Validação do formulário | [Abrir](./js/form-validation.js) |
| **js/form-init.js** | Inicialização do formulário | [Abrir](./js/form-init.js) |

---

## 📁 Configurações de IDE (VS Code)

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **.vscode/settings.json** | Configurações do editor | [Abrir](./.vscode/settings.json) |
| **.vscode/launch.json** | Configuração de debug | [Abrir](./.vscode/launch.json) |
| **.vscode/tasks.json** | Configuração de tarefas | [Abrir](./.vscode/tasks.json) |
| **.vscode/extensions.json** | Extensões recomendadas | [Abrir](./.vscode/extensions.json) |
| **.vscode/code-snippets.json** | Snippets úteis | [Abrir](./.vscode/code-snippets.json) |

---

## 📁 Configurações de Qualidade de Código

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **.gitignore** | Arquivos ignorados pelo Git | [Abrir](./.gitignore) |
| **.eslintrc.json** | Configuração do ESLint | [Abrir](./.eslintrc.json) |
| **.stylelintrc.json** | Configuração do Stylelint | [Abrir](./.stylelintrc.json) |
| **.prettierrc.json** | Configuração do Prettier | [Abrir](./.prettierrc.json) |
| **.editorconfig** | Configuração de editor padronizada | [Abrir](./.editorconfig) |
| **.stylelintignore** | Arquivos ignorados pelo Stylelint | [Abrir](./.stylelintignore) |

---

## 📁 Documentação

| Arquivo | Descrição | Acessar |
|---------|-----------|---------|
| **README.md** | Documentação principal completa | [Abrir](./README.md) |
| **ESTRUTURA.md** | Documentação da estrutura de diretórios | [Abrir](./ESTRUTURA.md) |
| **DOCUMENTACAO.md** | Documentação técnica detalhada | [Abrir](./DOCUMENTACAO.md) |
| **CHANGELOG.md** | Histórico de mudanças do projeto | [Abrir](./CHANGELOG.md) |
| **LICENCA.md** | Licença do projeto | [Abrir](./LICENCA.md) |
| **RESUMO_PROJETO.md** | Resumo final do projeto | [Abrir](./RESUMO_PROJETO.md) |

---

## 📊 Sumário Rápido

### Para Desenvolvedores

1. **Início Rápido:**
   - Abra `index.html` no navegador
   - Ou use: `npx http-server . -p 8080`

2. **Configuração:**
   - VS Code: Instale as extensões recomendadas
   - Dependências: `npm install`

3. **Qualidade de Código:**
   - Lint CSS: `npm run lint:css`
   - Lint JS: `npm run lint:js`
   - Formatar: `npm run format`

### Para Entendedores

- **Formulário:** Preenchimento de dados de artistas
- **Validações:** CPF, Email, CEP, Telefone, URLs
- **Responsivo:** Funciona em mobile, tablet e desktop
- **Acessível:** Navegação por teclado e ARIA labels

### Estrutura de Arquivos

```
Teste/
├── index.html              # Arquivo principal (ENTRAR AQUI)
├── styles/
│   ├── main.css           # Importa todos os CSS
│   ├── variables.css      # Variáveis globais
│   ├── components/        # Componentes CSS
│   └── responsive/        # Media queries
├── js/
│   ├── app-config.js      # Configurações
│   ├── form-validation.js # Validação
│   └── form-init.js       # Inicialização
└── .vscode/               # Configurações IDE
```

---

## 🔍 Como Navegar

### Se é seu primeiro acesso:
1. Leia `README.md` para entender o projeto
2. Abra `index.html` no navegador
3. Experimente o formulário

### Se vai desenvolver:
1. Configure VS Code com as extensões recomendadas
2. Instale dependências: `npm install`
3. Configure `.htaccess` para seu servidor
4. Implemente o backend para processar o formulário

### Se vai manter o código:
1. Siga o padrão de nomes nas variáveis
2. Use variáveis CSS para cores e configurações
3. Adicione validações em `js/form-validation.js`
4. Atualize a documentação se necessário

---

## 📞 Suporte

**Email:** culturafazenda@gmail.com  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande

---

**Versão:** 1.0.0  
**Data:** Setembro 2026  
**Status:** Concluído ✅
