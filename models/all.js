/**
 * 定义 数据结构 及 操作数据库的model
 */

const db = require('../service/db.js'),
    Schema = db.mongoose.Schema;

/**
 * 定义 modal数据结构
 */
const allSchema = new Schema({
      name: {
        type: String
      },                       //名字
      age: {
        type: String
      },                       //年龄
      address: {
        type: String
      }                        //地址
    }, {
      versionKey: false        // 版本号不显示
    })


//创建其他modal只需改下 model名 和 数据结构
const modalName = "all"

/**
 * id自增插件引入  设置从1开始自增
 */
allSchema.plugin(db.autoIncrement.plugin, { model: modalName, field: 'id', startAt:1 });

module.exports = db.connection.model(modalName, allSchema);
