import ajax from '../tools/ajax'

//请求逻辑实例化

const All = {

    getList:(params) => {
      let data = ajax.get('/all/list',  params )
            .then((response) => {
              return response
            })
      return data
    },

    update: (params) => {
      let data = ajax.post('/all/update',  params )
            .then((response) => {
              return response
            })
      return data
    }

}

export default All
