const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../server');
const router = express.Router();
const { encryptDoubleDES, decryptDoubleDES, hashPassword, verifyPassword } = require('../utils/crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production-64bit';

function gerarToken(id, email) {
  return jwt.sign(
    { id: id, email: email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// POST Login
router.post('/login', async function(req, res) {
  let email = req.body.email;
  let senha = req.body.senha;

  if (!email || email === '') {
    return res.status(400).json({ msg: 'email nao enviado ou vazio' });
  }

  if (!senha || senha === '') {
    return res.status(400).json({ msg: 'senha nao enviada ou vazia' });
  }

  // Criptografar email para buscar no banco
  const encryptedEmail = encryptDoubleDES(email, ENCRYPTION_KEY);

  // Usar prepared statement com placeholder
  let queryLogin = "SELECT id, email, nome, senha FROM usuarios WHERE email = ?";

  db.query(queryLogin, [encryptedEmail], async function(erro, resultados) {
    if (erro) {
      console.log('Erro na query: ' + erro);
      return res.status(500).json({ msg: 'erro ao buscar usuario' });
    }

    if (resultados.length <= 0) {
      return res.status(401).json({ msg: 'usuario ou senha errado' });
    }

    try {
      let usuario = resultados[0];

      // Verificar senha hasheada
      const senhaCorreta = await verifyPassword(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ msg: 'usuario ou senha errado' });
      }

      // Descriptografar email para retornar
      const emailDescriptografado = decryptDoubleDES(usuario.email, ENCRYPTION_KEY);

      // Gerar token
      let token = gerarToken(usuario.id, emailDescriptografado);

      return res.json({
        sucesso: true,
        token: token,
        usuario_id: usuario.id,
        usuario_email: emailDescriptografado,
        usuario_nome: usuario.nome
      });
    } catch (err) {
      console.log('Erro ao verificar senha: ' + err);
      return res.status(500).json({ msg: 'erro ao fazer login' });
    }
  });
});

// POST Register
router.post('/register', async function(req, res) {
  let email = req.body.email;
  let senha = req.body.senha;
  let nome = req.body.nome;

  if (!email || email === '') {
    return res.status(400).json({ ok: false, msg: 'email nao fornecido ou vazio' });
  }

  if (!senha || senha === '') {
    return res.status(400).json({ ok: false, msg: 'senha nao fornecida ou vazia' });
  }

  if (!nome || nome === '') {
    return res.status(400).json({ ok: false, msg: 'nome nao fornecido ou vazio' });
  }

  try {
    // Hash da senha
    const senhaHasheada = await hashPassword(senha);

    // Criptografar email com Double DES
    const emailCriptografado = encryptDoubleDES(email, ENCRYPTION_KEY);

    // Usar prepared statement
    let queryRegistro = "INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)";

    db.query(queryRegistro, [emailCriptografado, senhaHasheada, nome], function(erro, resultado) {
      if (erro) {
        console.log('Erro ao registrar: ' + erro);

        if (erro.code == 'ER_DUP_ENTRY') {
          return res.status(409).json({ ok: false, msg: 'email ja existe' });
        }

        return res.status(500).json({ ok: false, msg: 'erro ao registrar usuario' });
      }

      return res.status(201).json({ ok: true, msg: 'usuario criado com sucesso', usuario_id: resultado.insertId });
    });
  } catch (err) {
    console.log('Erro ao hashear senha: ' + err);
    return res.status(500).json({ ok: false, msg: 'erro ao registrar usuario' });
  }
});

module.exports = router;
