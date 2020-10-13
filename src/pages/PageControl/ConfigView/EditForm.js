import React, { Component } from 'react';
import { Card, Form, Input, Radio, Icon, Popover, Select, Switch, InputNumber, TreeSelect } from 'antd';
import ajax from '../../../api/ajax';
import { typeJudgment, deepClone } from '../utils';

import Controls from '../Controls';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { TreeNode } = TreeSelect;

// 公共属性
const Publics = [
  { code: "code", label: "控件编码", type: "Input", rules: [{ required: true, message: `请输入控件编码!` }] },
  { code: "name", label: "控件名称", type: "Input", rules: [{ required: true, message: `请输入控件名称!` }] },
  { code: "inputFun", label: "输入数据过滤脚本", type: "TextArea", },
  { code: "outputFun", label: "输出数据过滤脚本", type: "TextArea", },
];
let controlType = {
  code: "controlType",
  label: "控件类型",
  type: "Radio",
  rules: [{ required: true, message: `请选择控件类型!` }],
  parameterType: "Publics",
  optionType: "JSON",
};

// 获取各个控件属性信息
let options = [];
for (let key in Controls) {
  let config = require(`../Controls/${key}/config.js`).default;
  options.push(config);
}
controlType.options = options;
Publics.push(controlType);


class EditForm extends Component {

  // 缓存是为了控件属性变化不同条件时 通过配置关系渲染不同子表单都接入到初始的公共表单
  state = {
    controlledProps: [], // 控件私有属性
    privateProps: [], // 控件依赖其他控件数据的属性
    controlledPropsCache: [], // 控件私有属性缓存 
    privatePropsCache: [], // 控件依赖其他控件数据的属性缓存
    options: {}, // 保存各个组件所需的 option
    selectValue: {}, // 保存各个组件选中的值
  }

  initLiveProps = (LiveProps, dataSource, form, dataSourceByTable) => {
    if(LiveProps) {
      return (
        <LiveProps
          dataSource={dataSource}
          dataSourceByTable={dataSourceByTable}
          form={form}
          />
      )
    }else {
      return null
    }
  }

  // 初始化渲染控件私有属性
  initPrivateProps = (privateProps = [], dataSource = {}, getFieldDecorator) => {
    return this.initPublics(privateProps, dataSource, getFieldDecorator);
  }

  // 初始化渲染控件依赖其他控件数据的属性
  initControlledProps = (controlledProps = [], dataSource = {}, getFieldDecorator) => {
    return this.initPublics(controlledProps, dataSource, getFieldDecorator);
  }

  publicChange = (parameterType, code, childrenByChange, value) => {
    // 为控件自身属性时，属性变化时 通过配置关系渲染子表单
    childrenByChange.forEach((item, index) => {
      let { trigger, formItems } = item;
      if (value === trigger) {
        this.setState(state => {
          return { [parameterType]: state[`${parameterType}Cache`].concat(formItems) }
        })
      }
    })
    // 设置当前组件选中值
    this.setState(state => {
      let selectValue = this.state.selectValue;
      return { selectValue: { ...selectValue, [code]: value } }
    }, () => {
      // 重新请求接口 options
      Publics.forEach(item => {
        if (item.code === "controlType") {
          item.options.forEach(option => {
            this.initOptionsByHTTP(option.controlledProps)
            this.initOptionsByHTTP(option.privateProps)
          })
        }
      })
    })
  }

  onInputBlur = (value, parameterType, childrenByChange = [], code) => {
    if (parameterType === "Publics") {

    } else {
      this.publicChange(parameterType, code, childrenByChange, value);
    }
  }

  // Switch 组件 change 事件
  onSwitchChange = (checked, parameterType, childrenByChange = [], code) => {
    if (parameterType === "Publics") {

    } else {
      this.publicChange(parameterType, code, childrenByChange, checked);
    }
  }

  onSelectChange = (value, parameterType, childrenByChange = [], code) => {
    if (parameterType === "Publics") {

    } else {
      this.publicChange(parameterType, code, childrenByChange, value);
    }
  }

  // 单选组合 change 事件
  onRadioGroupChange = (e, parameterType, childrenByChange = [], code) => {
    if (parameterType === "Publics") {
      // 控件类型修改时，改变存储的控件信息 
      // 当前类型下 单选组合 change 事件最好保持为此唯一功能，即 修改控件类型
      this.setState({
        controlledProps: e.target.controlledProps,
        privateProps: e.target.privateProps,
        controlledPropsCache: e.target.controlledProps,
        privatePropsCache: e.target.privateProps,
        liveProps: e.target.liveProps,
      });
    } else {
      this.publicChange(parameterType, code, childrenByChange, e.target.value);
    }
  }

