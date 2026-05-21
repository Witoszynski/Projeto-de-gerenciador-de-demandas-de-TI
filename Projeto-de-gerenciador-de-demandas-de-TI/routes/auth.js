const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, nome } = req.body;
    const connection = await pool.getConnection();

    await connection.execute(
      'INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)',
      [email, password, nome]
    );

    connection.release();
    res.json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, password]
    );

    connection.release();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: rows[0].id, email: rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, usuario: rows[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
