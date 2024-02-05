# Raviish - Solicitação de Artigos

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
git clone git@github.com:zafir-co-ao/raviish-app.git
```

- Mude para o diretório da aplicação

```bash
cd raviish-app
```

## Ambiente de Produção

Para executar a aplicação atráves da sua imagem em Docker siga os seguintes passos:

- Construção da Imagem

```bash
docker build -f .build/Dockerfile -t app-name .
```

> NOTA: Substitua `app-name` pelo nome real da sua imagem docker

- Execução do Container

```bash
docker run -d -p 3000:8080 --name="container-name" app-name
```

> NOTA: `app-name` é o nome que deu a imagem no passo acima, opionalmente, também pode definir do nome do container na flag --name="container-name"

Depois de executar o comando acima a aplicação estará disponível no seguinte endereço: <http://localhost:3000>

## Ambiente de desenvolvimento

Para executar a aplicação no ambiente de desenvolvimento siga os seguintes passos:

- Instalação das dependências

```bash
npm install
```

- Executar servidor de desenvolvimente

```bash
npm run dev
```

Para o ambiente de desenvolvimento a aplicação estará disponível no seguinte endereço: <http://localhost:3000>
