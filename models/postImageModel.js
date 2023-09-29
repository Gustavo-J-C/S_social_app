const Sequelize = require('sequelize');
const sequelize = require('../database');

const PostImage = sequelize.define('post_image', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
  },
  post_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  originalname: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  path: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  filename: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  size: {
    type: Sequelize.INTEGER,
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

module.exports = PostImage;