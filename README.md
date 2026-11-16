# Proffy Web — Cadastro do professor

Implementação sobre o projeto base obrigatório [Santosfael/proffy-web-2026](https://github.com/Santosfael/proffy-web-2026), mantendo React, TypeScript, Vite, Tailwind, React Hook Form e Zod.

## Como rodar

Use Node.js 22.18+ (ou 24+) e npm.

```sh
npm ci
npm run dev
```

Abra a URL exibida pelo Vite. Para gerar a versão de produção: `npm run build`. Para servi-la localmente: `npm run preview`. Em hospedagens estáticas, configure fallback para `index.html` para acesso direto às rotas.

## Telas e fluxo

- `/`: início; botão **Dar aulas** abre o formulário.
- `/give-classes`: dados pessoais, matéria, custo e horários dinâmicos.
- `/give-classes/success`: confirmação **Cadastro salvo!**; **Acessar lista** abre o perfil, conforme o enunciado.
- `/profile`: **Meu perfil**, com edição dos dados, inclusão e exclusão de horários. Salvar mantém o usuário no perfil e apresenta confirmação.
- Rotas originais de autenticação e `/study` foram preservadas.

Sem cadastro válido salvo, confirmação e perfil redirecionam ao formulário.

## Decisões técnicas

O módulo `src/features/teacher` reúne modelo, validação, componentes compartilhados, telas e estilos responsivos. Cadastro e perfil usam o mesmo editor, com React Hook Form como fonte dos valores e `useFieldArray` para horários com identificadores estáveis. Zod valida campos obrigatórios, telefone com DDD, biografia até 300 caracteres, custo positivo, horário final após o inicial e conflitos no mesmo dia. Cada erro é exibido junto ao campo; o foco é encaminhado pelo formulário ao primeiro campo inválido.

Os dados são persistidos em `localStorage` e validados novamente na leitura. A aplicação base não possui API de cadastro: os dados permanecem apenas neste navegador e não são enviados a um servidor ou incluídos na lista pública original de professores. Nome, sobrenome e e-mail são solicitados também no cadastro, pois a autenticação original não fornece uma sessão com esses dados.

Os assets e fontes locais do projeto foram reaproveitados, incluindo avatar ilustrativo, logo, fundo geométrico e check da confirmação. O ícone de câmera é decorativo; upload de foto não faz parte dos requisitos funcionais. A interface utiliza roxo `#7957E0`, verde `#04D361`, cards brancos e layouts adaptados para celular. Não foram disponibilizadas as imagens e a aula mencionadas no enunciado; a referência visual utilizada foi a descrição textual e os assets existentes.

## Verificação

```sh
npm test
npm run build
```

Os testes automatizados cobrem obrigatoriedade, biografia, telefone, custo, conflitos e ordem dos horários, máscara e persistência. Para conferir o fluxo manualmente: preencha o cadastro, adicione horários, salve, abra o perfil, altere os dados, exclua um horário e recarregue para confirmar a persistência. O navegador deve permitir armazenamento local.

`node_modules`, `dist` e arquivos `.env` são ignorados pelo Git.
