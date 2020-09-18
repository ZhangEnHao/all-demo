import React, { Component } from 'react';
import { Button, Input } from 'antd';
import DragModal from '../../../components/DragModal';


class DragModel extends Component {
  state = { visible: false };


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div style={{ height: 1200, }}>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>

        {
          this.state.visible ?
          <DragModal
            title="敏捷交付反馈"
            visible={this.state.visible}
            isClose={true}
            onCancel={this.handleCancel}
            >
            <div style={{height: 525}}>
              React Component Drag and resize
              <Input />
            </div>
          </DragModal>   : null
        }

      </div>
    )
  }
}

export default DragModel
