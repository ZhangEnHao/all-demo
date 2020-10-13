import React, { Component } from 'react';
import { Form, Row, Col, Select, TreeSelect, Button, Table, Drawer, message } from 'antd';
import CollapseForm from './CollapseForm';

const { Item } = Form;
const { Option } = Select;
const { TreeNode } = TreeSelect;

class ConfigByRender extends Component {

  state = {
    childrenDrawer: false,
    validateOperate: "操作",
    dataByColTable: {},
    indexByColTable: null,

  }

  precheckOperationChange = (value, e) => {
    this.setState({ validateOperate: e.props.children, })
  }

  onTreeSelectChange = () => {

  }

  // 删除表格列行数据
  colDelete = index => {
    let chParamTableColList = this.props.form.getFieldsValue(["chParamTableColList"]).chParamTableColList;
    chParamTableColList.splice(index, 1);
    chParamTableColList.forEach((item, index) => item.orderNum = index)
    this.props.form.setFieldsValue({ chParamTableColList });
  }

  // 移动表格列行数据
  colMove = (type, index) => {
    let chParamTableColList = this.props.form.getFieldsValue(["chParamTableColList"]).chParamTableColList;
    if (type === "up") {
      if (index === 0) { return }
      chParamTableColList[index] = chParamTableColList.splice(index - 1, 1, chParamTableColList[index])[0]
    } else if (type === "down") {
      if (index === chParamTableColList.length - 1) { return }
      chParamTableColList[index] = chParamTableColList.splice(index + 1, 1, chParamTableColList[index])[0]
    }
    chParamTableColList.forEach((item, index) => item.orderNum = index)
    this.props.form.setFieldsValue({ chParamTableColList });
  }

  // 表格列行数据编辑
  colEdit = (record, index) => {
    this.setState({ dataByColTable: record, indexByColTable: index }, () => {
      this.showChildrenDrawer(); // 展开
    })
  }

  initColumns = () => {
    return [
      { title: '名称', dataIndex: 'colName', },
      { title: '编码', dataIndex: 'colCode', },
      {
        title: '类型', dataIndex: 'inputType',
        render: (text, record, index) => {
          let label = null;
          switch (text) {
            case "TEXT": label = "文本"
              break;
            case "SELECT": label = "下拉"
              break;
            case "DEIT_SELECT": label = "可编辑下拉"
              break;
            case "CHECKBOX": label = "复选"
              break;
            case "CALENDAR": label = "日历"
              break;
            case "TIME": label = "时间"
              break;
            default: label = null;
          }
          return label
        }
      },
      {
        title: '数据来源', dataIndex: 'dataResourcesType',
        render: (text, record, index) => {
          let label = null;
          switch (text) {
            case "MANUAL": label = "手工"
              break;
            case "CH_COLLECTION": label = "采集表"
              break;
            case "CH_PARAM": label = "变更参数表"
              break;
            default: label = null;
          }
          return label
        }
      },
      {
        title: '操作', dataIndex: 'action', width: 180,
        render: (text, record, index) => {
          return (<>
            <Button type="link" onClick={() => this.colEdit(record, index)} style={{ paddingLeft: 0, paddingRight: 10, }}>编辑</Button>
            <Button type="link" onClick={() => this.colDelete(index)} style={{ paddingLeft: 0, paddingRight: 10, }}>删除</Button>
            <Button type="link" onClick={() => this.colMove("up", index)} icon="arrow-up" style={{ padding: 0 }} />
            <Button type="link" onClick={() => this.colMove("down", index)} icon="arrow-down" style={{ padding: 0 }} />
          </>)
        }
      },
    ]
  }

  addCol = () => {
    this.setState({ dataByColTable: {}, indexByColTable: null }, () => {
      this.showChildrenDrawer(); // 展开
    })
  }

  showChildrenDrawer = () => {
    this.setState({ childrenDrawer: true, });
  };

  onChildrenDrawerClose = () => {
    this.setState({ childrenDrawer: false, });
  };

  handleChildrenDrawerOk = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 获取已保存表格列数据
        let chParamTableColList = this.props.form.getFieldsValue(["chParamTableColList"]).chParamTableColList;
        if (chParamTableColList && chParamTableColList.length) {
          // 判断是否新增 / 编辑
          if (typeof this.state.indexByColTable === "number") {
            chParamTableColList[this.state.indexByColTable] = values;
          } else {
            // 编码 名称 重复校验
            let flag = chParamTableColList.some(item => {
              return item.colCode === values.colCode || item.colName === values.colName
            })
            if (flag) {
              message.warning("名称与编码不可重复");
              return
            } else {
              chParamTableColList.push(values)
            }
          }
        } else {
          chParamTableColList = [values];
        }
        chParamTableColList.forEach((item, index) => item.orderNum = index)
        this.props.form.setFieldsValue({ chParamTableColList });
        this.onChildrenDrawerClose();
      }
    })
  }

  render() {

    const { form, dataSource } = this.props;
    const { getFieldDecorator, } = form;

    return (
      <Row>
        <Col span={24}>
          <Item label="远程预校验方式">
            {getFieldDecorator("precheckOperation", {
              initialValue: dataSource.precheckOperation || "ACTION",
            })(
              <Select onChange={(value, e) => this.precheckOperationChange(value, e)}>
                <Option value="ACTION">操作</Option>
                <Option value="WORKFLOW">编排</Option>
              </Select>
            )}
          </Item>
        </Col>
        <Col span={24}>
          <Item label={`${this.state.validateOperate}分类`}>
            {getFieldDecorator("checkOperation", {
              initialValue: dataSource.checkOperation,
            })(
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                onChange={this.onTreeSelectChange}
              >
                <TreeNode value="parent 1" title="parent 1" key="0-1">
                  <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                    <TreeNode value="leaf1" title="my leaf" key="random" />
                    <TreeNode value="leaf2" title="your leaf" key="random1" />
                  </TreeNode>
                  <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                    <TreeNode value="sss" title="sss" key="random3" />
                  </TreeNode>
                </TreeNode>
              </TreeSelect>
            )}
          </Item>
        </Col>
        <Col span={24}>
          <Item label={this.state.validateOperate}>
            {getFieldDecorator("validateOperateCode", {
              initialValue: dataSource.validateOperateCode,
            })(
              <Select>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
            )}
          </Item>
        </Col>
        <Col span={2} offset={22} style={{ marginBottom: 15 }}>
          <Button onClick={this.addCol} type="primary">增加列</Button>
          <Drawer
            title="列信息"
            placement="right"
            destroyOnClose={true}
            maskClosable={false}
            width="70%"
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <Row>
              <Col span={24} style={{ marginBottom: 15 }}>
                <Button onClick={this.handleChildrenDrawerOk} type="primary" style={{ marginRight: 20 }}>确定</Button>
                <Button onClick={this.onChildrenDrawerClose}>取消</Button>
              </Col>
              <Col span={24} style={{ maxHeight: "70vh", overflow: "auto" }}>
                <CollapseForm
                  dataSource={this.state.dataByColTable}
                  dataSourceByTable={this.props.dataSourceByTable}
                  setForm={form => { this.form = form }} />
              </Col>
            </Row>
          </Drawer>
        </Col>
        <Col span={24}>
          <Item label="表格列">
            {getFieldDecorator("chParamTableColList", {
              initialValue: dataSource.chParamTableColList,
              valuePropName: "dataSource",
            })(
              <Table
                rowKey="orderNum"
                pagination={false}
                columns={this.initColumns()} />
            )}
          </Item>
        </Col>
      </Row>
    )
  }
}

export default ConfigByRender
