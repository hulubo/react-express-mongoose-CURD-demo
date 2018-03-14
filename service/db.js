/**
 * mongoose初始化配置
 */

const mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/test',
    autoIncrement = require('mongoose-auto-increment');
/**
 * 连接
 */
const connection = mongoose.createConnection(DB_URL);

/**
 * id自增插件初始化
 */
autoIncrement.initialize(connection);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = {
  mongoose:mongoose,
  connection:connection,
  autoIncrement:autoIncrement,
};
