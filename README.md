# SaaS Barbearia (Aparatus)

Plataforma moderna de gestão e agendamento de serviços em barbearias, com suporte a busca de estabelecimentos, agendamento de horários em tempo real, gerenciamento de reservas e assistente virtual inteligente (**Agenda.ai**) integrado via IA generativa para agendamentos conversacionais.

![Demonstração da Aplicação](public/demo.png)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Biblioteca Front-End:** [React 19](https://react.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados & ORM:** PostgreSQL com [Prisma ORM](https://www.prisma.io/) (`@prisma/client` e `@prisma/adapter-pg`)
- **Autenticação:** [Better Auth](https://www.better-auth.com/) com login social via Google OAuth
- **Inteligência Artificial & Streaming:** [Vercel AI SDK](https://sdk.vercel.ai/) (`ai` e `@ai-sdk/react`) integrado com Google Generative AI (`@ai-sdk/google` / Gemini) e renderização via [Streamdown](https://github.com/streamdown/streamdown)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) e [Lucide React](https://lucide.dev/) (ícones)
- **Componentes UI:** [Radix UI primitives](https://www.radix-ui.com/) estilizados no padrão shadcn/ui
- **Gerenciamento de Estado & Requisições:** [TanStack React Query](https://tanstack.com/query)
- **Tema:** [next-themes](https://github.com/pacocoursey/next-themes) (suporte a Light e Dark Mode)
- **Manipulação de Datas:** [date-fns](https://date-fns.org/) e [React Day Picker](https://daypicker.dev/)
- **Notificações:** [Sonner](https://sonner.emilkowal.ski/)
- **Server Actions Type-Safe:** [next-safe-action](https://next-safe-action.dev/)

---

## Principais Features

- **Busca e Exploração de Barbearias:**
  - Busca textual por nome de barbearia ou serviço.
  - Filtros rápidos por categoria de serviços (Cabelo, Barba, Acabamento, Massagem, etc.).
  - Seções de barbearias recomendadas e populares na Home.
- **Página de Detalhes da Barbearia:**
  - Informações completas (endereço, telefones para contato com cópia rápida para a área de transferência, descrição).
  - Catálogo de serviços com valores formatados em moeda (BRL).
- **Agendamento Completo de Serviços:**
  - Seleção de data interativa com calendário (`react-day-picker`).
  - Verificação dinâmica de horários disponíveis no dia selecionado.
  - Confirmação de agendamento protegida por autenticação.
- **Assistente Virtual Inteligente (Agenda.ai):**
  - Chat interativo com streaming de respostas em tempo real com Google Gemini.
  - Compreensão de datas em linguagem natural (ex: _"quero agendar para amanhã à tarde"_).
  - Capacidade do bot (via Function Calling / Tools) de buscar barbearias, listar horários livres e efetivar o agendamento diretamente na conversa.
- **Painel de Agendamentos do Usuário:**
  - Visualização separada de agendamentos confirmados e finalizados/anteriores.
  - Cancelamento de reservas com atualização imediata de estado.
- **Autenticação com Google:**
  - Login e gerenciamento de sessão simplificado e seguro com Better Auth.
- **Tema Claro / Escuro:**
  - Alternância de tema Dark/Light com persistência e adaptação de logos e componentes visuais.

---

## Estrutura do Banco de Dados

O banco relacional estruturado no Prisma conta com as seguintes entidades:

- `Barbershop`: Cadastro de barbearias (nome, endereço, descrição, telefones, foto).
- `BarbershopService`: Catálogo de serviços oferecidos pelas barbearias e preços em centavos (`priceInCents`).
- `Booking`: Registro de reservas vinculando usuário, barbearia, serviço, data/hora e status de cancelamento.
- `User`, `Session`, `Account`, `Verification`: Modelos gerenciados pelo Better Auth para controle de credenciais, sessões e contas vinculadas (Google OAuth).

---

## Instalação e Execução Local

### Pré-requisitos

- Node.js (versão 20 ou superior recomendada)
- Gerenciador de pacotes `pnpm` (ou `npm` / `yarn`)
- Instância de banco de dados PostgreSQL ativa

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd saas-barbearia
```

### 2. Instalar as dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha as variáveis de acordo com suas credenciais:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/saas_barbearia?schema=public"

# Better Auth
BETTER_AUTH_SECRET="sua-chave-secreta"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# IA (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="sua-api-key-do-google-gemini"
```

### 4. Executar migrações e popular o banco

Execute as migrações e popule o banco com dados de exemplo de barbearias e serviços:

```bash
# Gerar cliente do Prisma
pnpm prisma generate

# Executar migrações do banco
pnpm prisma migrate dev

# Popular com dados iniciais (seed)
pnpm tsx prisma/seed.ts
```

### 5. Iniciar o servidor de desenvolvimento

```bash
pnpm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

---

## Estrutura do Projeto

```
saas-barbearia/
├── app/
│   ├── _actions/          # Server Actions (criação/cancelamento de reservas, horários disponíveis)
│   ├── _components/       # Componentes compartilhados da aplicação (Header, Footer, Sheets, etc.)
│   │   └── ui/            # Primitivos de UI (Button, Card, Sheet, Calendar, Dialog, etc.)
│   ├── _providers/        # Providers de contexto (React Query, etc.)
│   ├── api/
│   │   ├── auth/          # Handlers de autenticação do Better Auth
│   │   └── chat/          # Rota de streaming de IA com ferramentas do Agenda.ai
│   ├── barbershops/       # Páginas de busca e detalhes da barbearia (/barbershops/[id])
│   ├── bookings/          # Página de visualização e gerenciamento de agendamentos
│   ├── chat/              # Interface do assistente de chat inteligente
│   ├── globals.css        # Estilos globais e tema Tailwind CSS v4
│   ├── layout.tsx         # Root layout da aplicação com providers de tema e fontes
│   └── page.tsx           # Página inicial (Home) com destaques e buscas
├── lib/                   # Utilitários e instâncias globais (cliente Prisma, autenticação)
├── prisma/                # Schema do banco de dados e script de seed
└── public/                # Imagens, logos (light/dark) e banners estáticos
```
