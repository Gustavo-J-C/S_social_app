const Sequelize = require('sequelize');

// Configure sua conexão com o banco de dados
const sequelize = new Sequelize('social', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  // Outras opções de configuração, se necessário
});

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = sequelize;