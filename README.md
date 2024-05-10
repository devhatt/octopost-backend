# Backend do Octopost

[![Discord Server](https://img.shields.io/discord/308323056592486420?color=7289DA&label=Discord&logo=discord&logoColor=white)](https://discord.gg/devhatt)
[![Twitter Follow](https://img.shields.io/twitter/follow/DevHatt?style=social)](https://twitter.com/DevHatt)
[![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-646CFF?logo=vitest&logoColor=white)](https://vitest.dev/)
[![GitHub Commit Activity (Week)](https://img.shields.io/github/commit-activity/w/devhatt/octopost)](https://github.com/devhatt/octopost/pulse)
[![GitHub Contributors](https://img.shields.io/github/contributors/devhatt/octopost)](https://github.com/devhatt/octopost/contributors)
[![GitHub stars](https://img.shields.io/github/stars/devhatt/octopost.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/devhatt/octopost/stargazers/)

[**Junte-se a nós na DevHatt e transforme sua paixão por tecnologia em impacto real!**](https://discord.gg/devhatt)

## Índice

- [Projeto](#projeto)
- [Como rodar](#como-rodar)
- [Tirar Dúvidas](#tirar-dúvidas)
- [Como Contribuir](#como-contribuir)
- [Regras](#regras)
- [Redes Sociais](#redes-sociais)

## Projeto

Bem-vindo ao OctoPost! O OctoPost é um aplicativo de redes sociais único que permite aos usuários fazerem publicações em
várias plataformas de mídia social, tudo em uma única interface unificada. Este documento README irá guiá-lo
através das informações básicas sobre o projeto, seu propósito e como contribuir de forma eficaz.

## Como rodar

Para rodar o projeto, você precisará ter:

- [PNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

É necessário criar uma cópia deste repositório com o git para a sua máquina local.
Para fazer isso, siga
as [instruções no site do GitHub](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).

Após clonar o projeto, acesse a pasta raiz do projeto e execute o comando:

```bash
docker compose up -d
```

Esse comando irá criar um banco de dados PostgresSQL na porta 5432 utilizando um container Docker.
Assim que o banco de dados estiver funcionando, você deve configurar as variáveis de ambiente
apontando `PORT`, `HOSTNAME` e `DATABASE_URL` para o seu ambiente local.

```env
PORT = 3000
HOSTNAME = localhost
DATABASE_URL = postgres://postgres:password@localhost:5432/octopost
```

Com o banco de dados configurado, instale as dependências do projeto:

```bash
pnpm install
```

E rode as migrations para criar as tabelas no banco de dados:

```bash
pnpm run migrate
```

Inicialize o projeto em modo desenvolvimento com o comando:

```bash
pnpm run dev
```

## Tirar Dúvidas

- **Canal de Help no Discord:** Para dúvidas sobre o projeto utilize o [LINK O CHAT do projeto]
- **Salas Interativas:** Prefere uma interação mais direta? Junte-se a qualquer sala aberta no Discord e converse com
  outros membros que podem ajudar com suas dúvidas em tempo real.
- **Plantões de Dúvidas:** Organizamos sessões especiais em horários determinados onde mentores estão disponíveis para
  ajudar com questões mais complexas.
- **One-a-One:** Você também pode marcar um 1:1 com o mentor do projeto.
- **Daily:** Se a sua dúvida for algo rápido, você também pode tirar suas dúvidas durante a daily.

## Como Contribuir

Para contribuir no backend do octopost, será necessário que você pegue uma tarefa na aba de issues.

Após pegar uma issue, crie uma branch a partir da branch master para trabalhar nas suas alterações:

```bash
   git checkout -b issue-[numero-da-issue]
```

```bash
   git push upstream issue-[numero-da-issue]
```

Abra um Pull Request pelo seu fork para o repositório do octopost na branch master, descrevendo suas alterações e
fornecendo contexto sobre o que foi feito.

A equipe de mantenedores do projeto irá revisar o seu PR. Esteja disposto a fazer ajustes se necessário. Após a revisão
bem-sucedida, suas alterações serão mescladas à branch principal. Seu PR será fechado.

## Diretrizes de Contribuição

- **Estilo de Código:
  ** [Siga as convenções de estilo de código existentes no projeto.](https://github.com/DevHatt/octopost-backend/blob/master/docs/STYLEGUIDE.md)
- **Documentação:** Sempre mantenha a documentação `/openapi` atualizada, refletindo todas as alterações feitas em
  código.
- **Testes:** Certifique-se de testar as suas alterações, cobrindo 100% das linhas de testes modificadas, e se
  necessário adicione novos testes ou modifique os existentes.
- **Tamanho das Pull Requests:** PRs menores são mais fáceis de revisar e mesclar. Tente manter o escopo de suas
  contribuições relativamente pequeno.
- **Mantenha a Cortesia:** Seja cortês e respeitoso ao discutir e revisar o trabalho de outros contribuidores.

## Regras

Para garantir um ambiente saudável, respeitoso e receptivo, toda boa comunidade precisa de regras. Nossa equipe de
moderação conta com o respaldo dessas regras, as quais foram criadas para tomar as providências cabíveis em cada
situação. Este é um trabalho constante, pois frequentemente atualizamos nossas regras de convivência para enfrentar
novos problemas que podem surgir. Por isso, é crucial reservar alguns minutos para ler sobre todas elas e, de tempos em
tempos, voltar aqui para acompanhar as atualizações.

Para melhorar as regras, não as explore; em vez disso, nos reporte. Caso haja exploração de alguma falha, a
atualizaremos imediatamente, e as regras se aplicarão ao caso, mesmo que tenha ocorrido antes da atualização. Contamos
com a colaboração de todos para evitar incentivos ao mau comportamento.

É fundamental ressaltar que todas as sugestões são muito bem-vindas! Se tiver alguma, procure diretamente um dos membros
da nossa moderação, identificados pelos cargos de Dono do Parquinho 🎠, Hatter 🤠 ou De Capa 🐱‍🏍. Abaixo, você pode
conhecer mais detalhes sobre cada uma de nossas regras e quais punições elas geram.

---

### **⚠️ Regras para Convivência Social**

**1. Exercício do Bom Senso**

Pode parecer evidente, mas todas as normas existem para delimitar e enquadrar comportamentos que ultrapassam o bom
senso. O exercício do bom senso assegurará que você esteja aderindo às regras em 100% das situações.

**2. Pornografia ou Assédio**

- 🚫 Banimento imediato 🔨

  É terminantemente proibido compartilhar qualquer conteúdo com conotação pornográfica. Não busque brechas na regra,
  pois ela se aplica a qualquer situação interpretada pela moderação como tal. Da mesma forma, qualquer comportamento
  que possa ser interpretado como assédio, mesmo subjetivamente, será identificado pela moderação e enquadrado nesta
  regra.

**3. Discussões sobre Temas Sensíveis**

- 🚫 Punição: 1, 3, 7 dias. (recorrência (3): ban 🔨)

  É proibido totalmente compartilhar imagens, links, menções ou participar de discussões sobre temas políticos,
  religiosos, assim como debates sobre futebol. Utilize outras plataformas na internet para esse tipo de interação.

**4. Desrespeito e Ofensas**

- 🚫 Punição: 1, 3, 7 dias. (recorrência (3): ban 🔨)

  Seja uma pessoa cortês e empática. Se uma pergunta for feita, responda de maneira respeitosa. Se você não estiver
  disposto a responder dessa forma, sua resposta não será bem-vinda. Isso inclui comentários, piadas e falas
  sarcásticas, irônicas ou ofensivas. Lembre-se de que todos começaram de algum lugar, portanto, respeite as dúvidas das
  pessoas, independentemente do nível delas. Se as ofensas forem direcionadas à moderação, a punição será imediatamente
  aumentada para 7 dias.

**5. Vocabulário Inadequado**

- 🚫 Punição: 5, 30, 60 (recorrência (3): ban 🔨)

  Utilize um vocabulário apropriado. Palavrões e termos ofensivos serão moderados automaticamente.

**6. Afiliados**

- 🚫 Punição: 1, 3, 7 dias. (recorrência (3): ban 🔨)

  O compartilhamento de links de afiliados não é permitido. Isso polui nosso ambiente e incomoda muitas pessoas.

**7. Venda e Comercialização**

- 🚫 Punição: 1, 3, 7 dias. (recorrência (3): ban 🔨)

  Anunciar ou negociar a venda ou troca de produtos físicos ou digitais na comunidade não é permitido. Em caso de uma
  operação que ocorra antes da intervenção da moderação e resulte em prejuízo para qualquer parte, não nos
  responsabilizamos.

**8. Outras Comunidades**

- 🚫 Punição: 5, 30, 60 (recorrência (3): ban 🔨)

  O compartilhamento de links para outras comunidades no Discord, WhatsApp, Telegram e outros serviços não é permitido.
  Também não é permitida a criação de grupos paralelos ou denominados como DevHatt.

## Redes sociais

- Discord: [https://discord.gg/devhatt](https://discord.gg/devhatt)
- Twitter: [Devhat (@DevHatt)](https://twitter.com/DevHatt)
- LinkedIn: [Devhat (@DevHat)](https://www.linkedin.com/company/dev-hat/)
- Dev.To: [Devhat (@DevHat)](https://dev.to/devhat)
- YouTube: [YouTube (@devhatt-dailies)](https://www.youtube.com/@devhatt-dailies)
- YouTube: [YouTube (@devhatt)](https://www.youtube.com/@devhatt)

Junte-se a nós nesta jornada emocionante de tornar a DevHatt a melhor software house em todo o mundo!
