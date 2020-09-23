import React, { Component } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
// import store from '../../../../Store';


@observer
class TableByAdd extends Component {

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

  render() {

    return (
      <Table
        rowKey="id"
        pagination={false}
        columns={this.initColumns()}
        dataSource={this.props.data}
        
      />
    );
  }
}

export default TableByAdd
