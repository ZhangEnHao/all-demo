import React from "react";
import { Button, Icon, Typography, Row, Col, Layout, Affix, Breadcrumb, Dropdown, Menu, Pagination, PageHeader, Steps, AutoComplete, Checkbox, Cascader, DatePicker, Form, InputNumber, Input, Mentions, Rate, Radio, Switch, Slider, Select, TreeSelect, Transfer, TimePicker, Upload, Avatar, Badge, Comment, Collapse, Carousel, Card, Calendar, Descriptions, Empty, List, Popover, Statistic, Tree, Tooltip,Timeline, Tag, Tabs, Table, Alert, Drawer, Modal, Message, Notification, Progress, Popconfirm, Result, Spin, Skeleton, Anchor, BackTop, ConfigProvider, Divider, } from "antd";
import { withPropsAPI } from "gg-editor";
import upperFirst from "lodash/upperFirst";

const Antd = { Button, Icon, Typography, Row, Col, Layout, Affix, Breadcrumb, Dropdown, Menu, Pagination, PageHeader, Steps, AutoComplete, Checkbox, Cascader, DatePicker, Form, InputNumber, Input, Mentions, Rate, Radio, Switch, Slider, Select, TreeSelect, Transfer, TimePicker, Upload, Avatar, Badge, Comment, Collapse, Carousel, Card, Calendar, Descriptions, Empty, List, Popover, Statistic, Tree, Tooltip,Timeline, Tag, Tabs, Table, Alert, Drawer, Modal, Message, Notification, Progress, Popconfirm, Result, Spin, Skeleton, Anchor, BackTop, ConfigProvider, Divider, };
const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 }
  },
  wrapperCol: {
    sm: { span: 18 }
  }
};

class DetailForm extends React.Component {
  get item() {
    const { propsAPI } = this.props;

    return propsAPI.getSelected()[0];
  }

  handleSubmit = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }
console.log(values);
        const item = getSelected()[0];

        if (!item) {
          return;
        }

        executeCommand(() => {
          update(item, {
            ...values,
            // dataSource: { ...values }
          });
        });
      });
    }, 0);
  };

  renderEdgeShapeSelect = () => {
    return (
      <Select onChange={this.handleSubmit}>
        <Option value="flow-polyline">Polyline</Option>
        <Option value="flow-smooth">Smooth</Option>
        <Option value="flow-polyline-round">Polyline Round</Option>
      </Select>
    );
  };

  renderNodeDetail = () => {
    const { form } = this.props;
    const { label, formView } = this.item.getModel();

    return (
      <>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator("label", {
            initialValue: label
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        {/* 自定义详情面板 */}
        { formView && formView(Antd, form, this.handleSubmit) }
      </>
    );
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = "", shape = "flow-polyline", strength = 1 } = this.item.getModel();

    return (
      <>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator("label", {
            initialValue: label
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Shape" {...inlineFormItemLayout}>
          {form.getFieldDecorator("shape", {
            initialValue: shape
          })(this.renderEdgeShapeSelect())}
        </Item>
        <Item label="Strength" {...inlineFormItemLayout}>
          {form.getFieldDecorator("strength", {
            initialValue: strength
          })(<Input type="number" onBlur={this.handleSubmit} />)}
        </Item>
      </>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = "新建分组" } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>
        {form.getFieldDecorator("label", {
          initialValue: label
        })(<Input onBlur={this.handleSubmit} />)}
      </Item>
    );
  };

  render() {
    const { type } = this.props;

    if (!this.item) {
      return null;
    }

    return (
      <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          {type === "node" && this.renderNodeDetail()}
          {type === "edge" && this.renderEdgeDetail()}
          {type === "group" && this.renderGroupDetail()}
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(DetailForm));
