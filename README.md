# Gerenciador de Demandas

Projeto feito em Express + MySQL + JWT

## Como usar

1. npm install
2. Criar banco com schema.sql
3. npm start

## Rotas

Auth:
- POST /api/auth/login
- POST /api/auth/register

Demandas (precisa token):
- GET /api/demandas
- POST /api/demandas
- GET /api/demandas/:id
- PUT /api/demandas/:id
- DELETE /api/demandas/:id

Clientes (precisa token):
- GET /api/clientes
- POST /api/clientes
- GET /api/clientes/:id
- PUT /api/clientes/:id
- DELETE /api/clientes/:id
