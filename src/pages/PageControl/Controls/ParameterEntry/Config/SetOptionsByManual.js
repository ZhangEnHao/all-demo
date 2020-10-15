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

let idByManual = 0;

export default class SetOptionsByManual extends Component {
  remove = k => {
    const { form } = this.props;
    const keysByManual = form.getFieldValue('keysByManual');
    if (keysByManual.length === 1) { return; }

    form.setFieldsValue({
      keysByManual: keysByManual.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keysByManual = form.getFieldValue('keysByManual');
    const nextkeysByManual = keysByManual.concat(idByManual++);
    form.setFieldsValue({ keysByManual: nextkeysByManual, });
  };

  checkOptions = (rule, value, callback) => {
    let { code, label } = value;
    if(!code || !label) { callback("名称和编码必填") }
    callback()
  };

  componentDidMount() {
    const { dataSource } = this.props;
    if(dataSource.keysByManual) {
      idByManual = dataSource.keysByManual.length;
    }else {
      idByManual = 0;
    }
  }

  render() {
    const { dataSource } = this.props;
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
    if(dataSource.keysByManual) {
      getFieldDecorator('keysByManual', { initialValue: dataSource.keysByManual });
    }else {
      getFieldDecorator('keysByManual', { initialValue: [] });
    }
    const keysByManual = getFieldValue('keysByManual');
    const formItems = keysByManual.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '初始下拉选项' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`options[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: (dataSource.options && dataSource.options[index]) || { code: null, label: null },
          rules: [{ validator: this.checkOptions }],
        })(<Options />)}
        {keysByManual.length > 1 ? (
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