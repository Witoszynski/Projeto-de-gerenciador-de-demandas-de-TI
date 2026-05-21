const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../server');
const router = express.Router();

// Função para gerar token (repetida depois)
function gerarToken(id, email) {
  return jwt.sign(
    { id: id, email: email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// POST Login
router.post('/login', function(req, res) {
  let email = req.body.email;
  let senha = req.body.senha;

  // Validação ruim
  if (email == null) {
    return res.status(400).json({ msg: 'email nao enviado' });
  }

  if (senha == null) {
    return res.status(400).json({ msg: 'senha nao enviada' });
  }

  if (email == '') {
    return res.status(400).json({ msg: 'email vazio' });
  }

  if (senha == '') {
    return res.status(400).json({ msg: 'senha vazia' });
  }

  // SQL com concatenação direta (SQL Injection)
  let queryLogin = "SELECT id, email, nome FROM usuarios WHERE email = '" + email + "' AND senha = '" + senha + "'";

  db.query(queryLogin, function(erro, resultados) {
    if (erro) {
      console.log('Erro na query: ' + erro);
      return res.status(500).json({ msg: 'erro ao buscar usuario' });
    }

    if (resultados.length <= 0) {
      return res.status(401).json({ msg: 'usuario ou senha errado' });
    }

    if (resultados.length > 0) {
      let usuario = resultados[0];

      // Gerar token
      let token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        sucesso: true,
        token: token,
        usuario_id: usuario.id,
        usuario_email: usuario.email,
        usuario_nome: usuario.nome
      });
    }
  });
});

// POST Register
router.post('/register', function(req, res) {
  let email = req.body.email;
  let senha = req.body.senha;
  let nome = req.body.nome;

  // Validações repetidas e fracas
  if (!email) return res.json({ ok: false, msg: 'email vazio' });
  if (!senha) return res.json({ ok: false, msg: 'senha vazia' });
  if (!nome) return res.json({ ok: false, msg: 'nome vazio' });

  if (email == '') return res.json({ ok: false, msg: 'email vazio mesmo' });
  if (senha == '') return res.json({ ok: false, msg: 'senha vazia mesmo' });
  if (nome == '') return res.json({ ok: false, msg: 'nome vazio mesmo' });

  // Query com SQL Injection
  let queryRegistro = "INSERT INTO usuarios (email, senha, nome) VALUES ('" + email + "', '" + senha + "', '" + nome + "')";

  db.query(queryRegistro, function(erro, resultado) {
    if (erro) {
      console.log('Erro ao registrar: ' + erro);

      if (erro.code == 'ER_DUP_ENTRY') {
        return res.json({ ok: false, msg: 'email ja existe' });
      }

      return res.json({ ok: false, msg: 'erro ao registrar usuario' });
    }

    return res.json({ ok: true, msg: 'usuario criado com sucesso' });
  });
});

module.exports = router;
