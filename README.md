### 整个项目结构

```
├── models(mongoos.js model,宗旨上以数据表名一一对应)
├── routes(接口)
├── service (服务层,一般用于需要封装的独立服务,比如db)
├── src (前端工程)
│   |── components (公用自定义组件，以文件夹为单位)
│   |── img (图片)
│   |── pages (页面级别组件，以文件夹为单位)
│   |── service (前端的Ajax请求函数封装)
│   |── style (核心样式表-总)
│   |── tools (前端工具函数)
│   |── index.js (入口)
│   |── router.js (前端路由表)
│   |── README.md
├── app.js (入口)
├── README.md
```

运行前：
- $ yarn install

启动：
- 前端：yarn start
- 后端: yarn server


参考 ：
- https://www.npmjs.com/package/mongoose-auto-increment
- http://www.runoob.com/mongodb/mongodb-tutorial.html
- http://mongoosejs.com/


> 本身mongodb不支持自增id,
所以加了一个自增插件
mongoose-auto-increment


##### 喜欢记得 打星呀 :)
