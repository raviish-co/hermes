# Hermes

Aplicação responsável pelo controle da entrada e saída de artigos.

## Requisitos

- [Node.js](https://nodejs.org)
- [npmjs](https://npmjs.com/)
- [Docker](https:www.docker.com)

## Guia de Implementação

- [Ambiente de produção](#ambiente-de-produção)
- [Ambiente de desenvolvimento](#ambiente-de-desenvolvimento)

## Baixar repositório

- Clone o repositório do projecto

```bash
git clone git@github.com:raviish-co/hermes.git
```

- Mude para o diretório da aplicação

```bash
cd hermes
```

## Ambiente de Produção

Para executar a aplicação atráves da sua imagem em Docker siga os seguintes passos:

- Configuração da Base de Dados

Para aplicar as migrações na base de dados em produção

```bash
npx prisma migrate deploy
```

- Construção da Imagem

```bash
docker build -f .build/Dockerfile -t hermes .
```

- Execução do Container

```bash
docker run -d -e NUXT_DATABASE_URL="database-url" -p 3000:8080 hermes
```

> NOTA: Substitua `database-url` pela url real de conexão a base de dados.
> NOTA: `hermes` é o nome que deu a imagem no passo acima, opcionalmente, também pode definir do nome do container na flag --name="container-name"

Depois de executar o comando acima a aplicação estará disponível no seguinte endereço: <http://localhost:3000>

## Ambiente de desenvolvimento

Para executar a aplicação no ambiente de desenvolvimento siga os seguintes passos:

- Instalação das dependências

```bash
bun install
```

- Executar servidor de desenvolvimente

```bash
bun run dev
```

Para o ambiente de desenvolvimento a aplicação estará disponível no seguinte endereço: <http://localhost:3000>
