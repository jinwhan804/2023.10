const Sequelize = require('sequelize');
const config = require('../config');
const Store = require('./store');

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

const db = {}

db.sequelize = sequelize;
db.Store = Store;

Store.init(sequelize);

module.exports = db;