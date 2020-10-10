import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input, Switch, InputNumber, } from 'antd';

const { Item } = Form;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

// 长度约束
class LengthConstraint extends Component {
  handleMinChange = value => { this.triggerChange({ min: value }); };

  handleMaxChange = value => { this.triggerChange({ max: value }); };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { value } = this.props;
    return (
      <>
        <InputNumber value={value.min} min={0} onChange={this.handleMinChange} style={{ width: '30%', marginRight: '5%' }} />
        至
        <InputNumber value={value.max} min={value.min+1} onChange={this.handleMaxChange} style={{ width: '30%', marginRight: '5%', marginLeft: '5%' }} />
      </>
    );
  }
}

// 字符串校验规则组件
class ItemByString extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<>
      <Row>
        <Col span={10}>
          <Item label="密码" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('hide', {
              // initialValue: ,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
        <Col span={7}>
          <Item label="不包含空格" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('notContainSpace', {
              // initialValue: ,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
        <Col span={7}>
          <Item label="不包含汉字" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('notContainCN', {
              // initialValue: ,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
      </Row>
      <Item label={<span>全部为<span style={{ color: "red" }}>[或]</span></span>} {...formItemLayout}>
        {getFieldDecorator('mustIn', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label={<span>必须含<span style={{ color: "red" }}>[且]</span></span>} {...formItemLayout}>
        {getFieldDecorator('mustContain', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label="字符开头" {...formItemLayout}>
        {getFieldDecorator('startWith', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label="字符结尾" {...formItemLayout}>
        {getFieldDecorator('endWith', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label="不包含字符" {...formItemLayout}>
        {getFieldDecorator('notContain', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label="长度约束" {...formItemLayout}>
        {getFieldDecorator('stringLength', {
          initialValue: { min: null, max: null } ,
        })(<LengthConstraint />)}
      </Item>
    </>
    )
  }
}

// 校验规则组件
export default class RuleItem extends Component {

  state = {
    checkType: null,
  }

  onCheckTypeChange = e => {
    this.setState({ checkType: e.target.value })
  }

  detailItem = (getFieldDecorator) => {
    let formItem = null;
    switch (this.state.checkType) {
      case "NUMBER":

        break;
      case "STRING":
        formItem = <ItemByString form={this.props.form} />
        break;
      case "REGEXP":
        formItem = (
          <Col span={24}>
            <Item label="正则表达式" {...formItemLayout}>
              {getFieldDecorator('regularExpression', {
                // initialValue: ,
              })(<Input placeholder="请输入正则表达式" />)}
            </Item>
          </Col>
        )
        break;
      default:
        formItem = null;
    }

    return formItem
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Row>
          <Col span={24}>
            <Item label="校验类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              {getFieldDecorator('checkType', {
                // initialValue: "TEXT",
              })(
                <Radio.Group buttonStyle="solid" onChange={this.onCheckTypeChange}>
                  <Radio.Button value="NUMBER">数字</Radio.Button>
                  <Radio.Button value="STRING">字符串</Radio.Button>
                  <Radio.Button value="REGEXP">正则表达式</Radio.Button>
                </Radio.Group>,
              )}
            </Item>
          </Col>
        </Row>
        { this.detailItem(getFieldDecorator)}
      </>
    )

  }
}