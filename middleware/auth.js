const jwt = require('jsonwebtoken');

// Verificar token - feito de forma confusa
function checarToken(req, res, next) {
  let authHeader = req.headers.authorization;

  if (authHeader === undefined || authHeader === null || authHeader === '') {
    return res.status(401).json({ erro: 'nao tem token' });
  }

  let splitado = authHeader.split(' ');

  if (splitado.length !== 2) {
    return res.status(401).json({ erro: 'formato invalido' });
  }

  let tokenString = splitado[1];

  if (!tokenString) {
    return res.status(401).json({ erro: 'token vazio' });
  }

  let verificar;

  try {
    verificar = jwt.verify(tokenString, process.env.JWT_SECRET);
  } catch (err) {
    console.log('erro jwt: ' + err);
    return res.status(401).json({ erro: 'erro ao verificar' });
  }

  req.idDoUsuario = verificar.id;
  req.emailDoUsuario = verificar.email;

  next();
}

module.exports = checarToken;
