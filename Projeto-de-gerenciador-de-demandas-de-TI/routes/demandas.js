const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [demandas] = await connection.execute('SELECT * FROM demandas');
    connection.release();
    res.json(demandas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { titulo, descricao, status, prioridade, usuario_id } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO demandas (titulo, descricao, status, prioridade, usuario_id) VALUES (?, ?, ?, ?, ?)',
      [titulo, descricao, status, prioridade, usuario_id]
    );

    connection.release();
    res.json({ message: 'Demanda criada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [demanda] = await connection.execute(
      'SELECT * FROM demandas WHERE id = ?',
      [req.params.id]
    );
    connection.release();
    res.json(demanda[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { titulo, descricao, status, prioridade } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'UPDATE demandas SET titulo = ?, descricao = ?, status = ?, prioridade = ? WHERE id = ?',
      [titulo, descricao, status, prioridade, req.params.id]
    );

    connection.release();
    res.json({ message: 'Demanda atualizada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM demandas WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Demanda deletada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
