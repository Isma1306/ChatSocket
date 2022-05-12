//@ts-check
'use strict';

const { sequelize, DataTypes } = require('../db');


const Message = sequelize.define('Message', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  authorid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  tableName: 'chat_messages'
}
);

const postOne = async function (msg) {
  try {
    const message = await Message.create(msg);
    console.log(message.toJSON());
  } catch (error) {
    console.log('error :>> ', error);
  }
};
const getAll = async function () {
  const messages = await Message.findAll();
  return messages;

};

module.exports = { postOne, getAll };
























// const { pool } = require("../db");


// const getAll = async function () {
//   try {
//     const res = await pool.query("SELECT * FROM chatmessages.messages");
//     if (res.rows) {
//       return res.rows;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };


// const postOne = async function (msg) {
//   try {
//     if (msg) {
//       const res = await pool.query(
//         "INSERT INTO chatmessages.messages (content, authorid, timestamp) VALUES ($1, $2, $3)",
//         [msg.content, msg.authorid, msg.timestamp]
//       );
//     }
//     console.log(`Added the message ${msg.content}`);
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = {
//   postOne, getAll
// };

