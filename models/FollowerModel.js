const Sequelize = require('sequelize');
const sequelize = require('../database'); // Importe sua instância do Sequelize aqui
const User = require('./UserModel');

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
    defaultValue: new Date(),
    allowNull: true,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: true,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
});

Follower.belongsTo(User, { as: 'followerUser', foreignKey: 'user_follower_id' });
Follower.belongsTo(User, { as: 'followingUser', foreignKey: 'users_followed_id' });

module.exports = Follower;
