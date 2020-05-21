import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Pages from './pages';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Switch>
            <Route path={`/`}  component={Pages} />
            <Route path={`/login`} exact component={Login} />
            {/* <Redirect to={`/login`} /> */}
          </Switch>
        </HashRouter>
      </ConfigProvider>
    );
  }
}

export default App;
