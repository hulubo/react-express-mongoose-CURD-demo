const express = require('express')

const all = require('../models/all')
const Model = all

// 使用 express.Router 可以创建模块化的路由
const main = express.Router()


main.get('/list', async (request, response) => {

  let ret = {
  "success": true,
  "code": 200,
  "message": "",
  "data": [],
  }

  const datas = await Model.find()
  ret.data = datas
  response.send(ret)
})


main.post('/update', async (request, response) => {

  let ret = {
  "success": true,
  "code": 200,
  "message": "",
  "data": [],
  }
  
  const body = request.body,
          id = body.id || 0,
          status = body.status || 0

  const args = body

  if (!id) {
    //新建
    const dataSourceObj = await Model.create(args)

    ret.data = {
      id: dataSourceObj.id, create:true
    }

  }
  else if (!status) {
    //修改
    const dataSourceObj = await Model.findOne({id: args.id})

    for ( let key in args) {
      if(key =='_id' || key =='id' ) {
        continue
      }
      dataSourceObj[key]= args[key]
    }

    const new_dataSourceObj = await dataSourceObj.save()

    ret.data = {
      id: new_dataSourceObj.id, update:true
    }

  } else {
    //删除
    const dataSourceObj = await Model.findOne({id: args.id})

    const remove = await dataSourceObj.remove()

    ret.data = {
      id: dataSourceObj.id, delete:true
    }

  }

  response.send(ret)
})

module.exports = main
