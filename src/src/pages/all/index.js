import React, { Component } from 'react';
import { Button, Table, Modal} from 'antd'

import AllService from '../../service/all'

//子组件
import EditModal from './edit'
const confirm = Modal.confirm;

class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisiable:false,
      dataSource:[],
      editDataObj:{},
    }
  }

  componentWillMount() {
    this.getDataSourseList()
  }

  //显示弹窗
  addDataSource = () =>{
    this.setState({
      editVisiable:true,
      editDataObj:{},
    })
  }

  //取消弹窗
  onModelCancel = () =>{
    this.setState({
      editVisiable:false,
    })
  }

  //编辑
  editHandle = (record)=> {
    //record 为 当前行数据
    //将当前行数据传递给EditModal组件展示
    this.setState({
      editVisiable:true,
      editDataObj:record,
    })
  }

  //请求列表数据
  getDataSourseList = async () => {

    const { data } = await AllService.getList()
    this.setState({
      dataSource:data,
    })
  }

  //修改
  updateDataHandle = async (values)=> {

   const { data } = await AllService.update(values)
   this.getDataSourseList()

  }


  //删除
  deleteHandle = (record) => {
    confirm({
      title: `您确定要删除?(${record.id})`,
      onOk: () => {
        this.updateDataHandle({
          id:record.id,
          status:-1,
        })
      },
    });
  }


  render() {
    // editVisiable控制弹窗显示, dataSource为tabale渲染的数据
    //
    const { editVisiable, dataSource, editDataObj} = this.state

     //数据加个key 喂antd
    dataSource.map((e,index)=> e.key = index+1)
    
    return (
      <div className="content-inner">
        <Button type ='primary' onClick={ this.addDataSource }> 新建数据</Button>
        <Table
        columns = {this.columns}
        dataSource={dataSource}
        />
        <EditModal
        editVisiable={ editVisiable }
        onModelCancel={ this.onModelCancel}
        saveData = { this.saveData }
        editDataObj = { editDataObj }
        updateDataHandle = { this.updateDataHandle }
        />
      </div>
    );
  }

  //定义表格
  columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }, {
		  title: '操作',
		  dataIndex: 'operation',
		  key: 'operation',
		  render: (text, record) => (
			  <div style={{ textAlign: 'ceter' }}>
  				  <a href="javascript:void(0)" style={{ marginRight: '10px' }}
              onClick={() => this.editHandle(record)}
            >编辑</a>
            <a href="javascript:void(0)" style={{ marginRight: '10px' }}
              onClick={() => this.deleteHandle(record)}
            >删除</a>
				</div>
			),
		}];
}
export default All;
