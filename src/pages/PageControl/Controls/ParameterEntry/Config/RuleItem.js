import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input, Switch, InputNumber, Checkbox, Button, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
}

// 字符开头 / 结尾  
class StartStop extends Component {
  state = {
    disableByEnglish: true,
    disableByOther: true,
  }

  onCheckboxChange = (e, type) => {
    this.triggerChange({ [type]: e.target.checked });
  }

  onRadioGroupChange = value => {
    if (value === "english") {
      this.setState({ disableByEnglish: false, disableByOther: true, })
    } else if (value === "other") {
      this.setState({ disableByEnglish: true, disableByOther: false })
    } else {
      this.setState({ disableByEnglish: true, disableByOther: true, })
    }
    this.triggerChange({ dataType: value });
  }

  otherValueChange = e => {
    this.triggerChange({ otherValue: e.target.value });
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

  clearSelect = () => {
    this.setState({ disableByEnglish: true, disableByOther: true, }, () => {
      this.props.clear()
    })
  }

  componentDidMount() {
    this.onRadioGroupChange(this.props.value.dataType);
  }

  render() {
    let { name, value, } = this.props;
    return (
      <div style={{ display: "flex", height: 40, alignItems: "center" }}>
        <Radio.Group value={value.dataType} onChange={e => this.onRadioGroupChange(e.target.value)} name={name} style={{ flex: "0 0 auto" }}>
          <Radio value="english">英文</Radio>
          <Checkbox checked={value.uppercase} onChange={e => this.onCheckboxChange(e, "uppercase")} disabled={this.state.disableByEnglish}>大写</Checkbox>
          <Checkbox checked={value.lowercase} onChange={e => this.onCheckboxChange(e, "lowercase")} disabled={this.state.disableByEnglish}>小写</Checkbox>
          <Radio value="number">数字</Radio>
          <Radio value="other">其他</Radio>
        </Radio.Group>
        <Input
          value={value.otherValue}
          onChange={this.otherValueChange}
          disabled={this.state.disableByOther}
          style={{ flex: "1 1 auto", marginRight: 10, }} />
        <Button onClick={this.clearSelect} type="danger" style={{ flex: "0 0 auto" }}>清除</Button>
      </div>
    )
  }
}

//  或/且 规则组合
class CheckboxList extends Component {
  state = {
    checkboxs: [
      { label: "英文", value: "english", child: [1, 2] },
      { label: "大写", value: "uppercase", disabled: true },
      { label: "小写", value: "lowercase", disabled: true },
      { label: "数字", value: "number", child: [4] },
      { label: "非零", value: "nonzero", disabled: true },
      { label: "其他", value: "other", },
    ],
    disableByOther: true,
  }

  checkGroupChange = (checkedValues) => {
    /*****   控制是否可点击选中   *****/
    // 英文/数字 控制其后
    let controlList = checkedValues.filter(item => ["english", "number"].indexOf(item) > -1);
    this.state.checkboxs.forEach((checkbox, index) => {
      this.setState(state => {
        let checkboxs = state.checkboxs;
        checkbox.child && checkbox.child.forEach(item => {
          if (controlList.indexOf(checkbox.value) > -1) {
            checkboxs[item].disabled = false;
          } else {
            checkboxs[item].disabled = true;
          }
        })
        return { checkboxs }
      })
    })
    // 其他 控制 其他输入框
    if (checkedValues.indexOf("other") > -1) {
      this.setState({ disableByOther: false })
    } else {
      this.setState({ disableByOther: true })
    }

    this.triggerChange({ checkValue: checkedValues });
  }

  otherValueChange = e => {
    this.triggerChange({ otherValue: e.target.value });
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

  componentDidMount(){
    let { checkValue } = this.props.value;
    this.checkGroupChange(checkValue);
  }

  render() {
    const { value } = this.props;
    return (
      <div style={{ display: "flex", height: 40, alignItems: "center" }}>
        <Checkbox.Group
          style={{ flex: "0 0 auto" }}
          options={this.state.checkboxs}
          value={value.checkValue}
          onChange={this.checkGroupChange}
        />
        <Input
          value={value.otherValue}
          onChange={this.otherValueChange}
          disabled={this.state.disableByOther}
          style={{ flex: "1 1 auto" }} />
      </div>
    )
  }
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
        <InputNumber value={value.min} min={0} onChange={this.handleMinChange} style={{ width: '16%', marginRight: 20 }} />
        至
        <InputNumber value={value.max} min={value.min + 1} onChange={this.handleMaxChange} style={{ width: '16%', marginLeft: 20 }} />
      </>
    );
  }
}

// 字符串校验规则组件
class ItemByString extends Component {

  clearStartStop = (code) => {
    this.props.form.setFieldsValue({ [code]: { dataType: undefined, uppercase: false, lowercase: false, otherValue: undefined }, });
  }

