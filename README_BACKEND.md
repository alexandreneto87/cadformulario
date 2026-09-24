# 🎯 Backend Serverless Simplificado com Database Webhook

## 📋 Visão Rápida

| Componente | Tecnologia | Custo | Escalabilidade |
|------------|------------|-------|----------------|
| Banco de Dados | PostgreSQL | Gratis (500MB) | Ilimitada |
| Storage | Supabase Storage | Gratis (2GB) | Ilimitada |
| Backend | Database Webhook | Gratis (100k req) | Ilimitada |
| Email | Resend | Gratis (3k emails/mês) | Ilimitada |

**Total:** **$0/mês** para projetos pequenos/médios

---

## 🚀 Arquitetura Simplificada

### Antes (3 Edge Functions - RUIM)
```
Frontend → Upload File → Edge Function 1 → Storage
Frontend → Insert Data → Edge Function 2 → Database
Frontend → Send Email → Edge Function 3 → Email Service
```
**Problema:** Se faltar internet após o upload, arquivo fica no Storage mas não no banco!

### Depois (1 Edge Function - BOM)
```
Frontend → Upload File → Storage (direto)
Frontend → Insert Data → Database (direto)
Database → Webhook Trigger → Edge Function 1 → Email Service
```
**Vantagem:** Email só é enviado SE o dado chegar ao banco!

---

## 📂 Estrutura de Arquivos (Revisada)

```
Teste/
├── supabase/
│   ├── database.sql                    # SQL com tabelas, RLS e Webhook
│   └── functions/
│       └── send-email/                 # ÚNICA Edge Function
│           └── index.ts
├── js/
│   ├── artist-form.js                  # Frontend com Supabase SDK
│   └── spam-protection.js              # Cloudflare Turnstile
├── .env.local                          # Variáveis de ambiente (preecher)
├── package.json                        # Dependências
└── .gitignore                          # Proteção de credenciais
```

---

## 🚀 Passo a Passo para Implementar

### Passo 1: Configurar Supabase (10 minutos)

```bash
# Instalar CLI
npm install -g supabase

# Fazer login
supabase login

# Linkar projeto
supabase link --project-ref seu-projeto-id
```

### Passo 2: Executar SQL (2 minutos)

1. Acesse **Dashboard > SQL Editor**
2. Copie o conteúdo de `supabase/database.sql`
3. Clique em **Run**

### Passo 3: Criar Storage (1 minuto)

1. Acesse **Dashboard > Storage**
2. **Create Bucket**
3. Name: `artist-submissions`
4. Public: **NO** ⚠️ Importante!

### Passo 4: Deploy Única Edge Function (3 minutos)

```bash
# Deploy da única função
supabase functions deploy send-email

# Configurar variáveis de ambiente
supabase secrets set SUPABASE_SERVICE_KEY=sua-service-key
supabase secrets set EMAILJS_SERVICE_ID=seu-service-id
supabase secrets set EMAILJS_TEMPLATE_ID=seu-template-id
supabase secrets set EMAILJS_PUBLIC_KEY=sua-public-key
supabase secrets set RESEND_API_KEY=re_sua-api-key
```

### Passo 5: Configurar Frontend (5 minutos)

#### 5.1 Adicionar ao HTML

No seu `index.html`, adicione antes do fechamento `</body>`:

```html
<!-- Container para Turnstile (anti-spam) -->
<div id="turnstile-container" class="mb-3"></div>

<!-- Container para mensagens de status -->
<div id="status-container" style="display: none;">
    <div id="status-message" class="alert mb-3"></div>
</div>

<!-- Scripts -->
<script type="module" src="js/artist-form.js"></script>
<script type="module" src="js/spam-protection.js"></script>
```

#### 5.2 Criar `.env.local`

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-do-dashboard
VITE_EMAILJS_SERVICE_ID=seu-service-id
VITE_EMAILJS_TEMPLATE_ID=seu-template-id
VITE_EMAILJS_PUBLIC_KEY=sua-public-key
```

#### 5.3 Adicionar Input de Arquivo ao Formulário

Adicione este input ao seu formulário:

```html
<div class="form-group">
    <label class="form-label">Curriculum (PDF, JPG ou PNG) <span class="text-red">*</span></label>
    <input type="file" class="form-control" id="arquivo_curriculum" accept=".pdf,.jpg,.jpeg,.png" required>
