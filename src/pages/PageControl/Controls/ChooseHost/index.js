import React, { Component } from 'react';
import { Layout, Card, Row, Col, Tooltip, Select, Tabs, Icon, Input, InputNumber, Button, Table, } from 'antd';
import store from '../../Store';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;
const { Search, TextArea } = Input;

class ChooseHost extends Component {

  state = {
    collapsed: false,
    isShowGroup: false,
    groupType: "AUTO",
  };
  // 左侧 展开 / 收起
  onCollapse = () => {
    this.setState(state => ({ collapsed: !state.collapsed }));
  };
  // 分组规则 change
  onGroupTypeChange = (value) => {
    this.setState({ groupType: value });
  }
  // 不同分组规则 展示 不同
  viewByGroupType = (maximumConcurrent) => {
    let view = null;
    switch (this.state.groupType) {
      case "AUTO":
        view = (
          <Tooltip title={maximumConcurrent ? `最大并发量${maximumConcurrent}` : null}>
            每组<InputNumber defaultValue={2} min={1} max={maximumConcurrent} size="small" style={{ width: "50px", }} />台
          </Tooltip>)
        break;
      case "MANUAL":
        view = <Button type="primary" size="small">增加</Button>
        break;
      default:
        view = null;
    }
    return view
  }
  // 是否分组
  isGroup = (groupRuleCode, executiveRestriction = [], maximumConcurrent) => {
    return (<Row style={{ height: "54px", fontWeight: "normal ", color: "rgba(0, 0, 0)",  }}>
      <Col span={15}>
        <Row>
          <Col span={2} offset={(this.state.isShowGroup || this.state.collapsed) ? 2 : 6}>{`已添加${1}台`}</Col>
          {groupRuleCode ? <Col span={4} offset={(this.state.isShowGroup || this.state.collapsed) ? 8 : 12}>{`已分组${2}台`} </Col> : null}
        </Row>
      </Col>
      <Col span={9}>
        {
          groupRuleCode ? (
            <Row type="flex" justify="end" style={{ textAlign: "right" }}>
              <Col span={5} style={{ textAlign: "left" }}>
                <Button onClick={this.onDeviceGroupClick} size="small" type="primary">{this.state.isShowGroup ? "取消分组" : "主机分组"}</Button>
              </Col>
              {
                this.state.isShowGroup ? (
                  <>
                    <Col span={1}></Col>
                    <Col span={5}>
                      <Tooltip title="分组规则">
                        <Select defaultValue={this.state.groupType} onChange={this.onGroupTypeChange} dropdownMatchSelectWidth={false} size="small" style={{ width: "100%" }}>
                          <Option value="AUTO">随机分组</Option>
                          <Option value="MANUAL">手动分组</Option>
                          <Option value="DEPLOYMENT">按部署单元分组</Option>
                        </Select>
                      </Tooltip>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={5}>
                      {this.viewByGroupType()}
                    </Col>
                    <Col span={2}></Col>
                    <Col span={5}>
                      <Tooltip title="组间执行限制">
                        <Select defaultValue={executiveRestriction[0]} dropdownMatchSelectWidth={false} size="small" style={{ width: "100%" }}>
                          {executiveRestriction.map((item, index) => {
                            const itemByCN = { manualSerial: "串行手动", manualParallel: "串行自动", automaticSerial: "并行手动", automaticParallel: "并行自动" };
                            return <Option value={item} key={index}>{itemByCN[item]}</Option>
                          })}
                        </Select>
                      </Tooltip>
                    </Col>
                  </>
                ) : null
              }
            </Row>
          ) : null
        }
      </Col>
    </Row>)
  }
  // 主机分组按钮 点击事件
  onDeviceGroupClick = () => {
    this.setState(state => ({ isShowGroup: !state.isShowGroup }), () => {
      this.setState({ collapsed: this.state.isShowGroup })
    })
  }