  render() {
    let { dataSource = {} } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (<>
      <Row>
        <Col span={6}>
          <Item label="密码" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('hide', {
              initialValue: dataSource.hide,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
        <Col span={9}>
          <Item label="不包含空格" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('notContainSpace', {
              initialValue: dataSource.notContainSpace,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
        <Col span={9}>
          <Item label="不包含汉字" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            {getFieldDecorator('notContainCN', {
              initialValue: dataSource.notContainCN,
              valuePropName: "checked"
            })(<Switch />)}
          </Item>
        </Col>
      </Row>
      <Item label={<span>全部为<span style={{ color: "red" }}>[或]</span></span>} {...formItemLayout}>
        {getFieldDecorator('mustIn', {
          initialValue: dataSource.mustIn || { checkValue: [], otherValue: undefined },
        })(<CheckboxList />)}
      </Item>
      <Item label={<span>必须含<span style={{ color: "red" }}>[且]</span></span>} {...formItemLayout}>
        {getFieldDecorator('mustContain', {
          initialValue: dataSource.mustContain || { checkValue: [], otherValue: undefined },
        })(<CheckboxList />)}
      </Item>
      <Item label="字符开头" {...formItemLayout}>
        {getFieldDecorator('startWith', {
          initialValue: dataSource.startWith || { dataType: undefined, uppercase: false, lowercase: false, otherValue: undefined },
        })(<StartStop name="startWith" clear={() => this.clearStartStop("startWith")} />)}
      </Item>
      <Item label="字符结尾" {...formItemLayout}>
        {getFieldDecorator('endWith', {
          initialValue: dataSource.endWith || { dataType: undefined, uppercase: false, lowercase: false, otherValue: undefined },
        })(<StartStop name="endWith" clear={() => this.clearStartStop("endWith")} />)}
      </Item>
      <Item label="不包含字符" {...formItemLayout}>
        {getFieldDecorator('notContain', {
          initialValue: dataSource.notContain,
        })(<Input />)}
      </Item>
      <Item label="长度约束" {...formItemLayout}>
        {getFieldDecorator('stringLength', {
          initialValue: dataSource.stringLength || { min: null, max: null },
        })(<LengthConstraint />)}
      </Item>
    </>
    )
  }
}

// 最值组件
class BaseValues extends Component {
  state = {
    disableByComOper: true,
    disableByFixed: true,
    disableByCollection: true,
    disableByParam: true,
  }

  initOptions = (type, col) => {
    // 过滤已配置控件为采集表
    let options = this.props.options.filter(item => {
      return item.controlType === type
    })
    return options.map((item, index) => {
      return <Option value={item.code} key={index}>{item.name}</Option>
    })
  }

  // 比较运算符
  comparisonOperatorChange = value => {
    if (value !== "NO_SET") {
      this.setState({ disableByComOper: false })
    } else {
      this.setState({ disableByComOper: true })
    }
    this.triggerChange({ comparisonOperator: value });
  }
  // 数值来源单选框
  onRadioGroupChange = e => {
    if (e.target.value === "FIXED") {
      this.setState({ disableByFixed: false, disableByCollection: true, disableByParam: true, })
    } else if (e.target.value === "COLLECTIONTABLE") {
      this.setState({ disableByFixed: true, disableByCollection: false, disableByParam: true, })
    } else if (e.target.value === "PARAMTABLE") {
      this.setState({ disableByFixed: true, disableByCollection: true, disableByParam: false, })
    } else {
      this.setState({ disableByEnglish: true, disableByOther: true, })
    }
    this.triggerChange({ dataSource: e.target.value });
  }
  // 固定值 
  inputNumberChange = value => {
    this.triggerChange({ fixedValue: value });
  }
  // 采集表列
  inputChange = (e, code) => {
    this.triggerChange({ [code]: e.target.value });
  }
  // 采集表编码 / 变更参数表编码 / 变更参数表列
  selectChange = (code, value) => {
    this.triggerChange({ [code]: value });
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

  componentDidMount() {
    let { comparisonOperator, dataSource,  } = this.props.value;

    this.setState({
      disableByComOper: comparisonOperator === "NO_SET" ? true : false,
      disableByFixed: dataSource === "FIXED" ? false: true,
      disableByCollection: dataSource === "COLLECTIONTABLE" ? false: true,
      disableByParam: dataSource === "PARAMTABLE" ? false: true,
    })
  }

  render() {
    let { value = {}, } = this.props;
    let { comparisonOperator = "NO_SET", dataSource, fixedValue, tableCodeByCollection, colIdByCollection, tableCodeByParam, colIdByParam } = value;

    return (
      <Row>
        <Col span={3}>
          <Select
            onChange={this.comparisonOperatorChange}
            value={comparisonOperator}
            dropdownMatchSelectWidth={false}
            style={{ width: "80%" }}>
            <Option value="NO_SET">不设值</Option>
            <Option value="VALUE_CONTAINS_EQUAL">{`>=`}</Option>
            <Option value="VALUE_CONTAINS">{`>`}</Option>
            <Option value="SUM_CONTAINS">{`和>=`}</Option>
            <Option value="SUM_CONTAINS_EQUAL">{`和=`}</Option>
          </Select>
        </Col>
        <Col span={21}>
          <Radio.Group
            onChange={this.onRadioGroupChange}
            value={dataSource}
            disabled={this.state.disableByComOper}>
            <Col span={5}>
              <Row>
                <Col span={9}>
                  <Radio value="FIXED" style={{ flex: "0 0 auto" }}>固定</Radio>
                </Col>
                <Col span={13}>
                  <InputNumber
                    value={fixedValue}
                    onChange={this.inputNumberChange}
                    disabled={this.state.disableByFixed}
                    style={{ width: "100%" }} />
                </Col>
              </Row>
            </Col>
            <Col span={9}>
              <Row>
                <Col span={6}>
                  <Radio value="COLLECTIONTABLE" >采集表</Radio>
                </Col>
                <Col span={9}>
                  <Select
                    onChange={value => this.selectChange("tableCodeByCollection", value)}
                    value={tableCodeByCollection}
                    disabled={this.state.disableByCollection}
                    dropdownMatchSelectWidth={false}
                    style={{ width: "90%" }} >
                    {this.initOptions("Collect")}
                  </Select>
                </Col>
                <Col span={9}>
                  <Input
                    onChange={e => this.inputChange(e, "colIdByCollection")}
                    value={colIdByCollection}
                    disabled={this.state.disableByCollection}
                    style={{ width: "90%" }} />
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row>
                <Col span={8}>
                  <Radio value="PARAMTABLE">变更参数表</Radio>
                </Col>
                <Col span={8}>
                  <Select
                    onChange={value => this.selectChange("tableCodeByParam", value)}
                    value={tableCodeByParam}
                    disabled={this.state.disableByParam}
                    dropdownMatchSelectWidth={false}
                    style={{ width: "90%" }}>
                    {this.initOptions("ParameterEntry")}
                  </Select>
                </Col>
                <Col span={8}>
                  <Select
                    onChange={value => this.selectChange("colIdByParam", value)}
                    value={colIdByParam}
                    disabled={this.state.disableByParam}
                    dropdownMatchSelectWidth={false}
                    style={{ width: "100%" }}>
                    {this.initOptions("ParameterEntry", "col")}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Radio.Group>
        </Col>
      </Row>
    )
  }
}

// 校验数字最值
class ItemByNumber extends Component {

  render() {
    let { dataSource = {}, options = [] } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Item label="最小值" {...formItemLayout}>
          {getFieldDecorator('min', {
            initialValue: dataSource.min || { dataType: undefined, uppercase: false, lowercase: false, otherValue: undefined },
          })(<BaseValues options={options} />)}
        </Item>
        <Item label="最大值" {...formItemLayout}>
          {getFieldDecorator('max', {
            initialValue: dataSource.max || { dataType: undefined, uppercase: false, lowercase: false, otherValue: undefined },
          })(<BaseValues options={options} />)}
        </Item>
      </>
    )
  }
}

// 校验规则组件
export default class RuleItem extends Component {

  state = {
    checkType: null,
    dataSource: {}
  }

  onCheckTypeChange = e => {
    this.setState({ checkType: e.target.value, dataSource: {} })
  }

  isRegExp = (value, callback) => {
    try {
      // eslint-disable-next-line no-eval
      let regExp = eval(value);
      if (Object.prototype.toString.call(regExp).replace(/\[object\s(.+)]/, "$1").toLowerCase() !== "regexp") {
        callback("输入内容不是正则表达式");
      } else {
        callback();
      }
    } catch (err) {
      callback("输入内容不是正则表达式");
    }
  }

  detailItem = (getFieldDecorator, dataSource = {}) => {
    let formItem = null;
    switch (this.state.checkType) {
      case "NUMBER":
        formItem = <ItemByNumber dataSource={dataSource} options={this.props.options} form={this.props.form} />
        break;
      case "STRING":
        formItem = <ItemByString dataSource={dataSource} form={this.props.form} />
        break;
      case "REGEXP":
        formItem = (
          <Col span={24}>
            <Item label="正则表达式" {...formItemLayout}>
              {getFieldDecorator('regularExpression', {
                initialValue: dataSource.regularExpression,
                rules: [{
                  validator: (rule, value, callback) => this.isRegExp(value, callback)
                }]
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

  componentDidMount() {
    this.setState({
      checkType: this.props.dataSource.checkType,
      dataSource: this.props.dataSource,
    })
  }

  render() {
    let { dataSource = {}, } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <Row>
          <Col span={24}>
            <Item label="校验类型" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              {getFieldDecorator('checkType', {
                initialValue: dataSource.checkType || "TEXT",
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
        { this.detailItem(getFieldDecorator, this.state.dataSource)}
      </>
    )

  }
}