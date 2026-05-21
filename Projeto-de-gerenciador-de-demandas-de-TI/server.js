const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/demandas', require('./routes/demandas'));
app.use('/api/clientes', require('./routes/clientes'));

app.get('/', (req, res) => {
  res.send('Servidor de gerenciador de demandas funcionando!');
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});
