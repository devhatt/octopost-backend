**Antes de tudo, é importante que você observe como módulos atuais foram construídos
antes de começar a construir um novo módulo ou serviço. Tente manter a padronização existente
criada por um módulo/serviço anterior a menos que você acredite que ela seja danosa ao projeto.
Neste caso, abra uma issue para discutir a mudança de padrão.**

# Guia de estilo de código e arquitetura do backend do octopost

## Git

Essa seção descreve as práticas necessárias de uso do git para contribuir com o projeto.

### Branches

Para criar uma branch, siga o padrão de adicionar `[seu-nome-de-usuario]/issue-[numero-da-issue]` na sua branch antes de
criar a branch.

Por exemplo:

```bash
git checkout -b devhatt/issue-1
```

Nesse caso, o nome de usuário é `devhatt` e o número da issue é `1`.

### Commits

Para fazer commits, utilizamos o padrão de commits
chamado [semantic commit](https://www.conventionalcommits.org/en/v1.0.0/), que consiste em criar commits seguindo essa
estrutura:

```bash
git commit -m "type: description"
```

Para isso, execute o comando `pnpm commit` na raiz do projeto e siga as instruções.
O terminal irá te guiar para criar um commit seguindo o padrão de commits semânticos.

## Projeto

Essa seção lida com a estrutura do projeto e como ele está organizado.

### Padrões de nomenclatura de arquivos

Neste projeto, utilizamos o padrão `kebab-case` para a criação de arquivos e pastas.
As pastas e arquivos devem ser criados seguindo a seguinte estrutura de nomenclatura:
`[palavra]-[segunda-palavra]-[terceira-palavra].[extensão]`

### Estrutura Principal

```
/.github - Arquivos de configuração do GitHub
/openapi - Arquivos de documentação da API
/prisma - Arquivos de configuração do Prisma e Schema do Banco de dados
/src - Código fonte do projeto
  /config - Arquivos de Configurações do projeto
  /features - Módulos da aplicação separados por seus domínios
    /[modulo] - Módulo específico
      /controllers - Arquivos que intermediam a comunicação dos serviços com as rotas do express.
      /repositories - Arquivos que intermediam a comunicação dos casos de uso com outros serviços.
      /services - Arquivos que executam a lógica principal do nosso serviço.
      /models - Arquivos que definem os modelos de dados do módulo com interfaces.
      /validators - Arquivos de schema para validação de dados.
      /routes - Arquivos de configuração das rotas expostas pelo módulo.
  /middlewares - Middlewares da aplicação
  /shared - Arquivos compartilhados entre os módulos
    /errors - Classes de erros personalizadas
    /infra - Arquivos de código reutilizados entre os módulos
    /protocols - Interfaces comuns reutilizadas entre os módulos
    /test-helpers - Arquivos e funções utilitárias utilizadas nos testes
  /tests - Arquivos de configuração dos testes
  /index.ts - Arquivo de inicialização da aplicação
```

#### Serviços

Os serviços são responsáveis por executar a lógica principal do nosso serviço.

`[nome do módulo]-[serviço ou metodo]-service.ts`

`[nome do módulo]-[serviço ou metodo]-service.test.ts`

Os serviços devem implementar a interface `Service` contida em `src/shared/protocols/service.ts` e
terem os seus generics resolvidos para as interfaces de entrada e saída definidos dentro da pasta models de cada módulo.

*Use o mesmo padrão de nomenclatura para definir essas interfaces.*

#### Controllers

Os controllers são responsáveis por intermediar a comunicação entre os serviços e as rotas do express.
Eles também são responsáveis por executar as lógicas de validação e fazer o tratamento dos dados recebidos.

`[nome do módulo]-controller.ts`

`[nome do módulo]-controller.test.ts`

Os controladores devem implementar a interface `Controller` contida em `src/shared/protocols/controller.ts` e
receber os serviços e validadores necessários para o seu funcionamento via construtor.

#### Repositories

Os repositories são responsáveis por intermediar a comunicação entre os serviços e outros serviços como, por exemplo,
o banco de dados ou um serviço de terceiros.

`/[nome do módulo]-repository/[nome do módulo]-repository.ts`

`/[nome do módulo]-repository/[nome do módulo]-repository.test.ts`

Os repositórios fazem o intermédio entre os nossos serviços e outras camadas e funcionalidades da nossa aplicação.
Portanto, devem ser injetados nos serviços via construtor e mocados nos testes.

Se algum repositório for utilizado por mais de um serviço ou middleware, ele deve ser movido para a
pasta `src/shared/infra/repositories` seguindo o mesmo padrão de nomenclatura.

#### Routes

A pasta de rotas é responsável por configurar cada uma das rotas expostas pelo módulo,
além de instanciar e injetar os serviços e módulos necessários para tudo funcione.

`[nome do módulo]-routes.ts`

`[nome do módulo]-controller-factory.ts`

Para a construção das rotas é necessário criar um arquivo de factory para o controller que injete em cada classe
os objetos necessários para o seu funcionamento dentro da factory.

Não é necessário criar testes unitários para as rotas, pois elas são testadas indiretamente nos testes dos
controladores,
e testes de integração são mais indicados para esse caso. Portanto, esses arquivos são desconsiderados do coverage total
da aplicação.

#### Validators

A pasta de validators contém os Schemas de validação dos dados.

`[nome do módulo]-[serviço ou metódo]-schema.ts`

Crie os schemas de validação para os dados de entrada e saída dos serviços seguindo a interface
`HttpRequest` contida dentro de `src/shared/protocols/http.ts`.

### Documentação em primeiro lugar!

Antes de começar o desenvolvimento de um novo endpoint, é necessário
confirmar que a documentação daquele endpoint em específico já existe dentro da
pasta de documentações `openapi`. Para criar o serviço, você deve seguir fielmente a interface
declarada, e fazer mudanças na documentação caso necessário.

### Testes

Lembre-se de sempre escrever testes para o código que você está desenvolvendo.
Como na nossa aplicação estamos utilizando apenas testes unitários, lembre-se sempre
de mockar dependências externas as classes que você está testando.