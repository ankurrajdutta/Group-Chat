const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('groupChat', 'root', '*10Ard.#', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports=sequelize;