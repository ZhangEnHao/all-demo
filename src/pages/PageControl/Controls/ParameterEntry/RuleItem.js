import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input, Switch, InputNumber, Checkbox, Button, } from 'antd';

const { Item } = Form;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

// 
class StartStop extends Component {
  state = {
    disableByEnglish: true,
    disableByOther: true,
  }

  onCheckboxChange = (e, type) => {
    this.triggerChange({ [type]: e.target.checked });
  }

  onRadioGroupChange = e => {
    if(e.target.value === "english") {
      this.setState({disableByEnglish: false})
    }else if(e.target.value === "other") {
      this.setState({disableByOther: false})
    }else {
      this.setState({disableByEnglish: true, disableByOther: true, })
    }
    this.triggerChange({ checktype: e.target.value });
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

  render() {
    // let { value } = this.props;
    return (
      <div style={{ display: "flex", height: 40, alignItems: "center" }}>
        <Radio.Group onChange={this.onRadioGroupChange} style={{ flex: "0 0 auto" }}>
          <Radio value="english">英文</Radio>
          <Checkbox onChange={e => this.onCheckboxChange(e, "uppercase")} disabled={this.state.disableByEnglish}>大写</Checkbox>
          <Checkbox onChange={e => this.onCheckboxChange(e, "lowercase")} disabled={this.state.disableByEnglish}>小写</Checkbox>
          <Radio value="number">数字</Radio>
          <Radio value="other">其他</Radio>
        </Radio.Group>
        <Input
          // value={value.otherValue}
          onChange={this.otherValueChange}
          disabled={this.state.disableByOther}
          style={{ flex: "1 1 auto", marginRight: 10, }} />
        <Button type="danger" style={{ flex: "0 0 auto" }}>清除</Button>
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
        <InputNumber value={value.min} min={0} onChange={this.handleMinChange} style={{ width: '30%', marginRight: '5%' }} />
        至
        <InputNumber value={value.max} min={value.min + 1} onChange={this.handleMaxChange} style={{ width: '30%', marginRight: '5%', marginLeft: '5%' }} />
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
          initialValue: { checkValue: [], otherValue: null },
        })(<CheckboxList />)}
      </Item>
      <Item label={<span>必须含<span style={{ color: "red" }}>[且]</span></span>} {...formItemLayout}>
        {getFieldDecorator('mustContain', {
          initialValue: { checkValue: [], otherValue: null },
        })(<CheckboxList />)}
      </Item>
      <Item label="字符开头" {...formItemLayout}>
        {getFieldDecorator('startWith', {
          // initialValue: ,
        })(<StartStop />)}
      </Item>
      <Item label="字符结尾" {...formItemLayout}>
        {getFieldDecorator('endWith', {
          // initialValue: ,
        })(<StartStop />)}
      </Item>
      <Item label="不包含字符" {...formItemLayout}>
        {getFieldDecorator('notContain', {
          // initialValue: ,
        })(<Input />)}
      </Item>
      <Item label="长度约束" {...formItemLayout}>
        {getFieldDecorator('stringLength', {
          initialValue: { min: null, max: null },
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