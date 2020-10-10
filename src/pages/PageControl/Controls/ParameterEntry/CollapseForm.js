import React, { Component } from 'react';
import { Collapse, Row, Col, Form, Input, Radio, Switch, } from 'antd';
import SetOptionsByManual from './SetOptionsByManual';
import SetOptionsByOther from './SetOptionsByOther';
import RuleItem from './RuleItem';

const { Panel } = Collapse;
const { Item } = Form;

class CollapseForm extends Component {

  state = {
    inputType: "TEXT",
    dataResourcesType: "MANUAL",
    isRequired: false,
  }

  // 类型
  onInputTypeChange = (e) => {
    this.setState({ inputType: e.target.value })
  }

  // 选择数据来源
  onDataResourcesTypeChange = e => {
    this.setState({ dataResourcesType: e.target.value })
  }

  // 设置初始化数据
  setInitValue = (getFieldDecorator) => {
    switch (this.state.dataResourcesType) {
      case "MANUAL":
        return this.setInitValueByManual(getFieldDecorator);
      case "CH_COLLECTION":
        return this.setInitValueByCollection();
      case "CH_PARAM":
        return this.setInitValueByParam();
      default:
        return false
    }
  }

  setInitValueByManual = (getFieldDecorator) => {
    let initValueItem = null;
    switch (this.state.inputType) {
      case "TEXT":
        initValueItem = (
          <Col span={24}>
            <Item label="初始值" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              {getFieldDecorator('initValue')(<Input />,)}
            </Item>
          </Col>
        )
        break;
      case "SELECT":
      case "DEIT_SELECT":
      case "CHECKBOX":
        initValueItem = <SetOptionsByManual form={this.props.form} />
        break;
      default:
        initValueItem = null;
    }

    return initValueItem
  }

  setInitValueByCollection = () => {
    // 过滤已配置控件为采集表
    let options = this.props.dataSourceByTable.filter(item => {
      return item.controlType === "Collect"
    })

    return <SetOptionsByOther options={options} form={this.props.form} />
  }

  setInitValueByParam = () => {
    // 过滤已配置控件为采集表
    let options = this.props.dataSourceByTable.filter(item => {
      return item.controlType === "ParameterEntry"
    })

    return <SetOptionsByOther options={options} form={this.props.form} />
  }

  // 是否必填
  requiredChange = checked => {
    this.setState({ isRequired: checked })
  }

  componentDidMount() {
    this.props.setForm(this.props.form);
  }

  render() {
    let panelProps = {
      showArrow: false,
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="列基本设置" key="1" {...panelProps}>
          <Row>
            <Col span={12}>
              <Item label="名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('colName', {
                  rules: [{ required: true, message: '请输入列名称!', },],
                })(<Input placeholder="请输入列名称" />)}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="编码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                {getFieldDecorator('colCode', {
                  rules: [{ required: true, message: '请输入列编码!', },],
                })(<Input placeholder="请输入列编码" />)}
              </Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Item label="提示信息" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                {getFieldDecorator('colPromptMessage', {})(<Input placeholder="请输入列提示信息" />)}
              </Item>
            </Col>
            <Col span={24}>
              <Item label="类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                {getFieldDecorator('inputType', {
                  initialValue: "TEXT",
                  rules: [{ required: true, message: '请输入列类型!', },],
                })(
                  <Radio.Group onChange={this.onInputTypeChange}>
                    <Radio value="TEXT" disabled={this.state.dataResourcesType !== "MANUAL"}>文本</Radio>
                    <Radio value="SELECT">下拉</Radio>
                    <Radio value="DEIT_SELECT">可编辑下拉</Radio>
                    <Radio value="CHECKBOX">复选</Radio>
                    <Radio value="CALENDAR">日历</Radio>
                    <Radio value="TIME">时间</Radio>
                  </Radio.Group>,
                )}
              </Item>
            </Col>
            {
              (this.state.inputType === "CALENDAR" || this.state.inputType === "TIME") ? null :
                <Col span={24}>
                  <Item label="数据来源" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                    {getFieldDecorator('dataResourcesType', {
                      initialValue: "MANUAL",
                      rules: [{ required: true, message: '请输入列数据来源!', },],
                    })(
                      <Radio.Group onChange={this.onDataResourcesTypeChange}>
                        <Radio value="MANUAL">手工</Radio>
                        <Radio value="CH_COLLECTION" disabled={this.state.inputType === "TEXT"}>采集表</Radio>
                        <Radio value="CH_PARAM" disabled={this.state.inputType === "TEXT"}>变更参数表</Radio>
                      </Radio.Group>,
                    )}
                  </Item>
                </Col>
            }
            {this.setInitValue(getFieldDecorator)}
          </Row>
        </Panel>
        <Panel header="列关联设置" key="2" {...panelProps}>
          <p>text</p>
        </Panel>
        <Panel header="验证设置" key="3" {...panelProps}>
          <Row>
            <Col span={4}>
              <Item label="必填" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                {getFieldDecorator('required', {
                  // initialValue: ,
                  valuePropName: "checked"
                })(
                  <Switch onChange={this.requiredChange} />
                )}
              </Item>
            </Col>
            {
              this.state.isRequired ?
                <Col span={20}>
                  <Item label="提示信息" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
                    {getFieldDecorator('message', {
                      // initialValue: ,
                    })(
                      <Input placeholder="请输入错误提示信息" />
                    )}
                  </Item>
                </Col>
                : null
            }
          </Row>
          {
            this.state.isRequired ?
              <RuleItem form={this.props.form} />
              : null
          }
        </Panel>
      </Collapse>
    )
  }

}

export default Form.create()(CollapseForm)