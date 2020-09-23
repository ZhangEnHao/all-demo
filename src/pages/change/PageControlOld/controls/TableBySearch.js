import React, { Component } from 'react';
import { Table } from 'antd';
import WithBase from './WithBase';
import store from '../../../../Store';
import './index.less';


class TableBySearch extends Component {

  state = {
    tableData: [],
  }

  initColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'UserName',
        dataIndex: 'username',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
      },
    ]
  }

  rowClick = (record, index) => {
    record.isActive = true;
    this.forceUpdate();
    this.setState(state => {
      return {tableData: state.tableData.concat(record)}
    }, () => {
      store.setDataSourceByCode("table", this.state.tableData);
    });
  }

  setClassName = (record, index)=>{//record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return record.isActive ? 'l-table-row-active' : "";
  }


  

  render() {
    const { dataSource, dataSourceCode } = this.props;

    return (
      <Table
        rowKey="id"
        pagination={false}
        columns={this.initColumns()}
        dataSource={dataSource[dataSourceCode]}
        rowClassName={this.setClassName}
        onRow={(record, index) => {
          return {
            onClick: event => {this.rowClick(record, index)}
          };
        }}
      />
    );
  }
}

export default WithBase(TableBySearch)
