const express = require('express');
const db = require('../server');
const checarToken = require('../middleware/auth');
const router = express.Router();

// GET - Listar todas demandas
router.get('/', checarToken, function(req, res) {
  let sql = 'SELECT * FROM demandas';

  db.query(sql, function(erro, resultados) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false, msg: 'erro ao listar' });
    }

    res.json(resultados);
  });
});

// POST - Criar demanda
router.post('/', checarToken, function(req, res) {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  let status = req.body.status;
  let prioridade = req.body.prioridade;
  let usuario_id = req.body.usuario_id;

  // Validação confusa
  if (!titulo || titulo == '' || titulo == null) {
    return res.json({ ok: false, msg: 'titulo vazio' });
  }

  // Valores padrão confusos
  let st = status;
  if (st == null || st == undefined || st == '') {
    st = 'aberta';
  }

  let pr = prioridade;
  if (pr == null || pr == undefined || pr == '') {
    pr = 'media';
  }

  let desc = descricao;
  if (desc == null) {
    desc = '';
  }

  // SQL Injection
  let sqlInserir = "INSERT INTO demandas (titulo, descricao, status, prioridade, usuario_id) VALUES ('" + titulo + "', '" + desc + "', '" + st + "', '" + pr + "', " + usuario_id + ")";

  db.query(sqlInserir, function(erro, resultado) {
    if (erro) {
      console.log('erro: ' + erro);
      return res.json({ ok: false, msg: 'erro ao criar' });
    }

    res.json({ ok: true, msg: 'demanda criada' });
  });
});

// GET - Buscar demanda por ID
router.get('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlBuscar = 'SELECT * FROM demandas WHERE id = ' + id;

  db.query(sqlBuscar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ msg: 'demanda nao encontrada' });
    }

    res.json(resultado[0]);
  });
});

// PUT - Atualizar demanda
router.put('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  let status = req.body.status;
  let prioridade = req.body.prioridade;

  // SQL Injection
  let sqlAtualizar = "UPDATE demandas SET titulo = '" + titulo + "', descricao = '" + descricao + "', status = '" + status + "', prioridade = '" + prioridade + "' WHERE id = " + id;

  db.query(sqlAtualizar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false, msg: 'erro ao atualizar' });
    }

    res.json({ ok: true, msg: 'atualizado com sucesso' });
  });
});

// DELETE - Deletar demanda
router.delete('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlDeletar = 'DELETE FROM demandas WHERE id = ' + id;

  db.query(sqlDeletar, function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.json({ ok: false });
    }

    res.json({ ok: true, msg: 'deletado' });
  });
});

module.exports = router;
