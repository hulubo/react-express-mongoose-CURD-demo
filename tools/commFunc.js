/**
 * 工具函数
 */



/**
	 * 校验 前端请求体
	 * @param args 前端请求体
	 * @param field_list 后端modal定义结构体的 keys
	 * @param require_list 必须字段
	 * @param is_not_strict 是否严格匹配
   */
exports.assemble_args = function (args, field_list, require_list, is_not_strict) {
  let kwargs = {};
  let key_list = [];
  let err_msg = false;

  for (let field_name of field_list) {
    let has_key = (args[field_name] !== undefined);
    if (!is_not_strict) {
      has_key = has_key && (args[field_name] !== '');
    }
    if (has_key) {
      let key = field_name;
      let value = args[field_name];
      if (typeof value === 'string') {
        value = value.trim();
      }	else if (field_name == 'id') {
        value = parseInt(value);
      }
      key_list.push(field_name);
      kwargs[key] = value;
    }
  }

  if (require_list && require_list.length) {
    let lack_params = [];
    for (let k of require_list) {
      if (key_list.indexOf(k) == -1) {
        lack_params.push(k);
      }
    }

    if (lack_params.length) {
      err_msg = `lack params:${lack_params.toString()}`
      //throw err_msg;
    }
  }

  return { kwargs, err_msg };
};



exports.goto_err = function (ret, err_msg) {
  ret.success = false;
  ret.message = err_msg;
  ret.code = 400;
  return ret;
};
