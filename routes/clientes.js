const express = require('express');
const db = require('../server');
const checarToken = require('../middleware/auth');
const router = express.Router();
const { encryptDoubleDES, decryptDoubleDES } = require('../utils/crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-64bit';

// Descriptografar dados de clientes
function descriptografarCliente(cliente) {
  if (cliente.email) {
    cliente.email = decryptDoubleDES(cliente.email, ENCRYPTION_KEY) || cliente.email;
  }
  if (cliente.telefone) {
    cliente.telefone = decryptDoubleDES(cliente.telefone, ENCRYPTION_KEY) || cliente.telefone;
  }
  if (cliente.empresa) {
    cliente.empresa = decryptDoubleDES(cliente.empresa, ENCRYPTION_KEY) || cliente.empresa;
  }
  return cliente;
}

// GET - Listar clientes
router.get('/', checarToken, function(req, res) {
  let sql = 'SELECT * FROM clientes';

  db.query(sql, function(erro, resultados) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao listar clientes' });
    }

    // Descriptografar cada cliente
    const clientes = resultados.map(c => descriptografarCliente(c));
    res.json(clientes);
  });
});

// POST - Criar cliente
router.post('/', checarToken, function(req, res) {
  let nome = req.body.nome;
  let email = req.body.email || '';
  let telefone = req.body.telefone || '';
  let empresa = req.body.empresa || '';

  if (!nome || nome === '') {
    return res.status(400).json({ ok: false, msg: 'nome nao fornecido ou vazio' });
  }

  // Criptografar dados sensíveis
  const emailCriptografado = encryptDoubleDES(email, ENCRYPTION_KEY);
  const telefoneCriptografado = encryptDoubleDES(telefone, ENCRYPTION_KEY);
  const empresaCriptografada = encryptDoubleDES(empresa, ENCRYPTION_KEY);

  // Usar prepared statement
  let sqlInserir = "INSERT INTO clientes (nome, email, telefone, empresa) VALUES (?, ?, ?, ?)";

  db.query(sqlInserir, [nome, emailCriptografado, telefoneCriptografado, empresaCriptografada], function(erro, resultado) {
    if (erro) {
      console.log('erro: ' + erro);
      return res.status(500).json({ ok: false, msg: 'erro ao criar cliente' });
    }

    res.status(201).json({ ok: true, msg: 'cliente criado com sucesso', cliente_id: resultado.insertId });
  });
});

// GET - Buscar cliente por ID
router.get('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlBuscar = 'SELECT * FROM clientes WHERE id = ?';

  db.query(sqlBuscar, [id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao buscar cliente' });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ ok: false, msg: 'cliente nao encontrado' });
    }

    // Descriptografar cliente
    const cliente = descriptografarCliente(resultado[0]);
    res.json(cliente);
  });
});

// PUT - Atualizar cliente
router.put('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let nome = req.body.nome;
  let email = req.body.email || '';
  let telefone = req.body.telefone || '';
  let empresa = req.body.empresa || '';

  if (!nome || nome === '') {
    return res.status(400).json({ ok: false, msg: 'nome nao fornecido ou vazio' });
  }

  // Criptografar dados sensíveis
  const emailCriptografado = encryptDoubleDES(email, ENCRYPTION_KEY);
  const telefoneCriptografado = encryptDoubleDES(telefone, ENCRYPTION_KEY);
  const empresaCriptografada = encryptDoubleDES(empresa, ENCRYPTION_KEY);

  // Usar prepared statement
  let sqlAtualizar = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, empresa = ? WHERE id = ?";

  db.query(sqlAtualizar, [nome, emailCriptografado, telefoneCriptografado, empresaCriptografada, id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao atualizar cliente' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'cliente nao encontrado' });
    }

    res.json({ ok: true, msg: 'cliente atualizado com sucesso' });
  });
});

// DELETE - Deletar cliente
router.delete('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlDeletar = 'DELETE FROM clientes WHERE id = ?';

  db.query(sqlDeletar, [id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao deletar cliente' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'cliente nao encontrado' });
    }

    res.json({ ok: true, msg: 'cliente deletado com sucesso' });
  });
});

module.exports = router;
