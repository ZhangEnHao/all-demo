import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Pages from './pages';

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Switch>
            <Route path={`/`} exact component={Pages} />
            <Redirect to={`/`} />
          </Switch>
        </HashRouter>
      </ConfigProvider>
    );
  }
}

export default App;
