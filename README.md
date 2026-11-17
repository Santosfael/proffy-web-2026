# Proffy Web

O **Proffy Web** é uma plataforma que conecta alunos e professores para a realização de aulas particulares. O projeto permite que profissionais disponibilizem suas disponibilidades e matérias de ensino, enquanto alunos podem encontrar professores ideais para suas necessidades de aprendizado.

Nesta etapa do projeto, o foco está na implementação completa do fluxo de cadastro e gerenciamento de professores (**“Dar aulas”** e **“Meu perfil”**).

---

## 🚀 Tecnologias e Dependências

A aplicação foi construída com tecnologias modernas do ecossistema React:

- **React 19** — Biblioteca declarativa e reativa para interfaces de usuário.
- **TypeScript** — Tipagem estática para maior segurança e previsibilidade do código.
- **Vite** — Build tool e dev server com Hot Module Replacement (HMR) ultrarrápido.
- **Tailwind CSS 4** — Framework CSS utilitário de última geração para estilização ágil e responsiva.
- **React Router 7** — Solução padrão para controle de roteamento e navegação client-side.
- **React Hook Form** — Gerenciamento performático de formulários com renderizações otimizadas.
- **Zod** — Validação declarativa de esquemas com inferência estática de tipos TypeScript.
- **@hookform/resolvers** — Integração nativa entre o React Hook Form e os validadores Zod (`zodResolver`).
- **Sonner** — Biblioteca de toasts e notificações visuais com feedback interativo.
- **Lucide React** — Pacote completo de ícones em SVG consistentes e leves.
- **tailwind-merge & tailwind-variants** — Utilitários para combinação segura de classes CSS e gerenciamento de variantes de componentes.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de possuir o [Node.js](https://nodejs.org/) (versão LTS recomendada) e o gerenciador de pacotes `npm` instalados na sua máquina.

### Instalação e Execução

1. **Instalar as dependências do projeto:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar no navegador:**
   Abra o endereço padrão disponibilizado pelo Vite:
   [http://localhost:5173](http://localhost:5173)

### Outros Scripts Disponíveis

- `npm run build`: Executa a checagem de tipos do TypeScript (`tsc -b`) e compila a aplicação otimizada para produção via Vite.
- `npm run lint`: Executa a verificação estática de código com o ESLint.
- `npm run preview`: Sobe um servidor local para inspecionar os arquivos gerados no diretório `dist/` após o build.

---

## 🗺️ Rotas e Telas Implementadas

| Rota | Tela | Descrição |
| :--- | :--- | :--- |
| `/` | Home | Página inicial com apresentação e botões de acesso a “Estudar” e “Dar aulas”. |
| `/sign-in` | Login | Tela de autenticação de usuários. |
| `/sign-up` | Cadastro de usuário | Tela inicial para registro de novos usuários. |
| `/sign-up/finally-register` | Confirmação do cadastro de usuário | Feedback de sucesso após o registro de usuário. |
| `/study` | Listagem de professores | Lista de professores disponíveis para agendamento de aulas. |
| `/give-classes` | Formulário “Dar aulas” | Formulário completo de cadastro de matérias, valores e horários de aula. |
| `/give-classes/register-completed` | Confirmação “Cadastro salvo!” | Tela de sucesso e confirmação após o envio do cadastro do professor. |
| `/my-profile` | Perfil “Meu perfil” | Tela de gerenciamento e atualização dos dados pessoais e disponibilidade do professor. |

---

## 🔄 Fluxo de Navegação do Cadastro de Professor

O fluxo de cadastro e edição de dados do professor segue a sequência abaixo:

```text
Home (/)
  └──> Botão "Dar aulas"
         └──> Formulário (/give-classes)
                └──> "Salvar cadastro"
                       └──> Confirmação (/give-classes/register-completed)
                              └──> "Acessar lista"
                                     └──> Perfil (/my-profile)
                                            └──> "Salvar cadastro"
                                                   └──> Confirmação (/give-classes/register-completed)
```

1. O usuário parte da tela **Home (`/`)** e seleciona o botão **“Dar aulas”**.
2. É direcionado para a tela **`/give-classes`**, onde preenche os dados da aula (WhatsApp, biografia, matéria lecionada, custo por hora e horários disponíveis).
3. Ao submeter com sucesso, a aplicação redireciona para a tela **`/give-classes/register-completed`** com a mensagem de confirmação de cadastro salvo.
4. A partir da confirmação, o botão **“Acessar lista”** leva o usuário a **`/my-profile`**, onde ele pode editar suas informações ou ajustar seus horários.
5. Ao salvar o perfil atualizado, o fluxo retorna para a tela de confirmação de sucesso.

---

## ⚙️ Decisões Técnicas

- **Persistência em `localStorage` com `TeacherProvider` / `useTeacher`**:
  Devido à ausência de uma API/backend nesta fase, os dados do perfil do professor são persistidos localmente no navegador sob a chave `proffy:teacher-profile`. O contexto React centraliza leitura, mutação e sincronização dos dados de forma reativa.
- **React Hook Form + Zod (`zodResolver`, `mode: "onChange"`)**:
  Esquemas Zod atuam como fonte única da verdade para tipagem e regras de validação. O modo `onChange` garante validação instantânea à medida que o usuário interage com os campos, exibindo feedbacks visuais imediatos.
- **`useFieldArray` para Horários Dinâmicos**:
  Permite adicionar e remover múltiplos blocos de horários na lista de disponibilidade de forma declarativa e com performance otimizada, evitando recriações manuais de estado.
- **Componentização Modular e Reutilizável**:
  - `TeacherPageShell`: Estrutura padrão de página compartilhada entre formulário e perfil, contendo cabeçalho (`AppHeader`), banner roxo e container centralizado.
  - `FormSection`: Encapsulamento semântico baseado em `<fieldset>` e `<legend>` com suporte a ações integradas (como botão de adicionar horários).
  - `FormFooter`: Rodapé padrão com indicador de atenção, mensagens orientativas e botão de submit com estado de carregamento.
  - `ScheduleRow`: Linha modular para seleção de dia da semana, horários de início e término, e ação de remoção condicional.
  - Componentes de UI: `InputCustom`, `Select`, `TextArea`, `Button` e `Finally` (tela de agradecimento/sucesso reutilizada).
- **Tratamento de Máscaras e Valores**:
  Formatação em tempo real para número de telefone/WhatsApp e normalização de valores monetários (aceitando tanto vírgula quanto ponto decimal para conversão numérica).
- **Identidade e Usuário Mock**:
  Utilização de dados mockados (`INITIAL_TEACHER_PROFILE`) para nome, sobrenome, e-mail e avatar, viabilizando o teste de usabilidade das telas antes da integração com o módulo completo de autenticação.
- **Limite de Biografia (300 caracteres)**:
  Controle rígido do tamanho da biografia para garantir legibilidade e consistência visual nos cards de exibição de professores.
- **Validação de Horários no Perfil**:
  O usuário tem flexibilidade para adicionar novos blocos ou excluir horários pré-existentes, porém a submissão do formulário exige a permanência de ao menos um horário preenchido e válido.

---

## 📋 Validações e Regras de Negócio

As validações definidas nos schemas Zod (`src/lib/teacher-schema.ts`) compreendem:

1. **WhatsApp**:
   - Obrigatório e com formato válido pelo padrão brasileiro `(99) 99999-9999` (ou 8/9 dígitos).
2. **Biografia**:
   - Obrigatória, com extensão máxima de 300 caracteres.
3. **Matéria**:
   - Seleção obrigatória a partir da lista de matérias cadastradas.
4. **Custo da hora por aula**:
   - Obrigatório, aceita valores no formato `99` ou `99,99`/`99.99`.
   - É transformado automaticamente para número e deve ser estritamente maior que zero (`> 0`).
5. **Horários de Atendimento (`schedule`)**:
   - É obrigatório cadastrar pelo menos um horário (`min(1)`).
   - Seleção do dia da semana obrigatória.
   - Horários inicial (`Das`) e final (`Até`) obrigatórios no padrão `HH:MM`.
   - Regra de consistência temporal: o horário final deve ser estritamente posterior ao inicial (`from < to`).

---

## 📁 Estrutura de Pastas

Estrutura simplificada dos diretórios relevantes do projeto:

```text
src/
├── components/           # Componentes visuais e estruturais reutilizáveis
│   ├── app-header.tsx         # Cabeçalho padrão das páginas internas
│   ├── button.tsx             # Botão estilizado com variantes
│   ├── field-error.tsx        # Mensagens de erro de validação
│   ├── finally.tsx            # Tela genérica de confirmação/conclusão
│   ├── form-footer.tsx        # Rodapé de formulários com aviso e botão de submit
│   ├── form-section.tsx       # Seção semântica de formulário com fieldset/legend
│   ├── input-custom.tsx       # Input de texto/tempo customizado com suporte ao react-hook-form
│   ├── schedule-row.tsx       # Linha de cadastro de dia e horário
│   ├── select.tsx             # Select estilizado com suporte a react-hook-form
│   ├── teacher-page-shell.tsx # Shell de layout compartilhado (cabeçalho + hero + container)
│   └── text-area.tsx          # Campo de texto multilinha customizado
├── contexts/             # Provedores de contexto React
│   └── teacher-context.tsx    # Contexto TeacherProvider e hook useTeacher (localStorage)
├── lib/                  # Utilitários, tipagens, schemas e dados estáticos
│   ├── formatters.ts          # Funções de máscara de WhatsApp e formatação de custo
│   ├── teacher-data.ts        # Dados iniciais mockados e listas de matérias/dias
│   └── teacher-schema.ts      # Esquemas de validação Zod (TeacherForm e TeacherProfile)
├── pages/                # Telas da aplicação organizadas por contexto
│   ├── app/                   # Telas da aplicação principal (Home, TeacherForm, TeacherProfile, etc.)
│   └── auth/                  # Telas do fluxo de autenticação (SignIn, SignUp, FinallyRegister)
├── routes.tsx            # Definição e configuração das rotas da aplicação
└── App.tsx               # Componente raiz com Provedores de Contexto e Toaster
```

---

## ⚠️ Limitações Conhecidas

- **Ausência de Backend e API Real**: A aplicação ainda não se comunica com um servidor back-end ou banco de dados relacional.
- **Dados Restritos ao Navegador**: As informações salvas no cadastro e no perfil residem exclusivamente no `localStorage` do navegador utilizado. A limpeza do cache resultará no retorno aos dados mock iniciais.
- **Identidade Mockada**: Dados de usuário (nome, e-mail e avatar) são simulados para ilustrar a experiência de uso enquanto os módulos de autenticação não estão integrados aos serviços centrais.

---

## 📌 Informações da Entrega

Este trabalho corresponde ao escopo de telas e funcionalidades da branch **`feat/perfil-professor`**, cobrindo o fluxo completo de cadastro e manutenção do perfil do professor na versão Proffy Web 2026.
