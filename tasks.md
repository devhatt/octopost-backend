# Tasks

- [ ] Melhorar a mensagem de erro do ZOD
- [ ] Criar fluxo de criação de token
  - [ ] Ao criar conta no twitter, precisa ser adicionado um novo registro na tabela de tokens
- [ ] Criar novo metodo no account repository para achar usuario pelo socialUserId
  - [ ] Utilizar esse metodo dentro do fluxo de AuthorizeTwitterService, substituindo o getAccounts (melhoria de fluxo)
- [ ] Ao ocorrer tudo certo com o login, redirecionar o usuario para o front
- [ ] Parse do JWT não está funcionando, talvez por conta de como é feito as ENVS
- [ ] Remover os stubs que tem em testes e implementar os mocks, de acordo com os outros testes implementados
  
## Duvidas

- [ ] Tabela de token tem o account id como unico, como será o fluxo caso o token esteja expirado?
- [ ] Possivel problema, cada rede social deve lidar com oauth de formas diferentes, o twitter nos dá [link](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fce3r09zhvnxrlh8rgekx.png)
