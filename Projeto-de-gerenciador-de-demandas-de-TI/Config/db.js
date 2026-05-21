const mysql = require('mysql2');
require('dotenv').config();

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexao.connect((erro) => {

    if (erro) {
        console.log('Erro ao conectar no MySQL');
        console.log(erro);
    } else {
        console.log('MySQL conectado com sucesso');
    }

});

module.exports = conexao;