import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Icon } from 'antd';

const { Item } = Form;

class Options extends Component {
  handleCodeChange = e => {
    this.triggerChange({ code: e.target.value });
  };

  handleLabelChange = e => {
    this.triggerChange({ label: e.target.value });
  };

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
    const { size, value } = this.props;
    return (
      <>
        <Input
          type="text"
          size={size}
          value={value.code}
          onChange={this.handleCodeChange}
          placeholder="请输入编码"
          style={{ width: '40%', marginRight: '8%' }}
        />
        <Input
          type="text"
          size={size}
          value={value.label}
          onChange={this.handleLabelChange}
          placeholder="请输入名称"
          style={{ width: '40%', marginRight: '8%' }}
        ></Input>
      </>
    )
  }
}

let id = 0;

export default class SetOptionsByManual extends Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  checkOptions = (rule, value, callback) => {
    let { code, label } = value;
    if(!code || !label) {
      callback("名称和编码必填")
    }
    callback()
  };


  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '初始下拉选项' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`options[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: { code: null, label: null },
          rules: [{ validator: this.checkOptions }],
        })(<Options />)}
        {keys.length > 1 ? (
          <Icon type="minus-circle-o" onClick={() => this.remove(k)} />
        ) : null}
      </Form.Item>
    ));

    return (
      <Row>
        <Col span={24}>
          {formItems}
        </Col>
        <Col span={24} >
          <Item {...formItemLayoutWithOutLabel}>
            <Button onClick={this.add} type="dashed" style={{ width: '60%' }}>
              <Icon type="plus" /> Add Option
            </Button>
          </Item>
        </Col>
      </Row>
    )
  }
}