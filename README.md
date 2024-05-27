# Metavagas-API
Este é um projeto de API para um sistema de oferta/procura de vagas, desenvolvido em Node.js com o framework NestJs e utilizando PostgreSQL como banco de dados.

## Estrutura do Projeto
Foi estruturado seguindo a Arquitetura de Módulos, com sistema de injeção de dependência. A estrutura de pastas/arquivos do projeto é organizada da seguinte forma:

```bash
project/
│
├── src/
│   ├── auth/
│   │   ├── docs/
│   │   │   ├── index.ts
│   │   │   ├── login-response.docs.ts
│   │   │   ├── login.docs.ts
│   │   │   └── register.docs.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── jwt/
│   │   │   └── jwt.config.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── companies/
│   │   ├── docs/
│   │   │   ├── create-company-response.docs.ts
│   │   │   ├── create-company.docs.ts
│   │   │   ├── delete-company-response.docs.ts
│   │   │   ├── index.ts
│   │   │   ├── update-company-response.docs.ts
│   │   │   └── update-company.docs.ts
│   │   ├── dto/
│   │   │   ├── create-company.dto.ts
│   │   │   └── update-company.dto.ts
│   │   ├── companies.controller.ts
│   │   ├── companies.module.ts
│   │   └── companies.service.ts
│   ├── database/
│   │   ├── docs/
│   │   │   ├── company.docs.ts
│   │   │   ├── technology.docs.ts
│   │   │   ├── user.docs.ts
│   │   │   └── vacancy.docs.ts
│   │   ├── entities/
│   │   │   ├── company.entity.ts
│   │   │   ├── database.entity.ts
│   │   │   ├── technology.entity.ts
│   │   │   ├── user.entity.ts
│   │   │   └── vacancy.entity.ts
│   │   ├── database.config.ts
│   │   ├── database.module.ts
│   ├── decorators/
│   │   ├── dto/
│   │   │   └── current-user.dto.ts
│   │   ├── current-user.decorator.ts
│   │   └── roles.decorator.ts
│   ├── enums/
│   │   ├── exception-message.enum.ts
│   │   ├── successful-message.enum.ts
│   │   └── user-role.enum.ts
│   ├── technologies/
│   │   ├── docs/
│   │   │   ├── create-technology-response.docs.ts
│   │   │   ├── create-technology.docs.ts
│   │   │   ├── delete-technology-response.docs.ts
│   │   │   ├── index.ts
│   │   │   └── update-technology.docs.ts
│   │   ├── dto/
│   │   │   ├── create-technology.dto.ts
│   │   │   └── update-technology.dto.ts
│   │   ├── technologies.controller.ts
│   │   ├── technologies.module.ts
│   │   └── technologies.service.ts
│   ├── testing/
│   │   ├── user.mock.ts
│   │   └── user.service.mock.ts
│   ├── users/
│   │   ├── docs/
│   │   │   ├── delete-user.docs.ts
│   │   │   ├── index.ts
│   │   │   └── update-user.docs.ts
│   │   ├── dto/
│   │   │   └── update-user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── vacancies/
│   │   ├── docs/
│   │   │   ├── create-vacancy-response.docs.ts
│   │   │   ├── create-vacancy.docs.ts
│   │   │   ├── delete-vacancy-response.docs.ts
│   │   │   ├── get-vacancies-response.docs.ts
│   │   │   ├── get-vacancy-response.docs.ts
│   │   │   ├── index.ts
│   │   │   ├── update-vacancy-response.docs.ts
│   │   │   └── update-vacancy.docs.ts
│   │   ├── dto/
│   │   │   ├── create-vacancy.dto.ts
│   │   │   └── update-vacancy.dto.ts
│   │   ├── vacancies.controller.ts
│   │   ├── vacancies.module.ts
│   │   └── vacancies.service.ts
│   ├── app.module.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── exports/
│   └── postman.json
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── pull_request_template.md
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

**Controllers**: São os controladores responsáveis por gerenciar as rotas, receber as requisições HTTP, chamar os serviços correspondentes e enviar as respostas.  
**Entities**: Define os esquemas de dados dos principais domínios da aplicação, como User e Vacancy.  
**Dtos**: Define os Data Transfer Objects (DTOs) para as operações de criação e atualização de entidades.  
**Decorators**: Os Decorators são utilizados para anotar classes, métodos, propriedades ou parâmetros de métodos.  
**Guards**: São componentes que determinam se uma requisição deve ser processada ou não. É uma camada de segurança que tem como objetivo controlar os acessos a determinados recursos de uma aplicação.  
**Services**: Implementa a lógica de negócios da aplicação, utilizando os repositórios para acessar e manipular os dados.  
**Enums**: Contém código de strings prontas com mensagens de erro, sucesso dentre outros.  
**Testing**: Contém testes.  

## Rotas Principais

### Auth

**POST /register:** Cria um novo usuário.  


### Companies

### Technologies

### Users

### Vacancies


## Instruções de Uso Online

## Instruções de Instalação e Uso Local
Para executar o projeto localmente, siga estas etapas:

Clone o repositório para o seu ambiente local.
```bash
git clone https://github.com/Arnia-Dev-Students/Metavagas-API.git
```
Instale as dependências utilizando o comando npm install.
```bash
npm install
```
Crie um arquivo .env na raiz do projeto para as variáveis de ambiente, como a URL do banco de dados PostgreSQL e a chave secreta JWT seguindo o exemplo em .env.example.

Execute o comando npm start para iniciar o servidor.
```bash
npm start
```
A API estará disponível em http://localhost:3000 ou na porta definida na variáveis de ambiente.
Acesse as rotas da API usando um cliente HTTP, como Postman ou Insomnia. Lembrando que o export do Postman está disponível em exports/postman.json.
Lembrando que foi feito o deploy do projeto no RailWay, disponível pelo link: 

Parabéns a todos os professores, a monitoria, a Arnia e todos os alunos que se dedicaram para concluir os projetos!

Ass: {Emoji das TMNT}