import React, { Component } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import './index.less';
import store from '../../../../Store';


@observer
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
    this.setState(state => {
      let tableData = state.tableData;
      let arr = tableData.filter(item => item.id === record.id);
      if (arr.length > 0) {
        let newTableData = tableData.filter(item => item.id !== record.id);
        return { tableData:newTableData }
      } else {
        tableData.push(record)
        return {tableData}
      }
    }, () => {
      record.isActive = !record.isActive;
      this.forceUpdate();

      store.setDataSourceByCode(this.props.code, this.state.tableData);
    });
  }

  setClassName = (record, index) => {//record代表表格行的内容，index代表行索引
    //判断索引相等时添加行的高亮样式
    return record.isActive ? 'l-table-row-active' : "";
  }




  render() {

    return (
      <Table
        rowKey="id"
        pagination={false}
        columns={this.initColumns()}
        dataSource={this.props.table}
        rowClassName={this.setClassName}
        onRow={(record, index) => {
          return {
            onClick: event => { this.rowClick(record, index) }
          };
        }}
      />
    );
  }
}

export default TableBySearch
