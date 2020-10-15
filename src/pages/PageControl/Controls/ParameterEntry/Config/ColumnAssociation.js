import React, { Component } from 'react';
import { Form, Select, Icon, Button, Input } from 'antd';

const { Option } = Select;

class ColInfo extends Component {

  onColValueChange = e => {
    this.triggerChange({ colValue: e.target.value });
  }

  initOptions = (data=[]) => {
    return data.map((item, index) => {
      return <Option value={item.colCode} info={item} key={index}>{item.colName}</Option>
    })
  }

  onNotEditColChange = (value) => {
    this.triggerChange({ notEditCol: value });
  }

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
    let { value, options } = this.props;
    return (<>
      <Input
        value={value.colValue}
        onChange={this.onColValueChange}
        placeholder="请输入列值"
        style={{ width: '40%', marginRight: '8%' }} />
      <Select
        value={value.notEditCol}
        placeholder="请选择不可编辑列"
        onChange={this.onNotEditColChange}
        style={{ width: '40%', marginRight: '8%' }}>
          { this.initOptions(options) }
        </Select>
    </>)
  }
}

let idByColAss = 0;

export default class ColumnAssociation extends Component {

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({ keys: keys.filter(key => key !== k), });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(idByColAss++);
    form.setFieldsValue({ keys: nextKeys, });
  };

  checkOptions = (rule, value, callback) => {
    let { colValue, notEditCol } = value;
    if(!colValue || !notEditCol) {
      callback("列值和不可编辑列必选")
    }
    callback()
  };

  componentDidMount() {
    const { dataSource } = this.props;
    if(dataSource.keys) {
      idByColAss = dataSource.keys.length;
    }else {
      idByColAss = 0;
    }
  }

  render() {
    let { dataSource, options } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
      wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 }, },
    };
    if(dataSource.keys) {
      getFieldDecorator('keys', { initialValue: dataSource.keys });
    }else {
      getFieldDecorator('keys', { initialValue: [] });
    }
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '列关联关系' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`colHides[${k}]`, {
          initialValue: (dataSource.colHides && dataSource.colHides[index]) || { colValue: null, notEditCol: null },
          rules: [{ validator: this.checkOptions }],
        })(<ColInfo options={options} />)}
        <Icon type="minus-circle-o" onClick={() => this.remove(k)} />
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
      {formItems}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </Form>
    )
  }
}
