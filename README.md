# Vehicle Rental Service

Vehicle Rental Service

# Descricao

Serviço de criação de ordem de aluguel de veículos.

## Funcionalidades

- Customer Microservice

  - Usuário deve poder se registrar;
  - Usuário deve poder consultar suas informações pessoais;
  - Usuário deve poder alterar suas informações pessoais. Exceto email e CPF;
  - Usuário deve poder desativar o seu cadastro quando desejar.

- Rental Microservice

  - Usuário deve poder consultar suas ordens de aluguel;
  - Usuário deve poder consultar veículos disponíveis para aluguel;
  - Usuário deve poder criar nova ordem de aluguel;
  - Usuário deve poder atualizar uma ordem de aluguel;
  - Usuário deve poder finalizar (devolver o veiculo) de uma ordem de aluguel;
  - Usuário deve poder cancelar uma ordem de aluguel.

- Admin Microservice
  - Administrado deve poder consultar veículos cadastrados;
  - Administrado deve poder cadastrar novos veículos;
  - Administrado deve poder atualizar veículos;
  - Administrado deve poder remover veículos;

# Fluxo de negócio

**Cadastro de veículos**:

1. O Administrador cadastra um novo veículo no sistema através do Frontend.
2. O serviço `ms-admin` valida se veículo com a placa enviada já está registrado ou não. Caso seja um novo veículo, registra no banco de dados interno e envia os dados do veículo para uma fila do RabbitMQ.
3. O serviço `ms-rental` consome as mensagens da fila de `vehicle` e registra os dados do mesmo internamente no seu banco de dados.

**Cadastro de usuários**:

1. O Usuário se registra no sistema através do Frontend.
2. O serviço `ms-bff` direciona a requisição para o serviço `ms-customer`.
3. O serviço `ms-customer` valida se o usuário já está registrado ou não. Caso seja um novo usuáriom, registra no banco de dados interno e envia os dados do usuário para uma fila do RabbitMQ.
4. O serviço `ms-rental` consome as mensagens da fila de `customer` e registra os dados do mesmo internamento no seu banco de dados.

**Criação de nova Ordem de Aluguel**:

1. O Usuário faz a criação da ordem de alguel através do Frontend.
2. O serviço `ms-bff` direciona a requisição para o serviço `ms-rental`.
3. O serviço `ms-rental` valida se o veículo está disponível ou não. Caso esteja, registra no banco de dados interno.

# Arquitetura

![alt text](./docs/vehicle-rental.png)
