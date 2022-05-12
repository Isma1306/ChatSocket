//@ts-check
'use strict';

const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_ORANGE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
(async () => {
  await sequelize.sync({ force: true });

})();

module.exports = { sequelize, DataTypes };