  onTreeSelectChange = (value, parameterType, childrenByChange = [], code) => {
    if (parameterType === "Publics") {

    } else {
      this.publicChange(parameterType, code, childrenByChange, value);

    }
  }

  // 初始化有多个选择项的表单的子组件
  initOptions = (type, options = [], code, parameterType) => {
    // 默认的 Option value 和 lable 
    let value = "value";
    let label = "label";
    if (typeJudgment(options) !== "array") {
      // 重置接口返回值需要的 value 和 lable
      value = options.value;
      label = options.label;
      options = this.state.options[`optionsBy${code}`] || [];
    }

    // 数据来源为其他组件输出数据
    if(parameterType === "controlledProps") {
      value = "code";
      label = "name";
      // 只展示当前控件之前的控件
      options = deepClone(this.props.dataSourceByTable);
      if(this.props.indexByEditForm) {
        options.length = this.props.indexByEditForm;
      }
    }

    let optionItems = [];
    switch (type) {
      case "Radio":
        optionItems = options.map((option, index) => {
          let { controlType, title, icon, presentation, controlledProps, privateProps, liveProps } = option;
          return (<Popover content={<div style={{ maxWidth: 500, maxHeight: 500, overflow: "auto" }}>{presentation}</div>} key={index} title="控件介绍" >
            <Radio.Button value={controlType} controlledProps={controlledProps} privateProps={privateProps} liveProps={liveProps} >
              <Icon type={icon} />
              {title}
            </Radio.Button>
          </Popover>)
        })
        break;
      case "Select":
      case "MultipleSelect":
        optionItems = options.map((option, index) => {
          return <Option value={option[value]} key={index}>{option[label]}</Option>
        })
        break;
      default:

    }
    return optionItems;
  }

  // 初始化有树状多个选择项的表单的子组件
  initChildOptions = (type, options = [], code, value = "value", label = "label", children = "children") => {
    // 默认的 Option value 和 lable 
    if (typeJudgment(options) !== "array") {
      // 重置接口返回值需要的 value 和 lable
      value = options.value;
      label = options.label;
      children = options.children;
      options = this.state.options[`optionsBy${code}`] || [];
    }

    let optionItems = [];
    switch (type) {
      case "TreeSelect":
        optionItems = options.map((option, index) => {

          return (
            <TreeNode value={option[value]} title={option[label]} key={index}>
              {this.initChildOptions(type, option[children], code, value, label, children)}
            </TreeNode>
          )
        })
        break;
      default:

    }
    return optionItems;
  }

