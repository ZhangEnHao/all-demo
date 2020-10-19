import React, { Component } from 'react';
import { Card, Row, Col, Button, Table, Drawer, message,  } from 'antd';
import EditForm from './EditForm';
import Controls from '../Controls';
import { typeJudgment } from '../utils';
import { attrClass, attrAssignment } from './utils';

// 获取所有控件开发人员提供的控件属性
let Publics = [];
for (let key in Controls) {
  let config = require(`../Controls/${key}/config.js`).default;
  Publics.push(config);
}

class ConfigView extends Component {
  state = {
    visible: false, // 抽屉是否展示标识符
    dataSourceByTable: [], // 控件信息表格数据
    dataSourceByEditForm: {}, // 抽屉页面数据
    indexByEditForm: null, // 当前编辑的控件索引
  };

  // 展开抽屉
  showDrawer = () => this.setState({ visible: true, indexByEditForm: null });

  // 关闭抽屉 抽屉页面数据清空 抽屉页面 Form 表单刷新
  onDrawerClose = () => {
    this.setState({ visible: false, dataSourceByEditForm: {} }, () => this.form.resetFields());
  };

  // 抽屉页面确认按钮点击事件 
  handleDrawerOk = e => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        Publics.forEach(item => {
          // 确认控件信息
          if (item.controlType === values.controlType) {
            // 合并为 Table 展示 dataSource 
            let privatePropList = attrClass(item.privateProps);
            let controlledAttrList = attrClass(item.controlledProps);
            let recordByPrivatePropList = attrAssignment(privatePropList, values, "privateProps");
            let recordBycontrolledProps = attrAssignment(controlledAttrList, values, "controlledProps");

            this.setState(state => {
              let dataSourceByTable = state.dataSourceByTable;
              // indexByEditForm 索引是数字时为编辑
              if (typeJudgment(this.state.indexByEditForm) === "number") {
                dataSourceByTable.splice(this.state.indexByEditForm, 1, { ...recordByPrivatePropList, ...recordBycontrolledProps });
                message.success('控件信息编辑成功');
              } else {
                // indexByEditForm 索引是 null 时为新增
                dataSourceByTable.push({ ...recordByPrivatePropList, ...recordBycontrolledProps });
                message.success('控件信息新增成功');
              }
              dataSourceByTable.forEach((item, index) => item.rowKey = index);
              return { dataSourceByTable }
            }, () => {
              this.onDrawerClose();
            })
          }
        })
      }
    })
  }

  // 删除控件信息
  onRowDelete = index => {
    this.setState(state => {
      let dataSourceByTable = state.dataSourceByTable;
      dataSourceByTable.splice(index, 1);
      dataSourceByTable.forEach((item, index) => item.rowKey = index);
      return { dataSourceByTable }
    }, () => {
      message.success('控件信息删除成功');
    })
  }

  // 点击控件信息编辑按钮
  onRowEdit = (record, index) => {
    this.setState({ dataSourceByEditForm: record }, () => {
      this.showDrawer();
      this.setState({ indexByEditForm: index });
    })
  }

  // 初始化控件信息表头
  initColumns = () => {
    return [
      { title: '控件名称', dataIndex: 'name', },
      { title: '控件编码', dataIndex: 'code', },
      { title: '控件类型', dataIndex: 'controlType', },
      {
        title: '操作', dataIndex: 'operate', render: (text, record, index) => {
          return (
            <div>
              <Button type="link" onClick={() => this.onRowEdit(record, index)}>编辑</Button>
              <Button type="link" onClick={() => this.onRowDelete(index)}>删除</Button>
            </div>
          )
        }
      },
    ]
  }

  // 控件信息表格展开详细信息
  initExpandedRow = record => {
    return (
      <EditForm
        dataSourceByTable={this.state.dataSourceByTable}
        indexByEditForm={this.state.indexByEditForm}
        dataSource={record}
        setForm={form => { this.form = form }} />
    )
  }

  // 保存所有控件信息
  saveControlsConfig = () => {
    localStorage.setItem("controlsConfig", JSON.stringify(this.state.dataSourceByTable));
  }

  componentDidMount() {
    let controlsConfig = JSON.parse(localStorage.getItem("controlsConfig"));
    this.setState({
      dataSourceByTable: controlsConfig || [],
    })
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    // const formItemLayout = {
    //   labelCol: { xs: { span: 24 }, sm: { span: 2 }, },
    //   wrapperCol: { xs: { span: 24 }, sm: { span: 22 }, },
    // };

    return (<Card>
      {/* <Form {...formItemLayout}> */}
      <Row>
        {/* <Col span={12} style={{ marginBottom: 15 }}>
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, },],
              })(<Input />)}
            </Form.Item>
          </Col> */}
        <Col span={24} style={{ marginBottom: 15 }}>
          <Button onClick={this.showDrawer} type="primary">新增</Button>
        </Col>
        <Col span={24} style={{ marginBottom: 15 }}>
          <Table
            pagination={false}
            rowKey="rowKey"
            columns={this.initColumns()}
            dataSource={this.state.dataSourceByTable}
            expandedRowRender={record => this.initExpandedRow(record)}
          />
        </Col>
        <Col span={4}>
          <Button onClick={this.saveControlsConfig} type="primary">保存</Button>
        </Col>
      </Row>
      {/* </Form> */}
      <Drawer
        title="控件信息"
        placement="right"
        destroyOnClose={true}
        maskClosable={false}
        width="70%"
        onClose={this.onDrawerClose}
        visible={this.state.visible}
      >
        <Row>
          <Col span={24} style={{ marginBottom: 15 }}>
            <Button onClick={this.handleDrawerOk} type="primary" style={{ marginRight: 20 }}>确定</Button>
            <Button onClick={this.onDrawerClose}>取消</Button>
          </Col>
          <Col span={24}>
            <EditForm
              dataSourceByTable={this.state.dataSourceByTable}
              indexByEditForm={this.state.indexByEditForm}
              dataSource={this.state.dataSourceByEditForm}
              setForm={form => { this.form = form }} />
          </Col>
        </Row>
      </Drawer>
    </Card>)
  }
}

export default ConfigView