  setThisData = () => {
    store.setDataSourceByCode(this.props, [
      { ip: "123", deviceName: "123", duName: "ABC" },
      { ip: "321", deviceName: "321", duName: "ABC" },
      { ip: "213", deviceName: "213", duName: "ABC" },
    ]);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const cardProps = {
      bordered: false,
      headStyle: { height: 44, minHeight: 44, fontSize: 14, lineHeight: 1, },
      bodyStyle: { minHeight: "calc(85vh - 44px)", maxHeight: "calc(85vh - 44px)", padding: 0, },
      style: { flexGrow: 1, height: "100%" },
    }

    const tableProps = {
      columns: [
        { title: '主机名称', dataIndex: 'deviceName', },
        { title: '代管IP', dataIndex: 'representIp', },
        { title: '操作系统', dataIndex: 'osName', },
        { title: '部署单元', dataIndex: 'duName', },
      ],
      rowKey: "id",
      pagination: false,
      bordered: true,
      size: "middle",
      scroll: { y: "calc(85vh - 100px)" },
    }

    const columnsByGroup = [
      { title: "分组", dataIndex: ""},
      { title: "排序", dataIndex: "sort", width: 80, 
        render: (text, record, index) => {

        }
      },
    ]

    const rowSelectionByInquiry = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };

    const { groupRuleCode, executiveRestriction, maximumConcurrent, } = this.props;

    return (
      <>
        <Card
          title={this.isGroup(groupRuleCode, executiveRestriction, maximumConcurrent)}
          {...cardProps} bodyStyle={{ minHeight: "85vh", maxHeight: "85vh", padding: 0, }}>
          <Layout style={{ minHeight: '85vh', maxHeight: '85vh', position: "relative" }}>
            <Sider
              trigger={null}
              collapsible
              theme="light"
              width={223}
              collapsed={this.state.collapsed} >
              <Tabs defaultActiveKey="1">
                <TabPane tab="部署单元树" key="1" style={{ maxHeight: "calc(85vh - 100px)", overflow: "auto" }}>
                  <Search
                    placeholder="请输入部署单元"
                    onSearch={value => console.log(value)}
                    style={{ width: "100%" }}
                  />
                  <div style={{ height: 1000, background: "#ccc" }}>Content of Tab Pane 1</div>
                </TabPane>
                <TabPane tab="设备搜索" key="2">
                  <TextArea rows={20} style={{ maxHeight: "calc(85vh - 100px)" }} />
                </TabPane>
              </Tabs>
              <div style={{ position: "absolute", bottom: "0", left: 0, width: "100%", height: 40, lineHeight: "40px", textAlign: "center", cursor: "pointer", }}
                onClick={this.onCollapse}>
                <Icon type={this.state.collapsed ? "right" : "left"} />
              </div>
            </Sider>
            <Layout>
              <Content style={{ display: "flex", flexdirection: "row", }}>
                <Card
                  extra={<Button size="small" type="primary">删除</Button>}
                  title="主机查询列表"
                  {...cardProps}>
                  <Table
                    {...tableProps}
                    rowSelection={rowSelectionByInquiry} />
                </Card>
                <div style={{ height: "100%", background: "#ffffff", padding: "35vh 5px 0 5px", }}>
                  <Button type="primary" icon="right" style={{ marginBottom: "20px", }} />
                  <br />
                  <Button type="primary" icon="left" />
                </div>
                <Card
                  title="主机添加列表"
                  {...cardProps}>
                  <Table
                    {...tableProps}
                    rowSelection={rowSelectionByInquiry} />
                </Card>
                {
                  this.state.isShowGroup ?
                    <>
                      <div style={{ height: "100%", background: "#ffffff", padding: "35vh 5px 0 5px", }}>
                        <Button type="primary" icon="right" style={{ marginBottom: "20px", }} />
                        <br />
                        <Button type="primary" icon="left" />
                      </div>
                      <Card title="主机分组列表" {...cardProps}>
                        <Table
                          {...tableProps}
                          columns={columnsByGroup}
                          rowSelection={{}} />
                      </Card>
                    </> : null
                }
              </Content>
            </Layout>
          </Layout>
        </Card>
      </>
    )
  }
}

export default ChooseHost
