const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

Post.belongsTo(User, { as: 'user', foreignKey: 'user_id' });

module.exports = Post;