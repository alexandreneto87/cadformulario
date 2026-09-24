# Backend Serverless - Resumo Rápido

## 📋 Estrutura de Arquivos Criada

```
Teste/
├── supabase/
│   ├── database.sql                    # SQL com tabelas e RLS
│   └── functions/
│       ├── insert-artist-submission/   # Edge Function 1
│       │   └── index.ts
│       ├── upload-file/                # Edge Function 2
│       │   └── index.ts
│       └── send-email/                 # Edge Function 3
│           └── index.ts
├── js/
│   ├── artist-form.js                  # Frontend principal
│   ├── spam-protection.js              # Cloudflare Turnstile
│   └── app-config.js                   # Configuração
├── .env.example                        # Exemplo de variáveis
├── .env.local.example                  # Exemplo local
├── package.json                        # Dependências
├── vite.config.js                      # Configuração Vite
└── .gitignore                          # Proteção de credenciais
```

---

## 🚀 Passos Rápidos para Implementar

### 1. Configurar Supabase (5 minutos)

```bash
# Instalar CLI
npm install -g supabase

# Fazer login
supabase login

# Linkar projeto
supabase link --project-ref seu-projeto-id

# Executar SQL
# Abra SQL Editor no Dashboard → Run database.sql
```

### 2. Criar Storage (2 minutos)

1. Dashboard → **Storage**
2. **Create Bucket**
3. Name: `artist-submissions`
4. Public: **NO**

### 3. Criar Edge Functions (3 minutos)

```bash
# Função 1: Inserir dados
supabase functions deploy insert-artist-submission

# Função 2: Upload de arquivos
supabase functions deploy upload-file

# Função 3: Enviar email
supabase functions deploy send-email
```

### 4. Configurar Variáveis de Ambiente (2 minutos)

```bash
# Para cada função
supabase secrets set SUPABASE_SERVICE_KEY=sua-chave
supabase secrets set EMAILJS_SERVICE_ID=seu-service-id
supabase secrets set EMAILJS_TEMPLATE_ID=seu-template-id
supabase secrets set EMAILJS_PUBLIC_KEY=sua-public-key

# OU Resend
supabase secrets set RESEND_API_KEY=re_sua-api-key
```

### 5. Configurar Frontend (1 minuto)

No seu HTML:
```html
<!-- Scripts -->
<script type="module" src="js/artist-form.js"></script>
<script type="module" src="js/spam-protection.js"></script>

<!-- Container Turnstile -->
<div id="turnstile-container"></div>

<!-- Container status -->
<div id="status-container">
    <div id="status-message"></div>
</div>
```

### 6. Configurar Variáveis Locais (1 minuto)

Crie `.env.local`:
```env
VITE_SUPABASE_FUNCTION_URL=https://seu-projeto.supabase.co/functions/v1
VITE_TURNSTILE_ENABLED=true
VITE_TURNSTILE_SITE_KEY=sua-site-key
VITE_EMAILJS_SERVICE_ID=seu-service-id
VITE_EMAILJS_TEMPLATE_ID=seu-template-id
VITE_EMAILJS_PUBLIC_KEY=sua-public-key
```

---

## 🔐 Segurança "Secure by Default"

### ✅ O Que Já Está Implementado:

1. **Row Level Security (RLS)**
   - `anon`: Apenas INSERT
   - `authenticated`: SELECT, UPDATE, DELETE
   - Validado no banco de dados

2. **Edge Functions**
   - Chaves de API protegidas (não no frontend)
   - Validação dupla (Zod schema)
   - Logging automático

3. **Storage**
   - Bucket privado
   - Verificação de tamanho (5MB)
   - Validação de tipos (PDF, JPG, PNG)

4. **Input Validation**
   - Frontend: Validado antes do envio
   - Backend: Validado com Zod
   - Prevenção de SQL injection

