# Backend Serverless com Supabase - Documentação Completa

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Pré-requisitos](#-pré-requisitos)
3. [Passo a Passo - Configuração do Supabase](#-passo-a-passo---configuração-do-supabase)
4. [Integração Frontend](#-integração-frontend)
5. [Notificação por E-mail](#-notificação-por-e-mail)
6. [Proteção e Boas Práticas](#-proteção-e-boas-práticas)
7. [Deploy e Produção](#-deploy-e-produção)

---

## 🎯 Visão Geral

Este documento descreve a implementação completa do backend serverless para o sistema de inscrição de artistas, utilizando:

- **Supabase**: Banco de dados PostgreSQL + Storage
- **Supabase Edge Functions**: Backend sem servidor
- **EmailJS/Resend**: Envio de e-mails transacionais
- **Cloudflare Turnstile**: Proteção anti-spam

### Arquitetura

```
┌─────────────┐     ┌────────────────────┐     ┌─────────────────┐
│   Frontend  │────>│ Supabase Edge      │────>│ PostgreSQL      │
│ (HTML/JS)   │     │ Functions          │     │ (Banco de Dados)│
└─────────────┘     └────────────────────┘     └─────────────────┘
                                         │
                                         ├────>│ Supabase Storage│
                                         │     │ (Arquivos)      │
                                         │     └─────────────────┘
                                         │
                                         ├────>│ Email Service   │
                                         │     │ (EmailJS/Resend)│
                                         │     └─────────────────┘
```

---

## 🔧 Pré-requisitos

1. **Conta no Supabase**
   - Crie em: https://supabase.com
   - Plano Free suficiente para este projeto

2. **Conta no EmailJS** (ou Resend)
   - EmailJS: https://www.emailjs.com
   - Resend: https://resend.com

3. **Conta no Cloudflare** (opcional, para Turnstile)
   - https://www.cloudflare.com

4. **Node.js e npm**
   - Versão 18+ recomendada

---

## 🚀 Passo a Passo - Configuração do Supabase

### Passo 1: Criar o Projeto

1. Acesse https://supabase.com/dashboard
2. Clique em "New Project"
3. Preencha as informações:
   - Name: `artistas-fazenda`
   - Database Password: `sua-senha-segura`
   - Region: `us-east-1` (ou mais próximo de você)
4. Espere o provisionamento (~3-5 minutos)

### Passo 2: Configurar o Banco de Dados

1. No Dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase/database.sql`
4. Clique em **Run** para executar

### Passo 3: Configurar o Storage

1. Vá em **Storage** no menu lateral
2. Clique em **Create Bucket**
3. Preencha:
   - Name: `artist-submissions`
   - Public: **NO** (importante - manter privado)
4. Clique em **Create Bucket**

### Passo 4: Configurar Edge Functions

1. Instale o Supabase CLI:
```bash
npm install -g supabase
```

2. Faça login:
```bash
supabase login
```

3. Link seu projeto:
```bash
supabase link --project-ref seu-projeto-id
```

4. Crie as funções:
```bash
# Função para inserir submissões
supabase functions deploy insert-artist-submission

# Função para upload de arquivos
supabase functions deploy upload-file

# Função para envio de e-mail
supabase functions deploy send-email
```

### Passo 5: Configurar Variáveis de Ambiente

Para cada função, configure as variáveis de ambiente:

```bash
# Função insert-artist-submission
supabase secrets set SUPABASE_SERVICE_KEY=seu-service-key

# Função upload-file
supabase secrets set SUPABASE_SERVICE_KEY=seu-service-key

# Função send-email (EmailJS)
supabase secrets set EMAILJS_SERVICE_ID=seu-service-id
supabase secrets set EMAILJS_TEMPLATE_ID=seu-template-id
supabase secrets set EMAILJS_PUBLIC_KEY=sua-public-key

# OU (Resend)
supabase secrets set RESEND_API_KEY=re_seu-api-key
```

### Passo 6: Obter Credenciais para Frontend

1. Vá em **Settings > API**
2. Copie:
   - **Project URL**: `https://seu-projeto.supabase.co`
   - **anon/public key**: `eyJhbGci...`

---

## 💻 Integração Frontend

### Passo 1: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_FUNCTION_URL=https://seu-projeto.supabase.co/functions/v1
VITE_TURNSTILE_ENABLED=true
VITE_TURNSTILE_SITE_KEY=your-turnstile-site-key
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

### Passo 2: Incluir JavaScript no HTML

Adicione ao seu `index.html`:

```html
<!-- Configuração -->
<script type="module">
    import { ArtistForm } from './js/artist-form.js';
    import { SpamProtection } from './js/spam-protection.js';
    
    document.addEventListener('DOMContentLoaded', () => {
        // Inicializar formulário
        const form = new ArtistForm();
        
        // Se usar Turnstile, adicionar container
        const turnstileContainer = document.getElementById('turnstile-container');
        if (turnstileContainer) {
            const spamProtection = new SpamProtection();
            spamProtection.render('turnstile-container');
        }
    });
</script>

<!-- Container para Turnstile (opcional) -->
<div id="turnstile-container" class="mb-3"></div>

<!-- Container para mensagens de status -->
<div id="status-container" style="display: none;">
    <div id="status-message" class="alert"></div>
</div>
```

### Passo 3: Estilos CSS para Status

```css
.status-container {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.status-container.loading {
    background-color: #e3f2fd;
    border: 1px solid #2196f3;
    color: #1565c0;
}

.status-container.success {
    background-color: #e8f5e9;
    border: 1px solid #4caf50;
    color: #2e7d32;
}

.status-container.error {
    background-color: #ffebee;
    border: 1px solid #f44336;
    color: #c62828;
}
```

---

## 📧 Notificação por E-mail

### Opção 1: EmailJS

1. Crie uma conta em https://www.emailjs.com
2. Crie um **Email Service** (conecte seu Gmail/Outlook)
3. Crie um **Email Template**:
```html
<div>
    <h2>Obrigado por se inscrever!</h2>
    <p>Prezado(a) {{to_name}},</p>
    <p>Sua inscrição no programa de artistas foi recebida com sucesso.</p>
    <p>Nossa equipe entrará em contato em breve.</p>
    <p>Atenciosamente,<br>Prefeitura de Fazenda Rio Grande</p>
</div>
```
4. Copie Service ID, Template ID e Public Key
5. Configure no `.env.local` e nas Edge Functions

### Opção 2: Resend (Recomendado)

1. Crie uma conta em https://resend.com
2. Crie uma API Key (grátis até 3.000 emails/mês)
3. Configure no `.env.local` e nas Edge Functions
4. Resend oferece melhor tracking e analytics

---

## 🔒 Proteção e Boas Práticas

### 1. Proteção de Chaves de API

#### ❌ NUNCA Faça:
- Commitar chaves em repositórios públicos
- Usar chaves de admin no frontend
- Expor variáveis de ambiente no código

#### ✅ Sempre Faça:
- Usar `.env.local` para desenvolvimento
- Manter `.env` e `.env.local` no `.gitignore`
- Usar chaves anon no frontend
- Usar chaves service no backend (Edge Functions)

### 2. Proteção Anti-Spam (Cloudflare Turnstile)

1. Crie uma conta no Cloudflare
2. Acesse **Turnstile** no menu
3. Crie um novo widget:
   - Domain: `localhost` (desenvolvimento)
   - Domain: `seudominio.com` (produção)
4. Copie Site Key e Secret Key
5. Configure no `.env.local`:
```env
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAAx0x00000000000
VITE_TURNSTILE_SECRET_KEY=0x4AAAAAAAx0x00000000000xxxxxxxxxxxxx
```

6. Adicionar ao formulário:
```html
<div id="turnstile-container" class="mb-3"></div>
```

### 3. Segurança de Arquivos

#### No Frontend:
- Limitar tamanho de arquivo (5MB)
- Validar tipo de arquivo (PDF, JPG, PNG)
- Sanitizar nomes de arquivos

#### No Backend (Edge Function):
- Verificar tamanho e tipo antes de salvar
- Gerar nomes únicos para arquivos
- Manter bucket privado

### 4. Row Level Security (RLS)

Já configurado no SQL:
- `anon`: Apenas INSERT (com validações)
- `authenticated`: SELECT, UPDATE, DELETE (apenas admin)

### 5. Input Validation

Todas as validações estão em dois níveis:

#### Frontend:
- Validação de campos obrigatórios
- Validação de formatos (email, CPF, telefone, etc.)
- Mensagens de erro amigáveis

#### Backend:
- Schema validation com Zod
- Sanitização de inputs
- Validação de tamanho de arquivos
- Prevenção de SQL injection (já protegido pelo Supabase)

### 6. Logging e Auditoria

O SQL já inclui:
- Tabela `audit_logs` para rastreamento
- Trigger em `artist_submissions`
- Registros de: INSERT, UPDATE, DELETE
- Informações: usuário, IP, timestamp, dados anteriores/novos

---

## 🚀 Deploy e Produção

### Passo 1: Build do Projeto

```bash
# Instalar dependências
npm install

# Build para produção
npm run build
```

### Passo 2: Deploy no Hosting

#### Opção 1: Vercel (Recomendado)

```bash
# Instalar CLI
npm install -g vercel

# Deploy
vercel
```

#### Opção 2: Netlify

```bash
# Drag and drop o diretório dist/
# Ou configurar com Netlify CLI
netlify deploy --prod
```

#### Opção 3: Supabase Studio

1. Vá em **SQL Editor**
2. Execute queries para inserir dados de teste
3. Gerencie através da interface visual

### Passo 3: Configurar Variáveis em Produção

No Dashboard do Supabase:
1. Vá em **Settings > Environment Variables**
2. Adicione todas as variáveis necessárias:
   - `SUPABASE_SERVICE_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `RESEND_API_KEY` (se usar Resend)

### Passo 4: Configurar Domain Personalizado

1. No **Settings > Custom Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Aguarde propagação (~24 horas)

---

## 🧪 Testes

### Teste Manual

1. **Teste de Insert**:
   - Preencha o formulário
   - Verifique no PostgreSQL: `SELECT * FROM artist_submissions;`

2. **Teste de Upload**:
   - Anexe um arquivo PDF/IMG
   - Verifique no Storage: `artist_submissions`

3. **Teste de Email**:
   - Verifique se o e-mail chegou
   - Verifique o log do Edge Function

### Teste de Segurança

1. **Teste RLS**:
   ```sql
   -- Deve falhar (anon não pode SELECT)
   SELECT * FROM artist_submissions;
   ```

2. **Teste Turnstile**:
   - Acesse o formulário
   - Complete o captcha
   - Verifique se o token é validado

---

## 📊 Monitoramento

### Logs do Edge Functions

No Supabase Dashboard:
1. Vá em **Edge Functions**
2. Clique em uma função
3. Acesse **Logs** para ver execuções

### Métricas

Supabase oferece:
- Contagem de requests
- Tempo de resposta
- Erros

### Alertas

Configure alerts no Supabase:
1. **Settings > Alerts**
2. Adicione alertas para:
   - Erros nas Edge Functions
   - Uso de Storage acima de X
   - Queda de disponibilidade

---

## 🎯 Checklist de Segurança

- [ ] Chaves de API protegidas em `.env`
- [ ] `.gitignore` configurado para não commitar sensíveis
- [ ] RLS ativado na tabela
- [ ] Bucket de Storage privado
- [ ] Turnstile implementado
- [ ] Validação dupla (frontend + backend)
- [ ] Logging de auditoria ativo
- [ ] Limitação de tamanho de arquivos
- [ ] Validação de tipos de arquivos
- [ ] Tratamento de erros apropriado
- [ ] HTTPS obrigatório
- [ ] Headers de segurança configurados

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions](https://supabase.com/docs/guides/functions)
- [Storage](https://supabase.com/docs/guides/storage)
- [RLS](https://supabase.com/docs/guides/auth/row-level-security)

### Tutoriais Recomendados

- [Building a Secure Backend with Supabase](https://supabase.com/blog/supabase-backend)
- [File Uploads with Supabase Storage](https://supabase.com/blog/file-uploads)
- [Serverless Email with Edge Functions](https://supabase.com/blog/serverless-email)

---

## 🆘 Troubleshooting

### Erro: "Bucket already exists"
```bash
# Apagar bucket (cuidado!)
supabase storage ls artist-submissions
```

### Erro: "Function not found"
```bash
# Deploy novamente
supabase functions deploy function-name
```

### Erro: "Invalid API Key"
- Verifique as variáveis de ambiente
- Redeploy da função após configurar secrets

### Erro: "RLS policy violation"
- Verifique as políticas no SQL
- Teste com `auth.role() = 'authenticated'`

---

## 📞 Suporte

- **Email:** culturafazenda@gmail.com
- **Supabase Docs:** https://supabase.com/docs
- **Community:** https://discord.supabase.com

---

**Versão:** 1.0.0  
**Data:** Setembro 2026  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande
