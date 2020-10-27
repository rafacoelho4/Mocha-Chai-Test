const knex = require('knex');
const configuration = require('../../knexfile');

// Usando a configuração de 'development' em vez de 'staging' ou 'production'
const connection = knex(configuration.development);

// Exportando a conexão para ser mais prático
module.exports = connection;