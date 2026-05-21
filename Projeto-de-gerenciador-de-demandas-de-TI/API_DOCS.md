# Gerenciador de Demandas de TI - API

## Setup Inicial

### 1. Instalar Dependências
```bash
npm install
```

### 2. Criar Banco de Dados
Execute o arquivo `schema.sql` no seu MySQL:
```bash
mysql -u root -p < schema.sql
```

### 3. Configurar Variáveis de Ambiente
Edite o arquivo `.env` com suas credenciais MySQL:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_suporte
JWT_SECRET=segredo_super_api
```

### 4. Iniciar Servidor
```bash
npm start
```

Servidor rodará em: `http://localhost:8080`

---

## Endpoints da API

### Autenticação

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}

Response:
{
  "token": "jwt_token_aqui",
  "usuario": { id, email, nome }
}
```

#### Registrar
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "novo@example.com",
  "password": "senha123",
  "nome": "Novo Usuário"
}
```

### Demandas (Requer Token JWT)

#### Listar todas as demandas
```
GET /api/demandas
Authorization: Bearer {token}
```

#### Criar demanda
```
POST /api/demandas
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Corrigir bug",
  "descricao": "Descrição detalhada",
  "status": "aberta",
  "prioridade": "alta",
  "usuario_id": 1
}
```

#### Obter demanda por ID
```
GET /api/demandas/:id
Authorization: Bearer {token}
```

#### Atualizar demanda
```
PUT /api/demandas/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Novo título",
  "descricao": "Nova descrição",
  "status": "fechada",
  "prioridade": "media"
}
```

#### Deletar demanda
```
DELETE /api/demandas/:id
Authorization: Bearer {token}
```

### Clientes (Requer Token JWT)

#### Listar todos os clientes
```
GET /api/clientes
Authorization: Bearer {token}
```

#### Criar cliente
```
POST /api/clientes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Empresa XYZ",
  "email": "contato@xyz.com",
  "telefone": "(11) 1234-5678",
  "empresa": "XYZ Ltda"
}
```

#### Obter cliente por ID
```
GET /api/clientes/:id
Authorization: Bearer {token}
```

#### Atualizar cliente
```
PUT /api/clientes/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Novo Nome",
  "email": "novo@xyz.com",
  "telefone": "(11) 9876-5432",
  "empresa": "Nova Empresa"
}
```

#### Deletar cliente
```
DELETE /api/clientes/:id
Authorization: Bearer {token}
```

---

## Estrutura de Pastas

```
projeto/
├── server.js           # Arquivo principal
├── db.js              # Conexão com BD
├── schema.sql         # Estrutura do BD
├── .env               # Variáveis de ambiente
├── package.json       # Dependências
├── routes/
│   ├── auth.js        # Rotas de autenticação
│   ├── demandas.js    # Rotas de demandas
│   └── clientes.js    # Rotas de clientes
└── middleware/
    └── auth.js        # Middleware de autenticação JWT
```
