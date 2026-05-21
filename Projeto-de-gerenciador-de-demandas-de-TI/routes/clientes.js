const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [clientes] = await connection.execute('SELECT * FROM clientes');
    connection.release();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { nome, email, telefone, empresa } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO clientes (nome, email, telefone, empresa) VALUES (?, ?, ?, ?)',
      [nome, email, telefone, empresa]
    );

    connection.release();
    res.json({ message: 'Cliente criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [cliente] = await connection.execute(
      'SELECT * FROM clientes WHERE id = ?',
      [req.params.id]
    );
    connection.release();
    res.json(cliente[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { nome, email, telefone, empresa } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'UPDATE clientes SET nome = ?, email = ?, telefone = ?, empresa = ? WHERE id = ?',
      [nome, email, telefone, empresa, req.params.id]
    );

    connection.release();
    res.json({ message: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM clientes WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Cliente deletado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
