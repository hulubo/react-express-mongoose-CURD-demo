import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item;

// 样式
const formLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 6 },
    sm: { span: 15 },
  },
};


class EditModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key:0,
    }
  }


  onOk = () => {
    const { editDataObj, updateDataHandle, onModelCancel, saveData} = this.props
    //getFieldsValue() 获取表单中输入的值
    const { getFieldsValue, resetFields } = this.props.form
    const values = getFieldsValue()
    //antd table需要加一个key字段

    //判断是更新 还是添加
    if(editDataObj.id) {
      //输入框本身无key
      values.id = editDataObj.id
      // //调用父组件方法改变dataSourse
      // updateDataHandle(values)
    }
    // else {
    //   const key = this.state.key + 1
    //   this.setState({
    //     key:key,
    //   })
    //   values.key = key
    //   saveData(values)
    // }
    updateDataHandle(values)
    //重置表单
    resetFields()
    onModelCancel()
  }


  render() {
    const { editVisiable, onModelCancel, editDataObj} = this.props
    // getFieldDecorator用于定义表单中的数据
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
      visible = { editVisiable }
      onCancel = { onModelCancel }
      onOk = { this.onOk }
      >
        <Form>
          <FormItem
            label="姓名"
            {...formLayout}
          >
            {getFieldDecorator('name', {
              initialValue: editDataObj.name ||'',
              rules: [{
                required: true, message: '姓名必填',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="年龄"
            {...formLayout}
          >
            {getFieldDecorator('age', {
              initialValue: editDataObj.age ||'',
              rules: [{
                required: true, message: '姓名必填',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="住址"
            {...formLayout}
          >
            {getFieldDecorator('address', {
              initialValue: editDataObj.address ||'',
              rules: [{
                required: true, message: '住址必填',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }

}
//Form.create()传入表单的方法给EditModel
export default Form.create()(EditModel);
