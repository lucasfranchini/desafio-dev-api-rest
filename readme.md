# DESAFIO DEV API REST

API Rest feita para o desafio <https://github.com/cdt-baas/desafio-dev-api-rest>

## Sobre

Essa é uma API Rest feita para gerenciar contas bancarias e seus respectivos saldos, nela é possivel:

- Criar um novo portador junto com uma conta referente ao mesmo
- atualizar o status da conta para bloqueado, ativa ou inativa
- fazer o saque de um valor depositado na conta
- fazer o deposito de valores na conta
- remove um portador junto com sua respectiva conta do banco de dados
- pegar o extrato das transações de uma respectiva conta por periodo

## Como rodar

1. Clone este repositorio
2. instale o docker e o docker compose na sua maquina
3. crie uma .env com os valores presente no arquivo .env.example que esta no projeto
4. rode o comando `docker compose up` para iniciar o projeto
5. seu projeto estara rodando na url: <http://localhost:3000/>

## Rotas disponiveis

As rotas disponiveis podem ser visualizadas utilizando o swagger que esta presente no proprio projeto.

Ao rodar o projeto acesse o endpoint /doc para visualizar os endpoints disponiveis e suas respectivas respostas. Se seguiu os passos anteriores de como rodar é possivel acessar a documentação pela url <http://localhost:3000/doc>

É Possivel fazer requisições utilizando o proprio swagger caso prefira

## como rodar os testes

1. Clone este repositorio
2. rode os testes unitarios executando o comando `npm run test`
3. Rode os testes end to end executando o comando `npm run test:e2e`

## melhorias e observações

- Inicialmente foi feito a criação de conta junto com a criação de um portador para facilidade de implementação no caso de uma relação 1 para 1 e por não ver a necessidade de uma criação manual de contas
- idealmente o número da conta seria um valor de 8 a 12 dígitos de acordo, mas para propósitos de simplificação de código e facilidade de leitura escolhi a abordagem de um número incremental no banco de dados.
- Pensando em microsserviços acredito que seria interessante separar o projeto em 2 possíveis serviços diferentes, um de extrato, e um para contas e portadores, projeto foi separado de forma que a migração do mesmo para os serviços mencionados fosse feita de forma simples.
- Olhando para a segurança do projeto esses endpoints deveriam estar em um servidor que não tivesse sua rota exposta para o acesso publico e um token de autenticação seria uma boa evolução para garantir que apenas usuários permitidos acessem as rotas corretas
- Na criação de um novo portador foi removido as informações de erros de banco de dados como no caso de um cpf duplicado para prevenir vazamento de informações sensíveis
- Foi criado um endpoint para atualização de status que seria utilizado tanto para o bloqueio, desbloqueio ou cancelamento de uma conta Dock, a ideia seria com a implementação de uma autenticação validar a permissão do usuário relacionado ao status escolhido, então o próprio portador só teria a possibilidade de bloquear enquanto um administrador da Dock poderia bloquear, desbloquear ou inativar uma conta através do numero da mesma
- Idealmente todas a rotas e consumidores deveriam ser testados com testes end to end ou de integração, mas devido ao curto periodo não foi possivel finalizar todos os testes end to end, porém todas as services foram testados com testes unitarios

## Teconologias

Foram utilizadas as seguintes ferramentas e frameworks para a criação deste projeto:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whiteE'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img style='margin: 5px;' alt="Static Badge" src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=%23FFFFFF">
  <img style='margin: 5px;' alt="Static Badge" src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=%23FFFFFF">
  <img style='margin: 5px;' alt="Static Badge" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=%23FFFFFF">
  
</p>
