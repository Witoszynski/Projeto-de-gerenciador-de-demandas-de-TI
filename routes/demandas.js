const express = require('express');
const db = require('../server');
const checarToken = require('../middleware/auth');
const router = express.Router();
const { encryptDoubleDES, decryptDoubleDES } = require('../utils/crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-64bit';

// Descriptografar dados de demandas
function descriptografarDemanda(demanda) {
  if (demanda.descricao) {
    demanda.descricao = decryptDoubleDES(demanda.descricao, ENCRYPTION_KEY) || demanda.descricao;
  }
  return demanda;
}

// GET - Listar todas demandas
router.get('/', checarToken, function(req, res) {
  let sql = 'SELECT * FROM demandas';

  db.query(sql, function(erro, resultados) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao listar' });
    }

    // Descriptografar cada demanda
    const demandas = resultados.map(d => descriptografarDemanda(d));
    res.json(demandas);
  });
});

// POST - Criar demanda
router.post('/', checarToken, function(req, res) {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao || '';
  let status = req.body.status || 'aberta';
  let prioridade = req.body.prioridade || 'media';
  let usuario_id = req.idDoUsuario; // Usar do token, não do corpo

  if (!titulo || titulo === '') {
    return res.status(400).json({ ok: false, msg: 'titulo nao fornecido ou vazio' });
  }

  // Criptografar descrição
  const descricaoCriptografada = encryptDoubleDES(descricao, ENCRYPTION_KEY);

  // Usar prepared statement
  let sqlInserir = "INSERT INTO demandas (titulo, descricao, status, prioridade, usuario_id) VALUES (?, ?, ?, ?, ?)";

  db.query(sqlInserir, [titulo, descricaoCriptografada, status, prioridade, usuario_id], function(erro, resultado) {
    if (erro) {
      console.log('erro: ' + erro);
      return res.status(500).json({ ok: false, msg: 'erro ao criar demanda' });
    }

    res.status(201).json({ ok: true, msg: 'demanda criada', demanda_id: resultado.insertId });
  });
});

// GET - Buscar demanda por ID
router.get('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlBuscar = 'SELECT * FROM demandas WHERE id = ?';

  db.query(sqlBuscar, [id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao buscar' });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ ok: false, msg: 'demanda nao encontrada' });
    }

    // Descriptografar demanda
    const demanda = descriptografarDemanda(resultado[0]);
    res.json(demanda);
  });
});

// PUT - Atualizar demanda
router.put('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let titulo = req.body.titulo;
  let descricao = req.body.descricao || '';
  let status = req.body.status;
  let prioridade = req.body.prioridade;

  if (!titulo || titulo === '') {
    return res.status(400).json({ ok: false, msg: 'titulo nao fornecido ou vazio' });
  }

  // Criptografar descrição
  const descricaoCriptografada = encryptDoubleDES(descricao, ENCRYPTION_KEY);

  // Usar prepared statement
  let sqlAtualizar = "UPDATE demandas SET titulo = ?, descricao = ?, status = ?, prioridade = ? WHERE id = ?";

  db.query(sqlAtualizar, [titulo, descricaoCriptografada, status, prioridade, id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao atualizar' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'demanda nao encontrada' });
    }

    res.json({ ok: true, msg: 'demanda atualizada com sucesso' });
  });
});

// DELETE - Deletar demanda
router.delete('/:id', checarToken, function(req, res) {
  let id = req.params.id;
  let sqlDeletar = 'DELETE FROM demandas WHERE id = ?';

  db.query(sqlDeletar, [id], function(erro, resultado) {
    if (erro) {
      console.log(erro);
      return res.status(500).json({ ok: false, msg: 'erro ao deletar' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'demanda nao encontrada' });
    }

    res.json({ ok: true, msg: 'demanda deletada com sucesso' });
  });
});

module.exports = router;