</div>
```

---

## 🔒 Segurança "Secure by Default"

### O Que Já Está Implementado

| Segurança | Implementação | Status |
|-----------|---------------|--------|
| Row Level Security | PostgreSQL RLS | ✅ |
| Validação Frontend | JavaScript | ✅ |
| Validação Backend | SQL Constraints | ✅ |
| Bucket Privado | Supabase Storage | ✅ |
| Anti-Spam | Cloudflare Turnstile | ✅ |
| Logging | Audit Logs | ✅ |
| Database Webhook | Trigger Automático | ✅ |
| Consistência de Dados | ACID Transactions | ✅ |

### Por que Esta Arquitetura é Melhor?

1. **Menos Código para Manter**: Removemos as Edge Functions de upload e insert
2. **Consistência de Dados**: Email só é disparado se o dado chegar ao banco
3. **Menos Requisições Pagas**: 1 Edge Function ao invés de 3 (triplica sua margem)
4. **Menos Ponto de Falha**: Menos requisições = menos chances de falha parcial
5. **Melhor Performance**: Upload direto para Storage é mais rápido

---

## 📊 Comparativo: Antes e Depois

| Aspecto | Antes (Original) | Depois (Backend Serverless Simplificado) |
|---------|------------------|-------------------------------------------|
| **Backend** | None | Edge Function + PostgreSQL com Webhook |
| **Database** | None | PostgreSQL com RLS |
| **Storage** | None | Supabase Storage |
| **Validação** | Apenas frontend | Frontend + Backend (SQL Constraints) |
| **Segurança** | Baixa | Alta (Secure by Default) |
| **Escalabilidade** | Manual | Ilimitada (Serverless) |
| **Custo** | $0 | $0 (planos gratuitos) |
| **Edge Functions** | 3 | 1 |
| **Ponto de Falha** | 3 (upload, insert, email) | 1 (email) |
| **Consistência** | Parcial (falha parcial possível) | Total (transactional) |

---

## 🧪 Testes

### Teste 1: Banco de Dados

No **Dashboard > SQL Editor**:
```sql
-- Ver se a tabela foi criada
SELECT * FROM artist_submissions LIMIT 1;

-- Ver audit logs
SELECT * FROM audit_logs LIMIT 1;
```

### Teste 2: Storage

1. Acesse **Dashboard > Storage > artist-submissions**
2. Verifique se os arquivos estão sendo salvos

### Teste 3: Formulário Completo

1. Acesse seu site
2. Preencha o formulário
3. Faça upload de um arquivo (PDF, JPG ou PNG)
4. Complete o Turnstile
5. Clique em "Enviar"
6. Verifique:
   - Mensagem de sucesso no frontend
   - Dados no **Dashboard > Database**
   - Arquivo no **Dashboard > Storage**
   - E-mail na caixa de entrada (aprox. 1-2 minutos)

---

## 📚 Documentação Completa

- **`INSTRUCOES_IMPLEMENTACAO.md`** - Instruções detalhadas (versão antiga)
- **`README_BACKEND.md`** - Documentação rápida (versão antiga)
- **`BACKEND_DOCUMENTACAO.md`** - Documentação completa (versão antiga)

---

## ⚠️ Importante: Chaves de API

| Chave | Onde Usar | Segurança |
|-------|-----------|-----------|
| `SUPABASE_SERVICE_KEY` | Backend (Edge Function) | ✅ Secret (nunca no frontend) |
| `SUPABASE_ANON_KEY` | Frontend | ✅ Seguro para expor |
| `TURNSTILE_SECRET_KEY` | Backend | ✅ Secret (edge function) |
| `TURNSTILE_SITE_KEY` | Frontend | ✅ Seguro para expor |

---

## 🐛 Troubleshooting

### Erro: "Function not found"
```bash
# Re-deploy
supabase functions deploy send-email
```

### Erro: "RLS policy violation"
```sql
-- Verificar políticas
SELECT * FROM pg_policies WHERE tablename = 'artist_submissions';
```

### Erro: "Bucket not found"
- Crie o bucket manualmente no Dashboard
- Storage > Create Bucket > artist-submissions > Public: NO

### Erro: "Email not sent"
- Verifique se as variáveis de ambiente estão configuradas
- Verifique os logs da Edge Function
- Teste o serviço de email separadamente

---

## 📞 Suporte

- **Email:** culturafazenda@gmail.com
- **Supabase Docs:** https://supabase.com/docs
- **Discord:** https://discord.supabase.com

---

## ✅ Checklist de Implementação

- [ ] Criar conta no Supabase
- [ ] Criar projeto
- [ ] Executar `database.sql`
- [ ] Criar bucket `artist-submissions` (privado)
- [ ] Deploy da Edge Function `send-email`
- [ ] Configurar variáveis de ambiente
- [ ] Configurar `.env.local`
- [ ] Adicionar input de arquivo ao formulário
- [ ] Adicionar scripts ao HTML
- [ ] Configurar Cloudflare Turnstile
- [ ] Configurar EmailJS/Resend
- [ ] Testar formulário completo
- [ ] Testar upload de arquivos
- [ ] Testar envio de e-mail
- [ ] Deploy em produção

---

**Versão:** 1.0.0 (Arquitetura Simplificada)  
**Data:** Setembro 2026  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande

---

## 🎉 Pronto!

Seu backend serverless simplificado está implementado com:
- ✅ PostgreSQL (banco de dados)
- ✅ Database Webhook (trigger automático)
- ✅ Supabase Storage (arquivos)
- ✅ Email transacional
- ✅ Proteção anti-spam
- ✅ Segurança "Secure by Default"

**Total de custo:** $0/mês (Free Tier)  
**Escalabilidade:** Ilimitada  
**Performance:** Serverless (auto-scaling)  
**Edge Functions:** 1 (ao invés de 3)

---

**BOA SORTE COM SEU PROJETO! 🚀**
