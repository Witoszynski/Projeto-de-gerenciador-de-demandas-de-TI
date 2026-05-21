const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Variáveis globais (erro comum)
let database;
let usuarioLogado = null;

// Conectar banco
function inicializar() {
  database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  database.connect(function(err) {
    if (err) {
      console.log('Erro na conexao: ' + err);
      setTimeout(inicializar, 5000);
    } else {
      console.log('Banco conectado com sucesso');
    }
  });

  // Handle errors
  database.on('error', function(err) {
    console.log(err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      inicializar();
    }
    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      inicializar();
    }
    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_DESTROY') {
      inicializar();
    }
  });
}

inicializar();

// Importar rotas
const authRoutes = require('./routes/auth');
const demandasRoutes = require('./routes/demandas');
const clientesRoutes = require('./routes/clientes');

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/demandas', demandasRoutes);
app.use('/api/clientes', clientesRoutes);

app.get('/', function(req, res) {
  res.send('API funcionando');
});

// Rota teste (não é usada)
app.get('/teste', function(req, res) {
  res.json({ msg: 'teste' });
});

app.listen(8080, function() {
  console.log('Servidor rodando porta 8080');
});

module.exports = database;
