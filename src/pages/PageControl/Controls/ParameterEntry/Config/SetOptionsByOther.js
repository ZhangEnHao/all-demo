import React, { Component } from 'react';
import { Row, Col, Form, Select, Input, Button, Icon } from 'antd';

const { Item } = Form;
const { Option } = Select;

class Options extends Component {

  initOptions = (data=[]) => {
    return data.map((item, index) => {
      return <Option value={item.code} key={index}>{item.name}</Option>
    })
  }

  handleTableIdChange = value => {
    this.triggerChange({ tableId: value });
  };

  handleColCodeChange = e => {
    this.triggerChange({ colCode: e.target.value });
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
        <Select
          value={value.tableId}
          size={size}
          onChange={this.handleTableIdChange}
          style={{ width: '40%', marginRight: '8%' }}
          placeholder="请选择采集表"
        >
          {this.initOptions(this.props.options)}
        </Select>
        <Input
          type="text"
          size={size}
          value={value.colCode}
          onChange={this.handleColCodeChange}
          placeholder="请输入列编码"
          style={{ width: '40%', marginRight: '8%' }}
        ></Input>
      </>
    )
  }
}

let idByOther = 0;

export default class SetOptionsByOther extends Component {
  remove = k => {
    const { form } = this.props;
    const keysByOther = form.getFieldValue('keysByOther');
    if (keysByOther.length === 1) { return;}

    form.setFieldsValue({ keysByOther: keysByOther.filter(key => key !== k), });
  };

  add = () => {
    const { form } = this.props;
    const keysByOther = form.getFieldValue('keysByOther');
    const nextkeysByOther = keysByOther.concat(idByOther++);
    form.setFieldsValue({ keysByOther: nextkeysByOther, });
  };


  checkOptions = (rule, value, callback) => {
    let { tableId, colCode } = value;
    if(!tableId || !colCode) {
      callback("表名称和列编码必填")
    }
    callback()
  };

  componentDidMount() {
    const { dataSource } = this.props;
    if(dataSource.keysByOther) {
      idByOther = dataSource.keysByOther.length;
    }else {
      idByOther = 0;
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
    if(dataSource.keysByOther) {
      getFieldDecorator('keysByOther', { initialValue: dataSource.keysByOther });
    }else {
      getFieldDecorator('keysByOther', { initialValue: [] });
    }
    const keysByOther = getFieldValue('keysByOther');
    const formItems = keysByOther.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '初始下拉选项' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`options[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: (dataSource.options && dataSource.options[index]) || { tableId: null, colCode: null },
          rules: [{ validator: this.checkOptions }],
        })(<Options options={this.props.options} />)}
        {keysByOther.length > 1 ? (
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