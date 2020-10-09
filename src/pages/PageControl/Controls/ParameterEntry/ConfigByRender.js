import React, { Component } from 'react';
import { Form, Row, Col, Select, TreeSelect, Button, Table, Drawer } from 'antd';
import CollapseForm from './CollapseForm';

const { Item } = Form;
const { Option } = Select;
const { TreeNode } = TreeSelect;

class ConfigByRender extends Component {

  state = {
    childrenDrawer: false,
    validateOperate: "操作",
  }

  precheckOperationChange = (value, e) => {
    console.log(value, e.props.children);
    this.setState({
      validateOperate: e.props.children,
    })

  }

  onTreeSelectChange = () => {

  }

  initColumns = () => {
    return [
      { title: '名称', dataIndex: 'colName', },
      { title: '编码', dataIndex: 'colCode', },
      { title: '类型', dataIndex: 'inputType', },
      { title: '数据来源', dataIndex: 'dataResourcesType', },
      { title: '初始值', dataIndex: 'initValue', },
      { title: '校验规则', dataIndex: 'chParamTableColRuleList', },
      { title: '操作', dataIndex: 'action', },
    ]
  }

  addCol = () => {
    this.showChildrenDrawer()
  }

  showChildrenDrawer = () => {
    this.setState({ childrenDrawer: true, });
  };

  onChildrenDrawerClose = () => {
    this.setState({ childrenDrawer: false, });
  };

  handleChildrenDrawerOk = () => {

  }

  render() {

    const { getFieldDecorator, dataSource } = this.props;

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
                  setForm={form => { this.form = form }} />
              </Col>
            </Row>
          </Drawer>
        </Col>
        <Col span={24}>
          <Item label="表格列">
            {getFieldDecorator("chParamTableColList", {
              initialValue: dataSource.chParamTableColList,
            })(
              <Table columns={this.initColumns()} />
            )}
          </Item>
        </Col>
      </Row>
    )
  }
}

export default ConfigByRender
