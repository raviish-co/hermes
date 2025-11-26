# Hermes

Aplicação responsável pelo controle da entrada e saída de artigos.

## Requisitos

-   [Node.js](https://nodejs.org)
-   [npmjs](https://npmjs.com/)
-   [Docker](https:www.docker.com)

## Guia de Implementação

-   [Ambiente de produção](#ambiente-de-produção)
-   [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)

## Baixar repositório

-   Clone o repositório do projecto

```bash
git clone git@github.com:raviish-co/hermes.git
```

-   Mude para o diretório da aplicação

```bash
cd hermes
```

## Ambiente de Produção

#### Para executar a aplicação atráves da sua imagem em Docker siga os seguintes passos:

-   Configuração da Base de Dados

Para aplicar as migrações na base de dados em produção

```bash
npx prisma migrate deploy
```

-   Construção da Imagem

```bash
docker build -f .build/Dockerfile -t hermes .
```

-   Execução do Container

```bash
docker run -d -e NUXT_DATABASE_URL="database-url" -p 3000:8080 hermes
```

> NOTA: Substitua `database-url` pela url real de conexão a base de dados.
> NOTA: `hermes` é o nome que deu a imagem no passo acima, opcionalmente, também pode definir o nome do container na flag --name="container-name"

Depois de executar o comando acima a aplicação estará disponível no seguinte endereço: <http://localhost:3000>

#### Para realizar o deploy da aplicação através do github workflow siga os seguintes passos:

-   Configuração da base de dados

```bash
bun prisma:migrate:deploy
```

- Defina o valor das seguintes variáveis de ambiente no seu ficheiro `.env`.

```plaintext
# URL of database
NUXT_DATABASE_URL=

# GMAIL client 
GMAIL_CLIENT_SECRET=
GMAIL_CLIENT_ID=
GMAIL_CLIENT_REFRESH_TOKEN=
GMAIL_CLIENT_FROM_EMAIL=
```

-   Criação da tag no github

```bash
git tag v*.*.*
```

-   Publicação da tag

```bash
git push origin v*.*.*
```

## Ambiente de desenvolvimento

Para executar a aplicação no ambiente de desenvolvimento siga os seguintes passos:

-   Instalação das dependências

```bash
bun install
```

-   Executar servidor de desenvolvimente

```bash
bun dev
```

Para o ambiente de desenvolvimento a aplicação estará disponível no seguinte endereço: <http://localhost:3000>

-   Inicio de sessão

Para iniciar sessão na aplicação utilize as seguintes credenciais:

```plaintext
Utilizador: john.doe

Código de verificação: o código de verificação estará disponível no console do terminal onde iniciou o servidor de desenvolvimento
```
