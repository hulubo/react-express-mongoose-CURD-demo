const express = require('express')

const all = require('../models/all')
const Model = all

const commFunc = require('../tools/commFunc')


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


  if (!id) {
    //新建

    const field_list = Object.keys(Model.schema.paths).filter(e=> e!='_id' && e!='id')

    const { kwargs, err_msg } = commFunc.assemble_args(body, field_list, ['name', 'age', 'address'])

    if( err_msg ) {
      let err = commFunc.goto_err(ret, err_msg)
      response.send(err)
      return
    }


    const dataSourceObj = await Model.create(kwargs)

    ret.data = {
      id: dataSourceObj.id, create:true
    }

  }
  else if (!status) {
    //修改

    const kwargs = body

    const dataSourceObj = await Model.findOne({id: kwargs.id})

    if(!dataSourceObj) {
      let err = commFunc.goto_err(ret, `dataSourceInfo id:${kwargs.id} query empty`)
      response.send(err)
      return
    }

    for ( let key in kwargs) {
      if(key =='_id' || key =='id' ) {
        continue
      }
      dataSourceObj[key]= kwargs[key]
    }

    const new_dataSourceObj = await dataSourceObj.save()

    ret.data = {
      id: new_dataSourceObj.id, update:true
    }

  } else {
    //删除
    const kwargs = body

    const dataSourceObj = await Model.findOne({id: kwargs.id})

    if(!dataSourceObj) {
      let err = commFunc.goto_err(ret, `dataSourceInfo id:${kwargs.id} query empty`)
      response.send(err)
      return
    }


    const remove = await dataSourceObj.remove()

    ret.data = {
      id: dataSourceObj.id, delete:true
    }

  }

  response.send(ret)
})

module.exports = main
