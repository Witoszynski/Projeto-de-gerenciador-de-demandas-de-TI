const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? AND senha = ?
    `;

    db.query(sql, [email, senha], (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                erro: 'Erro no servidor'
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos'
            });
        }

        const usuario = resultado[0];

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.json({
            mensagem: 'Login realizado com sucesso',
            token,
            usuario
        });

    });

};