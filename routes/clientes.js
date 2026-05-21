const express = require('express');
const db = require('../server');
const checarToken = require('../middleware/auth');
const router = express.Router();

// GET - Listar clientes
router.get('/', checarToken, function(req, res) {
  let sql = 'SELECT * FROM clientes';

  db.query(sql, function(erro, resultados) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false, msg: 'erro ao listar' });
    }

    res.json(resultados);
  });
});

// POST - Criar cliente
router.post('/', checarToken, function(req, res) {
  let nome = req.body.nome;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let empresa = req.body.empresa;

  // Validação fraca
  if (!nome || nome == '' || nome == null) {
    return res.json({ ok: false, msg: 'nome obrigatorio' });
  }

  // SQL Injection
  let sqlInserir = "INSERT INTO clientes (nome, email, telefone, empresa) VALUES ('" + nome + "', '" + email + "', '" + telefone + "', '" + empresa + "')";

  db.query(sqlInserir, function(erro, resultado) {
    if (erro) {
      console.log('erro: ' + erro);
      return res.json({ ok: false, msg: 'erro ao criar cliente' });
    }

    res.json({ ok: true, msg: 'cliente criado' });
  });
});

// GET - Buscar cliente por ID
router.get('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlBuscar = 'SELECT * FROM clientes WHERE id = ' + id;

  db.query(sqlBuscar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ msg: 'cliente nao encontrado' });
    }

    res.json(resultado[0]);
  });
});

// PUT - Atualizar cliente
router.put('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let nome = req.body.nome;
  let email = req.body.email;
  let telefone = req.body.telefone;
  let empresa = req.body.empresa;

  // SQL Injection
  let sqlAtualizar = "UPDATE clientes SET nome = '" + nome + "', email = '" + email + "', telefone = '" + telefone + "', empresa = '" + empresa + "' WHERE id = " + id;

  db.query(sqlAtualizar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false, msg: 'erro ao atualizar' });
    }

    res.json({ ok: true, msg: 'atualizado' });
  });
});

// DELETE - Deletar cliente
router.delete('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlDeletar = 'DELETE FROM clientes WHERE id = ' + id;

  db.query(sqlDeletar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false });
    }

    res.json({ ok: true, msg: 'deletado' });
  });
});

module.exports = router;
