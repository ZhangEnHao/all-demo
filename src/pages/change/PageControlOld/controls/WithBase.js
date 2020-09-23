import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../../../../Store';



const WithBase = (WrappedComponent) => {

  @observer 
  class Base extends Component {
    
    render() {
      const { relyControls } = this.props;

      let dataSource = {}
      relyControls.forEach(relyControl => {
        dataSource[relyControl] = store.dataSource[relyControl];
      })
      return <WrappedComponent {...this.props} dataSource={dataSource} />
    }
  }

  return Base
}


export default WithBase
