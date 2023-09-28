const Sequelize = require('sequelize');
const sequelize = require('../database'); // Importe sua instância do Sequelize aqui

const Follower = sequelize.define('followers', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  users_followed_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  user_follower_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

module.exports = Follower;