  // 初始化待校验 Form 表单
  initFormItem = (type, placeholder, options, parameterType, childrenByChange, code) => {
    let formItem = null;
    let otherProps = {
      allowClear: true,
    }

    switch (type) {
      case "Input":
        formItem = <Input onBlur={e => this.onInputBlur(e.target.value, parameterType, childrenByChange, code)} {...otherProps} placeholder={placeholder} />
        break;
      case "Radio":
        formItem = (
          <Radio.Group onChange={(e) => this.onRadioGroupChange(e, parameterType, childrenByChange, code)} buttonStyle="solid">
            { this.initOptions(type, options, code, parameterType)}
          </Radio.Group>
        )
        break;
      case "TextArea":
        formItem = <TextArea onBlur={e => this.onInputBlur(e.target.value, parameterType, childrenByChange, code)} {...otherProps} {...otherProps} placeholder={placeholder} row={4} />
        break;
      case "Select":
        formItem = (
          <Select
            {...otherProps}
            showSearch
            filterOption={(input, option) => {
              return (new RegExp(input, "i").test(option.props.children)) || (new RegExp(input, "i").test(option.props.value))
            }}
            onChange={value => this.onSelectChange(value, parameterType, childrenByChange, code)}
            placeholder={placeholder}
            style={{ width: "100%" }}>
            { this.initOptions(type, options, code, parameterType)}
          </Select>
        )
        break;
      case "Switch":
        formItem = <Switch onChange={(checked) => this.onSwitchChange(checked, parameterType, childrenByChange, code)} placeholder={placeholder} />
        break;
      case "InputNumber":
        formItem = <InputNumber onBlur={value => this.onInputBlur(value, parameterType, childrenByChange, code)} {...otherProps} />
        break;
      case "MultipleSelect":
        formItem = (
          <Select
            mode="multiple"
            {...otherProps}
            showSearch
            filterOption={(input, option) => {
              return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) || (option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0) || (option.props.children.indexOf(input) >= 0) || (option.props.value.indexOf(input) >= 0)

            }}
            onChange={value => this.onSelectChange(value, parameterType, childrenByChange, code)}
            placeholder={placeholder}
            style={{ width: "100%" }}>
            { this.initOptions(type, options, code, parameterType)}
          </Select>
        )
        break;
      case "TreeSelect":
        formItem = (<TreeSelect
          {...otherProps}
          showSearch
          style={{ width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder={placeholder}
          onChange={value => this.onTreeSelectChange(value, parameterType, childrenByChange, code)}
        >
          { this.initChildOptions(type, options, code)}
        </TreeSelect>)
        break;
      default:
        formItem = null;
    }
    return formItem
  }

  // 初始化 子节点的值的属性
  initValuePropName = type => {
    let valuePropName = "value";
    switch (type) {
      case "Switch":
        valuePropName = "checked";
        break;
      default:
        valuePropName = "value";
    }
    return valuePropName
  }


  // 初始化公共属性
  initPublics = (publics, dataSource = {}, getFieldDecorator) => {
    return publics.map((item, index) => {
      let { code, label, type, rules, placeholder, options, parameterType, childrenByChange } = item;
      return (
        <Item label={label} key={index}>
          {getFieldDecorator(code, {
            initialValue: dataSource[code],
            valuePropName: this.initValuePropName(type),
            rules: rules,
          })(this.initFormItem(type, placeholder, options, parameterType, childrenByChange, code))}
        </Item>
      )
    })
  }

  // 回显所有属性
  echoFormItem = (dataSource, parameterType) => {
    let parameterTypeValues = require(`../Controls/${dataSource.controlType}/config.js`).default[parameterType];

    // 先渲染公共属性
    this.setState(state => {
      return {
        [parameterType]: state[`${parameterType}Cache`].concat(parameterTypeValues),
        [`${parameterType}Cache`]: state[`${parameterType}Cache`].concat(parameterTypeValues),
      }
    }, () => {
      // 再渲染 受控属性值动态渲染的子表单
      parameterTypeValues.forEach(parameterTypeValue => {
        if (parameterTypeValue.hasOwnProperty("childrenByChange")) {
          parameterTypeValue.childrenByChange.forEach(item => {
            if (dataSource[parameterType][parameterTypeValue.code] === item.trigger) {
              this.setState(state => {
                return {
                  [parameterType]: state[`${parameterType}Cache`].concat(item.formItems),
                }
              })
            }
          })
        }
      })
    })
  }

  // 初始化 接口请求的 option 数据
  initOptionsByHTTP = async (parames=[]) => {
    for (let parame of parames) {
      let { code, optionType = "JSON", options } = parame;
      if (optionType === "HTTP") {
        let { requestURL, queryData, queryByDependForm, method } = options;
        if (queryByDependForm) {
          queryData[queryByDependForm] = this.state.selectValue[queryByDependForm]
        }
        let result = await ajax(requestURL, queryData, method);
        this.setState(state => {
          let options = state.options;
          options = { ...options, [`optionsBy${code}`]: result };
          return { options }
        })
      }
    }
  }

  UNSAFE_componentWillMount() {
    // 将form对象通过setForm方法传递给父组件
    this.props.setForm(this.props.form);

    // 初始化 接口请求的 option 数据
    Publics.forEach(item => {
      if (item.code === "controlType") {
        item.options.forEach(option => {
          let controlledProps = option.controlledProps ? option.controlledProps : []
          let privateProps = option.privateProps ? option.privateProps : []
          this.initOptionsByHTTP(controlledProps)
          this.initOptionsByHTTP(privateProps)
        })
      }
    })


    // 回显 选中控件类型 的 自定义属性表单 以及 受控的受属性值动态渲染的子表单
    if (this.props.dataSource.controlType) {
      this.echoFormItem(this.props.dataSource, "controlledProps");
      this.echoFormItem(this.props.dataSource, "privateProps");

      // 回显 liveProps 自定义表单
      let configByRender = require(`../Controls/${this.props.dataSource.controlType}/config.js`).default.liveProps; 
      if(configByRender) {
        this.setState({ liveProps: configByRender })
      }
    }
  }

  render() {
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }

    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.props;

    return (
      <Card bodyStyle={{ maxHeight: "70vh", overflow: "auto" }} style={{ border: "transparent" }}>
        <Form {...formItemLayout}>
          {this.initPublics(Publics, dataSource, getFieldDecorator)}
          {/* 依赖其他控件数据的属性 */}
          {this.initControlledProps(this.state.controlledProps, dataSource.controlledProps, getFieldDecorator)}
          {/* 控件私有属性 */}
          {this.initPrivateProps(this.state.privateProps, dataSource.privateProps, getFieldDecorator)}
          {/* 控件 动态渲染 属性 */}
          {this.initLiveProps(this.state.liveProps, dataSource, this.props.form, this.props.dataSourceByTable)}
        </Form>
      </Card>
    )
  }
}

export default Form.create()(EditForm)
