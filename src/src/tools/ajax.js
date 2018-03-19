/**
 * ajax工具类
 * 也可用 axios(https://github.com/axios/axios)
 */

const joinQuery = function(params) {

  var Querys = Object.keys(params).map( key => {
    return `${key}=${params[key]}`
  }).join('&')

  return `?${Querys}`
}

//原生ajx
const ajax = function(request) {

    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            if(r.status == 200) {
              const data = JSON.parse(r.response)
              request.success(data)
            }
            if(r.status == 500) {
              request.error()
            }
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

//用Promise封装原生ajx
const ajaxPromise = function(url, method, form) {
    var p = new Promise((resolve, reject) => {
        const request = {
            url: url,
            method: method,
            contentType: 'application/json',
            success: function(r) {
                resolve(r)
            },
            error: function(e) {
                const r = {
                    success: false,
                    message: '网络错误, 请重新尝试',
                }
                resolve(r)
                //reject(r)
            },
        }
        if (method === 'post') {
            const data = JSON.stringify(form)
            request.data = data
        }
        ajax(request)
    })
    return p
}

//封装 ajaxPromise
const _ajax = {
    get: (path, params={}) => {
        const url = path + joinQuery(params)
        const method = 'get'
        const form = {}
        return ajaxPromise(url, method, form)
    },
    post: (path, params={})=>{
        const url = path
        const method = 'post'
        return ajaxPromise(url, method, params)
    },
}

module.exports = _ajax