5. **Anti-Spam**
   - Cloudflare Turnstile
   - Token verification
   - Rate limiting (configurável)

6. **Auditoria**
   - Tabela `audit_logs`
   - Trigger em `artist_submissions`
   - Rastreamento completo

---

## 📊 Comparativo: Antes e Depois

| Aspecto | Antes (Original) | Depois (Backend Serverless) |
|---------|------------------|----------------------------|
| **Backend** | None | Edge Functions + PostgreSQL |
| **Storage** | None | Supabase Storage |
| **Database** | None | PostgreSQL com RLS |
| **Validação** | Apenas frontend | Frontend + Backend |
| **Segurança** | Baixa | Alta (Secure by Default) |
| **Escalabilidade** | Limitada | Ilimitada (Serverless) |
| **Custo** | $0 (só frontend) | $0 (planos gratuitos) |
| **Scalability** | Manual | Automática |
| **Monitoring** | None | Logs e metrics |

---

## 🎯 Custos (Grátis para início)

### Supabase Free Tier:
- **Database**: 500MB storage, 2GB transfer/mês
- **Storage**: 2GB, 2GB transfer/mês
- **Edge Functions**: 100k requests/mês
- **Email (Resend)**: 3k emails/mês
- **Total**: **$0** para projetos pequenos/médios

### Upgrades (quando necessário):
- **Supabase Pro**: $25/mês
- **Resend Premium**: $10/mês (100k emails)

---

## 📱 Arquitetura Completa

```
Frontend (HTML/JS)
     │
     ├─→ Validação Frontend
     │
     ├─→ Upload File ──────→ Supabase Storage (arquivos)
     │       │
     │       └─→ Edge Function (upload-file)
     │
     └─→ Submit Form ────→ Supabase Edge Function
                             │
                             ├─→ Insert Database (PostgreSQL)
                             │
                             ├─→ Send Email (EmailJS/Resend)
                             │
                             └─→ Audit Log (logging)
```

---

## 🧪 Testes Rápidos

### 1. Testar Database
```sql
-- No Supabase SQL Editor
SELECT * FROM artist_submissions;
SELECT * FROM audit_logs;
```

### 2. Testar Upload
- Preencher formulário com arquivo
- Verificar Storage no Dashboard

### 3. Testar Email
- Verificar se e-mail chegou
- Verificar Edge Function logs

---

## 📝 Checklist de Implementação

- [ ] Criar conta no Supabase
- [ ] Criar projeto
- [ ] Executar `database.sql`
- [ ] Criar bucket `artist-submissions` (privado)
- [ ] Deploy das 3 Edge Functions
- [ ] Configurar variáveis de ambiente
- [ ] Configurar `.env.local`
- [ ] Adicionar scripts ao HTML
- [ ] Adicionar container Turnstile
- [ ] Testar formulário
- [ ] Testar upload de arquivos
- [ ] Testar envio de e-mail
- [ ] Deploy em produção

---

## 🚨 Alertas de Segurança

1. **NUNCA** commitar `.env` ou `.env.local`
2. **SEMPRE** usar `.gitignore`
3. **NUNCA** expor `SUPABASE_SERVICE_KEY` no frontend
4. **SEMPRE** usar chaves `anon` no frontend
5. **SEMPRE** manter bucket de Storage privado

---

## 📚 Próximos Passos

1. **Implementar UI de upload** com Dropzone ou similar
2. **Adicionar feedback visual** durante upload
3. **Configurar domain personalizado**
4. **Implementar analytics** (Google Analytics, etc.)
5. **Adicionar rate limiting** (configurável no Edge Functions)
6. **Criar dashboard admin** para gerenciar inscrições
7. **Implementar exportação** de dados (CSV/Excel)
8. **Adicionar webhook** para notificações externas

---

**Versão:** 1.0.0  
**Data:** Setembro 2026  
**Desenvolvido por:** DTi - Prefeitura de Fazenda Rio Grande
